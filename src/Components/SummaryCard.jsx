export default function SummaryCard({ subscriptions }) {
  // Calculate total monthly cost
  const totalMonthlyCost = subscriptions.reduce((acc, sub) => {
    let cost = Number(sub.price) || 0;
    if (sub.cycle === 'Yıllık') {
      cost = cost / 12;
    }
    return acc + cost;
  }, 0);

  // Group by currency for display
  const currencyTotals = subscriptions.reduce((acc, sub) => {
    let cost = Number(sub.price) || 0;
    if (sub.cycle === 'Yıllık') {
      cost = cost / 12;
    }
    
    if (!acc[sub.currency]) {
      acc[sub.currency] = 0;
    }
    acc[sub.currency] += cost;
    return acc;
  }, {});

  return (
    <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-indigo-500/20 blur-2xl group-hover:bg-indigo-500/30 transition-all"></div>
        <h3 className="text-slate-400 font-medium mb-1">Toplam Abonelik</h3>
        <p className="text-4xl font-bold text-white">{subscriptions.length}</p>
      </div>
      
      <div className="glass-panel p-6 rounded-2xl md:col-span-2 relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-cyan-500/20 blur-2xl group-hover:bg-cyan-500/30 transition-all"></div>
        <h3 className="text-slate-400 font-medium mb-1">Aylık Tahmini Gider</h3>
        <div className="flex flex-wrap gap-4 mt-2">
          {Object.keys(currencyTotals).length === 0 ? (
            <p className="text-3xl font-bold text-white">0.00</p>
          ) : (
             Object.entries(currencyTotals).map(([currency, total]) => (
               <div key={currency} className="flex items-baseline gap-1">
                 <p className="text-3xl font-bold text-white">{total.toFixed(2)}</p>
                 <span className="text-cyan-400 font-semibold">{currency}</span>
               </div>
             ))
          )}
        </div>
      </div>
    </div>
  );
}
