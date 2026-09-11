import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { cn, formatDate, getBadgeClassesByStatus } from "@/lib/utils";
import type { IProject, TProjectStatus } from "@/types/project.types";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

export type UpdateProjectData = {
  name: IProject["name"];
  description: IProject["description"];
  dueDate: IProject["dueDate"];
  status: IProject["status"];
};

interface Props {
  project: UpdateProjectData;
  onSave: (pData: UpdateProjectData) => void;
}

const projectStatus = ["Active", "On Hold", "Completed"] as TProjectStatus[];

export default function ProjectDetails({ project, onSave }: Props) {
  const [draft, setDraft] = useState<UpdateProjectData>(project);
  const [editing, setEditing] = useState(false);

  const save = () => {
    onSave(draft);
    setEditing(false);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/20 sm:flex sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle>Project details</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            A clear snapshot of the project brief and schedule.
          </p>
        </div>
        <Button
          variant={"outline"}
          size="sm"
          onClick={() => setEditing((prev) => !prev)}
        >
          {editing ? (
            "Cancel editing"
          ) : (
            <>
              <PencilIcon /> Edit details
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6 p-5 sm:p-7">
        {editing ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="project-title">Project title</Label>
              <Input
                id="project-title"
                value={draft.name}
                onChange={(event) =>
                  setDraft({ ...draft, name: event.target.value })
                }
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
                className="min-h-28 resize-y"
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="project-due-date">Due date</Label>
                <Input
                  id="project-due-date"
                  type="date"
                  value={draft.dueDate}
                  onChange={(event) =>
                    setDraft({ ...draft, dueDate: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-status">Status</Label>
                <Select
                  value={draft.status}
                  onValueChange={(value) =>
                    setDraft((prev) => ({
                      ...prev,
                      status: value as TProjectStatus,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {projectStatus.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              disabled={
                !draft.name.trim() ||
                !draft.description.trim() ||
                !draft.dueDate
              }
              onClick={save}
            >
              Save details
            </Button>
          </>
        ) : (
          <div className="space-y-7">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Project title
              </p>
              <h2 className="wrap-break-word text-2xl font-semibold tracking-tight">
                {project.name}
              </h2>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Description
              </p>
              <p className="wrap-break-word whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                {project.description || "No project description yet."}
              </p>
            </div>
            <div className="grid gap-4 border-t pt-5 sm:grid-cols-2">
              <div className="rounded-lg bg-muted/30 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Due date
                </p>
                <p className="mt-2 text-sm font-medium">
                  {formatDate(project.dueDate)}
                </p>
              </div>
              <div className="rounded-lg bg-muted/30 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Status
                </p>
                <Badge
                  className={cn(
                    getBadgeClassesByStatus(project.status),
                    "mt-2",
                  )}
                  variant="outline"
                >
                  {project.status}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
