import { Link } from "react-router-dom";
import { MapPin, MessageSquare, Zap, Radio } from "lucide-react";
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
  // hasToss: backend sets match.tossResult string once toss happens
  // Card transitions to live-mode CTAs when toss is known (covers rain delays too)
  const hasToss     = !!(match.tossResult);

  return (
    <div className="card card-hover p-4 space-y-3 overflow-hidden w-full">

      {/* ── Top Row: Venue + Status ── */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0" style={{ color: "#94a3b8" }}>
          <MapPin size={10} className="flex-shrink-0" />
          <span className="truncate text-[11px]">{match.city}</span>
        </div>
        <span className={`flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${
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
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <TeamBadge team={match.team1} size="md" />
          <div className="min-w-0">
            <p className="font-bold text-sm leading-tight truncate" style={{ color: "#ffffff" }}>
              {short(match.team1)}
            </p>
            {isCompleted && match.result?.winner === match.team1 && (
              <p className="text-green-400 text-[10px] font-medium">Winner ✓</p>
            )}
          </div>
        </div>

        {/* Centre */}
        <div className="flex-shrink-0 w-24 sm:w-28 flex items-center justify-center">
          {isUpcoming ? (
            <CountdownTimer targetDate={match.matchDate} />
          ) : isLive ? (
            <span className="text-red-400 font-display text-sm animate-pulse">LIVE</span>
          ) : (
            <div className="flex flex-col items-center">
              <span style={{ color: "#cbd5e1" }} className="font-display text-xs">FT</span>
              <span style={{ color: "#94a3b8" }} className="text-[10px] text-center leading-tight">
                {match.result?.margin}
              </span>
            </div>
          )}
        </div>

        {/* Team 2 */}
        <div className="flex-1 flex items-center gap-2 min-w-0 justify-end">
          <div className="min-w-0 text-right">
            <p className="font-bold text-sm leading-tight truncate" style={{ color: "#ffffff" }}>
              {short(match.team2)}
            </p>
            {isCompleted && match.result?.winner === match.team2 && (
              <p className="text-green-400 text-[10px] font-medium">Winner ✓</p>
            )}
          </div>
          <TeamBadge team={match.team2} size="md" />
        </div>
      </div>

      {/* Result margin */}
      {isCompleted && match.result?.margin && (
        <p className="text-center text-[11px]" style={{ color: "#94a3b8" }}>
          {match.result.winner} won by {match.result.margin}
        </p>
      )}

      {/* ── Toss Banner — shows once toss is known (live or rain delay) ── */}
      {hasToss && (
        <div className="rounded-xl px-3 py-2 flex items-center gap-2"
             style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)" }}>
          <span className="text-sm flex-shrink-0">🪙</span>
          <span className="text-xs font-medium flex-1" style={{ color: "#93c5fd" }}>
            {match.tossResult}
          </span>
        </div>
      )}

      {/* ── Sense Verdict Teaser ── */}
      {match.prediction?.isPublished ? (
        <div className="rounded-xl p-3 space-y-2" style={{ background: "#1A2E50" }}>
          <div className="flex items-center justify-between gap-2">
            <span style={{ color: "#94a3b8" }} className="font-mono uppercase tracking-wider text-[10px]">
              Sense Verdict
            </span>
            <span className="text-orange-400 font-bold text-[11px] flex-shrink-0">
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
      ) : isUpcoming && !hasToss ? (
        <div className="rounded-xl p-3 flex items-center justify-between gap-2"
             style={{ background: "#1A2E50" }}>
          <div className="flex items-center gap-2 min-w-0">
            <span>🔮</span>
            <span style={{ color: "#cbd5e1" }} className="text-xs truncate">
              Sense Verdict drops 15 min before toss
            </span>
          </div>
          <span style={{ color: "#64748b" }} className="text-xs font-mono flex-shrink-0">Locked</span>
        </div>
      ) : null}

      {/* ── CTA Buttons ── */}
      <div className="flex gap-2 pt-1 border-t border-white/5">

        {/* Post-toss state: Commentary + Chat Room */}
        {hasToss ? (
          <>
            <Link to={`/commentary`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                         font-semibold transition-all active:scale-[0.98] text-xs"
              style={{ background: "#FF6B2B", color: "#ffffff" }}>
              <Radio size={12} />
              Commentary
            </Link>
            <Link to={`/match/${match.id}/chat`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                         border transition-all text-xs font-medium"
              style={{ borderColor: "rgba(59,130,246,0.4)", color: "#60a5fa" }}>
              <MessageSquare size={12} />
              Chat Room 🔥
            </Link>
          </>
        ) : (
          <>
            {/* Pre-toss state: Sense Verdict + Match Details/Chat */}
            <Link to={`/match/${match.id}#sense-verdict`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                         bg-brand-orange hover:bg-brand-orange-dark font-semibold transition-all
                         hover:shadow-orange-glow active:scale-[0.98] text-xs"
              style={{ color: "#ffffff" }}>
              <Zap size={12} />
              Sense Verdict
            </Link>

            {isLive ? (
              <Link to={`/match/${match.id}/chat`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                           border border-blue-500/40 hover:border-blue-400
                           hover:bg-blue-500/10 transition-all text-xs font-medium"
                style={{ color: "#60a5fa" }}>
                <MessageSquare size={12} />
                Live Chat 🔥
              </Link>
            ) : (
              <Link to={`/match/${match.id}#h2h`}
                className="flex-1 flex items-center justify-center py-2.5 rounded-xl
                           border border-white/20 hover:border-white/40
                           hover:bg-white/5 transition-all text-xs font-medium"
                style={{ color: "#cbd5e1" }}>
                {isCompleted ? "Match Report" : "Match Details"}
              </Link>
            )}
          </>
        )}

      </div>

    </div>
  );
}
