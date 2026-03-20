import { Metric, years } from "@/data/aageData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList,
} from "recharts";
import { motion } from "framer-motion";
import { HighlightText } from "./HighlightText";

interface TrendChartProps {
  metric: Metric;
}

const REPORT_BADGE: Record<string, { bg: string; text: string }> = {
  employer:  { bg: "bg-primary/10", text: "text-primary" },
  candidate: { bg: "bg-accent/10", text: "text-accent-foreground" },
  graduate:  { bg: "bg-[hsl(150,50%,93%)]", text: "text-[hsl(150,50%,35%)]" },
  intern:    { bg: "bg-muted", text: "text-muted-foreground" },
};

interface CustomLabelProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  value?: number | null;
  formatValue: (v: number) => string;
  chartHeight: number;
}

function CustomBarLabel({ x = 0, y = 0, width = 0, value, formatValue, chartHeight }: CustomLabelProps) {
  if (value === null || value === undefined) {
    return (
      <text
        x={x + width / 2}
        y={chartHeight / 2 + 8}
        textAnchor="middle"
        fill="hsl(218, 13%, 62%)"
        fontSize={10}
        fontFamily="Geist Mono, monospace"
      >
        No data
      </text>
    );
  }
  return (
    <text
      x={x + width / 2}
      y={y - 6}
      textAnchor="middle"
      fill="hsl(220, 61%, 23%)"
      fontSize={10}
      fontWeight={500}
      fontFamily="Geist Mono, monospace"
    >
      {formatValue(value)}
    </text>
  );
}

export function TrendChart({ metric }: TrendChartProps) {
  const data = years.map((year) => {
    const dp = metric.dataPoints.find((d) => d.year === year);
    return {
      year: year.toString(),
      value: dp?.value ?? null,
      hasData: dp?.value !== null && dp?.value !== undefined,
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

  const barColor = "hsl(219, 94%, 69%)";
  const barColorMuted = "hsl(220, 13%, 90%)";
  const badge = REPORT_BADGE[metric.reportType] ?? REPORT_BADGE.employer;

  const CHART_HEIGHT = 280;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <div className="flex items-start justify-between mb-1">
        <div>
          <HighlightText text={metric.label} className="text-lg font-semibold text-foreground" as="h2" />
          <HighlightText text={metric.description} className="text-[13px] text-muted-foreground mt-1 block leading-relaxed" as="p" />
        </div>
        <span className={`px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded-full ${badge.bg} ${badge.text}`}>
          {metric.reportType}
        </span>
      </div>

      {metric.consistencyNote && (
        <div className="mt-3 px-3 py-2.5 bg-muted/60 border border-border text-[11px] text-muted-foreground rounded-md leading-relaxed">
          <HighlightText text={`⚠ ${metric.consistencyNote}`} />
        </div>
      )}

      <div className="mt-6" style={{ height: CHART_HEIGHT }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 24, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 92%)" vertical={false} />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 12, fontFamily: "Poppins, sans-serif", fill: "hsl(218, 13%, 46%)" }}
              axisLine={{ stroke: "hsl(220, 13%, 90%)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fontFamily: "Geist Mono, monospace", fill: "hsl(218, 13%, 46%)" }}
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
              cursor={{ fill: "hsl(220, 20%, 96%)" }}
              content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-card border border-border p-3 shadow-sm rounded-lg text-xs">
                    <p className="font-mono-data font-semibold text-foreground">
                      {d.year}: {d.value !== null ? formatValue(d.value) : "No data"}
                    </p>
                    <p className="text-muted-foreground mt-1">{d.source}</p>
                    {d.questionNote && (
                      <p className="text-muted-foreground mt-1 max-w-[250px] italic">{d.questionNote}</p>
                    )}
                  </div>
                );
              }}
            />
            <Bar dataKey="value" maxBarSize={56} radius={[6, 6, 0, 0]}>
              <LabelList
                dataKey="value"
                content={(props) => (
                  <CustomBarLabel
                    {...props}
                    formatValue={formatValue}
                    chartHeight={CHART_HEIGHT - 34}
                  />
                )}
              />
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
