import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/shadcn/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Progress, ProgressValue } from "@/components/ui/shadcn/progress";
import { InfoIcon } from "lucide-react";

interface Props {
  progress: number;
  completedTasks: number;
  totalTasks: number;
  dueDate: string;
}

export default function Overview({
  progress,
  completedTasks,
  totalTasks,
  dueDate,
}: Props) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="space-y-2 p-5">
            <p className="text-sm text-muted-foreground">Progress</p>
            <p className="font-heading text-2xl font-semibold">{progress}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-2 p-5">
            <p className="text-sm text-muted-foreground">Tasks complete</p>
            <p className="font-heading text-2xl font-semibold">
              {completedTasks} / {totalTasks}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-2 p-5">
            <p className="text-sm text-muted-foreground">Due date</p>
            <p className="wrap-break-word font-heading text-2xl font-semibold">
              {dueDate}
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Completion progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress}>
            <ProgressValue />
          </Progress>
        </CardContent>
      </Card>
      <Alert>
        <InfoIcon />
        <AlertTitle>Project pulse</AlertTitle>
        <AlertDescription>
          {progress >= 50
            ? "This project is making good progress. Keep the remaining tasks moving."
            : "This project is getting started. Add tasks and owners to create momentum."}
        </AlertDescription>
      </Alert>
    </>
  );
}
