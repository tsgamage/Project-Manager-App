import type { ITaskCategory } from "@/types/project.types";
import { Button } from "../ui/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/shadcn/dialog";
import { Input } from "../ui/shadcn/input";
import { Label } from "../ui/shadcn/label";
import { useState } from "react";
import type { StrictOmit } from "@/lib/utils";

interface Props {
  open: boolean;
  category?: ITaskCategory;
  onOpenChange: (open: boolean) => void;
  onSave: (category: StrictOmit<ITaskCategory, "id" | "tasks">) => void;
}

export default function TaskCategoryDialog({
  open,
  category,
  onOpenChange,
  onSave,
}: Props) {
  type DraftType = StrictOmit<ITaskCategory, "id" | "tasks">;
  const [draft, setDraft] = useState<DraftType>({ name: category?.name ?? "" });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category ? "Update" : "Add"} task category</DialogTitle>
          <DialogDescription>
            {category
              ? "Change category details"
              : "Create a category to organize this project's work."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="category-name">Category name</Label>
          <Input
            id="category-name"
            defaultValue={draft.name}
            onChange={(event) =>
              setDraft({ ...draft, name: event.target.value })
            }
            placeholder="e.g. Launch"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={!draft.name.trim()}
            className={"disabled:bg-gray-400"}
            onClick={() => {
              onSave(draft);
              onOpenChange(false);
            }}
          >
            {category ? "Update" : "Add"} category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
