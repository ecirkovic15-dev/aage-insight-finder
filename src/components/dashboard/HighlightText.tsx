import { memo, useMemo } from "react";
import { useSearch } from "@/context/SearchContext";

interface HighlightTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const HighlightText = memo(function HighlightText({
  text,
  className,
  as: Tag = "span",
}: HighlightTextProps) {
  const { query } = useSearch();

  const parts = useMemo(() => {
    if (!query || query.length < 2) return null;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    return text.split(regex);
  }, [text, query]);

  if (!parts) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={i}
            className="bg-accent/40 text-foreground rounded-sm px-0.5 ring-1 ring-accent/60"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </Tag>
  );
});
