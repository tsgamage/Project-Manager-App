"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/shadcn/sidebar";
import { useProjectStore } from "@/store/project.store";
import type { IProject, TProjectStatus } from "@/types/project.types";
import {
  MoreHorizontalIcon,
  PinOffIcon,
  PinIcon,
  ActivityIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const statusOptions = ["Active", "On Hold", "Completed"] as TProjectStatus[];

export function NavProjects({
  projects,
}: {
  projects: {
    id: IProject["id"];
    name: IProject["name"];
    url: string;
  }[];
}) {
  const { isMobile } = useSidebar();

  const onStatusChange = useProjectStore((state) => state.changeProjectStatus);
  const unpinProject = useProjectStore((state) => state.unpinProject);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Pinned Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton render={<Link to={item.url} />}>
              {/* {item.icon} */}
              <PinIcon className="h-4 w-4 text-muted-foreground" />
              <span title={item.name}>{item.name}</span>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuAction
                    showOnHover
                    className="aria-expanded:bg-muted"
                  />
                }
              >
                <MoreHorizontalIcon />
                <span className="sr-only">More</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <ActivityIcon />
                    Change Status
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {statusOptions.map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => onStatusChange(item.id, status)}
                      >
                        {status}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem onClick={() => unpinProject(item.id)}>
                  <PinOffIcon className="text-muted-foreground" />
                  <span>Unpin Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
