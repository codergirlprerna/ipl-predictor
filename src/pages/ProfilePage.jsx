import { useState } from "react";
import { User, Trophy, Target, MessageSquare, Star, TrendingUp } from "lucide-react";
import TeamBadge from "../components/ui/TeamBadge";
import ConfidenceMeter from "../components/ui/ConfidenceMeter";

const DUMMY_USER = {
  name: "Rahul Sharma",
  email: "rahul@example.com",
  favouriteTeam: "MI",
  city: "Mumbai",
  joinedDate: "March 2026",
  predictions: { correct: 18, total: 24, accuracy: 75 },
  rank: 12,
  totalUsers: 1247,
  badges: [
    { id: "oracle", label: "Oracle", desc: "70%+ prediction accuracy", icon: "🔮", earned: true },
    { id: "12thman", label: "12th Man", desc: "Joined 10 match chats", icon: "💬", earned: true },
    { id: "superfan", label: "Super Fan", desc: "Registered before IPL", icon: "⭐", earned: true },
    { id: "streak", label: "Hot Streak", desc: "5 correct predictions in a row", icon: "🔥", earned: false },
    { id: "champion", label: "Champion", desc: "Finish in top 10 leaderboard", icon: "🏆", earned: false },
  ],
  recentPredictions: [
    { match: "MI vs CSK", predicted: "MI", actual: "MI", correct: true, date: "Mar 22" },
    { match: "RCB vs KKR", predicted: "RCB", actual: "KKR", correct: false, date: "Mar 23" },
    { match: "SRH vs DC",  predicted: "SRH", actual: "SRH", correct: true,  date: "Mar 24" },
    { match: "GT vs RR",   predicted: "RR",  actual: "RR",  correct: true,  date: "Mar 25" },
    { match: "PBKS vs LSG", predicted: "PBKS", actual: "LSG", correct: false, date: "Mar 26" },
  ],
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const user = DUMMY_USER;

  return (
    <div className="min-h-screen bg-base py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Profile Header */}
        <div className="card p-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-white">{user.name}</h1>
              <p className="text-gray-400 text-sm">{user.email}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <TeamBadge team={user.favouriteTeam} size="sm" />
                <span className="text-gray-500 text-xs">{user.city}</span>
                <span className="text-gray-500 text-xs">Joined {user.joinedDate}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-display text-orange-400">#{user.rank}</div>
              <div className="text-gray-500 text-xs">of {user.totalUsers.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Predictions", value: user.predictions.total, icon: Target, color: "text-blue-400" },
            { label: "Correct", value: user.predictions.correct, icon: Trophy, color: "text-green-400" },
            { label: "Accuracy", value: `${user.predictions.accuracy}%`, icon: TrendingUp, color: "text-orange-400" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="card p-4 text-center">
              <Icon size={18} className={`${color} mx-auto mb-2`} />
              <div className={`text-2xl font-display ${color}`}>{value}</div>
              <div className="text-gray-500 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Accuracy Bar */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">Prediction Accuracy</span>
            <span className="text-orange-400 font-bold">{user.predictions.accuracy}%</span>
          </div>
          <ConfidenceMeter pct={user.predictions.accuracy} />
          <p className="text-gray-500 text-xs mt-2">
            {user.predictions.accuracy >= 70
              ? "🔮 Oracle tier — you're in the top predictors!"
              : user.predictions.accuracy >= 55
              ? "📈 Good accuracy — keep predicting to improve your rank"
              : "🎯 Keep going — every match is a chance to climb"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-white/10 pb-0">
          {["overview", "predictions", "badges"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize transition-all border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-orange-500 text-orange-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="card p-5">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Star size={16} className="text-orange-400" /> Earned Badges
              </h3>
              <div className="flex flex-wrap gap-3">
                {user.badges.filter(b => b.earned).map(badge => (
                  <div key={badge.id} className="flex items-center gap-2 bg-surface-hover rounded-xl px-3 py-2">
                    <span className="text-lg">{badge.icon}</span>
                    <div>
                      <div className="text-white text-xs font-medium">{badge.label}</div>
                      <div className="text-gray-500 text-xs">{badge.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Predictions Tab */}
        {activeTab === "predictions" && (
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h3 className="text-white font-semibold">Recent Predictions</h3>
            </div>
            {user.recentPredictions.map((pred, idx) => (
              <div key={idx} className="flex items-center justify-between px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <div>
                  <div className="text-white text-sm font-medium">{pred.match}</div>
                  <div className="text-gray-500 text-xs mt-0.5">
                    You picked: <span className="text-gray-300">{pred.predicted}</span>
                    <span className="mx-1">·</span>
                    Result: <span className="text-gray-300">{pred.actual}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-xs">{pred.date}</span>
                  <span className={`text-lg ${pred.correct ? "text-green-400" : "text-red-400"}`}>
                    {pred.correct ? "✓" : "✗"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === "badges" && (
          <div className="grid gap-3">
            {user.badges.map(badge => (
              <div key={badge.id} className={`card p-4 flex items-center gap-4 ${!badge.earned && "opacity-40"}`}>
                <span className="text-3xl">{badge.icon}</span>
                <div className="flex-1">
                  <div className="text-white font-medium">{badge.label}</div>
                  <div className="text-gray-400 text-sm">{badge.desc}</div>
                </div>
                {badge.earned
                  ? <span className="text-green-400 text-xs font-medium bg-green-500/10 px-2 py-1 rounded-full">Earned</span>
                  : <span className="text-gray-500 text-xs bg-white/5 px-2 py-1 rounded-full">Locked</span>
                }
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}