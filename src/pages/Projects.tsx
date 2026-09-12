import { useMemo, useState } from "react";
import PageWrapper from "@/components/Page-Wrapper";
import ProjectCard from "@/components/pages/Projects/Card";
import Header from "@/components/pages/Projects/Header";
import type { IProject } from "@/types/project.types";
import { useProjectStore } from "@/store/project.store";
import type { ProjectCreateData } from "@/components/Dialogs/ProjectDialog";
import ProjectDialog from "@/components/Dialogs/ProjectDialog";
import { ProjectPagination } from "@/components/ui/project-pagination";
import { Separator } from "@/components/ui/shadcn/separator";
import { ErrorPinningDialog } from "@/components/Dialogs/error-pinning-dialog";

export type ProjectViewType = "card" | "list";

export default function ProjectPage() {
  const [pinningError, setPinningError] = useState(false);
  const [createProjectDialog, setCreateProjectDialog] = useState<{
    open: boolean;
    pData: ProjectCreateData | null;
  }>({
    open: false,
    pData: null,
  });

  const [view, setView] = useState<ProjectViewType>("card");
  const [selectedProjectIds, setSelectedProjectIds] = useState<Set<string>>(
    new Set(),
  );

  const addNewProject = useProjectStore((state) => state.addNewProject);
  const filteredProjects = useProjectStore((state) => state.filteredProjects);
  const changeProjectStatus = useProjectStore(
    (state) => state.changeProjectStatus,
  );
  const pinProject = useProjectStore((state) => state.pinProject);
  const unpinProject = useProjectStore((state) => state.unpinProject);

  const visibleProjects = useMemo(
    () => filteredProjects.filter((project) => project.status !== "Archived"),
    [filteredProjects],
  );

  const toggleProjectSelection = (projectId: string) => {
    setSelectedProjectIds((current) => {
      const updatedSet = new Set(current);
      if (updatedSet.has(projectId)) updatedSet.delete(projectId);
      else updatedSet.add(projectId);
      return updatedSet;
    });
  };

  const clearSelection = () => setSelectedProjectIds(new Set());

  const selectAllVisible = () => {
    setSelectedProjectIds(
      new Set(visibleProjects.map((project) => project.id)),
    );
  };

  const updateProjectStatus = (
    projectIds: string[],
    status: IProject["status"],
  ) => {
    projectIds.map((pId) => {
      changeProjectStatus(pId, status);
    });
    clearSelection();
  };

  const archiveProjects = (projectIds: string[]) => {
    updateProjectStatus(projectIds, "Archived");
  };

  const selectedIds = [...selectedProjectIds];
  const allVisibleSelected =
    visibleProjects.length > 0 &&
    visibleProjects.every((project) => selectedProjectIds.has(project.id));

  return (
    <>
      <PageWrapper>
        <div className="space-y-8 px-5 py-6 lg:px-8">
          <Header
            view={view}
            onViewChange={setView}
            selectedCount={selectedProjectIds.size}
            allVisibleSelected={allVisibleSelected}
            onSelectAll={selectAllVisible}
            onClearSelection={clearSelection}
            onBulkStatusChange={(status) =>
              updateProjectStatus(selectedIds, status)
            }
            onBulkArchive={() => archiveProjects(selectedIds)}
            onCreateProject={() =>
              setCreateProjectDialog((prev) => ({ ...prev, open: true }))
            }
          />
          <section
            className={
              view === "card"
                ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                : "grid gap-3"
            }
            aria-label="Projects"
          >
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                view={view}
                isSelected={selectedProjectIds.has(project.id)}
                onSelect={toggleProjectSelection}
                onArchive={(projectId) => archiveProjects([projectId])}
                selectedItemCount={selectedIds.length}
                onStatusChange={(projectId, status) =>
                  updateProjectStatus([projectId], status)
                }
                onPin={(pId) => {
                  const isSuccess = pinProject(pId);
                  setPinningError(!isSuccess);
                }}
                onUnpin={unpinProject}
              />
            ))}
          </section>
          <footer className="text-xs text-muted-foreground">
            <Separator />
            <div className="flex items-center justify-between mt-5">
              <span>
                Showing {visibleProjects.length} of {filteredProjects.length}{" "}
                projects
              </span>
              <ProjectPagination
                itemCount={10}
                onItemCountChange={() => {}}
                onPreviousClick={() => {}}
                onNextClick={() => {}}
                onFirstClick={() => {}}
                onLastClick={() => {}}
              />
            </div>
          </footer>
        </div>
      </PageWrapper>
      {createProjectDialog.open && (
        <ProjectDialog
          open
          onOpenChange={(open) =>
            setCreateProjectDialog((prev) => ({ ...prev, open }))
          }
          onSave={addNewProject}
        />
      )}

      <ErrorPinningDialog open={pinningError} onOpenChange={setPinningError} />
    </>
  );
}
