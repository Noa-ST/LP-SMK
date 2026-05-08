import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

// GET: Lich su nhap/xuat kho
export async function GET(request: Request) {
  try {
    const supabase = createAdminClient();
    const { searchParams } = new URL(request.url);
    const ingredient_id = searchParams.get('ingredient_id');
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '50');

    let query = supabase
      .from('inventory_logs')
      .select('*, ingredients(id, name, unit), employees(id, full_name)')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (ingredient_id) query = query.eq('ingredient_id', ingredient_id);
    if (type) query = query.eq('type', type);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST: Ghi nhan nhap/xuat kho thu cong
export async function POST(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();
    const { ingredient_id, employee_id, type, quantity_change, note } = body;

    // Lay ton kho hien tai
    const { data: ingredient, error: fetchErr } = await supabase
      .from('ingredients').select('current_stock').eq('id', ingredient_id).single();
    if (fetchErr || !ingredient) return NextResponse.json({ error: 'Khong tim thay nguyen lieu' }, { status: 404 });

    const quantity_before = ingredient.current_stock;
    const quantity_after = type === 'import'
      ? quantity_before + quantity_change
      : Math.max(0, quantity_before - quantity_change);

    // Cap nhat ton kho
    await supabase.from('ingredients')
      .update({ current_stock: quantity_after })
      .eq('id', ingredient_id);

    // Ghi log
    const { data, error } = await supabase
      .from('inventory_logs')
      .insert([{ ingredient_id, employee_id, type, quantity_change, quantity_before, quantity_after, note }])
      .select('*, ingredients(id, name, unit), employees(id, full_name)')
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data, message: `${type === 'import' ? 'Nhap' : 'Xuat'} kho thanh cong` }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
