import SearchInput from "@/components/ui/search-input";
import { Button } from "@/components/ui/shadcn/button";

import { ChevronsDownUpIcon, ChevronsUpDownIcon } from "lucide-react";
import FilterPopover, { type TaskSort } from "./filter-popover";

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
    <div className="flex w-full gap-2 items-center justify-between mb-8">
      <div className="flex w-full gap-2 items-center">
        <SearchInput
          placeholder="Search Tasks ..."
          value={search}
          onSearch={(e) => onSearchChange(e.target.value)}
          onReset={() => onSearchChange("")}
        />
        <FilterPopover
          project={project}
          status={status}
          priority={priority}
          sort={sort}
          projects={projects}
          onProjectChange={onProjectChange}
          onStatusChange={onStatusChange}
          onPriorityChange={onPriorityChange}
          onSortChange={onSortChange}
          onReset={onReset}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onExpandAll}>
          <ChevronsUpDownIcon />
          Expand all
        </Button>
        <Button variant="outline" size="sm" onClick={onCollapseAll}>
          <ChevronsDownUpIcon /> Collapse all
        </Button>
      </div>
    </div>
  );
}
