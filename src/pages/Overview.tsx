import PageWrapper from "@/components/Page-Wrapper";
import MetricCard from "@/components/pages/Overview/MetricCard";
import PriorityTasks from "@/components/pages/Overview/PriorityTasks";
import ProjectSummary from "@/components/pages/Overview/ProjectSummary";
import { Button } from "@/components/ui/shadcn/button";
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  ClipboardListIcon,
  FolderIcon,
} from "lucide-react";

export default function OverviewPage() {
  return (
    <PageWrapper>
      <div className="space-y-5 px-5 py-6 lg:px-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-semibold tracking-tight">
              Good morning, Alex <span aria-hidden="true">👋</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Here&apos;s what&apos;s happening across your projects
            </p>
          </div>
          <Button variant="outline" size="sm" className="self-start">
            Monday, September 8, 2026
          </Button>
        </header>
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Project metrics">
          <MetricCard label="Total Projects" value="8" icon={FolderIcon} iconClassName="bg-blue-500/15 text-blue-400" />
          <MetricCard label="Active Tasks" value="24" icon={ClipboardListIcon} iconClassName="bg-violet-500/15 text-violet-400" />
          <MetricCard label="Completed Today" value="5" icon={CheckCircle2Icon} iconClassName="bg-emerald-500/15 text-emerald-400" />
          <MetricCard label="Overdue" value="3" icon={AlertTriangleIcon} iconClassName="bg-red-500/15 text-red-400" />
        </section>
        <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr]" aria-label="Dashboard details">
          <PriorityTasks />
          <ProjectSummary />
        </section>
      </div>
    </PageWrapper>
  );
}
