'use client'
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save, GripVertical } from 'lucide-react';

const API = 'http://localhost:3000/api/v1';

interface Category {
  id: string;
  name: string;
  icon: string;
  sort_order: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<Category | null | undefined>(undefined);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/categories`);
      const data = await res.json();
      setCategories(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa danh mục này?')) return;
    try {
      const res = await fetch(`${API}/categories/${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (!res.ok) {
        alert(result.error);
        return;
      }
      fetchCategories();
    } catch (err) {
      alert('Lỗi khi xóa danh mục');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Danh mục sản phẩm</h1>
          <p className="text-slate-500 text-sm mt-1">Quản lý các nhóm đồ uống và món ăn trên menu</p>
        </div>
        <button 
          onClick={() => setModal(null)}
          className="flex items-center gap-2 px-5 py-2.5 bg-playground-blue text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
        >
          <Plus size={18} /> Thêm danh mục
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 bg-slate-50/50">
          <div className="grid grid-cols-12 gap-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider px-2">
            <div className="col-span-1">TT</div>
            <div className="col-span-1 text-center">Icon</div>
            <div className="col-span-8">Tên danh mục</div>
            <div className="col-span-2 text-right">Thao tác</div>
          </div>
        </div>

        <div className="divide-y divide-slate-50">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-playground-blue/30 border-t-playground-blue rounded-full animate-spin mx-auto" />
            </div>
          ) : categories.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <p>Chưa có danh mục nào</p>
            </div>
          ) : (
            categories.map((cat, idx) => (
              <div key={cat.id} className="grid grid-cols-12 gap-4 items-center p-4 hover:bg-slate-50/50 transition-colors group">
                <div className="col-span-1 text-sm font-bold text-slate-400">{cat.sort_order}</div>
                <div className="col-span-1 text-center text-xl">{cat.icon}</div>
                <div className="col-span-8">
                  <span className="font-bold text-slate-800">{cat.name}</span>
                </div>
                <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => setModal(cat)}
                    className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(cat.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {modal !== undefined && (
        <CategoryModal 
          item={modal} 
          onClose={() => setModal(undefined)} 
          onSave={fetchCategories} 
        />
      )}
    </div>
  );
}

function CategoryModal({ item, onClose, onSave }: { item: Category | null; onClose: () => void; onSave: () => void; }) {
  const isNew = !item;
  const [form, setForm] = useState({
    name: item?.name || '',
    icon: item?.icon || '☕',
    sort_order: item?.sort_order || 0
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = isNew ? `${API}/categories` : `${API}/categories/${item?.id}`;
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        onSave();
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-800">{isNew ? 'Thêm danh mục' : 'Sửa danh mục'}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1.5 block">Tên danh mục *</label>
            <input 
              type="text" 
              value={form.name} 
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              required
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all font-bold"
              placeholder="VD: Cà phê, Trà sữa..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Icon (Emoji)</label>
              <input 
                type="text" 
                value={form.icon} 
                onChange={e => setForm(p => ({ ...p, icon: e.target.value }))}
                className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-xl focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Thứ tự hiển thị</label>
              <input 
                type="number" 
                value={form.sort_order} 
                onChange={e => setForm(p => ({ ...p, sort_order: +e.target.value }))}
                className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all font-bold"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 h-11 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              disabled={saving}
              className="flex-1 h-11 rounded-xl bg-playground-blue text-white font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {saving ? 'Đang lưu...' : 'Lưu danh mục'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
