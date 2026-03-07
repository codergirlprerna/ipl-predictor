import { Link } from "react-router-dom";
import { MapPin, MessageSquare, Zap } from "lucide-react";
import TeamBadge from "./TeamBadge";
import CountdownTimer from "./CountdownTimer";
import ConfidenceMeter from "./ConfidenceMeter";

const SHORT = {
  "Chennai Super Kings":          "CSK",
  "Mumbai Indians":               "MI",
  "Royal Challengers Bengaluru":  "RCB",
  "Kolkata Knight Riders":        "KKR",
  "Delhi Capitals":               "DC",
  "Rajasthan Royals":             "RR",
  "Sunrisers Hyderabad":          "SRH",
  "Punjab Kings":                 "PBKS",
  "Lucknow Super Giants":         "LSG",
  "Gujarat Titans":               "GT",
};
const short = name => SHORT[name] || name;

export default function MatchCard({ match }) {
  const isLive      = match.matchStatus === "live";
  const isCompleted = match.matchStatus === "completed";
  const isUpcoming  = match.matchStatus === "upcoming";

  return (
    <div className="card card-hover p-4 sm:p-5 space-y-3 sm:space-y-4">

      {/* ── Top Row: Venue + Status ── */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0" style={{ color: "#94a3b8" }}>
          <MapPin size={10} className="flex-shrink-0" />
          <span className="truncate text-xs">{match.venue}, {match.city}</span>
        </div>
        <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
          isLive     ? "bg-red-500/20 text-red-400 animate-pulse" :
          isUpcoming ? "bg-orange-500/20 text-orange-400" :
                       "bg-gray-500/20 text-gray-300"
        }`}>
          {isLive ? "🔴 Live" : isUpcoming ? "Upcoming" : "Completed"}
        </span>
      </div>

      {/* ── Teams Row ── */}
      <div className="flex items-center w-full">

        {/* Team 1 */}
        <div className="w-[40%] flex items-center gap-1.5 min-w-0">
          <TeamBadge team={match.team1} size="md" />
          <div className="min-w-0">
            <p className="font-bold text-sm sm:text-base leading-tight" style={{ color: "#ffffff" }}>
              <span className="sm:hidden">{short(match.team1)}</span>
              <span className="hidden sm:inline">{match.team1}</span>
            </p>
            {isCompleted && match.result?.winner === match.team1 && (
              <p className="text-green-400 text-[10px] sm:text-xs font-medium">Winner ✓</p>
            )}
          </div>
        </div>

        {/* Middle */}
        <div className="w-[20%] flex-shrink-0 flex items-center justify-center">
          {isUpcoming ? (
            <CountdownTimer targetDate={match.matchDate} />
          ) : isLive ? (
            <span className="text-red-400 font-display text-sm sm:text-lg animate-pulse">LIVE</span>
          ) : (
            <div className="flex flex-col items-center">
              <span style={{ color: "#cbd5e1" }} className="font-display text-xs sm:text-sm">FT</span>
              <span style={{ color: "#94a3b8" }} className="text-[10px] hidden sm:block">{match.result?.margin}</span>
            </div>
          )}
        </div>

        {/* Team 2 */}
        <div className="w-[40%] flex items-center gap-1.5 min-w-0 justify-end">
          <div className="min-w-0 text-right">
            <p className="font-bold text-sm sm:text-base leading-tight" style={{ color: "#ffffff" }}>
              <span className="sm:hidden">{short(match.team2)}</span>
              <span className="hidden sm:inline">{match.team2}</span>
            </p>
            {isCompleted && match.result?.winner === match.team2 && (
              <p className="text-green-400 text-[10px] sm:text-xs font-medium">Winner ✓</p>
            )}
          </div>
          <TeamBadge team={match.team2} size="md" />
        </div>
      </div>

      {/* Result margin — mobile only */}
      {isCompleted && match.result?.margin && (
        <p className="text-center text-xs sm:hidden" style={{ color: "#94a3b8" }}>
          {match.result.winner} won by {match.result.margin}
        </p>
      )}

      {/* ── Sense Verdict Teaser ── */}
      {match.prediction?.isPublished ? (
        <div className="rounded-xl p-3 space-y-2"
             style={{ background: "#1A2E50" }}>
          <div className="flex items-center justify-between gap-2">
            <span style={{ color: "#94a3b8" }} className="font-mono uppercase tracking-wider text-[10px] sm:text-xs">
              Sense Verdict
            </span>
            <span className="text-orange-400 font-bold text-xs flex-shrink-0">
              {match.prediction.confidencePct}% confidence
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TeamBadge team={match.prediction.predictedWinner} size="sm" />
            <span style={{ color: "#ffffff" }} className="text-sm font-medium">predicted to win</span>
          </div>
          <ConfidenceMeter pct={match.prediction.confidencePct} />
          {isCompleted && (
            <p className={`text-xs font-medium pt-1 ${
              match.prediction.predictedWinner === match.result?.winner
                ? "text-green-400" : "text-red-400"
            }`}>
              {match.prediction.predictedWinner === match.result?.winner
                ? "✓ CricSense was correct" : "✗ CricSense was wrong"}
            </p>
          )}
        </div>
      ) : isUpcoming ? (
        <div className="rounded-xl p-3 flex items-center justify-between gap-2"
             style={{ background: "#1A2E50" }}>
          <div className="flex items-center gap-2">
            <span>🔮</span>
            <span style={{ color: "#cbd5e1" }} className="text-xs">Sense Verdict drops 15 min before toss</span>
          </div>
          <span style={{ color: "#64748b" }} className="text-xs font-mono flex-shrink-0">Locked</span>
        </div>
      ) : null /* completed with no prediction — show nothing */ }

      {/* ── CTA Buttons ── */}
      <div className="flex gap-2 pt-1 border-t border-white/5">

        <Link to={`/match/${match.id}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                     bg-brand-orange hover:bg-brand-orange-dark
                     font-semibold transition-all
                     hover:shadow-orange-glow active:scale-[0.98]
                     text-xs sm:text-sm"
          style={{ color: "#ffffff" }}>
          <Zap size={12} />
          Sense Verdict
        </Link>

        {isLive ? (
          <Link to={`/match/${match.id}/chat`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                       border border-blue-500/40 hover:border-blue-400
                       hover:bg-blue-500/10 transition-all
                       text-xs sm:text-sm font-medium"
            style={{ color: "#60a5fa" }}>
            <MessageSquare size={12} />
            Live Chat 🔥
          </Link>
        ) : (
          <Link to={`/match/${match.id}`}
            className="flex-1 flex items-center justify-center py-2.5 rounded-xl
                       border border-white/20 hover:border-white/40
                       hover:bg-white/5 transition-all
                       text-xs sm:text-sm font-medium"
            style={{ color: "#cbd5e1" }}>
            {isCompleted ? "Match Report" : "Match Details"}
          </Link>
        )}
      </div>

    </div>
  );
}
