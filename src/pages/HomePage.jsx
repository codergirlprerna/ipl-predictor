import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, TrendingUp, Users, Target, Zap, MapPin } from "lucide-react";
import MatchCard from "../components/ui/MatchCard";
import SkeletonCard from "../components/ui/SkeletonCard";
import OracleAccuracyWall from "../components/ui/OracleAccuracyWall";
import TeamBadge from "../components/ui/TeamBadge";
import { DUMMY_MATCHES, DUMMY_STATS, PLATFORM_ACCURACY } from "../data/dummy";

const STATS_STRIP = [
  { icon: Target,     label: "Predictions Made", value: null,    color: "text-orange-400" },
  { icon: Users,      label: "Active Fans",       value: "8,392", color: "text-blue-400"  },
  { icon: TrendingUp, label: "Matches Covered",   value: "63",    color: "text-green-400" },
];

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

const EXTRA_UPCOMING = [
  { id: 101, team1: "Royal Challengers Bengaluru", team2: "Kolkata Knight Riders", matchDate: new Date(Date.now() + 26*60*60*1000).toISOString(),  city: "Bengaluru" },
  { id: 102, team1: "Sunrisers Hyderabad",         team2: "Rajasthan Royals",      matchDate: new Date(Date.now() + 48*60*60*1000).toISOString(),  city: "Hyderabad" },
  { id: 103, team1: "Punjab Kings",                team2: "Gujarat Titans",         matchDate: new Date(Date.now() + 72*60*60*1000).toISOString(),  city: "Mohali"    },
  { id: 104, team1: "Delhi Capitals",              team2: "Lucknow Super Giants",  matchDate: new Date(Date.now() + 96*60*60*1000).toISOString(),  city: "Delhi"     },
  { id: 105, team1: "Mumbai Indians",              team2: "Gujarat Titans",         matchDate: new Date(Date.now() + 120*60*60*1000).toISOString(), city: "Mumbai"    },
];

const formatMatchTime = (dateStr) => {
  const d        = new Date(dateStr);
  const today    = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const time = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  if (d.toDateString() === today.toDateString())    return `Today · ${time}`;
  if (d.toDateString() === tomorrow.toDateString()) return `Tomorrow · ${time}`;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }) + ` · ${time}`;
};

