import DeleteDialog from "@/components/Dialogs/DeleteDialog";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { ArchiveIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

type DeleteDialogTypes = "archive" | "project";

function getDeleteDialogTexts(type: DeleteDialogTypes) {
  switch (type) {
    case "project":
      return {
        title: "Delete Project",
        description:
          "Are you sure you want to delete this project? All tasks and categories in this project will also be deleted. This action cannot be undone.",
        deleteButtonText: "Delete Project",
      };
    case "archive":
      return {
        title: "Archive Project",
        description:
          "Are you sure you want to archive this project? You can restore it later from the archive. Archived projects will not be visible in the main project list.",
        deleteButtonText: "Archive Project",
      };
  }
}

interface Props {
  isArchived: boolean;
  onArchive: () => void;
  onRestore: () => void;
  onDelete: () => void;
}

export default function Info({
  isArchived,
  onArchive,
  onDelete,
  onRestore,
}: Props) {
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    type: DeleteDialogTypes;
  }>({ open: false, type: "archive" });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Project information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs text-muted-foreground">Created</p>
            <p className="mt-1 text-sm">September 1, 2026</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Last edited</p>
            <p className="mt-1 text-sm">Today at 10:42 AM</p>
          </div>
        </CardContent>
      </Card>
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle>Danger zone</CardTitle>
          <p className="text-sm text-muted-foreground">
            Deleting a project removes it from this workspace permanently.
          </p>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => {
              if (isArchived) {
                onRestore();
              } else {
                setDeleteDialog({ open: true, type: "archive" });
              }
            }}
          >
            <ArchiveIcon /> {isArchived ? "Restore project" : "Archive project"}
          </Button>
          <Button
            variant="destructive"
            onClick={() => setDeleteDialog({ open: true, type: "project" })}
          >
            <Trash2Icon /> Delete project
          </Button>
        </CardContent>
      </Card>

      {deleteDialog.open && (
        <DeleteDialog
          open={deleteDialog.open}
          title={getDeleteDialogTexts(deleteDialog.type).title}
          description={getDeleteDialogTexts(deleteDialog.type).description}
          deleteBtnText={
            getDeleteDialogTexts(deleteDialog.type).deleteButtonText
          }
          onOpenChange={() =>
            setDeleteDialog((prevState) => ({
              ...prevState,
              open: !prevState.open,
            }))
          }
          onDelete={() => {
            switch (deleteDialog.type) {
              case "project":
                onDelete();
                setDeleteDialog((prev) => ({ ...prev, open: false }));
                break;
              case "archive":
                onArchive();
                setDeleteDialog((prev) => ({ ...prev, open: false }));
                break;
              default:
                break;
            }
          }}
        />
      )}
    </>
  );
}
