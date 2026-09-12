import { Button } from "@/components/ui/shadcn/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/shadcn/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import { SearchIcon, XIcon } from "lucide-react";
import {
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
  RotateCcwIcon,
} from "lucide-react";

export type TaskSort = "dueDate" | "priority" | "status";

interface FilterSelectProps {
  label: string;
  items: { value: string; label: string }[];
  value: string;
  onValueChange: (value: string) => void;
}

function FilterSelect({
  label,
  items,
  value,
  onValueChange,
}: FilterSelectProps) {
  return (
    <Select
    items={items}
      value={value}
      onValueChange={(nextValue) => {
        if (nextValue !== null) onValueChange(nextValue);
      }}
    >
      <SelectTrigger size="sm" aria-label={label} className="min-w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface Props {
  search: string;
  project: string;
  status: string;
  priority: string;
  sort: TaskSort;
  projects: { id: string; name: string }[];
  onSearchChange: (value: string) => void;
  onProjectChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onSortChange: (value: TaskSort) => void;
  onReset: () => void;
  onCollapseAll: () => void;
  onExpandAll: () => void;
}

export default function TaskToolbar({
  search,
  project,
  status,
  priority,
  sort,
  projects,
  onSearchChange,
  onProjectChange,
  onStatusChange,
  onPriorityChange,
  onSortChange,
  onReset,
  onCollapseAll,
  onExpandAll,
}: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 flex-wrap gap-2">
        <InputGroup className="w-full sm:w-64">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search tasks..."
          />
          <InputGroupAddon align={"inline-end"}>
            <Button
              size={"icon-sm"}
              variant={"ghost"}
              aria-label="Clear task search"
              disabled={!search}
              onClick={() => onSearchChange("")}
            >
              <XIcon />
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <FilterSelect
          label="Filter by project"
          value={project}
          onValueChange={onProjectChange}
          items={[
            { value: "all", label: "All Projects" },
            ...projects.map((item) => ({ value: item.id, label: item.name })),
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
          label="Sort tasks"
          value={sort}
          onValueChange={(value) => onSortChange(value as TaskSort)}
          items={[
            { value: "dueDate", label: "Due Date" },
            { value: "priority", label: "Priority" },
            { value: "status", label: "Status" },
          ]}
        />
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Button variant="outline" size="sm" onClick={onExpandAll}>
          <ChevronsDownUpIcon />
          <span className="hidden xl:inline">Expand all</span>
        </Button>
        <Button variant="outline" size="sm" onClick={onCollapseAll}>
          <ChevronsUpDownIcon />
          <span className="hidden xl:inline">Collapse all</span>
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Reset task filters"
          onClick={onReset}
        >
          <RotateCcwIcon />
        </Button>
      </div>
    </div>
  );
}
