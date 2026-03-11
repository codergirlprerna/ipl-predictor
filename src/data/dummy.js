export const TEAMS = {
  CSK:  { name: "Chennai Super Kings",         short: "CSK",  color: "#F9CD1B", colorClass: "team-csk"  },
  MI:   { name: "Mumbai Indians",              short: "MI",   color: "#004BA0", colorClass: "team-mi"   },
  RCB:  { name: "Royal Challengers Bengaluru", short: "RCB",  color: "#EC1C24", colorClass: "team-rcb"  },
  SRH:  { name: "Sunrisers Hyderabad",         short: "SRH",  color: "#F26522", colorClass: "team-srh"  },
  KKR:  { name: "Kolkata Knight Riders",       short: "KKR",  color: "#3A225D", colorClass: "team-kkr"  },
  DC:   { name: "Delhi Capitals",              short: "DC",   color: "#0078BC", colorClass: "team-dc"   },
  GT:   { name: "Gujarat Titans",              short: "GT",   color: "#1C4B9C", colorClass: "team-gt"   },
  LSG:  { name: "Lucknow Super Giants",        short: "LSG",  color: "#A72056", colorClass: "team-lsg"  },
  RR:   { name: "Rajasthan Royals",            short: "RR",   color: "#254AA5", colorClass: "team-rr"   },
  PBKS: { name: "Punjab Kings",                short: "PBKS", color: "#ED1B24", colorClass: "team-pbks" },
};

export const DUMMY_MATCHES = [
  {
    id: 1,
    team1: "CSK", team2: "MI",
    venue: "MA Chidambaram Stadium",
    city: "Chennai",
    matchDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    matchNumber: 1,
    matchType: "league",
    matchStatus: "upcoming",
    // tossResult: "CSK opt to bowl",   // ← uncomment when toss happens (backend sets this field)
    prediction: {
      predictedWinner: "CSK",
      confidencePct: 64,
      keyFactors: [
        "Chepauk historically favours CSK — 71% win rate",
        "CSK batting form: 3 consecutive 160+ scores",
        "MI missing key pacer in playing XI"
      ],
      riskFactors: ["MI's Rohit Sharma in exceptional form this season"],
      briefReasoning: "CSK hold a decisive home advantage at Chepauk. Their spin-heavy bowling attack suits the slow pitch perfectly. MI will need early wickets to disrupt CSK's momentum.",
      isPublished: true,
    }
  },
  {
    id: 2,
    team1: "RCB", team2: "KKR",
    venue: "M. Chinnaswamy Stadium",
    city: "Bengaluru",
    matchDate: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(),
    matchNumber: 2,
    matchType: "league",
    matchStatus: "upcoming",
    prediction: null,
  },
  {
    id: 3,
    team1: "SRH", team2: "GT",
    venue: "Rajiv Gandhi International Stadium",
    city: "Hyderabad",
    matchDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    matchNumber: 3,
    matchType: "league",
    matchStatus: "completed",
    result: { winner: "SRH", margin: "34 runs" },
    prediction: { predictedWinner: "SRH", confidencePct: 71, isCorrect: true }
  },
];

