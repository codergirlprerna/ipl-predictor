import { useState } from "react";
import { Trophy, Target, TrendingUp, Star, LogOut, Settings } from "lucide-react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useAuth } from "../App";
import TeamBadge from "../components/ui/TeamBadge";
import ConfidenceMeter from "../components/ui/ConfidenceMeter";

// ── Dummy data — swap with API calls when backend is live ─────────────────────
// TODO: replace with useUserStats(currentUser.uid)
const DUMMY_STATS = {
  predictions: { correct: 18, total: 24, accuracy: 75 },
  rank: 12,
  totalUsers: 1247,
};

// TODO: replace with useUserBadges(currentUser.uid)
const DUMMY_BADGES = [
  { id: "oracle",   label: "Sense Master", desc: "70%+ prediction accuracy",       icon: "🔮", earned: true  },
  { id: "12thman",  label: "12th Man",     desc: "Joined 10 match chats",           icon: "💬", earned: true  },
  { id: "superfan", label: "Super Fan",    desc: "Registered before IPL",           icon: "⭐", earned: true  },
  { id: "streak",   label: "Hot Streak",   desc: "5 correct predictions in a row",  icon: "🔥", earned: false },
  { id: "champion", label: "Champion",     desc: "Finish in top 10 leaderboard",    icon: "🏆", earned: false },
];

