import { useState } from "react";
import { ReportType, Metric, employerMetrics, candidateMetrics } from "@/data/aageData";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { OverviewGrid } from "@/components/dashboard/OverviewGrid";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { ProvenancePanel } from "@/components/dashboard/ProvenancePanel";
import { DataTable } from "@/components/dashboard/DataTable";

const Index = () => {
  const [reportType, setReportType] = useState<ReportType>("employer");
  const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null);

  const handleReportTypeChange = (type: ReportType) => {
    setReportType(type);
    setSelectedMetric(null);
  };

  const handleSelectMetric = (metric: Metric) => {
    setSelectedMetric(metric);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header reportType={reportType} onReportTypeChange={handleReportTypeChange} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          reportType={reportType}
          selectedMetricId={selectedMetric?.id ?? null}
          onSelectMetric={handleSelectMetric}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {!selectedMetric ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium">
                  {reportType === "employer" ? "Employer Survey" : "Candidate Survey"} Overview
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Select a metric below or from the sidebar to explore trends. All data sourced
                  directly from AAGE PDF reports.
                </p>
              </div>

              <OverviewGrid
                reportType={reportType}
                selectedMetricId={null}
                onSelectMetric={handleSelectMetric}
              />

              {/* Legend */}
              <div className="bg-surface border border-border rounded-lg p-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Data Integrity Legend
                </h3>
                <div className="flex flex-wrap gap-4 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-employer" />
                    <span>Employer data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-candidate" />
                    <span>Candidate data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 text-[9px] font-mono bg-warning-light text-warning-badge">Δ</span>
                    <span>New or changed question</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                    <span>Partial data (gaps in years)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 text-[9px] font-mono bg-graduate-light text-graduate">VERIFIED</span>
                    <span>Data confirmed from PDF source</span>
                  </div>
                </div>
              </div>

              {/* All metrics as a reference table */}
              <div className="bg-surface border border-border rounded-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-border">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    All {reportType === "employer" ? "Employer" : "Candidate"} Metrics — Data Dictionary
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="px-4 py-2 font-mono text-muted-foreground">Metric</th>
                        <th className="px-4 py-2 font-mono text-muted-foreground text-center">2023</th>
                        <th className="px-4 py-2 font-mono text-muted-foreground text-center">2024</th>
                        <th className="px-4 py-2 font-mono text-muted-foreground text-center">2025</th>
                        <th className="px-4 py-2 font-mono text-muted-foreground text-center">2026</th>
                        <th className="px-4 py-2 font-mono text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {(reportType === "employer" ? employerMetrics : candidateMetrics).map((m) => {
                        const available = m.dataPoints.filter((d) => d.value !== null).length;
                        return (
                          <tr
                            key={m.id}
                            className="hover:bg-muted/50 transition-snap cursor-pointer"
                            onClick={() => handleSelectMetric(m)}
                          >
                            <td className="px-4 py-2.5">
                              <span className="font-medium">{m.label}</span>
                              {m.isNewQuestion && (
                                <span className="ml-2 text-[9px] font-mono px-1 py-0.5 bg-warning-light text-warning-badge">
                                  NEW {m.yearIntroduced}
                                </span>
                              )}
                            </td>
                            {([2023, 2024, 2025, 2026] as const).map((yr) => {
                              const dp = m.dataPoints.find((d) => d.year === yr);
                              const val = dp?.value;
                              return (
                                <td key={yr} className="px-4 py-2.5 text-center font-mono-data">
                                  {val !== null && val !== undefined ? (
                                    m.unit === "$" ? `$${val.toLocaleString()}` :
                                    m.unit === "%" ? `${val}%` :
                                    val.toLocaleString()
                                  ) : (
                                    <span className="text-muted-foreground">—</span>
                                  )}
                                </td>
                              );
                            })}
                            <td className="px-4 py-2.5">
                              <span className={`text-[10px] font-mono px-1.5 py-0.5 ${
                                available === 4
                                  ? "bg-graduate-light text-graduate"
                                  : available >= 2
                                  ? "bg-employer-light text-employer"
                                  : "bg-warning-light text-warning-badge"
                              }`}>
                                {available}/4 years
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <button
                onClick={() => setSelectedMetric(null)}
                className="text-xs text-muted-foreground hover:text-foreground transition-snap flex items-center gap-1"
              >
                ← Back to overview
              </button>

              <TrendChart metric={selectedMetric} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProvenancePanel metric={selectedMetric} />
                <DataTable metric={selectedMetric} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
