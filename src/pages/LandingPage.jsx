import { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, Trophy, Radio, Globe, ArrowRight, CheckCircle, Loader } from "lucide-react";

// ── Feature cards data ────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: "🔮",
    label: "Sense Verdict",
    title: "AI-Powered Match Predictions",
    desc: "Before every match, CricSense analyses pitch conditions, team form, head-to-head records and player stats to deliver a confidence-rated prediction.",
    accent: "#FF6B2B",
    accentBg: "rgba(255,107,43,0.08)",
    accentBorder: "rgba(255,107,43,0.2)",
  },
  {
    icon: "🗳️",
    label: "Fan Pulse",
    title: "Real-Time Fan Voting",
    desc: "Vote for your team, submit your prediction before toss, and watch the crowd sentiment shift live. Correct predictions earn you points on the leaderboard.",
    accent: "#3B82F6",
    accentBg: "rgba(59,130,246,0.08)",
    accentBorder: "rgba(59,130,246,0.2)",
  },
  {
    icon: "🏆",
    label: "Leaderboard",
    title: "Compete With Every Fan",
    desc: "Track your prediction accuracy across the season. Climb the global leaderboard and prove you sense the game better than everyone else.",
    accent: "#F59E0B",
    accentBg: "rgba(245,158,11,0.08)",
    accentBorder: "rgba(245,158,11,0.2)",
  },
  {
    icon: "🎙️",
    label: "Regional Commentary",
    title: "5 Indian Languages",
    desc: "Ball-by-ball commentary in Hindi, Tamil, Telugu, Bengali and Kannada. Feel the game in the language that hits different for you.",
    accent: "#10B981",
    accentBg: "rgba(16,185,129,0.08)",
    accentBorder: "rgba(16,185,129,0.2)",
  },
];

// ── Waitlist form ─────────────────────────────────────────────────────────────
function WaitlistForm() {
  const [email, setEmail]     = useState("");
  const [status, setStatus]   = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "727a57f9-fff3-431f-9644-915d3ae27f7d",
          subject: "New CricSense Waitlist Signup 🏏",
          email,
          message: `${email} just joined the CricSense waitlist!`,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30
                        flex items-center justify-center">
          <CheckCircle size={22} className="text-green-400" />
        </div>
        <p className="text-white font-semibold text-base">You're on the list! 🎉</p>
        <p className="text-gray-400 text-sm text-center max-w-xs">
          We'll notify you the moment CricSense goes live for IPL 2026.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setErrorMsg(""); }}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          placeholder="Enter your email"
          className="input flex-1 text-sm"
          disabled={status === "loading"}
        />
        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm
                     transition-all active:scale-95 flex-shrink-0"
          style={{ background: "#FF6B2B", color: "#ffffff",
                   opacity: status === "loading" ? 0.7 : 1 }}>
          {status === "loading"
            ? <Loader size={15} className="animate-spin" />
            : <><Zap size={14} /> Notify Me</>
          }
        </button>
      </div>
      {errorMsg && (
        <p className="text-red-400 text-xs text-center">{errorMsg}</p>
      )}
      <p className="text-gray-500 text-xs text-center">
        No spam. Just one email when we launch. 🏏
      </p>
    </div>
  );
}

// ── Main Landing Page ─────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0A1628" }}>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 border-b border-white/5"
           style={{ background: "rgba(10,22,40,0.95)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600
                            flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="font-display text-white text-lg tracking-wide">
              Cric<span className="text-orange-400">Sense</span>
            </span>
          </div>

          {/* CTA */}
          <Link to="/register"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl
                       transition-all active:scale-95"
            style={{ background: "rgba(255,107,43,0.15)",
                     border: "1px solid rgba(255,107,43,0.3)",
                     color: "#FF6B2B" }}>
            <Zap size={12} /> Early Access
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 pt-16 sm:pt-24 pb-16 sm:pb-20 text-center">

        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px]
                        rounded-full pointer-events-none"
             style={{ background: "radial-gradient(ellipse, rgba(255,107,43,0.12) 0%, transparent 70%)" }} />

        <div className="relative max-w-3xl mx-auto">

          {/* IPL badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6
                          border text-xs font-mono font-medium"
               style={{ background: "rgba(255,107,43,0.1)",
                        borderColor: "rgba(255,107,43,0.25)",
                        color: "#FF6B2B" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            IPL 2026 — Coming Soon
          </div>

          {/* Headline */}
          <h1 className="font-display text-white leading-none mb-4"
              style={{ fontSize: "clamp(3rem, 10vw, 6rem)" }}>
            Sense the game.<br />
            <span style={{ color: "#FF6B2B" }}>Feel the hype.</span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            CricSense is the ultimate IPL fan platform — AI predictions, fan pulse voting,
            regional commentary and a leaderboard to prove you know cricket better than everyone.
          </p>

          {/* Waitlist form */}
          <WaitlistForm />

          {/* Already have account */}
          <p className="text-gray-600 text-xs mt-4">
            Already registered?{" "}
            <Link to="/login" className="text-orange-400 hover:text-orange-300 transition-colors">
              Sign in →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Value strip ── */}
      <section className="px-4 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: "🔮", text: "AI-Powered Predictions" },
            { icon: "🗳️", text: "Real-Time Fan Pulse" },
            { icon: "🏆", text: "Prediction Leaderboard" },
            { icon: "🎙️", text: "5 Regional Languages" },
          ].map(({ icon, text }) => (
            <div key={text}
                 className="flex items-center gap-2.5 px-3 py-3 rounded-xl"
                 style={{ background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="text-lg flex-shrink-0">{icon}</span>
              <span className="text-xs font-medium text-gray-300 leading-tight">{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-4 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-8 sm:mb-10">
            <p className="section-label mb-2">What's inside</p>
            <h2 className="font-display text-white text-2xl sm:text-4xl">
              Built for the real fan
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {FEATURES.map(({ icon, label, title, desc, accent, accentBg, accentBorder }) => (
              <div key={label}
                   className="rounded-2xl p-5 sm:p-6 space-y-3 transition-all"
                   style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">{icon}</span>
                  <span className="text-xs font-mono uppercase tracking-widest"
                        style={{ color: accent }}>
                    {label}
                  </span>
                </div>

                <h3 className="font-display text-white text-lg sm:text-xl leading-tight">
                  {title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="px-4 pb-16 sm:pb-20">
        <div className="max-w-2xl mx-auto rounded-2xl p-8 sm:p-10 text-center space-y-5"
             style={{ background: "linear-gradient(135deg, rgba(255,107,43,0.12), rgba(255,107,43,0.04))",
                      border: "1px solid rgba(255,107,43,0.2)" }}>
          <div className="text-4xl">🏏</div>
          <h2 className="font-display text-white text-2xl sm:text-3xl">
            Ready to sense the game?
          </h2>
          <p className="text-gray-400 text-sm max-w-sm mx-auto">
            Join the waitlist and be the first to know when CricSense goes live for IPL 2026.
          </p>
          <WaitlistForm />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 px-4 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center
                        justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600
                            flex items-center justify-center">
              <Zap size={11} className="text-white" />
            </div>
            <span className="font-display text-white text-base tracking-wide">
              Cric<span className="text-orange-400">Sense</span>
            </span>
          </div>
          <p className="text-gray-600 text-xs">
            © 2026 CricSense · IPL 2026 · Sense the game.
          </p>
          <Link to="/register"
            className="text-xs text-gray-500 hover:text-orange-400 transition-colors
                       flex items-center gap-1">
            Early Access <ArrowRight size={11} />
          </Link>
        </div>
      </footer>

    </div>
  );
}
