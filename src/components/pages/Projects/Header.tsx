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
  SearchIcon,
  XIcon,
} from "lucide-react";
import FilterPopover from "./Header/FilterPopover";

interface HeaderProps {
  view: ProjectViewType;
  onViewChange: (view: ProjectViewType) => void;
  selectedCount: number;
  allVisibleSelected: boolean;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onBulkStatusChange: (status: Exclude<IProject["status"], "Archived">) => void;
  onBulkArchive: () => void;
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
}: HeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-5 justify-between">
        <div className="flex gap-2 w-full items-center justify-between">
          <div className="flex w-full gap-2">
            <InputGroup>
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search projects..." />
            </InputGroup>
            <FilterPopover />
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
            <Button>
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
