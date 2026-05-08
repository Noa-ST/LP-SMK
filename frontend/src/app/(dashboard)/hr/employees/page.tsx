'use client'

import React, { useState, useEffect, useCallback } from 'react';
import {
  Users, Plus, Search, Filter, MoreVertical,
  Phone, Calendar, Briefcase, ShieldCheck, ShieldAlert,
  CheckCircle2, Clock, XCircle, Edit, Trash2, X, Save, Eye
} from 'lucide-react';

// =================== TYPES ===================
type Department = 'cafe' | 'playground' | 'cashier' | 'management';
type Status = 'active' | 'on_leave' | 'terminated';

interface Employee {
  id: string;
  full_name: string;
  phone?: string;
  department: Department;
  status: Status;
  base_salary: number;
  hourly_rate?: number;
  hire_date: string;
  bank_account?: string;
  avatar_url?: string;
  roles?: { id: string; name: string };
}

// =================== CONSTANTS ===================
const DEPT_LABELS: Record<Department, string> = {
  cafe: 'Cafe', playground: 'Khu vui chơi', cashier: 'Thu ngân', management: 'Quản lý'
};
const DEPT_COLORS: Record<Department, string> = {
  cafe: 'bg-amber-100 text-amber-700',
  playground: 'bg-purple-100 text-purple-700',
  cashier: 'bg-blue-100 text-blue-700',
  management: 'bg-green-100 text-green-700'
};
const STATUS_CONFIG: Record<Status, { label: string; color: string; icon: React.ElementType }> = {
  active: { label: 'Đang làm', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  on_leave: { label: 'Nghỉ phép', color: 'bg-amber-100 text-amber-700', icon: Clock },
  terminated: { label: 'Đã nghỉ', color: 'bg-red-100 text-red-600', icon: XCircle }
};

const API = 'http://localhost:3000/api/v1/employees';

// =================== AVATAR COMPONENT ===================
function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-11 h-11 text-sm', lg: 'w-16 h-16 text-xl' };
  const colors = ['from-blue-400 to-cyan-400', 'from-pink-400 to-rose-400', 'from-violet-400 to-purple-400', 'from-amber-400 to-orange-400', 'from-emerald-400 to-teal-400'];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-black shrink-0`}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

// =================== EMPLOYEE CARD (Mobile) ===================
function EmployeeCard({ emp, onEdit, onDeactivate }: { emp: Employee; onEdit: (e: Employee) => void; onDeactivate: (id: string) => void }) {
  const status = STATUS_CONFIG[emp.status];
  const StatusIcon = status.icon;
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar name={emp.full_name} />
          <div>
            <p className="font-bold text-slate-800">{emp.full_name}</p>
            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${DEPT_COLORS[emp.department]}`}>
              {DEPT_LABELS[emp.department]}
            </span>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${status.color}`}>
          <StatusIcon size={12} /> {status.label}
        </span>
      </div>
      <div className="space-y-2 text-sm text-slate-500 mb-4">
        {emp.phone && <div className="flex items-center gap-2"><Phone size={14} />{emp.phone}</div>}
        <div className="flex items-center gap-2"><Calendar size={14} />Vào làm: {new Date(emp.hire_date).toLocaleDateString('vi-VN')}</div>
        <div className="flex items-center gap-2"><Briefcase size={14} />Lương: {emp.base_salary.toLocaleString('vi-VN')} ₫/tháng</div>
        <div className="flex items-center gap-2">
          {emp.roles?.name === 'admin' ? <ShieldCheck size={14} className="text-playground-blue" /> : <ShieldAlert size={14} className="text-slate-400" />}
          {emp.roles?.name === 'admin' ? 'Quản trị viên' : 'Nhân viên'}
        </div>
      </div>
      <div className="flex gap-2 pt-3 border-t border-slate-50">
        <button onClick={() => onEdit(emp)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 text-sm font-bold transition-colors">
          <Edit size={14} /> Sửa
        </button>
        {emp.status !== 'terminated' && (
          <button onClick={() => onDeactivate(emp.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-500 text-sm font-bold transition-colors">
            <Trash2 size={14} /> Vô hiệu hóa
          </button>
        )}
      </div>
    </div>
  );
}

// =================== EMPLOYEE MODAL (Add/Edit) ===================
function EmployeeModal({ emp, onClose, onSave }: { emp: Employee | null; onClose: () => void; onSave: () => void }) {
  const isNew = !emp;
  const [form, setForm] = useState({
    full_name: emp?.full_name || '',
    email: '',
    password: '',
    phone: emp?.phone || '',
    department: emp?.department || 'cafe',
    base_salary: emp?.base_salary || 0,
    hourly_rate: emp?.hourly_rate || 0,
    hire_date: emp?.hire_date || new Date().toISOString().split('T')[0],
    status: emp?.status || 'active',
    role_name: emp?.roles?.name || 'staff',
    bank_account: emp?.bank_account || ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError('');
    try {
      const url = isNew ? API : `${API}/${emp?.id}`;
      const method = isNew ? 'POST' : 'PATCH';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const result = await res.json();
      if (!res.ok) { setError(result.error); return; }
      onSave();
      onClose();
    } catch { setError('Lỗi kết nối server'); }
    finally { setSaving(false); }
  };

  const field = (label: string, key: keyof typeof form, type = 'text', required = false) => (
    <div>
      <label className="text-xs font-bold text-slate-600 mb-1.5 block">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
      <input
        type={type} value={form[key] as string}
        onChange={e => setForm(p => ({ ...p, [key]: type === 'number' ? +e.target.value : e.target.value }))}
        required={required}
        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-black text-slate-800">{isNew ? 'Thêm nhân viên mới' : 'Cập nhật nhân viên'}</h2>
            <p className="text-sm text-slate-500 mt-0.5">{isNew ? 'Điền đầy đủ thông tin để tạo tài khoản' : `Đang sửa: ${emp?.full_name}`}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field('Họ và Tên', 'full_name', 'text', true)}
            {field('Số điện thoại', 'phone', 'tel')}
            {isNew && field('Email đăng nhập', 'email', 'email', true)}
            {isNew && field('Mật khẩu (mặc định: SmartKids@2024)', 'password', 'password')}
            {field('Ngày vào làm', 'hire_date', 'date', true)}
            {field('Lương cơ bản (VNĐ/tháng)', 'base_salary', 'number')}
            {field('Lương theo giờ (VNĐ/giờ)', 'hourly_rate', 'number')}
            {field('Số tài khoản ngân hàng', 'bank_account')}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Phòng ban <span className="text-red-500">*</span></label>
              <select value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value as Department }))}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all">
                <option value="cafe">Cafe</option>
                <option value="playground">Khu vui chơi</option>
                <option value="cashier">Thu ngân</option>
                <option value="management">Quản lý</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Quyền hạn</label>
              <select value={form.role_name} onChange={e => setForm(p => ({ ...p, role_name: e.target.value }))}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all">
                <option value="staff">Nhân viên</option>
                <option value="admin">Quản trị</option>
              </select>
            </div>
            {!isNew && (
              <div>
                <label className="text-xs font-bold text-slate-600 mb-1.5 block">Trạng thái</label>
                <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as Status }))}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all">
                  <option value="active">Đang làm</option>
                  <option value="on_leave">Nghỉ phép</option>
                  <option value="terminated">Đã nghỉ việc</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 h-11 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors">Hủy</button>
            <button type="submit" disabled={saving} className="flex-1 h-11 rounded-xl bg-playground-blue text-white font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
              {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
              {saving ? 'Đang lưu...' : (isNew ? 'Tạo nhân viên' : 'Lưu thay đổi')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// =================== MAIN PAGE ===================
export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [modalEmp, setModalEmp] = useState<Employee | null | undefined>(undefined); // undefined = closed
  const [actionMenu, setActionMenu] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (filterDept) params.set('department', filterDept);
      if (filterStatus) params.set('status', filterStatus);
      const res = await fetch(`${API}?${params}`);
      const json = await res.json();
      setEmployees(json.data || []);
    } catch { setEmployees([]); }
    finally { setLoading(false); }
  }, [search, filterDept, filterStatus]);

  useEffect(() => { fetchEmployees(); }, [fetchEmployees]);

  const handleDeactivate = async (id: string) => {
    if (!confirm('Vô hiệu hóa nhân viên này?')) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchEmployees();
  };

  const stats = {
    total: employees.length,
    active: employees.filter(e => e.status === 'active').length,
    on_leave: employees.filter(e => e.status === 'on_leave').length,
    admin: employees.filter(e => e.roles?.name === 'admin').length,
  };

  return (
    <div className="min-h-full">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-800">Quản lý Nhân viên</h1>
            <p className="text-slate-500 text-sm mt-1">Toàn bộ hồ sơ nhân sự của Smart Kids</p>
          </div>
          <button
            onClick={() => setModalEmp(null)}
            className="flex items-center gap-2 px-5 py-2.5 bg-playground-blue text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
          >
            <Plus size={18} /> Thêm nhân viên
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Tổng nhân viên', value: stats.total, icon: Users, color: 'text-playground-blue', bg: 'bg-blue-50' },
            { label: 'Đang làm việc', value: stats.active, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Đang nghỉ phép', value: stats.on_leave, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Quản trị viên', value: stats.admin, icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                <s.icon size={20} className={s.color} />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800">{s.value}</p>
                <p className="text-xs text-slate-500 font-medium">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text" placeholder="Tìm kiếm theo tên..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all"
            />
          </div>
          <select value={filterDept} onChange={e => setFilterDept(e.target.value)}
            className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all">
            <option value="">Tất cả phòng ban</option>
            <option value="cafe">Cafe</option>
            <option value="playground">Khu vui chơi</option>
            <option value="cashier">Thu ngân</option>
            <option value="management">Quản lý</option>
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all">
            <option value="">Tất cả trạng thái</option>
            <option value="active">Đang làm</option>
            <option value="on_leave">Nghỉ phép</option>
            <option value="terminated">Đã nghỉ</option>
          </select>
        </div>
      </div>

      <div className="hidden md:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              {['Nhân viên', 'Phòng ban', 'Liên hệ', 'Ngày vào làm', 'Lương cơ bản', 'Trạng thái', 'Quyền hạn', ''].map(h => (
                <th key={h} className="text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider px-5 py-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="text-center py-16 text-slate-400">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-playground-blue/30 border-t-playground-blue rounded-full animate-spin" />
                  <span className="text-sm font-medium">Đang tải dữ liệu...</span>
                </div>
              </td></tr>
            ) : employees.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-16">
                <div className="flex flex-col items-center gap-3 text-slate-400">
                  <Users size={40} className="opacity-30" />
                  <p className="text-sm font-medium">Chưa có nhân viên nào</p>
                  <button onClick={() => setModalEmp(null)} className="text-playground-blue font-bold text-sm hover:underline">+ Thêm nhân viên đầu tiên</button>
                </div>
              </td></tr>
            ) : employees.map(emp => {
              const status = STATUS_CONFIG[emp.status];
              const StatusIcon = status.icon;
              return (
                <tr key={emp.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={emp.full_name} size="sm" />
                      <span className="font-bold text-slate-800 text-sm">{emp.full_name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full ${DEPT_COLORS[emp.department]}`}>
                      {DEPT_LABELS[emp.department]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">{emp.phone || '—'}</td>
                  <td className="px-5 py-4 text-sm text-slate-500">{new Date(emp.hire_date).toLocaleDateString('vi-VN')}</td>
                  <td className="px-5 py-4 text-sm font-bold text-slate-700">{emp.base_salary.toLocaleString('vi-VN')} ₫</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${status.color}`}>
                      <StatusIcon size={12} /> {status.label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${emp.roles?.name === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                      {emp.roles?.name === 'admin' ? <><ShieldCheck size={11} /> Admin</> : <><ShieldAlert size={11} /> Staff</>}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setModalEmp(emp)} className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors"><Edit size={15} /></button>
                      {emp.status !== 'terminated' && (
                        <button onClick={() => handleDeactivate(emp.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden grid gap-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-playground-blue/30 border-t-playground-blue rounded-full animate-spin" />
          </div>
        ) : employees.map(emp => (
          <EmployeeCard key={emp.id} emp={emp} onEdit={setModalEmp} onDeactivate={handleDeactivate} />
        ))}
      </div>

      {modalEmp !== undefined && (
        <EmployeeModal emp={modalEmp} onClose={() => setModalEmp(undefined)} onSave={fetchEmployees} />
      )}
    </div>
  );
}
