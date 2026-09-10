import { Button } from "@/components/ui/shadcn/button";
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

export default function FilterPopover() {
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
        <PopoverHeader className="border-b pb-3">
          <PopoverTitle>Filter projects</PopoverTitle>
        </PopoverHeader>
        <div className="grid gap-4 pt-1">
          <div className="grid gap-2">
            <p className="text-xs font-medium text-muted-foreground">Status</p>
            <div className="grid grid-cols-2 gap-2">
              {["Active", "On Hold", "Completed", "Archived"].map((status) => (
                <label key={status} className="flex items-center gap-2 text-sm">
                  <Checkbox aria-label={`Filter by ${status}`} />
                  {status}
                </label>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <p className="text-xs font-medium text-muted-foreground">
              Progress
            </p>
            <Select defaultValue="any">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any progress</SelectItem>
                <SelectItem value="not-started">Not started</SelectItem>
                <SelectItem value="in-progress">In progress</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <Select defaultValue="any">
              <SelectTrigger className="w-full" aria-label="Filter by due date">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any date</SelectItem>
                <SelectItem value="week">Next 7 days</SelectItem>
                <SelectItem value="month">Next 30 days</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="updated">
              <SelectTrigger className="w-full" aria-label="Sort projects">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updated">Recently updated</SelectItem>
                <SelectItem value="name">Project name</SelectItem>
                <SelectItem value="due-date">Due date</SelectItem>
                <SelectItem value="progress">Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
