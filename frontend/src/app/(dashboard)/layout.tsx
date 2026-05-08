'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Logo from '@/components/landing/Logo';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  ClipboardList,
  Users,
  Warehouse,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Gamepad2,
  Heart,
  CalendarDays,
  DollarSign,
  ScrollText,
  BoxIcon,
} from 'lucide-react';

// ===== CẤU HÌNH MENU =====
const menuConfig = [
  {
    group: 'TỔNG QUAN',
    items: [
      { label: 'Bảng điều khiển', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    group: 'BÁN HÀNG',
    items: [
      { label: 'POS - Bán hàng', href: '/pos', icon: ShoppingCart },
      { label: 'Đơn hàng', href: '/orders', icon: ClipboardList },
    ],
  },
  {
    group: 'QUẢN LÝ',
    items: [
      {
        label: 'Sản phẩm & Kho',
        icon: Package,
        children: [
          { label: 'Menu & Sản phẩm', href: '/products', icon: BoxIcon },
          { label: 'Danh mục sản phẩm', href: '/products/categories', icon: LayoutDashboard },
          { label: 'Nguyên vật liệu', href: '/inventory/ingredients', icon: Warehouse },
          { label: 'Nhập/Xuất kho', href: '/inventory/logs', icon: ScrollText },
        ],
      },
      {
        label: 'Nhân sự',
        icon: Users,
        children: [
          { label: 'Nhân viên', href: '/hr/employees', icon: Users },
          { label: 'Chấm công', href: '/hr/attendance', icon: CalendarDays },
          { label: 'Bảng lương', href: '/hr/payroll', icon: DollarSign },
        ],
      },
      { label: 'Khu vui chơi', href: '/playground', icon: Gamepad2 },
      { label: 'Khách hàng (CRM)', href: '/crm', icon: Heart },
    ],
  },
  {
    group: 'HỆ THỐNG',
    items: [
      { label: 'Báo cáo', href: '/reports', icon: BarChart3 },
      { label: 'Cài đặt', href: '/settings', icon: Settings },
    ],
  },
];

// ===== COMPONENT: MENU ITEM =====
function SidebarItem({ item, pathname, collapsed }: {
  item: any;
  pathname: string;
  collapsed: boolean;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href && pathname === item.href;
  const isChildActive = hasChildren && item.children.some((c: any) => pathname === c.href);

  // Auto-expand nếu child đang active
  React.useEffect(() => {
    if (isChildActive) setOpen(true);
  }, [isChildActive]);

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
            isChildActive
              ? 'bg-playground-blue/10 text-playground-blue'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
          )}
        >
          <item.icon size={20} className="shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.label}</span>
              {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </>
          )}
        </button>
        {!collapsed && open && (
          <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-slate-100 pl-3">
            {item.children.map((child: any) => {
              const childActive = pathname === child.href;
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200',
                    childActive
                      ? 'bg-playground-blue text-white font-bold shadow-md shadow-blue-500/20'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 font-medium'
                  )}
                >
                  <child.icon size={16} className="shrink-0" />
                  <span>{child.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
        isActive
          ? 'bg-playground-blue text-white shadow-md shadow-blue-500/20 font-bold'
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
      )}
    >
      <item.icon size={20} className="shrink-0" />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
}

// ===== COMPONENT CHÍNH: DASHBOARD LAYOUT =====
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const collapsed = false; // Có thể mở rộng tính năng thu gọn sidebar sau

  return (
    <div className="flex h-screen bg-slate-50/50">
      
      {/* ===== MOBILE OVERLAY ===== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 flex flex-col transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <Logo size="sm" align="start" />
          <button
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          {menuConfig.map((group) => (
            <div key={group.group}>
              {!collapsed && (
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.15em] mb-2 ml-3">
                  {group.group}
                </p>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.label}
                    item={item}
                    pathname={pathname}
                    collapsed={collapsed}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User Info + Logout (Bottom) */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-playground-blue to-playground-pink flex items-center justify-center text-white text-sm font-black shrink-0">
              A
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate">Admin</p>
                <p className="text-[11px] text-slate-400 font-medium">Quản trị viên</p>
              </div>
            )}
            <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors shrink-0">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* ===== MAIN CONTENT AREA ===== */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 shrink-0">
          {/* Left: Mobile Menu Button + Breadcrumb */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-500"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div>
              <h2 className="text-lg font-bold text-slate-800 capitalize">
                {pathname === '/dashboard'
                  ? 'Dashboard'
                  : pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'Dashboard'}
              </h2>
            </div>
          </div>

          {/* Right: Search + Notification + Avatar */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-2 w-64 border border-slate-100 focus-within:border-playground-blue/30 focus-within:ring-2 focus-within:ring-playground-blue/10 transition-all">
              <Search size={16} className="text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="bg-transparent border-none outline-none text-sm text-slate-600 placeholder:text-slate-400 w-full"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2.5 rounded-xl hover:bg-slate-50 text-slate-500 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Avatar (Desktop) */}
            <div className="hidden md:flex items-center gap-3 pl-3 border-l border-slate-100">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-playground-blue to-playground-pink flex items-center justify-center text-white text-xs font-black">
                A
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700 leading-tight">Admin</p>
                <p className="text-[11px] text-slate-400 font-medium leading-tight">Quản trị</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
