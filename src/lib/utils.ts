import type { IProject, ITask, TTaskPriority } from "@/types/project.types";

export { cn } from "cn";

export type StrictOmit<T, K extends keyof T> = Omit<T, K>;

export function getProgressForProject(project: IProject) {
  const completedTasksCount =
    project.taskCategories?.reduce(
      (acc, category) =>
        acc + (category.tasks?.filter((task) => task.completed).length ?? 0),
      0,
    ) || 0;

  const allTasksCount =
    project.taskCategories?.reduce(
      (acc, cat) => acc + (cat.tasks?.length ?? 0),
      0,
    ) || 0;

  return allTasksCount
    ? Math.floor((completedTasksCount / allTasksCount) * 100)
    : 0;
}

export function getBadgeClassesByStatus(status: IProject["status"]) {
  switch (status) {
    case "Completed":
      return "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300";
    case "Active":
      return "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
    case "On Hold":
      return "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300";
    case "Archived":
      return "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300";
  }
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export type TTaskStatus = "Completed" | "Missed" | "Today" | "Upcoming" | "No due date";

export function getTaskPriority(task: ITask): TTaskPriority {
  return task.priority ?? "Medium";
}

export function getTaskStatus(task: ITask, today = new Date()): TTaskStatus {
  if (task.completed) return "Completed";
  if (!task.dueDate) return "No due date";

  const dueDate = new Date(`${task.dueDate}T00:00:00`);
  const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const normalizedDueDate = new Date(
    dueDate.getFullYear(),
    dueDate.getMonth(),
    dueDate.getDate(),
  );

  if (normalizedDueDate < currentDate) return "Missed";
  if (normalizedDueDate.getTime() === currentDate.getTime()) return "Today";
  return "Upcoming";
}
