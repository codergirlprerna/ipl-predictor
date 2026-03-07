import { useState } from "react";
import { Share2, Globe } from "lucide-react";
import { DUMMY_MATCHES } from "../data/dummy";
import TeamBadge from "../components/ui/TeamBadge";

const LANGUAGES = [
  { code: "hi", label: "हिन्दी", flag: "🇮🇳", name: "Hindi"   },
  { code: "ta", label: "தமிழ்",  flag: "🇮🇳", name: "Tamil"   },
  { code: "te", label: "తెలుగు", flag: "🇮🇳", name: "Telugu"  },
  { code: "kn", label: "ಕನ್ನಡ", flag: "🇮🇳", name: "Kannada" },
  { code: "bn", label: "বাংলা",  flag: "🇮🇳", name: "Bengali" },
];

const DUMMY_COMMENTARY = {
  hi: [
    { over: "18.3", text: "Bumrah ne phir se kamaal kar diya! Perfect yorker, stumps bikhar gaye! MI ke fans jhoom uthe — ab match ka rukh badal gaya hai. CSK ko ab 24 runs chahiye 9 balls mein!", time: "7:48 PM" },
    { over: "16.1", text: "Kohli ne laga diya! Straight drive, bilkul boundary par. Ball se pehle hi batting aasman chhu rahi thi, aur ab score 142/3 ho gaya. CSK ke fans ki sansein rukh gayi hain...", time: "7:31 PM" },
    { over: "14.0", text: "Aadha match khatam, aadhi kahani baaki. CSK ka score 118/2 hai — Dhoni abhi crease par hain. Wankhede mein sannata chhaya hua hai. MI ke bowlers ki agni-pariksha ab shuru hoti hai.", time: "7:18 PM" },
  ],
  ta: [
    { over: "18.3", text: "Bumrah மீண்டும் அதிசயம் செய்தார்! Perfect yorker, stumps சிதறின! MI ரசிகர்கள் மகிழ்ச்சியில் ஆடுகிறார்கள் — இப்போது CSKக்கு 9 பந்துகளில் 24 ரன்கள் தேவை!", time: "7:48 PM" },
    { over: "16.1", text: "Kohli அடித்தார்! நேரான drive, boundary வரை சென்றது. Score இப்போது 142/3. CSK ரசிகர்களின் இதயங்கள் வேகமாக துடிக்கின்றன...", time: "7:31 PM" },
  ],
  te: [
    { over: "18.3", text: "Bumrah మళ్ళీ అద్భుతం చేశాడు! Perfect yorker, stumps చెల్లాచెదురయ్యాయి! MI అభిమానులు ఆనందంతో ఉన్నారు — CSKకి ఇప్పుడు 9 బంతుల్లో 24 రన్లు కావాలి!", time: "7:48 PM" },
  ],
  kn: [
    { over: "18.3", text: "Bumrah ಮತ್ತೆ ಅದ್ಭುತ ಮಾಡಿದ! Perfect yorker, stumps ಚದುರಿದವು! MI ಅಭಿಮಾನಿಗಳು ಸಂತೋಷದಿಂದ ಕೂಗುತ್ತಿದ್ದಾರೆ — CSKಗೆ ಈಗ 9 ಚೆಂಡುಗಳಲ್ಲಿ 24 ರನ್ ಬೇಕು!", time: "7:48 PM" },
  ],
  bn: [
    { over: "18.3", text: "Bumrah আবার অলৌকিক কাজ করলেন! Perfect yorker, stumps ছিটকে গেল! MI সমর্থকরা আনন্দে মেতে উঠেছেন — CSK-এর এখন ৯ বলে ২৪ রান দরকার!", time: "7:48 PM" },
  ],
};

