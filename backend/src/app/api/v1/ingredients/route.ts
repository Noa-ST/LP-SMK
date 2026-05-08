import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

// GET: Danh sach nguyen vat lieu
export async function GET(request: Request) {
  try {
    const supabase = createAdminClient();
    const { searchParams } = new URL(request.url);
    const low_stock = searchParams.get('low_stock');
    const search = searchParams.get('search');
    const ingredient_type = searchParams.get('ingredient_type');
    const category = searchParams.get('category');

    let query = supabase.from('ingredients').select('*').order('ingredient_type').order('name');
    if (search) query = query.ilike('name', `%${search}%`);
    if (ingredient_type) query = query.eq('ingredient_type', ingredient_type);
    if (category) query = query.eq('category', category);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const result = data.map(item => ({
      ...item,
      is_low_stock: item.current_stock <= item.min_stock_alert,
      stock_percentage: item.min_stock_alert > 0
        ? Math.min(100, Math.round((item.current_stock / (item.min_stock_alert * 2)) * 100))
        : 100,
      stock_value: item.current_stock * (item.cost_per_unit || 0),
    }));

    const filtered = low_stock === 'true' ? result.filter(i => i.is_low_stock) : result;
    return NextResponse.json({ data: filtered });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST: Them nguyen vat lieu moi + tu dong ghi log nhap kho
export async function POST(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();
    const {
      name, unit, current_stock, min_stock_alert, cost_per_unit,
      supplier, location, category, storage_condition, expiry_date,
      ingredient_type, purchase_unit, purchase_to_use_ratio,
      note, // Ghi chu kem theo khi nhap kho lan dau
    } = body;

    if (!name) return NextResponse.json({ error: 'Tên nguyên liệu là bắt buộc' }, { status: 400 });

    const initialStock = current_stock || 0;

    // Buoc 1: Tao nguyen lieu moi
    const { data: ingredient, error: ingredientError } = await supabase
      .from('ingredients')
      .insert([{
        name,
        unit: unit || 'g',
        current_stock: initialStock,
        min_stock_alert: min_stock_alert || 0,
        cost_per_unit: cost_per_unit || 0,
        supplier: supplier || null,
        location: location || null,
        category: category || 'dry',
        storage_condition: storage_condition || 'room',
        expiry_date: expiry_date || null,
        ingredient_type: ingredient_type || 'base',
        purchase_unit: purchase_unit || null,
        purchase_to_use_ratio: purchase_to_use_ratio || 1,
      }])
      .select()
      .single();

    if (ingredientError) return NextResponse.json({ error: ingredientError.message }, { status: 500 });

    // Buoc 2: Neu co ton kho ban dau > 0, tu dong ghi log "nhap kho lan dau"
    if (initialStock > 0) {
      await supabase.from('inventory_logs').insert([{
        ingredient_id: ingredient.id,
        type: 'import',
        quantity_change: initialStock,
        quantity_before: 0,
        quantity_after: initialStock,
        note: note || `Nhập kho lần đầu khi tạo nguyên liệu "${name}"`,
      }]);
    }

    return NextResponse.json({
      data: ingredient,
      message: `Thêm "${name}" thành công${initialStock > 0 ? ` và đã ghi nhận ${initialStock} ${unit || 'đơn vị'} vào kho` : ''}`,
      log_created: initialStock > 0,
    }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
