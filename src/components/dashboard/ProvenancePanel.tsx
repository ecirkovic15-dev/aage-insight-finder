import { Metric, years } from "@/data/aageData";
import { motion } from "framer-motion";
import { HighlightText } from "./HighlightText";

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
      transition={{ duration: 0.25, delay: 0.05 }}
      className="bg-card border border-border rounded-lg"
    >
      <div className="px-5 py-3.5 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">
          Question Provenance
        </h3>
      </div>
      <div className="divide-y divide-border">
        {years.map((year) => {
          const dp = metric.dataPoints.find((d) => d.year === year);
          if (!dp) return null;
          return (
            <div key={year} className="px-5 py-3.5">
              <div className="flex items-baseline justify-between">
                <span className="font-mono-data text-sm font-medium text-foreground">{year}</span>
                <span className="font-mono-data text-sm font-semibold text-foreground">
                  {formatValue(dp.value, metric.unit)}
                </span>
              </div>
              <HighlightText text={dp.source} className="mt-1.5 text-[12px] text-muted-foreground block leading-relaxed" as="p" />
              {dp.pageRef && (
                <HighlightText text={`📄 ${dp.pageRef}`} className="text-[11px] font-mono text-muted-foreground/70 mt-1 block" as="p" />
              )}
              {dp.questionNote && (
                <HighlightText text={`"${dp.questionNote}"`} className="mt-1.5 text-[11px] text-muted-foreground italic leading-relaxed block" as="p" />
              )}
              {dp.value === null && (
                <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-medium bg-muted text-muted-foreground rounded">
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
