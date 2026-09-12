export type TTaskPriority = "Low" | "Medium" | "High";

export interface ITask {
  id: string;
  name: string;
  description?: string;
  dueDate?: string;
  priority?: TTaskPriority;
  completed: boolean;
}

export interface ITaskCategory {
  id: string;
  name: string;
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
  pinned?: boolean;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}
