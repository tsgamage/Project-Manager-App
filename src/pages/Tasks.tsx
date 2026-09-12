import NotFoundForFilters from "@/components/Not Found/not-found-for-filters";
import ProjectsNotFound from "@/components/Not Found/projects-not-found";
import PageWrapper from "@/components/Page-Wrapper";
import type { TaskSort } from "@/components/pages/Tasks/filter-popover";
import ProjectTasks from "@/components/pages/Tasks/ProjectTasks";
import TaskToolbar from "@/components/pages/Tasks/TaskToolbar";
import { ProjectPagination } from "@/components/ui/project-pagination";
import { Separator } from "@/components/ui/shadcn/separator";
import { getTaskPriority, getTaskStatus } from "@/lib/utils";
import { useProjectStore } from "@/store/project.store";
import type { IProject, ITask, ITaskCategory } from "@/types/project.types";
import { useState } from "react";

type TaskRecord = {
  project: IProject;
  category: ITaskCategory;
  task: ITask;
  key: string;
};

function getAllTaskRecords(projects: IProject[]): TaskRecord[] {
  return projects.flatMap((project) =>
    (project.taskCategories ?? []).flatMap((category) =>
      (category.tasks ?? []).map((task) => ({
        project,
        category,
        task,
        key: `${project.id}:${category.id}:${task.id}`,
      })),
    ),
  );
}

