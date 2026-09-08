import { Badge } from "@/components/ui/shadcn/badge";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Progress, ProgressValue } from "@/components/ui/shadcn/progress";

export interface Project {
  name: string;
  description: string;
  status: "Active" | "On Hold" | "Completed";
  progress: number;
  updated: string;
  members: string[];
}

interface ProjectCardProps {
  project: Project;
  list?: boolean;
}

const statusStyles = {
  Active: "border-emerald-500/20 bg-emerald-500/15 text-emerald-500",
  "On Hold": "border-amber-500/20 bg-amber-500/15 text-amber-500",
  Completed: "border-blue-500/20 bg-blue-500/15 text-blue-400",
};

export default function ProjectCard({
  project,
  list = false,
}: ProjectCardProps) {
  return (
    <Card className={list ? "gap-0" : "min-h-48"}>
      <CardHeader className={list ? "gap-4 sm:grid-cols-[1fr_auto]" : "gap-3"}>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="truncate">{project.name}</CardTitle>
          <Badge className={statusStyles[project.status]} variant="outline">
            {project.status}
          </Badge>
        </div>
        <CardDescription className={list ? "max-w-2xl" : "min-h-10"}>
          {project.description}
        </CardDescription>
      </CardHeader>
      <div
        className={
          list
            ? "grid gap-4 px-4 pb-4 sm:grid-cols-[minmax(180px,1fr)_auto] sm:items-center"
            : "mt-auto px-4 pb-4"
        }
      >
        <Progress value={project.progress} className="gap-2">
          <div className="flex items-center text-xs text-muted-foreground">
            <span>Progress</span>
            <ProgressValue className="text-xs" />
          </div>
        </Progress>
        <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground sm:justify-end">
          <span>Updated {project.updated}</span>
        </div>
      </div>
    </Card>
  );
}
