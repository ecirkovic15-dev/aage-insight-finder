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
    <header className="bg-surface shrink-0">
      <div className="flex items-center justify-between px-8 py-5">
        <div className="flex items-baseline gap-5">
          <h1 className="font-display text-xl font-medium text-foreground italic">
            Top 100 Graduate Employers™
          </h1>
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
            Longitudinal Intelligence
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
