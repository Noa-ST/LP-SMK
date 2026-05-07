# ☕ Smart Kids Coffee & Playground - Project Documentation

Hệ thống quản lý tổng thể quán Cà phê kết hợp Khu vui chơi trẻ em (Admin Dashboard & POS).

---

## 🚀 1. Công nghệ (Tech Stack)

### **Frontend (Giao diện người dùng)**
- **Framework:** Next.js 15+ (App Router)
- **Styling:** Tailwind CSS (v4)
- **Animation:** Framer Motion
- **UI Components:** Shadcn/UI (Radix UI)
- **Icons:** Lucide React
- **Charts:** Recharts

### **Backend (Máy chủ API)**
- **Framework:** Next.js (API Routes)
- **Runtime:** Node.js
- **Auth & Database:** Supabase (PostgreSQL)
- **Type Safety:** TypeScript

### **Database Schema (Supabase)**
- 11 Bảng dữ liệu chính: `employees`, `attendance`, `payroll`, `categories`, `products`, `orders`, `order_items`, `ingredients`, `inventory_logs`, `daily_reports`, `roles`.

---

## 📂 2. Cấu trúc thư mục (Project Structure)

```text
LP-SMK/
├── frontend/                # [Port 3001] Landing Page & Dashboard UI
│   ├── src/
│   │   ├── app/             # Route: /, /login, /dashboard
│   │   ├── components/
│   │   │   ├── landing/     # Các thành phần trang chủ
│   │   │   ├── ui/          # Shadcn UI components
│   │   │   └── dashboard/   # Giao diện quản trị (POS, HR,...)
│   │   └── lib/             # Supabase client, utils
├── backend/                 # [Port 3000] API Server Only
│   ├── src/
│   │   ├── app/api/v1/      # Các Endpoint API (health, orders,...)
│   │   └── lib/supabase/    # Supabase admin/server client
├── package.json             # Lệnh chạy chung (npm run dev)
└── PROJECT_DOCS.md          # Tài liệu dự án (File này)
```

---

## ✨ 3. Tính năng dự định phát triển

### **Phân hệ 1: Landing Page (Hoàn thiện 95%)**
- [x] Giao diện Modern Soft UI.
- [x] Nền động đồ chơi (Floating Toys).
- [x] Giới thiệu khu vui chơi & Menu.
- [x] Responsive (Mobile/Tablet/Desktop).
- [x] Fix lỗi Hydration (isMounted).
- [ ] Form liên hệ & Đặt bàn.

### **Phân hệ 2: Hệ thống POS (Quầy bán hàng)**
- [ ] **Order món:** Giao diện chọn món nhanh, phân loại theo Category.
- [ ] **Giỏ hàng:** Tính tổng tiền, áp dụng mã giảm giá.
- [ ] **Thanh toán:** QR Code (VNPay/Momo) hoặc Tiền mặt.
- [ ] **In hóa đơn:** Kết nối máy in nhiệt, xuất file PDF.

### **Phân hệ 3: Quản lý Nhân sự (HRM)**
- [ ] **Hồ sơ:** Lưu trữ thông tin nhân viên, hợp đồng.
- [ ] **Chấm công:** Check-in/out bằng mã PIN hoặc QR.
- [ ] **Tính lương:** Tự động tính lương theo ca làm và đi muộn/về sớm.

### **Phân hệ 4: Quản lý Kho (Inventory)**
- [ ] **Định mức:** Quản lý nguyên liệu (Coffee, Sữa, Đá...).
- [ ] **Trừ kho tự động:** Tự động trừ nguyên liệu khi hoàn thành đơn hàng.
- [ ] **Cảnh báo:** Thông báo khi nguyên liệu sắp hết (Low stock alert).

### **Phân hệ 5: Báo cáo & Phân tích**
- [ ] **Doanh thu:** Biểu đồ theo ngày/tháng/năm.
- [ ] **Lợi nhuận:** Thống kê thu chi (Doanh thu - Lương - Nhập hàng).
- [ ] **Top Seller:** Những món bán chạy nhất.

---

## 🛠️ 4. Hướng dẫn vận hành

1. **Khởi động toàn bộ:** `npm run dev` (tại thư mục gốc).
2. **Truy cập Frontend:** `http://localhost:3001`
3. **Truy cập Backend API:** `http://localhost:3000/api/v1/health`
4. **Quản lý Database:** Truy cập trực tiếp Dashboard của Supabase.
