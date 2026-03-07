import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, Eye, EyeOff, Check } from "lucide-react";
import toast from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import { useAuth } from "../App";

const IPL_TEAMS = [
  { name: "Chennai Super Kings",         short: "CSK",  color: "#F9CD1B" },
  { name: "Mumbai Indians",              short: "MI",   color: "#004BA0" },
  { name: "Royal Challengers Bengaluru", short: "RCB",  color: "#EC1C24" },
  { name: "Kolkata Knight Riders",       short: "KKR",  color: "#3A225D" },
  { name: "Delhi Capitals",              short: "DC",   color: "#0078BC" },
  { name: "Rajasthan Royals",            short: "RR",   color: "#EA1A85" },
  { name: "Sunrisers Hyderabad",         short: "SRH",  color: "#FF822A" },
  { name: "Punjab Kings",               short: "PBKS", color: "#ED1B24" },
  { name: "Lucknow Super Giants",        short: "LSG",  color: "#A4C8E1" },
  { name: "Gujarat Titans",             short: "GT",   color: "#1C1C6B" },
];

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setNeedsTeamSetup } = useAuth();

  const [step, setStep]       = useState(1);
  const [showPw, setShowPw]   = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm]       = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [favouriteTeam, setFavouriteTeam] = useState("");

  const goToStep2 = () => {
    setNeedsTeamSetup(true);
    setStep(2);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 0);
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setForm(f => ({ ...f, username: result.user.displayName || "" }));
      goToStep2();
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") toast.error(getFriendlyError(err.code));
    } finally { setLoading(false); }
  };

  const handleEmailRegister = async () => {
    if (!form.username.trim())                  { toast.error("Username is required");               return; }
    if (form.username.trim().length < 3)        { toast.error("Username must be at least 3 chars");  return; }
    if (!form.email)                            { toast.error("Email is required");                  return; }
    if (form.password.length < 6)               { toast.error("Password must be at least 6 chars");  return; }
    if (form.password !== form.confirmPassword) { toast.error("Passwords do not match");             return; }

    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(result.user, { displayName: form.username.trim() });
      goToStep2();
    } catch (err) {
      toast.error(getFriendlyError(err.code));
    } finally { setLoading(false); }
  };

  const handleFavouriteTeam = async () => {
    if (!favouriteTeam) { toast.error("Please pick your favourite team!"); return; }
    setLoading(true);
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          username: form.username.trim() || auth.currentUser.displayName,
          favouriteTeam,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }
      setNeedsTeamSetup(false);
      toast.success("Welcome to CricSense! 🏏");
      navigate("/");
    } catch (err) {
      if (err.message.includes("fetch") || err.message.includes("Failed")) {
        setNeedsTeamSetup(false);
        toast.success("Welcome to CricSense! 🏏");
        navigate("/");
      } else {
        toast.error(err.message || "Could not save your team. Try again.");
      }
    } finally { setLoading(false); }
  };

  const getFriendlyError = (code) => {
    switch (code) {
      case "auth/email-already-in-use":   return "This email is already registered. Try signing in.";
      case "auth/weak-password":          return "Password is too weak. Use at least 6 characters.";
      case "auth/invalid-email":          return "Please enter a valid email address.";
      case "auth/network-request-failed": return "Network error. Check your connection.";
      default:                            return "Something went wrong. Please try again.";
    }
  };

  const selectedTeam = IPL_TEAMS.find(t => t.name === favouriteTeam);

  return (
    <div className="min-h-screen bg-base flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-sm space-y-5">

        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600
                            flex items-center justify-center shadow-lg">
              <Zap size={18} className="text-white" />
            </div>
            <span className="font-display text-white text-2xl">
              Cric<span className="text-orange-400">Sense</span>
            </span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-display text-white">
            {step === 1 ? "Create your account" : "Pick your team"}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {step === 1
              ? "Sense the game. Feel the hype."
              : "Your badge shows on your profile and leaderboard 🏆"}
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 justify-center">
          <div className={`h-1.5 w-16 rounded-full transition-colors duration-300
                          ${step >= 1 ? "bg-orange-500" : "bg-white/10"}`} />
          <div className={`h-1.5 w-16 rounded-full transition-colors duration-300
                          ${step >= 2 ? "bg-orange-500" : "bg-white/10"}`} />
        </div>

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div className="card p-5 sm:p-6 space-y-4">
            <button onClick={handleGoogleRegister} disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-2.5 sm:py-3
                         rounded-xl border border-white/10 hover:border-white/20
                         text-white text-sm font-medium transition-all hover:bg-white/5
                         disabled:opacity-50 disabled:cursor-not-allowed">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? "Connecting..." : "Continue with Google"}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-gray-500 text-xs">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {[
              { label: "Username", key: "username", type: "text", placeholder: "e.g. CSKFan007" },
              { label: "Email",    key: "email",    type: "email", placeholder: "you@example.com" },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key} className="space-y-1">
                <label className="text-xs text-gray-400 font-medium">{label}</label>
                <input type={type} placeholder={placeholder}
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  className="w-full bg-surface-hover border border-white/10 rounded-xl
                             px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white placeholder-gray-600
                             focus:outline-none focus:border-orange-500/50 transition-colors" />
              </div>
            ))}

            {[
              { label: "Password",         key: "password",        show: showPw,  toggle: () => setShowPw(!showPw),   placeholder: "Min. 6 characters" },
              { label: "Confirm Password", key: "confirmPassword", show: showCpw, toggle: () => setShowCpw(!showCpw), placeholder: "••••••••" },
            ].map(({ label, key, show, toggle, placeholder }) => (
              <div key={key} className="space-y-1">
                <label className="text-xs text-gray-400 font-medium">{label}</label>
                <div className="relative">
                  <input type={show ? "text" : "password"} placeholder={placeholder}
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    onKeyDown={key === "confirmPassword" ? e => e.key === "Enter" && handleEmailRegister() : undefined}
                    className="w-full bg-surface-hover border border-white/10 rounded-xl
                               px-3 sm:px-4 py-2.5 sm:py-3 pr-11 text-sm text-white placeholder-gray-600
                               focus:outline-none focus:border-orange-500/50 transition-colors" />
                  <button onClick={toggle}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                    {show ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              </div>
            ))}

            <button onClick={handleEmailRegister} disabled={loading}
              className="btn-primary w-full py-2.5 sm:py-3 text-sm sm:text-base
                         disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </div>
        )}

        {/* ── STEP 2: Team picker ── */}
        {step === 2 && (
          <div className="card p-5 sm:p-6 space-y-4">
            {selectedTeam && (
              <div className="flex items-center gap-3 p-3 rounded-xl border border-orange-500/30 bg-orange-500/5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                  style={{ backgroundColor: selectedTeam.color + "33" }}>
                  <span className="font-display text-white text-xs font-bold">{selectedTeam.short}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold">{selectedTeam.short}</p>
                  <p className="text-gray-400 text-xs truncate">{selectedTeam.name}</p>
                </div>
                <Check size={15} className="text-orange-400 flex-shrink-0" />
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              {IPL_TEAMS.map((team) => {
                const isSelected = favouriteTeam === team.name;
                return (
                  <button key={team.short} onClick={() => setFavouriteTeam(team.name)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all text-left
                      ${isSelected
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-white/10 hover:border-white/25 hover:bg-white/5"}`}>
                    <div className="w-1 h-8 rounded-full flex-shrink-0"
                      style={{ backgroundColor: team.color }} />
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-sm font-bold leading-tight">{team.short}</p>
                      <p className="text-gray-500 leading-tight truncate" style={{ fontSize: "10px" }}>
                        {team.name}
                      </p>
                    </div>
                    {isSelected && <Check size={13} className="text-orange-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            <button onClick={handleFavouriteTeam} disabled={loading || !favouriteTeam}
              className="btn-primary w-full py-2.5 sm:py-3 text-sm sm:text-base
                         disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Saving..." : selectedTeam ? `I'm a ${selectedTeam.short} fan! 🏏` : "Select your team first"}
            </button>
          </div>
        )}

        {step === 1 && (
          <p className="text-center text-gray-400 text-sm pb-4">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-400 hover:underline font-medium">Sign in</Link>
          </p>
        )}
      </div>
    </div>
  );
}