// TODO: replace with useUserPredictions(currentUser.uid)
const DUMMY_PREDICTIONS = [
  { match: "MI vs CSK",   predicted: "MI",   actual: "MI",   correct: true,  date: "Mar 22" },
  { match: "RCB vs KKR",  predicted: "RCB",  actual: "KKR",  correct: false, date: "Mar 23" },
  { match: "SRH vs DC",   predicted: "SRH",  actual: "SRH",  correct: true,  date: "Mar 24" },
  { match: "GT vs RR",    predicted: "RR",   actual: "RR",   correct: true,  date: "Mar 25" },
  { match: "PBKS vs LSG", predicted: "PBKS", actual: "LSG",  correct: false, date: "Mar 26" },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [activeTab, setActiveTab]   = useState("overview");
  const [loggingOut, setLoggingOut] = useState(false);
  const { currentUser, profile }    = useAuth();
  const navigate                    = useNavigate();

  // ── Real data from Firebase / useUserProfile ──
  const displayName    = currentUser?.displayName || currentUser?.email?.split("@")[0] || "Fan";
  const email          = currentUser?.email || "";
  const avatarLetter   = displayName.charAt(0).toUpperCase();
  const favouriteTeam  = profile?.favouriteTeam || null;

  // ── Stats — dummy until backend live ──
  const stats = DUMMY_STATS;

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut(auth);
      navigate("/");
    } catch (e) {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen py-6 sm:py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5">

        {/* ── Profile Header ── */}
        <div className="card p-5 sm:p-6">
          <div className="flex items-start gap-4">

            {/* Avatar */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex-shrink-0
                            flex items-center justify-center
                            text-xl sm:text-2xl font-bold"
                 style={{
                   background: "linear-gradient(135deg, #FF6B2B, #3B82F6)",
                   color: "#ffffff",
                 }}>
              {avatarLetter}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl font-bold truncate"
                  style={{ color: "#ffffff" }}>
                {displayName}
              </h1>
              <p className="text-xs sm:text-sm truncate mt-0.5"
                 style={{ color: "#94a3b8" }}>
                {email}
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2">
                {favouriteTeam
                  ? <TeamBadge team={favouriteTeam} size="sm" />
                  : <span className="text-xs" style={{ color: "#64748b" }}>No team selected</span>
                }
                <span className="text-xs font-mono"
                      style={{ color: "#64748b" }}>
                  IPL 2026
                </span>
              </div>
            </div>

            {/* Rank */}
            <div className="text-right flex-shrink-0">
              <div className="font-display text-xl sm:text-2xl"
                   style={{ color: "#FF6B2B" }}>
                #{stats.rank}
              </div>
              <div className="text-xs mt-0.5"
                   style={{ color: "#64748b" }}>
                of {stats.totalUsers.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl
                         text-xs font-medium transition-all opacity-40 cursor-not-allowed"
              style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8" }}>
              <Settings size={13} />
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl
                         text-xs font-medium transition-all hover:bg-red-500/10
                         disabled:opacity-50"
              style={{ border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}>
              <LogOut size={13} />
              {loggingOut ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        </div>

        {/* ── Stats Strip ── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Predictions", value: stats.predictions.total,    icon: Target,    color: "#60a5fa" },
            { label: "Correct",     value: stats.predictions.correct,  icon: Trophy,    color: "#4ade80" },
            { label: "Accuracy",    value: `${stats.predictions.accuracy}%`, icon: TrendingUp, color: "#FF6B2B" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="card p-3 sm:p-4 text-center">
              <Icon size={16} className="mx-auto mb-1.5" style={{ color }} />
              <div className="font-display text-xl sm:text-2xl" style={{ color }}>
                {value}
              </div>
              <div className="text-xs mt-1" style={{ color: "#64748b" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* ── Accuracy Bar ── */}
        <div className="card p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm" style={{ color: "#94a3b8" }}>
              Sense Accuracy
            </span>
            <span className="font-bold text-sm" style={{ color: "#FF6B2B" }}>
              {stats.predictions.accuracy}%
            </span>
          </div>
          <ConfidenceMeter pct={stats.predictions.accuracy} />
          <p className="text-xs mt-2" style={{ color: "#64748b" }}>
            {stats.predictions.accuracy >= 70
              ? "🔮 Sense Master tier — you're in the top predictors!"
              : stats.predictions.accuracy >= 55
              ? "📈 Good accuracy — keep predicting to climb the ranks"
              : "🎯 Keep going — every match is a chance to improve"}
          </p>
        </div>

        {/* ── Tabs ── */}
        <div className="flex border-b border-white/10">
          {[
            { id: "overview",     label: "Overview"    },
            { id: "predictions",  label: "Predictions" },
            { id: "badges",       label: "Badges"      },
          ].map(({ id, label }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`px-4 py-2.5 text-xs sm:text-sm font-medium transition-all
                          border-b-2 -mb-px whitespace-nowrap ${
                activeTab === id
                  ? "border-orange-500 text-orange-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}>
              {label}
            </button>
          ))}
        </div>

        {/* ── Overview Tab ── */}
        {activeTab === "overview" && (
          <div className="space-y-4">

            {/* Earned badges preview */}
            <div className="card p-4 sm:p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm sm:text-base"
                  style={{ color: "#ffffff" }}>
                <Star size={15} style={{ color: "#FF6B2B" }} />
                Earned Badges
              </h3>
              <div className="flex flex-wrap gap-3">
                {DUMMY_BADGES.filter(b => b.earned).map(badge => (
                  <div key={badge.id}
                       className="flex items-center gap-2 rounded-xl px-3 py-2"
                       style={{ background: "#1A2E50" }}>
                    <span className="text-base">{badge.icon}</span>
                    <div>
                      <div className="text-xs font-medium" style={{ color: "#ffffff" }}>
                        {badge.label}
                      </div>
                      <div className="text-xs" style={{ color: "#64748b" }}>
                        {badge.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent predictions preview */}
            <div className="card overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-semibold text-sm sm:text-base" style={{ color: "#ffffff" }}>
                  Recent Predictions
                </h3>
                <button onClick={() => setActiveTab("predictions")}
                  className="text-xs" style={{ color: "#FF6B2B" }}>
                  See all →
                </button>
              </div>
              {DUMMY_PREDICTIONS.slice(0, 3).map((pred, idx) => (
                <div key={idx}
                  className="flex items-center justify-between px-4 py-3
                             hover:bg-white/5 transition-colors"
                  style={{ borderBottom: idx < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-medium truncate"
                         style={{ color: "#ffffff" }}>
                      {pred.match}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "#64748b" }}>
                      Picked: <span style={{ color: "#cbd5e1" }}>{pred.predicted}</span>
                      <span className="mx-1">·</span>
                      Result: <span style={{ color: "#cbd5e1" }}>{pred.actual}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <span className="text-xs" style={{ color: "#64748b" }}>{pred.date}</span>
                    <span className="text-base font-bold"
                          style={{ color: pred.correct ? "#4ade80" : "#f87171" }}>
                      {pred.correct ? "✓" : "✗"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ── Predictions Tab ── */}
        {activeTab === "predictions" && (
          <div className="card overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-semibold text-sm sm:text-base" style={{ color: "#ffffff" }}>
                All Predictions
              </h3>
              <span className="text-xs font-mono" style={{ color: "#64748b" }}>
                {stats.predictions.correct}/{stats.predictions.total} correct
              </span>
            </div>
            {DUMMY_PREDICTIONS.map((pred, idx) => (
              <div key={idx}
                className="flex items-center justify-between px-4 py-3
                           hover:bg-white/5 transition-colors"
                style={{ borderBottom: idx < DUMMY_PREDICTIONS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-medium truncate"
                       style={{ color: "#ffffff" }}>
                    {pred.match}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#64748b" }}>
                    Picked: <span style={{ color: "#cbd5e1" }}>{pred.predicted}</span>
                    <span className="mx-1">·</span>
                    Result: <span style={{ color: "#cbd5e1" }}>{pred.actual}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                  <span className="text-xs" style={{ color: "#64748b" }}>{pred.date}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    pred.correct
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}>
                    {pred.correct ? "✓ Correct" : "✗ Wrong"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Badges Tab ── */}
        {activeTab === "badges" && (
          <div className="space-y-3">
            {/* Earned count */}
            <div className="flex items-center justify-between px-1">
              <span className="text-xs" style={{ color: "#64748b" }}>
                {DUMMY_BADGES.filter(b => b.earned).length} of {DUMMY_BADGES.length} earned
              </span>
              <div className="flex gap-1">
                {DUMMY_BADGES.map((b, i) => (
                  <div key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ background: b.earned ? "#FF6B2B" : "rgba(255,255,255,0.1)" }}
                  />
                ))}
              </div>
            </div>

            {DUMMY_BADGES.map(badge => (
              <div key={badge.id}
                className="card p-4 flex items-center gap-4"
                style={{ opacity: badge.earned ? 1 : 0.45 }}>
                <span className="text-2xl sm:text-3xl flex-shrink-0">{badge.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm sm:text-base" style={{ color: "#ffffff" }}>
                    {badge.label}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
                    {badge.desc}
                  </div>
                </div>
                {badge.earned
                  ? <span className="text-xs font-medium px-2 py-1 rounded-full flex-shrink-0
                                     bg-green-500/10 text-green-400">
                      Earned
                    </span>
                  : <span className="text-xs px-2 py-1 rounded-full flex-shrink-0"
                          style={{ background: "rgba(255,255,255,0.05)", color: "#64748b" }}>
                      Locked
                    </span>
                }
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
