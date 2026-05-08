import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

// GET: Lay danh sach san pham (kem category)
export async function GET(request: Request) {
  try {
    const supabase = createAdminClient();
    const { searchParams } = new URL(request.url);
    const category_id = searchParams.get('category_id');
    const available = searchParams.get('available');
    const search = searchParams.get('search');

    let query = supabase
      .from('products')
      .select('*, categories(id, name, icon)')
      .order('sort_order', { ascending: true });

    if (category_id) query = query.eq('category_id', category_id);
    if (available === 'true') query = query.eq('is_available', true);
    if (search) query = query.ilike('name', `%${search}%`);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST: Tao san pham moi
export async function POST(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();
    const { name, name_en, description, category_id, price, price_weekend, unit, image_url, sort_order } = body;

    const { data, error } = await supabase
      .from('products')
      .insert([{
        name, name_en, description,
        category_id, price,
        price_weekend: price_weekend || null,
        unit: unit || 'ly',
        image_url: image_url || null,
        is_available: true,
        sort_order: sort_order || 0
      }])
      .select('*, categories(id, name, icon)')
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data, message: 'Tao san pham thanh cong' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
