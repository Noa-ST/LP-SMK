import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

// GET: Lay danh sach nhan vien
export async function GET(request: Request) {
  try {
    const supabase = createAdminClient();
    const { searchParams } = new URL(request.url);
    const department = searchParams.get('department');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let query = supabase
      .from('employees')
      .select(`
        *,
        roles (id, name)
      `)
      .order('created_at', { ascending: false });

    if (department) query = query.eq('department', department);
    if (status) query = query.eq('status', status);
    if (search) query = query.ilike('full_name', `%${search}%`);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST: Tao nhan vien moi
export async function POST(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();
    const { full_name, email, password, phone, department, base_salary, hourly_rate, role_name, hire_date, bank_account } = body;

    // Tao Auth user
    const assignedRoleName = role_name || 'staff';
    const { data: roleData } = await supabase
      .from('roles').select('id').eq('name', assignedRoleName).single();

    const { data: userData, error: authError } = await supabase.auth.admin.createUser({
      email, password: password || 'SmartKids@2024',
      email_confirm: true,
      user_metadata: { role: assignedRoleName }
    });

    if (authError) return NextResponse.json({ error: authError.message }, { status: 400 });

    const { data, error } = await supabase
      .from('employees')
      .upsert([{
        id: userData.user.id,
        role_id: roleData?.id,
        full_name, phone, department,
        base_salary: base_salary || 0,
        hourly_rate: hourly_rate || 0,
        hire_date: hire_date || new Date().toISOString().split('T')[0],
        status: 'active',
        bank_account: bank_account || null
      }], { onConflict: 'id' })
      .select().single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data, message: 'Tao nhan vien thanh cong' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
