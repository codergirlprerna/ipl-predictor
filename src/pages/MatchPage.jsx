import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft, Bell, MoreVertical,
  MapPin, Calendar, BarChart2, MessageSquare,
  Info, Radio, ClipboardList, Users, Zap
} from "lucide-react";
import PredictionCard from "../components/ui/PredictionCard";
import TeamBadge from "../components/ui/TeamBadge";
import KyaLagtaHai from "../components/ui/KyaLagtaHai";
import { DUMMY_MATCHES } from "../data/dummy";
import { useAuth } from "../App";

// ── Dummy H2H — TODO: replace with /api/matches/:id/h2h ──────────────────────
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

// ── Dummy Venue — TODO: replace with /api/venues/:venueId ────────────────────
const VENUE_INFO = {
  name: "Wankhede Stadium",
  city: "Mumbai",
  avgFirstInnings: 172,
  batFirstWinPct: 42,
  chaseWinPct: 58,
  notes: "Dew-heavy evening conditions favour chasing team. Pace bowlers get help in first 6 overs.",
};

// ── Tabs ──────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "info",      label: "Info",      icon: Info          },
  { id: "live",      label: "Live",      icon: Radio         },
  { id: "scorecard", label: "Scorecard", icon: ClipboardList },
  { id: "squad",     label: "Squad",     icon: Users         },
];

