import { useState, useEffect } from 'react';
import { POPULAR_CURRENCIES, CATEGORIES } from '../Interfaces/Subscription.js';
import { X } from 'lucide-react';

export default function SubscriptionForm({ initialData, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    currency: '₺',
    cycle: 'Aylık',
    startDate: new Date().toISOString().split('T')[0],
    category: 'Diğer',
    description: '',
    customLogoUrl: ''
  });

  const [isCustomCurrency, setIsCustomCurrency] = useState(false);
  const [customCurrencyVal, setCustomCurrencyVal] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (!POPULAR_CURRENCIES.includes(initialData.currency)) {
        setIsCustomCurrency(true);
        setCustomCurrencyVal(initialData.currency);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCurrencyChange = (e) => {
    const val = e.target.value;
    if (val === 'other') {
      setIsCustomCurrency(true);
      setFormData(prev => ({ ...prev, currency: customCurrencyVal || '?' }));
    } else {
      setIsCustomCurrency(false);
      setFormData(prev => ({ ...prev, currency: val }));
    }
  };

  const handleCustomCurrencyChange = (e) => {
    const val = e.target.value;
    setCustomCurrencyVal(val);
    setFormData(prev => ({ ...prev, currency: val }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, customLogoUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.currency || !formData.startDate) {
      alert('Lütfen zorunlu alanları doldurun.');
      return;
    }

    const submission = {
      id: initialData?.id || crypto.randomUUID(),
      name: formData.name,
      price: Number(formData.price),
      currency: formData.currency,
      cycle: formData.cycle,
      startDate: formData.startDate,
      category: formData.category,
      description: formData.description,
      customLogoUrl: formData.customLogoUrl
    };

    onSubmit(submission);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {initialData ? 'Aboneliği Düzenle' : 'Yeni Abonelik'}
        </h2>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Abonelik Adı (Örn: Spotify)*</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            placeholder="Spotify, Netflix vs."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Fiyat*</label>
            <input 
              type="number" 
              name="price"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Para Birimi*</label>
            <div className="flex gap-2">
              <select 
                value={isCustomCurrency ? 'other' : formData.currency}
                onChange={handleCurrencyChange}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-all"
              >
                {POPULAR_CURRENCIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
                <option value="other">Diğer</option>
              </select>
              {isCustomCurrency && (
                <input 
                  type="text"
                  value={customCurrencyVal}
                  onChange={handleCustomCurrencyChange}
                  placeholder="Birim"
                  className="w-16 bg-slate-800 border border-slate-700 rounded-lg px-2 py-2.5 text-center text-white focus:outline-none focus:border-indigo-500"
                />
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Döngü*</label>
            <select 
              name="cycle"
              value={formData.cycle}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-all"
            >
              <option value="Aylık">Aylık</option>
              <option value="Yıllık">Yıllık</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Başlangıç Tarihi*</label>
            <input 
              type="date" 
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-all"
              style={{ colorScheme: 'dark' }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Kategori</label>
          <select 
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-all"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Logo / Görsel (Opsiyonel)</label>
          <div className="flex items-center gap-4">
            {formData.customLogoUrl ? (
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                <img src={formData.customLogoUrl} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, customLogoUrl: '' }))}
                  className="absolute top-1 right-1 bg-black/60 p-0.5 rounded-full text-white hover:bg-rose-500 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 border-dashed flex items-center justify-center shrink-0">
                <span className="text-xs text-slate-500">Görsel Yok</span>
              </div>
            )}
            
            <div className="flex-1">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-slate-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-600 file:text-white
                  hover:file:bg-indigo-500 file:cursor-pointer file:transition-all"
              />
              <p className="text-xs text-slate-500 mt-2">Cihazınızdan bir fotoğraf/logo seçin. Seçtiğiniz fotoğraf otomatik yüklenecektir.</p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Açıklama (Opsiyonel)</label>
          <textarea 
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            rows={2}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-all resize-none"
            placeholder="Kısa bir not..."
          ></textarea>
        </div>

        <div className="pt-4 flex gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-lg border border-slate-600 text-slate-300 font-medium hover:bg-slate-800 transition-all"
          >
            İptal
          </button>
          <button 
            type="submit"
            className="flex-1 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-500/25 transition-all"
          >
            {initialData ? 'Güncelle' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
}