export const DUMMY_STATS = {
  orangeCap: [
    { rank: 1, player: "Virat Kohli",      name: "Virat Kohli",      team: "RCB",  runs: 542, avg: 67.7, sr: 148.2, matches: 8 },
    { rank: 2, player: "Ruturaj Gaikwad",  name: "Ruturaj Gaikwad",  team: "CSK",  runs: 489, avg: 54.3, sr: 135.6, matches: 8 },
    { rank: 3, player: "Shubman Gill",     name: "Shubman Gill",     team: "GT",   runs: 467, avg: 51.9, sr: 141.2, matches: 8 },
    { rank: 4, player: "Travis Head",      name: "Travis Head",      team: "SRH",  runs: 445, avg: 49.4, sr: 162.8, matches: 8 },
    { rank: 5, player: "Rohit Sharma",     name: "Rohit Sharma",     team: "MI",   runs: 421, avg: 42.1, sr: 144.7, matches: 8 },
  ],
  purpleCap: [
    { rank: 1, player: "Jasprit Bumrah",   name: "Jasprit Bumrah",   team: "MI",  wickets: 18, avg: 14.2, economy: 6.8,  matches: 8 },
    { rank: 2, player: "Rashid Khan",      name: "Rashid Khan",      team: "GT",  wickets: 16, avg: 16.8, economy: 7.1,  matches: 8 },
    { rank: 3, player: "Pat Cummins",      name: "Pat Cummins",      team: "SRH", wickets: 15, avg: 17.3, economy: 7.4,  matches: 8 },
    { rank: 4, player: "Yuzvendra Chahal", name: "Yuzvendra Chahal", team: "RR",  wickets: 14, avg: 18.9, economy: 7.8,  matches: 8 },
    { rank: 5, player: "Mohammed Shami",   name: "Mohammed Shami",   team: "GT",  wickets: 13, avg: 19.4, economy: 8.1,  matches: 8 },
  ],
};

export const DUMMY_LEADERBOARD = [
  { rank: 1, name: "Rahul M",  team: "CSK",  correct: 18, total: 22, accuracy: 81.8 },
  { rank: 2, name: "Priya S",  team: "MI",   correct: 17, total: 22, accuracy: 77.3 },
  { rank: 3, name: "Arjun K",  team: "RCB",  correct: 16, total: 22, accuracy: 72.7 },
  { rank: 4, name: "Deepak R", team: "KKR",  correct: 15, total: 22, accuracy: 68.2 },
  { rank: 5, name: "Sneha T",  team: "SRH",  correct: 14, total: 22, accuracy: 63.6 },
];

export const PLATFORM_ACCURACY = {
  correct: 47,
  total: 63,
  pct: 74.6,
};

export const DUMMY_POINTS_TABLE = [
  { team: "RCB",  fullName: "Royal Challengers Bengaluru", played: 8, won: 6, lost: 2, nr: 0, points: 12, nrr:  0.842, form: ["W","W","L","W","W"], playoffPct: 94 },
  { team: "CSK",  fullName: "Chennai Super Kings",         played: 8, won: 5, lost: 2, nr: 1, points: 11, nrr:  0.621, form: ["W","W","W","L","W"], playoffPct: 88 },
  { team: "MI",   fullName: "Mumbai Indians",              played: 8, won: 5, lost: 3, nr: 0, points: 10, nrr:  0.234, form: ["W","L","W","W","L"], playoffPct: 72 },
  { team: "KKR",  fullName: "Kolkata Knight Riders",       played: 8, won: 5, lost: 3, nr: 0, points: 10, nrr:  0.115, form: ["L","W","W","W","L"], playoffPct: 68 },
  { team: "DC",   fullName: "Delhi Capitals",              played: 8, won: 4, lost: 4, nr: 0, points: 8,  nrr: -0.122, form: ["W","L","W","L","W"], playoffPct: 41 },
  { team: "SRH",  fullName: "Sunrisers Hyderabad",         played: 8, won: 4, lost: 4, nr: 0, points: 8,  nrr: -0.201, form: ["L","W","L","W","W"], playoffPct: 38 },
  { team: "PBKS", fullName: "Punjab Kings",                played: 8, won: 3, lost: 5, nr: 0, points: 6,  nrr: -0.318, form: ["L","L","W","L","W"], playoffPct: 18 },
  { team: "RR",   fullName: "Rajasthan Royals",            played: 8, won: 3, lost: 5, nr: 0, points: 6,  nrr: -0.445, form: ["W","L","L","W","L"], playoffPct: 14 },
  { team: "GT",   fullName: "Gujarat Titans",              played: 8, won: 2, lost: 6, nr: 0, points: 4,  nrr: -0.512, form: ["L","L","W","L","L"], playoffPct:  6 },
  { team: "LSG",  fullName: "Lucknow Super Giants",        played: 8, won: 2, lost: 6, nr: 0, points: 4,  nrr: -0.634, form: ["L","W","L","L","L"], playoffPct:  4 },
];


