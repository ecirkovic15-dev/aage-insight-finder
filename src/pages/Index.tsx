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

        <main className="flex-1 overflow-y-auto p-8">
          {!selectedMetric ? (
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl text-foreground">
                  {reportType === "employer" ? "Employer Survey" : "Candidate Survey"} Overview
                </h2>
                <p className="text-sm text-muted-foreground mt-2 max-w-[60ch] leading-relaxed">
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
              <div className="rule-top pt-5">
                <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em] mb-4">
                  Data Integrity Legend
                </h3>
                <div className="flex flex-wrap gap-5 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-foreground" />
                    <span>Employer data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-accent" />
                    <span>Candidate data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 text-[9px] font-mono bg-warning-light text-warning-badge rounded-sm">Δ</span>
                    <span>New or changed question</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                    <span>Partial data (gaps in years)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 text-[9px] font-mono bg-graduate-light text-graduate rounded-sm">VERIFIED</span>
                    <span>Data confirmed from PDF source</span>
                  </div>
                </div>
              </div>

              {/* Data Dictionary */}
              <div className="bg-surface">
                <div className="rule-top" />
                <div className="px-5 py-4">
                  <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em]">
                    All {reportType === "employer" ? "Employer" : "Candidate"} Metrics — Data Dictionary
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b-2 border-foreground text-left">
                        <th className="px-5 py-2.5 font-semibold text-foreground">Metric</th>
                        <th className="px-4 py-2.5 font-mono text-foreground text-center">2023</th>
                        <th className="px-4 py-2.5 font-mono text-foreground text-center">2024</th>
                        <th className="px-4 py-2.5 font-mono text-foreground text-center">2025</th>
                        <th className="px-4 py-2.5 font-mono text-foreground text-center">2026</th>
                        <th className="px-4 py-2.5 font-semibold text-foreground">Status</th>
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
                            <td className="px-5 py-3">
                              <span className="font-medium">{m.label}</span>
                              {m.isNewQuestion && (
                                <span className="ml-2 text-[9px] font-mono px-1.5 py-0.5 bg-warning-light text-warning-badge rounded-sm">
                                  NEW {m.yearIntroduced}
                                </span>
                              )}
                            </td>
                            {([2023, 2024, 2025, 2026] as const).map((yr) => {
                              const dp = m.dataPoints.find((d) => d.year === yr);
                              const val = dp?.value;
                              return (
                                <td key={yr} className="px-4 py-3 text-center font-mono-data">
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
                            <td className="px-4 py-3">
                              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-sm ${
                                available === 4
                                  ? "bg-graduate-light text-graduate"
                                  : available >= 2
                                  ? "bg-employer-light text-foreground"
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
            <div className="space-y-8">
              <button
                onClick={() => setSelectedMetric(null)}
                className="text-xs text-muted-foreground hover:text-foreground transition-snap flex items-center gap-1 font-medium"
              >
                ← Back to overview
              </button>

              <TrendChart metric={selectedMetric} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
