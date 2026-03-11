import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, BarChart2, Trophy } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">

      {/* Big cricket ball animation */}
      <div className="relative mb-6">
        <div
          className="text-8xl select-none"
          style={{ animation: "bounce 1.6s infinite" }}
        >
          🏏
        </div>
        <div
          className="absolute -top-2 -right-4 text-3xl"
          style={{ animation: "spin 3s linear infinite" }}
        >
          🔴
        </div>
      </div>

      {/* 404 display */}
      <div className="mb-2">
        <span
          className="font-display"
          style={{
            fontSize: "clamp(5rem, 20vw, 8rem)",
            lineHeight: 1,
            background: "linear-gradient(135deg, #FF6B2B, #f97316)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </span>
      </div>

      <h1 className="text-2xl font-display text-white mb-2">Bowled Out!</h1>
      <p className="text-gray-400 mb-8 max-w-xs text-sm leading-relaxed">
        This page got caught at the boundary. Even the Oracle didn't see this coming.
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                     font-semibold text-sm transition-all active:scale-95"
          style={{ background: "#FF6B2B", color: "#ffffff" }}
        >
          <Home size={15} />
          Back to Home
        </Link>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                     font-semibold text-sm transition-all active:scale-95"
          style={{ background: "rgba(255,255,255,0.06)", color: "#cbd5e1",
                   border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <ArrowLeft size={15} />
          Go Back
        </button>
      </div>

      {/* Quick links */}
      <div className="mt-8 flex items-center gap-4">
        <Link to="/stats" className="flex items-center gap-1.5 text-xs text-gray-400
                                      hover:text-orange-400 transition-colors">
          <BarChart2 size={13} /> Stats
        </Link>
        <span className="text-gray-700">·</span>
        <Link to="/leaderboard" className="flex items-center gap-1.5 text-xs text-gray-400
                                            hover:text-orange-400 transition-colors">
          <Trophy size={13} /> Leaderboard
        </Link>
      </div>

    </div>
  );
}
