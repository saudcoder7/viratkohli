// ─── Profile ───
export const PROFILE = {
  name: "Virat Kohli",
  born: "November 5, 1988, Delhi, India",
  status: "Active in ODIs; retired from Test and T20I cricket",
  iplTeam: "Royal Challengers Bengaluru (only team, since 2008)",
};

// ─── Format Keys ───
export type FormatKey = "test" | "odi" | "t20i" | "ipl";
export const FORMAT_KEYS: FormatKey[] = ["test", "odi", "t20i", "ipl"];

// ─── Stats (Official Verified Career Records) ───
export const STATS = {
  test: { matches: 123, runs: 9230, centuries: 30, doubleCenturies: 7, fifties: 31, bestScore: "254*", average: 46.85, status: "Retired" },
  odi: { matches: 314, runs: 14941, average: 58.59, strikeRate: 93.80, centuries: 54, fifties: 79, bestScore: "183", status: "Active" },
  t20i: { matches: 125, runs: 4188, average: 48.69, strikeRate: 137.04, centuries: 1, fifties: 38, bestScore: "122*", status: "Retired" },
  ipl: { matches: 267, runs: 8661, average: 39.55, strikeRate: 131.97, centuries: 8, fifties: 63, bestScore: "113", status: "Active" },
};

// ─── Hero Stat Callouts ───
export const HERO_STATS = [
  { value: 85, label: "CENTURIES" }, // 30 Test + 54 ODI + 1 T20I = 85 International Centuries
  { value: 28000, suffix: "+", label: "INT'L RUNS" }, // 9,230 + 14,941 + 4,188 = 28,359 runs
  { value: 4, label: "ICC TROPHIES" }, // 2011 CWC, 2013 CT, 2024 T20 WC, 2025 CT
  { value: 18, label: "YEARS" }, // 2008–2026
];

// ─── Nav Links ───
export interface NavLinkItem {
  label: string;
  href: string;
  format?: FormatKey;
}

export const NAV_LINKS: NavLinkItem[] = [
  { label: "TEST", href: "/test", format: "test" },
  { label: "ODI", href: "/odi", format: "odi" },
  { label: "T20I", href: "/t20i", format: "t20i" },
  { label: "IPL", href: "/ipl", format: "ipl" },
  { label: "HIGHLIGHTS", href: "#highlights" },
  { label: "AWARDS", href: "#awards" },
  { label: "GALLERY", href: "#gallery" },
  { label: "FAN ZONE", href: "#fan-zone" },
];

// ─── Career Highlights (Featured Cross-Format Moments) ───
export interface Highlight {
  id: string;
  title: string;
  description: string;
  year: string;
  format: "all" | "test" | "odi" | "t20i" | "ipl";
  stat?: string;
  image?: string;
  video?: string;
  isFeatured?: boolean;
  targetSlug?: string;
}

