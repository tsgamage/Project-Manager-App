export interface ITask {
  taskName: string;
  taskDescription?: string;
  dueDate?: string;
  completed: boolean;
}

export interface ITaskCategory {
  categoryName: string;
  tasks?: ITask[];
}

export type TProjectStatus = "Active" | "On Hold" | "Completed" | "Archived";

export interface IProject {
  id: string;
  name: string;
  status: TProjectStatus;
  description: string;
  dueDate: string;
  taskCategories?: ITaskCategory[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
