import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import OverviewPage from "./pages/Overview";
import ProjectPage from "./pages/Projects";
import TasksPage from "./pages/Tasks";
import SettingsPage from "./pages/Settings";
import ProjectViewPage from "./pages/ProjectView";
import ArchivePage from "./pages/Archive";
import { useProjectStore } from "./store/project.store";

function App() {
  const initializeProjects = useProjectStore(
    (state) => state.initializeProjects,
  );
  initializeProjects();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <OverviewPage /> },
        {
          path: "/project",
          children: [
            { path: "all", element: <ProjectPage /> },
            { path: ":pId", element: <ProjectViewPage /> },
          ],
        },
        { path: "/tasks", element: <TasksPage /> },
        { path: "/settings", element: <SettingsPage /> },
        { path: "/archive", element: <ArchivePage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
