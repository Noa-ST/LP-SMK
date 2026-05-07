// ============================================
// Database Types — Tự động generate từ Supabase
// npx supabase gen types typescript --local > src/types/database.types.ts
// ============================================

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

// --- Enums ---
export type UserRole = 'admin' | 'staff'
export type EmployeeStatus = 'active' | 'on_leave' | 'terminated'
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled'
export type PaymentMethod = 'cash' | 'transfer' | 'card'
export type InventoryLogType = 'import' | 'export' | 'adjust'
export type PayrollStatus = 'draft' | 'approved' | 'paid'
export type ShiftType = 'morning' | 'afternoon' | 'evening'

// --- Table Types ---
export interface Role {
  id: string
  name: UserRole
  permissions: Json
  created_at: string
}

export interface Employee {
  id: string
  role_id: string
  full_name: string
  phone?: string
  avatar_url?: string
  department: 'cafe' | 'playground' | 'cashier' | 'management'
  hire_date: string
  base_salary: number
  hourly_rate?: number
  status: EmployeeStatus
  bank_account?: string
  created_at: string
}

export interface Attendance {
  id: string
  employee_id: string
  check_in: string
  check_out?: string
  total_hours?: number
  overtime_hours?: number
  note?: string
  shift: ShiftType
  date: string
}

export interface Payroll {
  id: string
  employee_id: string
  period_month: number
  period_year: number
  total_hours_worked: number
  total_overtime: number
  base_pay: number
  overtime_pay: number
  bonus: number
  deductions: number
  net_salary: number
  status: PayrollStatus
  paid_at?: string
}

export interface Category {
  id: string
  name: string
  icon: string
  sort_order: number
}

export interface Product {
  id: string
  category_id: string
  name: string
  name_en?: string
  description?: string
  image_url?: string
  price: number
  price_weekend?: number
  unit: string
  is_available: boolean
  sort_order: number
}

export interface Order {
  id: string
  order_code: string
  cashier_id: string
  table_number?: string
  status: OrderStatus
  payment_method?: PaymentMethod
  subtotal: number
  discount_amount: number
  discount_reason?: string
  total_amount: number
  amount_paid?: number
  change_amount?: number
  note?: string
  created_at: string
  completed_at?: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  unit_price: number
  quantity: number
  subtotal: number
  note?: string
}

export interface Ingredient {
  id: string
  name: string
  unit: string
  current_stock: number
  min_stock_alert: number
  cost_per_unit: number
  supplier?: string
  location?: string
}

export interface InventoryLog {
  id: string
  ingredient_id: string
  employee_id: string
  type: InventoryLogType
  quantity_change: number
  quantity_before: number
  quantity_after: number
  reference_id?: string
  note?: string
  created_at: string
}

// --- Joined/Extended Types ---
export interface OrderWithItems extends Order {
  order_items: (OrderItem & { product: Product })[]
  cashier: Pick<Employee, 'id' | 'full_name'>
}

export interface EmployeeWithRole extends Employee {
  role: Role
}

export interface IngredientWithStatus extends Ingredient {
  is_low_stock: boolean
  stock_percentage: number
}
