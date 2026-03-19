import { Anecdote } from "@/data/anecdotes";
import { motion } from "framer-motion";
import { MessageSquareQuote, Star } from "lucide-react";

interface AnecdoteCardProps {
  anecdote: Anecdote;
  index?: number;
}

export function AnecdoteCard({ anecdote, index = 0 }: AnecdoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="bg-surface border border-border rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <MessageSquareQuote className="w-3.5 h-3.5 text-accent shrink-0" />
          <h4 className="text-xs font-semibold truncate">{anecdote.title}</h4>
        </div>
        {anecdote.featured && (
          <span className="shrink-0 flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-mono bg-accent/20 text-accent rounded">
            <Star className="w-2.5 h-2.5" />
            FEATURED
          </span>
        )}
      </div>

      {/* Quote */}
      <div className="px-4 py-3 bg-muted/30">
        <blockquote className="text-[11px] leading-relaxed italic text-foreground/90 border-l-2 border-accent pl-3">
          "{anecdote.quote}"
        </blockquote>
      </div>

      {/* Context & Relevance */}
      <div className="px-4 py-3 space-y-2">
        <div>
          <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">Context</span>
          <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{anecdote.context}</p>
        </div>
        <div>
          <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">Why it matters</span>
          <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{anecdote.relevance}</p>
        </div>
      </div>

      {/* Source */}
      <div className="px-4 py-2 border-t border-border bg-muted/20 flex items-center justify-between">
        <span className="text-[10px] font-mono text-muted-foreground">
          📋 {anecdote.source.meeting}
        </span>
        <span className="text-[10px] font-mono text-muted-foreground">
          {anecdote.source.date}
        </span>
      </div>
    </motion.div>
  );
}
