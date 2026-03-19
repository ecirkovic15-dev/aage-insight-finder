import { ReportType, getMetricsByCategory, Metric } from "@/data/aageData";

interface SidebarProps {
  reportType: ReportType;
  selectedMetricId: string | null;
  onSelectMetric: (metric: Metric) => void;
}

export function Sidebar({ reportType, selectedMetricId, onSelectMetric }: SidebarProps) {
  const categories = getMetricsByCategory(reportType);

  return (
    <aside className="w-[260px] shrink-0 bg-surface border-r border-border overflow-y-auto h-full">
      <div className="px-5 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          Metric Explorer
        </p>
      </div>
      <div className="mx-5 rule-top" />
      <nav className="py-3 px-3">
        {Object.entries(categories).map(([category, metrics]) => (
          <div key={category} className="mb-2">
            <p className="px-2 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {category}
            </p>
            {metrics.map((metric) => {
              const hasGaps = metric.dataPoints.some((d) => d.value === null);
              return (
                <button
                  key={metric.id}
                  onClick={() => onSelectMetric(metric)}
                  className={`w-full text-left px-3 py-2 text-[13px] transition-snap flex items-center gap-2 rounded-md ${
                    selectedMetricId === metric.id
                      ? "bg-foreground text-primary-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="truncate flex-1">{metric.label}</span>
                  {metric.isNewQuestion && (
                    <span className={`shrink-0 text-[9px] font-mono px-1.5 py-0.5 rounded ${
                      selectedMetricId === metric.id
                        ? "bg-accent/30 text-accent"
                        : "bg-warning-light text-warning-badge"
                    }`}>
                      Δ
                    </span>
                  )}
                  {hasGaps && !metric.isNewQuestion && (
                    <span className={`shrink-0 w-1.5 h-1.5 rounded-full ${
                      selectedMetricId === metric.id ? "bg-accent" : "bg-warning"
                    }`} />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