export default function CommentaryPage() {
  const [selectedLang, setSelectedLang] = useState("hi");
  const liveMatch = DUMMY_MATCHES.find(m => m.matchStatus === "live") || DUMMY_MATCHES[0];
  const commentary = DUMMY_COMMENTARY[selectedLang] || DUMMY_COMMENTARY.hi;

  return (
    <div className="min-h-screen py-6 sm:py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-5 sm:space-y-6">

        {/* ── Header ── */}
        <div>
          <p className="section-label mb-1 flex items-center gap-2">
            <Globe size={12} /> Regional Commentary
          </p>
          <h1 className="text-2xl sm:text-3xl font-display text-white">Live Commentary</h1>
        </div>

        {/* ── Current Match ── */}
        <div className="card p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-red-400 text-xs font-medium uppercase tracking-wider">Live Match</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <TeamBadge team={liveMatch.team1} size="md" />
              <span className="text-white font-bold text-sm sm:text-lg truncate">{liveMatch.team1}</span>
            </div>
            <span className="text-gray-400 font-display text-sm sm:text-base flex-shrink-0">VS</span>
            <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
              <span className="text-white font-bold text-sm sm:text-lg truncate text-right">{liveMatch.team2}</span>
              <TeamBadge team={liveMatch.team2} size="md" />
            </div>
          </div>
          <p className="text-gray-400 text-xs mt-3 text-center">
            {liveMatch.venue}, {liveMatch.city}
          </p>
        </div>

        {/* ── Language Selector ── */}
        <div>
          <p className="text-gray-300 text-xs uppercase tracking-wider font-mono mb-2 sm:mb-3">
            Choose Language
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
            {LANGUAGES.map(lang => (
              <button key={lang.code} onClick={() => setSelectedLang(lang.code)}
                className={`flex-shrink-0 flex flex-col items-center gap-1
                            px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm
                            font-medium transition-all ${
                  selectedLang === lang.code
                    ? "border-orange-500 bg-orange-500/10 text-orange-400"
                    : "border-white/10 text-gray-300 hover:border-white/30 hover:text-white"
                }`}>
                <span className="text-base sm:text-xl">{lang.flag}</span>
                <span className="text-xs sm:text-sm">{lang.label}</span>
                <span className="text-gray-400 text-xs hidden sm:block">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Commentary Feed ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="section-label">Live Commentary</p>
            <span className="text-xs" style={{color:"#94a3b8"}}>Updated every 2-3 overs</span>
          </div>

          {commentary.length > 0 ? (
            commentary.map((entry, idx) => (
              <div key={idx} className="card p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-orange-500/20 text-orange-400 text-xs font-mono
                                     px-2 py-0.5 rounded-full flex-shrink-0">
                      Over {entry.over}
                    </span>
                    {idx === 0 && (
                      <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5
                                       rounded-full animate-pulse flex-shrink-0">
                        Latest
                      </span>
                    )}
                  </div>
                  <span className="text-xs flex-shrink-0" style={{color:"#94a3b8"}}>{entry.time}</span>
                </div>

                {/* Commentary text — full white, never gray */}
                <p className="text-sm sm:text-base leading-relaxed" style={{color:"#e2e8f0"}}>
                  {entry.text}
                </p>

                <button className="flex items-center gap-2 text-gray-400
                                   hover:text-green-400 transition-colors text-xs">
                  <Share2 size={12} />
                  Share on WhatsApp
                </button>
              </div>
            ))
          ) : (
            <div className="card p-8 sm:p-10 text-center">
              <div className="text-4xl mb-3">🌍</div>
              <p className="text-white font-semibold text-sm">No commentary yet in this language</p>
              <p className="text-gray-300 text-xs mt-1">Commentary will appear when the match starts</p>
            </div>
          )}
        </div>

        {/* ── Info Banner ── */}
        <div className="card p-4 border border-blue-500/20 text-center">
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            💡 Commentary is AI-generated in your language, updated every 2-3 overs.
            <br className="hidden sm:block" />
            {" "}No existing cricket app does this — share it with your friends!
          </p>
        </div>

      </div>
    </div>
  );
}
