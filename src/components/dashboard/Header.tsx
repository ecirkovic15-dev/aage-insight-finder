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
    <header className="h-14 bg-midnight flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-semibold tracking-tight text-primary-foreground">
          AAGE Longitudinal Intelligence
        </h1>
        <span className="font-mono-data text-xs text-primary-foreground/60">2023–2026</span>
      </div>

      <div className="flex items-center gap-1 bg-sidebar-accent rounded-lg p-1">
        {types.map((t) => (
          <button
            key={t.key}
            onClick={() => onReportTypeChange(t.key)}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-snap ${
              reportType === t.key
                ? "bg-primary text-primary-foreground shadow-tight"
                : "text-primary-foreground/70 hover:text-primary-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </header>
  );
}
