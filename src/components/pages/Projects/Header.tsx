import { Button } from "@/components/ui/shadcn/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/shadcn/input-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";
import {
  Grid2x2Icon,
  ListIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";

type ProjectView = "cards" | "list";

interface HeaderProps {
  view: ProjectView;
  onViewChange: (view: ProjectView) => void;
}

export default function Header({ view, onViewChange }: HeaderProps) {
  return (
    <header className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm text-muted-foreground">Workspace</p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          All Projects
        </h1>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <InputGroup className="w-full sm:w-56">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search projects..." />
        </InputGroup>
        <div className="flex gap-2">
          <Tabs
            value={view}
            onValueChange={(value) => onViewChange(value as ProjectView)}
          >
            <TabsList>
              <TabsTrigger value="cards" aria-label="Card view">
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
    </header>
  );
}
