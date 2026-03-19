import { Metric, years } from "@/data/aageData";
import { motion } from "framer-motion";

interface ProvenancePanelProps {
  metric: Metric;
}

export function ProvenancePanel({ metric }: ProvenancePanelProps) {
  const formatValue = (val: number | null, unit: string) => {
    if (val === null) return "—";
    if (unit === "$") return `$${val.toLocaleString()}`;
    if (unit === "%") return `${val}%`;
    if (unit === "count" && val > 10000) return `${(val / 1000).toFixed(1)}K`;
    return val.toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-surface border border-border rounded-lg"
    >
      <div className="px-4 py-3 border-b border-border">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Question Provenance
        </h3>
      </div>
      <div className="divide-y divide-border">
        {years.map((year) => {
          const dp = metric.dataPoints.find((d) => d.year === year);
          if (!dp) return null;
          return (
            <div key={year} className="px-4 py-3">
              <div className="flex items-baseline justify-between">
                <span className="font-mono-data text-sm font-medium">{year}</span>
                <span className="font-mono-data text-sm font-semibold">
                  {formatValue(dp.value, metric.unit)}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">{dp.source}</p>
              {dp.pageRef && (
                <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                  📄 {dp.pageRef}
                </p>
              )}
              {dp.questionNote && (
                <p className="mt-1 text-[10px] text-muted-foreground italic leading-relaxed">
                  "{dp.questionNote}"
                </p>
              )}
              {dp.value === null && (
                <span className="inline-block mt-1 px-1.5 py-0.5 text-[9px] font-mono bg-warning-light text-warning-badge rounded">
                  DATA NOT AVAILABLE
                </span>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
