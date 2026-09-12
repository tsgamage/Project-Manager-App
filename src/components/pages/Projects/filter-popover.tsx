import FilterSelect from "@/components/ui/filter-select";
import { Button } from "@/components/ui/shadcn/button";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import type { IProject } from "@/types/project.types";
import { FilterIcon, RotateCcwIcon } from "lucide-react";

export type ProgressFilter = "any" | "not-started" | "in-progress" | "done";
export type DueDateFileter = "any" | "week" | "month" | "overdue";
export type SortFilter = "updated" | "name" | "due-date" | "progress";

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

interface Props {
  isFiltersActive: boolean;
  statusFilter: Set<IProject["status"]>;
  progressFilter: ProgressFilter;
  dueDateFilter: DueDateFileter;
  sort: SortFilter;
  onReset: () => void;
  onStatusFilterChange: (statusFilter: Set<IProject["status"]>) => void;
  onProgressFilterChange: (filter: ProgressFilter) => void;
  onDueDateFilterChange: (filter: DueDateFileter) => void;
  onSortChange: (sort: SortFilter) => void;
}

export default function FilterPopover({
  isFiltersActive,
  statusFilter,
  progressFilter,
  dueDateFilter,
  sort,
  onReset,
  onStatusFilterChange,
  onProgressFilterChange,
  onDueDateFilterChange,
  onSortChange,
}: Props) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" size="icon" aria-label="Filter projects" />
        }
      >
        <FilterIcon />
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80">
        <PopoverHeader className="border-b pb-3 h-8 flex flex-row justify-between items-center">
          <PopoverTitle>Filter projects</PopoverTitle>
          {isFiltersActive && (
            <Button
              size={"icon-sm"}
              variant={"outline"}
              title="Reset Filters"
              onClick={onReset}
            >
              <RotateCcwIcon />
            </Button>
          )}
        </PopoverHeader>

        <div className="grid gap-4 pt-1">
          <div className="grid gap-2">
            <p className="text-xs font-medium text-muted-foreground">Status</p>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  "Active",
                  "On Hold",
                  "Completed",
                  "Archived",
                ] as IProject["status"][]
              ).map((sts) => (
                <label key={sts} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={statusFilter.has(sts)}
                    aria-label={`Filter by ${sts}`}
                    onCheckedChange={() => {
                      const updatedSet = new Set(statusFilter);
                      if (statusFilter.has(sts)) updatedSet.delete(sts);
                      else updatedSet.add(sts);
                      onStatusFilterChange(updatedSet);
                    }}
                  />
                  {sts}
                </label>
              ))}
            </div>
          </div>

          <div className="grid gap-2 grid-cols-1">
            <FilterSelect
              label="Filter by progress"
              items={filterItems.progress}
              value={progressFilter}
              onValueChange={(value) =>
                onProgressFilterChange(value ?? "updated")
              }
            />
            <FilterSelect
              label="Filter by due date"
              items={filterItems.dueDate}
              value={dueDateFilter}
              onValueChange={(value) =>
                onDueDateFilterChange(value ?? "updated")
              }
            />
            <FilterSelect
              label="Sort by"
              items={filterItems.sort}
              value={sort}
              onValueChange={(value) => onSortChange(value ?? "updated")}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
