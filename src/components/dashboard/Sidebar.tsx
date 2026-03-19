import { ReportType, getMetricsByCategory, Metric } from "@/data/aageData";

interface SidebarProps {
  reportType: ReportType;
  selectedMetricId: string | null;
  onSelectMetric: (metric: Metric) => void;
}

export function Sidebar({ reportType, selectedMetricId, onSelectMetric }: SidebarProps) {
  const categories = getMetricsByCategory(reportType);

  return (
    <aside className="w-[280px] shrink-0 bg-midnight overflow-y-auto h-full">
      <div className="px-4 py-4 border-b border-sidebar-border">
        <p className="text-[10px] font-mono uppercase tracking-widest text-primary-foreground/50">
          Metric Explorer
        </p>
      </div>
      <nav className="py-2">
        {Object.entries(categories).map(([category, metrics]) => (
          <div key={category}>
            <p className="px-4 pt-4 pb-1.5 text-[10px] font-mono uppercase tracking-wider text-primary-foreground/40">
              {category}
            </p>
            {metrics.map((metric) => {
              const hasGaps = metric.dataPoints.some((d) => d.value === null);
              return (
                <button
                  key={metric.id}
                  onClick={() => onSelectMetric(metric)}
                  className={`w-full text-left px-4 py-2 text-xs transition-snap flex items-center gap-2 rounded-md mx-0 ${
                    selectedMetricId === metric.id
                      ? "bg-sidebar-accent font-medium text-primary-foreground"
                      : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-sidebar-accent/50"
                  }`}
                >
                  <span className="truncate flex-1">{metric.label}</span>
                  {metric.isNewQuestion && (
                    <span className="shrink-0 text-[9px] font-mono px-1 py-0.5 bg-accent/20 text-accent rounded">
                      Δ
                    </span>
                  )}
                  {hasGaps && !metric.isNewQuestion && (
                    <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-poppy" />
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
