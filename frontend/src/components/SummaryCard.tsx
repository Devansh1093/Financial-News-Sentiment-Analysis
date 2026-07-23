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
  return (
    <Card className="transition-shadow duration-300 hover:shadow-lg">
      <CardContent className="flex items-center justify-between p-6">

        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="rounded-full bg-cyan-100 p-3 text-cyan-600">
          {icon}
        </div>

      </CardContent>
    </Card>
  );
}