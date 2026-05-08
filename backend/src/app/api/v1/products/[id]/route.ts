import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('products').select('*, categories(id, name, icon)').eq('id', id).single();
  if (error || !data) return NextResponse.json({ error: 'Khong tim thay' }, { status: 404 });
  return NextResponse.json({ data });
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const supabase = createAdminClient();
  const body = await request.json();

  const allowed = ['name', 'name_en', 'description', 'category_id', 'price', 'price_weekend', 'unit', 'image_url', 'is_available', 'sort_order'];
  const updateData: Record<string, any> = {};
  allowed.forEach(f => { if (body[f] !== undefined) updateData[f] = body[f]; });

  const { data, error } = await supabase
    .from('products').update(updateData).eq('id', id).select('*, categories(id, name, icon)').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data, message: 'Cap nhat thanh cong' });
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  const supabase = createAdminClient();
  // Soft delete: an di khoi menu
  const { error } = await supabase.from('products').update({ is_available: false }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: 'Da an san pham khoi menu' });
}
