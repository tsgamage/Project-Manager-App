import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/shadcn/alert";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/shadcn/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/shadcn/alert-dialog";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Progress, ProgressValue } from "@/components/ui/shadcn/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";
import { Textarea } from "@/components/ui/shadcn/textarea";
import {
  ArchiveIcon,
  ArrowLeftIcon,
  CalendarDaysIcon,
  CheckCircle2Icon,
  CirclePlusIcon,
  FileTextIcon,
  InfoIcon,
  MoreHorizontalIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
  ChevronDownIcon,
} from "lucide-react";

type ProjectTask = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
};

type TaskCategory = {
  id: number;
  name: string;
  tasks: ProjectTask[];
};

const initialCategories: TaskCategory[] = [
  {
    id: 1,
    name: "Design",
    tasks: [
      {
        id: 1,
        title: "Create wireframes for homepage",
        description: "Explore the first layout direction for the marketing homepage.",
        dueDate: "2026-09-10",
        completed: false,
      },
      {
        id: 2,
        title: "Design system setup",
        description: "Document the colors, spacing, and reusable interface patterns.",
        dueDate: "2026-09-12",
        completed: true,
      },
    ],
  },
  {
    id: 2,
    name: "Development",
    tasks: [
      {
        id: 3,
        title: "Set up Next.js project",
        description: "Create the application shell and establish the first route structure.",
        dueDate: "2026-09-15",
        completed: false,
      },
      {
        id: 4,
        title: "Implement authentication flow",
        description: "Connect sign-in, sign-out, and protected project routes.",
        dueDate: "2026-09-18",
        completed: false,
      },
    ],
  },
];

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

