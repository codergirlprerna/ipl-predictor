import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-surface-border mt-16 py-10">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center
                      justify-between gap-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600
                          flex items-center justify-center">
            <Zap size={13} className="text-white" />
          </div>
          <span className="font-display text-white text-lg tracking-wide">
            Cric<span className="text-orange-400">Sense</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-6">
          {[
            { to: "/",            label: "Predictions" },
            { to: "/stats",       label: "Stats"       },
            { to: "/leaderboard", label: "Leaderboard" },
          ].map(({ to, label }) => (
            <Link key={to} to={to}
              className="text-gray-500 hover:text-white text-sm transition-colors">
              {label}
            </Link>
          ))}
        </div>

        {/* Tagline + copyright */}
        <div className="text-right">
          <p className="text-gray-500 text-xs font-mono">Sense the game. Feel the hype.</p>
          <p className="text-gray-600 text-xs mt-0.5">© 2026 CricSense. IPL 2026.</p>
        </div>

      </div>
    </footer>
  );
}
