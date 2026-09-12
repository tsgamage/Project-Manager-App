import FilterSelect from "@/components/ui/filter-select";
import { Button } from "@/components/ui/shadcn/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";

import { FilterIcon, RotateCcwIcon } from "lucide-react";

export type TaskSort = "dueDate" | "priority" | "status";

interface Props {
  project: string;
  status: string;
  priority: string;
  sort: TaskSort;
  projects: { id: string; name: string }[];
  onProjectChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onSortChange: (value: TaskSort) => void;
  onReset: () => void;
}

export default function FilterPopover({
  project,
  status,
  priority,
  sort,
  projects,
  onProjectChange,
  onStatusChange,
  onPriorityChange,
  onSortChange,
  onReset,
}: Props) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" size="icon" aria-label="Filter Tasks" />
        }
      >
        <FilterIcon />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader className="border-b pb-3 h-8 flex flex-row justify-between items-center">
          <PopoverTitle>Filter tasks</PopoverTitle>

          <Button
            size={"icon-sm"}
            variant={"outline"}
            title="Reset Filters"
            onClick={onReset}
          >
            <RotateCcwIcon />
          </Button>
        </PopoverHeader>
        <div className="flex flex-col p-2 gap-2">
          <FilterSelect
            label="Filter by project"
            value={project}
            onValueChange={onProjectChange}
            items={[
              { value: "all", label: "All Projects" },
              ...projects.map((item) => ({
                value: item.id,
                label: item.name,
              })),
            ]}
          />
          <FilterSelect
            label="Filter by status"
            value={status}
            onValueChange={onStatusChange}
            items={[
              { value: "all", label: "All Statuses" },
              { value: "Today", label: "Today" },
              { value: "Upcoming", label: "Upcoming" },
              { value: "Completed", label: "Completed" },
              { value: "Missed", label: "Missed" },
              { value: "No due date", label: "No Due Date" },
            ]}
          />
          <FilterSelect
            label="Filter by priority"
            value={priority}
            onValueChange={onPriorityChange}
            items={[
              { value: "all", label: "All Priorities" },
              { value: "High", label: "High" },
              { value: "Medium", label: "Medium" },
              { value: "Low", label: "Low" },
            ]}
          />
          <FilterSelect
            label="Sort tasks by"
            value={sort}
            onValueChange={(value) => onSortChange(value as TaskSort)}
            items={[
              { value: "dueDate", label: "Due Date" },
              { value: "priority", label: "Priority" },
              { value: "status", label: "Status" },
            ]}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
