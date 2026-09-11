import { AppSidebar } from "@/components/side-bar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/shadcn/sidebar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/shadcn/tooltip";
import { Outlet } from "react-router-dom";
import { useProjectStore } from "@/store/project.store";

export default function RootLayout() {
  const initializeProjects = useProjectStore(
    (state) => state.initializeProjects,
  );

  initializeProjects();

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="select-none"
      draggable={false}
      onDrag={(e) => e.preventDefault()}
      onDragStartCapture={(e) => e.preventDefault()}
    >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Outlet />
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
      </ThemeProvider>
    </div>
  );
}
