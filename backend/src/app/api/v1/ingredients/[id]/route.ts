import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const supabase = createAdminClient();
  const body = await request.json();

  const allowed = [
    'name', 'unit', 'current_stock', 'min_stock_alert', 'cost_per_unit',
    'supplier', 'location', 'category', 'storage_condition', 'expiry_date',
    'ingredient_type', 'purchase_unit', 'purchase_to_use_ratio',
  ];

  // Lay thong tin hien tai truoc khi cap nhat
  const { data: currentItem, error: fetchError } = await supabase
    .from('ingredients')
    .select('current_stock, name, unit')
    .eq('id', id)
    .single();

  if (fetchError || !currentItem) {
    return NextResponse.json({ error: 'Không tìm thấy nguyên liệu' }, { status: 404 });
  }

  const updateData: Record<string, any> = {};
  allowed.forEach(f => { if (body[f] !== undefined) updateData[f] = body[f]; });

  const { data, error } = await supabase
    .from('ingredients')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Neu co thay doi current_stock -> tu dong ghi log "dieu chinh kho"
  if (body.current_stock !== undefined && body.current_stock !== currentItem.current_stock) {
    const quantityBefore = currentItem.current_stock;
    const quantityAfter = body.current_stock;
    const quantityChange = Math.abs(quantityAfter - quantityBefore);
    const logType = quantityAfter > quantityBefore ? 'import' : 'export';

    await supabase.from('inventory_logs').insert([{
      ingredient_id: id,
      type: 'adjust',
      quantity_change: quantityChange,
      quantity_before: quantityBefore,
      quantity_after: quantityAfter,
      note: body.note || `Điều chỉnh tồn kho từ ${quantityBefore} → ${quantityAfter} ${currentItem.unit || ''}`,
    }]);
  }

  return NextResponse.json({
    data,
    message: 'Cập nhật thành công',
    stock_adjusted: body.current_stock !== undefined && body.current_stock !== currentItem.current_stock,
  });
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { error } = await supabase.from('ingredients').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: 'Đã xóa nguyên liệu' });
}
