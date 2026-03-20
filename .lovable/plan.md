

## Plan: Reorder "All Metrics" Table

**What changes:**

In `src/pages/Index.tsx`, sort the metrics array before rendering in the Data Dictionary table. The sort order will be:

1. **Survey Sample Size first** — any metric with `category === "Methodology"` (or id containing `sample_size`) goes to the top
2. **Then by status descending** — metrics with more data points (4/4) come before those with fewer (1/4)
3. **Then alphabetically by label** within the same status group

**Implementation:**

Replace the direct `.map()` on the metrics array (line ~137) with a sorted copy:

```ts
{[...metricsForReport].sort((a, b) => {
  // Sample size first
  const aIsSample = a.category === "Methodology" ? 1 : 0;
  const bIsSample = b.category === "Methodology" ? 1 : 0;
  if (aIsSample !== bIsSample) return bIsSample - aIsSample;
  
  // Then by data availability (descending)
  const aAvail = a.dataPoints.filter(d => d.value !== null).length;
  const bAvail = b.dataPoints.filter(d => d.value !== null).length;
  if (aAvail !== bAvail) return bAvail - aAvail;
  
  // Then alphabetical
  return a.label.localeCompare(b.label);
}).map((m) => { ... })}
```

**Files to edit:** `src/pages/Index.tsx` only (1 file, ~5 lines changed around the `.map()` call).

