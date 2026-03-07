export default function ConfidenceMeter({ pct, winner }) {
  const color = pct >= 70 ? 'bg-green-500' 
              : pct >= 55 ? 'bg-brand-orange' 
              : 'bg-yellow-500'

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-slate-400">
          AI Confidence
        </span>
        <span className={`text-sm font-mono font-bold
          ${pct >= 70 ? 'text-green-400' 
          : pct >= 55 ? 'text-brand-orange' 
          : 'text-yellow-400'}`}>
          {pct}%
        </span>
      </div>
      <div className="h-1.5 bg-surface-border rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-1000`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-slate-500">
        Predicting <span className="text-white font-medium">{winner}</span> to win
      </p>
    </div>
  )
}