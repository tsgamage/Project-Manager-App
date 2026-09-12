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
        id: "northstar-mobile-app-category-1",
        name: "Research",
        tasks: [
          {
            id: "northstar-mobile-app-category-1-task-1",
            name: "Interview beta users",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores officia similique repellat cum veniam ipsam voluptate autem omnis",
            completed: true,
          },
          {
            id: "northstar-mobile-app-category-1-task-2",
            name: "Document primary workflows",
            completed: true,
          },
        ],
      },
      {
        id: "northstar-mobile-app-category-2",
        name: "Design",
        tasks: [
          {
            id: "northstar-mobile-app-category-2-task-1",
            name: "Create navigation wireframes",
            completed: true,
          },
          {
            id: "northstar-mobile-app-category-2-task-2",
            name: "Review accessibility contrast",
            completed: true,
          },
        ],
      },
    ],
    createdAt: "2026-08-01T09:00:00.000Z",
    updatedAt: "2026-08-08T14:30:00.000Z",
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
        id: "refresh-marketing-site-category-1",
        name: "Content",
        tasks: [
          {
            id: "refresh-marketing-site-category-1-task-1",
            name: "Outline new landing page",
            completed: false,
          },
          {
            id: "refresh-marketing-site-category-1-task-2",
            name: "Approve customer case study",
            completed: true,
          },
        ],
      },
      {
        id: "refresh-marketing-site-category-2",
        name: "Engineering",
        tasks: [
          {
            id: "refresh-marketing-site-category-2-task-1",
            name: "Set up preview deployments",
            completed: true,
          },
          {
            id: "refresh-marketing-site-category-2-task-2",
            name: "Optimize image loading",
            completed: false,
          },
        ],
      },
    ],
    createdAt: "2026-08-02T09:00:00.000Z",
    updatedAt: "2026-08-09T14:30:00.000Z",
    status: "Active",
  },
  {
    id: "atlas-analytics-dashboard",
    name: "Atlas Analytics Dashboard",
    description: "Give operations teams a real-time view of business health.",
    dueDate: "2026-11-06",
    taskCategories: [
      {
        id: "atlas-analytics-dashboard-category-1",
        name: "Data",
        tasks: [
          {
            id: "atlas-analytics-dashboard-category-1-task-1",
            name: "Define reporting metrics",
            completed: true,
          },
          {
            id: "atlas-analytics-dashboard-category-1-task-2",
            name: "Validate event tracking",
            completed: true,
          },
        ],
      },
      {
        id: "atlas-analytics-dashboard-category-2",
        name: "Dashboard",
        tasks: [
          {
            id: "atlas-analytics-dashboard-category-2-task-1",
            name: "Build revenue overview",
            completed: false,
          },
          {
            id: "atlas-analytics-dashboard-category-2-task-2",
            name: "Add date range filters",
            completed: false,
          },
        ],
      },
    ],
    createdAt: "2026-08-03T09:00:00.000Z",
    updatedAt: "2026-08-10T14:30:00.000Z",
    status: "Active",
  },
  {
    id: "harbor-design-system",
    name: "Harbor Design System",
    description: "Create a shared component language for internal products.",
    dueDate: "2026-12-12",
    taskCategories: [
      {
        id: "harbor-design-system-category-1",
        name: "Foundations",
        tasks: [
          {
            id: "harbor-design-system-category-1-task-1",
            name: "Finalize color tokens",
            completed: true,
          },
          {
            id: "harbor-design-system-category-1-task-2",
            name: "Document typography scale",
            completed: false,
          },
        ],
      },
      {
        id: "harbor-design-system-category-2",
        name: "Components",
        tasks: [
          {
            id: "harbor-design-system-category-2-task-1",
            name: "Publish button variants",
            completed: true,
          },
          {
            id: "harbor-design-system-category-2-task-2",
            name: "Build form field patterns",
            completed: false,
          },
        ],
      },
    ],
    createdAt: "2026-08-04T09:00:00.000Z",
    updatedAt: "2026-08-11T14:30:00.000Z",
    status: "Active",
  },
  {
    id: "pioneer-customer-portal",
    name: "Pioneer Customer Portal",
    description: "Simplify account management and support for customers.",
    dueDate: "2026-10-30",
    taskCategories: [
      {
        id: "pioneer-customer-portal-category-1",
        name: "Account",
        tasks: [
          {
            id: "pioneer-customer-portal-category-1-task-1",
            name: "Map profile settings",
            completed: false,
          },
          {
            id: "pioneer-customer-portal-category-1-task-2",
            name: "Implement team invitations",
            completed: true,
          },
        ],
      },
      {
        id: "pioneer-customer-portal-category-2",
        name: "Support",
        tasks: [
          {
            id: "pioneer-customer-portal-category-2-task-1",
            name: "Design ticket history",
            completed: false,
          },
          {
            id: "pioneer-customer-portal-category-2-task-2",
            name: "Connect help center search",
            completed: true,
          },
        ],
      },
    ],
    createdAt: "2026-08-05T09:00:00.000Z",
    updatedAt: "2026-08-12T14:30:00.000Z",
    status: "Active",
  },
  {
    id: "cedar-inventory-planner",
    name: "Cedar Inventory Planner",
    description: "Help warehouse managers forecast and replenish stock.",
    dueDate: "2026-09-21",
    taskCategories: [
      {
        id: "cedar-inventory-planner-category-1",
        name: "Planning",
        tasks: [
          {
            id: "cedar-inventory-planner-category-1-task-1",
            name: "Model reorder thresholds",
            completed: true,
          },
          {
            id: "cedar-inventory-planner-category-1-task-2",
            name: "Add seasonal adjustments",
            completed: false,
          },
        ],
      },
      {
        id: "cedar-inventory-planner-category-2",
        name: "Operations",
        tasks: [
          {
            id: "cedar-inventory-planner-category-2-task-1",
            name: "Import warehouse locations",
            completed: true,
          },
          {
            id: "cedar-inventory-planner-category-2-task-2",
            name: "Test low-stock alerts",
            completed: true,
          },
        ],
      },
    ],
    createdAt: "2026-08-06T09:00:00.000Z",
    updatedAt: "2026-08-13T14:30:00.000Z",
    status: "Active",
  },
  {
    id: "lumen-billing-upgrade",
    name: "Lumen Billing Upgrade",
    description: "Modernize subscriptions, invoices, and payment recovery.",
    dueDate: "2026-11-20",
    taskCategories: [
      {
        id: "seed-id-1",
        name: "Payments",
        tasks: [
          {
            id: "seed-id-2",
            name: "Integrate payment provider",
            completed: false,
          },
          { id: "seed-id-3", name: "Handle failed payments", completed: false },
        ],
      },
      {
        id: "seed-id-4",
        name: "Invoices",
        tasks: [
          {
            id: "seed-id-5",
            name: "Create invoice templates",
            completed: true,
          },
          { id: "seed-id-6", name: "Add invoice download", completed: false },
        ],
      },
    ],
    createdAt: "2026-08-05T09:00:00.000Z",
    updatedAt: "2026-08-12T14:30:00.000Z",
    status: "Active",
  },
  {
    id: "summit-onboarding-flow",
    name: "Summit Onboarding Flow",
    description: "Reduce time to value with a guided first-run experience.",
    dueDate: "2026-10-08",
    taskCategories: [
      {
        id: "seed-id-7",
        name: "Journey",
        tasks: [
          { id: "seed-id-8", name: "Map first-session steps", completed: true },
          { id: "seed-id-9", name: "Write welcome messages", completed: true },
        ],
      },
      {
        id: "seed-id-10",
        name: "Activation",
        tasks: [
          { id: "seed-id-11", name: "Add setup checklist", completed: false },
          {
            id: "seed-id-12",
            name: "Measure activation events",
            completed: false,
          },
        ],
      },
    ],
    createdAt: "2026-08-06T09:00:00.000Z",
    updatedAt: "2026-08-13T14:30:00.000Z",
    status: "Active",
  },
  {
    id: "orchard-reporting-export",
    name: "Orchard Reporting Export",
    description: "Make operational reports easy to share and archive.",
    dueDate: "2026-09-18",
    taskCategories: [
      {
        id: "seed-id-13",
        name: "Formats",
        tasks: [
          { id: "seed-id-14", name: "Support CSV exports", completed: true },
          { id: "seed-id-15", name: "Add PDF export", completed: false },
        ],
      },
      {
        id: "seed-id-16",
        name: "Scheduling",
        tasks: [
          {
            id: "seed-id-17",
            name: "Design recurring reports",
            completed: false,
          },
          {
            id: "seed-id-18",
            name: "Add delivery preferences",
            completed: true,
          },
        ],
      },
    ],
    createdAt: "2026-08-07T09:00:00.000Z",
    updatedAt: "2026-08-14T14:30:00.000Z",
    status: "Active",
  },
  {
    id: "beacon-notification-center",
    name: "Beacon Notification Center",
    description: "Unify product alerts and user notification preferences.",
    dueDate: "2026-12-04",
    taskCategories: [
      {
        id: "seed-id-19",
        name: "Messaging",
        tasks: [
          {
            id: "seed-id-20",
            name: "Define notification priorities",
            completed: true,
          },
          {
            id: "seed-id-21",
            name: "Create message templates",
            completed: false,
          },
        ],
      },
      {
        id: "seed-id-22",
        name: "Preferences",
        tasks: [
          {
            id: "seed-id-23",
            name: "Build preference controls",
            completed: false,
          },
          { id: "seed-id-24", name: "Add quiet hours", completed: true },
        ],
      },
    ],
    createdAt: "2026-08-08T09:00:00.000Z",
    updatedAt: "2026-08-15T14:30:00.000Z",
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
        id: "seed-id-25",
        name: "Collaboration",
        tasks: [
          { id: "seed-id-26", name: "Add threaded comments", completed: false },
          { id: "seed-id-27", name: "Implement mentions", completed: true },
        ],
      },
      {
        id: "seed-id-28",
        name: "Permissions",
        tasks: [
          { id: "seed-id-29", name: "Define workspace roles", completed: true },
          {
            id: "seed-id-30",
            name: "Audit permission changes",
            completed: false,
          },
        ],
      },
    ],
    createdAt: "2026-08-09T09:00:00.000Z",
    updatedAt: "2026-08-16T14:30:00.000Z",
    status: "Active",
  },
  {
    id: "quartz-search-refresh",
    pinned: true,
    name: "Quartz Search Refresh",
    description: "Improve discovery across documents, tasks, and projects.",
    dueDate: "2026-10-22",
    taskCategories: [
      {
        id: "seed-id-31",
        name: "Indexing",
        tasks: [
          {
            id: "seed-id-32",
            name: "Review searchable fields",
            completed: true,
          },
          {
            id: "seed-id-33",
            name: "Tune indexing frequency",
            completed: false,
          },
        ],
      },
      {
        id: "seed-id-34",
        name: "Relevance",
        tasks: [
          {
            id: "seed-id-35",
            name: "Add recent-item boosting",
            completed: false,
          },
          { id: "seed-id-36", name: "Test typo tolerance", completed: true },
        ],
      },
    ],
    createdAt: "2026-08-10T09:00:00.000Z",
    updatedAt: "2026-08-17T14:30:00.000Z",
    status: "Active",
  },
  {
    id: "willow-resource-calendar",
    name: "Willow Resource Calendar",
    description: "Coordinate people, rooms, and shared equipment efficiently.",
    dueDate: "2026-11-13",
    taskCategories: [
      {
        id: "seed-id-37",
        name: "Calendar",
        tasks: [
          {
            id: "seed-id-38",
            name: "Build weekly calendar view",
            completed: true,
          },
          {
            id: "seed-id-39",
            name: "Handle timezone display",
            completed: false,
          },
        ],
      },
      {
        id: "seed-id-40",
        name: "Resources",
        tasks: [
          { id: "seed-id-41", name: "Add room availability", completed: false },
          {
            id: "seed-id-42",
            name: "Prevent double bookings",
            completed: true,
          },
        ],
      },
    ],
    createdAt: "2026-08-11T09:00:00.000Z",
    updatedAt: "2026-08-18T14:30:00.000Z",
    status: "Active",
  },
  {
    id: "ember-release-process",
    name: "Ember Release Process",
    description: "Make software releases predictable, visible, and repeatable.",
    dueDate: "2026-09-25",
    taskCategories: [
      {
        id: "seed-id-43",
        name: "Automation",
        tasks: [
          {
            id: "seed-id-44",
            name: "Create release pipeline",
            completed: true,
          },
          { id: "seed-id-45", name: "Add rollback workflow", completed: false },
        ],
      },
      {
        id: "seed-id-46",
        name: "Quality",
        tasks: [
          {
            id: "seed-id-47",
            name: "Define release checklist",
            completed: true,
          },
          {
            id: "seed-id-48",
            name: "Schedule regression testing",
            completed: true,
          },
        ],
      },
    ],
    createdAt: "2026-08-12T09:00:00.000Z",
    updatedAt: "2026-08-19T14:30:00.000Z",
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
        id: "seed-id-49",
        name: "Collection",
        tasks: [
          {
            id: "seed-id-50",
            name: "Select feedback channels",
            completed: false,
          },
          { id: "seed-id-51", name: "Create feedback form", completed: true },
        ],
      },
      {
        id: "seed-id-52",
        name: "Analysis",
        tasks: [
          {
            id: "seed-id-53",
            name: "Define tagging taxonomy",
            completed: false,
          },
          { id: "seed-id-54", name: "Plan monthly review", completed: false },
        ],
      },
    ],
    createdAt: "2026-08-13T09:00:00.000Z",
    updatedAt: "2026-08-20T14:30:00.000Z",
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
        id: "seed-id-55",
        name: "API",
        tasks: [
          {
            id: "seed-id-56",
            name: "Version public endpoints",
            completed: true,
          },
          {
            id: "seed-id-57",
            name: "Add rate limit headers",
            completed: false,
          },
        ],
      },
      {
        id: "seed-id-58",
        name: "Documentation",
        tasks: [
          {
            id: "seed-id-59",
            name: "Write authentication guide",
            completed: true,
          },
          {
            id: "seed-id-60",
            name: "Publish request examples",
            completed: false,
          },
        ],
      },
    ],
    createdAt: "2026-08-14T09:00:00.000Z",
    updatedAt: "2026-08-21T14:30:00.000Z",
    status: "Active",
  },
  {
    id: "cobalt-security-review",
    name: "Cobalt Security Review",
    description: "Strengthen application security through a structured review.",
    dueDate: "2026-10-02",
    taskCategories: [
      {
        id: "seed-id-61",
        name: "Assessment",
        tasks: [
          {
            id: "seed-id-62",
            name: "Inventory sensitive data",
            completed: true,
          },
          {
            id: "seed-id-63",
            name: "Review access boundaries",
            completed: false,
          },
        ],
      },
      {
        id: "seed-id-64",
        name: "Remediation",
        tasks: [
          {
            id: "seed-id-65",
            name: "Patch dependency findings",
            completed: true,
          },
          { id: "seed-id-66", name: "Verify audit logging", completed: false },
        ],
      },
    ],
    createdAt: "2026-08-15T09:00:00.000Z",
    updatedAt: "2026-08-22T14:30:00.000Z",
    status: "Active",
  },
  {
    id: "juniper-help-center",
    name: "Juniper Help Center",
    description: "Create a searchable self-service support experience.",
    dueDate: "2026-11-27",
    taskCategories: [
      {
        id: "seed-id-67",
        name: "Information Architecture",
        tasks: [
          {
            id: "seed-id-68",
            name: "Group articles by topic",
            completed: true,
          },
          {
            id: "seed-id-69",
            name: "Define article metadata",
            completed: false,
          },
        ],
      },
      {
        id: "seed-id-70",
        name: "Publishing",
        tasks: [
          { id: "seed-id-71", name: "Migrate top articles", completed: false },
          {
            id: "seed-id-72",
            name: "Set up review reminders",
            completed: true,
          },
        ],
      },
    ],
    createdAt: "2026-08-16T09:00:00.000Z",
    updatedAt: "2026-08-23T14:30:00.000Z",
    status: "Active",
  },
  {
    id: "solstice-usage-insights",
    pinned: true,
    name: "Solstice Usage Insights",
    description: "Turn product usage patterns into actionable team insights.",
    dueDate: "2027-01-29",
    taskCategories: [
      {
        id: "seed-id-73",
        name: "Instrumentation",
        tasks: [
          { id: "seed-id-74", name: "Audit key user events", completed: false },
          {
            id: "seed-id-75",
            name: "Add feature adoption events",
            completed: true,
          },
        ],
      },
      {
        id: "seed-id-76",
        name: "Insights",
        tasks: [
          {
            id: "seed-id-77",
            name: "Create adoption segments",
            completed: true,
          },
          {
            id: "seed-id-78",
            name: "Build weekly insight email",
            completed: false,
          },
        ],
      },
    ],
    createdAt: "2026-08-17T09:00:00.000Z",
    updatedAt: "2026-08-24T14:30:00.000Z",
    status: "Active",
  },
  {
    id: "ridge-document-migration",
    name: "Ridge Document Migration",
    description: "Move legacy documents into the current workspace structure.",
    dueDate: "2026-10-16",
    taskCategories: [
      {
        id: "seed-id-79",
        name: "Preparation",
        tasks: [
          {
            id: "seed-id-80",
            name: "Inventory legacy folders",
            completed: true,
          },
          { id: "seed-id-81", name: "Map document ownership", completed: true },
        ],
      },
      {
        id: "seed-id-82",
        name: "Migration",
        tasks: [
          {
            id: "seed-id-83",
            name: "Migrate priority folders",
            completed: false,
          },
          {
            id: "seed-id-84",
            name: "Verify document permissions",
            completed: false,
          },
        ],
      },
    ],
    createdAt: "2026-08-18T09:00:00.000Z",
    updatedAt: "2026-08-25T14:30:00.000Z",
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
        id: "seed-id-85",
        name: "Profiling",
        tasks: [
          {
            id: "seed-id-86",
            name: "Capture baseline metrics",
            completed: true,
          },
          {
            id: "seed-id-87",
            name: "Identify slowest screens",
            completed: false,
          },
        ],
      },
      {
        id: "seed-id-88",
        name: "Optimization",
        tasks: [
          {
            id: "seed-id-89",
            name: "Reduce initial bundle size",
            completed: false,
          },
          {
            id: "seed-id-90",
            name: "Optimize database queries",
            completed: true,
          },
        ],
      },
    ],
    createdAt: "2026-08-19T09:00:00.000Z",
    updatedAt: "2026-08-26T14:30:00.000Z",
    status: "Active",
  },
];
