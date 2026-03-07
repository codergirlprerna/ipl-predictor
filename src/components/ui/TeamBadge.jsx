import { TEAMS } from '../../data/dummy'

import cskLogo   from '../../assets/logo/csk.png'
import miLogo    from '../../assets/logo/mi.png'
import rcbLogo   from '../../assets/logo/rcb.png'
import kkrLogo   from '../../assets/logo/kkr.png'
import dcLogo    from '../../assets/logo/dc.png'
import rrLogo    from '../../assets/logo/rr.png'
import srhLogo   from '../../assets/logo/srh.png'
import pbksLogo  from '../../assets/logo/punjab.png'
import lsgLogo   from '../../assets/logo/lsg.png'
import gtLogo from '../../assets/logo/gt.png';

const NAME_TO_CODE = {
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
}

const TEAM_LOGOS = {
  CSK:  cskLogo,
  MI:   miLogo,
  RCB:  rcbLogo,
  KKR:  kkrLogo,
  DC:   dcLogo,
  RR:   rrLogo,
  SRH:  srhLogo,
  PBKS: pbksLogo,
  LSG:  lsgLogo,
  GT:   gtLogo,
}

export default function TeamBadge({ team, teamCode, size = 'md', showName = false }) {
  const code = teamCode || NAME_TO_CODE[team] || team
  const teamData = TEAMS[code]
  if (!teamData) return null

  const sizes = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-11 h-11 sm:w-12 sm:h-12',
  }

  const logoUrl = TEAM_LOGOS[code]

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={code}
          className={`${sizes[size]} object-contain flex-shrink-0`}
        />
      ) : (
        /* Fallback for GT (no logo file yet) */
        <div className={`${sizes[size]} rounded-lg border flex items-center justify-center 
                        font-display font-bold text-[10px] flex-shrink-0 ${teamData.colorClass}`}>
          {code.slice(0, 2)}
        </div>
      )}
      {showName && (
        <span className="font-body text-sm font-medium text-white">
          {teamData.short}
        </span>
      )}
    </div>
  )
}