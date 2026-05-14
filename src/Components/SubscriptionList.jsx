import SubscriptionCard from './SubscriptionCard.jsx';
import { LayoutGrid } from 'lucide-react';

export default function SubscriptionList({ subscriptions, onEdit, onDelete }) {
  if (subscriptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <LayoutGrid className="text-slate-500" size={32} />
        </div>
        <h3 className="text-xl font-medium text-slate-300 mb-2">Henüz abonelik yok</h3>
        <p className="text-slate-500 text-center max-w-sm">
          Aboneliklerinizi takip etmeye başlamak için "Yeni Abonelik Ekle" butonuna tıklayın.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {subscriptions.map(sub => (
        <SubscriptionCard 
          key={sub.id} 
          subscription={sub} 
          onEdit={() => onEdit(sub)}
          onDelete={() => onDelete(sub.id)}
        />
      ))}
    </div>
  );
}
