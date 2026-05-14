import { Edit2, Trash2, CalendarClock } from "lucide-react";

export default function SubscriptionCard({
  subscription,
  onEdit,
  onDelete,
}) {
  const calculateRemainingDays = (startDateStr, cycle) => {
    const start = new Date(startDateStr);
    const today = new Date();

    // Reset times to compare just dates
    today.setHours(0, 0, 0, 0);
    let nextBilling = new Date(start);
    nextBilling.setHours(0, 0, 0, 0);

    // Eğer abonelik tam olarak bugün eklendiyse, bir sonraki fatura tarihi gelecek döngüdür.
    if (nextBilling.getTime() === today.getTime()) {
      if (cycle === "Aylık") {
        nextBilling.setMonth(nextBilling.getMonth() + 1);
      } else {
        nextBilling.setFullYear(nextBilling.getFullYear() + 1);
      }
    } else {
      // Geçmişteki veya gelecekteki bir tarihse, bugünden büyük eşit ilk fatura tarihini bulalım
      while (nextBilling < today) {
        if (cycle === "Aylık") {
          nextBilling.setMonth(nextBilling.getMonth() + 1);
        } else {
          nextBilling.setFullYear(nextBilling.getFullYear() + 1);
        }
      }
    }

    const diffTime = nextBilling.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const daysLeft = calculateRemainingDays(
    subscription.startDate,
    subscription.cycle,
  );

  // Generate initials for avatar if no logo
  const initials = subscription.name.substring(0, 2).toUpperCase();

  // Dynamic urgency color
  const urgencyColor =
    daysLeft <= 3
      ? "text-rose-400 bg-rose-400/10"
      : daysLeft <= 7
        ? "text-amber-400 bg-amber-400/10"
        : "text-emerald-400 bg-emerald-400/10";

  return (
    <div className="glass-panel rounded-2xl p-5 hover:border-indigo-500/50 transition-all group flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {subscription.customLogoUrl ? (
            <img
              src={subscription.customLogoUrl}
              alt={subscription.name}
              className="w-12 h-12 rounded-xl object-cover bg-slate-800"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg">
              {initials}
            </div>
          )}
          <div>
            <h3
              className="font-bold text-lg leading-tight truncate max-w-[150px]"
              title={subscription.name}
            >
              {subscription.name}
            </h3>
            <span className="text-xs text-slate-400 px-2 py-0.5 bg-slate-800 rounded-full inline-block mt-1">
              {subscription.category}
            </span>
          </div>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-1.5 text-slate-400 hover:text-indigo-400 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-2xl font-extrabold text-white">
            {subscription.price}
          </span>
          <span className="text-lg font-bold text-indigo-400">
            {subscription.currency}
          </span>
          <span className="text-sm text-slate-500 ml-1">
            / {subscription.cycle === "Aylık" ? "ay" : "yıl"}
          </span>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <CalendarClock size={16} className="text-slate-400" />
            <span className="text-sm font-medium">Yenileme</span>
          </div>
          <div
            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${urgencyColor}`}
          >
            {daysLeft === 0 ? "Bugün" : `${daysLeft} gün kaldı`}
          </div>
        </div>

        {subscription.description && (
          <p className="text-xs text-slate-400 mt-3 line-clamp-2 italic">
            "{subscription.description}"
          </p>
        )}
      </div>
    </div>
  );
}
