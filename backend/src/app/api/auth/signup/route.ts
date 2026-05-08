import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password, phone, full_name } = await request.json();
    
    const supabaseAdmin = createAdminClient();

    // 1. Kiểm tra số lượng nhân viên để xác định role
    const { count } = await supabaseAdmin
      .from('employees')
      .select('*', { count: 'exact', head: true });

    const isFirstUser = count === 0 || count === null;
    const assignedRoleName = isFirstUser ? 'admin' : 'staff';

    // 2. Lấy role_id
    const { data: roleData } = await supabaseAdmin
      .from('roles')
      .select('id')
      .eq('name', assignedRoleName)
      .single();

    if (!roleData) {
      return NextResponse.json({ error: 'Không tìm thấy ID quyền hạn trong database.' }, { status: 500 });
    }

    // 3. Tạo user bằng Admin API
    const { data: userData, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { phone_number: phone, role: assignedRoleName }
    });

    if (createUserError) {
      // Nếu email đã tồn tại trong Auth, trả về lỗi rõ ràng
      if (createUserError.message.includes('already been registered') || createUserError.message.includes('already exists')) {
        return NextResponse.json({ error: 'Email này đã được đăng ký. Vui lòng đăng nhập.' }, { status: 400 });
      }
      return NextResponse.json({ error: createUserError.message }, { status: 400 });
    }

    const newUser = userData.user;

    if (newUser) {
      // 4. UPSERT vào bảng employees (tránh lỗi duplicate key nếu ID đã tồn tại từ lần thử trước)
      const { error: dbError } = await supabaseAdmin
        .from('employees')
        .upsert(
          [{ 
            id: newUser.id, 
            role_id: roleData.id,
            full_name: full_name || email.split('@')[0],
            phone,
            status: 'active',
            department: isFirstUser ? 'management' : 'cafe',
            hire_date: new Date().toISOString().split('T')[0],
            base_salary: 0
          }],
          { onConflict: 'id' } // Nếu ID đã tồn tại thì UPDATE thay vì báo lỗi
        );
      
      if (dbError) {
        console.error('Lỗi khi lưu vào bảng employees:', dbError);
        await supabaseAdmin.auth.admin.deleteUser(newUser.id);
        return NextResponse.json({ 
          error: `Không thể tạo hồ sơ nhân viên: ${dbError.message}` 
        }, { status: 500 });
      }
    }

    return NextResponse.json({ 
      message: `Đăng ký thành công! Quyền: ${assignedRoleName.toUpperCase()}`,
      user: newUser,
      role: assignedRoleName
    });
  } catch (err) {
    console.error('Lỗi server:', err);
    return NextResponse.json({ error: 'Lỗi server nội bộ' }, { status: 500 });
  }
}