export const HIGHLIGHTS: Highlight[] = [
  // ── TEST: Debut ──
  {
    id: "feat-test-debut",
    title: "Test Debut",
    description: "A 22-year-old walks out in whites for the first time, in Kingston, Jamaica.",
    year: "2011",
    format: "test",
    stat: "Kingston Debut",
    image: "/images/moments/test-debut.png",
    isFeatured: true,
    targetSlug: "test-debut",
  },
  // ── TEST: England Tour Struggle ──
  {
    id: "feat-test-england-struggle",
    title: "2014 England Tour Struggle",
    description: "Ten innings, 134 runs — English seam bowling exposes a real weakness.",
    year: "2014",
    format: "test",
    stat: "134 runs in 10 innings",
    image: "/images/moments/2014-england-tour.png",
    isFeatured: true,
    targetSlug: "2014-england-tour-struggle",
  },
  // ── TEST: No.1 in all three formats ──
  {
    id: "feat-test-1",
    title: "No.1 in All Three Formats",
    description: "The first Indian ever ranked No.1 in Tests, ODIs, and T20Is at once.",
    year: "2018",
    format: "test",
    stat: "Simultaneous World No.1",
    image: "/images/moments/world-no1-all-formats.jpg",
    isFeatured: true,
    targetSlug: "world-no1-all-formats",
  },
  // ── TEST: Border-Gavaskar Trophy Win ──
  {
    id: "feat-test-2",
    title: "Border-Gavaskar Trophy Win",
    description: "71 years of trying — India finally wins a Test series on Australian soil.",
    year: "2019",
    format: "test",
    stat: "Historic 2-1 Series Win",
    image: "/images/moments/border-gavaskar-trophy-win.jpg",
    isFeatured: true,
    targetSlug: "border-gavaskar-trophy-win",
  },
  // ── TEST: 254* vs South Africa ──
  {
    id: "feat-test-3",
    title: "254* vs South Africa, Pune",
    description: "His highest Test score, an innings of total control.",
    year: "2019",
    format: "test",
    stat: "254* (336)",
    image: "/images/moments/254-vs-south-africa.jpg",
    isFeatured: true,
    targetSlug: "254-vs-south-africa",
  },
  // ── TEST: The Lean Patch ──
  {
    id: "feat-test-lean-patch",
    title: "The Lean Patch",
    description: "Three years, no centuries — the toughest stretch of his career, played out in public.",
    year: "2019-22",
    format: "test",
    stat: "3-year drought",
    image: "/images/moments/the-lean-patch.jpg",
    isFeatured: true,
    targetSlug: "the-lean-patch",
  },
  // ── TEST: Test Retirement ──
  {
    id: "feat-test-retirement",
    title: "Test Retirement",
    description: "Fourteen years after his debut, he closes the book on Test cricket.",
    year: "2025",
    format: "test",
    stat: "9,230 runs",
    image: "/images/moments/test-retirement.jpg",
    isFeatured: true,
    targetSlug: "test-retirement",
  },

  // ── ODI: Debut ──
  {
    id: "feat-odi-debut",
    title: "ODI Debut",
    description: "His first ODI innings, in Dambulla — the beginning of what became the most decorated ODI career of his generation.",
    year: "2008",
    format: "odi",
    stat: "Dambulla Debut",
    image: "/images/moments/odi-debut.jpg",
    isFeatured: true,
    targetSlug: "odi-debut",
  },
  // ── ODI: 2011 World Cup Win ──
  {
    id: "feat-1",
    title: "2011 ODI World Cup Win",
    description: "A young Kohli lifts his first World Cup, one of eleven players who ended a 28-year wait for India.",
    year: "2011",
    format: "odi",
    stat: "World Champions",
    image: "/images/moments/2011-world-cup-win.jpg",
    isFeatured: true,
    targetSlug: "2011-world-cup-win",
  },
  // ── ODI: 183 vs Pakistan ──
  {
    id: "feat-2",
    title: "183 vs Pakistan, Asia Cup",
    description: "The innings that announced him as a great — 183 off 148 balls in a run-chase for the ages.",
    year: "2012",
    format: "odi",
    stat: "183 (148)",
    image: "/images/moments/183-vs-pakistan.png",
    isFeatured: true,
    targetSlug: "183-vs-pakistan",
  },
  // ── ODI: 2017 Champions Trophy Final ──
  {
    id: "feat-odi-ct2017",
    title: "2017 Champions Trophy Final",
    description: "As captain, he leads India to the final — and loses it to Pakistan.",
    year: "2017",
    format: "odi",
    stat: "Runner-Up",
    image: "/images/moments/2017-champions-trophy-final.jpg",
    isFeatured: true,
    targetSlug: "2017-champions-trophy-runner-up",
  },
  // ── ODI: 50th ODI Century ──
  {
    id: "feat-3",
    title: "50th ODI Century",
    description: "On home soil, in a semi-final, he passes Sachin Tendulkar's record of 49 ODI hundreds.",
    year: "2023",
    format: "odi",
    stat: "50th century",
    image: "/images/moments/50th-odi-century.jpg",
    isFeatured: true,
    targetSlug: "50th-odi-century",
  },
  // ── ODI: 2025 Champions Trophy Win ──
  {
    id: "feat-5",
    title: "2025 Champions Trophy Win",
    description: "Another global title, another final chapter written on the biggest stage.",
    year: "2025",
    format: "odi",
    stat: "Champions Trophy",
    image: "/images/moments/2025-champions-trophy-win.jpg",
    isFeatured: true,
    targetSlug: "2025-champions-trophy-win",
  },
  // ── ODI: Still Active ──
  {
    id: "feat-odi-still-active",
    title: "Still Active in ODIs",
    description: "The only number on this page that keeps changing — because he's still out there adding to it.",
    year: "2024–",
    format: "odi",
    stat: "Active",
    image: "/images/moments/still-active-odi.jpg",
    isFeatured: true,
    targetSlug: "still-active-odi",
  },

  // ── T20I: Debut ──
  {
    id: "feat-t20-debut",
    title: "T20I Debut",
    description: "His first T20I, against Zimbabwe in Harare.",
    year: "2010",
    format: "t20i",
    stat: "Harare Debut",
    image: "/images/moments/t20i-debut.png",
    isFeatured: true,
    targetSlug: "t20i-debut",
  },
  // ── T20I: The Drought ──
  {
    id: "feat-t20-drought",
    title: "The T20I Drought",
    description: "No T20I century in years — and increasingly public questions about his place in the side.",
    year: "2019-22",
    format: "t20i",
    stat: "Public Doubts",
    image: "/images/moments/t20i-drought.jpg",
    isFeatured: true,
    targetSlug: "t20i-drought",
  },
  // ── T20I: 122* vs Afghanistan ──
  {
    id: "feat-t20-2",
    title: "122* vs Afghanistan",
    description: "His highest T20I score, arriving deep into a knockout tournament to end the drought.",
    year: "2022",
    format: "t20i",
    stat: "122* (61)",
    image: "/images/moments/122-vs-afghanistan.jpg",
    isFeatured: true,
    targetSlug: "122-vs-afghanistan",
  },
  // ── T20I: The six off Haris Rauf ──
  {
    id: "feat-t20-1",
    title: "The Six Off Haris Rauf, MCG",
    description: "82* off 53 balls, anchored by two impossible straight-down-the-ground sixes to pull victory from the brink.",
    year: "2022",
    format: "t20i",
    stat: "82* (53)",
    video: "/video/hero.mp4",
    image: "/images/moments/six-off-haris-rauf.png",
    isFeatured: true,
    targetSlug: "six-off-haris-rauf",
  },
  // ── T20I: 2024 T20 World Cup Win ──
  {
    id: "feat-4",
    title: "2024 T20 World Cup Win",
    description: "76 off 59 in the final, then a World Cup in hand — the perfect note to retire from T20Is on.",
    year: "2024",
    format: "t20i",
    stat: "76 in the final",
    image: "/images/moments/2024-t20-world-cup-win.jpg",
    isFeatured: true,
    targetSlug: "2024-t20-world-cup-win",
  },
  // ── T20I: Retirement ──
  {
    id: "feat-t20-retirement",
    title: "T20I Retirement",
    description: "A World Cup winner's medal in hand, he closes the book on T20Is immediately after.",
    year: "2024",
    format: "t20i",
    stat: "4,188 runs",
    image: "/images/moments/t20i-retirement.jpg",
    isFeatured: true,
    targetSlug: "t20i-retirement",
  },

  // ── IPL: Signed by RCB 2008 ──
  {
    id: "feat-ipl-signed-rcb",
    title: "Signed by RCB, 2008",
    description: "Straight from captaining India's U-19 World Cup win, he joins Royal Challengers Bangalore — an unbroken 18-year journey.",
    year: "2008",
    format: "ipl",
    stat: "18-Year Loyalty",
    image: "/images/moments/signed-by-rcb-2008.jpg",
    isFeatured: true,
    targetSlug: "signed-by-rcb-2008",
  },
  // ── IPL: 973 runs in 2016 ──
  {
    id: "feat-ipl-1",
    title: "973 Runs in a Single Season",
    description: "A single-season record that, a decade on, still hasn't been touched.",
    year: "2016",
    format: "ipl",
    stat: "973 runs · 4 hundreds",
    image: "/images/moments/973-runs-single-season.jpg",
    isFeatured: true,
    targetSlug: "973-runs-single-season",
  },
  // ── IPL: 2016 Final Loss ──
  {
    id: "feat-ipl-2016-final",
    title: "2016 IPL Final Heartbreak",
    description: "His best-ever final performance — 54 off 35 — still isn't enough. RCB lose by 8 runs.",
    year: "2016",
    format: "ipl",
    stat: "54 in final",
    image: "/images/moments/2016-ipl-final-heartbreak.jpg",
    isFeatured: true,
    targetSlug: "2016-final-loss",
  },
  // ── IPL: All-Time Leading Scorer ──
  {
    id: "feat-ipl-all-time",
    title: "IPL All-Time Leading Scorer",
    description: "Somewhere in these years, he quietly becomes the highest run-scorer in IPL history.",
    year: "2008–",
    format: "ipl",
    stat: "8,661 runs",
    image: "/images/moments/all-time-leading-scorer.jpg",
    isFeatured: true,
    targetSlug: "all-time-leading-scorer",
  },
  // ── IPL: First IPL Title ──
  {
    id: "feat-6",
    title: "First IPL Title",
    description: "Eighteen years with one franchise, three lost finals, and finally, a trophy — visibly emotional at the finish.",
    year: "2025",
    format: "ipl",
    stat: "Champions 2025",
    image: "/images/moments/first-ipl-title-2025.jpg",
    isFeatured: true,
    targetSlug: "first-ipl-title",
  },
  // ── IPL: 2026 Back-to-Back IPL Title ──
  {
    id: "feat-ipl-2",
    title: "2026 Back-to-Back IPL Title",
    description: "RCB become only the third team ever to defend an IPL title — Kohli's unbeaten 73 caps a strong season.",
    year: "2026",
    format: "ipl",
    stat: "73* in the final",
    image: "/images/moments/back-to-back-ipl-title-2026.jpg",
    isFeatured: true,
    targetSlug: "back-to-back-ipl-title-2026",
  },
];

