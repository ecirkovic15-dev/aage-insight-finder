import { Metric, years } from "@/data/aageData";
import { motion } from "framer-motion";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className="bg-surface border border-border"
    >
      <div className="px-4 py-3 border-b border-border">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Raw Data
        </h3>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left px-4 py-2 font-mono text-muted-foreground font-medium">Year</th>
            <th className="text-right px-4 py-2 font-mono text-muted-foreground font-medium">Value</th>
            <th className="text-left px-4 py-2 font-mono text-muted-foreground font-medium">Source</th>
            <th className="text-left px-4 py-2 font-mono text-muted-foreground font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {years.map((year) => {
            const dp = metric.dataPoints.find((d) => d.year === year);
            return (
              <tr key={year} className="hover:bg-muted/50 transition-snap">
                <td className="px-4 py-2.5 font-mono-data font-medium">{year}</td>
                <td className="px-4 py-2.5 text-right font-mono-data font-semibold">
                  {formatValue(dp?.value ?? null, metric.unit)}
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">{dp?.source ?? "—"}</td>
                <td className="px-4 py-2.5">
                  {dp?.value !== null ? (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-graduate-light text-graduate">
                      VERIFIED
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-warning-light text-warning-badge">
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
