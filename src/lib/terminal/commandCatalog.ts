/**
 * Single Command Catalog for the Kubernetes CLI Portfolio.
 * This is the ONLY place commands, resources, aliases, format matrices,
 * examples, and descriptions are defined.
 */

export type OutputFormat = "table" | "wide" | "yaml" | "json" | "name";

export type CommandCategory =
  | "Profile"
  | "Skills"
  | "Experience"
  | "Projects"
  | "Advanced Output"
  | "Help & Discovery";

export interface ResourceDefinition {
  name: string;
  aliases: string[];
  supportedFormats: OutputFormat[];
  description: string;
  explainKind: string;
  explainFields: Record<string, string>;
  isPodLike?: boolean;
  isCompanyLike?: boolean;
}

export interface CatalogCommand {
  id: string;
  verb: "get" | "describe" | "logs" | "explain" | "version" | "help" | "clear";
  resource?: string;
  supportedFormats?: OutputFormat[];
  exampleString: string;
  shortDescription: string;
  category: CommandCategory;
  quickCommand?: {
    label: string;
    group: CommandCategory;
    priority: number;
  };
  referenceEntry?: {
    title: string;
    syntax: string;
    description: string;
  };
}

export const SUPPORTED_RESOURCES: Record<string, ResourceDefinition> = {
  profile: {
    name: "profile",
    aliases: ["prof"],
    supportedFormats: ["table", "yaml", "json", "name"],
    description: "Professional profile overview, roles, and cluster state",
    explainKind: "Profile",
    explainFields: {
      "metadata.name": "<string> Full legal name (Mohammed Sab Sagari)",
      "metadata.namespace": "<string> Portfolio namespace (portfolio)",
      "metadata.cluster": "<string> Simulated cluster identifier (portfolio-demo)",
      "spec.role": "<string> Primary engineering role (DevOps Engineer & Linux Admin)",
      "spec.location": "<string> Geographic location (Pune, IN)",
      "spec.status": "<string> Simulated presentation status (Running)",
      "spec.specialization": "<[]string> Core infrastructure specializations",
      "spec.summary": "<string> Verified professional summary",
      "spec.links": "<Object> Verified contact and social URLs",
    },
  },
  skills: {
    name: "skills",
    aliases: ["services", "svc", "skill"],
    supportedFormats: ["table", "wide", "yaml", "json", "name"],
    description: "Verified technical capabilities across 7 infrastructure categories",
    explainKind: "SkillList",
    explainFields: {
      "items[].name": "<string> Tool, framework, or technology name",
      "items[].category": "<string> Domain (DevOps, Containers, Cloud, Systems, Monitoring, Databases, Networking)",
      "items[].status": "<string> Active verification status",
      "items[].level": "<string> Production or Proficient proficiency level",
    },
  },
  experience: {
    name: "experience",
    aliases: ["exp", "jobs", "job"],
    supportedFormats: ["table", "wide", "yaml", "json", "name"],
    description: "Employment history and production impact across companies",
    explainKind: "ExperienceList",
    explainFields: {
      "items[].company": "<string> Organization name (Shaurya Technosoft, LetsReflect, MKCL)",
      "items[].role": "<string> Verified title held during employment",
      "items[].range": "<string> Verified employment duration",
      "items[].location": "<string> Office location (Pune, IN)",
      "items[].status": "<string> Active or Completed status",
      "items[].technologies": "<[]string> Tooling and platforms used",
      "items[].descriptions": "<[]string> Verified responsibilities and impact",
    },
    isCompanyLike: true,
  },
  projects: {
    name: "projects",
    aliases: ["pods", "pod", "po", "proj", "work"],
    supportedFormats: ["table", "wide", "yaml", "json", "name"],
    description: "Real-world engineering workloads simulated as Kubernetes pods",
    explainKind: "Pod",
    explainFields: {
      "metadata.name": "<string> Pod workload identifier",
      "spec.title": "<string> Project title",
      "spec.category": "<string> Engineering domain",
      "status.phase": "<string> Simulated presentation value (Running)",
      "status.ready": "<string> Ready container ratio (1/1)",
      "status.restarts": "<integer> Container restarts count (0)",
      "status.age": "<string> Workload age indicator",
      "spec.node": "<string> Node assignment",
      "spec.ip": "<string> Internal cluster IP address",
      "spec.tech": "<[]string> Technologies and frameworks implemented",
      "spec.responsibilities": "<string> Architecture and implementation scope",
      "spec.challenges": "<string> Technical challenges addressed",
      "spec.outcomes": "<string> Measurable project outcomes",
      "spec.links.github": "<string> GitHub source repository URL",
    },
    isPodLike: true,
  },
  education: {
    name: "education",
    aliases: ["edu"],
    supportedFormats: ["table", "yaml", "json", "name"],
    description: "Academic degrees from accredited universities",
    explainKind: "EducationList",
    explainFields: {
      "items[].degree": "<string> Master of Science / Bachelor of Science degree",
      "items[].institution": "<string> University name",
      "items[].location": "<string> University location (Pune, IN)",
      "items[].period": "<string> Attendance duration",
      "items[].status": "<string> Degree completion status",
    },
  },
  certifications: {
    name: "certifications",
    aliases: ["certs", "cert"],
    supportedFormats: ["table", "yaml", "json", "name"],
    description: "Verified certifications status (graceful empty state)",
    explainKind: "CertificationList",
    explainFields: {
      "items[]": "<[]Object> Verified certifications list (empty; no fabricated certs)",
      "status": "<string> Graceful empty state indicator",
    },
  },
  contact: {
    name: "contact",
    aliases: ["contacts"],
    supportedFormats: ["table", "yaml", "json", "name"],
    description: "Verified direct communication and social channels",
    explainKind: "ContactList",
    explainFields: {
      "items[].name": "<string> Channel identifier (Email, LinkedIn, GitHub, X, Instagram)",
      "items[].value": "<string> Handle or email address",
      "items[].url": "<string> Verified URI link",
      "items[].type": "<string> email or link",
    },
  },
  resume: {
    name: "resume",
    aliases: ["cv"],
    supportedFormats: ["table", "yaml", "json", "name"],
    description: "Verified resume PDF metadata and location",
    explainKind: "ResumeArtifact",
    explainFields: {
      "fileName": "<string> Artifact filename (Mohammed_Resume.pdf)",
      "format": "<string> Document format (PDF)",
      "size": "<string> Verified file size",
      "path": "<string> Local web path (/Mohammed_Resume.pdf)",
      "updated": "<string> Last verified update month",
    },
  },
  all: {
    name: "all",
    aliases: [],
    supportedFormats: ["table", "yaml", "json"],
    description: "Consolidated summary of pods, services, and experience",
    explainKind: "ClusterSummary",
    explainFields: {
      "pods": "<[]Pod> Active workload pods",
      "services": "<[]Service> Infrastructure services",
      "experience": "<[]Experience> Employment summary",
    },
  },
};

