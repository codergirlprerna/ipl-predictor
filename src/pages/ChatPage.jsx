import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Send, Zap, Lock } from "lucide-react";
import TeamBadge from "../components/ui/TeamBadge";
import { DUMMY_MATCHES } from "../data/dummy";
import { useAuth } from "../App";

// ── Dummy messages ────────────────────────────────────────────────────────────
const INITIAL_MESSAGES = [
  {
    id: 1, type: "bot",
    text: "🏏 CSK vs MI — Match has started! Good luck everyone.",
    time: "7:30 PM", reactions: { "🔥": 24, "💀": 3, "😭": 1 },
  },
  {
    id: 2, type: "user", name: "Rahul M", team: "CSK", avatar: "R",
    text: "CSK jeetega aaj 100% 🦁 Chepauk ka magic hai bhai",
    time: "7:31 PM", reactions: { "🔥": 8, "💀": 12, "😭": 0 },
  },
  {
    id: 3, type: "user", name: "Priya S", team: "MI", avatar: "P",
    text: "Bumrah aaj sab ki class lega 😤 MI all the way",
    time: "7:32 PM", reactions: { "🔥": 15, "💀": 4, "😭": 2 },
  },
  {
    id: 4, type: "scoreUpdate",
    text: "📊 CSK: 42/1 after 6 overs | Gaikwad: 28*(18)",
    time: "7:48 PM", reactions: {},
  },
  {
    id: 5, type: "user", name: "Arjun K", team: "RCB", avatar: "A",
    text: "Gaikwad is cooking today 🔥🔥 look at that SR",
    time: "7:49 PM", reactions: { "🔥": 21, "💀": 0, "😭": 1 },
  },
  {
    id: 6, type: "user", name: "Deepak R", team: "KKR", avatar: "D",
    text: "Bumrah over abhi aana baaki hai... tab dekhna",
    time: "7:50 PM", reactions: { "🔥": 6, "💀": 9, "😭": 3 },
  },
  {
    id: 7, type: "user", name: "Sneha T", team: "SRH", avatar: "S",
    text: "Chepauk pitch dekho — spin bowling me clearly help ho raha hai",
    time: "7:51 PM", reactions: { "🔥": 4, "💀": 2, "😭": 0 },
  },
  {
    id: 8, type: "scoreUpdate",
    text: "📊 CSK: 89/2 after 12 overs | Dhoni incoming? 👀",
    time: "8:02 PM", reactions: {},
  },
  {
    id: 9, type: "user", name: "Rahul M", team: "CSK", avatar: "R",
    text: "DHONI DHONI DHONI 🦁🦁🦁 YESSS",
    time: "8:03 PM", reactions: { "🔥": 67, "💀": 5, "😭": 2 },
  },
  {
    id: 10, type: "user", name: "Priya S", team: "MI", avatar: "P",
    text: "okay okay mera dil toh thoda dara gaya 😭 but MI still has Bumrah",
    time: "8:04 PM", reactions: { "🔥": 3, "💀": 18, "😭": 11 },
  },
];

const REACTION_EMOJIS = ["🔥", "💀", "😭"];

const avatarColor = (name) => {
  const colors = [
    "#FF6B2B", "#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444"
  ];
  return colors[name.charCodeAt(0) % colors.length];
};

