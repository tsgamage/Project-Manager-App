import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import {
  Progress,
  ProgressValue,
} from "@/components/ui/shadcn/progress";
import { ArrowRightIcon } from "lucide-react";

const projects = [
  { name: "Acme Marketing Platform", progress: 65, completed: "13/20 tasks completed" },
  { name: "Customer Support Portal", progress: 40, completed: "8/20 tasks completed" },
  { name: "Internal Analytics Tool", progress: 90, completed: "18/20 tasks completed" },
];

export default function ProjectSummary() {
  return (
    <Card className="rounded-lg">
      <CardHeader className="flex grid-cols-[1fr_auto] items-center gap-2 border-b px-4 py-3">
        <CardTitle className="text-base">Projects</CardTitle>
        <span className="text-xs text-muted-foreground">3 Active</span>
      </CardHeader>
      <CardContent className="space-y-2 p-4">
        {projects.map((project) => (
          <div key={project.name} className="space-y-3 rounded-lg border p-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="truncate text-xs font-medium">{project.name}</h3>
              <span className="text-xs text-muted-foreground">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="gap-0">
              <ProgressValue className="sr-only" />
            </Progress>
            <p className="text-xs text-muted-foreground">{project.completed}</p>
          </div>
        ))}
        <Button variant="link" className="px-0 pt-2 text-xs text-muted-foreground">
          View all projects <ArrowRightIcon />
        </Button>
      </CardContent>
    </Card>
  );
}