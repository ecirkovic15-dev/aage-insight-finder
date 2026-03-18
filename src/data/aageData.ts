// All data sourced directly from AAGE PDF reports 2023-2026
// Each data point includes source provenance

export type ReportType = "employer" | "candidate";
export type SurveyYear = 2023 | 2024 | 2025 | 2026;

export interface DataPoint {
  year: SurveyYear;
  value: number | null;
  source: string;
  pageRef?: string;
  questionNote?: string;
}

export interface Metric {
  id: string;
  label: string;
  category: string;
  reportType: ReportType;
  unit: string;
  description: string;
  dataPoints: DataPoint[];
  consistencyNote?: string;
  isNewQuestion?: boolean;
  yearIntroduced?: SurveyYear;
}

// ==================== EMPLOYER SURVEY DATA ====================

export const employerMetrics: Metric[] = [
  {
    id: "avg_starting_salary",
    label: "Average Graduate Starting Salary",
    category: "Graduate Salaries",
    reportType: "employer",
    unit: "$",
    description: "Average starting salary for graduates commencing in the survey year.",
    dataPoints: [
      { year: 2023, value: 74722, source: "2023 AAGE Employer Survey", pageRef: "Executive Summary, p13", questionNote: "Average starting salary for the 2023 graduate intake" },
      { year: 2024, value: 76398, source: "2024 AAGE Employer Survey", pageRef: "Executive Summary, p15", questionNote: "Average starting salary for 2024 graduates" },
      { year: 2025, value: 78603, source: "2025 AAGE Employer Survey", pageRef: "Executive Summary, p14", questionNote: "Average starting salary is $78,603, up from $76,398 in 2024" },
      { year: 2026, value: 80173, source: "2026 AAGE Employer Survey", pageRef: "Executive Summary, p14", questionNote: "Average starting salary of $80,173 (cf. $78,603 2025)" },
    ],
  },
  {
    id: "cost_per_hire",
    label: "Average Cost Per Hire",
    category: "Marketing & Selection Spend",
    reportType: "employer",
    unit: "$",
    description: "Combined average marketing & selection cost per graduate hired.",
    dataPoints: [
      { year: 2023, value: 1770, source: "2023 AAGE Employer Survey", pageRef: "Executive Summary, p12", questionNote: "Marketing $766 + Selection $1,004" },
      { year: 2024, value: 1872, source: "2024 AAGE Employer Survey", pageRef: "Executive Summary, p13", questionNote: "Marketing $849 + Selection $1,023" },
      { year: 2025, value: 2041, source: "2025 AAGE Employer Survey", pageRef: "Executive Summary, p14", questionNote: "Marketing $1,031 + Selection $1,010" },
      { year: 2026, value: 2972, source: "2026 AAGE Employer Survey", pageRef: "Executive Summary, p14", questionNote: "Marketing $1,386 + Selection $1,586" },
    ],
  },
  {
    id: "marketing_cost_per_hire",
    label: "Marketing & Attraction Cost Per Hire",
    category: "Marketing & Selection Spend",
    reportType: "employer",
    unit: "$",
    description: "Average marketing and attraction spend per graduate position.",
    dataPoints: [
      { year: 2023, value: 766, source: "2023 AAGE Employer Survey", pageRef: "p30" },
      { year: 2024, value: 849, source: "2024 AAGE Employer Survey", pageRef: "p33" },
      { year: 2025, value: 1031, source: "2025 AAGE Employer Survey", pageRef: "p42" },
      { year: 2026, value: 1179, source: "2026 AAGE Employer Survey", pageRef: "p46", questionNote: "Per graduate position (not per hire)" },
    ],
  },
  {
    id: "selection_cost_per_hire",
    label: "Selection Cost Per Hire",
    category: "Marketing & Selection Spend",
    reportType: "employer",
    unit: "$",
    description: "Average selection process spend per graduate position.",
    dataPoints: [
      { year: 2023, value: 1004, source: "2023 AAGE Employer Survey", pageRef: "p31" },
      { year: 2024, value: 1023, source: "2024 AAGE Employer Survey", pageRef: "p34" },
      { year: 2025, value: 1010, source: "2025 AAGE Employer Survey", pageRef: "p43" },
      { year: 2026, value: 1349, source: "2026 AAGE Employer Survey", pageRef: "p48" },
    ],
  },
  {
    id: "total_applications",
    label: "Total Graduate Applications",
    category: "Graduate Recruitment",
    reportType: "employer",
    unit: "count",
    description: "Combined total number of graduate applications received across all employers.",
    dataPoints: [
      { year: 2023, value: 202876, source: "2023 AAGE Employer Survey", pageRef: "p48" },
      { year: 2024, value: 339432, source: "2024 AAGE Employer Survey", pageRef: "p49" },
      { year: 2025, value: 416197, source: "2025 AAGE Employer Survey", pageRef: "Executive Summary, p13" },
      { year: 2026, value: 423885, source: "2026 AAGE Employer Survey", pageRef: "Executive Summary, p14" },
    ],
  },
  {
    id: "apps_per_position",
    label: "Applications Per Graduate Position",
    category: "Graduate Recruitment",
    reportType: "employer",
    unit: "ratio",
    description: "Average number of applications received per graduate position.",
    dataPoints: [
      { year: 2023, value: 16, source: "2023 AAGE Employer Survey", pageRef: "p49" },
      { year: 2024, value: 30, source: "2024 AAGE Employer Survey", pageRef: "Executive Summary, p13" },
      { year: 2025, value: 42, source: "2025 AAGE Employer Survey", pageRef: "Executive Summary, p13" },
      { year: 2026, value: null, source: "2026 AAGE Employer Survey", questionNote: "Not directly comparable — reported as 480 apps per recruitment staff member" },
    ],
    consistencyNote: "2026 changed reporting to apps per staff member (480) rather than per position",
  },
  {
    id: "offer_acceptance_rate",
    label: "Graduate Offer Acceptance Rate",
    category: "Graduate Recruitment",
    reportType: "employer",
    unit: "%",
    description: "Percentage of graduate offers accepted by candidates.",
    dataPoints: [
      { year: 2023, value: 78, source: "2023 AAGE Employer Survey", pageRef: "p48" },
      { year: 2024, value: 82, source: "2024 AAGE Employer Survey", pageRef: "p49" },
      { year: 2025, value: 84, source: "2025 AAGE Employer Survey", pageRef: "Executive Summary, p13" },
      { year: 2026, value: null, source: "2026 AAGE Employer Survey", questionNote: "Not stated in summary report" },
    ],
  },
  {
    id: "median_vacancies",
    label: "Median Vacancies Per Employer",
    category: "Graduate Recruitment",
    reportType: "employer",
    unit: "count",
    description: "Median number of graduate vacancies per employer.",
    dataPoints: [
      { year: 2023, value: null, source: "2023 AAGE Employer Survey", questionNote: "Historical chart shows 2022=15; 2023 specific median not stated in first 50 pages" },
      { year: 2024, value: 27, source: "2025 AAGE Employer Survey", pageRef: "Executive Summary, p13", questionNote: "Cited as comparative: 'cf. 27 2024'" },
      { year: 2025, value: 20, source: "2025 AAGE Employer Survey", pageRef: "Executive Summary, p13" },
      { year: 2026, value: 22, source: "2026 AAGE Employer Survey", pageRef: "Executive Summary, p14" },
    ],
  },
  {
    id: "sample_size_employer",
    label: "Survey Sample Size",
    category: "Methodology",
    reportType: "employer",
    unit: "count",
    description: "Number of employers who completed the survey.",
    dataPoints: [
      { year: 2023, value: 131, source: "2023 AAGE Employer Survey", pageRef: "p11" },
      { year: 2024, value: 186, source: "2024 AAGE Employer Survey", pageRef: "p18" },
      { year: 2025, value: 194, source: "2025 AAGE Employer Survey", pageRef: "p19" },
      { year: 2026, value: 153, source: "2026 AAGE Employer Survey", pageRef: "p8" },
    ],
  },
  {
    id: "sector_private",
    label: "Private Sector Employers",
    category: "Industry Breakdown",
    reportType: "employer",
    unit: "%",
    description: "Percentage of participating employers from the private sector.",
    dataPoints: [
      { year: 2023, value: 73, source: "2023 AAGE Employer Survey", pageRef: "p11" },
      { year: 2024, value: 76, source: "2024 AAGE Employer Survey", pageRef: "p18" },
      { year: 2025, value: 72, source: "2025 AAGE Employer Survey", pageRef: "p20" },
      { year: 2026, value: 69, source: "2026 AAGE Employer Survey", pageRef: "p18" },
    ],
  },
  {
    id: "competition_challenge",
    label: "Competition for Graduates (Top Challenge)",
    category: "Employer Challenges",
    reportType: "employer",
    unit: "%",
    description: "Percentage of employers citing competition for graduates as their top recruitment challenge.",
    dataPoints: [
      { year: 2023, value: 73, source: "2023 AAGE Employer Survey", pageRef: "p13" },
      { year: 2024, value: 48, source: "2024 AAGE Employer Survey", pageRef: "Executive Summary, p14" },
      { year: 2025, value: 40, source: "2025 AAGE Employer Survey", pageRef: "Executive Summary, p14" },
      { year: 2026, value: null, source: "2026 AAGE Employer Survey", questionNote: "In 2026, 'forecasting graduate role requirements' overtook competition (38%) as top challenge" },
    ],
    consistencyNote: "In 2026, the question structure changed — 'forecasting graduate role requirements' (38%) became the top challenge, replacing 'competition for graduates'",
  },
  {
    id: "forecasting_challenge",
    label: "Forecasting Graduate Roles (Top Challenge)",
    category: "Employer Challenges",
    reportType: "employer",
    unit: "%",
    description: "Percentage of employers citing forecasting graduate role requirements as their top challenge.",
    dataPoints: [
      { year: 2023, value: null, source: "2023 AAGE Employer Survey", questionNote: "Not reported as separate metric" },
      { year: 2024, value: null, source: "2024 AAGE Employer Survey", questionNote: "Not broken out separately" },
      { year: 2025, value: 25, source: "2025 AAGE Employer Survey", pageRef: "Executive Summary" },
      { year: 2026, value: 38, source: "2026 AAGE Employer Survey", pageRef: "Executive Summary, p13" },
    ],
    isNewQuestion: true,
    yearIntroduced: 2025,
  },
  {
    id: "hybrid_work",
    label: "Employers Offering Hybrid Work",
    category: "Work Models",
    reportType: "employer",
    unit: "%",
    description: "Percentage of employers offering graduates a hybrid work model.",
    dataPoints: [
      { year: 2023, value: null, source: "2023 AAGE Employer Survey", questionNote: "Not reported in first 50 pages" },
      { year: 2024, value: 68, source: "2024 AAGE Employer Survey", pageRef: "Executive Summary, p14" },
      { year: 2025, value: 74, source: "2025 AAGE Employer Survey", pageRef: "Executive Summary, p15" },
      { year: 2026, value: null, source: "2026 AAGE Employer Survey", questionNote: "Not stated in summary report first pages" },
    ],
  },
  {
    id: "formal_dev_program",
    label: "Employers With Formal Grad Dev Program",
    category: "Graduate Development",
    reportType: "employer",
    unit: "%",
    description: "Percentage of employers offering a formal graduate development program.",
    dataPoints: [
      { year: 2023, value: null, source: "2023 AAGE Employer Survey", questionNote: "Referenced but specific % not in first 50 pages" },
      { year: 2024, value: 91, source: "2024 AAGE Employer Survey", pageRef: "Executive Summary, p15" },
      { year: 2025, value: 91, source: "2025 AAGE Employer Survey", pageRef: "Executive Summary, p15" },
      { year: 2026, value: null, source: "2026 AAGE Employer Survey", questionNote: "Not in summary pages extracted" },
    ],
  },
  {
    id: "ai_usage_employer",
    label: "Employers Using AI in Recruitment",
    category: "AI in Recruitment",
    reportType: "employer",
    unit: "%",
    description: "Percentage of employers using AI (including GenAI) in graduate recruitment.",
    dataPoints: [
      { year: 2023, value: null, source: "2023 AAGE Employer Survey", questionNote: "Question not asked in 2023" },
      { year: 2024, value: 16, source: "2024 AAGE Employer Survey", pageRef: "p32", questionNote: "Do you or your team use AI in any part of the graduate recruitment process?" },
      { year: 2025, value: 22, source: "2025 AAGE Employer Survey", pageRef: "p32" },
      { year: 2026, value: null, source: "2026 AAGE Employer Survey", questionNote: "Not in summary report" },
    ],
    isNewQuestion: true,
    yearIntroduced: 2024,
  },
  {
    id: "genai_usage_employer",
    label: "Employers Using Generative AI",
    category: "AI in Recruitment",
    reportType: "employer",
    unit: "%",
    description: "Percentage of employers who have used GenAI tools in recruitment, development or program management.",
    dataPoints: [
      { year: 2023, value: null, source: "2023 AAGE Employer Survey" },
      { year: 2024, value: null, source: "2024 AAGE Employer Survey", questionNote: "Asked differently: 'conversational AI tools (e.g. ChatGPT)'" },
      { year: 2025, value: 41, source: "2025 AAGE Employer Survey", pageRef: "p33" },
      { year: 2026, value: null, source: "2026 AAGE Employer Survey" },
    ],
    consistencyNote: "Question wording changed between 2024 and 2025 — not directly comparable",
    isNewQuestion: true,
    yearIntroduced: 2025,
  },
  {
    id: "comm_skills_importance",
    label: "Communication Skills Rated Very Important",
    category: "Skills Assessment",
    reportType: "employer",
    unit: "%",
    description: "Percentage of employers rating communication skills as 'very important' in assessment.",
    dataPoints: [
      { year: 2023, value: 77, source: "2023 AAGE Employer Survey", pageRef: "p41" },
      { year: 2024, value: 82, source: "2024 AAGE Employer Survey", pageRef: "p43" },
      { year: 2025, value: 77, source: "2025 AAGE Employer Survey", pageRef: "p50" },
      { year: 2026, value: null, source: "2026 AAGE Employer Survey", questionNote: "Reported as 56%+ assessing as important — different framing" },
    ],
    consistencyNote: "2026 changed the assessment framework slightly",
  },
];

