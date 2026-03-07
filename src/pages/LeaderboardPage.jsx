import { DUMMY_LEADERBOARD, PLATFORM_ACCURACY } from "../data/dummy";
import TeamBadge from "../components/ui/TeamBadge";

export default function LeaderboardPage() {
  const top3 = DUMMY_LEADERBOARD.slice(0, 3);
  const rest  = DUMMY_LEADERBOARD.slice(3);

  const podiumOrder  = [top3[1], top3[0], top3[2]];
  const podiumHeight = ["h-20 sm:h-24", "h-28 sm:h-32", "h-16 sm:h-20"];
  const podiumRank   = [2, 1, 3];
  const podiumEmoji  = ["🥈", "🥇", "🥉"];
  const podiumColor  = ["text-gray-300", "text-yellow-400", "text-amber-500"];

  return (
    <div className="min-h-screen py-6 sm:py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">

        {/* ── Header ── */}
        <div>
          <p className="section-label mb-1">IPL 2026</p>
          <h1 className="text-2xl sm:text-3xl font-display text-white">Leaderboard</h1>
        </div>

        {/* ── CricSense Accuracy Banner ── */}
        <div className="card p-4 sm:p-5 border border-orange-500/20
                        flex flex-col sm:flex-row items-center sm:items-start
                        gap-3 text-center sm:text-left"
             style={{ background: "linear-gradient(to right, rgba(249,115,22,0.15), rgba(249,115,22,0.03))" }}>
          <div className="text-3xl sm:text-4xl flex-shrink-0">🔮</div>
          <div>
            <p style={{ color: "#ffffff" }} className="font-semibold text-sm sm:text-base">
              CricSense has correctly predicted{" "}
              <span style={{ color: "#fb923c" }} className="font-bold">
                {PLATFORM_ACCURACY.correct} of {PLATFORM_ACCURACY.total}
              </span>{" "}
              matches this IPL
            </p>
            <p style={{ color: "#d1d5db" }} className="text-xs sm:text-sm mt-1">
              {PLATFORM_ACCURACY.pct}% accuracy — can you beat the Sense?
            </p>
          </div>
        </div>

        {/* ── Podium ── */}
        <div>
          <p className="section-label mb-4 sm:mb-5 text-center">🏆 Top Predictors</p>
          <div className="flex items-end justify-center gap-3 sm:gap-6 px-2">
            {podiumOrder.map((user, i) => (
              <div key={user?.name ?? i}
                className="flex flex-col items-center gap-2 flex-1 max-w-[110px] sm:max-w-[140px]">
                <div className={`relative ${i === 1 ? "scale-110" : ""}`}>
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl
                                  bg-gradient-to-br from-orange-500/30 to-blue-600/30
                                  border-2 flex items-center justify-center
                                  text-lg sm:text-2xl font-bold text-white ${
                    i === 0 ? "border-gray-400"
                    : i === 1 ? "border-yellow-400"
                    : "border-amber-600"
                  }`}>
                    {user?.name?.charAt(0)}
                  </div>
                  <span className="absolute -top-2 -right-2 text-base sm:text-lg">
                    {podiumEmoji[i]}
                  </span>
                </div>

                <div className="text-center">
                  <p className="text-white text-xs sm:text-sm font-semibold truncate max-w-full">
                    {user?.name}
                  </p>
                  <TeamBadge team={user?.team} size="sm" />
                </div>

                <p className={`font-display text-base sm:text-xl ${podiumColor[i]}`}>
                  {user?.accuracy}%
                </p>

                <div className={`w-full ${podiumHeight[i]} rounded-t-xl flex items-center
                                 justify-center font-display text-lg sm:text-2xl ${
                  i === 0 ? "bg-gray-400/20 text-gray-300"
                  : i === 1 ? "bg-yellow-400/20 text-yellow-400"
                  : "bg-amber-700/20 text-amber-500"
                }`}>
                  #{podiumRank[i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Rankings Table ── */}
        <div className="card overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10">
            <h3 className="text-white font-semibold text-sm sm:text-base">Full Rankings</h3>
          </div>

          <div className="grid grid-cols-12 gap-2 px-4 py-2.5
                          bg-surface-hover text-gray-400 text-xs uppercase tracking-wider">
            <div className="col-span-1">#</div>
            <div className="col-span-5 sm:col-span-4">Fan</div>
            <div className="col-span-3 sm:col-span-2 text-center">Correct</div>
            <div className="col-span-3 sm:col-span-2 text-center">Accuracy</div>
            <div className="hidden sm:block sm:col-span-3 text-right">Predictions</div>
          </div>

          {rest.map((user, idx) => (
            <div key={user.name}
              className="grid grid-cols-12 gap-2 items-center px-4 py-3
                         border-t border-white/5 hover:bg-white/5 transition-colors">
              <div className="col-span-1 text-gray-400 font-mono text-xs sm:text-sm">{idx + 4}</div>
              <div className="col-span-5 sm:col-span-4 flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex-shrink-0
                                bg-gradient-to-br from-orange-500/20 to-blue-600/20
                                flex items-center justify-center text-white text-xs font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-xs sm:text-sm font-medium truncate">{user.name}</p>
                  <TeamBadge team={user.team} size="sm" />
                </div>
              </div>
              <div className="col-span-3 sm:col-span-2 text-center">
                <span className="text-green-400 font-medium text-xs sm:text-sm">{user.correct}</span>
                <span className="text-gray-400 text-xs">/{user.total}</span>
              </div>
              <div className="col-span-3 sm:col-span-2 text-center">
                <span className={`font-bold text-xs sm:text-sm ${
                  user.accuracy >= 70 ? "text-orange-400"
                  : user.accuracy >= 55 ? "text-blue-400"
                  : "text-gray-300"
                }`}>
                  {user.accuracy}%
                </span>
              </div>
              <div className="hidden sm:block sm:col-span-3 text-right">
                <span className="text-gray-300 text-xs sm:text-sm">{user.total} matches</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
