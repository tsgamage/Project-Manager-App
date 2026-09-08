import { AppSidebar } from "@/components/side-bar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/shadcn/sidebar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/shadcn/tooltip";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
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
    </>
  );
}
