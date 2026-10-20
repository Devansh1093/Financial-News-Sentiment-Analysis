import { Card, CardContent } from "@/components/ui/card";

interface SummaryCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

export default function SummaryCard({
  title,
  value,
  description,
  icon,
}: SummaryCardProps) {
  const valueSize = value.length > 8 ? "text-xl" : value.length > 5 ? "text-2xl" : "text-3xl";

  return (
    <Card className="transition-shadow duration-300 hover:shadow-lg">
      <CardContent className="flex items-center justify-between p-6">

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <h2 className={`mt-2 break-words font-bold leading-tight ${valueSize}`}>
            {value}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="ml-3 shrink-0 rounded-full bg-cyan-100 p-3 text-cyan-600">
          {icon}
        </div>

      </CardContent>
    </Card>
  );
}
