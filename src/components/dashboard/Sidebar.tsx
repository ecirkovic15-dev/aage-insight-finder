import { ReportType, getMetricsByCategory, Metric } from "@/data/aageData";
import { HighlightText } from "./HighlightText";

interface SidebarProps {
  reportType: ReportType;
  selectedMetricId: string | null;
  onSelectMetric: (metric: Metric) => void;
}

export function Sidebar({ reportType, selectedMetricId, onSelectMetric }: SidebarProps) {
  const categories = getMetricsByCategory(reportType);

  return (
    <aside className="w-[260px] shrink-0 bg-card border-r border-border overflow-y-auto h-full">
      <div className="px-5 py-4 border-b border-border">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          Metric Explorer
        </p>
      </div>
      <nav className="py-2 px-2">
        {Object.entries(categories).map(([category, metrics]) => (
          <div key={category}>
            <p className="px-3 pt-5 pb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {category}
            </p>
            {metrics.map((metric) => {
              const hasGaps = metric.dataPoints.some((d) => d.value === null);
              const isActive = selectedMetricId === metric.id;
              return (
                <button
                  key={metric.id}
                  onClick={() => onSelectMetric(metric)}
                  className={`w-full text-left px-3 py-2 text-[13px] transition-snap flex items-center gap-2 rounded-md ${
                    isActive
                      ? "bg-sidebar-accent font-medium text-foreground border-l-[3px] border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <HighlightText text={metric.label} className="truncate flex-1" />
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
