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

export default function ProjectsNotFound({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <Empty className={cn("min-h-72", className)} {...props}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ListTodoIcon />
        </EmptyMedia>
        <EmptyTitle>No projects found</EmptyTitle>
        <EmptyDescription>Create a project to get started</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
