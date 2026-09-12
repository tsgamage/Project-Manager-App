import PageWrapper from "@/components/Page-Wrapper";
import ProjectTasks from "@/components/pages/Tasks/ProjectTasks";
import TaskToolbar, {
  type TaskSort,
} from "@/components/pages/Tasks/TaskToolbar";
import { Button } from "@/components/ui/shadcn/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/shadcn/empty";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/shadcn/pagination";
import { getTaskPriority, getTaskStatus } from "@/lib/utils";
import { useProjectStore } from "@/store/project.store";
import type { IProject, ITask, ITaskCategory } from "@/types/project.types";
import { ListTodoIcon } from "lucide-react";
import { useState } from "react";

const PAGE_SIZE = 8;
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
  const pageCount = Math.max(1, Math.ceil(sortedRecords.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const pageRecords = sortedRecords.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );
  const pageKeys = new Set(pageRecords.map((record) => record.key));
  const hasActiveFilters =
    Boolean(normalizedSearch) ||
    projectFilter !== "all" ||
    statusFilter !== "all" ||
    priorityFilter !== "all";
  const showAllCategories =
    !hasActiveFilters && sortedRecords.length <= PAGE_SIZE;
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
        {projects.length === 0 && (
          <Empty className="min-h-72">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ListTodoIcon />
              </EmptyMedia>
              <EmptyTitle>No active projects</EmptyTitle>
              <EmptyDescription>
                Create a project before adding tasks.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}

        {visibleProjects.length === 0 && projects.length > 0 && (
          <Empty className="min-h-72">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ListTodoIcon />
              </EmptyMedia>
              <EmptyTitle>No matching tasks</EmptyTitle>
              <EmptyDescription>
                Try changing your search or filters.
              </EmptyDescription>
            </EmptyHeader>
            <Button variant="outline" onClick={resetFilters}>
              Reset filters
            </Button>
          </Empty>
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
        {sortedRecords.length > PAGE_SIZE && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setPage((current) => Math.max(1, current - 1));
                  }}
                />
              </PaginationItem>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      isActive={pageNumber === safePage}
                      onClick={(event) => {
                        event.preventDefault();
                        setPage(pageNumber);
                      }}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setPage((current) => Math.min(pageCount, current + 1));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </PageWrapper>
  );
}
