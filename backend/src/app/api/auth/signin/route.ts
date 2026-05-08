import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    // Lấy role từ user_metadata (đã được lưu khi signup)
    const role = data.user?.user_metadata?.role || 'staff';

    return NextResponse.json({ 
      message: 'Đăng nhập thành công',
      session: data.session,
      user: {
        id: data.user.id,
        email: data.user.email,
        role: role
      }
    });
  } catch (err) {
    return NextResponse.json({ error: 'Lỗi server nội bộ' }, { status: 500 });
  }
}
