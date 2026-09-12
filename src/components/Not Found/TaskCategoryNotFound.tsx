import { CheckCircle2Icon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/shadcn/empty";
import type { ComponentProps } from "react";
import { cn } from "cn";

export default function TaskCategoryNotFound({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <Empty
      className={cn("min-h-32 bg-muted/20 border-2", className)}
      {...props}
    >
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CheckCircle2Icon />
        </EmptyMedia>
        <EmptyTitle>No task categories yet</EmptyTitle>
        <EmptyDescription>
          Create a category to organize tasks in this project.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
