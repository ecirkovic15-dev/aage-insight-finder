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
  const sortedWithValues = metric.dataPoints.filter((d) => d.value !== null);
  const latestPoint = sortedWithValues.length > 0 ? sortedWithValues[sortedWithValues.length - 1] : null;
  const prevPoint = sortedWithValues.length >= 2 ? sortedWithValues[sortedWithValues.length - 2] : null;
  const earliestPoint = sortedWithValues.length >= 2 ? sortedWithValues[0] : null;
  const hasGaps = metric.dataPoints.some((d) => d.value === null);

  let changePercent: number | null = null;
  if (latestPoint?.value !== null && latestPoint?.value !== undefined && earliestPoint?.value) {
    changePercent = ((latestPoint.value - earliestPoint.value) / earliestPoint.value) * 100;
  }

  const formatValue = (val: number, unit: string) => {
    if (unit === "$") return `$${val.toLocaleString()}`;
    if (unit === "%") return `${val}%`;
    if (unit === "count" && val > 10000) return `${(val / 1000).toFixed(0)}K`;
    return val.toLocaleString();
  };

  const isUp = changePercent !== null && changePercent >= 0;
  const noData = latestPoint === null;

  return (
    <motion.button
      layout
      onClick={onClick}
      className={`w-full text-left p-5 rounded-lg border transition-snap ${
        isSelected
          ? "border-primary shadow-sm ring-2 ring-primary/15 bg-card"
          : noData
          ? "border-dashed border-border/60 bg-muted/30 hover:border-primary/30 hover:bg-card"
          : hasGaps
          ? "border-dashed border-border bg-card hover:border-primary/30 hover:shadow-sm"
          : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <HighlightText
          text={metric.label}
          className={`text-[13px] font-medium leading-snug ${noData ? "text-muted-foreground" : "text-foreground"}`}
          as="p"
        />
        {metric.isNewQuestion && (
          <span className="shrink-0 px-1.5 py-0.5 text-[10px] font-medium bg-accent/15 text-accent-foreground rounded">
            NEW {metric.yearIntroduced}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2.5">
        {latestPoint?.value !== null && latestPoint?.value !== undefined ? (
          <>
            <span className={`font-mono-data text-3xl font-semibold ${noData ? "text-muted-foreground" : "text-foreground"}`}>
              {formatValue(latestPoint.value, metric.unit)}
            </span>
            {changePercent !== null && (
              <span
                className={`flex items-center gap-0.5 font-mono-data text-xs font-semibold px-1.5 py-0.5 rounded ${
                  isUp
                    ? "bg-[hsl(150,50%,93%)] text-[hsl(150,50%,32%)]"
                    : "bg-[hsl(0,53%,92%)] text-[hsl(0,40%,42%)]"
                }`}
              >
                {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {changePercent >= 0 ? "+" : ""}
                {changePercent.toFixed(1)}%
              </span>
            )}
          </>
        ) : (
          <span className="font-mono-data text-sm text-muted-foreground italic">No data available</span>
        )}
      </div>

      <div className="mt-1.5 flex items-center gap-2">
        <p className={`font-mono-data text-[11px] ${noData ? "text-muted-foreground/50" : "text-muted-foreground/70"}`}>
          {latestPoint
            ? earliestPoint && earliestPoint.year !== latestPoint.year
              ? `${earliestPoint.year}–${latestPoint.year} trend`
              : `${latestPoint.year} data`
            : "No data"}
        </p>
        {hasGaps && !noData && (
          <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-poppy/70" title="Partial data — gaps in some years" />
        )}
      </div>

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
