import DeleteDialog from "@/components/Dialogs/DeleteDialog";
import TaskCategoryDialog from "@/components/Dialogs/TaskCategoryDialog";
import TaskDialog from "@/components/Dialogs/TaskDialog";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/shadcn/collapsible";
import type { StrictOmit } from "@/lib/utils";
import type { ITask, ITaskCategory } from "@/types/project.types";
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  CirclePlusIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";

type DeleteDialogTypes = "task" | "category";
function getDeleteDialogTexts(type: DeleteDialogTypes) {
  switch (type) {
    case "category":
      return {
        title: "Delete Category",
        description:
          "Are you sure you want to delete this category? All tasks in this category will also be deleted.",
        deleteButtonText: "Delete Category",
      };
    case "task":
      return {
        title: "Delete Task",
        description:
          "Are you sure you want to delete this task? This action cannot be undone.",
        deleteButtonText: "Delete Task",
      };
  }
}

type DialogTypes = "new" | "edit";

type CatData = StrictOmit<ITaskCategory, "id" | "tasks">;
type TaskData = StrictOmit<ITask, "id" | "completed">;

interface Props {
  taskCategories: ITaskCategory[];

  onAddCategory: (catData: CatData) => void;
  onEditCategory: (catId: string, catData: CatData) => void;
  onDeleteCategory: (catId: string) => void;

  onAddTask: (catId: string, taskData: TaskData) => void;
  onToggleTask: (catId: string, taskId: string) => void;
  onEditTask: (catId: string, taskId: string, taskData: TaskData) => void;
  onDeleteTask: (catId: string, taskId: string) => void;
}

