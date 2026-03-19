import { Anecdote } from "@/data/anecdotes";
import { motion } from "framer-motion";
import { MessageSquareQuote, Star } from "lucide-react";
import { HighlightText } from "./HighlightText";

interface AnecdoteCardProps {
  anecdote: Anecdote;
  index?: number;
}

export function AnecdoteCard({ anecdote, index = 0 }: AnecdoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.06 }}
      className="bg-card border border-border rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-border flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <MessageSquareQuote className="w-4 h-4 text-primary shrink-0" />
          <HighlightText text={anecdote.title} className="text-[13px] font-semibold text-foreground truncate" as="h4" />
        </div>
        {anecdote.featured && (
          <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-accent/15 text-accent-foreground rounded">
            <Star className="w-2.5 h-2.5" />
            FEATURED
          </span>
        )}
      </div>

      {/* Quote */}
      <div className="px-5 py-4 bg-muted/20">
        <blockquote className="text-[12px] leading-relaxed italic text-foreground/85 border-l-2 border-primary/40 pl-3">
          "<HighlightText text={anecdote.quote} />"
        </blockquote>
      </div>

      {/* Context & Relevance */}
      <div className="px-5 py-4 space-y-3">
        <div>
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Context</span>
          <HighlightText text={anecdote.context} className="text-[12px] text-muted-foreground mt-1 leading-relaxed block" as="p" />
        </div>
        <div>
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Why it matters</span>
          <HighlightText text={anecdote.relevance} className="text-[12px] text-muted-foreground mt-1 leading-relaxed block" as="p" />
        </div>
      </div>

      {/* Source */}
      <div className="px-5 py-2.5 border-t border-border bg-muted/15 flex items-center justify-between">
        <HighlightText text={`📋 ${anecdote.source.meeting}`} className="text-[11px] text-muted-foreground" />
        <span className="text-[11px] text-muted-foreground">
          {anecdote.source.date}
        </span>
      </div>
    </motion.div>
  );
}
