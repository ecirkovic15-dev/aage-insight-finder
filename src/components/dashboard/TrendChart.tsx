import { Metric, years } from "@/data/aageData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { motion } from "framer-motion";
import { HighlightText } from "./HighlightText";

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

  const barColor = metric.reportType === "employer" ? "hsl(219, 94%, 69%)" : "hsl(42, 97%, 65%)";
  const barColorMuted = metric.reportType === "employer" ? "hsl(219, 50%, 85%)" : "hsl(42, 50%, 85%)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-surface border border-border rounded-lg p-6"
    >
      <div className="flex items-start justify-between mb-1">
        <div>
          <HighlightText text={metric.label} className="text-base font-semibold text-foreground" as="h2" />
          <HighlightText text={metric.description} className="text-xs text-muted-foreground mt-1 max-w-[65ch] block" as="p" />
        </div>
        <span
          className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full ${
            metric.reportType === "employer"
              ? "bg-employer-light text-employer"
              : "bg-candidate-light text-candidate"
          }`}
        >
          {metric.reportType}
        </span>
      </div>

      {metric.consistencyNote && (
        <div className="mt-2 px-3 py-2 bg-warning-light border border-destructive/20 text-[11px] text-warning-badge font-mono rounded-md">
          <HighlightText text={`⚠ ${metric.consistencyNote}`} />
        </div>
      )}

      <div className="mt-6 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="1 3" stroke="hsl(0, 0%, 84%)" vertical={false} />
            <XAxis dataKey="year" tick={{ fontSize: 12, fontFamily: "Poppins, sans-serif" }} axisLine={{ stroke: "hsl(0, 0%, 84%)" }} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fontFamily: "Geist Mono, monospace" }}
              axisLine={false} tickLine={false}
              tickFormatter={(v) => {
                if (metric.unit === "$") return `$${(v / 1000).toFixed(0)}K`;
                if (metric.unit === "%") return `${v}%`;
                if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
                return v;
              }}
              domain={[0, "auto"]}
            />
            <Tooltip
              cursor={{ fill: "hsl(210, 15%, 94%)" }}
              content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-surface border border-border p-3 shadow-tight rounded-lg text-xs">
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
            <Bar dataKey="value" maxBarSize={60} radius={[4, 4, 0, 0]}>
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
