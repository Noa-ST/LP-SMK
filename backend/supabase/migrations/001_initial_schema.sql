-- ============================================================
-- Smart Kids Coffee — Database Schema Migration
-- Run on Supabase SQL Editor or via Supabase CLI
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE 1: roles
-- ============================================================
CREATE TABLE roles (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL UNIQUE CHECK (name IN ('admin','staff')),
  permissions JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO roles (name, permissions) VALUES
  ('admin', '{"pos":true,"hr":true,"inventory":true,"reports":true,"settings":true}'),
  ('staff', '{"pos":true,"hr":false,"inventory":true,"reports":false,"settings":false}');

-- ============================================================
-- TABLE 2: employees (extends auth.users)
-- ============================================================
CREATE TABLE employees (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id      UUID NOT NULL REFERENCES roles(id),
  full_name    TEXT NOT NULL,
  phone        VARCHAR(15),
  avatar_url   TEXT,
  department   TEXT CHECK (department IN ('cafe','playground','cashier','management')),
  hire_date    DATE NOT NULL DEFAULT CURRENT_DATE,
  base_salary  NUMERIC(12,2) DEFAULT 0,
  hourly_rate  NUMERIC(8,2),
  status       TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','on_leave','terminated')),
  bank_account TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE 3: attendance
-- ============================================================
CREATE TABLE attendance (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id    UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  date           DATE NOT NULL DEFAULT CURRENT_DATE,
  shift          TEXT NOT NULL CHECK (shift IN ('morning','afternoon','evening')),
  check_in       TIMESTAMPTZ,
  check_out      TIMESTAMPTZ,
  total_hours    NUMERIC(5,2) GENERATED ALWAYS AS (
    CASE WHEN check_out IS NOT NULL
    THEN EXTRACT(EPOCH FROM (check_out - check_in)) / 3600
    ELSE NULL END
  ) STORED,
  overtime_hours NUMERIC(5,2) DEFAULT 0,
  note           TEXT,
  UNIQUE (employee_id, date, shift)
);

-- ============================================================
-- TABLE 4: payroll
-- ============================================================
CREATE TABLE payroll (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id         UUID NOT NULL REFERENCES employees(id),
  period_month        INT NOT NULL CHECK (period_month BETWEEN 1 AND 12),
  period_year         INT NOT NULL,
  total_hours_worked  NUMERIC(6,2) DEFAULT 0,
  total_overtime      NUMERIC(6,2) DEFAULT 0,
  base_pay            NUMERIC(12,2) DEFAULT 0,
  overtime_pay        NUMERIC(12,2) DEFAULT 0,
  bonus               NUMERIC(12,2) DEFAULT 0,
  deductions          NUMERIC(12,2) DEFAULT 0,
  net_salary          NUMERIC(12,2) GENERATED ALWAYS AS (base_pay + overtime_pay + bonus - deductions) STORED,
  status              TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','approved','paid')),
  paid_at             TIMESTAMPTZ,
  UNIQUE (employee_id, period_month, period_year)
);

-- ============================================================
-- TABLE 5: categories
-- ============================================================
CREATE TABLE categories (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL UNIQUE,
  icon       TEXT NOT NULL DEFAULT 'Tag',
  sort_order INT DEFAULT 0
);

INSERT INTO categories (name, icon, sort_order) VALUES
  ('Cà phê',    'Coffee',  1),
  ('Đồ ăn',     'Utensils',2),
  ('Nước ép',   'Citrus',  3),
  ('Vé vui chơi','Ticket', 4),
  ('Khác',      'Package', 5);

-- ============================================================
-- TABLE 6: products
-- ============================================================
CREATE TABLE products (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id   UUID NOT NULL REFERENCES categories(id),
  name          TEXT NOT NULL,
  name_en       TEXT,
  description   TEXT,
  image_url     TEXT,
  price         NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  price_weekend NUMERIC(10,2),
  unit          TEXT NOT NULL DEFAULT 'ly',
  is_available  BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order    INT DEFAULT 0
);

-- ============================================================
-- TABLE 7: ingredients
-- ============================================================
CREATE TABLE ingredients (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             TEXT NOT NULL UNIQUE,
  unit             TEXT NOT NULL,
  current_stock    NUMERIC(10,3) NOT NULL DEFAULT 0,
  min_stock_alert  NUMERIC(10,3) NOT NULL DEFAULT 0,
  cost_per_unit    NUMERIC(10,2) NOT NULL DEFAULT 0,
  supplier         TEXT,
  location         TEXT
);

-- ============================================================
-- TABLE 8: product_recipes (Định lượng nguyên liệu cho mỗi sản phẩm)
-- ============================================================
CREATE TABLE product_recipes (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id    UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES ingredients(id),
  quantity      NUMERIC(10,3) NOT NULL,
  UNIQUE (product_id, ingredient_id)
);

-- ============================================================
-- TABLE 9: orders
-- ============================================================
CREATE TABLE orders (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_code      TEXT NOT NULL UNIQUE,
  cashier_id      UUID NOT NULL REFERENCES employees(id),
  table_number    TEXT,
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processing','completed','cancelled')),
  payment_method  TEXT CHECK (payment_method IN ('cash','transfer','card')),
  subtotal        NUMERIC(12,2) NOT NULL DEFAULT 0,
  discount_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  discount_reason TEXT,
  total_amount    NUMERIC(12,2) NOT NULL DEFAULT 0,
  amount_paid     NUMERIC(12,2),
  change_amount   NUMERIC(12,2),
  note            TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  completed_at    TIMESTAMPTZ
);

-- Auto-generate order_code
CREATE OR REPLACE FUNCTION generate_order_code()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_code := 'SKC-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(nextval('order_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE order_seq START 1;
CREATE TRIGGER set_order_code BEFORE INSERT ON orders FOR EACH ROW EXECUTE FUNCTION generate_order_code();

-- ============================================================
-- TABLE 10: order_items
-- ============================================================
CREATE TABLE order_items (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id     UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id   UUID NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL,
  unit_price   NUMERIC(10,2) NOT NULL,
  quantity     INT NOT NULL CHECK (quantity > 0),
  subtotal     NUMERIC(12,2) GENERATED ALWAYS AS (unit_price * quantity) STORED,
  note         TEXT
);

-- ============================================================
-- TABLE 11: inventory_logs
-- ============================================================
CREATE TABLE inventory_logs (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ingredient_id    UUID NOT NULL REFERENCES ingredients(id),
  employee_id      UUID NOT NULL REFERENCES employees(id),
  type             TEXT NOT NULL CHECK (type IN ('import','export','adjust')),
  quantity_change  NUMERIC(10,3) NOT NULL,
  quantity_before  NUMERIC(10,3) NOT NULL,
  quantity_after   NUMERIC(10,3) NOT NULL,
  reference_id     UUID,
  note             TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- AUTO DEDUCT INVENTORY TRIGGER (Trừ kho khi hoàn thành đơn)
-- ============================================================
CREATE OR REPLACE FUNCTION deduct_inventory_on_order_complete()
RETURNS TRIGGER AS $$
DECLARE
  item RECORD;
  recipe RECORD;
  before_stock NUMERIC;
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    FOR item IN SELECT * FROM order_items WHERE order_id = NEW.id LOOP
      FOR recipe IN SELECT * FROM product_recipes WHERE product_id = item.product_id LOOP
        SELECT current_stock INTO before_stock FROM ingredients WHERE id = recipe.ingredient_id;
        UPDATE ingredients
          SET current_stock = current_stock - (recipe.quantity * item.quantity)
          WHERE id = recipe.ingredient_id;
        INSERT INTO inventory_logs (ingredient_id, employee_id, type, quantity_change, quantity_before, quantity_after, reference_id, note)
          VALUES (recipe.ingredient_id, NEW.cashier_id, 'export', -(recipe.quantity * item.quantity), before_stock, before_stock - (recipe.quantity * item.quantity), NEW.id, 'Auto deducted from order ' || NEW.order_code);
      END LOOP;
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER deduct_inventory_trigger
AFTER UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION deduct_inventory_on_order_complete();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll ENABLE ROW LEVEL SECURITY;

-- Admins see all employees
CREATE POLICY "admin_see_all_employees" ON employees
  FOR ALL USING (
    EXISTS (SELECT 1 FROM employees e JOIN roles r ON e.role_id = r.id WHERE e.id = auth.uid() AND r.name = 'admin')
  );

-- Staff sees only own record
CREATE POLICY "staff_see_own_record" ON employees
  FOR SELECT USING (id = auth.uid());
