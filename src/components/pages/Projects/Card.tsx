import { Badge } from "@/components/ui/shadcn/badge";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/shadcn/context-menu";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/shadcn/progress";
import { Separator } from "@/components/ui/shadcn/separator";
import type { IProject, TProjectStatus } from "@/types/project.types";
import {
  ActivityIcon,
  ArchiveIcon,
  InfoIcon,
  PinIcon,
  PinOffIcon,
  SquareCheckIcon,
} from "lucide-react";
import { cn } from "cn";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { getBadgeClassesByStatus, getProgressForProject } from "@/lib/utils";

interface ProjectCardProps {
  project: IProject;
  view?: "card" | "list";
  isSelected: boolean;
  selectedItemCount: number;
  onSelect: (projectId: string) => void;
  onArchive: (projectId: string) => void;
  onStatusChange: (projectId: string, status: IProject["status"]) => void;
  onPin: (projectId: string) => void;
  onUnpin: (projectId: string) => void;
}

function getProgressClasses(progress: number) {
  if (progress >= 75) {
    return "[&_[data-slot=progress-indicator]]:bg-emerald-500";
  }

  if (progress >= 40) {
    return "[&_[data-slot=progress-indicator]]:bg-amber-500";
  }

  return "[&_[data-slot=progress-indicator]]:bg-rose-500";
}

export default function ProjectCard({
  project,
  view = "card",
  isSelected,
  selectedItemCount,
  onSelect,
  onArchive,
  onStatusChange,
  onPin,
  onUnpin,
}: ProjectCardProps) {
  const navigate = useNavigate();

  const progress = getProgressForProject(project);
  const statusOptions = ["Active", "On Hold", "Completed"] as TProjectStatus[];

  const projectContextMenu = (
    <>
      <ContextMenuGroup>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <ActivityIcon />
            Change status
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            {statusOptions.map((status) => (
              <ContextMenuItem
                key={status}
                onClick={() => onStatusChange(project.id, status)}
              >
                {status}
              </ContextMenuItem>
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem onClick={() => onSelect(project.id)}>
          <SquareCheckIcon />
          {isSelected ? "Deselect" : "Select"}
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() =>
            project.pinned ? onUnpin(project.id) : onPin(project.id)
          }
        >
          {project.pinned ? <PinOffIcon /> : <PinIcon />}
          {project.pinned ? "Unpin" : "Pin on sidebar"}
        </ContextMenuItem>
        <ContextMenuItem>
          <InfoIcon />
          Properties
        </ContextMenuItem>
      </ContextMenuGroup>
      <ContextMenuSeparator />
      <ContextMenuGroup>
        <ContextMenuItem
          variant="destructive"
          onClick={() => onArchive(project.id)}
        >
          <ArchiveIcon />
          Archive
        </ContextMenuItem>
      </ContextMenuGroup>
    </>
  );

  function handleProjectCardClick() {
    if (selectedItemCount > 0) {
      onSelect(project.id);
    } else {
      navigate(`/project/${project.id}`);
    }
  }

  const projectCard = (
    <Card
      onClick={handleProjectCardClick}
      className={cn(
        "relative cursor-pointer hover:ring-1 hover:ring-accent-foreground/20",
        view === "card" && "flex flex-col justify-between",
        view === "list" && "gap-0",
        isSelected && "ring-2 ring-primary hover:ring-2 hover:ring-primary",
      )}
    >
      {selectedItemCount > 0 && (
        <div className="absolute left-3 top-4 z-10">
          <Checkbox
            checked={isSelected}
            aria-label={`${isSelected ? "Deselect" : "Select"} ${project.name}`}
          />
        </div>
      )}
      {view === "card" ? (
        <>
          <CardHeader
            className={cn(
              "flex justify-between items-center",
              selectedItemCount > 0 && "pl-10",
            )}
          >
            <CardTitle className="truncate" title={project.name}>
              {project.name}
            </CardTitle>

            <div className="flex items-center justify-between gap-3">
              <Badge
                className={getBadgeClassesByStatus(project.status)}
                variant="outline"
              >
                {project.status}
              </Badge>
            </div>
          </CardHeader>
          <Separator />
          <div
            className="flex h-full w-full flex-col gap-3 justify-between"
            draggable={false}
          >
            <CardContent className={"line-clamp-5"}>
              {project.description}
            </CardContent>
            <CardFooter className="w-full flex-col justify-between gap-2">
              <Progress
                value={progress}
                className={cn("w-full", getProgressClasses(progress))}
              >
                <ProgressLabel className="text-xs text-muted-foreground">
                  Progress
                </ProgressLabel>
                <ProgressValue className="text-xs" />
              </Progress>
              <p className="flex w-full justify-end text-xs text-muted-foreground">
                Updated:{" "}
                {formatDistanceToNow(project.updatedAt, { addSuffix: true })}
              </p>
            </CardFooter>
          </div>
        </>
      ) : (
        <>
          <CardHeader className="gap-3 pl-11 grid-cols-[minmax(0,1fr)_auto] items-start">
            <div className="min-w-0">
              <CardTitle className="truncate" title={project.name}>
                {project.name}
              </CardTitle>
              <CardDescription className="mt-2 line-clamp-2 max-w-3xl">
                {project.description}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                className={getBadgeClassesByStatus(project.status)}
                variant="outline"
              >
                {project.status}
              </Badge>
            </div>
          </CardHeader>
          <div className="grid gap-4 px-4 pb-4 pl-11 grid-cols-[minmax(180px,1fr)_auto] items-center">
            <div className="block">
              <Progress
                value={progress}
                className={getProgressClasses(progress)}
              >
                <ProgressLabel className="text-xs text-muted-foreground">
                  Progress
                </ProgressLabel>
                <ProgressValue className="text-xs" />
              </Progress>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground justify-end">
              <span>
                Updated:{" "}
                {formatDistanceToNow(project.updatedAt, { addSuffix: true })}
              </span>
            </div>
          </div>
        </>
      )}
    </Card>
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger render={projectCard} />
      <ContextMenuContent>{projectContextMenu}</ContextMenuContent>
    </ContextMenu>
  );
}
