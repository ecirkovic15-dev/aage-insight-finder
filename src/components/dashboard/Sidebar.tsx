import { ReportType, getMetricsByCategory, Metric } from "@/data/aageData";
import { HighlightText } from "./HighlightText";
import { useState, useEffect } from "react";
import { PanelLeftClose, PanelLeftOpen, ChevronDown, ChevronRight } from "lucide-react";

interface SidebarProps {
  reportType: ReportType;
  selectedMetricId: string | null;
  onSelectMetric: (metric: Metric) => void;
}

export function Sidebar({ reportType, selectedMetricId, onSelectMetric }: SidebarProps) {
  const categories = getMetricsByCategory(reportType);
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const handler = (e: MediaQueryListEvent) => setCollapsed(e.matches);
    setCollapsed(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <aside
      className={`shrink-0 bg-card border-r border-border h-full transition-all duration-200 flex flex-col ${
        collapsed ? "w-10" : "w-[220px]"
      }`}
    >
      <div
        className={`shrink-0 flex items-center border-b border-border ${
          collapsed ? "justify-center py-3" : "justify-between px-4 py-3.5"
        }`}
      >
        {!collapsed && (
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            Metric Explorer
          </p>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-muted-foreground hover:text-foreground transition-snap"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {!collapsed && (
        <nav className="py-2 px-2 overflow-y-auto flex-1">
          {Object.entries(categories).map(([category, metrics]) => {
            const isCategoryCollapsed = !!collapsedCategories[category];
            const isActiveCategory = metrics.some((m) => m.id === selectedMetricId);
            return (
              <div key={category}>
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center gap-1.5 px-2 pt-4 pb-1.5 text-left group"
                >
                  {isCategoryCollapsed
                    ? <ChevronRight className="w-3 h-3 text-muted-foreground/60 group-hover:text-muted-foreground transition-snap shrink-0" />
                    : <ChevronDown className="w-3 h-3 text-muted-foreground/60 group-hover:text-muted-foreground transition-snap shrink-0" />
                  }
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-snap flex-1 text-left">
                    {category}
                  </span>
                  <span className={`shrink-0 text-[9px] font-mono-data px-1.5 py-0.5 rounded transition-snap ${
                    isActiveCategory
                      ? "bg-primary/15 text-primary font-medium"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {metrics.length}
                  </span>
                </button>
                {!isCategoryCollapsed && metrics.map((metric) => {
                  const hasGaps = metric.dataPoints.some((d) => d.value === null);
                  const isActive = selectedMetricId === metric.id;
                  return (
                    <button
                      key={metric.id}
                      onClick={() => onSelectMetric(metric)}
                      className={`w-full text-left px-3 py-1.5 text-[11.5px] transition-snap flex items-center gap-2 rounded-md ${
                        isActive
                          ? "bg-primary/10 font-semibold text-primary border-l-[3px] border-primary pl-[9px]"
                          : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                      }`}
                    >
                      <HighlightText text={metric.label} className="flex-1" />
                      {metric.isNewQuestion && (
                        <span className="shrink-0 text-[9px] font-mono px-1 py-0.5 bg-accent/20 text-accent-foreground rounded">
                          Δ
                        </span>
                      )}
                      {hasGaps && !metric.isNewQuestion && (
                        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-poppy/70" />
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>
      )}
    </aside>
  );
}
