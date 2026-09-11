import { DUMMY_PROJETCS } from "@/data/projects.data";
import type { StrictOmit } from "@/lib/utils";
import type { IProject, ITask, ITaskCategory } from "@/types/project.types";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type { UpdateProjectData } from "@/components/pages/ProjectView/ProjectDetails";
import type { ProjectCreateData } from "@/components/Dialogs/ProjectDialog";

type ProjectsStore = {
  projects: IProject[];
  initializeProjects: () => void;
  setProjects: (projects?: IProject[]) => void;

  filteredProjects: IProject[];
  setFilteredProjects: (projects?: IProject[]) => void;
  resetFilteredProjects: () => void;

  addNewProject: (pData: ProjectCreateData) => void;
  getProjectById: (pId: IProject["id"]) => IProject | undefined;
  updateProject: (pId: IProject["id"], pData: UpdateProjectData) => void;
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
  filteredProjects: [],

  initializeProjects: () => {
    set(() => {
      const storedProjects = DUMMY_PROJETCS;
      return { projects: storedProjects, filteredProjects: storedProjects };
    });
  },

  // Project Related Methods

  setProjects: (projects) => {
    set(() => ({
      projects: projects || [],
    }));
  },

  setFilteredProjects: (projects) => {
    set(() => ({
      filteredProjects: projects || [],
    }));
  },

  resetFilteredProjects: () => {
    set({ filteredProjects: get().projects });
  },

  getProjectById: (pId) => {
    return get().projects.find((project) => project.id === pId);
  },

  addNewProject: (pData) => {
    set((state) => ({
      projects: [
        {
          ...pData,
          id: uuidv4(),
          status: "Active",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        ...state.projects,
      ],
    }));
  },

  updateProject: (pId, pData) => {
    set((state) => {
      const updatedProjects = state.projects.map((project) => {
        if (project.id === pId) {
          return { ...project, ...pData, updatedAt: Date.now() };
        } else {
          return project;
        }
      });

      return { projects: updatedProjects };
    });
  },

  deleteProject: (pId) => {
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== pId),
    }));
    get().resetFilteredProjects();
  },

  changeProjectStatus: (pId, status) => {
    set((state) => {
      const updatedProjects = state.projects.map((p) => {
        if (p.id === pId)
          return { ...p, status: status, updatedAt: Date.now() };
        return p;
      });
      return { projects: updatedProjects };
    });
    get().resetFilteredProjects();
  },

  // Category Related methods

  addNewCategory: (pId, catData) => {
    set((state) => {
      const updatedProjects = state.projects.map((project) => {
        if (project.id === pId) {
          if (project.taskCategories) {
            return {
              ...project,
              taskCategories: [
                ...project.taskCategories,
                { id: uuidv4(), ...catData },
              ],
              updatedAt: Date.now(),
            };
          } else {
            return {
              ...project,
              taskCategories: [{ id: uuidv4(), ...catData }],
              updatedAt: Date.now(),
            };
          }
        } else {
          return project;
        }
      });
      return { projects: updatedProjects };
    });
    get().resetFilteredProjects();
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
            return {
              ...project,
              taskCategories: updatedCat,
              updatedAt: Date.now(),
            };
          } else {
            return project;
          }
        } else {
          return project;
        }
      });
      return { projects: updatedProjects };
    });
    get().resetFilteredProjects();
  },

  deleteCategory: (pId, cId) => {
    set((state) => {
      const updatedProjects = state.projects.map((project) => {
        if (project.id === pId) {
          if (project.taskCategories) {
            const updatedCat = project.taskCategories.filter(
              (cat) => cat.id !== cId,
            );
            return {
              ...project,
              taskCategories: updatedCat,
              updatedAt: Date.now(),
            };
          } else {
            return project;
          }
        } else {
          return project;
        }
      });
      return { projects: updatedProjects };
    });
    get().resetFilteredProjects();
  },

  // Task Related methods

  toggleTask: (pId, catId, taskId) => {
    set((state) => {
      const updatedProjects = state.projects.map((project) => {
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
            return {
              ...project,
              taskCategories: updatedCat,
              updatedAt: Date.now(),
            };
          } else {
            return project;
          }
        } else {
          return project;
        }
      });

      return { projects: updatedProjects };
    });
    get().resetFilteredProjects();
  },

  addNewTask: (pId, catId, taskData) => {
    set((state) => {
      const updatedProjects = state.projects.map((project) => {
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
                  return {
                    ...cat,
                    tasks: [{ id: uuidv4(), completed: false, ...taskData }],
                  };
                }
              } else {
                return cat;
              }
            });
            return {
              ...project,
              taskCategories: updatedCat,
              updatedAt: Date.now(),
            };
          } else {
            return project;
          }
        } else {
          return project;
        }
      });

      return { projects: updatedProjects };
    });
    get().resetFilteredProjects();
  },

  updateTask: (pId, catId, taskId, taskData) => {
    set((state) => {
      const updatedProjects = state.projects.map((project) => {
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
            return {
              ...project,
              taskCategories: updatedCat,
              updatedAt: Date.now(),
            };
          } else {
            return project;
          }
        } else {
          return project;
        }
      });

      return { projects: updatedProjects };
    });
    get().resetFilteredProjects();
  },

  deleteTask: (pId, catId, taskId) => {
    set((state) => {
      const updatedProjects = state.projects.map((project) => {
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
            return {
              ...project,
              taskCategories: updatedCat,
              updatedAt: Date.now(),
            };
          } else {
            return project;
          }
        } else {
          return project;
        }
      });

      return { projects: updatedProjects };
    });
    get().resetFilteredProjects();
  },
}));
