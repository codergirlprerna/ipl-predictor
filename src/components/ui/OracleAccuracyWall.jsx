import { TrendingUp } from "lucide-react";
import { PLATFORM_ACCURACY } from "../../data/dummy";

export default function OracleAccuracyWall() {
  const { correct, total, pct } = PLATFORM_ACCURACY;
  return (
    <div className="card p-5 flex flex-col sm:flex-row items-center gap-4 border border-orange-500/20">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
          <TrendingUp size={22} className="text-orange-400" />
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider font-mono">Oracle Accuracy</p>
          <p className="text-2xl font-display text-orange-400">{pct}%</p>
        </div>
      </div>
      <div className="flex-1 w-full sm:w-auto">
        <div className="h-2 bg-surface-hover rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full transition-all duration-1000"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-gray-400 text-xs mt-2 text-center sm:text-left">
          Correctly predicted <span className="text-white font-medium">{correct}</span> of{" "}
          <span className="text-white font-medium">{total}</span> IPL 2026 matches
        </p>
      </div>
    </div>
  );
}