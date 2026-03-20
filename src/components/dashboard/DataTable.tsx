import { Metric, years } from "@/data/aageData";
import { motion } from "framer-motion";
import { HighlightText } from "./HighlightText";

interface DataTableProps {
  metric: Metric;
}

export function DataTable({ metric }: DataTableProps) {
  const formatValue = (val: number | null, unit: string) => {
    if (val === null) return "—";
    if (unit === "$") return `$${val.toLocaleString()}`;
    if (unit === "%") return `${val}%`;
    return val.toLocaleString();
  };

  const formatYoY = (current: number | null, prev: number | null, unit: string): { label: string; isUp: boolean | null } => {
    if (current === null || prev === null) return { label: "—", isUp: null };
    const diff = current - prev;
    const isUp = diff >= 0;
    if (unit === "$") {
      const sign = isUp ? "+" : "−";
      return { label: `${sign}$${Math.abs(diff).toLocaleString()}`, isUp };
    }
    if (unit === "%") {
      const sign = isUp ? "+" : "−";
      return { label: `${sign}${Math.abs(diff).toFixed(1)}%`, isUp };
    }
    const pct = prev !== 0 ? ((diff / prev) * 100).toFixed(1) : null;
    if (pct !== null) {
      const sign = isUp ? "+" : "−";
      return { label: `${sign}${Math.abs(Number(pct))}%`, isUp };
    }
    return { label: "—", isUp: null };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.1 }}
      className="bg-card border border-border rounded-lg overflow-hidden"
    >
      <div className="px-5 py-3.5 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Raw Data</h3>
      </div>
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            <th className="text-left px-5 py-2.5 font-medium text-muted-foreground text-xs">Year</th>
            <th className="text-right px-5 py-2.5 font-medium text-muted-foreground text-xs">Value</th>
            <th className="text-right px-4 py-2.5 font-medium text-muted-foreground text-xs">YoY Δ</th>
            <th className="text-left px-5 py-2.5 font-medium text-muted-foreground text-xs">Source</th>
            <th className="text-left px-5 py-2.5 font-medium text-muted-foreground text-xs">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {years.map((year, idx) => {
            const dp = metric.dataPoints.find((d) => d.year === year);
            const prevYear = idx > 0 ? years[idx - 1] : null;
            const prevDp = prevYear ? metric.dataPoints.find((d) => d.year === prevYear) : null;
            const yoy = formatYoY(dp?.value ?? null, prevDp?.value ?? null, metric.unit);

            return (
              <tr key={year} className="hover:bg-muted/30 transition-snap">
                <td className="px-5 py-3 font-mono-data font-medium text-foreground">{year}</td>
                <td className="px-5 py-3 text-right font-mono-data font-semibold text-foreground">
                  {formatValue(dp?.value ?? null, metric.unit)}
                </td>
                <td className="px-4 py-3 text-right font-mono-data text-xs">
                  {yoy.isUp === null ? (
                    <span className="text-muted-foreground">—</span>
                  ) : (
                    <span className={`font-semibold px-1.5 py-0.5 rounded ${
                      yoy.isUp
                        ? "bg-[hsl(150,50%,93%)] text-[hsl(150,50%,32%)]"
                        : "bg-[hsl(0,53%,92%)] text-[hsl(0,40%,42%)]"
                    }`}>
                      {yoy.label}
                    </span>
                  )}
                </td>
                <td className="px-5 py-3 text-muted-foreground text-[12px] whitespace-nowrap">
                  <HighlightText text={dp?.source ?? "—"} />
                </td>
                <td className="px-5 py-3">
                  {dp?.value !== null && dp?.value !== undefined ? (
                    <span className="text-[10px] font-medium px-2 py-0.5 bg-[hsl(150,50%,93%)] text-[hsl(150,50%,35%)] rounded">
                      VERIFIED
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium px-2 py-0.5 bg-muted text-muted-foreground rounded">
                      {dp?.questionNote ? "CHANGED" : "MISSING"}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
}
