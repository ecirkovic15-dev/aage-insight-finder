import { useState, useRef } from "react";
import { ReportType, Metric, employerMetrics, candidateMetrics, graduateMetrics, internMetrics } from "@/data/aageData";
import { getAnecdotesForMetric } from "@/data/anecdotes";
import { SearchProvider } from "@/context/SearchContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { OverviewGrid } from "@/components/dashboard/OverviewGrid";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { ProvenancePanel } from "@/components/dashboard/ProvenancePanel";
import { DataTable } from "@/components/dashboard/DataTable";
import { AnecdoteCard } from "@/components/dashboard/AnecdoteCard";
import { HighlightText } from "@/components/dashboard/HighlightText";
import { WelcomeModal } from "@/components/dashboard/WelcomeModal";
import { SearchDialog } from "@/components/dashboard/SearchDialog";

const Index = () => {
  const [reportType, setReportType] = useState<ReportType>("employer");
  const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [showAnecdotes, setShowAnecdotes] = useState(true);

  const scrollToTop = () => {
    mainRef.current?.scrollTo({ top: 0 });
  };

  const handleReportTypeChange = (type: ReportType) => {
    setReportType(type);
    setSelectedMetric(null);
    scrollToTop();
  };

  const handleSelectMetric = (metric: Metric, switchToReport?: ReportType) => {
    if (switchToReport) setReportType(switchToReport);
    setSelectedMetric(metric);
    scrollToTop();
  };

  return (
    <SearchProvider>
      <div className="h-screen flex flex-col bg-background">
        <WelcomeModal
          onSelectReport={(type) => { setReportType(type); setSelectedMetric(null); }}
          onPrompt={() => setSearchDialogOpen(true)}
        />
        <SearchDialog
          open={searchDialogOpen}
          onClose={() => setSearchDialogOpen(false)}
          onSelectMetric={handleSelectMetric}
        />
        <Header
          reportType={reportType}
          onReportTypeChange={handleReportTypeChange}
          onSelectMetric={handleSelectMetric}
          searchInputRef={searchInputRef}
        />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            reportType={reportType}
            selectedMetricId={selectedMetric?.id ?? null}
            onSelectMetric={handleSelectMetric}
          />

          <main ref={mainRef} className="flex-1 min-w-0 overflow-y-auto p-6 bg-background">
            {!selectedMetric ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium">
                    {{ employer: "Employer Survey", candidate: "Candidate Survey", graduate: "Graduate Survey", intern: "Intern Survey" }[reportType]} Overview
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
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px]">
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <span className="w-2.5 h-2.5 bg-employer" />
                      <span>Employer data</span>
                    </div>
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <span className="w-2.5 h-2.5 bg-candidate" />
                      <span>Candidate data</span>
                    </div>
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <span className="px-1 py-0.5 text-[8px] font-mono bg-warning-light text-warning-badge">Δ</span>
                      <span>New or changed question</span>
                    </div>
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                      <span>Partial data (gaps in years)</span>
                    </div>
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <span className="px-1 py-0.5 text-[8px] font-mono bg-graduate-light text-graduate">VERIFIED</span>
                      <span>Data confirmed from PDF source</span>
                    </div>
                  </div>
                </div>

                {/* Confidentiality notice */}
                <div className="rounded-lg px-4 py-3 flex items-center gap-2 border overflow-hidden" style={{ backgroundColor: "hsl(0, 53%, 88%)", borderColor: "hsl(0, 40%, 82%)" }}>
                  <span className="text-xs shrink-0">🔒</span>
                  <p className="text-[10px] leading-tight min-w-0" style={{ color: "hsl(0, 40%, 35%)" }}>
                    <span className="font-medium" style={{ color: "hsl(0, 40%, 30%)" }}>Internal Use Only</span> — This dashboard references AAGE industry partner survey reports. Data must not be shared externally or reproduced outside of Prosple.
                  </p>
                </div>

                {/* All metrics as a reference table */}
                <div className="bg-surface border border-border rounded-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-border">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      All {{ employer: "Employer", candidate: "Candidate", graduate: "Graduate", intern: "Intern" }[reportType]} Metrics — Data Dictionary
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
                        {[...({ employer: employerMetrics, candidate: candidateMetrics, graduate: graduateMetrics, intern: internMetrics }[reportType])].sort((a, b) => {
                          const aIsSample = a.category === "Methodology" ? 1 : 0;
                          const bIsSample = b.category === "Methodology" ? 1 : 0;
                          if (aIsSample !== bIsSample) return bIsSample - aIsSample;
                          const aAvail = a.dataPoints.filter(d => d.value !== null).length;
                          const bAvail = b.dataPoints.filter(d => d.value !== null).length;
                          if (aAvail !== bAvail) return bAvail - aAvail;
                          return a.label.localeCompare(b.label);
                        }).map((m) => {
                          const available = m.dataPoints.filter((d) => d.value !== null).length;
                          return (
                            <tr
                              key={m.id}
                              className="hover:bg-muted/50 transition-snap cursor-pointer"
                              onClick={() => handleSelectMetric(m)}
                            >
                              <td className="px-4 py-2.5">
                                <HighlightText text={m.label} className="font-medium" />
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
                              <td className="px-3 py-2.5 whitespace-nowrap">
                                <span
                                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                                    available === 4
                                      ? "bg-graduate-light text-graduate"
                                      : available >= 2
                                      ? "bg-employer-light text-employer"
                                      : ""
                                  }`}
                                  style={available < 2 ? { backgroundColor: "hsl(0, 53%, 88%)", color: "hsl(0, 40%, 45%)" } : undefined}
                                >
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
                <div className="sticky top-0 z-20 relative bg-background border-b border-border -mx-6 px-6 py-3 shadow-sm flex items-center before:absolute before:-top-6 before:left-0 before:right-0 before:h-6 before:bg-background before:content-['']">
                  <button
                    onClick={() => setSelectedMetric(null)}
                    className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-snap flex items-center gap-1.5"
                  >
                    ← Back to overview
                  </button>
                </div>

                <TrendChart metric={selectedMetric} />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <ProvenancePanel metric={selectedMetric} />
                  <DataTable metric={selectedMetric} />
                </div>

                {/* Anecdotes from sales transcripts */}
                {(() => {
                  const metricAnecdotes = getAnecdotesForMetric(selectedMetric.id);
                  if (metricAnecdotes.length === 0) return null;
                  return (
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Real-World Anecdotes — From Customer Conversations
                          </h3>
                          <p className="text-[10px] text-muted-foreground mt-1">
                            Extracted from Prosple sales meeting transcripts that validate this trend.
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor="anecdote-toggle" className="text-[11px] text-muted-foreground cursor-pointer">
                            {showAnecdotes ? "Showing" : "Hidden"}
                          </Label>
                          <Switch
                            id="anecdote-toggle"
                            checked={showAnecdotes}
                            onCheckedChange={setShowAnecdotes}
                          />
                        </div>
                      </div>
                      {showAnecdotes && (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                          {metricAnecdotes.map((anecdote, i) => (
                            <AnecdoteCard key={anecdote.id} anecdote={anecdote} index={i} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
          </main>
        </div>
      </div>
    </SearchProvider>
  );
};

export default Index;
