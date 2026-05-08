'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Plus, ArrowDownCircle, ArrowUpCircle, RotateCcw, X, Save, ScrollText } from 'lucide-react';

const API = 'http://localhost:3000/api/v1';
type LogType = 'import' | 'export' | 'adjust';

interface InventoryLog {
  id: string; type: LogType; quantity_change: number; quantity_before: number; quantity_after: number;
  note?: string; created_at: string;
  ingredients?: { id: string; name: string; unit: string };
  employees?: { id: string; full_name: string };
}
interface Ingredient { id: string; name: string; unit: string; }

const TYPE_CONFIG: Record<LogType, { label: string; color: string; icon: React.ElementType; sign: string }> = {
  import: { label: 'Nhập kho', color: 'bg-emerald-100 text-emerald-700', icon: ArrowDownCircle, sign: '+' },
  export: { label: 'Xuất kho', color: 'bg-red-100 text-red-600', icon: ArrowUpCircle, sign: '-' },
  adjust: { label: 'Điều chỉnh', color: 'bg-blue-100 text-blue-700', icon: RotateCcw, sign: '~' },
};

function LogModal({ ingredients, onClose, onSave }: { ingredients: Ingredient[]; onClose: () => void; onSave: () => void; }) {
  const [form, setForm] = useState({ ingredient_id: ingredients[0]?.id || '', type: 'import' as LogType, quantity_change: 0, note: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError('');
    try {
      const res = await fetch(`${API}/inventory/logs`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const result = await res.json();
      if (!res.ok) { setError(result.error); return; }
      onSave(); onClose();
    } catch { setError('Lỗi kết nối'); } finally { setSaving(false); }
  };

  const selectedIng = ingredients.find(i => i.id === form.ingredient_id);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-800">Ghi nhận nhập/xuất kho</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>}
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1.5 block">Nguyên vật liệu *</label>
            <select value={form.ingredient_id} onChange={e => setForm(p => ({ ...p, ingredient_id: e.target.value }))}
              className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all">
              {ingredients.map(i => <option key={i.id} value={i.id}>{i.name} ({i.unit})</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1.5 block">Loại giao dịch *</label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.entries(TYPE_CONFIG) as [LogType, typeof TYPE_CONFIG[LogType]][]).map(([type, cfg]) => (
                <button key={type} type="button" onClick={() => setForm(p => ({ ...p, type }))}
                  className={`p-3 rounded-xl border-2 text-xs font-bold transition-all ${form.type === type ? 'border-playground-blue bg-blue-50 text-playground-blue' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                  <cfg.icon size={16} className="mx-auto mb-1" /> {cfg.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1.5 block">Số lượng ({selectedIng?.unit || ''})</label>
            <input type="number" min="0" value={form.quantity_change} onChange={e => setForm(p => ({ ...p, quantity_change: +e.target.value }))}
              className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1.5 block">Ghi chú</label>
            <textarea value={form.note} onChange={e => setForm(p => ({ ...p, note: e.target.value }))} rows={2} placeholder="Lý do nhập/xuất, nhà cung cấp..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 h-11 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors">Hủy</button>
            <button type="submit" disabled={saving} className="flex-1 h-11 rounded-xl bg-playground-blue text-white font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
              {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
              {saving ? 'Đang lưu...' : 'Xác nhận'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function InventoryLogsPage() {
  const [logs, setLogs] = useState<InventoryLog[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filterType) params.set('type', filterType);
    const [logRes, ingRes] = await Promise.all([fetch(`${API}/inventory/logs?${params}`), fetch(`${API}/ingredients`)]);
    const [logData, ingData] = await Promise.all([logRes.json(), ingRes.json()]);
    setLogs(logData.data || []); setIngredients(ingData.data || []); setLoading(false);
  }, [filterType]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <div className="min-h-full">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Lịch sử Nhập/Xuất Kho</h1>
          <p className="text-slate-500 text-sm mt-1">Toàn bộ biến động tồn kho nguyên vật liệu</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-playground-blue text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20">
          <Plus size={18} /> Ghi nhận giao dịch
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-6 shadow-sm flex gap-2">
        {[{ value: '', label: 'Tất cả' }, { value: 'import', label: 'Nhập kho' }, { value: 'export', label: 'Xuất kho' }, { value: 'adjust', label: 'Điều chỉnh' }].map(opt => (
          <button key={opt.value} onClick={() => setFilterType(opt.value)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${filterType === opt.value ? 'bg-playground-blue text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
            {opt.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              {['Thời gian', 'Nguyên liệu', 'Loại', 'Thay đổi', 'Trước', 'Sau', 'Người thực hiện', 'Ghi chú'].map(h => (
                <th key={h} className="text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider px-5 py-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="text-center py-16"><div className="w-8 h-8 border-2 border-playground-blue/30 border-t-playground-blue rounded-full animate-spin mx-auto" /></td></tr>
            ) : logs.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-16 text-slate-400">
                <ScrollText size={40} className="mx-auto opacity-30 mb-3" />
                <p className="text-sm font-medium">Chưa có giao dịch nào</p>
              </td></tr>
            ) : logs.map(log => {
              const cfg = TYPE_CONFIG[log.type];
              const TypeIcon = cfg.icon;
              return (
                <tr key={log.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 text-sm text-slate-500 whitespace-nowrap">{new Date(log.created_at).toLocaleString('vi-VN')}</td>
                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-800 text-sm">{log.ingredients?.name || '—'}</p>
                    <p className="text-xs text-slate-400">{log.ingredients?.unit}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${cfg.color}`}>
                      <TypeIcon size={12} /> {cfg.label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`font-black text-sm ${log.type === 'import' ? 'text-emerald-600' : log.type === 'export' ? 'text-red-500' : 'text-blue-600'}`}>
                      {cfg.sign}{log.quantity_change}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">{log.quantity_before}</td>
                  <td className="px-5 py-4 text-sm font-bold text-slate-700">{log.quantity_after}</td>
                  <td className="px-5 py-4 text-sm text-slate-500">{log.employees?.full_name || 'Hệ thống'}</td>
                  <td className="px-5 py-4 text-sm text-slate-400 max-w-[200px] truncate">{log.note || '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showModal && <LogModal ingredients={ingredients} onClose={() => setShowModal(false)} onSave={fetchData} />}
    </div>
  );
}
