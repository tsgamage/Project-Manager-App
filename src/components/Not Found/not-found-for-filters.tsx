import { ListTodoIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/shadcn/empty";
import type { ComponentProps } from "react";
import { cn } from "cn";
import { Button } from "../ui/shadcn/button";

interface Props extends ComponentProps<"div"> {
  type: "projects" | "tasks";
  onResetFilters: () => void;
}

export default function NotFoundForFilters({
  type,
  className,
  onResetFilters,
  ...props
}: Props) {
  return (
    <Empty className={cn("min-h-72", className)} {...props}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ListTodoIcon />
        </EmptyMedia>
        <EmptyTitle>
          No matching {type === "projects" ? "projects" : "tasks"}
        </EmptyTitle>
        <EmptyDescription>
          Try changing your search or filters.
        </EmptyDescription>
      </EmptyHeader>
      <Button variant="outline" onClick={onResetFilters}>
        Reset filters
      </Button>
    </Empty>
  );
}
