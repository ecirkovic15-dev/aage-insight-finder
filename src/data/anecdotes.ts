// Anecdotes extracted from Prosple sales meeting transcripts
// FILTER: Only includes quotes where the CLIENT (not Elliott) has mentioned
// something relating to the trend. Elliott presenting AAGE data is excluded.

export interface Anecdote {
  id: string;
  metricIds: string[]; // maps to Metric.id in aageData.ts
  title: string;
  quote: string;
  context: string;
  relevance: string;
  source: {
    meeting: string;
    date: string;
    participants: string[];
  };
  featured: boolean; // particularly strong/surprising
  category: "employer" | "candidate" | "graduate" | "intern" | "both";
}

export const anecdotes: Anecdote[] = [
  // ===== RENEGING / OFFER ACCEPTANCE =====
  {
    id: "reneg-johnstaff",
    metricIds: ["offer_acceptance_rate", "multiple_offers_accepted"],
    title: "Two senior offers accepted, then both reneged",
    quote: "I've had a couple of people leave, then had two offers both accept and then renege for different reasons. At PD level as well — you don't have PDs hanging up your sleeve.",
    context: "Colin O'Malley (Johnstaff Engineering) describing how even senior-level offers are being reneged on, not just graduate positions, during a period of intense project demand in Brisbane.",
    relevance: "Shows reneging behaviour extending beyond graduate level, supporting the AAGE trend of candidates accepting multiple offers (growing from 9% in 2024 to 17% in 2026).",
    source: {
      meeting: "Johnstaff Engineering - Meeting",
      date: "2026-02",
      participants: ["Elliott Cirkovic", "Colin O'Malley"],
    },
    featured: true,
    category: "employer",
  },
  {
    id: "reneg-ventia",
    metricIds: ["offer_acceptance_rate", "multiple_offers_accepted"],
    title: "Zero renegs after contract signing — but pre-signing dropoffs persist",
    quote: "No renegs after contract signing. Let me say it like that. So we didn't have anyone that once they'd signed their contract then turned around and said no. But we had a couple of people that when we offered, they said no.",
    context: "Michelle (Ventia) reporting 34 graduate offers for their 2026 cohort, distinguishing between pre- and post-contract reneging. One chose a construction competitor, another stayed interstate.",
    relevance: "Illustrates the nuanced reality behind the AAGE offer acceptance rate data — the distinction between pre-contract declines and post-contract reneging is critical for employers.",
    source: {
      meeting: "Ventia - Meeting",
      date: "2026-02",
      participants: ["Elliott Cirkovic", "Michelle"],
    },
    featured: false,
    category: "employer",
  },
  {
    id: "reneg-10-percent",
    metricIds: ["offer_acceptance_rate", "multiple_offers_accepted"],
    title: "10% reneg rate considered 'normal' — above that gets dangerous",
    quote: "Last year was 38 [grads], and we had four renegs. That's about 10%. That's normal. But obviously if you have that with 25, then you're talking 15%. That's when it's starting to get into that [danger zone].",
    context: "Sue Bentley (employer client) discussing reneg rates for their graduate intake, establishing that ~10% is the baseline expectation across the market.",
    relevance: "Provides a real-world benchmark for the AAGE data on candidates accepting multiple offers (17% in 2026), showing how even 'normal' reneg rates create pipeline risk for smaller intakes.",
    source: {
      meeting: "Client Meeting",
      date: "2026-02",
      participants: ["Elliott Cirkovic", "Sue Bentley"],
    },
    featured: true,
    category: "employer",
  },

  // ===== AI IN RECRUITMENT (EMPLOYER SIDE) =====
  {
    id: "ai-ventia-video",
    metricIds: ["ai_usage_employer", "genai_usage_employer"],
    title: "Employer contemplating AI for video interviewing — leaning on AAGE guidelines",
    quote: "We're contemplating AI use for ease of the video interviewing process and efficiencies in that space. We're contemplating reframing the assessment centres so that there is a little bit more face-to-face component. Basically leaning into the AAGE's research reports in terms of candidate experience and best practice guidelines.",
    context: "Esther Starc (Ventia) describing how their graduate recruitment team is actively exploring AI tools for video interviews while simultaneously trying to increase face-to-face touchpoints based on AAGE recommendations.",
    relevance: "Real example of the 22% of employers using AI in recruitment (2025 AAGE data), showing the tension between automation for efficiency and maintaining candidate experience quality.",
    source: {
      meeting: "Ventia - Strategy Meeting",
      date: "2026-02",
      participants: ["Elliott Cirkovic", "Esther Starc", "Nick"],
    },
    featured: true,
    category: "employer",
  },

  // ===== FORECASTING CHALLENGES =====
  {
    id: "forecasting-late-numbers",
    metricIds: ["forecasting_challenge"],
    title: "Still waiting for hiring numbers — offers delayed to December",
    quote: "I'm still waiting for hiring numbers. Trying to get the leaders on board, the hiring managers on board within that span — it's going to be a challenge. The poor guy was just him, right? He ran the campaigns in March, April, but then offers were out by September, October, some of them in freaking December.",
    context: "An employer client describing the cascading delay caused by late internal approval of graduate numbers — from March campaign launch to December offers.",
    relevance: "Vividly illustrates why 'forecasting graduate role requirements' overtook competition as the #1 employer challenge in 2026 AAGE data (38%). Internal delays are the root cause.",
    source: {
      meeting: "Client Meeting",
      date: "2026-02",
      participants: ["Elliott Cirkovic", "fgamez"],
    },
    featured: true,
    category: "employer",
  },

  // ===== QUALITY vs VOLUME =====
  {
    id: "quality-skin-of-teeth",
    metricIds: ["total_applications", "apps_per_position"],
    title: "'Skin of our teeth' — applications down but quality cohort achieved",
    quote: "Applications have been down a little bit on previous years. But the quality has been there. We put on 22, three First Nations, 70% women — it's a beautiful little cohort. But had people reneged on us, we probably would have been a bit, oh sugar, what do we do next? We didn't have a lot of room to move.",
    context: "Sue Bentley describing her graduate program's delicate balance — a high-quality but thin pipeline that left no margin for error on reneging.",
    relevance: "Provides a counterpoint to the AAGE total application volume growth: not all employers are seeing the surge. Some face quality constraints that raw volume numbers mask.",
    source: {
      meeting: "Client Meeting",
      date: "2026-02",
      participants: ["Elliott Cirkovic", "Sue Bentley"],
    },
    featured: false,
    category: "employer",
  },

  // ===== AAGE DATA USAGE =====
  {
    id: "aage-career-fair-data",
    metricIds: ["sample_size_candidate"],
    title: "AAGE data used to reject women-in-STEM career fair investment",
    quote: "The data from AAGE kind of shows that those [women in STEM career fairs] don't really work. So we're not going to the big meet either.",
    context: "Michelle (Ventia) citing AAGE research data as the basis for not investing in a women-in-STEM career fair, instead redirecting their small $5K social media budget toward targeted digital ads.",
    relevance: "Demonstrates employers actively using AAGE candidate survey data to make sourcing channel decisions — showing the survey's real-world influence on recruitment strategy.",
    source: {
      meeting: "Ventia - Meeting",
      date: "2026-02",
      participants: ["Elliott Cirkovic", "Michelle"],
    },
    featured: false,
    category: "employer",
  },
];

// Helper to get anecdotes for a specific metric
export const getAnecdotesForMetric = (metricId: string): Anecdote[] =>
  anecdotes.filter((a) => a.metricIds.includes(metricId));

// Get featured anecdotes
export const getFeaturedAnecdotes = (): Anecdote[] =>
  anecdotes.filter((a) => a.featured);

// Get anecdotes by report category
export const getAnecdotesByCategory = (category: "employer" | "candidate"): Anecdote[] =>
  anecdotes.filter((a) => a.category === category || a.category === "both");
