import { ReportType } from "@/data/aageData";

interface HeaderProps {
  reportType: ReportType;
  onReportTypeChange: (type: ReportType) => void;
}

export function Header({ reportType, onReportTypeChange }: HeaderProps) {
  const types: { key: ReportType; label: string }[] = [
    { key: "employer", label: "Employer" },
    { key: "candidate", label: "Candidate" },
  ];

  return (
    <header className="h-14 bg-surface border-b border-border flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-semibold tracking-tight">
          AAGE Longitudinal Intelligence
        </h1>
        <span className="font-mono-data text-xs text-muted-foreground">2023–2026</span>
      </div>

      <div className="flex items-center gap-1 border border-border">
        {types.map((t) => (
          <button
            key={t.key}
            onClick={() => onReportTypeChange(t.key)}
            className={`px-4 py-1.5 text-xs font-medium transition-snap ${
              reportType === t.key
                ? t.key === "employer"
                  ? "bg-employer text-primary-foreground"
                  : "bg-candidate text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </header>
  );
}
