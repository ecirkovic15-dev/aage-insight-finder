import { ReportType, getMetricsByCategory, Metric } from "@/data/aageData";
import { HighlightText } from "./HighlightText";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface SidebarProps {
  reportType: ReportType;
  selectedMetricId: string | null;
  onSelectMetric: (metric: Metric) => void;
}

export function Sidebar({ reportType, selectedMetricId, onSelectMetric }: SidebarProps) {
  const categories = getMetricsByCategory(reportType);
  const [collapsed, setCollapsed] = useState(false);
  const [width, setWidth] = useState(260);

  return (
    <aside
      style={!collapsed ? { width: `${width}px` } : undefined}
      className={`shrink-0 bg-card border-r border-border overflow-y-auto h-full transition-all duration-200 relative ${
        collapsed ? "w-10" : ""
      }`}
    >
      {/* Resize handle */}
      {!collapsed && (
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            const startX = e.clientX;
            const startWidth = width;
            const onMove = (ev: MouseEvent) => setWidth(Math.max(200, Math.min(500, startWidth + ev.clientX - startX)));
            const onUp = () => { document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); };
            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onUp);
          }}
          className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/20 transition-colors z-10"
        />
      )}
      <div className={`flex items-center border-b border-border ${collapsed ? "justify-center py-3" : "justify-between px-5 py-4"}`}>
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
      )}
    </aside>
  );
}