import { useMemo, useState } from "react";
import PageWrapper from "@/components/Page-Wrapper";
import ProjectCard from "@/components/pages/Projects/Card";
import Header from "@/components/pages/Projects/Header";
import { Button } from "@/components/ui/shadcn/button";
import { DUMMY_PROJETCS } from "@/data/projects.data";
import type { IProject } from "@/types/project.types";

export type ProjectViewType = "card" | "list";

export default function ProjectPage() {
  const [view, setView] = useState<ProjectViewType>("card");
  const [projects, setProjects] = useState(DUMMY_PROJETCS);
  const [selectedProjectIds, setSelectedProjectIds] = useState<Set<string>>(
    new Set(),
  );

  const visibleProjects = useMemo(
    () => projects.filter((project) => project.status !== "Archived"),
    [projects],
  );

  const toggleProjectSelection = (projectId: string) => {
    setSelectedProjectIds((current) => {
      const next = new Set(current);
      if (next.has(projectId)) next.delete(projectId);
      else next.add(projectId);
      return next;
    });
  };

  const clearSelection = () => setSelectedProjectIds(new Set());

  const selectAllVisible = () => {
    setSelectedProjectIds(new Set(visibleProjects.map((project) => project.id)));
  };

  const updateProjectStatus = (
    projectIds: string[],
    status: IProject["status"],
  ) => {
    setProjects((current) =>
      current.map((project) =>
        projectIds.includes(project.id) ? { ...project, status } : project,
      ),
    );
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
    <PageWrapper>
      <div className="space-y-8 px-5 py-6 lg:px-8">
        <Header
          view={view}
          onViewChange={setView}
          selectedCount={selectedProjectIds.size}
          allVisibleSelected={allVisibleSelected}
          onSelectAll={selectAllVisible}
          onClearSelection={clearSelection}
          onBulkStatusChange={(status) => updateProjectStatus(selectedIds, status)}
          onBulkArchive={() => archiveProjects(selectedIds)}
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
            />
          ))}
        </section>
        <footer className="flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
          <span>
            Showing {visibleProjects.length} of {projects.length} projects
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </footer>
      </div>
    </PageWrapper>
  );
}
