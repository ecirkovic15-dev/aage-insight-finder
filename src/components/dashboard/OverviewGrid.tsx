import { ReportType, employerMetrics, candidateMetrics, graduateMetrics, internMetrics, Metric } from "@/data/aageData";
import { MetricCard } from "./MetricCard";

interface OverviewGridProps {
  reportType: ReportType;
  selectedMetricId: string | null;
  onSelectMetric: (metric: Metric) => void;
}

export function OverviewGrid({ reportType, selectedMetricId, onSelectMetric }: OverviewGridProps) {
  const metricsMap: Record<ReportType, Metric[]> = { employer: employerMetrics, candidate: candidateMetrics, graduate: graduateMetrics, intern: internMetrics };
  const metrics = metricsMap[reportType];
  // Show top metrics in overview
  const topMetrics = metrics.slice(0, 6);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {topMetrics.map((metric) => (
        <MetricCard
          key={metric.id}
          metric={metric}
          isSelected={selectedMetricId === metric.id}
          onClick={() => onSelectMetric(metric)}
        />
      ))}
    </div>
  );
}
