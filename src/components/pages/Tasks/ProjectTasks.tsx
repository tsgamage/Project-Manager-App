import DeleteDialog from "@/components/Dialogs/DeleteDialog";
import TaskCategoryDialog from "@/components/Dialogs/TaskCategoryDialog";
import TaskDialog from "@/components/Dialogs/TaskDialog";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/shadcn/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import {
  formatDate,
  getBadgeClassesByStatus,
  type StrictOmit,
} from "@/lib/utils";
import type {
  IProject,
  ITask,
  ITaskCategory,
  TProjectStatus,
} from "@/types/project.types";
import {
  ActivityIcon,
  ArchiveIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  CirclePlusIcon,
  MoreHorizontalIcon,
  PencilIcon,
  PlusCircleIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import TaskCard from "../ProjectView/TaskCard";
import { Separator } from "@/components/ui/shadcn/separator";
import TaskNotFound from "@/components/Not Found/TaskNotFound";
import TaskCategoryNotFound from "@/components/Not Found/TaskCategoryNotFound";

interface Props {
  project: IProject;
  taskCategories: ITaskCategory[];
  open: boolean;
  openCategories: Record<string, boolean>;
  onOpenChange: (open: boolean) => void;
  onCategoryOpenChange: (categoryId: string, open: boolean) => void;
  onAddCategory: (data: StrictOmit<ITaskCategory, "id" | "tasks">) => void;
  onEditCategory: (
    categoryId: string,
    data: StrictOmit<ITaskCategory, "id" | "tasks">,
  ) => void;
  onDeleteCategory: (categoryId: string) => void;
  onAddTask: (
    categoryId: string,
    data: StrictOmit<ITask, "id" | "completed">,
  ) => void;
  onToggleTask: (categoryId: string, taskId: string) => void;
  onEditTask: (
    categoryId: string,
    taskId: string,
    data: StrictOmit<ITask, "id" | "completed">,
  ) => void;
  onDeleteTask: (categoryId: string, taskId: string) => void;
  onStatusChange: (status: TProjectStatus) => void;
  onArchive: () => void;
}

export default function ProjectTasks({
  project,
  taskCategories,
  open,
  openCategories,
  onOpenChange,
  onCategoryOpenChange,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  onAddTask,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  onArchive,
}: Props) {
  const taskCount =
    project.taskCategories?.reduce(
      (total, category) => total + (category.tasks?.length ?? 0),
      0,
    ) ?? 0;
  const [categoryDialog, setCategoryDialog] = useState<{
    open: boolean;
    category?: ITaskCategory;
  }>({ open: false });
  const [taskDialog, setTaskDialog] = useState<{
    open: boolean;
    category?: ITaskCategory;
    task?: ITask;
  }>({ open: false });
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    categoryId?: string;
    taskId?: string;
  }>({ open: false });

  return (
    <>
      <Collapsible open={open} onOpenChange={onOpenChange}>
        <Card className="gap-0 overflow-hidden rounded-xl py-0 shadow-sm">
          <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 py-4 px-5">
            <CollapsibleTrigger className="flex min-w-0 items-start gap-3 text-left">
              <ChevronDownIcon className="mt-1 size-4 shrink-0 transition-transform data-closed:-rotate-90" />
              <div className="min-w-0">
                <CardTitle className="whitespace-normal wrap-anywhere text-base leading-6">
                  {project.name}
                </CardTitle>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <Badge className={getBadgeClassesByStatus(project.status)}>
                    {project.status}
                  </Badge>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDaysIcon className="size-3.5" />
                    {formatDate(project.dueDate)}
                  </span>
                </div>
              </div>
            </CollapsibleTrigger>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {taskCount} {taskCount === 1 ? "task" : "tasks"}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`More actions for ${project.name}`}
                    />
                  }
                >
                  <MoreHorizontalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <ActivityIcon />
                      Status
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      {(
                        ["Active", "On Hold", "Completed"] as TProjectStatus[]
                      ).map((status) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={() => onStatusChange(status)}
                        >
                          {status}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onArchive} variant="destructive">
                    <ArchiveIcon /> Archive
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CollapsibleContent>
            <Separator />
            <div className="p-4">
              <Button
                variant="secondary"
                className="mb-3 w-full justify-center cursor-pointer"
                onClick={() => setCategoryDialog({ open: true })}
              >
                <CirclePlusIcon /> Add new task category
              </Button>

              {taskCategories.length === 0 && <TaskCategoryNotFound />}

              {taskCategories.length > 0 &&
                taskCategories.map((category) => (
                  <Collapsible
                    key={category.id}
                    open={openCategories[category.id] ?? false}
                    onOpenChange={(value) =>
                      onCategoryOpenChange(category.id, value)
                    }
                  >
                    <div className="mb-3 overflow-hidden rounded-lg border ">
                      <div className="flex items-center gap-2 bg-muted/30 px-3 py-2">
                        <CollapsibleTrigger className="flex min-w-0 flex-1 items-center gap-2 text-left">
                          <ChevronDownIcon className="size-4 shrink-0 transition-transform data-closed:-rotate-90" />
                          <span className="min-w-0 whitespace-normal wrap-anywhere text-sm font-semibold">
                            {category.name}
                          </span>
                          <Badge
                            variant="secondary"
                            className="ml-auto shrink-0"
                          >
                            {project.taskCategories?.find(
                              (item) => item.id === category.id,
                            )?.tasks?.length ?? 0}
                          </Badge>
                        </CollapsibleTrigger>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Edit ${category.name}`}
                          onClick={() =>
                            setCategoryDialog({ open: true, category })
                          }
                        >
                          <PencilIcon />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Delete ${category.name}`}
                          onClick={() =>
                            setDeleteDialog({
                              open: true,
                              categoryId: category.id,
                            })
                          }
                        >
                          <Trash2Icon />
                        </Button>
                      </div>
                      <CollapsibleContent>
                        <Separator />
                        {!category.tasks?.length ? (
                          <TaskNotFound />
                        ) : (
                          category.tasks.map((task) => (
                            <TaskCard
                              key={task.id}
                              task={task}
                              onToggle={() =>
                                onToggleTask(category.id, task.id)
                              }
                              onEdit={() =>
                                setTaskDialog({ open: true, category, task })
                              }
                              onDelete={() =>
                                setDeleteDialog({
                                  open: true,
                                  categoryId: category.id,
                                  taskId: task.id,
                                })
                              }
                            />
                          ))
                        )}

                        <Button
                          variant="secondary"
                          className="w-full rounded-none cursor-pointer"
                          onClick={() =>
                            setTaskDialog({ open: true, category })
                          }
                        >
                          <PlusCircleIcon /> Add new task to {category.name}
                        </Button>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                ))}
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {deleteDialog.open && (
        <DeleteDialog
          open={deleteDialog.open}
          title={deleteDialog.taskId ? "Delete Task" : "Delete Category"}
          description={
            deleteDialog.taskId
              ? "Are you sure you want to delete this task? This action cannot be undone."
              : "Are you sure you want to delete this category? All tasks in this category will also be deleted."
          }
          deleteBtnText={
            deleteDialog.taskId ? "Delete Task" : "Delete Category"
          }
          onOpenChange={(value) =>
            setDeleteDialog((current) => ({ ...current, open: value }))
          }
          onDelete={() => {
            if (deleteDialog.categoryId && deleteDialog.taskId)
              onDeleteTask(deleteDialog.categoryId, deleteDialog.taskId);
            else if (deleteDialog.categoryId)
              onDeleteCategory(deleteDialog.categoryId);
            setDeleteDialog({ open: false });
          }}
        />
      )}

      {categoryDialog.open && (
        <TaskCategoryDialog
          open={categoryDialog.open}
          category={categoryDialog.category}
          onOpenChange={(value) =>
            setCategoryDialog((current) => ({ ...current, open: value }))
          }
          onSave={(data) => {
            if (categoryDialog.category)
              onEditCategory(categoryDialog.category.id, data);
            else onAddCategory(data);
            setCategoryDialog({ open: false });
          }}
        />
      )}

      {taskDialog.open && (
        <TaskDialog
          open={taskDialog.open}
          task={taskDialog.task}
          categoryName={taskDialog.category?.name ?? "this category"}
          onOpenChange={(value) =>
            setTaskDialog((current) => ({ ...current, open: value }))
          }
          onSave={(data) => {
            if (!taskDialog.category) return;
            if (taskDialog.task)
              onEditTask(taskDialog.category.id, taskDialog.task.id, data);
            else onAddTask(taskDialog.category.id, data);
            setTaskDialog({ open: false });
          }}
        />
      )}
    </>
  );
}
