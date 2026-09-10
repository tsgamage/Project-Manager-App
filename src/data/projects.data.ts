import type { IProject } from "@/types/project.types";

export const DUMMY_PROJETCS: IProject[] = [
  {
    id: "northstar-mobile-app",
    name: "Northstar Mobile App",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores officia similique repellat cum veniam ipsam voluptate autem omnis sapiente quia reprehenderit esse doloribus, illo pariatur optio eaque quo rem numquam officiis. Molestias quis, commodi debitis id ipsa quasi possimus quibusdam laudantium sunt, iure ducimus modi obcaecati accusamus repudiandae, corporis nihil iste ratione excepturi maiores voluptatum. Qui quis rem error. Amet architecto illo rem cumque ut quisquam temporibus accusantium suscipit atque ratione quibusdam perspiciatis natus, soluta minima ducimus labore officiis! Ullam magnam obcaecati nulla quos molestias. Illo dolorum nobis natus aut odio. Alias, eaque! Ea voluptatibus similique labore corrupti eligendi est quasi minima, aliquam earum, excepturi rem distinctio, quidem repellat nesciunt officia at error eius vero. Iste ullam aut sed! Repellat eligendi alias doloremque dolor minus quam eum saepe in et quisquam. Saepe pariatur ducimus harum, perferendis suscipit cupiditate sit ipsa accusamus nostrum at laudantium maxime hic quas, ab minus consequuntur perspiciatis itaque adipisci sequi optio. Minus dicta consequuntur pariatur placeat ab voluptates reprehenderit voluptatibus, labore fugiat, vitae excepturi. Esse ex minima repellendus neque doloremque maxime fugit vero, facere minus, molestiae quod, culpa cupiditate. Ea, vel ab modi et, accusamus fuga non autem, sit corrupti possimus cupiditate ducimus aut aspernatur. Necessitatibus.",
    dueDate: "2026-10-15",
    taskCategories: [
      {
        categoryName: "Research",
        tasks: [
          { taskName: "Interview beta users", completed: true },
          { taskName: "Document primary workflows", completed: true },
        ],
      },
      {
        categoryName: "Design",
        tasks: [
          { taskName: "Create navigation wireframes", completed: true },
          { taskName: "Review accessibility contrast", completed: true },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
  {
    id: "refresh-marketing-site",
    name: "Refresh the marketing site with clearer product storytelling Refresh the marketing site with clearer product storytelling",
    description:
      "Refresh the marketing site with clearer product storytelling.",
    dueDate: "2026-09-28",
    taskCategories: [
      {
        categoryName: "Content",
        tasks: [
          { taskName: "Outline new landing page", completed: false },
          { taskName: "Approve customer case study", completed: true },
        ],
      },
      {
        categoryName: "Engineering",
        tasks: [
          { taskName: "Set up preview deployments", completed: true },
          { taskName: "Optimize image loading", completed: false },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
  {
    id: "atlas-analytics-dashboard",
    name: "Atlas Analytics Dashboard",
    description: "Give operations teams a real-time view of business health.",
    dueDate: "2026-11-06",
    taskCategories: [
      {
        categoryName: "Data",
        tasks: [
          { taskName: "Define reporting metrics", completed: true },
          { taskName: "Validate event tracking", completed: true },
        ],
      },
      {
        categoryName: "Dashboard",
        tasks: [
          { taskName: "Build revenue overview", completed: false },
          { taskName: "Add date range filters", completed: false },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
  {
    id: "harbor-design-system",
    name: "Harbor Design System",
    description: "Create a shared component language for internal products.",
    dueDate: "2026-12-12",
    taskCategories: [
      {
        categoryName: "Foundations",
        tasks: [
          { taskName: "Finalize color tokens", completed: true },
          { taskName: "Document typography scale", completed: false },
        ],
      },
      {
        categoryName: "Components",
        tasks: [
          { taskName: "Publish button variants", completed: true },
          { taskName: "Build form field patterns", completed: false },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
  {
    id: "pioneer-customer-portal",
    name: "Pioneer Customer Portal",
    description: "Simplify account management and support for customers.",
    dueDate: "2026-10-30",
    taskCategories: [
      {
        categoryName: "Account",
        tasks: [
          { taskName: "Map profile settings", completed: false },
          { taskName: "Implement team invitations", completed: true },
        ],
      },
      {
        categoryName: "Support",
        tasks: [
          { taskName: "Design ticket history", completed: false },
          { taskName: "Connect help center search", completed: true },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
  {
    id: "cedar-inventory-planner",
    name: "Cedar Inventory Planner",
    description: "Help warehouse managers forecast and replenish stock.",
    dueDate: "2026-09-21",
    taskCategories: [
      {
        categoryName: "Planning",
        tasks: [
          { taskName: "Model reorder thresholds", completed: true },
          { taskName: "Add seasonal adjustments", completed: false },
        ],
      },
      {
        categoryName: "Operations",
        tasks: [
          { taskName: "Import warehouse locations", completed: true },
          { taskName: "Test low-stock alerts", completed: true },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
  {
    id: "lumen-billing-upgrade",
    name: "Lumen Billing Upgrade",
    description: "Modernize subscriptions, invoices, and payment recovery.",
    dueDate: "2026-11-20",
    taskCategories: [
      {
        categoryName: "Payments",
        tasks: [
          { taskName: "Integrate payment provider", completed: false },
          { taskName: "Handle failed payments", completed: false },
        ],
      },
      {
        categoryName: "Invoices",
        tasks: [
          { taskName: "Create invoice templates", completed: true },
          { taskName: "Add invoice download", completed: false },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
  {
    id: "summit-onboarding-flow",
    name: "Summit Onboarding Flow",
    description: "Reduce time to value with a guided first-run experience.",
    dueDate: "2026-10-08",
    taskCategories: [
      {
        categoryName: "Journey",
        tasks: [
          { taskName: "Map first-session steps", completed: true },
          { taskName: "Write welcome messages", completed: true },
        ],
      },
      {
        categoryName: "Activation",
        tasks: [
          { taskName: "Add setup checklist", completed: false },
          { taskName: "Measure activation events", completed: false },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
  {
    id: "orchard-reporting-export",
    name: "Orchard Reporting Export",
    description: "Make operational reports easy to share and archive.",
    dueDate: "2026-09-18",
    taskCategories: [
      {
        categoryName: "Formats",
        tasks: [
          { taskName: "Support CSV exports", completed: true },
          { taskName: "Add PDF export", completed: false },
        ],
      },
      {
        categoryName: "Scheduling",
        tasks: [
          { taskName: "Design recurring reports", completed: false },
          { taskName: "Add delivery preferences", completed: true },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
  {
    id: "beacon-notification-center",
    name: "Beacon Notification Center",
    description: "Unify product alerts and user notification preferences.",
    dueDate: "2026-12-04",
    taskCategories: [
      {
        categoryName: "Messaging",
        tasks: [
          { taskName: "Define notification priorities", completed: true },
          { taskName: "Create message templates", completed: false },
        ],
      },
      {
        categoryName: "Preferences",
        tasks: [
          { taskName: "Build preference controls", completed: false },
          { taskName: "Add quiet hours", completed: true },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
  {
    id: "mosaic-team-workspace",
    name: "Mosaic Team Workspace",
    description:
      "Bring project collaboration and shared context into one place.",
    dueDate: "2027-01-15",
    taskCategories: [
      {
        categoryName: "Collaboration",
        tasks: [
          { taskName: "Add threaded comments", completed: false },
          { taskName: "Implement mentions", completed: true },
        ],
      },
      {
        categoryName: "Permissions",
        tasks: [
          { taskName: "Define workspace roles", completed: true },
          { taskName: "Audit permission changes", completed: false },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
  {
    id: "quartz-search-refresh",
    name: "Quartz Search Refresh",
    description: "Improve discovery across documents, tasks, and projects.",
    dueDate: "2026-10-22",
    taskCategories: [
      {
        categoryName: "Indexing",
        tasks: [
          { taskName: "Review searchable fields", completed: true },
          { taskName: "Tune indexing frequency", completed: false },
        ],
      },
      {
        categoryName: "Relevance",
        tasks: [
          { taskName: "Add recent-item boosting", completed: false },
          { taskName: "Test typo tolerance", completed: true },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
  {
    id: "willow-resource-calendar",
    name: "Willow Resource Calendar",
    description: "Coordinate people, rooms, and shared equipment efficiently.",
    dueDate: "2026-11-13",
    taskCategories: [
      {
        categoryName: "Calendar",
        tasks: [
          { taskName: "Build weekly calendar view", completed: true },
          { taskName: "Handle timezone display", completed: false },
        ],
      },
      {
        categoryName: "Resources",
        tasks: [
          { taskName: "Add room availability", completed: false },
          { taskName: "Prevent double bookings", completed: true },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
  {
    id: "ember-release-process",
    name: "Ember Release Process",
    description: "Make software releases predictable, visible, and repeatable.",
    dueDate: "2026-09-25",
    taskCategories: [
      {
        categoryName: "Automation",
        tasks: [
          { taskName: "Create release pipeline", completed: true },
          { taskName: "Add rollback workflow", completed: false },
        ],
      },
      {
        categoryName: "Quality",
        tasks: [
          { taskName: "Define release checklist", completed: true },
          { taskName: "Schedule regression testing", completed: true },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
  {
    id: "meadow-feedback-program",
    name: "Meadow Feedback Program",
    description:
      "Build a consistent loop for collecting and acting on feedback.",
    dueDate: "2026-12-18",
    taskCategories: [
      {
        categoryName: "Collection",
        tasks: [
          { taskName: "Select feedback channels", completed: false },
          { taskName: "Create feedback form", completed: true },
        ],
      },
      {
        categoryName: "Analysis",
        tasks: [
          { taskName: "Define tagging taxonomy", completed: false },
          { taskName: "Plan monthly review", completed: false },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
  {
    id: "vertex-api-platform",
    name: "Vertex API Platform",
    description:
      "Provide stable APIs and documentation for external developers.",
    dueDate: "2027-02-05",
    taskCategories: [
      {
        categoryName: "API",
        tasks: [
          { taskName: "Version public endpoints", completed: true },
          { taskName: "Add rate limit headers", completed: false },
        ],
      },
      {
        categoryName: "Documentation",
        tasks: [
          { taskName: "Write authentication guide", completed: true },
          { taskName: "Publish request examples", completed: false },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
  {
    id: "cobalt-security-review",
    name: "Cobalt Security Review",
    description: "Strengthen application security through a structured review.",
    dueDate: "2026-10-02",
    taskCategories: [
      {
        categoryName: "Assessment",
        tasks: [
          { taskName: "Inventory sensitive data", completed: true },
          { taskName: "Review access boundaries", completed: false },
        ],
      },
      {
        categoryName: "Remediation",
        tasks: [
          { taskName: "Patch dependency findings", completed: true },
          { taskName: "Verify audit logging", completed: false },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
  {
    id: "juniper-help-center",
    name: "Juniper Help Center",
    description: "Create a searchable self-service support experience.",
    dueDate: "2026-11-27",
    taskCategories: [
      {
        categoryName: "Information Architecture",
        tasks: [
          { taskName: "Group articles by topic", completed: true },
          { taskName: "Define article metadata", completed: false },
        ],
      },
      {
        categoryName: "Publishing",
        tasks: [
          { taskName: "Migrate top articles", completed: false },
          { taskName: "Set up review reminders", completed: true },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
  {
    id: "solstice-usage-insights",
    name: "Solstice Usage Insights",
    description: "Turn product usage patterns into actionable team insights.",
    dueDate: "2027-01-29",
    taskCategories: [
      {
        categoryName: "Instrumentation",
        tasks: [
          { taskName: "Audit key user events", completed: false },
          { taskName: "Add feature adoption events", completed: true },
        ],
      },
      {
        categoryName: "Insights",
        tasks: [
          { taskName: "Create adoption segments", completed: true },
          { taskName: "Build weekly insight email", completed: false },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
  {
    id: "ridge-document-migration",
    name: "Ridge Document Migration",
    description: "Move legacy documents into the current workspace structure.",
    dueDate: "2026-10-16",
    taskCategories: [
      {
        categoryName: "Preparation",
        tasks: [
          { taskName: "Inventory legacy folders", completed: true },
          { taskName: "Map document ownership", completed: true },
        ],
      },
      {
        categoryName: "Migration",
        tasks: [
          { taskName: "Migrate priority folders", completed: false },
          { taskName: "Verify document permissions", completed: false },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
  {
    id: "aurora-performance-initiative",
    name: "Aurora Performance Initiative",
    description:
      "Improve responsiveness across the most-used product workflows.",
    dueDate: "2027-02-19",
    taskCategories: [
      {
        categoryName: "Profiling",
        tasks: [
          { taskName: "Capture baseline metrics", completed: true },
          { taskName: "Identify slowest screens", completed: false },
        ],
      },
      {
        categoryName: "Optimization",
        tasks: [
          { taskName: "Reduce initial bundle size", completed: false },
          { taskName: "Optimize database queries", completed: true },
        ],
      },
    ],
    createdAt: "",
    updatedAt: "",
    status: "Active",
  },
];