export default function MatchPage() {
  const { id }                    = useParams();
  const { hash }                  = useLocation();
  const navigate                  = useNavigate();
  const { currentUser, profile }  = useAuth();
  const match                     = DUMMY_MATCHES.find(m => m.id === parseInt(id)) || DUMMY_MATCHES[0];
  const isLive                    = match.matchStatus === "live";
  const isUpcoming                = match.matchStatus === "upcoming";
  const isCompleted               = match.matchStatus === "completed";
  const isLoggedIn                = !!currentUser;

  // Default to LIVE tab when match is live, else INFO
  const [activeTab, setActiveTab] = useState(isLive ? "live" : "info");

  // Hash scroll — switches to info tab first so element is mounted
  useEffect(() => {
    if (!hash) return;
    setActiveTab("info");
    const elId = hash.replace("#", "");
    setTimeout(() => {
      const el = document.getElementById(elId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  }, [hash]);

  const matchTitle = `${match.team1} vs ${match.team2}`;

  return (
    <div className="min-h-screen" style={{ background: "#0A1628" }}>

      {/* ══════════════════════════════════════════════
          FIXED TOP BAR
      ══════════════════════════════════════════════ */}
      <div className="fixed top-0 left-0 right-0 z-50"
           style={{ background: "rgba(10,22,40,0.95)", backdropFilter: "blur(12px)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

        {/* Top row */}
        <div className="flex items-center justify-between px-4 h-14 max-w-2xl mx-auto">
          <button onClick={() => navigate("/")}
            className="flex items-center justify-center w-8 h-8 rounded-xl transition-all active:scale-95"
            style={{ background: "rgba(255,255,255,0.06)" }}>
            <ArrowLeft size={16} style={{ color: "#ffffff" }} />
          </button>

          <div className="flex-1 text-center px-3">
            <p className="font-bold text-sm leading-tight truncate" style={{ color: "#ffffff" }}>
              {matchTitle}
            </p>
            <p className="text-[10px] font-mono mt-0.5" style={{ color: "#64748b" }}>
              Match #{match.id} · IPL 2026
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button className="flex items-center justify-center w-8 h-8 rounded-xl transition-all active:scale-95"
                    style={{ background: "rgba(255,255,255,0.06)" }}>
              <Bell size={15} style={{ color: "#94a3b8" }} />
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-xl transition-all active:scale-95"
                    style={{ background: "rgba(255,255,255,0.06)" }}>
              <MoreVertical size={15} style={{ color: "#94a3b8" }} />
            </button>
          </div>
        </div>

        {/* Scrollable tab bar */}
        <div className="flex overflow-x-auto max-w-2xl mx-auto" style={{ scrollbarWidth: "none" }}>
          {TABS.map(({ id: tabId, label, icon: Icon }) => {
            const isActive = activeTab === tabId;
            return (
              <button key={tabId} onClick={() => setActiveTab(tabId)}
                className="flex items-center gap-1.5 px-5 py-3 text-xs font-semibold
                           whitespace-nowrap flex-shrink-0 transition-all border-b-2"
                style={{
                  color: isActive ? "#FF6B2B" : "#64748b",
                  borderBottomColor: isActive ? "#FF6B2B" : "transparent",
                }}>
                <Icon size={13} />
                {label}
                {tabId === "live" && isLive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Spacer for fixed top bar (56px top row + 44px tabs) */}
      <div style={{ height: "100px" }} />

      {/* ══════════════════════════════════════════════
          TAB CONTENT
      ══════════════════════════════════════════════ */}
      <div className="max-w-2xl mx-auto px-4 pb-28 pt-2 space-y-4 sm:space-y-5">

        {/* ── INFO TAB ─────────────────────────────── */}
        {activeTab === "info" && (
          <>
            {/* Match Header */}
            <div className="card p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono" style={{ color: "#94a3b8" }}>
                  Match #{match.id} · IPL 2026
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  isLive       ? "bg-red-500/20 text-red-400 animate-pulse"
                  : isUpcoming ? "bg-orange-500/20 text-orange-400"
                  :              "bg-gray-500/20 text-gray-300"
                }`}>
                  {isLive ? "🔴 Live" : isUpcoming ? "Upcoming" : "Completed"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <TeamBadge team={match.team1} size="lg" />
                  <p className="font-bold text-base sm:text-xl text-center" style={{ color: "#ffffff" }}>
                    {match.team1}
                  </p>
                  {!isUpcoming && match.result?.winner === match.team1 && (
                    <span className="text-green-400 text-xs font-medium">Winner ✓</span>
                  )}
                </div>

                <div className="text-center flex-shrink-0 px-2">
                  <span className="font-display text-lg sm:text-2xl" style={{ color: "#94a3b8" }}>VS</span>
                  {!isUpcoming && match.result && (
                    <p className="text-xs mt-1 max-w-[90px] sm:max-w-[120px] leading-tight"
                       style={{ color: "#cbd5e1" }}>
                      {match.result.winner} won by {match.result.margin}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-center gap-2 flex-1">
                  <TeamBadge team={match.team2} size="lg" />
                  <p className="font-bold text-base sm:text-xl text-center" style={{ color: "#ffffff" }}>
                    {match.team2}
                  </p>
                  {!isUpcoming && match.result?.winner === match.team2 && (
                    <span className="text-green-400 text-xs font-medium">Winner ✓</span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4
                              mt-4 sm:mt-5 pt-4 border-t border-white/10 text-xs"
                   style={{ color: "#cbd5e1" }}>
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

            {/* Sense Verdict */}
            <div id="sense-verdict" style={{ scrollMarginTop: "110px" }}>
              <p className="section-label mb-2 sm:mb-3">🔮 Sense Verdict</p>
              <PredictionCard
                prediction={match.prediction}
                isLoggedIn={isLoggedIn}
                userFavTeam={profile?.favouriteTeam || ""}
              />
            </div>

            {/* Fan Pulse + Submit Prediction */}
            <div id="fan-pulse">
              <KyaLagtaHai
                team1={match.team1}
                team2={match.team2}
                isLoggedIn={isLoggedIn}
                isUpcoming={isUpcoming}
              />
            </div>

            {/* H2H */}
            <div id="h2h" style={{ scrollMarginTop: "110px" }}>
              <p className="section-label mb-2 sm:mb-3 flex items-center gap-2">
                <BarChart2 size={13} /> Head to Head
              </p>
              <div className="card p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between text-center gap-4">
                  <div className="flex-1">
                    <div className="text-2xl sm:text-3xl font-display text-orange-400">
                      {H2H.overall.team1}
                    </div>
                    <div className="text-xs mt-1" style={{ color: "#cbd5e1" }}>{match.team1}</div>
                  </div>
                  <div className="text-xs sm:text-sm flex-shrink-0" style={{ color: "#94a3b8" }}>
                    All Time
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl sm:text-3xl font-display text-blue-400">
                      {H2H.overall.team2}
                    </div>
                    <div className="text-xs mt-1" style={{ color: "#cbd5e1" }}>{match.team2}</div>
                  </div>
                </div>

                <div className="h-2 rounded-full overflow-hidden flex">
                  <div className="bg-orange-500 transition-all duration-700"
                    style={{ width: `${(H2H.overall.team1 / (H2H.overall.team1 + H2H.overall.team2)) * 100}%` }} />
                  <div className="bg-blue-500 flex-1" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "#cbd5e1" }}>
                    Last 5 Meetings
                  </p>
                  <div className="space-y-2">
                    {H2H.lastFive.map((game, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs sm:text-sm gap-2">
                        <span className={`font-medium flex-shrink-0 ${
                          game.winner === match.team1 ? "text-orange-400" : "text-blue-400"
                        }`}>{game.winner}</span>
                        <span className="text-xs truncate" style={{ color: "#94a3b8" }}>
                          won by {game.margin}
                        </span>
                        <span className="text-xs flex-shrink-0" style={{ color: "#94a3b8" }}>
                          {game.year}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Venue Report */}
            <div>
              <p className="section-label mb-2 sm:mb-3 flex items-center gap-2">
                <MapPin size={13} /> Venue Report
              </p>
              <div className="card p-4 sm:p-5 space-y-4">
                <div>
                  <h3 className="font-semibold text-sm sm:text-base" style={{ color: "#ffffff" }}>
                    {VENUE_INFO.name}
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: "#cbd5e1" }}>{VENUE_INFO.city}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                  {[
                    { label: "Avg 1st Inn",    value: VENUE_INFO.avgFirstInnings      },
                    { label: "Bat First Wins", value: `${VENUE_INFO.batFirstWinPct}%` },
                    { label: "Chase Wins",     value: `${VENUE_INFO.chaseWinPct}%`    },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-xl p-2 sm:p-3" style={{ background: "#1A2E50" }}>
                      <div className="font-display text-lg sm:text-xl" style={{ color: "#ffffff" }}>
                        {value}
                      </div>
                      <div className="text-xs mt-0.5 leading-tight" style={{ color: "#cbd5e1" }}>
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs sm:text-sm border-t border-white/10 pt-3 leading-relaxed"
                   style={{ color: "#cbd5e1" }}>
                  💡 {VENUE_INFO.notes}
                </p>
              </div>
            </div>

            {/* Chat CTA */}
            {isLive ? (
              <div className="card p-4 sm:p-6 text-center space-y-3"
                   style={{ border: "1px solid rgba(59,130,246,0.3)",
                            background: "linear-gradient(135deg,rgba(59,130,246,0.12),rgba(59,130,246,0.04))" }}>
                <MessageSquare size={24} className="text-blue-400 mx-auto" />
                <h3 className="font-semibold text-sm sm:text-base" style={{ color: "#ffffff" }}>
                  Match is Live — Join the Chat!
                </h3>
                <p className="text-xs sm:text-sm" style={{ color: "#cbd5e1" }}>
                  Fans are going crazy in the chat room right now 🔥
                </p>
                <button onClick={() => setActiveTab("live")}
                  className="block w-full text-sm py-2.5 sm:py-3 rounded-xl font-semibold
                             transition-all active:scale-[0.98]"
                  style={{ background: "#3B82F6", color: "#ffffff" }}>
                  Go to Live Tab 🔥
                </button>
              </div>
            ) : (
              <div className="rounded-2xl p-4 sm:p-6 text-center space-y-3"
                   style={{ background: "#0f1e3a", border: "1px solid rgba(255,255,255,0.08)" }}>
                <MessageSquare size={22} style={{ color: "#94a3b8", margin: "0 auto" }} />
                <h3 className="font-semibold text-sm sm:text-base" style={{ color: "#ffffff" }}>
                  Fan Chat Room
                </h3>
                <p className="text-xs sm:text-sm" style={{ color: "#cbd5e1" }}>
                  Be there from ball one. Trash talk, predictions, reactions — all in one place.
                </p>
                <div className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-medium"
                     style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#94a3b8" }}>
                  🔒 Opens at Match Start
                </div>
              </div>
            )}
          </>
        )}

        {/* ── LIVE TAB ──────────────────────────────── */}
        {/* TODO: replace with <LiveScoreFeed matchId={id} /> once backend ready */}
        {activeTab === "live" && (
          <div className="space-y-4">
            {isLive ? (
              <div className="card p-6 text-center space-y-3">
                <div className="text-3xl">🏏</div>
                <h3 className="font-bold text-base" style={{ color: "#ffffff" }}>
                  Live Score Feed
                </h3>
                <p className="text-sm" style={{ color: "#94a3b8" }}>
                  Live scorecard, current batters, bowler stats and ball-by-ball
                  commentary will appear here once backend is connected.
                </p>
                <span className="inline-block text-xs px-3 py-1 rounded-full font-mono"
                      style={{ background: "rgba(255,107,43,0.1)", color: "#FF6B2B" }}>
                  Coming soon — backend pending
                </span>
              </div>
            ) : (
              <div className="card p-6 text-center space-y-3">
                <div className="text-3xl">⏳</div>
                <h3 className="font-bold text-base" style={{ color: "#ffffff" }}>
                  Match hasn't started yet
                </h3>
                <p className="text-sm" style={{ color: "#94a3b8" }}>
                  Live scores will appear here once the match begins.
                </p>
                <button onClick={() => setActiveTab("info")}
                  className="text-sm font-medium px-4 py-2 rounded-xl transition-all"
                  style={{ background: "#1A2E50", color: "#FF6B2B" }}>
                  View Match Info →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── SCORECARD TAB ─────────────────────────── */}
        {/* TODO: replace with <ScorecardTable matchId={id} /> once backend ready */}
        {activeTab === "scorecard" && (
          <div className="card p-6 text-center space-y-3">
            <div className="text-3xl">📋</div>
            <h3 className="font-bold text-base" style={{ color: "#ffffff" }}>Scorecard</h3>
            <p className="text-sm" style={{ color: "#94a3b8" }}>
              Full innings breakdown, batting and bowling figures will appear
              here once the match is underway.
            </p>
            <span className="inline-block text-xs px-3 py-1 rounded-full font-mono"
                  style={{ background: "rgba(255,107,43,0.1)", color: "#FF6B2B" }}>
              Coming soon — backend pending
            </span>
          </div>
        )}

        {/* ── SQUAD TAB ─────────────────────────────── */}
        {/* TODO: replace with <SquadList matchId={id} /> once backend ready */}
        {activeTab === "squad" && (
          <div className="card p-6 text-center space-y-3">
            <div className="text-3xl">👥</div>
            <h3 className="font-bold text-base" style={{ color: "#ffffff" }}>Playing XI</h3>
            <p className="text-sm" style={{ color: "#94a3b8" }}>
              Squad announcements and playing XI for both teams will appear
              here once confirmed.
            </p>
            <span className="inline-block text-xs px-3 py-1 rounded-full font-mono"
                  style={{ background: "rgba(255,107,43,0.1)", color: "#FF6B2B" }}>
              Coming soon — backend pending
            </span>
          </div>
        )}

      </div>

      {/* ══════════════════════════════════════════════
          STICKY BOTTOM BAR — Fan Pulse + Vote Now
          Shows on INFO + LIVE tabs for upcoming/live only
          TODO: wire fanPulse % from /api/matches/:id/fan-pulse
      ══════════════════════════════════════════════ */}
      {(isUpcoming || isLive) && (activeTab === "info" || activeTab === "live") && (
        <div className="fixed bottom-0 left-0 right-0 z-50"
             style={{ background: "rgba(10,22,40,0.97)", backdropFilter: "blur(12px)",
                      borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">

            {/* Fan Pulse */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider"
                      style={{ color: "#64748b" }}>Fan Pulse</span>
                <span className="text-[10px] font-mono" style={{ color: "#64748b" }}>
                  {match.team1} vs {match.team2}
                </span>
              </div>
              {/* TODO: replace 58/42 with real fan pulse % from API */}
              <div className="h-2 rounded-full overflow-hidden flex">
                <div className="transition-all duration-700"
                     style={{ width: "58%", background: "#FF6B2B" }} />
                <div className="flex-1" style={{ background: "#3B82F6" }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px]" style={{ color: "#FF6B2B" }}>
                  {match.team1} 58%
                </span>
                <span className="text-[10px]" style={{ color: "#60a5fa" }}>
                  42% {match.team2}
                </span>
              </div>
            </div>

            {/* Vote Now */}
            <button
              onClick={() => {
                if (!isLoggedIn) { navigate("/login"); return; }
                // Scroll to KyaLagtaHai in INFO tab
                setActiveTab("info");
                setTimeout(() => {
                  const el = document.getElementById("fan-pulse");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
              }}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5
                         rounded-xl font-semibold text-xs transition-all active:scale-95"
              style={{ background: "#FF6B2B", color: "#ffffff" }}>
              <Zap size={13} />
              Vote Now
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
