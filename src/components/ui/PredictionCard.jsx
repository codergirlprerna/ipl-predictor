import { useState } from "react";
import { Lock, Zap, AlertTriangle } from "lucide-react";
import TeamBadge from "./TeamBadge";
import ConfidenceMeter from "./ConfidenceMeter";

export default function PredictionCard({ prediction, isLoggedIn = false, userFavTeam = "MI" }) {
  const [revealed, setRevealed] = useState(false);
  const [revealing, setRevealing] = useState(false);

  const handleReveal = () => {
    setRevealing(true);
    setTimeout(() => { setRevealed(true); setRevealing(false); }, 1200);
  };

  if (!prediction?.isPublished) {
    return (
      <div className="card p-6 text-center space-y-3">
        <div className="text-4xl animate-pulse">🔮</div>
        <p className="text-white font-display text-lg">CricSense is preparing...</p>
        <p className="text-gray-300 text-sm">Sense Verdict publishes 15 min before match</p>
      </div>
    );
  }

  // Not yet revealed — logged in
  if (!revealed && isLoggedIn) {
    return (
      <div className="card p-6 text-center space-y-4">
        {revealing ? (
          <div className="space-y-3 animate-pulse">
            <div className="text-5xl">🔮</div>
            <p className="text-orange-400 font-display text-xl">CricSense is sensing...</p>
          </div>
        ) : (
          <>
            <div className="text-4xl">🔮</div>
            <p className="text-white font-display text-lg">CricSense has a verdict</p>
            <p className="text-gray-300 text-sm">Ready to see who wins today?</p>
            <button onClick={handleReveal} className="btn-primary w-full" style={{ color: "#ffffff" }}>
              Reveal Sense Verdict ⚡
            </button>
          </>
        )}
      </div>
    );
  }

  // Locked — not logged in
  if (!isLoggedIn) {
    return (
      <div className="card p-6 relative overflow-hidden">
        {/* Blurred preview */}
        <div className="blur-sm pointer-events-none space-y-3">
          <div className="flex items-center justify-between">
            <TeamBadge team={prediction.predictedWinner} size="md" />
            <div className="text-center">
              <div className="text-2xl font-display text-orange-400">{prediction.confidencePct}%</div>
              <div className="text-xs text-gray-300">confidence</div>
            </div>
          </div>
          <ConfidenceMeter pct={prediction.confidencePct} />
        </div>
        {/* Lock overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center
                        bg-base/80 backdrop-blur-sm rounded-2xl gap-3">
          <Lock size={28} className="text-orange-400" />
          <p className="text-white font-semibold text-sm">Register free to unlock</p>
          <a href="/register" className="btn-primary text-xs px-4 py-2" style={{ color: "#ffffff" }}>
            Join CricSense 🏏
          </a>
        </div>
      </div>
    );
  }

  // Full revealed prediction
  const userTeamWins = prediction.predictedWinner === userFavTeam;

  return (
    <div className={`card p-6 space-y-4 border ${
      userTeamWins ? "border-green-500/30" : "border-red-500/20"
    }`}>

      {/* Winner + sentiment */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-300 uppercase tracking-wider font-mono mb-1">
            Sense Verdict
          </p>
          <div className="flex items-center gap-2">
            <TeamBadge team={prediction.predictedWinner} size="md" />
            <span className="text-white font-semibold">to win</span>
          </div>
        </div>
        <div className="text-right">
          {userTeamWins ? (
            <div className="text-green-400 text-sm font-medium">🎉 Your team!</div>
          ) : (
            <div className="text-gray-300 text-sm">⚔️ Challenge accepted</div>
          )}
          <div className="text-2xl font-display text-orange-400">{prediction.confidencePct}%</div>
          <div className="text-xs text-gray-400">confidence</div>
        </div>
      </div>

      <ConfidenceMeter pct={prediction.confidencePct} />

      {/* Key factors */}
      <div>
        <p className="text-xs text-gray-300 uppercase tracking-wider font-mono mb-2 flex items-center gap-1">
          <Zap size={11} /> Key Factors
        </p>
        <ul className="space-y-1">
          {prediction.keyFactors.map((f, i) => (
            <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>{f}
            </li>
          ))}
        </ul>
      </div>

      {/* Risk factors */}
      <div>
        <p className="text-xs text-gray-300 uppercase tracking-wider font-mono mb-2 flex items-center gap-1">
          <AlertTriangle size={11} className="text-yellow-400" /> Risk Factors
        </p>
        <ul className="space-y-1">
          {prediction.riskFactors.map((f, i) => (
            <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">•</span>{f}
            </li>
          ))}
        </ul>
      </div>

      {/* Reasoning */}
      <p className="text-gray-300 text-sm italic border-t border-white/10 pt-3">
        {prediction.briefReasoning}
      </p>
    </div>
  );
}
