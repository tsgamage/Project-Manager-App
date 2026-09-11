import { DUMMY_PROJETCS } from "@/data/projects.data";
import type { StrictOmit } from "@/lib/utils";
import type { IProject, ITask, ITaskCategory } from "@/types/project.types";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

type ProjectsStore = {
  projects: IProject[];
  initializeProjects: () => void;
  setProjects: (projects?: IProject[]) => void;

  getProjectById: (pId: IProject["id"]) => IProject | undefined;
  changeProjectStatus: (
    pId: IProject["id"],
    status: IProject["status"],
  ) => void;
  deleteProject: (pId: IProject["id"]) => void;

  addNewCategory: (
    pId: IProject["id"],
    catData: StrictOmit<ITaskCategory, "id" | "tasks">,
  ) => void;
  updateCategory: (
    pId: IProject["id"],
    catId: ITaskCategory["id"],
    catData: StrictOmit<ITaskCategory, "id" | "tasks">,
  ) => void;
  deleteCategory: (pId: IProject["id"], cId: ITaskCategory["id"]) => void;

  toggleTask: (
    pId: IProject["id"],
    catId: ITaskCategory["id"],
    taskId: ITask["id"],
  ) => void;
  addNewTask: (
    pId: IProject["id"],
    catId: ITaskCategory["id"],
    taskData: StrictOmit<ITask, "id" | "completed">,
  ) => void;
  updateTask: (
    pId: IProject["id"],
    catId: ITaskCategory["id"],
    taskId: ITask["id"],
    taskData: StrictOmit<ITask, "id" | "completed">,
  ) => void;
  deleteTask: (
    pId: IProject["id"],
    catId: ITaskCategory["id"],
    taskId: ITask["id"],
  ) => void;
};

export const useProjectStore = create<ProjectsStore>((set, get) => ({
  projects: [],

  initializeProjects: () => {
    set(() => {
      const storedProjects = DUMMY_PROJETCS;
      return { projects: storedProjects };
    });
  },

  // Project Related Methods

  setProjects: (projects) => {
    set(() => ({
      projects: projects || [],
    }));
  },

  getProjectById: (pId) => {
    return get().projects.find((project) => project.id === pId);
  },

  deleteProject: (pId) => {
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== pId),
    }));
  },

  changeProjectStatus: (pId, status) => {
    set((state) => {
      const newProjects = state.projects.map((p) => {
        if (p.id === pId) return { ...p, status: status };
        return p;
      });
      return { projects: newProjects };
    });
  },

  // Category Related methods

  addNewCategory: (pId, catData) => {
    set((state) => {
      const newProjects = state.projects.map((project) => {
        if (project.id === pId) {
          if (project.taskCategories) {
            return {
              ...project,
              taskCategories: [
                ...project.taskCategories,
                { id: uuidv4(), ...catData },
              ],
            };
          }
          return { ...project, taskCategories: [] };
        } else {
          return project;
        }
      });
      return { projects: newProjects };
    });
  },

  updateCategory: (pId, catId, catData) => {
    set((state) => {
      const updatedProjects = state.projects.map((project) => {
        if (project.id === pId) {
          if (project.taskCategories) {
            const updatedCat = project.taskCategories.map((cat) => {
              if (cat.id === catId) {
                return { ...cat, ...catData };
              } else {
                return cat;
              }
            });
            return { ...project, taskCategories: updatedCat };
          } else {
            return project;
          }
        } else {
          return project;
        }
      });
      return { projects: updatedProjects };
    });
  },

  deleteCategory: (pId, cId) => {
    set((state) => {
      const updatedProjects = state.projects.map((project) => {
        if (project.id === pId) {
          if (project.taskCategories) {
            const updatedCat = project.taskCategories.filter(
              (cat) => cat.id !== cId,
            );
            return { ...project, taskCategories: updatedCat };
          } else {
            return project;
          }
        } else {
          return project;
        }
      });
      return { projects: updatedProjects };
    });
  },

  // Task Related methods

  toggleTask: (pId, catId, taskId) => {
    set((state) => {
      const newProjects = state.projects.map((project) => {
        if (project.id === pId) {
          if (project.taskCategories) {
            const updatedCat = project.taskCategories.map((cat) => {
              if (cat.id === catId) {
                if (cat.tasks) {
                  const updatedTasks = cat.tasks.map((t) => {
                    if (t.id === taskId) {
                      return { ...t, completed: !t.completed };
                    } else {
                      return t;
                    }
                  });
                  return { ...cat, tasks: updatedTasks };
                } else {
                  return cat;
                }
              } else {
                return cat;
              }
            });
            return { ...project, taskCategories: updatedCat };
          } else {
            return project;
          }
        } else {
          return project;
        }
      });

      return { projects: newProjects };
    });
  },

  addNewTask: (pId, catId, taskData) => {
    set((state) => {
      const newProjects = state.projects.map((project) => {
        if (project.id === pId) {
          if (project.taskCategories) {
            const updatedCat = project.taskCategories.map((cat) => {
              if (cat.id === catId) {
                if (cat.tasks) {
                  return {
                    ...cat,
                    tasks: [
                      ...cat.tasks,
                      { id: uuidv4(), completed: false, ...taskData },
                    ],
                  };
                } else {
                  return cat;
                }
              } else {
                return cat;
              }
            });
            return { ...project, taskCategories: updatedCat };
          } else {
            return project;
          }
        } else {
          return project;
        }
      });

      return { projects: newProjects };
    });
  },

  updateTask: (pId, catId, taskId, taskData) => {
    set((state) => {
      const newProjects = state.projects.map((project) => {
        if (project.id === pId) {
          if (project.taskCategories) {
            const updatedCat = project.taskCategories.map((cat) => {
              if (cat.id === catId) {
                if (cat.tasks) {
                  const updatedTasks = cat.tasks.map((t) => {
                    if (t.id === taskId) {
                      return { ...t, ...taskData, completed: false };
                    } else {
                      return t;
                    }
                  });
                  return { ...cat, tasks: updatedTasks };
                } else {
                  return cat;
                }
              } else {
                return cat;
              }
            });
            return { ...project, taskCategories: updatedCat };
          } else {
            return project;
          }
        } else {
          return project;
        }
      });

      return { projects: newProjects };
    });
  },

  deleteTask: (pId, catId, taskId) => {
    set((state) => {
      const newProjects = state.projects.map((project) => {
        if (project.id === pId) {
          if (project.taskCategories) {
            const updatedCat = project.taskCategories.map((cat) => {
              if (cat.id === catId) {
                if (cat.tasks) {
                  const updatedTasks = cat.tasks.filter((t) => t.id !== taskId);
                  return { ...cat, tasks: updatedTasks };
                } else {
                  return cat;
                }
              } else {
                return cat;
              }
            });
            return { ...project, taskCategories: updatedCat };
          } else {
            return project;
          }
        } else {
          return project;
        }
      });

      return { projects: newProjects };
    });
  },
}));