// ─── Format Moment Interface ───
export interface FormatMoment {
  id: string;
  title: string;
  description: string;
  year: string;
  stat?: string;
  image?: string;
  isRestrained?: boolean; // Muted visual treatment for father's passing
  isBriefReference?: boolean;
  slug?: string;
}

// ─── TEST Moments (16 Moments) ───
export const TEST_MOMENTS: FormatMoment[] = [
  {
    id: "test-1",
    title: "Test Debut",
    description: "A 22-year-old walks out in whites for the first time, in Kingston, Jamaica.",
    year: "2011",
    image: "/images/moments/test-debut.png",
    slug: "test-debut",
  },
  {
    id: "test-2",
    title: "The Ranji Trophy Comeback",
    description: "The day after his father's death, he returns to the crease and scores 90 — a defining early glimpse of his temperament.",
    year: "2006",
    isRestrained: true,
    image: "/images/moments/ranji-trophy-comeback.jpg",
    slug: "ranji-trophy-comeback",
  },
  {
    id: "test-3",
    title: "2014 England Tour Struggle",
    description: "Ten innings, 134 runs — English seam bowling exposes a real weakness.",
    year: "2014",
    stat: "134 runs in 10 innings",
    image: "/images/moments/2014-england-tour.png",
    slug: "2014-england-tour-struggle",
  },
  {
    id: "test-4",
    title: "Twin Centuries on Captaincy Debut",
    description: "115 and 141 in his first Test as captain — an immediate answer to the England tour.",
    year: "2014",
    stat: "115 & 141",
    image: "/images/moments/twin-centuries-captaincy-debut.png",
    slug: "twin-centuries-captaincy-debut",
  },
  {
    id: "test-5",
    title: "Nine Consecutive Test Series Wins",
    description: "A run of dominance that equals Ricky Ponting's world record.",
    year: "2015-17",
    stat: "9 series wins",
    image: "/images/moments/nine-consecutive-series-wins.png",
    slug: "nine-consecutive-series-wins",
  },
  {
    id: "test-6",
    title: "Double Centuries in Four Consecutive Series",
    description: "Four consecutive series, four double hundreds — a record that still stands.",
    year: "2016-17",
    stat: "4 consecutive",
    image: "/images/moments/double-centuries-four-series.png",
    slug: "double-centuries-four-series",
  },
  {
    id: "test-7",
    title: "World No.1 Across All Formats",
    description: "The first Indian ever ranked No.1 in Tests, ODIs, and T20Is at once.",
    year: "2018",
    stat: "No.1 in all formats",
    image: "/images/moments/world-no1-all-formats.jpg",
    slug: "world-no1-all-formats",
  },
  {
    id: "test-8",
    title: "Conquering Australia",
    description: "71 years of trying — India finally wins a Test series on Australian soil.",
    year: "2018-19",
    stat: "First ever",
    image: "/images/moments/border-gavaskar-trophy-win.jpg",
    slug: "border-gavaskar-trophy-win",
  },
  {
    id: "test-9",
    title: "254* vs South Africa, Pune",
    description: "His highest Test score, an innings of total control.",
    year: "2019",
    stat: "254*",
    image: "/images/moments/254-vs-south-africa.jpg",
    slug: "254-vs-south-africa",
  },
  {
    id: "test-10",
    title: "The South African Final Frontier",
    description: "The one series win that stayed just out of reach, tour after tour.",
    year: "2013-22",
    image: "/images/moments/south-africa-final-frontier.png",
    slug: "south-africa-final-frontier",
  },
  {
    id: "test-11",
    title: "2021 WTC Final — Runner-Up",
    description: "So close to the one ICC Test trophy — New Zealand edges it in England.",
    year: "2021",
    stat: "Runner-Up",
    image: "/images/moments/2021-wtc-final-runner-up.jpg",
    slug: "2021-wtc-final-runner-up",
  },
  {
    id: "test-12",
    title: "The Lean Patch",
    description: "Three years, no centuries — the toughest stretch of his career, played out in public.",
    year: "2019-22",
    image: "/images/moments/the-lean-patch.jpg",
    slug: "the-lean-patch",
  },
  {
    id: "test-13",
    title: "Vamika's Birth & Stand-In Triumph",
    description: "He steps away for his daughter's birth; Ajinkya Rahane leads a famous series win without him.",
    year: "2021",
    image: "/images/moments/vamikas-birth-stand-in-triumph.png",
    slug: "vamikas-birth-stand-in-triumph",
  },
  {
    id: "test-14",
    title: "2021-22 South Africa Tour",
    description: "A 1-2 series loss closes out a difficult tour.",
    year: "2022",
    stat: "1-2 series loss",
    image: "/images/moments/2021-22-south-africa-tour.png",
    slug: "2021-22-south-africa-tour",
  },
  {
    id: "test-15",
    title: "Resigning Test Captaincy",
    description: "India's most successful Test captain by wins steps down, still without the one ICC trophy he wanted most.",
    year: "2022",
    stat: "40 wins / 68 Tests",
    image: "/images/moments/resigning-test-captaincy.png",
    slug: "resigning-test-captaincy",
  },
  {
    id: "test-16",
    title: "Test Retirement",
    description: "Fourteen years after his debut, he closes the book on Test cricket.",
    year: "2025",
    stat: "9,230 runs",
    image: "/images/moments/test-retirement.jpg",
    slug: "test-retirement",
  },
];

