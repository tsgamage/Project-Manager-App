import { Badge } from "@/components/ui/shadcn/badge";
import { Card } from "@/components/ui/shadcn/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/shadcn/collapsible";
import { ChevronDownIcon, MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import { Checkbox } from "@/components/ui/shadcn/checkbox";

type TaskStatus = "Today" | "Completed" | "Upcoming" | "Missed";

export interface Task {
  title: string;
  category: string;
  status: TaskStatus;
  date: string;
  completed?: boolean;
}

interface TaskGroupProps {
  name: string;
  taskCount: number;
  accent: string;
  tasks: Task[];
}

const statusStyles: Record<TaskStatus, string> = {
  Today: "border-orange-500/20 bg-orange-500/15 text-orange-500",
  Completed: "border-emerald-500/20 bg-emerald-500/15 text-emerald-500",
  Upcoming: "border-blue-500/20 bg-blue-500/15 text-blue-400",
  Missed: "border-red-500/20 bg-red-500/15 text-red-500",
};

export default function TaskGroup({
  name,
  taskCount,
  accent,
  tasks,
}: TaskGroupProps) {
  return (
    <Collapsible defaultOpen>
      <Card className="gap-0 overflow-hidden rounded-lg py-0">
        <CollapsibleTrigger className="flex h-10 w-full items-center gap-2 bg-muted/80 px-4 text-left transition-colors hover:bg-muted">
          <ChevronDownIcon className="size-4 transition-transform data-closed:-rotate-90" />
          <span className="font-heading text-sm font-semibold">{name}</span>
          <span className="ml-auto text-xs text-muted-foreground">
            {taskCount} tasks
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div>
            {tasks.map((task, index) => {
              const showCategory = index === 0 || tasks[index - 1].category !== task.category;

              return (
                <div key={task.title}>
                  {showCategory && (
                    <div className="flex items-center gap-2 border-t px-4 py-2 text-[11px] font-medium uppercase text-muted-foreground">
                      <span className={`size-2 rounded-full ${accent}`} />
                      {task.category}
                    </div>
                  )}
                  <div
                    className={`flex min-h-12 items-center gap-3 border-t px-4 py-2.5 ${
                      index % 2 === 0 ? "bg-card" : "bg-muted/20"
                    }`}
                  >
                    <Checkbox
                      defaultChecked={task.completed}
                      aria-label={`Mark ${task.title} complete`}
                      className={task.completed ? "border-emerald-500 text-emerald-500" : ""}
                    />
                    <span
                      className={`min-w-0 flex-1 truncate text-sm ${
                        task.completed
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }`}
                    >
                      {task.title}
                    </span>
                    <Badge className={statusStyles[task.status]} variant="outline">
                      {task.status}
                    </Badge>
                    <span className="hidden w-12 text-right text-xs text-muted-foreground sm:inline">
                      {task.date}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`More options for ${task.title}`}
                    >
                      <MoreHorizontalIcon />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}