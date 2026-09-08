import { useState } from "react";
import PageWrapper from "@/components/Page-Wrapper";
import ProjectCard, { type Project } from "@/components/pages/Projects/Card";
import Header from "@/components/pages/Projects/Header";
import { Button } from "@/components/ui/shadcn/button";

const projects: Project[] = [
  {
    name: "Acme Web Redesign",
    description:
      "Rebuilding the core marketing website using Next.js and Tailwind CSS for optimized load times and sleek modern layouts.",
    status: "Active",
    progress: 74,
    updated: "2h ago",
    members: ["JD", "MK", "AL"],
  },
  {
    name: "Mobile App Beta",
    description:
      "Developing the cross-platform React Native client. Focused on biometric login integration and real-time push notifications.",
    status: "On Hold",
    progress: 42,
    updated: "1d ago",
    members: ["RS", "TW", "KO"],
  },
  {
    name: "Cloud Migration Phase 2",
    description:
      "Moving legacy on-prem services to AWS EC2. Deploying robust Terraform scripts and multi-region database replication.",
    status: "Completed",
    progress: 100,
    updated: "3d ago",
    members: ["AB", "NP", "LM"],
  },
  {
    name: "Analytics Integration",
    description:
      "Connecting Segment and Mixpanel to gather quantitative behavioral trends throughout the new onboarding funnel.",
    status: "Active",
    progress: 15,
    updated: "5h ago",
    members: ["KM", "DS", "JR"],
  },
  {
    name: "Billing System v3",
    description:
      "Stripe recurring subscription logic upgrade. Incorporating tax calculation updates and flexible localization support.",
    status: "Active",
    progress: 90,
    updated: "12h ago",
    members: ["VC", "EW", "SG"],
  },
  {
    name: "Documentation Refresh",
    description:
      "Complete overhaul of the developer portals using custom MDX components, OpenAPI schemas, and interactive code sandboxes.",
    status: "Active",
    progress: 60,
    updated: "2d ago",
    members: ["HL", "PT", "ZY"],
  },
];

export default function ProjectPage() {
  const [view, setView] = useState<"cards" | "list">("cards");

  return (
    <PageWrapper>
      <div className="space-y-8 px-5 py-6 lg:px-8">
        <Header view={view} onViewChange={setView} />
        <section
          className={
            view === "cards"
              ? "grid gap-4 md:grid-cols-2 xl:grid-cols-3"
              : "grid gap-3"
          }
          aria-label="Projects"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              list={view === "list"}
            />
          ))}
        </section>
        <footer className="flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
          <span>Showing 6 of 18 total projects</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </footer>
      </div>
    </PageWrapper>
  );
}
