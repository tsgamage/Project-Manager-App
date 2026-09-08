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
  SendIcon,
  FrameIcon,
  PieChartIcon,
  MapIcon,
  LayersIcon,
  CircleCheckBigIcon,
  ChartNoAxesCombinedIcon,
  BoxIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

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
      items: [
        { title: "Leaning Management System for Malith Wasalage", url: "/project/p1" },
        { title: "Explorer", url: "#" },
        { title: "Quantum", url: "#" },
      ],
    },
  ],
  pinnedProjects: [
    { name: "Design Engineering", url: "#", icon: <FrameIcon /> },
    { name: "Sales & Marketing", url: "#", icon: <PieChartIcon /> },
    { name: "Travel", url: "#", icon: <MapIcon /> },
  ],
  navSecondary: [
    { title: "Settings", url: "/settings", icon: <Settings2Icon /> },
    { title: "Feedback", url: "#", icon: <SendIcon /> },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                <span className="truncate text-xs"></span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.pinnedProjects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col items-center justify-center gap-1 p-2 text-center bg-emerald-500/5 rounded-lg border border-emerald-500/10 text-muted-foreground">
          <p className="text-xs">Crownix Project Manager</p>
          <p className="text-xs">v0.0.1</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