// ─── ODI Moments (16 Moments) ───
export const ODI_MOMENTS: FormatMoment[] = [
  {
    id: "odi-1",
    title: "ODI Debut",
    description: "His first ODI innings, in Dambulla — the beginning of what became the most decorated ODI career of his generation.",
    year: "2008",
    image: "/images/moments/odi-debut.jpg",
    slug: "odi-debut",
  },
  {
    id: "odi-2",
    title: "2011 World Cup Win",
    description: "Part of the squad that won the World Cup on home soil, ending a 28-year wait for India.",
    year: "2011",
    image: "/images/moments/2011-world-cup-win.jpg",
    stat: "World Champion",
    isBriefReference: true,
    slug: "2011-world-cup-win",
  },
  {
    id: "odi-3",
    title: "133* off 86, Hobart",
    description: "Chasing 321 to win, he ends his first real slump in the same innings.",
    year: "2012",
    stat: "133* off 86",
    image: "/images/moments/133-off-86-hobart.png",
    slug: "133-off-86-hobart",
  },
  {
    id: "odi-4",
    title: "183 vs Pakistan, Asia Cup",
    description: "183 off 148 balls in a high-pressure chase — an innings that announced his greatness.",
    year: "2012",
    image: "/images/moments/183-vs-pakistan.png",
    stat: "183",
    isBriefReference: true,
    slug: "183-vs-pakistan",
  },
  {
    id: "odi-5",
    title: "2013 Champions Trophy Win",
    description: "A second global title, this time as a senior player, not a rookie.",
    year: "2013",
    stat: "Champions Trophy",
    image: "/images/moments/2013-champions-trophy-win.jpg",
    slug: "2013-champions-trophy-win",
  },
  {
    id: "odi-6",
    title: "Becoming ODI Captain",
    description: "He takes full-time ODI captaincy and turns chasing into an art form.",
    year: "2017",
    image: "/images/moments/becoming-odi-captain.png",
    slug: "becoming-odi-captain",
  },
  {
    id: "odi-7",
    title: "2015 World Cup — Semi-Final Exit",
    description: "A semi-final loss to Australia ends the title defense.",
    year: "2015",
    stat: "Semi-Final",
    image: "/images/moments/2015-world-cup-semi-final.png",
    slug: "2015-world-cup-semi-final",
  },
  {
    id: "odi-8",
    title: "2017 Champions Trophy — Runner-Up",
    description: "As captain, he leads India to the final — and loses it to Pakistan.",
    year: "2017",
    stat: "Runner-Up",
    image: "/images/moments/2017-champions-trophy-final.jpg",
    slug: "2017-champions-trophy-runner-up",
  },
  {
    id: "odi-9",
    title: "Fastest to 8,000 Through 14,000 Runs",
    description: "8,000 to 14,000 runs, faster than anyone in history has ever reached each one.",
    year: "2008-24",
    stat: "14,000+ runs",
    image: "/images/moments/fastest-to-14000-runs.png",
    slug: "fastest-to-14000-runs",
  },
  {
    id: "odi-10",
    title: "ODI Captaincy Taken Away",
    description: "A contentious decision strips him of the ODI captaincy he'd held for five years.",
    year: "2021",
    image: "/images/moments/odi-captaincy-taken-away.png",
    slug: "odi-captaincy-taken-away",
  },
  {
    id: "odi-11",
    title: "2019 World Cup — Semi-Final Exit",
    description: "Another semi-final, another exit — this time to New Zealand.",
    year: "2019",
    stat: "Semi-Final",
    image: "/images/moments/2019-world-cup-semi-final.png",
    slug: "2019-world-cup-semi-final",
  },
  {
    id: "odi-12",
    title: "765 Runs — 2023 World Cup",
    description: "The best individual tournament of his career, and the ICC names him Player of the Tournament.",
    year: "2023",
    stat: "765 runs · Avg 95.62",
    image: "/images/moments/765-runs-2023-world-cup.jpg",
    slug: "765-runs-2023-world-cup",
  },
  {
    id: "odi-13",
    title: "50th ODI Century",
    description: "In a World Cup semi-final at Wankhede, he breaks Sachin Tendulkar's all-time record of 49 hundreds.",
    year: "2023",
    image: "/images/moments/50th-odi-century.jpg",
    stat: "50th century",
    isBriefReference: true,
    slug: "50th-odi-century",
  },
  {
    id: "odi-14",
    title: "2023 World Cup Final Loss",
    description: "A record-breaking tournament ends in heartbreak, beaten by Australia in the final at home.",
    year: "2023",
    stat: "Runner-Up",
    image: "/images/moments/2023-world-cup-final-loss.jpg",
    slug: "2023-world-cup-final-loss",
  },
  {
    id: "odi-15",
    title: "2025 Champions Trophy Win",
    description: "Another Champions Trophy title, another final chapter written on the global stage.",
    year: "2025",
    stat: "Champions Trophy",
    image: "/images/moments/2025-champions-trophy-win.jpg",
    isBriefReference: true,
    slug: "2025-champions-trophy-win",
  },
  {
    id: "odi-16",
    title: "Still Active",
    description: "The only number on this page that keeps changing — because he's still out there adding to it.",
    year: "2024–",
    stat: "Active",
    image: "/images/moments/still-active-odi.jpg",
    slug: "still-active-odi",
  },
];

