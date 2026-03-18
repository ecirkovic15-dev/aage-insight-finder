import { ReportType, getMetricsByCategory, Metric } from "@/data/aageData";

interface SidebarProps {
  reportType: ReportType;
  selectedMetricId: string | null;
  onSelectMetric: (metric: Metric) => void;
}

export function Sidebar({ reportType, selectedMetricId, onSelectMetric }: SidebarProps) {
  const categories = getMetricsByCategory(reportType);

  return (
    <aside className="w-[280px] shrink-0 bg-surface border-r border-border overflow-y-auto h-full">
      <div className="px-4 py-4 border-b border-border">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          Metric Explorer
        </p>
      </div>
      <nav className="py-2">
        {Object.entries(categories).map(([category, metrics]) => (
          <div key={category}>
            <p className="px-4 pt-4 pb-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              {category}
            </p>
            {metrics.map((metric) => {
              const hasGaps = metric.dataPoints.some((d) => d.value === null);
              return (
                <button
                  key={metric.id}
                  onClick={() => onSelectMetric(metric)}
                  className={`w-full text-left px-4 py-2 text-xs transition-snap flex items-center gap-2 ${
                    selectedMetricId === metric.id
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <span className="truncate flex-1">{metric.label}</span>
                  {metric.isNewQuestion && (
                    <span className="shrink-0 text-[9px] font-mono px-1 py-0.5 bg-warning-light text-warning-badge">
                      Δ
                    </span>
                  )}
                  {hasGaps && !metric.isNewQuestion && (
                    <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-warning" />
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
