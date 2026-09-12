import { Button } from "@/components/ui/shadcn/button";
import { Badge } from "@/components/ui/shadcn/badge";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import type { ITask } from "@/types/project.types";
import { CalendarDaysIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { getTaskPriority, getTaskStatus } from "@/lib/utils";

interface Props {
  task: ITask;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskCard({ task, onToggle, onEdit, onDelete }: Props) {
  return (
    <div
      key={task.id}
      className="flex min-w-0 max-w-full flex-col gap-3 overflow-hidden border-b p-4 last:border-b-0 sm:flex-row sm:items-start"
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={onToggle}
        aria-label={`Mark ${task.name} complete`}
        className="mt-1"
      />
      <div className="min-w-0 max-w-full flex-1 overflow-hidden">
        <p
          className={`max-w-full whitespace-normal wrap-anywhere break-normal text-sm font-medium ${task.completed ? "text-muted-foreground line-through" : ""}`}
        >
          {task.name}
        </p>
        {task.description && (
          <p className="mt-1 max-w-full textpre whitespace-pre-wrap wrap-anywhere break-normal text-xs leading-5 text-muted-foreground">
            {task.description}
          </p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-[10px]">
            {getTaskStatus(task)}
          </Badge>
          <Badge variant="secondary" className="text-[10px]">
            {getTaskPriority(task)} priority
          </Badge>
          {task.dueDate ? (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <CalendarDaysIcon className="size-3.5" /> {task.dueDate}
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex shrink-0 gap-1 self-end sm:self-start">
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Edit ${task.name}`}
          onClick={onEdit}
        >
          <PencilIcon />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Delete ${task.name}`}
          onClick={onDelete}
        >
          <Trash2Icon />
        </Button>
      </div>
    </div>
  );
}
