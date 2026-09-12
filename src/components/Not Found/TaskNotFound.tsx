import { CircleCheckBigIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/shadcn/empty";
import type { ComponentProps } from "react";
import { cn } from "cn";

export default function TaskNotFound({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <Empty className={cn("rounded-none border-none", className)} {...props}>
      <EmptyMedia variant="icon">
        <CircleCheckBigIcon />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>No tasks in this category</EmptyTitle>
        <EmptyDescription>Add the first task to get started.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