function ProjectDetails({
  title,
  description,
  dueDate,
  status,
  onSave,
}: {
  title: string;
  description: string;
  dueDate: string;
  status: string;
  onSave: (title: string, description: string, dueDate: string, status: string) => void;
}) {
  const [draft, setDraft] = useState({ title, description, dueDate, status });
  const [editing, setEditing] = useState(false);

  const save = () => {
    onSave(draft.title, draft.description, draft.dueDate, draft.status);
    setEditing(false);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/20 sm:flex sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle>Project details</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">A clear snapshot of the project brief and schedule.</p>
        </div>
        <Button variant={editing ? "outline" : "default"} size="sm" onClick={() => setEditing(!editing)}>
          {editing ? "Cancel editing" : <><PencilIcon /> Edit details</>}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6 p-5 sm:p-7">
        {editing ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="project-title">Project title</Label>
              <Input id="project-title" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-description">Description</Label>
              <Textarea id="project-description" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} className="min-h-28 resize-y" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="project-due-date">Due date</Label>
                <Input id="project-due-date" type="date" value={draft.dueDate} onChange={(event) => setDraft({ ...draft, dueDate: event.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-status">Status</Label>
                <Input id="project-status" value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value })} />
              </div>
            </div>
            <Button onClick={save}>Save details</Button>
          </>
        ) : (
          <div className="space-y-7">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Project title</p>
              <h2 className="wrap-break-word text-2xl font-semibold tracking-tight">{title}</h2>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Description</p>
              <p className="wrap-break-word whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{description || "No project description yet."}</p>
            </div>
            <div className="grid gap-4 border-t pt-5 sm:grid-cols-2">
              <div className="rounded-lg bg-muted/30 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Due date</p>
                <p className="mt-2 text-sm font-medium">{formatDate(dueDate)}</p>
              </div>
              <div className="rounded-lg bg-muted/30 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</p>
                <Badge className="mt-2 bg-emerald-500/15 text-emerald-500" variant="outline">{status}</Badge>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TaskDialog({
  open,
  onOpenChange,
  categoryName,
  task,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryName: string;
  task?: ProjectTask;
  onSave: (task: Omit<ProjectTask, "id" | "completed">) => void;
}) {
  const [draft, setDraft] = useState({
    title: task?.title ?? "",
    description: task?.description ?? "",
    dueDate: task?.dueDate ?? "",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? "Edit task" : "Add task"}</DialogTitle>
          <DialogDescription>{task ? "Update this task." : `Add a task to ${categoryName}.`}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task-title">Task title</Label>
            <Input id="task-title" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="e.g. Review homepage copy" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="task-description">Description</Label>
            <Textarea id="task-description" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} placeholder="What needs to be done?" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="task-date">Due date</Label>
            <Input id="task-date" type="date" value={draft.dueDate} onChange={(event) => setDraft({ ...draft, dueDate: event.target.value })} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button disabled={!draft.title.trim()} onClick={() => { onSave(draft); onOpenChange(false); }}>Save task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ProjectWorkspace() {
  const navigate = useNavigate();
  const { pId } = useParams();
  const [title, setTitle] = useState("Acme Web Redesign");
  const [description, setDescription] = useState("Rebuilding the core marketing website with a faster, clearer experience for every customer.");
  const [dueDate, setDueDate] = useState("2026-10-15");
  const [status, setStatus] = useState("Active");
  const [categories, setCategories] = useState(initialCategories);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [taskDialog, setTaskDialog] = useState<{ open: boolean; categoryId: number; task?: ProjectTask }>({ open: false, categoryId: 0 });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [archived, setArchived] = useState(false);
  const totalTasks = categories.reduce((total, category) => total + category.tasks.length, 0);
  const completedTasks = categories.reduce((total, category) => total + category.tasks.filter((task) => task.completed).length, 0);
  const progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    setCategories([...categories, { id: Date.now(), name: newCategoryName.trim(), tasks: [] }]);
    setNewCategoryName("");
    setCategoryDialogOpen(false);
  };

  const saveTask = (taskData: Omit<ProjectTask, "id" | "completed">) => {
    setCategories((current) => current.map((category) => {
      if (category.id !== taskDialog.categoryId) return category;
      if (taskDialog.task) {
        return { ...category, tasks: category.tasks.map((task) => task.id === taskDialog.task?.id ? { ...task, ...taskData } : task) };
      }
      return { ...category, tasks: [...category.tasks, { ...taskData, id: Date.now(), completed: false }] };
    }));
  };

  const toggleTask = (categoryId: number, taskId: number) => {
    setCategories((current) => current.map((category) => category.id === categoryId ? {
      ...category,
      tasks: category.tasks.map((task) => task.id === taskId ? { ...task, completed: !task.completed } : task),
    } : category));
  };

  const deleteTask = (categoryId: number, taskId: number) => {
    setCategories((current) => current.map((category) => category.id === categoryId ? { ...category, tasks: category.tasks.filter((task) => task.id !== taskId) } : category));
  };

  return (
    <div className="min-w-0 space-y-6 px-5 py-6 lg:px-8">
      <header className="space-y-4">
        <Button variant="ghost" size="sm" className="-ml-2" onClick={() => navigate("/project/all")}>
          <ArrowLeftIcon /> Back to projects
        </Button>
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge className={archived ? "bg-muted text-muted-foreground" : "bg-emerald-500/15 text-emerald-500"} variant="outline">{archived ? "Archived" : status}</Badge>
              <span className="text-xs text-muted-foreground">Project {pId ?? "1"}</span>
            </div>
            <h1 className="max-w-full wrap-break-word font-heading text-3xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-2 max-w-3xl wrap-break-word text-sm leading-6 text-muted-foreground">{description}</p>
          </div>
        </div>
      </header>

      <Tabs defaultValue="details" className="min-w-0">
        <TabsList className="w-full justify-start overflow-x-auto sm:w-fit">
          <TabsTrigger value="details"><FileTextIcon /> Details</TabsTrigger>
          <TabsTrigger value="tasks"><CheckCircle2Icon /> Tasks</TabsTrigger>
          <TabsTrigger value="overview"><InfoIcon /> Overview</TabsTrigger>
          <TabsTrigger value="info"><MoreHorizontalIcon /> Info</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-5">
          <ProjectDetails title={title} description={description} dueDate={dueDate} status={status} onSave={(nextTitle, nextDescription, nextDueDate, nextStatus) => { setTitle(nextTitle || "Untitled project"); setDescription(nextDescription); setDueDate(nextDueDate); setStatus(nextStatus || "Active"); }} />
        </TabsContent>

        <TabsContent value="tasks" className="mt-5 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-lg font-semibold">Project tasks</h2>
              <p className="text-sm text-muted-foreground">Organize work into categories and keep progress moving.</p>
            </div>
            <Button onClick={() => setCategoryDialogOpen(true)}><CirclePlusIcon /> Add category</Button>
          </div>
          {categories.map((category) => (
            <Collapsible key={category.id} defaultOpen>
              <Card className="min-w-0 max-w-full">
                <CardHeader className="flex grid-cols-[1fr_auto] items-center gap-3 border-b">
                  <CollapsibleTrigger className="flex min-w-0 items-center gap-2 text-left">
                    <ChevronDownIcon className="size-4 shrink-0 transition-transform data-closed:-rotate-90" />
                    <div className="min-w-0">
                      <CardTitle className="truncate">{category.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{category.tasks.length} {category.tasks.length === 1 ? "task" : "tasks"}</p>
                    </div>
                  </CollapsibleTrigger>
                  <Button size="sm" variant="outline" onClick={() => setTaskDialog({ open: true, categoryId: category.id })}><PlusIcon /> Add task</Button>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="min-w-0 max-w-full p-0">
                {category.tasks.length === 0 ? <p className="px-5 py-6 text-sm text-muted-foreground">No tasks in this category yet.</p> : category.tasks.map((task) => (
                  <div key={task.id} className="flex min-w-0 max-w-full flex-col gap-3 overflow-hidden border-b p-4 last:border-b-0 sm:flex-row sm:items-start">
                    <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(category.id, task.id)} aria-label={`Mark ${task.title} complete`} className="mt-1" />
                    <div className="min-w-0 max-w-full flex-1 overflow-hidden">
                      <p className={`max-w-full whitespace-normal wrap-anywhere break-normal text-sm font-medium ${task.completed ? "text-muted-foreground line-through" : ""}`}>{task.title}</p>
                      <p className="mt-1 max-w-full whitespace-normal wrap-anywhere break-normal text-xs leading-5 text-muted-foreground">{task.description || "No description"}</p>
                      {task.dueDate ? <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><CalendarDaysIcon className="size-3.5" /> {formatDate(task.dueDate)}</p> : null}
                    </div>
                    <div className="flex shrink-0 gap-1 self-end sm:self-start">
                      <Button variant="ghost" size="icon-sm" aria-label={`Edit ${task.title}`} onClick={() => setTaskDialog({ open: true, categoryId: category.id, task })}><PencilIcon /></Button>
                      <Button variant="ghost" size="icon-sm" aria-label={`Delete ${task.title}`} onClick={() => deleteTask(category.id, task.id)}><Trash2Icon /></Button>
                    </div>
                  </div>
                ))}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </TabsContent>

        <TabsContent value="overview" className="mt-5 space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card><CardContent className="space-y-2 p-5"><p className="text-sm text-muted-foreground">Progress</p><p className="font-heading text-2xl font-semibold">{progress}%</p></CardContent></Card>
            <Card><CardContent className="space-y-2 p-5"><p className="text-sm text-muted-foreground">Tasks complete</p><p className="font-heading text-2xl font-semibold">{completedTasks} / {totalTasks}</p></CardContent></Card>
            <Card><CardContent className="space-y-2 p-5"><p className="text-sm text-muted-foreground">Due date</p><p className="wrap-break-word font-heading text-2xl font-semibold">{formatDate(dueDate)}</p></CardContent></Card>
          </div>
          <Card>
            <CardHeader><CardTitle>Completion progress</CardTitle></CardHeader>
            <CardContent><Progress value={progress}><ProgressValue /></Progress></CardContent>
          </Card>
          <Alert><InfoIcon /><AlertTitle>Project pulse</AlertTitle><AlertDescription>{progress >= 50 ? "This project is making good progress. Keep the remaining tasks moving." : "This project is getting started. Add tasks and owners to create momentum."}</AlertDescription></Alert>
        </TabsContent>

        <TabsContent value="info" className="mt-5 space-y-5">
          <Card>
            <CardHeader><CardTitle>Project information</CardTitle></CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              <div><p className="text-xs text-muted-foreground">Project ID</p><p className="mt-1 break-all text-sm">{pId ?? "1"}</p></div>
              <div><p className="text-xs text-muted-foreground">Created</p><p className="mt-1 text-sm">September 1, 2026</p></div>
              <div><p className="text-xs text-muted-foreground">Last edited</p><p className="mt-1 text-sm">Today at 10:42 AM</p></div>
              <div><p className="text-xs text-muted-foreground">Current status</p><Badge variant="secondary">{archived ? "Archived" : status}</Badge></div>
            </CardContent>
          </Card>
          <Card className="border-destructive/30">
            <CardHeader><CardTitle>Danger zone</CardTitle><p className="text-sm text-muted-foreground">Deleting a project removes it from this workspace permanently.</p></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => setArchived(!archived)}><ArchiveIcon /> {archived ? "Restore project" : "Archive project"}</Button>
              <Button variant="destructive" onClick={() => setDeleteOpen(true)}><Trash2Icon /> Delete project</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add task category</DialogTitle><DialogDescription>Create a category to organize this project&apos;s work.</DialogDescription></DialogHeader>
          <div className="space-y-2"><Label htmlFor="category-name">Category name</Label><Input id="category-name" value={newCategoryName} onChange={(event) => setNewCategoryName(event.target.value)} placeholder="e.g. Launch" /></div>
          <DialogFooter><Button variant="outline" onClick={() => setCategoryDialogOpen(false)}>Cancel</Button><Button disabled={!newCategoryName.trim()} onClick={addCategory}>Add category</Button></DialogFooter>
        </DialogContent>
      </Dialog>
      <TaskDialog open={taskDialog.open} onOpenChange={(open) => setTaskDialog({ ...taskDialog, open })} categoryName={categories.find((category) => category.id === taskDialog.categoryId)?.name ?? "this category"} task={taskDialog.task} onSave={saveTask} />
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete this project?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone. The project and its tasks will be removed from the workspace.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction variant="destructive" onClick={() => navigate("/project/all")}>Delete project</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}