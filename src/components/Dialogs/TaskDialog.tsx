import type { ITask, TTaskPriority } from "@/types/project.types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/shadcn/dialog";
import { Label } from "../ui/shadcn/label";
import { Input } from "../ui/shadcn/input";
import { Textarea } from "../ui/shadcn/textarea";
import { Button } from "../ui/shadcn/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/shadcn/select";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryName: string;
  task?: ITask;
  onSave: (task: Omit<ITask, "id" | "completed">) => void;
}

export default function TaskDialog({
  open,
  onOpenChange,
  categoryName,
  task,
  onSave,
}: Props) {
  const [draft, setDraft] = useState({
    name: task?.name ?? "",
    description: task?.description ?? "",
    dueDate: task?.dueDate ?? "",
    priority: (task?.priority ?? "Medium") as TTaskPriority,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? "Edit task" : "Add task"}</DialogTitle>
          <DialogDescription>
            {task ? "Update this task." : `Add a task to ${categoryName}.`}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task-title">Task title</Label>
            <Input
              id="task-title"
              value={draft.name}
              onChange={(event) =>
                setDraft({ ...draft, name: event.target.value })
              }
              placeholder="e.g. Review Student Route"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="task-description">Description</Label>
            <Textarea
              id="task-description"
              value={draft.description}
              onChange={(event) =>
                setDraft({ ...draft, description: event.target.value })
              }
              placeholder="What needs to be done?"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="task-date">Due date</Label>
            <Input
              id="task-date"
              type="date"
              value={draft.dueDate}
              onChange={(event) =>
                setDraft({ ...draft, dueDate: event.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Priority</Label>
            <Select
              value={draft.priority}
              onValueChange={(priority) =>
                setDraft({ ...draft, priority: priority as TTaskPriority })
              }
            >
              <SelectTrigger aria-label="Task priority" className={"w-full"}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={!draft.name.trim()}
            onClick={() => {
              onSave(draft);
              onOpenChange(false);
            }}
          >
            Save task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
