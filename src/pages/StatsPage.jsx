import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TrendingUp, Award, Table2, CalendarDays } from "lucide-react";
import { DUMMY_STATS, DUMMY_POINTS_TABLE } from "../data/dummy";
import TeamBadge from "../components/ui/TeamBadge";

// ── Dummy IPL 2026 Schedule ──────────────────────────────────────────────────
const SCHEDULE = [
  { id: 1,  date: "2026-03-22", time: "7:30 PM", team1: "Chennai Super Kings",         team2: "Mumbai Indians",               venue: "MA Chidambaram Stadium",    city: "Chennai",    status: "completed", winner: "Chennai Super Kings"  },
  { id: 2,  date: "2026-03-23", time: "3:30 PM", team1: "Rajasthan Royals",            team2: "Sunrisers Hyderabad",          venue: "Sawai Mansingh Stadium",     city: "Jaipur",     status: "completed", winner: "Sunrisers Hyderabad"  },
  { id: 3,  date: "2026-03-23", time: "7:30 PM", team1: "Royal Challengers Bengaluru", team2: "Kolkata Knight Riders",        venue: "M Chinnaswamy Stadium",      city: "Bengaluru",  status: "completed", winner: "Kolkata Knight Riders" },
  { id: 4,  date: "2026-03-24", time: "7:30 PM", team1: "Delhi Capitals",              team2: "Punjab Kings",                 venue: "Arun Jaitley Stadium",       city: "Delhi",      status: "completed", winner: "Delhi Capitals"        },
  { id: 5,  date: "2026-03-25", time: "7:30 PM", team1: "Gujarat Titans",              team2: "Lucknow Super Giants",         venue: "Narendra Modi Stadium",      city: "Ahmedabad",  status: "completed", winner: "Gujarat Titans"        },
  { id: 6,  date: "2026-03-26", time: "7:30 PM", team1: "Mumbai Indians",              team2: "Rajasthan Royals",             venue: "Wankhede Stadium",           city: "Mumbai",     status: "completed", winner: "Mumbai Indians"        },
  { id: 7,  date: "2026-03-27", time: "7:30 PM", team1: "Chennai Super Kings",         team2: "Sunrisers Hyderabad",          venue: "MA Chidambaram Stadium",    city: "Chennai",    status: "completed", winner: "Chennai Super Kings"  },
  { id: 8,  date: "2026-03-28", time: "7:30 PM", team1: "Kolkata Knight Riders",       team2: "Delhi Capitals",               venue: "Eden Gardens",               city: "Kolkata",    status: "completed", winner: "Kolkata Knight Riders" },
  { id: 9,  date: "2026-03-06", time: "7:30 PM", team1: "Chennai Super Kings",         team2: "Mumbai Indians",               venue: "MA Chidambaram Stadium",    city: "Chennai",    status: "upcoming",  winner: null },
  { id: 10, date: "2026-03-07", time: "3:30 PM", team1: "Royal Challengers Bengaluru", team2: "Kolkata Knight Riders",        venue: "M Chinnaswamy Stadium",      city: "Bengaluru",  status: "upcoming",  winner: null },
  { id: 11, date: "2026-03-07", time: "7:30 PM", team1: "Sunrisers Hyderabad",         team2: "Rajasthan Royals",             venue: "Rajiv Gandhi Intl Stadium",  city: "Hyderabad",  status: "upcoming",  winner: null },
  { id: 12, date: "2026-03-08", time: "7:30 PM", team1: "Punjab Kings",                team2: "Gujarat Titans",               venue: "Punjab Cricket Association", city: "Mohali",     status: "upcoming",  winner: null },
  { id: 13, date: "2026-03-09", time: "7:30 PM", team1: "Delhi Capitals",              team2: "Lucknow Super Giants",         venue: "Arun Jaitley Stadium",       city: "Delhi",      status: "upcoming",  winner: null },
  { id: 14, date: "2026-03-10", time: "7:30 PM", team1: "Mumbai Indians",              team2: "Gujarat Titans",               venue: "Wankhede Stadium",           city: "Mumbai",     status: "upcoming",  winner: null },
  { id: 15, date: "2026-03-11", time: "3:30 PM", team1: "Kolkata Knight Riders",       team2: "Rajasthan Royals",             venue: "Eden Gardens",               city: "Kolkata",    status: "upcoming",  winner: null },
  { id: 16, date: "2026-03-11", time: "7:30 PM", team1: "Chennai Super Kings",         team2: "Royal Challengers Bengaluru",  venue: "MA Chidambaram Stadium",    city: "Chennai",    status: "upcoming",  winner: null },
  { id: 17, date: "2026-03-12", time: "7:30 PM", team1: "Sunrisers Hyderabad",         team2: "Lucknow Super Giants",         venue: "Rajiv Gandhi Intl Stadium",  city: "Hyderabad",  status: "upcoming",  winner: null },
  { id: 18, date: "2026-03-13", time: "7:30 PM", team1: "Punjab Kings",                team2: "Delhi Capitals",               venue: "Punjab Cricket Association", city: "Mohali",     status: "upcoming",  winner: null },
  { id: 19, date: "2026-03-14", time: "7:30 PM", team1: "Gujarat Titans",              team2: "Chennai Super Kings",          venue: "Narendra Modi Stadium",      city: "Ahmedabad",  status: "upcoming",  winner: null },
  { id: 20, date: "2026-03-15", time: "7:30 PM", team1: "Mumbai Indians",              team2: "Kolkata Knight Riders",        venue: "Wankhede Stadium",           city: "Mumbai",     status: "upcoming",  winner: null },
];

