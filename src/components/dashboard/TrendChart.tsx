import { Metric, years } from "@/data/aageData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

interface TrendChartProps {
  metric: Metric;
}

export function TrendChart({ metric }: TrendChartProps) {
  const data = years.map((year) => {
    const dp = metric.dataPoints.find((d) => d.year === year);
    return {
      year: year.toString(),
      value: dp?.value ?? null,
      hasData: dp?.value !== null,
      source: dp?.source ?? "",
      questionNote: dp?.questionNote ?? "",
    };
  });

  const formatValue = (val: number) => {
    if (metric.unit === "$") return `$${val.toLocaleString()}`;
    if (metric.unit === "%") return `${val}%`;
    if (metric.unit === "count" && val > 10000) return `${(val / 1000).toFixed(0)}K`;
    return val.toLocaleString();
  };

  // Near-black for employer, sandy gold for candidate
  const barColor = metric.reportType === "employer" ? "hsl(222, 47%, 14%)" : "hsl(42, 97%, 65%)";
  const barColorMuted = metric.reportType === "employer" ? "hsl(222, 20%, 80%)" : "hsl(42, 50%, 85%)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-surface p-8"
    >
      <div className="rule-top pt-6 mb-1">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-xl text-foreground">{metric.label}</h2>
            <p className="text-xs text-muted-foreground mt-2 max-w-[65ch] leading-relaxed">{metric.description}</p>
          </div>
          <span
            className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
              metric.reportType === "employer"
                ? "bg-foreground text-primary-foreground"
                : "bg-accent text-accent-foreground"
            }`}
          >
            {metric.reportType}
          </span>
        </div>
      </div>

      {metric.consistencyNote && (
        <div className="mt-3 px-3 py-2 bg-warning-light text-[11px] text-warning-badge font-mono rounded-sm">
          ⚠ {metric.consistencyNote}
        </div>
      )}

      <div className="mt-8 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="1 3" stroke="hsl(220, 10%, 90%)" vertical={false} />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 12, fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
              axisLine={{ stroke: "hsl(222, 47%, 14%)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fontFamily: "Geist Mono, monospace" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => {
                if (metric.unit === "$") return `$${(v / 1000).toFixed(0)}K`;
                if (metric.unit === "%") return `${v}%`;
                if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
                return v;
              }}
              domain={[0, "auto"]}
            />
            <Tooltip
              cursor={{ fill: "hsl(220, 15%, 96%)" }}
              content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-surface border border-border p-3 shadow-card rounded-md text-xs">
                    <p className="font-mono-data font-semibold">
                      {d.year}: {d.value !== null ? formatValue(d.value) : "No data"}
                    </p>
                    <p className="text-muted-foreground mt-1">{d.source}</p>
                    {d.questionNote && (
                      <p className="text-warning-badge mt-1 max-w-[250px]">{d.questionNote}</p>
                    )}
                  </div>
                );
              }}
            />
            <Bar dataKey="value" maxBarSize={56} radius={[2, 2, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.hasData ? barColor : "transparent"}
                  stroke={entry.hasData ? barColor : barColorMuted}
                  strokeWidth={entry.hasData ? 0 : 1}
                  strokeDasharray={entry.hasData ? "0" : "4 2"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
