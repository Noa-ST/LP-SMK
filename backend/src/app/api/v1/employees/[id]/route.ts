import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

type Params = { params: Promise<{ id: string }> };

// GET: Chi tiet 1 nhan vien
export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('employees')
      .select('*, roles(id, name)')
      .eq('id', id)
      .single();

    if (error || !data) return NextResponse.json({ error: 'Khong tim thay nhan vien' }, { status: 404 });
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// PATCH: Cap nhat thong tin nhan vien
export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const supabase = createAdminClient();
    const body = await request.json();

    const allowedFields = ['full_name', 'phone', 'department', 'base_salary', 'hourly_rate', 'status', 'bank_account', 'avatar_url', 'hire_date'];
    const updateData: Record<string, any> = {};
    allowedFields.forEach(f => { if (body[f] !== undefined) updateData[f] = body[f]; });

    // Cap nhat role neu co
    if (body.role_name) {
      const { data: roleData } = await supabase
        .from('roles').select('id').eq('name', body.role_name).single();
      if (roleData) updateData.role_id = roleData.id;
    }

    const { data, error } = await supabase
      .from('employees').update(updateData).eq('id', id).select('*, roles(id, name)').single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data, message: 'Cap nhat thanh cong' });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// DELETE: Vo hieu hoa nhan vien (soft delete)
export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const supabase = createAdminClient();

    const { error } = await supabase
      .from('employees').update({ status: 'terminated' }).eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ message: 'Da vo hieu hoa nhan vien' });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
