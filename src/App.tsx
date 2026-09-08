import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import OverviewPage from "./pages/Overview";
import ProjectPage from "./pages/Projects";
import TasksPage from "./pages/Tasks";
import SettingsPage from "./pages/Settings";
import ProjectViewPage from "./pages/ProjectView";

function App() {
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
