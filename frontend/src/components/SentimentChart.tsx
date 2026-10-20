type SentimentSummary = Record<string, number>;

const sentiments = [
  { label: "Positive", color: "bg-emerald-500" },
  { label: "Neutral", color: "bg-amber-500" },
  { label: "Negative", color: "bg-rose-500" },
];

export default function SentimentChart({ summary }: { summary: SentimentSummary }) {
  const total = sentiments.reduce((count, item) => count + (summary[item.label] ?? 0), 0);

  if (total === 0) {
    return <p className="text-sm text-muted-foreground">No sentiment data available yet.</p>;
  }

  return (
    <div className="space-y-4" aria-label="Article sentiment breakdown">
      {sentiments.map(({ label, color }) => {
        const count = summary[label] ?? 0;
        const percentage = (count / total) * 100;

        return (
          <div key={label}>
            <div className="mb-1 flex justify-between text-sm">
              <span>{label}</span>
              <span className="text-muted-foreground">{count} ({Math.round(percentage)}%)</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className={`h-full rounded-full ${color}`} style={{ width: `${percentage}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