// ─── T20I Moments (11 Moments) ───
export const T20I_MOMENTS: FormatMoment[] = [
  {
    id: "t20i-1",
    title: "T20I Debut",
    description: "His first T20I, against Zimbabwe in Harare.",
    year: "2010",
    image: "/images/moments/t20i-debut.png",
    slug: "t20i-debut",
  },
  {
    id: "t20i-2",
    title: "2014 World Cup Final Loss",
    description: "Player of the Tournament, but the trophy goes to Sri Lanka.",
    year: "2014",
    stat: "Player of the Tournament",
    image: "/images/moments/2014-world-cup-final-loss.png",
    slug: "2014-world-cup-final-loss",
  },
  {
    id: "t20i-3",
    title: "2016 World Cup Semi-Final",
    description: "Another Player of the Tournament award, another exit at the semi-final stage, this time at home.",
    year: "2016",
    stat: "Player of the Tournament",
    image: "/images/moments/2016-world-cup-semi-final.png",
    slug: "2016-world-cup-semi-final",
  },
  {
    id: "t20i-4",
    title: "Stepping Down as Captain",
    description: "He steps back from T20I captaincy after the World Cup.",
    year: "2021",
    image: "/images/moments/stepping-down-t20i-captain.jpg",
    slug: "stepping-down-t20i-captain",
  },
  {
    id: "t20i-5",
    title: "2021 World Cup Exit",
    description: "A group-stage exit closes his time as captain on a low note.",
    year: "2021",
    image: "/images/moments/2021-world-cup-exit.png",
    slug: "2021-world-cup-exit",
  },
  {
    id: "t20i-6",
    title: "The Drought",
    description: "No T20I century in years — and increasingly public questions about his place in the side.",
    year: "2019-22",
    image: "/images/moments/t20i-drought.jpg",
    slug: "t20i-drought",
  },
  {
    id: "t20i-7",
    title: "122* off 61 vs Afghanistan",
    description: "The century that ends the drought, arriving right after the loudest of the doubts.",
    year: "2022",
    stat: "122* off 61",
    image: "/images/moments/122-vs-afghanistan.jpg",
    slug: "122-vs-afghanistan",
  },
  {
    id: "t20i-8",
    title: "The Six off Haris Rauf",
    description: "82* off 53 balls at the MCG — and the back-foot six that will outlive every statistic.",
    year: "2022",
    stat: "82* off 53",
    image: "/images/moments/six-off-haris-rauf.png",
    isBriefReference: true,
    slug: "six-off-haris-rauf",
  },
  {
    id: "t20i-9",
    title: "2022 World Cup Semi-Final",
    description: "Months after his iconic six against Pakistan, England ends India's run in the semi-final.",
    year: "2022",
    stat: "Semi-Final",
    image: "/images/moments/2022-world-cup-semi-final.png",
    slug: "2022-world-cup-semi-final",
  },
  {
    id: "t20i-10",
    title: "2024 T20 World Cup Win",
    description: "76 off 59 in the final, then a World Cup in hand — the perfect note to retire from T20Is on.",
    year: "2024",
    image: "/images/moments/2024-t20-world-cup-win.jpg",
    stat: "76 in the final",
    isBriefReference: true,
    slug: "2024-t20-world-cup-win",
  },
  {
    id: "t20i-11",
    title: "T20I Retirement",
    description: "A World Cup winner's medal in hand, he closes the book on T20Is immediately after.",
    year: "2024",
    stat: "4,188 runs",
    image: "/images/moments/t20i-retirement.jpg",
    slug: "t20i-retirement",
  },
];

