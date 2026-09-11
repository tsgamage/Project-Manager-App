import type { IProject } from "@/types/project.types";

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
