import { Metric } from "@/data/aageData";
import { motion } from "framer-motion";

interface MetricCardProps {
  metric: Metric;
  onClick: () => void;
  isSelected: boolean;
}

export function MetricCard({ metric, onClick, isSelected }: MetricCardProps) {
  const latestPoint = [...metric.dataPoints].reverse().find((d) => d.value !== null);
  const previousPoint = metric.dataPoints.find(
    (d) => d.value !== null && d.year !== latestPoint?.year
  );
  const sortedWithValues = metric.dataPoints.filter((d) => d.value !== null);
  const prev = sortedWithValues.length >= 2 ? sortedWithValues[sortedWithValues.length - 2] : null;

  let changePercent: number | null = null;
  if (latestPoint?.value && prev?.value) {
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
      className={`w-full text-left p-4 bg-surface border transition-snap ${
        isSelected
          ? "border-foreground shadow-tight"
          : "border-border hover:border-muted-foreground"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs text-muted-foreground leading-tight">{metric.label}</p>
        {metric.isNewQuestion && (
          <span className="shrink-0 px-1.5 py-0.5 text-[10px] font-mono bg-warning-light text-warning-badge">
            Δ {metric.yearIntroduced}
          </span>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        {latestPoint?.value ? (
          <>
            <span className="font-mono-data text-xl font-semibold text-foreground">
              {formatValue(latestPoint.value, metric.unit)}
            </span>
            {changePercent !== null && (
              <span
                className={`font-mono-data text-xs ${
                  changePercent >= 0 ? "text-graduate" : "text-destructive"
                }`}
              >
                {changePercent >= 0 ? "+" : ""}
                {changePercent.toFixed(1)}%
              </span>
            )}
          </>
        ) : (
          <span className="font-mono-data text-sm text-muted-foreground">—</span>
        )}
      </div>
      <p className="mt-1 font-mono-data text-[10px] text-muted-foreground">
        {latestPoint ? `${latestPoint.year} · ${latestPoint.source}` : "No data"}
      </p>
      {metric.consistencyNote && (
        <p className="mt-1 text-[10px] text-warning-badge leading-tight">
          ⚠ {metric.consistencyNote}
        </p>
      )}
    </motion.button>
  );
}