const groupByDate = (matches) => {
  const groups = {};
  matches.forEach(m => {
    if (!groups[m.date]) groups[m.date] = [];
    groups[m.date].push(m);
  });
  return groups;
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
};

const isToday = (dateStr) => new Date().toISOString().split("T")[0] === dateStr;

const SHORT = {
  "Chennai Super Kings":          "CSK",
  "Mumbai Indians":               "MI",
  "Royal Challengers Bengaluru":  "RCB",
  "Kolkata Knight Riders":        "KKR",
  "Delhi Capitals":               "DC",
  "Rajasthan Royals":             "RR",
  "Sunrisers Hyderabad":          "SRH",
  "Punjab Kings":                 "PBKS",
  "Lucknow Super Giants":         "LSG",
  "Gujarat Titans":               "GT",
};

// ────────────────────────────────────────────────────────────────────────────

export default function StatsPage() {
  const [searchParams] = useSearchParams();
  const validTabs = ["points", "schedule", "orange", "purple"];
  const tabFromUrl = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(
    validTabs.includes(tabFromUrl) ? tabFromUrl : "points"
  );
  const [scheduleFilter, setScheduleFilter] = useState("all");

  const tabs = [
    { id: "points",   label: "Points Table", icon: Table2      },
    { id: "schedule", label: "Schedule",     icon: CalendarDays },
    { id: "orange",   label: "Orange Cap",   icon: TrendingUp  },
    { id: "purple",   label: "Purple Cap",   icon: Award       },
  ];

  const filteredSchedule = scheduleFilter === "all"
    ? SCHEDULE
    : SCHEDULE.filter(m => m.status === scheduleFilter);

  const groupedSchedule = groupByDate(filteredSchedule);

  return (
    <div className="min-h-screen py-6 sm:py-8 px-4">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-5 sm:mb-8">
          <p className="section-label mb-1">IPL 2026</p>
          <h1 className="text-2xl sm:text-3xl font-display text-white">Stats Hub</h1>
        </div>

        {/* ── Tabs ── */}
        <div className="flex border-b border-white/10 mb-5 sm:mb-6 overflow-x-auto"
             style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}>
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 px-4 py-3
                          text-xs sm:text-sm font-medium whitespace-nowrap
                          transition-all border-b-2 -mb-px flex-shrink-0 ${
                activeTab === id
                  ? "border-orange-500 text-orange-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}>
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}
        <div>

          {/* ── Points Table ── */}
          {activeTab === "points" && (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                {/* min-w reduced — fits comfortably on 390px+ */}
                <table className="w-full text-sm" style={{ minWidth: "460px" }}>
                  <thead>
                    <tr className="bg-surface-hover text-gray-400 text-xs uppercase tracking-wider">
                      <th className="text-left px-3 py-3 w-7">#</th>
                      <th className="text-left px-3 py-3">Team</th>
                      <th className="text-center px-2 py-3">M</th>
                      <th className="text-center px-2 py-3">W</th>
                      <th className="text-center px-2 py-3">L</th>
                      <th className="text-center px-2 py-3">Pts</th>
                      <th className="text-center px-2 py-3">NRR</th>
                      <th className="text-center px-2 py-3">Form</th>
                      <th className="text-center px-2 py-3">Playoff%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DUMMY_POINTS_TABLE.map((team, idx) => (
                      <tr key={team.team}
                        className={`border-t border-white/5 hover:bg-white/5 transition-colors ${
                          idx < 4 ? "border-l-2 border-l-orange-500" : ""
                        }`}>
                        <td className="px-3 py-3 text-gray-400 font-mono text-xs">{idx + 1}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <TeamBadge team={team.team} size="sm" />
                            {/* Full name on md+, short on smaller */}
                            <span className="text-white font-medium hidden md:block text-sm">{team.fullName}</span>
                            <span className="text-white font-medium md:hidden text-xs">{team.team}</span>
                          </div>
                        </td>
                        <td className="px-2 py-3 text-center text-gray-300 text-xs">{team.played}</td>
                        <td className="px-2 py-3 text-center text-green-400 font-medium text-xs">{team.won}</td>
                        <td className="px-2 py-3 text-center text-red-400 text-xs">{team.lost}</td>
                        <td className="px-2 py-3 text-center">
                          <span className="font-bold text-sm" style={{ color: "#ffffff" }}>{team.points}</span>
                        </td>
                        <td className={`px-2 py-3 text-center font-mono text-xs ${
                          team.nrr > 0 ? "text-green-400" : "text-red-400"
                        }`}>
                          {team.nrr > 0 ? "+" : ""}{team.nrr.toFixed(3)}
                        </td>
                        <td className="px-2 py-3">
                          <div className="flex gap-0.5 justify-center">
                            {team.form.map((r, i) => (
                              <span key={i} className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold ${
                                r === "W" ? "bg-green-500/20 text-green-400"
                                : r === "L" ? "bg-red-500/20 text-red-400"
                                : "bg-gray-500/20 text-gray-400"
                              }`}>{r}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-2 py-3">
                          <div className="flex flex-col items-center gap-1">
                            <span className={`text-xs font-bold ${
                              team.playoffPct >= 70 ? "text-green-400"
                              : team.playoffPct >= 40 ? "text-orange-400"
                              : "text-red-400"
                            }`}>{team.playoffPct}%</span>
                            <div className="w-10 h-1.5 rounded-full bg-white/10 overflow-hidden">
                              <div className={`h-full rounded-full ${
                                team.playoffPct >= 70 ? "bg-green-400"
                                : team.playoffPct >= 40 ? "bg-orange-400"
                                : "bg-red-400"
                              }`} style={{ width: `${team.playoffPct}%` }} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 border-t border-white/10 flex items-center gap-2">
                <div className="w-2 h-4 bg-orange-500 rounded-sm flex-shrink-0" />
                <span className="text-gray-400 text-xs">Top 4 qualify for playoffs</span>
              </div>
            </div>
          )}

          {/* ── Schedule ── */}
          {activeTab === "schedule" && (
            <div className="space-y-5">
              {/* Filter pills */}
              <div className="flex gap-2">
                {[
                  { id: "all",       label: "All Matches" },
                  { id: "upcoming",  label: "Upcoming"    },
                  { id: "completed", label: "Results"     },
                ].map(f => (
                  <button key={f.id} onClick={() => setScheduleFilter(f.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      scheduleFilter === f.id
                        ? "bg-orange-500 text-white"
                        : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                    }`}>
                    {f.label}
                  </button>
                ))}
              </div>

              {Object.entries(groupedSchedule).map(([date, matches]) => (
                <div key={date}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2 py-1 rounded-lg ${
                      isToday(date) ? "bg-orange-500/20 text-orange-400" : "text-gray-400"
                    }`}>
                      {isToday(date) ? "Today" : formatDate(date)}
                    </span>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>

                  <div className="card overflow-hidden">
                    {matches.map((match, idx) => (
                      <div key={match.id}
                        className={`flex items-center gap-2 px-4 py-3.5 hover:bg-white/5
                                    transition-colors ${idx > 0 ? "border-t border-white/5" : ""}`}>

                        {/* Time */}
                        <div className="w-14 flex-shrink-0 text-center">
                          <p className="text-gray-300 text-xs font-mono">{match.time}</p>
                          {match.status === "completed" && (
                            <p className="text-green-400 text-[10px] mt-0.5">FT</p>
                          )}
                        </div>

                        {/* Team 1 */}
                        <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-end">
                          <span className={`text-xs sm:text-sm font-bold truncate ${
                            match.winner === match.team1 ? "text-white" : "text-gray-400"
                          }`}>
                            <span className="hidden sm:inline">{match.team1}</span>
                            <span className="sm:hidden">{SHORT[match.team1]}</span>
                          </span>
                          <TeamBadge team={match.team1} size="sm" />
                          {match.winner === match.team1 && (
                            <span className="text-green-400 text-[10px] flex-shrink-0">✓</span>
                          )}
                        </div>

                        {/* VS */}
                        <div className="flex-shrink-0 w-7 text-center">
                          <span className="text-gray-500 text-xs font-mono">vs</span>
                        </div>

                        {/* Team 2 */}
                        <div className="flex items-center gap-1.5 flex-1 min-w-0">
                          {match.winner === match.team2 && (
                            <span className="text-green-400 text-[10px] flex-shrink-0">✓</span>
                          )}
                          <TeamBadge team={match.team2} size="sm" />
                          <span className={`text-xs sm:text-sm font-bold truncate ${
                            match.winner === match.team2 ? "text-white" : "text-gray-400"
                          }`}>
                            <span className="hidden sm:inline">{match.team2}</span>
                            <span className="sm:hidden">{SHORT[match.team2]}</span>
                          </span>
                        </div>

                        {/* Venue — md+ only */}
                        <div className="hidden md:block text-right flex-shrink-0 max-w-[160px]">
                          <p className="text-gray-400 text-xs truncate">{match.venue}</p>
                          <p className="text-gray-500 text-[10px]">{match.city}</p>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Orange Cap ── */}
          {activeTab === "orange" && (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm" style={{ minWidth: "340px" }}>
                  <thead>
                    <tr className="bg-surface-hover text-gray-400 text-xs uppercase tracking-wider">
                      <th className="text-left px-3 py-3 w-10">Rank</th>
                      <th className="text-left px-3 py-3">Player</th>
                      <th className="text-center px-2 py-3">M</th>
                      <th className="text-center px-2 py-3">Runs</th>
                      <th className="text-center px-2 py-3 hidden sm:table-cell">Avg</th>
                      <th className="text-center px-2 py-3 hidden sm:table-cell">SR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DUMMY_STATS.orangeCap.map((player, idx) => (
                      <tr key={player.name}
                        className="border-t border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-3 py-3">
                          <span className={`font-bold text-sm ${
                            idx === 0 ? "text-yellow-400"
                            : idx === 1 ? "text-gray-300"
                            : idx === 2 ? "text-amber-600"
                            : "text-gray-500"
                          }`}>#{idx + 1}</span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <TeamBadge team={player.team} size="sm" />
                            <span className="text-white font-medium text-xs sm:text-sm">{player.name}</span>
                          </div>
                        </td>
                        <td className="px-2 py-3 text-center text-gray-300 text-xs sm:text-sm">{player.matches}</td>
                        <td className="px-2 py-3 text-center">
                          <span className="text-orange-400 font-bold text-sm sm:text-base">{player.runs}</span>
                        </td>
                        <td className="px-2 py-3 text-center text-gray-300 text-xs hidden sm:table-cell">{player.avg}</td>
                        <td className="px-2 py-3 text-center text-gray-300 text-xs hidden sm:table-cell">{player.sr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Purple Cap ── */}
          {activeTab === "purple" && (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm" style={{ minWidth: "340px" }}>
                  <thead>
                    <tr className="bg-surface-hover text-gray-400 text-xs uppercase tracking-wider">
                      <th className="text-left px-3 py-3 w-10">Rank</th>
                      <th className="text-left px-3 py-3">Player</th>
                      <th className="text-center px-2 py-3">M</th>
                      <th className="text-center px-2 py-3">Wkts</th>
                      <th className="text-center px-2 py-3 hidden sm:table-cell">Avg</th>
                      <th className="text-center px-2 py-3 hidden sm:table-cell">Econ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DUMMY_STATS.purpleCap.map((player, idx) => (
                      <tr key={player.name}
                        className="border-t border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-3 py-3">
                          <span className={`font-bold text-sm ${
                            idx === 0 ? "text-yellow-400"
                            : idx === 1 ? "text-gray-300"
                            : idx === 2 ? "text-amber-600"
                            : "text-gray-500"
                          }`}>#{idx + 1}</span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <TeamBadge team={player.team} size="sm" />
                            <span className="text-white font-medium text-xs sm:text-sm">{player.name}</span>
                          </div>
                        </td>
                        <td className="px-2 py-3 text-center text-gray-300 text-xs sm:text-sm">{player.matches}</td>
                        <td className="px-2 py-3 text-center">
                          <span className="text-purple-400 font-bold text-sm sm:text-base">{player.wickets}</span>
                        </td>
                        <td className="px-2 py-3 text-center text-gray-300 text-xs hidden sm:table-cell">{player.avg}</td>
                        <td className="px-2 py-3 text-center text-gray-300 text-xs hidden sm:table-cell">{player.economy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
