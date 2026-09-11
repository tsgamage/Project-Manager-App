import { useNavigate, useParams } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/tabs";
import {
  ArrowLeftIcon,
  CheckCircle2Icon,
  FileTextIcon,
  InfoIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import ProjectDetails from "@/components/pages/ProjectView/ProjectDetails";
import Tasks from "@/components/pages/ProjectView/Tasks";
import Overview from "@/components/pages/ProjectView/Overview";
import Info from "@/components/pages/ProjectView/Info";
import { Button } from "@/components/ui/shadcn/button";
import { useProjectStore } from "@/store/project.store";
import { APP_URLS } from "@/constant/url";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

export default function ProjectViewPage() {
  const { pId } = useParams();
  const navigate = useNavigate();

  const project = useProjectStore((state) => state.getProjectById(pId ?? ""));
  const changeProjectStatus = useProjectStore(
    (state) => state.changeProjectStatus,
  );
  const onDeleteProject = useProjectStore((state) => state.deleteProject);

  const addNewCategory = useProjectStore((state) => state.addNewCategory);
  const updateCategory = useProjectStore((state) => state.updateCategory);
  const deleteCategory = useProjectStore((state) => state.deleteCategory);

  const toggleTask = useProjectStore((state) => state.toggleTask);
  const addNewTask = useProjectStore((state) => state.addNewTask);
  const updateTask = useProjectStore((state) => state.updateTask);
  const deleteTask = useProjectStore((state) => state.deleteTask);

  if (!project) {
    return (
      <p className="flex justify-center items-center h-full text-muted-foreground">
        No Project found for the given project id
      </p>
    );
  }

  let totalTasks = 0;
  let completedTasks = 0;
  let progress = 0;

  if (project.taskCategories) {
    totalTasks = project.taskCategories.reduce((total, category) => {
      if (category.tasks) return total + category?.tasks.length;
      return total;
    }, 0);

    completedTasks = project.taskCategories.reduce((total, category) => {
      if (category.tasks) {
        return total + category.tasks.filter((task) => task.completed).length;
      }
      return total;
    }, 0);

    progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  }

  return (
    <div className="min-w-0 space-y-6 px-5 py-6 lg:px-8">
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon /> Go Back
      </Button>

      <Tabs defaultValue="details" className="min-w-0">
        <TabsList className="w-full justify-start overflow-x-auto sm:w-fit">
          <TabsTrigger value="details">
            <FileTextIcon /> Details
          </TabsTrigger>
          <TabsTrigger value="tasks">
            <CheckCircle2Icon /> Tasks
          </TabsTrigger>
          <TabsTrigger value="overview">
            <InfoIcon /> Overview
          </TabsTrigger>
          <TabsTrigger value="info">
            <MoreHorizontalIcon /> Info
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-5">
          <ProjectDetails
            name={project.name}
            description={project.description}
            dueDate={formatDate(project.dueDate)}
            status={project.status}
            onSave={() => {}}
          />
        </TabsContent>

        <TabsContent value="tasks" className="mt-5 space-y-4">
          <Tasks
            taskCategories={project.taskCategories || []}
            onAddCategory={(catData) => addNewCategory(pId!, catData)}
            onEditCategory={(catId, catData) =>
              updateCategory(pId!, catId, catData)
            }
            onDeleteCategory={(catId) => deleteCategory(pId!, catId)}
            onAddTask={(catId, taskData) => addNewTask(pId!, catId, taskData)}
            onToggleTask={(catId, taskId) => toggleTask(pId!, catId, taskId)}
            onEditTask={(catId, taskId, taskData) =>
              updateTask(pId!, catId, taskId, taskData)
            }
            onDeleteTask={(catId, taskId) => deleteTask(pId!, catId, taskId)}
          />
        </TabsContent>

        <TabsContent value="overview" className="mt-5 space-y-5">
          <Overview
            progress={progress}
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            dueDate={formatDate(project.dueDate)}
          />
        </TabsContent>

        <TabsContent value="info" className="mt-5 space-y-5">
          <Info
            isArchived={project.status === "Archived"}
            onArchive={() => changeProjectStatus(pId ?? "", "Archived")}
            onDelete={() => {
              onDeleteProject(pId ?? "");
              navigate(APP_URLS.projectPage.all);
            }}
            onRestore={() => changeProjectStatus(pId ?? "", "Active")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
