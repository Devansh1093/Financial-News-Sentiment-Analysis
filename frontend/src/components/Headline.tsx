export default function RecentHeadlines({ data }: any) {

  if (!data) {
    return <p>Select a company.</p>;
  }

  return (
    <div className="space-y-4">
      {data.headlines.map((headline: any, index: number) => (
        <div
          key={index}
          className="rounded-lg border p-4"
        >
          <h3 className="font-medium">
            {headline.headline}
          </h3>

          <span>{headline.sentiment}</span>
        </div>
      ))}
    </div>
  );
}