import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const supabase = createAdminClient();
  const body = await request.json();
  const { name, icon, sort_order } = body;

  const { data, error } = await supabase
    .from('categories')
    .update({ name, icon, sort_order })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const supabase = createAdminClient();

  // Kiểm tra xem danh mục có đang chứa sản phẩm nào không
  const { count, error: countError } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', id);

  if (count && count > 0) {
    return NextResponse.json({ error: 'Không thể xóa danh mục đang có sản phẩm' }, { status: 400 });
  }

  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: 'Xóa danh mục thành công' });
}
