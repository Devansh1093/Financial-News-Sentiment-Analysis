type Headline = { headline: string; sentiment: string };

export default function RecentHeadlines({ data }: { data: Headline[] }) {
  if (data.length === 0) {
    return <p className="text-sm text-muted-foreground">No recent headlines found.</p>;
  }

  return (
    <div className="space-y-4">
      {data.map((headline, index) => (
        <div
          key={index}
          className="rounded-lg border p-4"
        >
          <h3 className="font-medium">
            {headline.headline}
          </h3>

          <span className="mt-2 inline-block text-sm text-muted-foreground">{headline.sentiment}</span>
        </div>
      ))}
    </div>
  );
}
