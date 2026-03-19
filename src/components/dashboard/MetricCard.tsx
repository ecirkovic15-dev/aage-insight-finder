import { Metric } from "@/data/aageData";
import { motion } from "framer-motion";
import { HighlightText } from "./HighlightText";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  metric: Metric;
  onClick: () => void;
  isSelected: boolean;
}

export function MetricCard({ metric, onClick, isSelected }: MetricCardProps) {
  const latestPoint = [...metric.dataPoints].reverse().find((d) => d.value !== null);
  const sortedWithValues = metric.dataPoints.filter((d) => d.value !== null);
  const prev = sortedWithValues.length >= 2 ? sortedWithValues[sortedWithValues.length - 2] : null;

  let changePercent: number | null = null;
  if (latestPoint?.value !== null && latestPoint?.value !== undefined && prev?.value) {
    changePercent = ((latestPoint.value - prev.value) / prev.value) * 100;
  }

  const formatValue = (val: number, unit: string) => {
    if (unit === "$") return `$${val.toLocaleString()}`;
    if (unit === "%") return `${val}%`;
    if (unit === "count" && val > 10000) return `${(val / 1000).toFixed(0)}K`;
    return val.toLocaleString();
  };

  return (
    <motion.button
      layout
      onClick={onClick}
      className={`w-full text-left p-5 bg-card rounded-lg border transition-snap ${
        isSelected
          ? "border-primary shadow-sm ring-2 ring-primary/15"
          : "border-border hover:border-primary/30 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <HighlightText text={metric.label} className="text-[13px] text-muted-foreground leading-snug" as="p" />
        {metric.isNewQuestion && (
          <span className="shrink-0 px-1.5 py-0.5 text-[10px] font-medium bg-accent/15 text-accent-foreground rounded">
            NEW {metric.yearIntroduced}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2.5">
        {latestPoint?.value !== null && latestPoint?.value !== undefined ? (
          <>
            <span className="font-mono-data text-2xl font-semibold text-foreground">
              {formatValue(latestPoint.value, metric.unit)}
            </span>
            {changePercent !== null && (
              <span className={`flex items-center gap-0.5 font-mono-data text-xs font-medium ${
                changePercent >= 0 ? "text-[hsl(150,50%,35%)]" : "text-destructive"
              }`}>
                {changePercent >= 0
                  ? <TrendingUp className="w-3 h-3" />
                  : <TrendingDown className="w-3 h-3" />
                }
                {changePercent >= 0 ? "+" : ""}
                {changePercent.toFixed(1)}%
              </span>
            )}
          </>
        ) : (
          <span className="font-mono-data text-sm text-muted-foreground">—</span>
        )}
      </div>
      <p className="mt-2 font-mono-data text-[11px] text-muted-foreground/70">
        {latestPoint ? `${latestPoint.year} · ${latestPoint.source}` : "No data"}
      </p>
      {metric.consistencyNote && (
        <HighlightText
          text={`⚠ ${metric.consistencyNote}`}
          className="mt-2 text-[10px] text-muted-foreground leading-relaxed block"
          as="p"
        />
      )}
    </motion.button>
  );
}