export default function HomePage() {
  const [loading] = useState(false);
  const sliderRef = useRef(null);

  const liveMatches      = DUMMY_MATCHES.filter(m => m.matchStatus === "live");
  const upcomingMatches  = DUMMY_MATCHES.filter(m => m.matchStatus === "upcoming");
  const completedMatches = DUMMY_MATCHES.filter(m => m.matchStatus === "completed");

  const featuredMatch = upcomingMatches[0] || null;
  const sliderMatches = [...upcomingMatches.slice(1), ...EXTRA_UPCOMING];
  const stripValues   = [PLATFORM_ACCURACY.total, "8,392", "63"];

  const scrollSlider = (dir) => {
    sliderRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  };

  return (
    <div>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pt-10 sm:pt-16 pb-10 sm:pb-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2
                          w-[300px] sm:w-[600px] h-[200px] sm:h-[300px]
                          bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          {/* Live pill */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20
                          rounded-full px-3 sm:px-4 py-1 sm:py-1.5 mb-5 sm:mb-6">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-orange-400 text-xs font-mono uppercase tracking-wider">
              IPL 2026 — Live Season
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display text-white mb-3 sm:mb-4 leading-none">
            SENSE THE GAME.
            <br />
            <span className="text-orange-400">FEEL THE HYPE.</span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-lg max-w-xs sm:max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            AI-powered IPL predictions in your language.
            Before every match. Free forever.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register"
              style={{ color: "#ffffff" }}
              className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3
                         w-full sm:w-auto text-center">
              Join Free — It's On Us 🏏
            </Link>
            <Link to="/stats"
              style={{ color: "#ffffff" }}
              className="btn-secondary text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3
                         w-full sm:w-auto text-center">
              View Points Table
            </Link>
          </div>
        </div>
      </section>

      {/* ── Oracle Accuracy Wall ─────────────────────────────────── */}
      <section className="px-4 pb-6 sm:pb-8">
        <div className="max-w-4xl mx-auto">
          <OracleAccuracyWall />
        </div>
      </section>

      {/* ── Stats Strip ──────────────────────────────────────────── */}
      <section className="px-4 pb-8 sm:pb-10">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-2 sm:gap-3">
          {STATS_STRIP.map(({ icon: Icon, label, color }, idx) => (
            <div key={label} className="card p-3 sm:p-4 text-center">
              <Icon size={16} className={`${color} mx-auto mb-1.5 sm:mb-2`} />
              <div className={`text-xl sm:text-2xl font-display ${color}`}>
                {stripValues[idx]}
              </div>
              <div className="text-gray-500 text-xs mt-0.5 sm:mt-1 leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Live Matches ─────────────────────────────────────────── */}
      {liveMatches.length > 0 && (
        <section className="px-4 pb-8 sm:pb-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <p className="section-label text-red-400">Live Now</p>
            </div>
            <div className="grid gap-3 sm:gap-4">
              {liveMatches.map(match => <MatchCard key={match.id} match={match} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Next Match — Featured Card ───────────────────────────── */}
      {featuredMatch && (
        <section className="px-4 pb-5 sm:pb-6">
          <div className="max-w-4xl mx-auto">
            <p className="section-label mb-3 sm:mb-4">Next Match</p>
            {loading ? <SkeletonCard /> : <MatchCard match={featuredMatch} />}
          </div>
        </section>
      )}

      {/* ── Upcoming Schedule — Horizontal Slider ────────────────── */}
      {sliderMatches.length > 0 && (
        <section className="pb-8 sm:pb-10">
          <div className="max-w-4xl mx-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-3 px-4">
              <p className="section-label">Upcoming Schedule</p>
              <div className="flex items-center gap-1.5">
                <button onClick={() => scrollSlider(-1)}
                  className="hidden sm:flex w-6 h-6 rounded-full border border-white/10
                             items-center justify-center text-gray-400
                             hover:text-white hover:border-white/30 transition-all">
                  <ChevronLeft size={12} />
                </button>
                <button onClick={() => scrollSlider(1)}
                  className="hidden sm:flex w-6 h-6 rounded-full border border-white/10
                             items-center justify-center text-gray-400
                             hover:text-white hover:border-white/30 transition-all">
                  <ChevronRight size={12} />
                </button>
                <Link to="/stats"
                  className="text-orange-400 text-xs flex items-center gap-0.5 hover:underline ml-1">
                  Full Schedule <ChevronRight size={12} />
                </Link>
              </div>
            </div>

            {/* Scrollable strip */}
            <div ref={sliderRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1"
              style={{ scrollSnapType: "x mandatory" }}>

              {sliderMatches.map((match) => (
                <Link key={match.id} to={`/match/${match.id}`}
                  className="flex-shrink-0 card p-3.5
                             hover:border-orange-500/40 hover:-translate-y-0.5
                             transition-all active:scale-[0.97]"
                  style={{ width: "196px", scrollSnapAlign: "start" }}>

                  {/* Teams */}
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <TeamBadge team={match.team1} size="sm" />
                      <span className="text-white text-xs font-bold truncate">
                        {SHORT[match.team1] || match.team1}
                      </span>
                    </div>
                    <span className="text-gray-600 text-[10px] font-mono flex-shrink-0">vs</span>
                    <div className="flex items-center gap-1.5 min-w-0 justify-end">
                      <span className="text-white text-xs font-bold truncate">
                        {SHORT[match.team2] || match.team2}
                      </span>
                      <TeamBadge team={match.team2} size="sm" />
                    </div>
                  </div>

                  {/* Time */}
                  <p className="text-orange-400 text-[11px] font-mono font-medium mb-1.5">
                    {formatMatchTime(match.matchDate)}
                  </p>

                  {/* City */}
                  <div className="flex items-center gap-1">
                    <MapPin size={9} className="text-gray-500 flex-shrink-0" />
                    <p className="text-gray-400 text-[10px] truncate">{match.city}</p>
                  </div>

                </Link>
              ))}

              {/* Full Schedule end-cap */}
              <Link to="/stats"
                className="flex-shrink-0 card flex flex-col items-center justify-center
                           gap-2 border-dashed hover:border-orange-500/40 transition-all p-4"
                style={{ width: "120px", scrollSnapAlign: "start" }}>
                <span className="text-2xl">📅</span>
                <p className="text-orange-400 text-xs font-medium text-center leading-tight">
                  Full Schedule
                </p>
                <ChevronRight size={13} className="text-orange-400" />
              </Link>

            </div>
          </div>
        </section>
      )}

      {/* ── Recent Results ───────────────────────────────────────── */}
      {completedMatches.length > 0 && (
        <section className="px-4 pb-8 sm:pb-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <p className="section-label">Recent Results</p>
              <Link to="/leaderboard"
                className="text-orange-400 text-xs flex items-center gap-1 hover:underline">
                Leaderboard <ChevronRight size={13} />
              </Link>
            </div>
            <div className="grid gap-3 sm:gap-4">
              {completedMatches.slice(0, 3).map(match => <MatchCard key={match.id} match={match} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Orange Cap Preview ───────────────────────────────────── */}
      <section className="px-4 pb-8 sm:pb-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <p className="section-label">🟠 Orange Cap Race</p>
            <Link to="/stats"
              className="text-orange-400 text-xs flex items-center gap-1 hover:underline">
              Full Stats <ChevronRight size={13} />
            </Link>
          </div>
          <div className="card overflow-hidden">
            {DUMMY_STATS.orangeCap.slice(0, 5).map((player, idx) => (
              <div key={`${player.team}-${player.player}`}
                className="flex items-center gap-3 px-4 py-3 border-b border-white/5
                           last:border-0 hover:bg-white/5 transition-colors">
                <span className={`text-sm font-bold w-5 text-center font-mono flex-shrink-0 ${
                  idx === 0 ? "text-yellow-400"
                  : idx === 1 ? "text-gray-300"
                  : idx === 2 ? "text-amber-600"
                  : "text-gray-500"
                }`}>{idx + 1}</span>
                <TeamBadge team={player.team} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{player.player}</p>
                  <p className="text-gray-500 text-xs">{player.team} · Avg {player.avg}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-orange-400 font-display text-lg sm:text-xl">{player.runs}</p>
                  <p className="text-gray-500 text-xs">runs</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────── */}
      <section className="px-4 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="card p-6 sm:p-8 text-center
                          bg-gradient-to-br from-orange-500/10 to-blue-600/10
                          border border-orange-500/20">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🏏</div>
            <h2 className="text-xl sm:text-2xl font-display text-white mb-2">
              Ready to Sense the Game?
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mb-5 sm:mb-6
                          max-w-xs sm:max-w-sm mx-auto leading-relaxed">
              Submit your prediction before every match.
              Climb the leaderboard. Prove you sense cricket better than AI.
            </p>
            <Link to="/register" className="btn-primary inline-flex items-center gap-2"
              style={{ color: "#ffffff" }}>
              Start Predicting Free <Zap size={15} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
