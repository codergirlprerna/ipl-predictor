import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Zap, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuth } from "../../App";
import TeamBadge from "../ui/TeamBadge";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, profile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    setMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    { to: "/",            label: "Predictions" },
    { to: "/stats",       label: "Stats"       },
    { to: "/leaderboard", label: "Leaderboard" },
    { to: "/commentary",  label: "Commentary"  },
  ];

  const desktopLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-orange-400" : "text-gray-400 hover:text-white"
    }`;

  const avatarLetter = currentUser
    ? (currentUser.displayName || currentUser.email || "U").charAt(0).toUpperCase()
    : "";

  const favouriteTeam = profile?.favouriteTeam || null;

  return (
    <nav className="sticky top-0 z-50 bg-base/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-4xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-4">

        {/* ── Logo — pinned left ── */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0"
          onClick={() => setMenuOpen(false)}>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600
                          flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-display text-white text-lg sm:text-xl tracking-wide">
            Cric<span className="text-orange-400">Sense</span>
          </span>
        </Link>

        {/* ── Desktop Nav — no flex-1, sits naturally between logo and auth ── */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === "/"} className={desktopLinkClass}>
              {label}
            </NavLink>
          ))}
        </div>

        {/* ── Desktop Auth — pinned right ── */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-blue-600
                                flex items-center justify-center text-white text-sm font-bold">
                  {avatarLetter}
                </div>
                {favouriteTeam && <TeamBadge team={favouriteTeam} size="sm" />}
              </Link>
              <button onClick={handleLogout}
                className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
                title="Logout">
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login"
                className="text-sm text-gray-400 hover:text-white transition-colors font-medium">
                Login
              </Link>
              <Link to="/register"
                className="btn-primary text-sm px-4 py-2"
                style={{ color: "#ffffff" }}>
                Join Free 🏏
              </Link>
            </>
          )}
        </div>

        {/* ── Mobile hamburger ── */}
        <div className="flex md:hidden items-center gap-2">
          {currentUser && (
            <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-blue-600
                              flex items-center justify-center text-white text-xs font-bold">
                {avatarLetter}
              </div>
              {favouriteTeam && <TeamBadge team={favouriteTeam} size="sm" />}
            </Link>
          )}
          <button
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5 active:scale-95"
            onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown ── */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/5 bg-base/98 backdrop-blur-md">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === "/"}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-orange-500/10 text-orange-400"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                onClick={() => setMenuOpen(false)}>
                {label}
              </NavLink>
            ))}

            <div className="pt-2 mt-2 border-t border-white/10 space-y-1.5">
              {currentUser ? (
                <>
                  <Link to="/profile" onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-blue-600
                                    flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {avatarLetter}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-sm font-medium truncate">
                        {profile?.username || currentUser.displayName || currentUser.email}
                      </p>
                      <p className="text-gray-500 text-xs">View Profile</p>
                    </div>
                    {favouriteTeam && <TeamBadge team={favouriteTeam} size="sm" />}
                  </Link>
                  <button onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm
                               text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
                    <LogOut size={15} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}
                    className="flex items-center px-3 py-2.5 rounded-xl text-sm text-white
                               hover:bg-white/5 transition-colors font-medium">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center px-3 py-2.5 rounded-xl text-sm
                               font-medium bg-orange-500 hover:bg-orange-600 transition-colors"
                    style={{ color: "#ffffff" }}>
                    Join Free 🏏
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
