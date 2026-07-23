type CompanyCardProps = {
  name: string;
  ticker: string;
  onClick: () => void;
};

export default function CompanyCard({
  name,
  ticker,
  onClick,
}: CompanyCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border p-5 transition hover:shadow-lg hover:border-cyan-500"
    >
      <h3 className="font-semibold">{name}</h3>
      <p className="text-muted-foreground">{ticker}</p>
    </div>
  );
}