import { Field, FieldLabel } from "@/components/ui/shadcn//field";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/shadcn//pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn//select";
import { cn } from "cn";
import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";

interface Props {
  disable?: {
    first?: boolean;
    last?: boolean;
    prev?: boolean;
    next?: boolean;
  };
  itemCount: number;
  onItemCountChange: (count: number) => void;
  onPreviousClick: () => void;
  onNextClick: () => void;
  onFirstClick: () => void;
  onLastClick: () => void;
}

export function ProjectPagination({
  disable,
  itemCount,
  onItemCountChange,
  onPreviousClick,
  onNextClick,
  onFirstClick,
  onLastClick,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">Item per page</FieldLabel>
        <Select
          value={itemCount}
          onValueChange={(value) => onItemCountChange(value ?? 10)}
        >
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem onClick={disable?.first ? undefined : onFirstClick}>
            <PaginationLink
              size={"icon"}
              className={cn(disable?.first && "pointer-events-none opacity-50")}
            >
              <ChevronsLeftIcon />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem onClick={disable?.prev ? undefined : onPreviousClick}>
            <PaginationPrevious
              className={cn(disable?.prev && "pointer-events-none opacity-50")}
              onMouseEnter={(e) => e.preventDefault()}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={disable?.next ? undefined : onNextClick}
              className={cn(disable?.next && "pointer-events-none opacity-50")}
            />
          </PaginationItem>
          <PaginationItem onClick={disable?.last ? undefined : onLastClick}>
            <PaginationLink
              size={"icon"}
              className={cn(disable?.last && "pointer-events-none opacity-50")}
            >
              <ChevronsRightIcon />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
