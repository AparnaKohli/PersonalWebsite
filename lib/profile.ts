export type Role = {
  company: string;
  title: string;
  location?: string;
  start: string;
  end?: string;
  current?: boolean;
  summary?: string;
  highlights: string[];
};

export type Education = {
  school: string;
  degree: string;
  detail?: string;
  years: string;
};

export const profile = {
  name: "Aparana Kohli",
  shortTitle:
    "Senior PM, Google · ML personalisation & monetisation · Former Meta, Amazon, Myntra",
  location: "Greater Bengaluru Area, India",
  /** E.164 digits only (no +) for WhatsApp `wa.me` links */
  phoneWaMe: "919840301248",
  phoneDisplay: "+91-9840301248",
  email: "aparna.kohli@gmail.com",
  linkedIn: "https://www.linkedin.com/in/aparana-kohli",
  github:
    "https://github.com/AparnaKohli?tab=repositories",

  headline:
    "Most PMs go deep in tech or deep in business. I do both — and I started from medicine.",

  summary: [
    "I'm a Senior PM at Google with 12+ years building ML-driven consumer and commerce products at Google, Meta, Amazon, and Myntra. My work sits at the intersection of personalisation at scale, APAC market dynamics, and monetisation — with >$500M+ in measurable revenue impact across roles.",
    "At Google One, I lead ML personalisation across the full product suite — offer ranking, SKU recommendations, and AI-native content personalisation — with a team of 19 engineers. Outcomes included +25% annual signup growth and a 16% improvement in three-month retained subscribers, plus Google One's first-ever margin-positive offer campaign.",
    "Earlier at Google Ads, I reduced policy abuse at scale and cut account hijacking by ~80%, and built measurement infrastructure that helped enterprise advertisers trust offline bidding.",
    "I trained as a physician (MBBS), then earned an MS in Computer Science (UIUC) and an MBA (ISB). That path gives me something unusual in product: the ability to synthesize ambiguous signals into clear decisions alongside expert stakeholders — and fluency operating AI-natively across PRDs, UX, and team workflows.",
    "I'm open to L7 roles at large tech and VP/CPO roles at high-growth companies — especially at the intersection of AI, commerce, and the creator economy, with APAC reach.",
  ],

  skills: [
    "Product Management",
    "Personalisation Systems",
    "Growth & Monetisation",
    "Trust & Safety",
    "Measurement & Offline Conversions",
    // Added from resume: technical fluency explicitly listed
    "Python & SQL",
    "AI-Native Workflows",
  ],

  certifications: [
    "SQL for Beginner Data Analysis",
    // Added from resume: Udacity ML Nanodegree
    "Nanodegree — Foundations of Machine Learning (Udacity)",
  ],

  languages: ["English", "French"],

  companies: ["Google", "Meta", "Amazon", "Myntra", "MakeMyTrip"] as const,

  roles: [
    {
      company: "Google",
      title: "Senior Product Manager",
      location: "Bengaluru",
      start: "Aug 2025",
      end: undefined,
      current: true,
      summary:
        "Google One — ML personalisation powering signups, upgrades, and retention across the suite.",
      highlights: [
        "Lead personalisation for ~90% of signups, ~80% of upgrades, ~100% of products with a team of 19 engineers",
        ">$XXXM+ cumulative revenue impact from ML personalisation suite (8-month window cited on profile)",
        "+25% annual signup growth via offer ranking & personalisation",
        "16% lift in three-month retained subscribers by reframing goals from signup-only to LTV + retention",
        "Extended churn recovery personalisation; signup uplift moved from 5.7% → 15.7% with +14.7% retained subscribers",
        "Shipped first margin-positive offer campaign and limited-time blanket offer platform (time-to-market from ~3 months to ~2 weeks)",
        "SKU recommendation engine pilot with contextual multi-armed bandits; anchored pricing narratives for higher tiers",
        "AI-native personalisation: Gemini-generated messaging ranked via RL with UX/legal safeguards",
      ],
    },
    {
      company: "Google",
      title: "Senior Product Manager",
      location: "Bengaluru",
      start: "Apr 2024",
      end: "Aug 2025",
      highlights: [
        "Awareness & discovery for local action conversions — the offline conversion lane for SMBs on Ads",
        "Discovery work delivering $XXXM+ incremental revenue by unlocking measurement trust for offline advertisers",
        "Incrementality studies, insight tools, and MMM integrations so large advertisers could adopt offline bidding with confidence",
      ],
    },
    {
      company: "Google",
      title: "Product Manager",
      location: "Bengaluru",
      start: "May 2021",
      end: "Apr 2024",
      highlights: [
        "Led Ads feature abuse reduction as Ads-level OKR — stopping bad spend without blocking good advertisers",
        "Feature-gating experiments for unknown/high-risk users; ~$300M policy-abuse reduction with net-positive spend",
        "~80% reduction in hijacked accounts/spend via anti-hijack initiative spanning Google-wide surfaces",
        "Enterprise identity & org-structure product for navigating complex advertiser/agency hierarchies",
      ],
    },
    {
      company: "Wadhwani AI",
      title: "Product Management Consultant",
      location: "Remote",
      start: "Feb 2020",
      end: "Apr 2024",
      highlights: [
        "Product for TB medication adherence — ML risk scoring and interventions without overloading frontline staff",
        "Combined clinical understanding with product constraints for a high-stakes public-health context",
      ],
    },
    {
      company: "Myntra",
      title: "Associate Director, Product Management",
      location: "Bengaluru",
      start: "Nov 2019",
      end: "May 2021",
      highlights: [
        "Homepage personalisation experiments driving ~1% conversion lift at national scale",
        "Built AI-powered Looks — early creator-to-commerce loop before “social commerce” was a category in APAC",
        "Owned APAC consumer behavior analysis shaping platform-wide personalisation",
      ],
    },
    {
      company: "Meta (Facebook)",
      title: "Product Growth Manager",
      location: "Delhi",
      start: "Nov 2018",
      end: "Nov 2019",
      highlights: [
        "India growth across the family of apps during a priority emerging-market phase",
        "Partnership with Jio contributing to ~10% Facebook India WAU growth",
        "Offline onboarding model for new-to-internet users — APAC-first distribution learning that scaled thinking",
      ],
    },
    {
      company: "MakeMyTrip.com",
      title: "Product Manager",
      location: "Delhi",
      start: "Apr 2016",
      end: "Nov 2018",
      highlights: [
        "Payments leadership (two reports) plus trains & UGC",
        "BNPL integrations in India in 2016 — before the broader APAC wave",
        "~5% lift in cumulative payment success across the estate",
        "Trains product revamp (~5× transactions) incl. route planner — became a primary new-customer lever",
        "UGC trust & moderation for GoIbibo reviews",
      ],
    },
    {
      company: "Hike Messenger",
      title: "Product Manager",
      location: "New Delhi",
      start: "Jul 2015",
      end: "Feb 2016",
      highlights: [
        "Owned strategy for core messaging features, stickers, media, and reliability pods",
        "Shipped Hike Direct and keyboards releases; acted as release manager for major milestones",
      ],
    },
    {
      company: "Amazon",
      title: "Product Manager",
      location: "Chennai",
      start: "Apr 2014",
      end: "Jul 2015",
      highlights: [
        "Global Kindle features incl. MFA and onboarding tutorials",
        "India Kindle strategy partnerships and roadmap input",
      ],
    },
    {
      company: "Indian School of Business",
      title: "MBA Program & Consulting Projects",
      location: "Hyderabad",
      start: "Apr 2013",
      end: "Apr 2014",
      highlights: [
        "Consulting engagement for major Indian e‑commerce retailer — strategy presented to exec team",
        "Entrepreneurship project: electronic health records venture modeling with stakeholder interviews",
      ],
    },
    {
      company: "Healthcare Magic",
      title: "Consultant",
      location: "Bangalore",
      start: "Nov 2011",
      end: "Feb 2013",
      highlights: [
        "Corporate wellness strategy for enterprise clients — small team execution & client stewardship",
        "Launched concierge access to trainers & nutritionists as a differentiated product line",
      ],
    },
    {
      company: "Indegene Lifesystems",
      title: "Associate Medical Writer",
      location: "India",
      start: "Jun 2010",
      end: "Feb 2012",
      highlights: [
        "Clinical training collateral for pharma field teams — tight turnaround workflows",
      ],
    },
    {
      company: "Army College of Medical Sciences",
      title: "Tutor (Pharmacology & Medicine labs)",
      location: "India",
      start: "Sep 2009",
      end: "Jun 2010",
      highlights: [
        "Youngest faculty on roster; built coursework for succeeding batches during MBBS tenure",
      ],
    },
  ] satisfies Role[],

  education: [
    {
      school: "University of Illinois Urbana‑Champaign",
      degree: "Master of Science, Computer Science",
      years: "2018–2020",
    },
    {
      school: "Indian School of Business",
      degree: "MBA — Marketing, Strategy, Healthcare, Management of Information Technology",
      years: "2013–2014",
    },
    {
      school: "Lady Hardinge Medical College (LHMC)",
      degree: "MBBS, Medicine",
      years: "2002–2007",
    },
    {
      school: "Delhi Public School, Vasant Kunj",
      degree: "Higher secondary — Biology track",
      years: "1991–2002",
    },
    {
      school: "Udacity",
      degree: "Nanodegree — Foundations of Machine Learning",
      years: "2018",
    },
  ] satisfies Education[],
} as const;
