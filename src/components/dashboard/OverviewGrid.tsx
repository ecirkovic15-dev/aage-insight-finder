import { ReportType, Metric, getMetricsByCategory } from "@/data/aageData";
import { MetricCard } from "./MetricCard";
import { motion, AnimatePresence } from "framer-motion";

interface OverviewGridProps {
  reportType: ReportType;
  selectedMetricId: string | null;
  onSelectMetric: (metric: Metric) => void;
}

export function OverviewGrid({ reportType, selectedMetricId, onSelectMetric }: OverviewGridProps) {
  const categories = getMetricsByCategory(reportType);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={reportType}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="space-y-8"
      >
        {Object.entries(categories).map(([category, metrics]) => (
          <div key={category}>
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                {category}
              </h3>
              <span className="shrink-0 text-[10px] font-mono-data bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                {metrics.length}
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {metrics.map((metric) => (
                <MetricCard
                  key={metric.id}
                  metric={metric}
                  isSelected={selectedMetricId === metric.id}
                  onClick={() => onSelectMetric(metric)}
                />
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
