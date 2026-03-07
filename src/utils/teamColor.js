export const TEAM_COLORS = {
  CSK:  { primary: "#F9CD1B", bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" },
  MI:   { primary: "#004BA0", bg: "bg-blue-500/20",   text: "text-blue-400",   border: "border-blue-500/30"   },
  RCB:  { primary: "#EC1C24", bg: "bg-red-500/20",    text: "text-red-400",    border: "border-red-500/30"    },
  SRH:  { primary: "#F26522", bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30" },
  KKR:  { primary: "#3A225D", bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
  DC:   { primary: "#0078BC", bg: "bg-sky-500/20",    text: "text-sky-400",    border: "border-sky-500/30"    },
  GT:   { primary: "#1C4B9C", bg: "bg-teal-500/20",   text: "text-teal-400",   border: "border-teal-500/30"   },
  LSG:  { primary: "#A72056", bg: "bg-cyan-500/20",   text: "text-cyan-400",   border: "border-cyan-500/30"   },
  RR:   { primary: "#254AA5", bg: "bg-pink-500/20",   text: "text-pink-400",   border: "border-pink-500/30"   },
  PBKS: { primary: "#ED1B24", bg: "bg-rose-500/20",   text: "text-rose-400",   border: "border-rose-500/30"   },
}

export const getTeamColor = (teamCode) => {
  return TEAM_COLORS[teamCode] || {
    primary: "#64748B",
    bg: "bg-slate-500/20",
    text: "text-slate-400",
    border: "border-slate-500/30"
  }
}