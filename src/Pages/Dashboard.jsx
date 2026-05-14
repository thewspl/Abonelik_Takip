import { useState, useEffect } from 'react';
import SubscriptionForm from '../Components/SubscriptionForm.jsx';
import SubscriptionList from '../Components/SubscriptionList.jsx';
import SummaryCard from '../Components/SummaryCard.jsx';
import { PlusCircle } from 'lucide-react';

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem('subscriptions');
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSub, setEditingSub] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  const handleAddOrUpdate = (sub) => {
    if (editingSub) {
      setSubscriptions(subscriptions.map(s => s.id === sub.id ? sub : s));
    } else {
      setSubscriptions([...subscriptions, sub]);
    }
    setIsFormOpen(false);
    setEditingSub(null);
  };

  const handleDelete = (id) => {
    setDeletingId(id);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setSubscriptions(subscriptions.filter(s => s.id !== deletingId));
      setDeletingId(null);
    }
  };

  const handleEdit = (sub) => {
    setEditingSub(sub);
    setIsFormOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2">
            Abonelik Merkezi
          </h1>
          <p className="text-slate-400 text-lg">Tüm aboneliklerinizi ve giderlerinizi tek bir yerden yönetin.</p>
        </div>
        
        <button 
          onClick={() => {
            setEditingSub(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-indigo-500/30"
        >
          <PlusCircle size={20} />
          Yeni Abonelik Ekle
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <SummaryCard subscriptions={subscriptions} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="w-8 h-1 bg-indigo-500 rounded-full inline-block"></span>
          Aktif Abonelikler
        </h2>
        <SubscriptionList 
          subscriptions={subscriptions} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <SubscriptionForm 
              initialData={editingSub}
              onSubmit={handleAddOrUpdate}
              onClose={() => {
                setIsFormOpen(false);
                setEditingSub(null);
              }}
            />
          </div>
        </div>
      )}

      {deletingId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Aboneliği Sil</h3>
            <p className="text-slate-400 mb-6">Bu aboneliği silmek istediğinize emin misiniz? Bu işlem geri alınamaz.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeletingId(null)} 
                className="flex-1 py-2.5 rounded-lg border border-slate-600 text-slate-300 font-medium hover:bg-slate-800 transition-all"
              >
                İptal
              </button>
              <button 
                onClick={confirmDelete} 
                className="flex-1 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg shadow-rose-500/25 transition-all"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
