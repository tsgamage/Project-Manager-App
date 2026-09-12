import { Button } from "@/components/ui/shadcn/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/shadcn/input-group";

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
  RotateCcwIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import { FilterIcon } from "lucide-react";
import { useDebounce } from "use-debounce";
import { useProjectStore } from "@/store/project.store";
import { getProgressForProject } from "@/lib/utils";
import { differenceInDays } from "date-fns";

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

type ProgressFilter = "any" | "not-started" | "in-progress" | "done";
type DueDateFileter = "any" | "week" | "month" | "overdue";
type SortFilter = "updated" | "name" | "due-date" | "progress";

type FilterItemsType = {
  status: IProject["status"][];
  progress: { label: string; value: ProgressFilter }[];
  dueDate: { label: string; value: DueDateFileter }[];
  sort: { label: string; value: SortFilter }[];
};

const filterItems: FilterItemsType = {
  status: ["Active", "Completed", "On Hold"],
  progress: [
    { label: "Any progress", value: "any" },
    { label: "Not started", value: "not-started" },
    { label: "In progress", value: "in-progress" },
    { label: "All Done", value: "done" },
  ],
  dueDate: [
    { label: "Any date", value: "any" },
    { label: "Next 7 days", value: "week" },
    { label: "Next 30 days", value: "month" },
    { label: "Overdue", value: "overdue" },
  ],
  sort: [
    { label: "Recently updated", value: "updated" },
    { label: "Project name", value: "name" },
    { label: "Due date", value: "due-date" },
    { label: "Progress", value: "progress" },
  ],
};

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
    status: Set<string>;
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
            <InputGroup>
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupInput
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search projects..."
              />
              <InputGroupAddon align={"inline-end"}>
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  onClick={() => setInputValue("")}
                >
                  <XIcon />
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Filter projects"
                  />
                }
              >
                <FilterIcon />
              </PopoverTrigger>

              <PopoverContent align="end" className="w-80">
                <PopoverHeader className="border-b pb-3 h-8 flex flex-row justify-between items-center">
                  <PopoverTitle>Filter projects</PopoverTitle>
                  {filterAdded && (
                    <Button
                      size={"icon-sm"}
                      variant={"outline"}
                      title="Reset Filters"
                      onClick={() => setFilters(INITIAL_FILTER_STATE)}
                    >
                      <RotateCcwIcon />
                    </Button>
                  )}
                </PopoverHeader>
                <div className="grid gap-4 pt-1">
                  <div className="grid gap-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      Status
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {(
                        [
                          "Active",
                          "On Hold",
                          "Completed",
                          "Archived",
                        ] as IProject["status"][]
                      ).map((status) => (
                        <label
                          key={status}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Checkbox
                            checked={filters.status.has(status)}
                            aria-label={`Filter by ${status}`}
                            onCheckedChange={() => {
                              const updatedSet = new Set(filters.status);
                              if (filters.status.has(status))
                                updatedSet.delete(status);
                              else updatedSet.add(status);
                              setFilters((prev) => ({
                                ...prev,
                                status: updatedSet,
                              }));
                            }}
                          />
                          {status}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Progress Filter */}
                  <div className="grid gap-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      Progress
                    </p>
                    <Select
                      items={filterItems.progress}
                      value={filters.progress}
                      onValueChange={(value) =>
                        setFilters((prev) => ({
                          ...prev,
                          progress: value as ProgressFilter,
                        }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {filterItems.progress.map((i) => (
                          <SelectItem value={i.value}>{i.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2 grid-cols-2">
                    {/* Due Date Filter */}
                    <Select
                      items={filterItems.dueDate}
                      value={filters.dueDate}
                      onValueChange={(value) =>
                        setFilters((prev) => ({
                          ...prev,
                          dueDate: value as DueDateFileter,
                        }))
                      }
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-label="Filter by due date"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {filterItems.dueDate.map((i) => (
                          <SelectItem value={i.value}>{i.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* Sort Filter */}
                    <Select
                      items={filterItems.sort}
                      value={filters.sort}
                      onValueChange={(value) =>
                        setFilters((prev) => ({
                          ...prev,
                          sort: value as SortFilter,
                        }))
                      }
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-label="Sort projects"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {filterItems.sort.map((i) => (
                          <SelectItem value={i.value}>{i.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
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
        <div className="flex gap-3 rounded-lg border bg-accent p-3 items-center justify-between">
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
