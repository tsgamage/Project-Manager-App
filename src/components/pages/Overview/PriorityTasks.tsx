import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import { ArrowRightIcon } from "lucide-react";

const tasks = [
  { title: "Complete system landing page wireframes", project: "Project 1", tone: "red", completed: false },
  { title: "Design dashboard prototype and UI flow", project: "Project 1", tone: "orange", completed: false },
  { title: "Review feedback on authentication module with team", project: "Project 2", tone: "green", completed: true },
  { title: "Set up initial Tailwind structure for repo", project: "Project 3", tone: "orange", completed: false },
  { title: "Weekly sync with product manager & design team", project: "Project 2", tone: "red", completed: false },
];

const toneStyles = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  green: "bg-emerald-500",
};

export default function PriorityTasks() {
  return (
    <Card className="rounded-lg">
      <CardHeader className="flex grid-cols-[1fr_auto] items-center gap-2 border-b px-4 py-3">
        <CardTitle className="text-base">Today&apos;s Priority</CardTitle>
        <Badge variant="secondary">7 tasks</Badge>
      </CardHeader>
      <CardContent className="p-0">
        <div>
          {tasks.map((task) => (
            <div
              key={task.title}
              className="flex min-h-12 items-center gap-3 border-b px-4 py-2 last:border-b-0"
            >
              <Checkbox
                defaultChecked={task.completed}
                aria-label={`Mark ${task.title} complete`}
                className={task.completed ? "border-emerald-500 text-emerald-500" : ""}
              />
              <span
                className={`min-w-0 flex-1 truncate text-xs ${
                  task.completed
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                }`}
              >
                {task.title}
              </span>
              <Badge className="bg-blue-600 text-white hover:bg-blue-600" variant="default">
                {task.project}
              </Badge>
              <span className={`size-1.5 shrink-0 rounded-full ${toneStyles[task.tone as keyof typeof toneStyles]}`} />
            </div>
          ))}
        </div>
        <Button variant="link" className="px-4 py-3 text-xs text-blue-400">
          View all tasks <ArrowRightIcon />
        </Button>
      </CardContent>
    </Card>
  );
}