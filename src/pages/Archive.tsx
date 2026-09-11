import { useMemo, useState } from "react";
import PageWrapper from "@/components/Page-Wrapper";
import ProjectCard from "@/components/pages/Projects/Card";
import { Button } from "@/components/ui/shadcn/button";
import type { IProject } from "@/types/project.types";
import { useProjectStore } from "@/store/project.store";

export default function ArchivePage() {
  const [selectedProjectIds, setSelectedProjectIds] = useState<Set<string>>(
    new Set(),
  );

  const filteredProjects = useProjectStore((state) => state.filteredProjects);
  const changeProjectStatus = useProjectStore(
    (state) => state.changeProjectStatus,
  );

  const visibleProjects = useMemo(
    () => filteredProjects.filter((project) => project.status === "Archived"),
    [filteredProjects],
  );

  const clearSelection = () => setSelectedProjectIds(new Set());

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

  return (
    <PageWrapper>
      <div className="space-y-8 px-5 py-6 lg:px-8">
        <section
          className={"grid gap-4 md:grid-cols-2 lg:grid-cols-3"}
          aria-label="Projects"
        >
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              view={"card"}
              isSelected={false}
              onSelect={() => {}}
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
            Showing {visibleProjects.length} of {filteredProjects.length}{" "}
            projects
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
