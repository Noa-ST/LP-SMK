'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Edit, AlertTriangle, X, Save, Package, Warehouse } from 'lucide-react';

const API = 'http://localhost:3000/api/v1';

interface Ingredient {
  id: string; name: string; unit: string; current_stock: number;
  min_stock_alert: number; cost_per_unit: number; 
  category: 'fresh' | 'dry' | 'frozen' | 'packaging' | 'other';
  expiry_date?: string;
  storage_condition: 'room' | 'fridge' | 'freezer';
  supplier?: string;
  location?: string; 
  is_low_stock?: boolean; 
  stock_percentage?: number;
  // 2 truong moi
  ingredient_type: 'base' | 'topping' | 'fresh_fruit' | 'packaging';
  purchase_unit?: string;
  purchase_to_use_ratio?: number;
}

const ING_CAT_LABELS: Record<string, string> = {
  fresh: 'Hàng tươi sống',
  dry: 'Hàng khô/Gia vị',
  frozen: 'Hàng đông lạnh',
  packaging: 'Bao bì/Vật tư',
  other: 'Khác'
};

const STORAGE_LABELS: Record<string, string> = {
  room: 'Nhiệt độ phòng',
  fridge: 'Ngăn mát',
  freezer: 'Ngăn đông'
};

const ING_CAT_COLORS: Record<string, string> = {
  fresh: 'bg-emerald-100 text-emerald-700',
  dry: 'bg-amber-100 text-amber-700',
  frozen: 'bg-blue-100 text-blue-700',
  packaging: 'bg-slate-100 text-slate-700',
  other: 'bg-gray-100 text-gray-700'
};

const ING_TYPE_LABELS: Record<string, string> = {
  base: 'Nguyên liệu nền',
  topping: 'Topping',
  fresh_fruit: 'Trái cây tươi',
  packaging: 'Bao bì/Vật tư',
};

const ING_TYPE_COLORS: Record<string, string> = {
  base: 'bg-violet-100 text-violet-700',
  topping: 'bg-pink-100 text-pink-700',
  fresh_fruit: 'bg-lime-100 text-lime-700',
  packaging: 'bg-slate-100 text-slate-500',
};

const ING_TYPE_ICONS: Record<string, string> = {
  base: '☕',
  topping: '🧁',
  fresh_fruit: '🍓',
  packaging: '📦',
};