// ─── IPL Moments (12 Moments) ───
export const IPL_MOMENTS: FormatMoment[] = [
  {
    id: "ipl-1",
    title: "Signed by RCB, 2008",
    description: "Straight from captaining India's U-19 World Cup win, he joins Royal Challengers Bangalore — a partnership that lasts 18 years.",
    year: "2008",
    image: "/images/moments/signed-by-rcb-2008.jpg",
    slug: "signed-by-rcb-2008",
  },
  {
    id: "ipl-2",
    title: "2009 Final Loss",
    description: "His first IPL final, at 20 years old, lost by 6 runs.",
    year: "2009",
    stat: "Runner-Up",
    image: "/images/moments/2009-final-loss.jpg",
    slug: "2009-final-loss",
  },
  {
    id: "ipl-3",
    title: "2011 Final Loss",
    description: "A second final, a second defeat, this time to Chennai Super Kings.",
    year: "2011",
    stat: "Runner-Up",
    image: "/images/moments/2011-final-loss.jpg",
    slug: "2011-final-loss",
  },
  {
    id: "ipl-4",
    title: "Becomes Captain, 2013",
    description: "He takes the armband for the first time in the IPL.",
    year: "2013",
    image: "/images/moments/becomes-captain-2013.jpg",
    slug: "becomes-captain-2013",
  },
  {
    id: "ipl-5",
    title: "The AB de Villiers Era",
    description: "The most prolific batting partnership in IPL history is born.",
    year: "2011-21",
    stat: "3,123 combined runs",
    image: "/images/moments/ab-de-villiers-era.jpg",
    slug: "ab-de-villiers-era",
  },
  {
    id: "ipl-6",
    title: "973 Runs — 2016",
    description: "A single-season record that, a decade on, still hasn't been touched.",
    year: "2016",
    stat: "973 runs",
    image: "/images/moments/973-runs-single-season.jpg",
    slug: "973-runs-single-season",
  },
  {
    id: "ipl-7",
    title: "2016 Final Loss",
    description: "His best-ever final performance — 54 off 35 — still isn't enough. RCB lose by 8 runs.",
    year: "2016",
    stat: "54 in final",
    image: "/images/moments/2016-ipl-final-heartbreak.jpg",
    slug: "2016-final-loss",
  },
  {
    id: "ipl-8",
    title: "Steps Down as Captain, 2021",
    description: "Days after leaving the India T20I captaincy, he steps back from RCB too.",
    year: "2021",
    image: "/images/moments/steps-down-captain-2021.jpg",
    slug: "steps-down-captain-2021",
  },
  {
    id: "ipl-9",
    title: "A Hard 2022",
    description: "Form struggles compound a difficult year of transition.",
    year: "2022",
    image: "/images/moments/hard-2022.jpg",
    slug: "hard-2022",
  },
  {
    id: "ipl-10",
    title: "All-Time Leading Scorer",
    description: "Somewhere in these years, he quietly becomes the highest run-scorer in IPL history.",
    year: "2008–",
    stat: "8,661 runs",
    image: "/images/moments/all-time-leading-scorer.jpg",
    slug: "all-time-leading-scorer",
  },
  {
    id: "ipl-11",
    title: "First Title, 2025",
    description: "Eighteen years and three lost finals later, RCB finally lift the trophy.",
    year: "2025",
    stat: "Champions",
    image: "/images/moments/first-ipl-title-2025.jpg",
    isBriefReference: true,
    slug: "first-ipl-title",
  },
  {
    id: "ipl-12",
    title: "Back-to-Back Title, 2026",
    description: "RCB become only the third team ever to defend an IPL title — and Kohli's unbeaten 73 caps a strong season.",
    year: "2026",
    stat: "73* in the final",
    image: "/images/moments/back-to-back-ipl-title-2026.jpg",
    slug: "back-to-back-ipl-title-2026",
  },
];

