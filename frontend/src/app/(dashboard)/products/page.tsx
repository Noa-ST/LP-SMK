'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Edit, Trash2, X, Save, ToggleLeft, ToggleRight, Tag, Coffee } from 'lucide-react';

const API = 'http://localhost:3000/api/v1';

interface Category { id: string; name: string; icon: string; }
interface Product {
  id: string; name: string; name_en?: string; description?: string;
  category_id: string; price: number; price_weekend?: number;
  unit: string; is_available: boolean; sort_order: number; image_url?: string;
  categories?: Category;
}

function ProductModal({ product, categories, products, onClose, onSave }: { product: Product | null; categories: Category[]; products: Product[]; onClose: () => void; onSave: () => void; }) {
  const isNew = !product;
  const [form, setForm] = useState({ name: product?.name || '', name_en: product?.name_en || '', description: product?.description || '', category_id: product?.category_id || categories[0]?.id || '', price: product?.price || 0, price_weekend: product?.price_weekend || 0, unit: product?.unit || 'ly', is_available: product?.is_available ?? true, sort_order: product?.sort_order || 0 });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError('');
    try {
      const url = isNew ? `${API}/products` : `${API}/products/${product?.id}`;
      const res = await fetch(url, { method: isNew ? 'POST' : 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const result = await res.json();
      if (!res.ok) { setError(result.error); return; }
      onSave(); onClose();
    } catch { setError('Lỗi kết nối'); } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-800">{isNew ? 'Thêm sản phẩm mới' : 'Cập nhật sản phẩm'}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Tên sản phẩm *</label>
              <input type="text" value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all" />
            </div>
            
            <div className="col-span-2">
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Danh mục *</label>
              <select value={form.category_id} onChange={e => {
                const catId = e.target.value;
                // Goi y so thu tu tiep theo trong danh muc nay
                const nextSort = products.filter(p => p.category_id === catId).length + 1;
                setForm(p => ({ ...p, category_id: catId, sort_order: isNew ? nextSort : p.sort_order }));
              }}
                className="w-full h-10 px-3 bg-playground-blue/5 border border-playground-blue/20 rounded-xl text-sm font-bold text-playground-blue focus:outline-none focus:ring-2 focus:ring-playground-blue/20 transition-all">
                {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Giá bán (VNĐ) *</label>
              <input type="number" value={form.price}
                onChange={e => setForm(p => ({ ...p, price: +e.target.value }))}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all" />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Giá cuối tuần</label>
              <input type="number" value={form.price_weekend}
                onChange={e => setForm(p => ({ ...p, price_weekend: +e.target.value }))}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all" />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Đơn vị</label>
              <input type="text" value={form.unit}
                onChange={e => setForm(p => ({ ...p, unit: e.target.value }))}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all" />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 block flex items-center justify-between">
                Thứ tự 
                <span className="text-[10px] text-playground-blue bg-blue-50 px-1.5 py-0.5 rounded">Trong danh mục</span>
              </label>
              <select 
                value={form.sort_order}
                onChange={e => setForm(p => ({ ...p, sort_order: +e.target.value }))}
                className="w-full h-10 px-3 bg-white border-2 border-playground-blue/30 rounded-xl text-sm font-black text-playground-blue focus:outline-none focus:ring-2 focus:ring-playground-blue/20 transition-all appearance-none"
              >
                {Array.from({ length: 100 }, (_, i) => i + 1).map(num => {
                  // Kiem tra xem so nay da duoc san pham khac trong cung danh muc dung chua
                  const isUsed = products.some(p => 
                    p.category_id === form.category_id && 
                    p.sort_order === num && 
                    p.id !== product?.id // Khong tinh chinh san pham dang sua
                  );
                  
                  if (isUsed) return null;
                  return <option key={num} value={num}>Vị trí số {num}</option>;
                })}
              </select>
            </div>

            <div className="col-span-2">
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Hình ảnh sản phẩm</label>
              <div className="flex gap-5 items-center p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl group hover:border-playground-blue/50 transition-all">
                <div className="w-24 h-24 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex items-center justify-center shrink-0">
                  {form.image_url ? (
                    <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Coffee className="text-slate-300" size={32} />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-sm font-bold text-slate-700">Ảnh minh họa sản phẩm</p>
                  <p className="text-[11px] text-slate-400 font-medium">Định dạng hỗ trợ: JPG, PNG, WEBP (Tối đa 2MB)</p>
                  <div className="flex gap-2">
                    <input 
                      type="file" 
                      id="product_image" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        
                        // Logic upload len Supabase Storage
                        try {
                          const { createClient } = await import('@/lib/supabase/client');
                          const supabase = createClient();
                          const fileExt = file.name.split('.').pop();
                          const fileName = `${Math.random()}.${fileExt}`;
                          const filePath = `products/${fileName}`;

                          const { error: uploadError } = await supabase.storage
                            .from('products')
                            .upload(filePath, file);

                          if (uploadError) throw uploadError;

                          const { data: { publicUrl } } = supabase.storage
                            .from('products')
                            .getPublicUrl(filePath);

                          setForm(p => ({ ...p, image_url: publicUrl }));
                        } catch (err: any) {
                          alert('Lỗi tải ảnh: ' + err.message);
                        }
                      }}
                    />
                    <label 
                      htmlFor="product_image"
                      className="px-4 py-2 bg-playground-blue text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-blue-600 transition-all shadow-md shadow-blue-500/20 flex items-center gap-2"
                    >
                      <Plus size={14} /> Tải ảnh lên
                    </label>
                    {form.image_url && (
                      <button 
                        type="button"
                        onClick={() => setForm(p => ({ ...p, image_url: '' }))}
                        className="px-4 py-2 bg-white border border-red-100 text-red-500 rounded-lg text-xs font-bold hover:bg-red-50 transition-all"
                      >
                        Xóa ảnh
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Tên tiếng Anh (Nếu có)</label>
              <input type="text" value={form.name_en}
                onChange={e => setForm(p => ({ ...p, name_en: e.target.value }))}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1.5 block">Mô tả</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all" />
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <button type="button" onClick={() => setForm(p => ({ ...p, is_available: !p.is_available }))}>
              {form.is_available ? <ToggleRight size={28} className="text-emerald-500" /> : <ToggleLeft size={28} className="text-slate-400" />}
            </button>
            <span className="text-sm font-bold text-slate-700">{form.is_available ? 'Đang bán' : 'Tạm ngưng bán'}</span>
          </div>
          <div className="flex gap-3 pt-2">
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [modal, setModal] = useState<Product | null | undefined>(undefined);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (filterCat) params.set('category_id', filterCat);
    const [pRes, cRes] = await Promise.all([fetch(`${API}/products?${params}`), fetch(`${API}/categories`)]);
    const [pData, cData] = await Promise.all([pRes.json(), cRes.json()]);
    setProducts(pData.data || []); setCategories(cData.data || []); setLoading(false);
  }, [search, filterCat]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const toggleAvailable = async (p: Product) => {
    await fetch(`${API}/products/${p.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_available: !p.is_available }) });
    fetchAll();
  };

  return (
    <div className="min-h-full">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-800">Menu & Sản phẩm</h1>
            <p className="text-slate-500 text-sm mt-1">Quản lý toàn bộ món ăn, đồ uống và vé vui chơi</p>
          </div>
          <button onClick={() => setModal(null)} className="flex items-center gap-2 px-5 py-2.5 bg-playground-blue text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20">
            <Plus size={18} /> Thêm sản phẩm
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[{ label: 'Tổng sản phẩm', value: products.length, color: 'text-blue-600' }, { label: 'Đang bán', value: products.filter(p => p.is_available).length, color: 'text-emerald-600' }, { label: 'Tạm ngưng', value: products.filter(p => !p.is_available).length, color: 'text-slate-500' }].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-500 font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-6 shadow-sm flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Tìm sản phẩm..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-playground-blue/20 focus:border-playground-blue transition-all" />
        </div>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
          className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-playground-blue/20">
          <option value="">Tất cả danh mục</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-playground-blue/30 border-t-playground-blue rounded-full animate-spin" /></div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-slate-400">
          <Coffee size={48} className="opacity-30 mb-4" />
          <p className="font-bold mb-4">Chưa có sản phẩm nào</p>
          <button onClick={() => setModal(null)} className="px-4 py-2 bg-playground-blue text-white rounded-xl text-sm font-bold">+ Thêm sản phẩm</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map(p => (
            <div key={p.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition-all ${!p.is_available ? 'opacity-60' : ''} border-slate-100`}>
              <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center relative">
                {p.image_url ? <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" /> : <span className="text-5xl">{p.categories?.icon || '🍽️'}</span>}
                <button onClick={() => toggleAvailable(p)}
                  className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-bold transition-colors ${p.is_available ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                  {p.is_available ? 'Đang bán' : 'Ngưng bán'}
                </button>
              </div>
              <div className="p-4">
                <p className="font-bold text-slate-800 text-sm">{p.name}</p>
                {p.categories && <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 mt-0.5"><Tag size={10} /> {p.categories.name}</span>}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                  <div>
                    <p className="text-lg font-black text-playground-blue">{p.price.toLocaleString('vi-VN')}₫</p>
                    {p.price_weekend && <p className="text-[11px] text-slate-400">CN: {p.price_weekend.toLocaleString('vi-VN')}₫</p>}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => setModal(p)} className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors"><Edit size={15} /></button>
                    <button onClick={async () => { if (confirm('Ẩn sản phẩm?')) { await fetch(`${API}/products/${p.id}`, { method: 'DELETE' }); fetchAll(); } }}
                      className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {modal !== undefined && <ProductModal product={modal} categories={categories} products={products} onClose={() => setModal(undefined)} onSave={fetchAll} />}
    </div>
  );
}