function IngredientModal({ item, onClose, onSave }: { item: Ingredient | null; onClose: () => void; onSave: () => void; }) {
  const isNew = !item;
  const [form, setForm] = useState({ 
    name: item?.name || '', 
    unit: item?.unit || 'g', 
    current_stock: item?.current_stock || 0, 
    min_stock_alert: item?.min_stock_alert || 0, 
    cost_per_unit: item?.cost_per_unit || 0, 
    category: item?.category || 'dry',
    expiry_date: item?.expiry_date || '',
    storage_condition: item?.storage_condition || 'room',
    supplier: item?.supplier || '', 
    location: item?.location || '',
    // 2 truong moi
    ingredient_type: item?.ingredient_type || 'base',
    purchase_unit: item?.purchase_unit || '',
    purchase_to_use_ratio: item?.purchase_to_use_ratio || 1,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError('');
    try {
      const url = isNew ? `${API}/ingredients` : `${API}/ingredients/${item?.id}`;
      const res = await fetch(url, { method: isNew ? 'POST' : 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const result = await res.json();
      if (!res.ok) { setError(result.error); return; }
      onSave(); onClose();
    } catch { setError('Lỗi kết nối'); } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-800">{isNew ? 'Thêm nguyên vật liệu' : 'Cập nhật nguyên vật liệu'}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Tên nguyên liệu *</label>
              <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all" />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Loại nguyên liệu *</label>
              <select value={form.ingredient_type} onChange={e => setForm(p => ({ ...p, ingredient_type: e.target.value as any }))}
                className="w-full h-10 px-3 bg-violet-50 border border-violet-200 rounded-xl text-sm font-bold text-violet-700">
                {Object.entries(ING_TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{ING_TYPE_ICONS[v]} {l}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Phân loại bảo quản</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value as any }))}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700">
                {Object.entries(ING_CAT_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Điều kiện bảo quản</label>
              <select value={form.storage_condition} onChange={e => setForm(p => ({ ...p, storage_condition: e.target.value as any }))}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700">
                {Object.entries(STORAGE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>

            {/* SECTION: Don vi nhap kho & Ty le quy doi */}
            <div className="col-span-2 bg-blue-50/60 border border-blue-100 rounded-xl p-4 space-y-3">
              <p className="text-xs font-black text-blue-700 uppercase tracking-wider">📦 Đơn vị nhập kho & Quy đổi</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-1.5 block">Đơn vị nhập kho</label>
                  <input type="text" placeholder="Ví dụ: Túi 1kg, Thùng 12 hộp"
                    value={form.purchase_unit} onChange={e => setForm(p => ({ ...p, purchase_unit: e.target.value }))}
                    className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-1.5 block">Tỷ lệ quy đổi <span className="text-slate-400 font-normal">(1 đơn vị nhập = ? đơn vị dùng)</span></label>
                  <input type="number" min="1" placeholder="Ví dụ: 1000 (1kg = 1000g)"
                    value={form.purchase_to_use_ratio} onChange={e => setForm(p => ({ ...p, purchase_to_use_ratio: +e.target.value }))}
                    className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-sm" />
                </div>
              </div>
              <p className="text-[11px] text-blue-500 italic">
                {form.purchase_unit && form.purchase_to_use_ratio > 1
                  ? `→ 1 ${form.purchase_unit} = ${form.purchase_to_use_ratio} ${form.unit || 'đơn vị'}. Giá/đơn vị sử dụng: ${form.cost_per_unit > 0 ? Math.round(form.cost_per_unit / form.purchase_to_use_ratio).toLocaleString('vi-VN') + ' ₫' : '—'}`
                  : 'Điền để tự động tính giá vốn theo đơn vị sử dụng'}
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Đơn vị tính</label>
              <input type="text" value={form.unit} onChange={e => setForm(p => ({ ...p, unit: e.target.value }))}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Tồn kho hiện tại</label>
              <input type="number" value={form.current_stock} onChange={e => setForm(p => ({ ...p, current_stock: +e.target.value }))}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Mức cảnh báo tồn</label>
              <input type="number" value={form.min_stock_alert} onChange={e => setForm(p => ({ ...p, min_stock_alert: +e.target.value }))}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Giá nhập/đơn vị</label>
              <input type="number" value={form.cost_per_unit} onChange={e => setForm(p => ({ ...p, cost_per_unit: +e.target.value }))}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Ngày hết hạn (Nếu có)</label>
              <input type="date" value={form.expiry_date} onChange={e => setForm(p => ({ ...p, expiry_date: e.target.value }))}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Vị trí kho</label>
              <input type="text" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            </div>

            <div className="col-span-2">
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Nhà cung cấp</label>
              <input type="text" value={form.supplier} onChange={e => setForm(p => ({ ...p, supplier: e.target.value }))}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="flex-1 h-11 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors">Hủy</button>
            <button type="submit" disabled={saving} className="flex-1 h-11 rounded-xl bg-playground-blue text-white font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
              {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
              {saving ? 'Đang lưu...' : 'Lưu lại'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function IngredientsPage() {
  const [items, setItems] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterLow, setFilterLow] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [modal, setModal] = useState<Ingredient | null | undefined>(undefined);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (filterLow) params.set('low_stock', 'true');
    if (filterType) params.set('ingredient_type', filterType);
    const res = await fetch(`${API}/ingredients?${params}`);
    const data = await res.json();
    setItems(data.data || []); setLoading(false);
  }, [search, filterLow, filterType]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const lowCount = items.filter(i => i.is_low_stock).length;

  return (
    <div className="min-h-full">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-800">Nguyên vật liệu</h1>
            <p className="text-slate-500 text-sm mt-1">Quản lý tồn kho nguyên liệu và cảnh báo sắp hết</p>
          </div>
          <button onClick={() => setModal(null)} className="flex items-center gap-2 px-5 py-2.5 bg-playground-blue text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20">
            <Plus size={18} /> Thêm nguyên liệu
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[{ label: 'Tổng nguyên liệu', value: items.length, color: 'text-blue-600', bg: 'bg-blue-50', icon: Package },
            { label: 'Sắp hết hàng', value: lowCount, color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle },
            { label: 'Bình thường', value: items.length - lowCount, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: Warehouse }].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}><s.icon size={20} className={s.color} /></div>
              <div><p className={`text-2xl font-black ${s.color}`}>{s.value}</p><p className="text-xs text-slate-500 font-medium">{s.label}</p></div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-6 shadow-sm flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Tìm nguyên liệu..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all" />
        </div>
        <select value={filterType} onChange={e => setFilterType(e.target.value)}
          className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 font-bold">
          <option value="">Tất cả loại</option>
          {Object.entries(ING_TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{ING_TYPE_ICONS[v]} {l}</option>)}
        </select>
        <button onClick={() => setFilterLow(!filterLow)}
          className={`px-4 h-10 rounded-xl text-sm font-bold transition-colors ${filterLow ? 'bg-red-100 text-red-600' : 'bg-slate-50 border border-slate-200 text-slate-600'}`}>
          <AlertTriangle size={14} className="inline mr-1.5" />Sắp hết
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              {['Nguyên liệu', 'Loại', 'Bảo quản', 'Tồn kho', 'Đvị nhập', 'Hạn dùng', 'Giao động', 'Giá nhập', ''].map(h => (
                <th key={h} className="text-left text-xs font-extrabold text-slate-500 uppercase tracking-wider px-5 py-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="text-center py-16"><div className="w-8 h-8 border-2 border-playground-blue/30 border-t-playground-blue rounded-full animate-spin mx-auto" /></td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-16 text-slate-400">
                <Package size={40} className="mx-auto opacity-30 mb-3" />
                <p className="text-sm font-medium">Chưa có nguyên liệu nào</p>
              </td></tr>
            ) : items.map(item => (
              <tr key={item.id} className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${item.is_low_stock ? 'bg-red-50/30' : ''}`}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    {item.is_low_stock && <AlertTriangle size={14} className="text-red-500 shrink-0" />}
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{item.unit}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="space-y-1">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full ${ING_TYPE_COLORS[item.ingredient_type] || 'bg-gray-100'}`}>
                      {ING_TYPE_ICONS[item.ingredient_type]} {ING_TYPE_LABELS[item.ingredient_type] || 'Khác'}
                    </span>
                    <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full block w-fit ${ING_CAT_COLORS[item.category] || 'bg-gray-100'}`}>
                      {ING_CAT_LABELS[item.category] || 'Khác'}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Warehouse size={13} className="text-slate-400" />
                    <span className="text-xs font-bold">{STORAGE_LABELS[item.storage_condition] || 'Thường'}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`font-black text-sm ${item.is_low_stock ? 'text-red-600' : 'text-slate-800'}`}>{item.current_stock} {item.unit}</span>
                  {item.min_stock_alert > 0 && <p className="text-[10px] text-slate-400 mt-0.5">Cảnh báo: {item.min_stock_alert}</p>}
                </td>
                <td className="px-5 py-4">
                  {item.purchase_unit ? (
                    <div>
                      <p className="text-xs font-bold text-slate-700">{item.purchase_unit}</p>
                      <p className="text-[10px] text-slate-400">×{item.purchase_to_use_ratio} {item.unit}</p>
                    </div>
                  ) : <span className="text-slate-300">—</span>}
                </td>
                <td className="px-5 py-4 text-xs text-slate-500 font-medium">
                  {item.expiry_date ? new Date(item.expiry_date).toLocaleDateString('vi-VN') : '—'}
                </td>
                <td className="px-5 py-4 w-36">
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full transition-all ${(item.stock_percentage || 0) < 30 ? 'bg-red-500' : (item.stock_percentage || 0) < 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      style={{ width: `${item.stock_percentage || 0}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 font-bold">{item.stock_percentage || 0}%</p>
                </td>
                <td className="px-5 py-4 text-sm text-slate-600 font-bold">{item.cost_per_unit.toLocaleString('vi-VN')}₫</td>
                <td className="px-5 py-4">
                  <button onClick={() => setModal(item)} className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors"><Edit size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal !== undefined && <IngredientModal item={modal} onClose={() => setModal(undefined)} onSave={fetchItems} />}
    </div>
  );
}
