-- ============================================================
-- AUTO CREATE EMPLOYEE PROFILE ON SIGNUP
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  admin_count int;
  assigned_role_id uuid;
BEGIN
  -- Kiểm tra xem đã có admin nào chưa. Nếu chưa, người đầu tiên sẽ là admin.
  SELECT count(*) INTO admin_count FROM public.employees e JOIN public.roles r ON e.role_id = r.id WHERE r.name = 'admin';
  
  IF admin_count = 0 THEN
    SELECT id INTO assigned_role_id FROM public.roles WHERE name = 'admin';
  ELSE
    SELECT id INTO assigned_role_id FROM public.roles WHERE name = 'staff';
  END IF;

  INSERT INTO public.employees (id, full_name, role_id, status)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    assigned_role_id,
    'active'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger chạy sau khi một user được tạo trong auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