export default function TasksPage() {
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const projects = useProjectStore((state) => state.projects).filter(
    (project) => project.status !== "Archived",
  );
  const addNewCategory = useProjectStore((state) => state.addNewCategory);
  const updateCategory = useProjectStore((state) => state.updateCategory);
  const deleteCategory = useProjectStore((state) => state.deleteCategory);
  const addNewTask = useProjectStore((state) => state.addNewTask);
  const toggleTask = useProjectStore((state) => state.toggleTask);
  const updateTask = useProjectStore((state) => state.updateTask);
  const deleteTask = useProjectStore((state) => state.deleteTask);
  const changeProjectStatus = useProjectStore(
    (state) => state.changeProjectStatus,
  );

  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sort, setSort] = useState<TaskSort>("dueDate");
  const [page, setPage] = useState(1);
  const [openProjects, setOpenProjects] = useState<Record<string, boolean>>({});
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {},
  );
  const allRecords = getAllTaskRecords(projects);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredRecords = allRecords.filter(({ project, category, task }) => {
    const searchableText =
      `${task.name} ${task.description ?? ""} ${project.name} ${category.name}`.toLowerCase();
    return (
      (!normalizedSearch || searchableText.includes(normalizedSearch)) &&
      (projectFilter === "all" || project.id === projectFilter) &&
      (statusFilter === "all" || getTaskStatus(task) === statusFilter) &&
      (priorityFilter === "all" || getTaskPriority(task) === priorityFilter)
    );
  });
  const priorityOrder = { High: 0, Medium: 1, Low: 2 };
  const statusOrder = {
    Today: 0,
    Missed: 1,
    Upcoming: 2,
    "No due date": 3,
    Completed: 4,
  };
  const sortedRecords = [...filteredRecords].sort((left, right) => {
    if (sort === "priority")
      return (
        priorityOrder[getTaskPriority(left.task)] -
          priorityOrder[getTaskPriority(right.task)] ||
        left.task.name.localeCompare(right.task.name)
      );
    if (sort === "status")
      return (
        statusOrder[getTaskStatus(left.task)] -
          statusOrder[getTaskStatus(right.task)] ||
        left.task.name.localeCompare(right.task.name)
      );
    const leftDate = left.task.dueDate
      ? new Date(`${left.task.dueDate}T00:00:00`).getTime()
      : Number.MAX_SAFE_INTEGER;
    const rightDate = right.task.dueDate
      ? new Date(`${right.task.dueDate}T00:00:00`).getTime()
      : Number.MAX_SAFE_INTEGER;
    return (
      leftDate - rightDate || left.task.name.localeCompare(right.task.name)
    );
  });

  const pageCount = Math.max(1, Math.ceil(sortedRecords.length / itemsPerPage));
  const safePage = Math.min(page, pageCount);
  const pageRecords = sortedRecords.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage,
  );
  const pageKeys = new Set(pageRecords.map((record) => record.key));
  const hasActiveFilters =
    Boolean(normalizedSearch) ||
    projectFilter !== "all" ||
    statusFilter !== "all" ||
    priorityFilter !== "all";
  const showAllCategories =
    !hasActiveFilters && sortedRecords.length <= itemsPerPage;
  const visibleProjects = projects
    .map((project) => ({
      project,
      categories: (project.taskCategories ?? [])
        .map((category) => ({
          ...category,
          tasks: (category.tasks ?? []).filter(
            (task) =>
              showAllCategories ||
              pageKeys.has(`${project.id}:${category.id}:${task.id}`),
          ),
        }))
        .filter(
          (category) => showAllCategories || (category.tasks?.length ?? 0) > 0,
        ),
    }))
    .filter(({ categories }) => showAllCategories || categories.length > 0);

  function resetFilters() {
    setSearch("");
    setProjectFilter("all");
    setStatusFilter("all");
    setPriorityFilter("all");
    setSort("dueDate");
    setPage(1);
  }
  function updateFilter(setter: (value: string) => void, value: string) {
    setter(value);
    setPage(1);
  }
  function expandAll() {
    const projectState: Record<string, boolean> = {};
    const categoryState: Record<string, boolean> = {};
    projects.forEach((project) => {
      projectState[project.id] = true;
      project.taskCategories?.forEach((category) => {
        categoryState[category.id] = true;
      });
    });
    setOpenProjects(projectState);
    setOpenCategories(categoryState);
  }
  function collapseAll() {
    setOpenProjects({});
    setOpenCategories({});
  }

  return (
    <PageWrapper>
      <div className="space-y-5 px-5 py-6 lg:px-8">
        <TaskToolbar
          search={search}
          project={projectFilter}
          status={statusFilter}
          priority={priorityFilter}
          sort={sort}
          projects={projects}
          onSearchChange={(value) => updateFilter(setSearch, value)}
          onProjectChange={(value) => updateFilter(setProjectFilter, value)}
          onStatusChange={(value) => updateFilter(setStatusFilter, value)}
          onPriorityChange={(value) => updateFilter(setPriorityFilter, value)}
          onSortChange={(value) => {
            setSort(value);
            setPage(1);
          }}
          onReset={resetFilters}
          onCollapseAll={collapseAll}
          onExpandAll={expandAll}
        />
        {projects.length === 0 && <ProjectsNotFound />}

        {visibleProjects.length === 0 && projects.length > 0 && (
          <NotFoundForFilters onResetFilters={resetFilters} type="tasks" />
        )}

        {visibleProjects.length > 0 && (
          <section className="space-y-4" aria-label="Task groups">
            {visibleProjects.map(({ project, categories }) => (
              <ProjectTasks
                key={project.id}
                project={project}
                taskCategories={categories}
                open={openProjects[project.id] ?? false}
                openCategories={openCategories}
                onOpenChange={(value) =>
                  setOpenProjects((current) => ({
                    ...current,
                    [project.id]: value,
                  }))
                }
                onCategoryOpenChange={(categoryId, value) =>
                  setOpenCategories((current) => ({
                    ...current,
                    [categoryId]: value,
                  }))
                }
                onAddCategory={(data) => addNewCategory(project.id, data)}
                onEditCategory={(categoryId, data) =>
                  updateCategory(project.id, categoryId, data)
                }
                onDeleteCategory={(categoryId) =>
                  deleteCategory(project.id, categoryId)
                }
                onAddTask={(categoryId, data) =>
                  addNewTask(project.id, categoryId, data)
                }
                onToggleTask={(categoryId, taskId) =>
                  toggleTask(project.id, categoryId, taskId)
                }
                onEditTask={(categoryId, taskId, data) =>
                  updateTask(project.id, categoryId, taskId, data)
                }
                onDeleteTask={(categoryId, taskId) =>
                  deleteTask(project.id, categoryId, taskId)
                }
                onStatusChange={(status) =>
                  changeProjectStatus(project.id, status)
                }
                onArchive={() => changeProjectStatus(project.id, "Archived")}
              />
            ))}
          </section>
        )}

        {sortedRecords.length > itemsPerPage && (
          <footer className="text-xs ">
            <Separator />
            <div className="flex items-center justify-between mt-5">
              <span>
                Showing{" "}
                {page * itemsPerPage < projects.length
                  ? page * itemsPerPage
                  : projects.length}{" "}
                of {projects.length} items
              </span>
              <ProjectPagination
                disable={{
                  first: page === 1,
                  prev: page === 1,
                  next: page === pageCount,
                  last: page === pageCount,
                }}
                itemCount={itemsPerPage}
                onItemCountChange={setItemsPerPage}
                onPreviousClick={() =>
                  setPage((current) => Math.max(1, current - 1))
                }
                onNextClick={() =>
                  setPage((current) => Math.min(pageCount, current + 1))
                }
                onFirstClick={() => setPage(1)}
                onLastClick={() => setPage(pageCount)}
              />
            </div>
          </footer>
        )}
      </div>
    </PageWrapper>
  );
}
