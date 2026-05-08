// Admin Supabase Client — Dùng @supabase/supabase-js thuần (không cần cookie)
// Mục đích: Bypass RLS, dùng Service Role Key để thao tác Admin
import { createClient } from '@supabase/supabase-js';

export const createAdminClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error('Thiếu SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY trong .env.local');
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};