export default function ChatPage() {
  const { id } = useParams();
  const match  = DUMMY_MATCHES.find(m => m.id === parseInt(id)) || DUMMY_MATCHES[0];
  const { currentUser } = useAuth();
  const isLoggedIn = !!currentUser;

  const [messages, setMessages]   = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [userReactions, setUserReactions] = useState({}); // msgId → emoji
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim() || !isLoggedIn) return;
    const newMsg = {
      id: Date.now(), type: "user",
      name: "You", team: "CSK", avatar: "Y",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      reactions: { "🔥": 0, "💀": 0, "😭": 0 },
    };
    setMessages(prev => [...prev, newMsg]);
    setInputText("");
  };

  const handleReaction = (msgId, emoji) => {
    const key = `${msgId}-${emoji}`;
    const already = userReactions[key];
    setUserReactions(prev => ({ ...prev, [key]: !already }));
    setMessages(prev => prev.map(m => {
      if (m.id !== msgId) return m;
      return {
        ...m,
        reactions: {
          ...m.reactions,
          [emoji]: (m.reactions[emoji] || 0) + (already ? -1 : 1),
        },
      };
    }));
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A1628" }}>

      {/* ── Header ── */}
      <div className="px-4 py-3 border-b flex items-center gap-3 flex-shrink-0"
           style={{ borderColor: "#1E3A5F", background: "#0F2040" }}>
        <Link to={`/match/${id}`}
          className="flex items-center gap-1.5 text-xs transition-colors"
          style={{ color: "#94a3b8" }}>
          <ArrowLeft size={14} /> Back
        </Link>

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <TeamBadge team={match.team1} size="sm" />
          <span style={{ color: "#94a3b8" }} className="text-xs font-mono">vs</span>
          <TeamBadge team={match.team2} size="sm" />
          <span style={{ color: "#ffffff" }} className="text-xs font-semibold truncate">
            {match.team1} vs {match.team2}
          </span>
        </div>

        {/* Online count */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span style={{ color: "#4ade80" }} className="text-xs font-mono">247 online</span>
        </div>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
           style={{ scrollbarWidth: "thin", scrollbarColor: "#FF6B2B #0A1628" }}>

        {messages.map((msg) => {

          // Bot / system message
          if (msg.type === "bot") return (
            <div key={msg.id} className="flex justify-center">
              <div className="text-xs px-4 py-2 rounded-full text-center max-w-xs"
                   style={{ background: "#132238", color: "#94a3b8", border: "1px solid #1E3A5F" }}>
                {msg.text}
              </div>
            </div>
          );

          // Score update — pinned style
          if (msg.type === "scoreUpdate") return (
            <div key={msg.id} className="flex justify-center">
              <div className="text-xs px-4 py-2.5 rounded-xl text-center"
                   style={{ background: "rgba(255,107,43,0.12)", border: "1px solid rgba(255,107,43,0.25)", color: "#fb923c" }}>
                {msg.text}
              </div>
            </div>
          );

          // Regular user message
          return (
            <div key={msg.id} className="flex gap-2.5">
              {/* Avatar */}
              <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center
                              text-white text-xs font-bold"
                   style={{ background: avatarColor(msg.name), flexShrink: 0 }}>
                {msg.avatar}
              </div>

              <div className="flex-1 min-w-0">
                {/* Name + team + time */}
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ color: "#ffffff" }} className="text-xs font-semibold">{msg.name}</span>
                  <TeamBadge team={msg.team} size="sm" />
                  <span style={{ color: "#475569" }} className="text-[10px] font-mono ml-auto">{msg.time}</span>
                </div>

                {/* Bubble */}
                <div className="rounded-2xl rounded-tl-sm px-3 py-2 inline-block max-w-full"
                     style={{ background: "#132238", border: "1px solid #1E3A5F" }}>
                  <p style={{ color: "#e2e8f0" }} className="text-sm leading-relaxed break-words">
                    {msg.text}
                  </p>
                </div>

                {/* Reactions */}
                {Object.keys(msg.reactions).length > 0 && (
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    {REACTION_EMOJIS.map(emoji => {
                      const count = msg.reactions[emoji] || 0;
                      const reacted = userReactions[`${msg.id}-${emoji}`];
                      return (
                        <button key={emoji}
                          onClick={() => handleReaction(msg.id, emoji)}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs
                                     transition-all active:scale-95"
                          style={{
                            background: reacted ? "rgba(255,107,43,0.2)" : "rgba(255,255,255,0.05)",
                            border: reacted ? "1px solid rgba(255,107,43,0.4)" : "1px solid rgba(255,255,255,0.08)",
                            color: reacted ? "#fb923c" : "#94a3b8",
                          }}>
                          <span>{emoji}</span>
                          {count > 0 && <span>{count}</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* ── Input area ── */}
      <div className="flex-shrink-0 px-4 py-3 border-t"
           style={{ borderColor: "#1E3A5F", background: "#0F2040" }}>
        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <input
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="Type something..."
              className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                background: "#132238",
                border: "1px solid #1E3A5F",
                color: "#ffffff",
              }}
            />
            <button onClick={handleSend}
              className="w-10 h-10 rounded-xl flex items-center justify-center
                         transition-all active:scale-95 flex-shrink-0"
              style={{ background: inputText.trim() ? "#FF6B2B" : "#1E3A5F" }}>
              <Send size={15} style={{ color: "#ffffff" }} />
            </button>
          </div>
        ) : (
          <Link to="/register"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                       text-sm font-semibold transition-all"
            style={{ background: "rgba(255,107,43,0.15)", border: "1px solid rgba(255,107,43,0.3)", color: "#fb923c" }}>
            <Lock size={13} />
            Register free to join the chat
            <Zap size={13} />
          </Link>
        )}
      </div>

    </div>
  );
}
