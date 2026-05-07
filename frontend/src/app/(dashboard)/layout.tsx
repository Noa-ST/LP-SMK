export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar placeholder */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <h1 className="font-bold text-slate-800">Smart Kids</h1>
          <p className="text-xs text-slate-500">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'POS', href: '/pos' },
            { label: 'Đơn hàng', href: '/orders' },
            { label: 'Nhân sự', href: '/hr/employees' },
            { label: 'Kho hàng', href: '/inventory/ingredients' },
            { label: 'Báo cáo', href: '/reports' },
            { label: 'Cài đặt', href: '/settings' },
          ].map((item) => (
            <a key={item.href} href={item.href}
              className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
