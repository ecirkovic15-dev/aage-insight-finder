import { ReportType } from "@/data/aageData";
import prospleLogo from "@/assets/prosple-logo.jpg";

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
    <header className="bg-surface shrink-0">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-6">
          <img src={prospleLogo} alt="Prosple" className="h-7 w-auto" />
          <div className="h-5 w-px bg-border" />
          <h1 className="font-display text-lg font-medium text-foreground italic">
            Top 100 Graduate Employers™
          </h1>
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-[0.15em]">
            Longitudinal Intelligence · 2023–2026
          </span>
        </div>

        <div className="flex items-center gap-1">
          {types.map((t) => (
            <button
              key={t.key}
              onClick={() => onReportTypeChange(t.key)}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-snap ${
                reportType === t.key
                  ? "bg-foreground text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="rule-top mx-8" />
    </header>
  );
}
