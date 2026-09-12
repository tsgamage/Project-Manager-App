"use client";

import * as React from "react";

import { NavMain } from "@/components/side-bar/nav-main";
import { NavProjects } from "@/components/side-bar/nav-projects";
import { NavSecondary } from "@/components/side-bar/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/shadcn/sidebar";
import {
  Settings2Icon,
  LayersIcon,
  CircleCheckBigIcon,
  ChartNoAxesCombinedIcon,
  BoxIcon,
  ArchiveIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useProjectStore } from "@/store/project.store";
import { Separator } from "../ui/shadcn/separator";

const data = {
  user: {
    name: "Princess",
    email: "princess@crownix.lk",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "/",
      icon: <ChartNoAxesCombinedIcon />,
      isActive: true,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: <CircleCheckBigIcon />,
      items: [
        { title: "Today Priority", url: "/tasks?filter=today" },
        { title: "Upcoming", url: "/tasks?filter=upcoming" },
        { title: "Completed", url: "/tasks?filter=completed" },
        { title: "Missed", url: "/tasks?filter=missed" },
      ],
    },
    {
      title: "Projects",
      url: "/project/all",
      icon: <BoxIcon />,
    },
  ],
  navSecondary: [
    { title: "Archive", url: "/archive", icon: <ArchiveIcon /> },
    { title: "Settings", url: "/settings", icon: <Settings2Icon /> },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const projects = useProjectStore((state) => state.projects);

  const navMain = data.navMain.map((item) => {
    if (item.title === "Projects") {
      return {
        ...item,
        items: projects.map((project) => ({
          title: project.name,
          url: `/project/${project.id}`,
        })),
      };
    } else return item;
  });

  const pinnedProjects = projects
    .filter((p) => p.pinned)
    .map((p) => ({ id: p.id, name: p.name, url: `/project/${p.id}` }));

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link to="#" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <LayersIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Project Manager</span>
                <span className="truncate text-xs">by Crownix - v0.0.1</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter className="flex gap-0 pt-0">
        {pinnedProjects?.length > 0 && (
          <NavProjects projects={pinnedProjects} />
        )}
        <Separator />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarFooter>
    </Sidebar>
  );
}
