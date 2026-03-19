import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, UserCheck, GraduationCap, Briefcase, MessageSquareText, X } from "lucide-react";
import { ReportType } from "@/data/aageData";

interface WelcomeModalProps {
  onSelectReport: (type: ReportType) => void;
  onPrompt: () => void;
}

const reportOptions: { key: ReportType; label: string; desc: string; icon: typeof Users }[] = [
  { key: "employer", label: "Employer", desc: "Hiring plans, salaries & program design", icon: Briefcase },
  { key: "candidate", label: "Candidate", desc: "Attraction drivers, channels & expectations", icon: UserCheck },
  { key: "graduate", label: "Graduate", desc: "NPS, retention, rotation & development", icon: GraduationCap },
  { key: "intern", label: "Intern", desc: "Conversion, satisfaction & program formats", icon: Users },
];

export function WelcomeModal({ onSelectReport, onPrompt }: WelcomeModalProps) {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg mx-4 bg-popover border border-border rounded-xl shadow-lg overflow-hidden"
          >
            <button
              onClick={() => { setOpen(false); onSelectReport("employer"); }}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-snap"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="px-6 pt-6 pb-4 text-center">
              <h2 className="text-lg font-semibold text-foreground">
                Welcome to AAGE Intelligence
              </h2>
              <p className="text-xs text-muted-foreground mt-1.5">
                Choose a survey to explore, or search across all data
              </p>
              <div className="mt-3 mx-auto max-w-sm px-3 py-2 rounded-md bg-warning-light border border-warning/30">
                <p className="text-[10px] font-medium text-warning-badge leading-relaxed">
                  ⚠ INTERNAL USE ONLY — This tool references AAGE industry partner reports. Data must not be shared externally or reproduced outside Prosple.
                </p>
              </div>
            </div>

            {/* Report options */}
            <div className="px-6 grid grid-cols-2 gap-3">
              {reportOptions.map(({ key, label, desc, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => { setOpen(false); onSelectReport(key); }}
                  className="group flex flex-col items-center gap-2.5 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-snap"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-snap">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="px-6 py-3 flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Prompt option */}
            <div className="px-6 pb-5">
              <button
                onClick={() => { setOpen(false); onPrompt(); }}
                className="group w-full flex items-center gap-3 p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-snap"
              >
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-snap shrink-0">
                  <MessageSquareText className="w-4 h-4 text-accent" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Find Insights</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Describe what your client needs &amp; we'll surface it across all surveys
                  </p>
                </div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
