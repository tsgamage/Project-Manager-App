import PageWrapper from "@/components/Page-Wrapper";
import { Badge } from "@/components/ui/shadcn/badge";
import TaskGroup, {
  type Task,
} from "@/components/pages/Tasks/TaskGroup";
import TaskToolbar from "@/components/pages/Tasks/TaskToolbar";

const taskGroups: {
  name: string;
  accent: string;
  tasks: Task[];
}[] = [
  {
    name: "Project 1",
    accent: "bg-orange-500",
    tasks: [
      { title: "Create wireframes for homepage", category: "Design", status: "Today", date: "Sep 8" },
      {
        title: "Design system setup",
        category: "Design",
        status: "Completed",
        date: "Sep 5",
        completed: true,
      },
      { title: "Set up Next.js project", category: "Development", status: "Upcoming", date: "Sep 12" },
      { title: "Implement auth flow", category: "Development", status: "Missed", date: "Sep 3" },
    ],
  },
  {
    name: "Project 2",
    accent: "bg-violet-500",
    tasks: [
      { title: "Competitor analysis", category: "Research", status: "Today", date: "Sep 8" },
      { title: "User interview synthesis", category: "Research", status: "Upcoming", date: "Sep 15" },
      { title: "Sprint planning doc", category: "Planning", status: "Missed", date: "Sep 1" },
    ],
  },
];

export default function TasksPage() {
  return (
    <PageWrapper>
      <div className="space-y-6 px-5 py-6 lg:px-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-3xl font-semibold tracking-tight">
              All Tasks
            </h1>
            <Badge variant="secondary" className="rounded-full">
              24 tasks
            </Badge>
          </div>
        </header>
        <TaskToolbar />
        <section className="space-y-4" aria-label="Task groups">
          {taskGroups.map((group) => (
            <TaskGroup
              key={group.name}
              name={group.name}
              accent={group.accent}
              tasks={group.tasks}
              taskCount={group.tasks.length}
            />
          ))}
        </section>
      </div>
    </PageWrapper>
  );
}
