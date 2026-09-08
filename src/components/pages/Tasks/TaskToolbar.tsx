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
import { PlusIcon, SearchIcon } from "lucide-react";

function FilterSelect({
  label,
  items,
  defaultValue,
}: {
  label: string;
  items: string[];
  defaultValue: string;
}) {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger size="sm" aria-label={label} className="min-w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function TaskToolbar() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-2">
        <InputGroup className="w-full sm:w-48">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search tasks..." />
        </InputGroup>
        <FilterSelect
          label="Filter by project"
          defaultValue="All Projects"
          items={["All Projects", "Project 1", "Project 2", "Project 3"]}
        />
        <FilterSelect
          label="Filter by status"
          defaultValue="All Statuses"
          items={["All Statuses", "Today", "Upcoming", "Completed", "Missed"]}
        />
        <FilterSelect
          label="Filter by priority"
          defaultValue="All Priorities"
          items={["All Priorities", "High", "Medium", "Low"]}
        />
        <FilterSelect
          label="Sort tasks"
          defaultValue="Due Date"
          items={["Due Date", "Priority", "Status"]}
        />
      </div>
      <Button className="w-full sm:w-auto">
        <PlusIcon />
        Add Task
      </Button>
    </div>
  );
}