// Anecdotes extracted from Prosple sales meeting transcripts
// Each anecdote maps to one or more AAGE metric IDs and is sourced from real customer conversations

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
  category: "employer" | "candidate" | "both";
}

export const anecdotes: Anecdote[] = [
  // ===== APPLICATION VOLUME SURGE =====
  {
    id: "app-volume-scale",
    metricIds: ["total_applications", "apps_per_position"],
    title: "Applications no longer the challenge — it's what happens after",
    quote: "Out of my 70 clients, maybe five of them are like, we need more applications. At scale, they're increasing applications by a significant percentage every year now. The challenge we're now seeing is when they're getting offers out to students, they're not accepting — or they're accepting and reneging and going somewhere else.",
    context: "Elliott Cirkovic describing a macro shift in graduate recruitment across his 70-client portfolio: application volume is no longer the core problem.",
    relevance: "Directly validates the AAGE data showing total applications surging from 202K (2023) to 424K (2026), and the emerging focus on offer acceptance and reneging as the new pain point.",
    source: {
      meeting: "Client Advisory Discussion",
      date: "2026-02",
      participants: ["Elliott Cirkovic", "Ian Edwards"],
    },
    featured: true,
    category: "employer",
  },
  {
    id: "ai-auto-apply",
    metricIds: ["total_applications", "ai_usage_candidate", "apps_per_position"],
    title: "AI agents auto-applying to jobs at scale",
    quote: "Applications are increasing pretty much across the board for every employer and the teams managing these processes are not only not increasing but probably getting smaller. Students can use AI — if they're smart enough, they can create AI agents. There's software out there that auto-applies to jobs. There's not really any legalities on students doing that.",
    context: "Elliott explaining to a client how AI is fundamentally changing application dynamics — driving volumes up while employer teams shrink.",
    relevance: "Explains the mechanism behind the AAGE finding of candidates using AI in applications growing from 13% (2024) to 42% (2026), and why total applications have doubled since 2023.",
    source: {
      meeting: "Client Advisory Discussion",
      date: "2026-02",
      participants: ["Elliott Cirkovic", "Ian Edwards"],
    },
    featured: true,
    category: "both",
  },

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
    featured: false,
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
    context: "Elliott and Sue Bentley (employer client) discussing reneg rates for their graduate intake, establishing that ~10% is the baseline expectation across the market.",
    relevance: "Provides a real-world benchmark for the AAGE data on candidates accepting multiple offers (17% in 2026), showing how even 'normal' reneg rates create pipeline risk for smaller intakes.",
    source: {
      meeting: "Client Meeting",
      date: "2026-02",
      participants: ["Elliott Cirkovic", "Sue Bentley"],
    },
    featured: true,
    category: "employer",
  },

  // ===== CAREER PROGRESSION =====
  {
    id: "career-progression-number-one",
    metricIds: ["career_progression_priority"],
    title: "Career progression is #1 every single year — and employers struggle most with it",
    quote: "The most important thing every year is career progression. When they're asked, 'what's the most important thing to you when looking at an employer,' career progression is number one every year. What career progression means is, are we telling them the next steps after the program rolls off?",
    context: "Elliott presenting AAGE candidate survey findings to Northrop Grumman's team, specifically referencing the ~2,400 candidate responses and explaining what career progression actually means in practice.",
    relevance: "Directly validates the AAGE candidate data showing career progression climbing from 39% (2023) to 50% (2026) as the top priority. The salesperson is using the AAGE data itself as a credibility tool.",
    source: {
      meeting: "Northrop Grumman - Client Meeting",
      date: "2026-02",
      participants: ["Elliott Cirkovic", "Jasmine"],
    },
    featured: true,
    category: "candidate",
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
  {
    id: "ai-agent-interviews",
    metricIds: ["ai_usage_employer"],
    title: "AI agents now conducting video interviews at scale",
    quote: "You give it the parameters — the questions the AI agent is going to ask. The student responds and they basically do it like a video call. It's not with a person. It's a video call with a text box and you basically have a conversation. It's video interviewing at scale. I tested it as a candidate — you kind of know it's not a human, but it's pretty close.",
    context: "Elliott describing a new AI interview platform (Skill Society) to Ventia, which he personally tested as a mock candidate.",
    relevance: "Demonstrates the frontier of AI adoption in recruitment, extending beyond the 22% employer AI usage figure in the AAGE data — showing where the market is heading.",
    source: {
      meeting: "Ventia - Strategy Meeting",
      date: "2026-02",
      participants: ["Elliott Cirkovic", "Esther Starc"],
    },
    featured: false,
    category: "employer",
  },

  // ===== COST PER HIRE / MARKETING SPEND =====
  {
    id: "cost-per-app-aage-benchmark",
    metricIds: ["cost_per_hire", "marketing_cost_per_hire"],
    title: "Using AAGE cost-per-application data to benchmark employer spend",
    quote: "Per industry, you've got how many applications did they receive, what was their average marketing spend, and then you divide them and you've got your average cost per application. I've been questioned on it before, especially when you're stacking it up to AAGE data, which is completed application.",
    context: "Elliott walking his sales team through how to use AAGE employer survey data to build cost-per-application benchmarks for client proposals, distinguishing between start and completed applications.",
    relevance: "Shows how the AAGE marketing cost per hire data ($766→$1,179) is being used in the field to justify employer investment decisions — the data isn't just theoretical.",
    source: {
      meeting: "Internal Sales Training",
      date: "2026-02",
      participants: ["Elliott Cirkovic", "Grant Robson", "Corinne Caymo"],
    },
    featured: false,
    category: "employer",
  },

  // ===== FORECASTING CHALLENGES =====
  {
    id: "forecasting-late-numbers",
    metricIds: ["forecasting_challenge"],
    title: "Still waiting for hiring numbers — offers delayed to December",
    quote: "I'm still waiting for hiring numbers. Trying to get the leaders on board, the hiring managers on board within that span — it's going to be a challenge. The poor guy was just him, right? He ran the campaigns in March, April, but then offers were out by September, October, some of them in freaking December.",
    context: "An employer client (engineering firm) describing the cascading delay caused by late internal approval of graduate numbers — from March campaign launch to December offers.",
    relevance: "Vividly illustrates why 'forecasting graduate role requirements' overtook competition as the #1 employer challenge in 2026 AAGE data (38%). Internal delays are the root cause.",
    source: {
      meeting: "Client Meeting",
      date: "2026-02",
      participants: ["Elliott Cirkovic", "fgamez"],
    },
    featured: true,
    category: "employer",
  },

  // ===== EMPLOYER RESTRUCTURING =====
  {
    id: "restructure-bau-impact",
    metricIds: ["forecasting_challenge", "apps_per_position"],
    title: "Six BAU recruiters pulled to manage graduate intake of 90",
    quote: "A lot of it AI-related, most of it not. A lot of it's just cost-cutting or team restructures around TA... We've actually just brought on a client who that was their main pain point. They're like, we've just pulled six of our BAU recruiters across to do grads from 90 roles they're trying to recruit for.",
    context: "Elliott describing a pattern across his portfolio: employer TA teams are restructuring, with BAU recruiters being pulled into graduate recruitment — creating resource strain.",
    relevance: "Explains the operational context behind the AAGE 2026 shift to reporting '480 applications per recruitment staff member' rather than per position — teams are shrinking while volume grows.",
    source: {
      meeting: "Beca - Client Meeting",
      date: "2026-02",
      participants: ["Elliott Cirkovic", "Bridget"],
    },
    featured: false,
    category: "employer",
  },

  // ===== INTERN-TO-GRAD CONVERSION =====
  {
    id: "intern-conversion-85",
    metricIds: ["offer_acceptance_rate"],
    title: "85% intern conversion rate — best-in-class employers don't need to go to market",
    quote: "Most are still around 80 to 100 [grad intake], some in that 150 range and starting to lean on their interns. Converting is a big priority — not just in your sector, that's in every sector. The clients who run it best have like 85% conversion rate from their interns, and they just don't have to go to market for grads as heavily.",
    context: "Elliott explaining a cross-industry trend where employers are prioritising internship programs as a talent pipeline to reduce dependence on open-market graduate campaigns.",
    relevance: "Contextualises the AAGE offer acceptance rate (78%→84%) by showing that best-practice employers are circumventing the open market entirely through intern conversion.",
    source: {
      meeting: "Beca - Client Meeting",
      date: "2026-02",
      participants: ["Elliott Cirkovic", "Bridget"],
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

  // ===== AAGE DATA AS SALES TOOL =====
  {
    id: "aage-as-business-case",
    metricIds: ["cost_per_hire", "forecasting_challenge"],
    title: "Client uses AAGE data to convince leadership",
    quote: "They do a really good report every year, which basically answers a lot of these questions — when do people go to market, how long for, when do they get offers out. So if you need to use that as a data set to speak to leadership and go, 'I want to make these changes,' this is why. We're going to give you the data to go into those conversations with confidence. Because it's not just me saying it, it's not just you saying it — it's data saying it.",
    context: "Elliott introducing AAGE reports to a new client who had never heard of them, explaining how the data can be used internally to build business cases for changes to recruitment timing and strategy.",
    relevance: "Shows the real-world impact of AAGE survey data — it's being used by employers in the field to justify strategic decisions to senior leadership, not just for benchmarking.",
    source: {
      meeting: "Northrop Client Meeting",
      date: "2026-02",
      participants: ["Elliott Cirkovic", "fgamez"],
    },
    featured: false,
    category: "employer",
  },

  // ===== WOMEN IN STEM / AAGE DATA VALIDITY =====
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