export const COMMAND_CATALOG: CatalogCommand[] = [
  // 1. Profile
  {
    id: "get-profile",
    verb: "get",
    resource: "profile",
    supportedFormats: ["table", "yaml", "json", "name"],
    exampleString: "kubectl get profile",
    shortDescription: "Display executive summary & cluster status",
    category: "Profile",
    quickCommand: { label: "get profile", group: "Profile", priority: 1 },
    referenceEntry: {
      title: "Get Profile",
      syntax: "kubectl get profile [-o yaml|json|name]",
      description: "Shows overview of Mohammed's role, location, status, and summary.",
    },
  },
  {
    id: "describe-profile",
    verb: "describe",
    resource: "profile",
    exampleString: "kubectl describe profile",
    shortDescription: "Inspect full profile specification, specializations, and verified links",
    category: "Profile",
    quickCommand: { label: "describe profile", group: "Profile", priority: 2 },
    referenceEntry: {
      title: "Describe Profile",
      syntax: "kubectl describe profile",
      description: "Deep-dive into complete profile specification, specializations, and links.",
    },
  },

  // 2. Skills
  {
    id: "get-skills",
    verb: "get",
    resource: "skills",
    supportedFormats: ["table", "wide", "yaml", "json", "name"],
    exampleString: "kubectl get skills",
    shortDescription: "List verified technical capabilities across 7 categories",
    category: "Skills",
    quickCommand: { label: "get skills", group: "Skills", priority: 1 },
    referenceEntry: {
      title: "Get Skills",
      syntax: "kubectl get skills [-o wide|yaml|json|name]",
      description: "Lists verified skills with categories and status. -o wide adds proficiency level.",
    },
  },
  {
    id: "get-skills-wide",
    verb: "get",
    resource: "skills",
    supportedFormats: ["table", "wide", "yaml", "json", "name"],
    exampleString: "kubectl get skills -o wide",
    shortDescription: "List skills with extended proficiency columns",
    category: "Skills",
    quickCommand: { label: "get skills -o wide", group: "Skills", priority: 2 },
    referenceEntry: {
      title: "Get Skills (Wide)",
      syntax: "kubectl get skills -o wide",
      description: "Lists skills with additional verified proficiency column.",
    },
  },

  // 3. Experience
  {
    id: "get-experience",
    verb: "get",
    resource: "experience",
    supportedFormats: ["table", "wide", "yaml", "json", "name"],
    exampleString: "kubectl get experience",
    shortDescription: "View production roles at Shaurya, LetsReflect, and MKCL",
    category: "Experience",
    quickCommand: { label: "get experience", group: "Experience", priority: 1 },
    referenceEntry: {
      title: "Get Experience",
      syntax: "kubectl get experience [-o wide|yaml|json|name]",
      description: "Displays employment history. -o wide displays technologies used.",
    },
  },
  {
    id: "describe-experience",
    verb: "describe",
    resource: "experience",
    exampleString: "kubectl describe experience Shaurya",
    shortDescription: "Deep dive into responsibilities and outcomes at Shaurya Technosoft",
    category: "Experience",
    quickCommand: { label: "describe experience", group: "Experience", priority: 2 },
    referenceEntry: {
      title: "Describe Experience",
      syntax: "kubectl describe experience <company>",
      description: "Inspect detailed responsibilities, dates, location, and technologies for a company.",
    },
  },

  // 4. Projects / Workloads
  {
    id: "get-projects",
    verb: "get",
    resource: "projects",
    supportedFormats: ["table", "wide", "yaml", "json", "name"],
    exampleString: "kubectl get projects",
    shortDescription: "Inspect automation, monitoring, and k8s workloads",
    category: "Projects",
    quickCommand: { label: "get projects", group: "Projects", priority: 1 },
    referenceEntry: {
      title: "Get Projects",
      syntax: "kubectl get projects [-o wide|yaml|json|name]",
      description: "Lists real-world projects represented as cluster workloads.",
    },
  },
  {
    id: "describe-pod",
    verb: "describe",
    resource: "projects",
    exampleString: "kubectl describe pod infra-automation-sec",
    shortDescription: "Inspect workload architecture, challenges, and measurable outcomes",
    category: "Projects",
    quickCommand: { label: "describe pod", group: "Projects", priority: 2 },
    referenceEntry: {
      title: "Describe Pod",
      syntax: "kubectl describe pod <project-name>",
      description: "Full workload details: challenges, responsibilities, outcomes, and repository.",
    },
  },
  {
    id: "logs-pod",
    verb: "logs",
    resource: "projects",
    exampleString: "kubectl logs ha-monitoring-stack",
    shortDescription: "Stream verified operational log history for monitoring workload",
    category: "Projects",
    quickCommand: { label: "logs ha-monitoring", group: "Projects", priority: 3 },
    referenceEntry: {
      title: "Workload Logs",
      syntax: "kubectl logs <project-name>",
      description: "Outputs documented actions and milestones formatted as clean log lines.",
    },
  },

  // 5. Advanced Output
  {
    id: "get-all",
    verb: "get",
    resource: "all",
    supportedFormats: ["table", "yaml", "json"],
    exampleString: "kubectl get all",
    shortDescription: "Consolidated summary across workloads, services, and experience",
    category: "Advanced Output",
    quickCommand: { label: "get all", group: "Advanced Output", priority: 1 },
    referenceEntry: {
      title: "Get All",
      syntax: "kubectl get all [-o yaml|json]",
      description: "Returns composite status of pods, services, and experience.",
    },
  },
  {
    id: "get-profile-yaml",
    verb: "get",
    resource: "profile",
    supportedFormats: ["table", "yaml", "json", "name"],
    exampleString: "kubectl get profile -o yaml",
    shortDescription: "Serialize profile resource in Kubernetes YAML specification",
    category: "Advanced Output",
    quickCommand: { label: "get profile -o yaml", group: "Advanced Output", priority: 2 },
    referenceEntry: {
      title: "YAML Output",
      syntax: "kubectl get <resource> -o yaml",
      description: "Renders deterministic YAML representation of the requested resource.",
    },
  },
  {
    id: "get-projects-json",
    verb: "get",
    resource: "projects",
    supportedFormats: ["table", "wide", "yaml", "json", "name"],
    exampleString: "kubectl get projects -o json",
    shortDescription: "Export projects payload as standard formatted JSON",
    category: "Advanced Output",
    quickCommand: { label: "get projects -o json", group: "Advanced Output", priority: 3 },
    referenceEntry: {
      title: "JSON Output",
      syntax: "kubectl get <resource> -o json",
      description: "Renders indented JSON representation matching underlying portfolio data.",
    },
  },
  {
    id: "get-pods-name",
    verb: "get",
    resource: "projects",
    supportedFormats: ["table", "wide", "yaml", "json", "name"],
    exampleString: "kubectl get pods -o name",
    shortDescription: "List pod resources in short resource/name format",
    category: "Advanced Output",
    quickCommand: { label: "get pods -o name", group: "Advanced Output", priority: 4 },
    referenceEntry: {
      title: "Name Output",
      syntax: "kubectl get <resource> -o name",
      description: "Prints identifiers in standard 'resource/name' format.",
    },
  },

  // 6. Help & Discovery
  {
    id: "explain-profile",
    verb: "explain",
    resource: "profile",
    exampleString: "kubectl explain profile",
    shortDescription: "Inspect profile schema specification, fields, and descriptions",
    category: "Help & Discovery",
    quickCommand: { label: "explain profile", group: "Help & Discovery", priority: 1 },
    referenceEntry: {
      title: "Explain Resource",
      syntax: "kubectl explain profile|pod|skills|experience|projects",
      description: "Lists fields and types for a given resource schema.",
    },
  },
  {
    id: "version",
    verb: "version",
    exampleString: "kubectl version",
    shortDescription: "Display simulated client and server versions",
    category: "Help & Discovery",
    quickCommand: { label: "version", group: "Help & Discovery", priority: 2 },
    referenceEntry: {
      title: "Version",
      syntax: "kubectl version",
      description: "Prints simulated client, server, and cluster version information.",
    },
  },
  {
    id: "help",
    verb: "help",
    exampleString: "help",
    shortDescription: "Open command reference and usage guide",
    category: "Help & Discovery",
    quickCommand: { label: "help", group: "Help & Discovery", priority: 3 },
    referenceEntry: {
      title: "Help",
      syntax: "help | kubectl --help",
      description: "Displays available resources, commands, and options.",
    },
  },
  {
    id: "clear",
    verb: "clear",
    exampleString: "clear",
    shortDescription: "Clear the terminal screen buffer (Ctrl+L)",
    category: "Help & Discovery",
    quickCommand: { label: "clear", group: "Help & Discovery", priority: 4 },
    referenceEntry: {
      title: "Clear",
      syntax: "clear (or Ctrl+L)",
      description: "Clears the active terminal output history.",
    },
  },
];

/**
 * Unsupported / destructive verbs that return clear read-only notices
 */
export const UNSUPPORTED_VERBS: Record<string, string> = {
  delete: "delete",
  apply: "apply",
  drain: "drain",
  exec: "exec",
  edit: "edit",
  scale: "scale",
  create: "create",
  patch: "patch",
  "port-forward": "port-forward",
  cordon: "cordon",
  uncordon: "uncordon",
  run: "run",
  replace: "replace",
  cp: "cp",
  attach: "attach",
  rollout: "rollout",
};

/**
 * Resolves a raw resource string to its canonical name using catalog
 */
export function resolveResource(raw: string): string | null {
  const lower = raw.toLowerCase();
  for (const [canonical, def] of Object.entries(SUPPORTED_RESOURCES)) {
    if (canonical === lower || def.aliases.includes(lower)) {
      return canonical;
    }
  }
  return null;
}
