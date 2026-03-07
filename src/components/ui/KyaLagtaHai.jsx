import { useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, Zap } from "lucide-react";
import toast from "react-hot-toast";

export default function KyaLagtaHai({
  team1 = "CSK",
  team2 = "MI",
  isLoggedIn = false,
  isUpcoming = true,
}) {
  const [fanVote, setFanVote]         = useState(null); // "team1" | "team2"
  const [prediction, setPrediction]   = useState(null); // "team1" | "team2"
  const [votes, setVotes]             = useState({ team1: 5823, team2: 4201 });

  const total = votes.team1 + votes.team2;
  const pct1  = Math.round((votes.team1 / total) * 100);
  const pct2  = 100 - pct1;

  const handleFanVote = (team) => {
    if (fanVote) return;
    setFanVote(team);
    setVotes(v => ({ ...v, [team]: v[team] + 1 }));
    toast.success(`Voted for ${team === "team1" ? team1 : team2}! 🏏`);
  };

  const handlePrediction = (team) => {
    if (!isLoggedIn || prediction) return;
    setPrediction(team);
    toast.success(`Prediction locked — ${team === "team1" ? team1 : team2} to win! 🎯`);
  };

  const teamName = (t) => t === "team1" ? team1 : team2;

  return (
    <div className="card p-4 sm:p-5 space-y-4">

      {/* ── Header ── */}
      <div>
        <p className="section-label mb-0.5">🗳️ Fan Pulse</p>
        <p className="text-white font-semibold text-sm">
          {team1} jeetega ya {team2}?
        </p>
      </div>

      {/* ── Vote Buttons or Result ── */}
      {!fanVote ? (
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => handleFanVote("team1")}
            className="py-3 rounded-xl border border-white/10
                       hover:border-orange-500/50 hover:bg-orange-500/10
                       text-white font-semibold transition-all text-sm active:scale-95">
            {team1} 🏏
          </button>
          <button onClick={() => handleFanVote("team2")}
            className="py-3 rounded-xl border border-white/10
                       hover:border-blue-500/50 hover:bg-blue-500/10
                       text-white font-semibold transition-all text-sm active:scale-95">
            {team2} ⚡
          </button>
        </div>
      ) : (
        <p className="text-center text-green-400 text-sm font-medium">
          ✓ You voted for {teamName(fanVote)}
        </p>
      )}

      {/* ── Live Split Bar ── */}
      <div>
        <div className="flex text-xs text-gray-300 justify-between mb-1.5">
          <span>{team1} — {pct1}%</span>
          <span>{pct2}% — {team2}</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden flex">
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-700"
            style={{ width: `${pct1}%` }} />
          <div className="bg-gradient-to-r from-blue-500 to-blue-400 flex-1 transition-all duration-700" />
        </div>
        <p className="text-center text-gray-400 text-xs mt-1.5">
          {total.toLocaleString()} fans voted
        </p>
      </div>

      {/* ── Divider ── */}
      {isUpcoming && (
        <div className="border-t border-white/10 pt-4 space-y-3">

          <div className="flex items-center gap-2">
            <Trophy size={13} className="text-orange-400 flex-shrink-0" />
            <p className="text-white font-semibold text-sm">Submit Your Prediction</p>
            <span className="text-gray-400 text-xs ml-auto">Earn points 🎯</span>
          </div>

          <p className="text-gray-300 text-xs">
            Pick the winner before toss. Correct prediction = points on leaderboard.
          </p>

          {/* Prediction buttons / state */}
          {prediction ? (
            <div className="flex items-center justify-center gap-2 py-3 rounded-xl
                            bg-green-500/10 border border-green-500/30">
              <Zap size={14} className="text-green-400" />
              <p className="text-green-400 text-sm font-semibold">
                Locked — {teamName(prediction)} to win!
              </p>
            </div>
          ) : isLoggedIn ? (
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handlePrediction("team1")}
                className="py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600
                           text-white font-semibold text-xs sm:text-sm
                           transition-all active:scale-95"
                style={{ color: "#ffffff" }}>
                {team1} wins 🏏
              </button>
              <button onClick={() => handlePrediction("team2")}
                className="py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600
                           text-white font-semibold text-xs sm:text-sm
                           transition-all active:scale-95"
                style={{ color: "#ffffff" }}>
                {team2} wins ⚡
              </button>
            </div>
          ) : (
            <Link to="/register"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                         bg-brand-orange hover:bg-brand-orange-dark
                         text-white font-semibold text-sm transition-all"
              style={{ color: "#ffffff" }}>
              <Zap size={14} />
              Register free to predict
            </Link>
          )}
        </div>
      )}

    </div>
  );
}
