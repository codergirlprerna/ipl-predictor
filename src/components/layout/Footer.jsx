import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-center
                        justify-between gap-4 sm:gap-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600
                            flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <span className="font-display text-2xl tracking-wide" style={{ color: "#ffffff" }}>
              Cric<span style={{ color: "#FF6B2B" }}>Sense</span>
            </span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-4 sm:gap-6">
            {[
              { to: "/",            label: "Predictions" },
              { to: "/stats",       label: "Stats"       },
              { to: "/leaderboard", label: "Leaderboard" },
              { to: "/commentary",  label: "Commentary"  },
            ].map(({ to, label }) => (
              <Link key={to} to={to}
                className="text-gray-500 hover:text-white text-sm transition-colors">
                {label}
              </Link>
            ))}
          </div>

          {/* Tagline + copyright */}
          <div className="text-center sm:text-right flex-shrink-0">
            <p className="text-gray-500 text-xs font-mono">Sense the game. Feel the hype.</p>
            <p className="text-gray-600 text-xs mt-0.5">© 2026 CricSense. IPL 2026.</p>
          </div>

        </div>
      </div>
    </footer>
  );
}