// ─── Format Moments Map ───
export const FORMAT_MOMENTS: Record<FormatKey, FormatMoment[]> = {
  test: TEST_MOMENTS,
  odi: ODI_MOMENTS,
  t20i: T20I_MOMENTS,
  ipl: IPL_MOMENTS,
};

// ─── Awards ───
export interface Award {
  name: string;
  years: string;
  category: "national" | "icc" | "other";
}

export const AWARDS: Award[] = [
  { name: "Arjuna Award", years: "2013", category: "national" },
  { name: "Padma Shri", years: "2017", category: "national" },
  { name: "Khel Ratna", years: "2018", category: "national" },
  { name: "ICC Cricketer of the Decade", years: "2011–2020", category: "icc" },
  { name: "ICC ODI Cricketer of the Decade", years: "2011–2020", category: "icc" },
  { name: "ICC Cricketer of the Year", years: "2017, 2018", category: "icc" },
  { name: "ICC ODI Cricketer of the Year", years: "2012, 2017, 2018, 2023", category: "icc" },
  { name: "ICC Test Cricketer of the Year", years: "2018", category: "icc" },
  { name: "ICC Spirit of Cricket Award", years: "2019", category: "icc" },
  { name: "ICC ODI Team of the Year", years: "2012, 2014, 2016–19, 2023", category: "icc" },
  { name: "TIME 100 Most Influential People", years: "2018", category: "other" },
];

