import { Button } from "@/components/ui/shadcn/button";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";
import type { ProjectViewType } from "@/pages/Projects";
import type { IProject } from "@/types/project.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import {
  ActivityIcon,
  ArchiveIcon,
  Grid2x2Icon,
  ListIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";

import { useDebounce } from "use-debounce";
import { useProjectStore } from "@/store/project.store";
import { getProgressForProject } from "@/lib/utils";
import { differenceInDays } from "date-fns";
import type {
  DueDateFileter,
  ProgressFilter,
  SortFilter,
} from "./filter-popover";
import FilterPopover from "./filter-popover";
import SearchInput from "@/components/ui/search-input";

interface HeaderProps {
  view: ProjectViewType;
  onViewChange: (view: ProjectViewType) => void;
  selectedCount: number;
  allVisibleSelected: boolean;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onBulkStatusChange: (status: Exclude<IProject["status"], "Archived">) => void;
  onBulkArchive: () => void;
  onCreateProject: () => void;
}

function filterByProgress(projects: IProject[], type: ProgressFilter) {
  switch (type) {
    case "any":
      return projects;
    case "not-started":
      return projects.filter((project) => getProgressForProject(project) === 0);
    case "in-progress":
      return projects.filter((project) => {
        const progress = getProgressForProject(project);
        return progress > 0 && progress < 100;
      });
    case "done":
      return projects.filter(
        (project) => getProgressForProject(project) === 100,
      );
  }
}

function filterByDueDate(project: IProject[], type: DueDateFileter) {
  switch (type) {
    case "any":
      return project;
    case "week":
      return project.filter((p) => {
        const difference = differenceInDays(p.dueDate, Date.now());
        return difference > 0 && difference < 7;
      });
    case "month":
      return project.filter((p) => {
        const difference = differenceInDays(p.dueDate, Date.now());
        return difference > 0 && difference < 30;
      });
    case "overdue":
      return project.filter((p) => {
        const difference = differenceInDays(p.dueDate, Date.now());
        return difference < 0;
      });
  }
}

function SortProjects(projects: IProject[], type: SortFilter) {
  switch (type) {
    case "updated":
      return projects.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    case "name":
      return projects.sort((a, b) => a.name.localeCompare(b.name));
    case "due-date":
      return projects.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      );
    case "progress":
      return projects.sort(
        (a, b) => getProgressForProject(a) - getProgressForProject(b),
      );
    default:
      return projects;
  }
}

export default function Header({
  view,
  onViewChange,
  selectedCount,
  allVisibleSelected,
  onSelectAll,
  onClearSelection,
  onBulkStatusChange,
  onBulkArchive,
  onCreateProject,
}: HeaderProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [value] = useDebounce(inputValue, 300);

  interface Filter {
    status: Set<IProject["status"]>;
    progress: ProgressFilter;
    dueDate: DueDateFileter;
    sort: SortFilter;
  }
  const INITIAL_FILTER_STATE: Filter = {
    status: new Set(),
    progress: "any",
    dueDate: "any",
    sort: "updated",
  };

  const [filters, setFilters] = useState<Filter>(INITIAL_FILTER_STATE);

  const projects = useProjectStore((state) => state.projects);
  const setFilteredProjects = useProjectStore(
    (state) => state.setFilteredProjects,
  );

  const fuse = useMemo(() => {
    return new Fuse(projects, {
      keys: [
        "name",
        "description",
        "taskCategories.name",
        "status",
        "dueDate",
        "tasks.name",
      ],
      includeScore: true,
      threshold: 0.5,
    });
  }, [projects]);

  useEffect(() => {
    let filteredProjects = fuse
      .search(value.trim())
      .map((result) => result.item);

    if (filters.status.size) {
      filteredProjects = filteredProjects.filter((p) =>
        filters.status.has(p.status),
      );
    }

    filteredProjects = filterByProgress(filteredProjects, filters.progress);
    filteredProjects = filterByDueDate(filteredProjects, filters.dueDate);
    filteredProjects = SortProjects(filteredProjects, filters.sort);

    setFilteredProjects(filteredProjects);
  }, [fuse, value, setFilteredProjects, filters]);

  const filterAdded =
    filters.status.size > 0 ||
    filters.progress !== "any" ||
    filters.dueDate !== "any" ||
    filters.sort !== "updated";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-5 justify-between">
        <div className="flex gap-2 w-full items-center justify-between">
          <div className="flex w-full gap-2">
            <SearchInput
              placeholder="Search Projects ..."
              value={inputValue}
              onSearch={(e) => setInputValue(e.target.value)}
              onReset={() => setInputValue("")}
            />
            <FilterPopover
              isFiltersActive={filterAdded}
              statusFilter={filters.status}
              progressFilter={filters.progress}
              dueDateFilter={filters.dueDate}
              sort={filters.sort}
              onReset={() => setFilters(INITIAL_FILTER_STATE)}
              onStatusFilterChange={(filter) =>
                setFilters((prev) => ({ ...prev, status: filter }))
              }
              onProgressFilterChange={(filter) =>
                setFilters((prev) => ({ ...prev, progress: filter }))
              }
              onDueDateFilterChange={(filter) =>
                setFilters((prev) => ({ ...prev, dueDate: filter }))
              }
              onSortChange={(filter) =>
                setFilters((prev) => ({ ...prev, sort: filter }))
              }
            />
          </div>
          <div className="flex gap-2">
            <Tabs
              value={view}
              onValueChange={(value) => onViewChange(value as ProjectViewType)}
            >
              <TabsList>
                <TabsTrigger value="card" aria-label="Card view">
                  <Grid2x2Icon />
                  Cards
                </TabsTrigger>
                <TabsTrigger value="list" aria-label="List view">
                  <ListIcon />
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button onClick={onCreateProject}>
              <PlusIcon />
              New Project
            </Button>
          </div>
        </div>
      </div>

      {selectedCount > 0 && (
        <div className="flex gap-3 rounded-lg border bg-muted p-3 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">
              {selectedCount} selected
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={allVisibleSelected ? onClearSelection : onSelectAll}
            >
              {allVisibleSelected ? "Clear all" : "Select all"}
            </Button>
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" size="sm" />}
              >
                <ActivityIcon />
                Change status
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  {(["Active", "On Hold", "Completed"] as const).map(
                    (status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => onBulkStatusChange(status)}
                      >
                        {status}
                      </DropdownMenuItem>
                    ),
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="destructive" size="sm" onClick={onBulkArchive}>
              <ArchiveIcon />
              Archive
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Clear selection"
              onClick={onClearSelection}
            >
              <XIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