// ==================== CANDIDATE SURVEY DATA ====================

export const candidateMetrics: Metric[] = [
  {
    id: "sample_size_candidate",
    label: "Survey Sample Size",
    category: "Methodology",
    reportType: "candidate",
    unit: "count",
    description: "Number of candidates who completed the survey.",
    dataPoints: [
      { year: 2023, value: 3001, source: "2023 AAGE Candidate Survey", pageRef: "p7" },
      { year: 2024, value: 3633, source: "2024 AAGE Candidate Survey", pageRef: "Methodology" },
      { year: 2025, value: 2551, source: "2025 AAGE Candidate Survey", pageRef: "p9" },
      { year: 2026, value: 2208, source: "2026 AAGE Candidate Survey", pageRef: "p8" },
    ],
  },
  {
    id: "career_progression_priority",
    label: "Career Progression as Top Priority",
    category: "Job Preferences",
    reportType: "candidate",
    unit: "%",
    description: "Percentage of candidates selecting career progression as one of their top priorities when choosing a graduate program.",
    dataPoints: [
      { year: 2023, value: 39, source: "2023 AAGE Candidate Survey", pageRef: "p14", questionNote: "Most important elements when choosing which graduate program to apply for" },
      { year: 2024, value: 41, source: "2024 AAGE Candidate Survey", pageRef: "Executive Summary, p13" },
      { year: 2025, value: 45, source: "2025 AAGE Candidate Survey", pageRef: "Executive Summary, p12" },
      { year: 2026, value: 50, source: "2026 AAGE Candidate Survey", pageRef: "Executive Summary, p13" },
    ],
  },
  {
    id: "training_quality_priority",
    label: "Training & Development Quality Priority",
    category: "Job Preferences",
    reportType: "candidate",
    unit: "%",
    description: "Percentage of candidates citing quality of training and development as a top priority.",
    dataPoints: [
      { year: 2023, value: 33, source: "2023 AAGE Candidate Survey", pageRef: "p14" },
      { year: 2024, value: null, source: "2024 AAGE Candidate Survey", questionNote: "Not explicitly stated as percentage" },
      { year: 2025, value: 39, source: "2025 AAGE Candidate Survey", pageRef: "Executive Summary, p12" },
      { year: 2026, value: 41, source: "2026 AAGE Candidate Survey", pageRef: "Executive Summary, p13" },
    ],
  },
  {
    id: "company_culture_priority",
    label: "Company Culture Priority",
    category: "Job Preferences",
    reportType: "candidate",
    unit: "%",
    description: "Percentage of candidates citing company culture as a top priority.",
    dataPoints: [
      { year: 2023, value: 35, source: "2023 AAGE Candidate Survey", pageRef: "p14" },
      { year: 2024, value: 37, source: "2024 AAGE Candidate Survey", pageRef: "Executive Summary, p13" },
      { year: 2025, value: 36, source: "2025 AAGE Candidate Survey", pageRef: "Executive Summary, p12" },
      { year: 2026, value: 35, source: "2026 AAGE Candidate Survey", pageRef: "Executive Summary, p13" },
    ],
  },
  {
    id: "ai_usage_candidate",
    label: "Candidates Using AI in Applications",
    category: "AI Usage",
    reportType: "candidate",
    unit: "%",
    description: "Percentage of candidates using AI or GenAI to assist in the recruitment process.",
    dataPoints: [
      { year: 2023, value: null, source: "2023 AAGE Candidate Survey", questionNote: "Not asked in 2023" },
      { year: 2024, value: 13, source: "2024 AAGE Candidate Survey", pageRef: "Executive Summary, p12" },
      { year: 2025, value: 27, source: "2025 AAGE Candidate Survey", pageRef: "Executive Summary, p11" },
      { year: 2026, value: 42, source: "2026 AAGE Candidate Survey", pageRef: "Executive Summary, p11" },
    ],
    isNewQuestion: true,
    yearIntroduced: 2024,
  },
  {
    id: "multiple_offers_accepted",
    label: "Candidates Accepting Multiple Offers",
    category: "Offer Behaviour",
    reportType: "candidate",
    unit: "%",
    description: "Percentage of candidates who accepted multiple job offers.",
    dataPoints: [
      { year: 2023, value: null, source: "2023 AAGE Candidate Survey", questionNote: "17% reneged, but multiple offers metric not stated same way" },
      { year: 2024, value: 9, source: "2024 AAGE Candidate Survey", pageRef: "Executive Summary" },
      { year: 2025, value: 14, source: "2025 AAGE Candidate Survey", pageRef: "Executive Summary" },
      { year: 2026, value: 17, source: "2026 AAGE Candidate Survey", pageRef: "Executive Summary, p12" },
    ],
    consistencyNote: "Comparable from 2024 onwards",
  },
  {
    id: "uni_careers_usage",
    label: "Used University Careers Service",
    category: "University Preparedness",
    reportType: "candidate",
    unit: "%",
    description: "Percentage of candidates who utilised their university careers service.",
    dataPoints: [
      { year: 2023, value: null, source: "2023 AAGE Candidate Survey", questionNote: "Not stated in executive summary" },
      { year: 2024, value: 37, source: "2024 AAGE Candidate Survey", pageRef: "p19" },
      { year: 2025, value: 40, source: "2025 AAGE Candidate Survey", pageRef: "p20" },
      { year: 2026, value: 41, source: "2026 AAGE Candidate Survey", pageRef: "p35" },
    ],
  },
  {
    id: "candidate_care_rating",
    label: "Candidate Care (Excellent/Very Good)",
    category: "Recruitment Experience",
    reportType: "candidate",
    unit: "%",
    description: "Percentage of candidates rating overall candidate care as excellent or very good.",
    dataPoints: [
      { year: 2023, value: 75, source: "2023 AAGE Candidate Survey", pageRef: "Executive Summary, p12" },
      { year: 2024, value: 73, source: "2024 AAGE Candidate Survey", pageRef: "Executive Summary, p12" },
      { year: 2025, value: 76, source: "2025 AAGE Candidate Survey", pageRef: "Executive Summary, p11" },
      { year: 2026, value: 75, source: "2026 AAGE Candidate Survey", pageRef: "Executive Summary, p12", questionNote: "Three in four candidates" },
    ],
  },
  {
    id: "hybrid_preference",
    label: "Candidates Preferring Hybrid Work",
    category: "Work Preferences",
    reportType: "candidate",
    unit: "%",
    description: "Percentage of candidates who prefer a hybrid work model.",
    dataPoints: [
      { year: 2023, value: null, source: "2023 AAGE Candidate Survey", questionNote: "42% flexible work preference but not hybrid specifically" },
      { year: 2024, value: 42, source: "2024 AAGE Candidate Survey", pageRef: "Executive Summary" },
      { year: 2025, value: 46, source: "2025 AAGE Candidate Survey", pageRef: "Executive Summary, p13" },
      { year: 2026, value: null, source: "2026 AAGE Candidate Survey", questionNote: "80% prefer hybrid (46%) or flexibility (34%) combined" },
    ],
  },
  {
    id: "expected_tenure_5plus",
    label: "Expect to Stay 5+ Years",
    category: "Retention Expectations",
    reportType: "candidate",
    unit: "%",
    description: "Percentage of candidates expecting to stay with their employer for 5 or more years.",
    dataPoints: [
      { year: 2023, value: 47, source: "2023 AAGE Candidate Survey", pageRef: "Executive Summary, p13" },
      { year: 2024, value: 45, source: "2024 AAGE Candidate Survey", pageRef: "Executive Summary, p13" },
      { year: 2025, value: 47, source: "2025 AAGE Candidate Survey", pageRef: "Executive Summary, p13" },
      { year: 2026, value: null, source: "2026 AAGE Candidate Survey", questionNote: "Not stated in summary report" },
    ],
  },
  {
    id: "apps_20plus",
    label: "Candidates Applying for 20+ Roles",
    category: "Application Volume",
    reportType: "candidate",
    unit: "%",
    description: "Percentage of candidates who applied for more than 20 graduate roles.",
    dataPoints: [
      { year: 2023, value: null, source: "2023 AAGE Candidate Survey" },
      { year: 2024, value: null, source: "2024 AAGE Candidate Survey", questionNote: "11% applied for 20+" },
      { year: 2025, value: 18, source: "2025 AAGE Candidate Survey", pageRef: "Executive Summary, p12" },
      { year: 2026, value: 28, source: "2026 AAGE Candidate Survey", pageRef: "Executive Summary, p12" },
    ],
    isNewQuestion: true,
    yearIntroduced: 2025,
    consistencyNote: "Comparable 2025-2026. 2024 figure (11%) uses similar but not identical question framing.",
  },
];

// Combined getter
export const allMetrics = [...employerMetrics, ...candidateMetrics];

export const getMetricsByCategory = (reportType: ReportType) => {
  const metrics = reportType === "employer" ? employerMetrics : candidateMetrics;
  const categories: Record<string, Metric[]> = {};
  metrics.forEach((m) => {
    if (!categories[m.category]) categories[m.category] = [];
    categories[m.category].push(m);
  });
  return categories;
};

export const years: SurveyYear[] = [2023, 2024, 2025, 2026];
