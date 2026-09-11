import type { IProject } from "@/types/project.types";
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
import type { StrictOmit } from "@/lib/utils";

export type ProjectCreateData = StrictOmit<
  IProject,
  "id" | "createdAt" | "updatedAt" | "status"
>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (project: ProjectCreateData) => void;
}

export default function ProjectDialog({ open, onOpenChange, onSave }: Props) {
  const [draft, setDraft] = useState<ProjectCreateData>({
    name: "",
    description: "",
    dueDate: "",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{"Create New Project"}</DialogTitle>
          <DialogDescription>
            {`Please fill in the details below to create a new project. You can always edit these details later.`}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project name</Label>
            <Input
              id="project-name"
              value={draft.name}
              onChange={(event) =>
                setDraft({ ...draft, name: event.target.value })
              }
              placeholder="e.g. Website Redesign Project"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-description">Description</Label>
            <Textarea
              id="project-description"
              value={draft.description}
              onChange={(event) =>
                setDraft({ ...draft, description: event.target.value })
              }
              placeholder="Describe the project..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-date">Due date</Label>
            <Input
              id="project-date"
              type="date"
              value={draft.dueDate}
              onChange={(event) =>
                setDraft({ ...draft, dueDate: event.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={
              !draft.name.trim() ||
              !draft.description.trim() ||
              !draft.dueDate.trim()
            }
            onClick={() => {
              onSave(draft);
              onOpenChange(false);
            }}
          >
            Create project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
