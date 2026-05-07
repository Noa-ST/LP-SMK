export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Dashboard</h1>
      <p className="text-slate-500 mb-8">Tổng quan hoạt động kinh doanh</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Doanh thu hôm nay', value: '—', color: 'blue' },
          { label: 'Đơn hàng', value: '—', color: 'green' },
          { label: 'Vé vui chơi', value: '—', color: 'purple' },
          { label: 'Cảnh báo kho', value: '—', color: 'red' },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500 mb-1">{card.label}</p>
            <p className="text-2xl font-bold text-slate-800">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
