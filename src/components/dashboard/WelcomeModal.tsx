import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, MessageSquareText, X } from "lucide-react";

interface WelcomeModalProps {
  onBrowse: () => void;
  onPrompt: () => void;
}

export function WelcomeModal({ onBrowse, onPrompt }: WelcomeModalProps) {
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
            className="relative w-full max-w-md mx-4 bg-popover border border-border rounded-xl shadow-lg overflow-hidden"
          >
            {/* Close */}
            <button
              onClick={() => { setOpen(false); onBrowse(); }}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-snap"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="px-6 pt-6 pb-4 text-center">
              <h2 className="text-lg font-semibold text-foreground">
                Welcome to AAGE Intelligence
              </h2>
              <p className="text-xs text-muted-foreground mt-1.5">
                How would you like to explore the data?
              </p>
            </div>

            {/* Options */}
            <div className="px-6 pb-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => { setOpen(false); onBrowse(); }}
                className="group flex flex-col items-center gap-3 p-5 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-snap"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-snap">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Browse</p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Explore metrics, trends &amp; anecdotes freely
                  </p>
                </div>
              </button>

              <button
                onClick={() => { setOpen(false); onPrompt(); }}
                className="group flex flex-col items-center gap-3 p-5 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-snap"
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-snap">
                  <MessageSquareText className="w-5 h-5 text-accent" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Find Insights</p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Describe what your client needs &amp; we'll surface it
                  </p>
                </div>
              </button>
            </div>

            <div className="px-6 pb-4">
              <p className="text-[10px] text-muted-foreground text-center">
                💡 You can always use the search bar in the header to find insights later
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