export default function Tasks({
  taskCategories,

  onAddCategory,
  onEditCategory,
  onDeleteCategory,

  onToggleTask,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: Props) {
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    type: DeleteDialogTypes;
    id: { catId: string | null; taskId: string | null };
  }>({ open: false, type: "task", id: { catId: null, taskId: null } });

  const [categoryDialog, setCategoryDialog] = useState<{
    open: boolean;
    category: ITaskCategory | null;
    type: DialogTypes;
  }>({ open: false, category: null, type: "new" });

  const [taskDialog, setTaskDialog] = useState<{
    open: boolean;
    category: ITaskCategory | null;
    task: ITask | null;
    type: DialogTypes;
  }>({ open: false, category: null, task: null, type: "new" });

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold">Project tasks</h2>
          <p className="text-sm text-muted-foreground">
            Organize work into categories and keep progress moving.
          </p>
        </div>
        <Button
          onClick={() =>
            setCategoryDialog({ open: true, type: "new", category: null })
          }
        >
          <CirclePlusIcon /> Add category
        </Button>
      </div>
      {taskCategories.map((category) => (
        <Collapsible key={category.id} defaultOpen>
          <Card className="min-w-0 max-w-full">
            <CardHeader className="flex grid-cols-[1fr_auto] items-center gap-3 border-b">
              <CollapsibleTrigger className="flex min-w-0 items-center gap-2 text-left">
                <ChevronDownIcon className="size-4 shrink-0 transition-transform data-closed:-rotate-90" />
                <div className="min-w-0">
                  <CardTitle className="truncate">{category.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {category.tasks?.length}
                    {category.tasks?.length === 1 ? "task" : "tasks"}
                  </p>
                </div>
              </CollapsibleTrigger>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setTaskDialog({
                    open: true,
                    category: category,
                    task: null,
                    type: "new",
                  })
                }
              >
                <PlusIcon /> Add task
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  setCategoryDialog({
                    open: true,
                    type: "edit",
                    category: category,
                  })
                }
              >
                <PencilIcon />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  setDeleteDialog({
                    open: true,
                    type: "category",
                    id: { catId: category.id, taskId: null },
                  })
                }
              >
                <Trash2Icon />
              </Button>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="min-w-0 max-w-full p-0">
                {category.tasks?.length === 0 ? (
                  <p className="px-5 py-6 text-sm text-muted-foreground">
                    No tasks in this category yet.
                  </p>
                ) : (
                  category.tasks?.map((task) => (
                    <div
                      key={task.id}
                      className="flex min-w-0 max-w-full flex-col gap-3 overflow-hidden border-b p-4 last:border-b-0 sm:flex-row sm:items-start"
                    >
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() =>
                          onToggleTask(category.id, task.id)
                        }
                        aria-label={`Mark ${task.name} complete`}
                        className="mt-1"
                      />
                      <div className="min-w-0 max-w-full flex-1 overflow-hidden">
                        <p
                          className={`max-w-full whitespace-normal wrap-anywhere break-normal text-sm font-medium ${task.completed ? "text-muted-foreground line-through" : ""}`}
                        >
                          {task.name}
                        </p>
                        <p className="mt-1 max-w-full whitespace-normal wrap-anywhere break-normal text-xs leading-5 text-muted-foreground">
                          {task.description || "No description"}
                        </p>
                        {task.dueDate ? (
                          <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                            <CalendarDaysIcon className="size-3.5" />{" "}
                            {task.dueDate}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex shrink-0 gap-1 self-end sm:self-start">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Edit ${task.name}`}
                          onClick={() =>
                            setTaskDialog({
                              open: true,
                              category: category,
                              task: task,
                              type: "edit",
                            })
                          }
                        >
                          <PencilIcon />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Delete ${task.name}`}
                          onClick={() => {
                            setDeleteDialog({
                              open: true,
                              type: "task",
                              id: { catId: category.id, taskId: task.id },
                            });
                          }}
                        >
                          <Trash2Icon />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      ))}

      {deleteDialog.open && (
        <DeleteDialog
          open={deleteDialog.open}
          title={getDeleteDialogTexts(deleteDialog.type).title}
          description={getDeleteDialogTexts(deleteDialog.type).description}
          deleteBtnText={
            getDeleteDialogTexts(deleteDialog.type).deleteButtonText
          }
          onOpenChange={() =>
            setDeleteDialog((prevState) => ({
              ...prevState,
              open: !prevState.open,
            }))
          }
          onDelete={() => {
            if (deleteDialog.open) {
              switch (deleteDialog.type) {
                case "task":
                  onDeleteTask(deleteDialog.id.catId!, deleteDialog.id.taskId!);
                  setDeleteDialog((pre) => ({ ...pre, open: false }));

                  break;
                case "category":
                  onDeleteCategory(deleteDialog.id.catId!);
                  setDeleteDialog((pre) => ({ ...pre, open: false }));
                  break;
              }
            }
          }}
        />
      )}

      {categoryDialog.open && (
        <TaskCategoryDialog
          open={categoryDialog.open}
          onOpenChange={() =>
            setCategoryDialog({ ...categoryDialog, open: false })
          }
          category={categoryDialog.category ?? undefined}
          onSave={(cat) => {
            switch (categoryDialog.type) {
              case "new":
                onAddCategory(cat);
                setCategoryDialog((prev) => ({ ...prev, open: false }));
                break;
              case "edit":
                onEditCategory(categoryDialog.category!.id, cat);
                setCategoryDialog((prev) => ({ ...prev, open: false }));
                break;
            }
          }}
        />
      )}

      {taskDialog.open && (
        <TaskDialog
          open={taskDialog.open}
          onOpenChange={(open) => setTaskDialog({ ...taskDialog, open })}
          categoryName={taskDialog.category?.name ?? "this category"}
          task={taskDialog.task ?? undefined}
          onSave={(taskData) => {
            switch (taskDialog.type) {
              case "new":
                onAddTask(taskDialog.category!.id, taskData);
                setTaskDialog((prev) => ({ ...prev, open: false }));
                break;
              case "edit":
                onEditTask(
                  taskDialog.category!.id,
                  taskDialog.task!.id,
                  taskData,
                );
                setTaskDialog((prev) => ({ ...prev, open: false }));
                break;
            }
          }}
        />
      )}
    </>
  );
}