// ─── Poll Options ───
export const POLL_OPTIONS = [
  "82* vs Pakistan — T20 WC 2022, MCG",
  "183 vs Pakistan — Asia Cup 2012",
  "973 runs — IPL 2016",
  "254* vs South Africa — Pune, 2019",
  "133* off 86 — Hobart, 2012",
  "76 in the T20 WC Final — 2024",
];

// ─── Gallery Items ───
export interface GalleryItem {
  id: number;
  type: "image" | "video";
  span: string;
  label: string;
  image?: string;
  videoUrl?: string;
  youtubeId?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, type: "image", span: "col-span-2 row-span-2", label: "2011 World Cup Win", image: "/images/moments/2011-world-cup-win.jpg" },
  {
    id: 2,
    type: "video",
    span: "col-span-1 row-span-1",
    label: "Highlights",
    image: "/images/gallery-highlights.jpg",
    videoUrl: "https://www.youtube.com/watch?v=2a9vJ4aPyoA",
    youtubeId: "2a9vJ4aPyoA",
  },
  { id: 3, type: "image", span: "col-span-1 row-span-2", label: "First IPL Title", image: "/images/moments/first-ipl-title-2025.jpg" },
  { id: 4, type: "image", span: "col-span-1 row-span-1", label: "973 Runs — IPL 2016", image: "/images/moments/973-runs-single-season.jpg" },
  { id: 5, type: "video", span: "col-span-1 row-span-1", label: "Interview", image: "/images/gallery-interview.png" },
  { id: 6, type: "image", span: "col-span-2 row-span-1", label: "50th ODI Century — Wankhede", image: "/images/moments/50th-odi-century.jpg" },
  { id: 7, type: "image", span: "col-span-1 row-span-1", label: "Back-to-Back Title 2026", image: "/images/moments/back-to-back-ipl-title-2026.jpg" },
  { id: 8, type: "image", span: "col-span-1 row-span-2", label: "183 vs Pakistan", image: "/images/moments/183-vs-pakistan.png" },
  { id: 9, type: "image", span: "col-span-1 row-span-1", label: "Border-Gavaskar Trophy Win", image: "/images/moments/border-gavaskar-trophy-win.jpg" },
  { id: 10, type: "video", span: "col-span-1 row-span-1", label: "Fan Cam", image: "/images/gallery-fancam.png" },
  { id: 11, type: "image", span: "col-span-1 row-span-1", label: "2025 Champions Trophy", image: "/images/moments/2025-champions-trophy-win.jpg" },
  { id: 12, type: "image", span: "col-span-2 row-span-1", label: "2024 T20 World Cup Triumph", image: "/images/moments/2024-t20-world-cup-win.jpg" },
];

// ─── Stats Format Labels ───
export const FORMAT_LABELS: Record<FormatKey, { name: string; color: string; count: number }> = {
  test: { name: "TEST", color: "accent-blue", count: 16 },
  odi: { name: "ODI", color: "accent-blue", count: 16 },
  t20i: { name: "T20I", color: "accent-blue", count: 11 },
  ipl: { name: "IPL", color: "accent-red", count: 12 },
};

// ─── Slug Generator & Deep-Link Resolver (Update 28) ───
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function getHighlightHref(highlight: Highlight): string {
  if (!highlight.format || highlight.format === "all") {
    return "/#highlights";
  }

  const targetSlug = highlight.targetSlug || slugify(highlight.title);
  return `/${highlight.format}#${targetSlug}`;
}

