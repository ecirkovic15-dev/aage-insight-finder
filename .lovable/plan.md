

## Plan: Flesh Out Employer Challenges Dataset

**Problem:** The "Competition for Graduates" metric buries rich sub-challenge data (diversity targets, offer reneges, etc.) inside `questionNote` strings. These should be standalone metrics so they're visible, chartable, and comparable.

**What we'll add to `src/data/aageData.ts`:**

### New Standalone Metrics (extracted from existing questionNotes)

1. **Diversity Targets (Challenge)** — `diversity_challenge`
   - 2023: 56% (from p57 questionNote)
   - 2024–2026: null (not yet extracted — can be filled from pages 14, 14, 71)

2. **Offer Reneges (Challenge)** — `reneges_challenge`
   - 2023: 52% (from p57 questionNote)
   - 2024–2026: null (to be filled from same pages)

3. **Offer Renege Rate** — `renege_rate`
   - Already referenced: 12% in 2026 questionNote on offer acceptance
   - 2023–2025: null, 2026: 12%

### Update Existing Metrics

4. **Rename** `competition_challenge` to be clearer: "Competition for Graduates (Recruitment Challenge)" with an updated description noting it's one of several tracked challenges.

5. **Update `consistencyNote`** on `competition_challenge` to reference the related challenge metrics for cross-referencing.

### Summary

- **File changed:** `src/data/aageData.ts` only
- **3 new metrics** added to the `employerMetrics` array under "Employer Challenges" category
- **1 metric renamed/updated** for clarity
- All new metrics use data already present in the codebase's questionNote fields
- Gaps marked as `null` with appropriate questionNotes indicating the page numbers where data can be found

### Technical Detail

Each new metric follows the existing `Metric` type structure with `id`, `label`, `category: "Employer Challenges"`, `reportType: "employer"`, `unit: "%"`, `description`, `dataPoints[]`, and optional `consistencyNote`.

