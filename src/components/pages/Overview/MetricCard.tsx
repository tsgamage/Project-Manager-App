import { Card, CardContent } from "@/components/ui/shadcn/card";
import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  iconClassName: string;
}

export default function MetricCard({
  label,
  value,
  icon: Icon,
  iconClassName,
}: MetricCardProps) {
  return (
    <Card className="gap-0 rounded-lg py-0">
      <CardContent className="flex items-start justify-between p-4">
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="font-heading text-2xl font-semibold tracking-tight">
            {value}
          </p>
        </div>
        <div className={`rounded-full p-2 ${iconClassName}`}>
          <Icon className="size-4" />
        </div>
      </CardContent>
    </Card>
  );
}