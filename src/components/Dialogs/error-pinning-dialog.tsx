import { Button } from "@/components/ui/shadcn/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import { APP_DATA } from "@/constant/constants";
import { PinOffIcon } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ErrorPinningDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger render={<Button variant="outline">Share</Button>} />
      <DialogContent
        showCloseButton={false}
        className="text-center select-none"
      >
        <div className="flex w-full justify-center items-center">
          <div className="bg-muted p-4 rounded-xl border-2 border-dashed">
            <PinOffIcon size={30} />
          </div>
        </div>
        <DialogHeader>
          <DialogTitle>
            {" "}
            You cannot pin more than {APP_DATA.itemPinLimit} projects
          </DialogTitle>
          <DialogDescription>
            Please unpin some projects before pinning more.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose
            render={
              <Button type="button" variant={"secondary"} className={"w-full"}>
                Okay
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
