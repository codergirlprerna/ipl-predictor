import { useParams, Link } from "react-router-dom";
import { MapPin, Calendar, ArrowLeft, MessageSquare, BarChart2 } from "lucide-react";
import PredictionCard from "../components/ui/PredictionCard";
import TeamBadge from "../components/ui/TeamBadge";
import KyaLagtaHai from "../components/ui/KyaLagtaHai";
import { DUMMY_MATCHES } from "../data/dummy";

const H2H = {
  lastFive: [
    { winner: "CSK", margin: "5 wickets", year: 2025 },
    { winner: "MI",  margin: "8 runs",    year: 2024 },
    { winner: "CSK", margin: "20 runs",   year: 2024 },
    { winner: "MI",  margin: "3 wickets", year: 2023 },
    { winner: "CSK", margin: "6 wickets", year: 2023 },
  ],
  overall: { team1: 18, team2: 16 },
};

const VENUE_INFO = {
  name: "Wankhede Stadium",
  city: "Mumbai",
  avgFirstInnings: 172,
  batFirstWinPct: 42,
  chaseWinPct: 58,
  notes: "Dew-heavy evening conditions favour chasing team. Pace bowlers get help in first 6 overs.",
};

export default function MatchPage() {
  const { id }     = useParams();
  const match      = DUMMY_MATCHES.find(m => m.id === parseInt(id)) || DUMMY_MATCHES[0];
  const isLive     = match.matchStatus === "live";
  const isUpcoming = match.matchStatus === "upcoming";
  const isLoggedIn = false;

  return (
    <div className="min-h-screen py-5 sm:py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5">

        {/* ── Back ── */}
        <Link to="/"
          className="inline-flex items-center gap-1.5 text-gray-400
                     hover:text-white text-xs sm:text-sm transition-colors">
          <ArrowLeft size={14} /> Back to matches
        </Link>

        {/* ── Match Header ── */}
        <div className="card p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400 font-mono">Match #{match.id} · IPL 2026</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              isLive      ? "bg-red-500/20 text-red-400 animate-pulse"
              : isUpcoming ? "bg-orange-500/20 text-orange-400"
              :              "bg-gray-500/20 text-gray-300"
            }`}>
              {isLive ? "🔴 Live" : isUpcoming ? "Upcoming" : "Completed"}
            </span>
          </div>

          {/* Teams */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col items-center gap-2 flex-1">
              <TeamBadge team={match.team1} size="lg" />
              <p className="text-white font-bold text-base sm:text-xl text-center">{match.team1}</p>
              {!isUpcoming && match.result?.winner === match.team1 && (
                <span className="text-green-400 text-xs font-medium">Winner ✓</span>
              )}
            </div>

            <div className="text-center flex-shrink-0 px-2">
              <span className="text-gray-400 font-display text-lg sm:text-2xl">VS</span>
              {!isUpcoming && match.result && (
                <p className="text-gray-300 text-xs mt-1 max-w-[90px] sm:max-w-[120px] leading-tight">
                  {match.result.winner} won by {match.result.margin}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center gap-2 flex-1">
              <TeamBadge team={match.team2} size="lg" />
              <p className="text-white font-bold text-base sm:text-xl text-center">{match.team2}</p>
              {!isUpcoming && match.result?.winner === match.team2 && (
                <span className="text-green-400 text-xs font-medium">Winner ✓</span>
              )}
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4
                          mt-4 sm:mt-5 pt-4 border-t border-white/10 text-xs text-gray-300">
            <span className="flex items-center gap-1">
              <MapPin size={11} className="flex-shrink-0" />
              <span className="truncate">{match.venue}, {match.city}</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={11} className="flex-shrink-0" />
              {new Date(match.matchDate).toLocaleDateString("en-IN", {
                weekday: "short", day: "numeric", month: "short",
                hour: "2-digit", minute: "2-digit"
              })}
            </span>
          </div>
        </div>

        {/* ── Sense Verdict ── */}
        <div>
          <p className="section-label mb-2 sm:mb-3">🔮 Sense Verdict</p>
          <PredictionCard
            prediction={match.prediction}
            isLoggedIn={isLoggedIn}
            userFavTeam="MI"
          />
        </div>

        {/* ── Fan Pulse + Submit Prediction (combined) ── */}
        <KyaLagtaHai
          team1={match.team1}
          team2={match.team2}
          isLoggedIn={isLoggedIn}
          isUpcoming={isUpcoming}
        />

        {/* ── H2H ── */}
        <div>
          <p className="section-label mb-2 sm:mb-3 flex items-center gap-2">
            <BarChart2 size={13} /> Head to Head
          </p>
          <div className="card p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between text-center gap-4">
              <div className="flex-1">
                <div className="text-2xl sm:text-3xl font-display text-orange-400">
                  {H2H.overall.team1}
                </div>
                <div className="text-xs text-gray-300 mt-1">{match.team1}</div>
              </div>
              <div className="text-gray-400 text-xs sm:text-sm flex-shrink-0">All Time</div>
              <div className="flex-1">
                <div className="text-2xl sm:text-3xl font-display text-blue-400">
                  {H2H.overall.team2}
                </div>
                <div className="text-xs text-gray-300 mt-1">{match.team2}</div>
              </div>
            </div>

            <div className="h-2 rounded-full overflow-hidden flex">
              <div className="bg-orange-500 transition-all duration-700"
                style={{ width: `${(H2H.overall.team1 / (H2H.overall.team1 + H2H.overall.team2)) * 100}%` }} />
              <div className="bg-blue-500 flex-1" />
            </div>

            <div>
              <p className="text-xs text-gray-300 uppercase tracking-wider mb-2">Last 5 Meetings</p>
              <div className="space-y-2">
                {H2H.lastFive.map((game, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs sm:text-sm gap-2">
                    <span className={`font-medium flex-shrink-0 ${
                      game.winner === match.team1 ? "text-orange-400" : "text-blue-400"
                    }`}>{game.winner}</span>
                    <span className="text-gray-400 text-xs truncate">won by {game.margin}</span>
                    <span className="text-gray-400 text-xs flex-shrink-0">{game.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Venue ── */}
        <div>
          <p className="section-label mb-2 sm:mb-3 flex items-center gap-2">
            <MapPin size={13} /> Venue Report
          </p>
          <div className="card p-4 sm:p-5 space-y-4">
            <div>
              <h3 className="text-white font-semibold text-sm sm:text-base">{VENUE_INFO.name}</h3>
              <p className="text-gray-300 text-xs mt-0.5">{VENUE_INFO.city}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
              {[
                { label: "Avg 1st Inn",    value: VENUE_INFO.avgFirstInnings  },
                { label: "Bat First Wins", value: `${VENUE_INFO.batFirstWinPct}%` },
                { label: "Chase Wins",     value: `${VENUE_INFO.chaseWinPct}%`    },
              ].map(({ label, value }) => (
                <div key={label} className="bg-surface-hover rounded-xl p-2 sm:p-3">
                  <div className="text-white font-display text-lg sm:text-xl">{value}</div>
                  <div className="text-gray-300 text-xs mt-0.5 leading-tight">{label}</div>
                </div>
              ))}
            </div>
            <p className="text-gray-300 text-xs sm:text-sm border-t border-white/10 pt-3 leading-relaxed">
              💡 {VENUE_INFO.notes}
            </p>
          </div>
        </div>

        {/* ── Live Chat CTA ── */}
        {isLive ? (
          <div className="card p-4 sm:p-6 text-center space-y-3 border border-blue-500/30"
               style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.04))" }}>
            <MessageSquare size={24} className="text-blue-400 mx-auto" />
            <h3 className="text-white font-semibold text-sm sm:text-base">
              Match is Live — Join the Chat!
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm">
              Fans are going crazy in the chat room right now 🔥
            </p>
            <Link to={`/match/${match.id}/chat`}
              className="block w-full text-sm py-2.5 sm:py-3 rounded-xl font-semibold
                         text-center transition-all active:scale-[0.98]"
              style={{ background: "#3B82F6", color: "#ffffff" }}>
              Join Live Chat 🔥
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl p-4 sm:p-6 text-center space-y-3"
               style={{ background: "#0f1e3a", border: "1px solid rgba(255,255,255,0.08)" }}>
            <MessageSquare size={22} style={{ color: "#94a3b8", margin: "0 auto" }} />
            <h3 style={{ color: "#ffffff" }} className="font-semibold text-sm sm:text-base">
              Fan Chat Room
            </h3>
            <p style={{ color: "#cbd5e1" }} className="text-xs sm:text-sm">
              Be there from ball one. Trash talk, predictions, reactions — all in one place.
            </p>
            <div className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-medium"
                 style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#94a3b8" }}>
              🔒 Opens at Match Start
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
