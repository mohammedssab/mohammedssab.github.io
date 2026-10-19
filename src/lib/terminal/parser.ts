import type { PortfolioData } from "../../data/portfolioData.ts";
import type { CommandResult, TextOutput } from "./types.ts";

const MAX_INPUT_LENGTH = 256;

const AVAILABLE_RESOURCES = [
  "profile",
  "skills",
  "experience",
  "projects",
  "certifications",
  "education",
  "contact",
  "resume",
  "pods",
  "services",
  "all",
];

const RESOURCE_ALIASES: Record<string, string> = {
  profile: "profile",
  prof: "profile",
  skills: "skills",
  skill: "skills",
  experience: "experience",
  exp: "experience",
  jobs: "experience",
  work: "projects",
  projects: "projects",
  proj: "projects",
  certifications: "certifications",
  certs: "certifications",
  cert: "certifications",
  education: "education",
  edu: "education",
  contact: "contact",
  contacts: "contact",
  resume: "resume",
  cv: "resume",
  pods: "pods",
  pod: "pods",
  po: "pods",
  services: "services",
  service: "services",
  svc: "services",
  all: "all",
};

/**
 * Tokenizes command safely into args
 */
function tokenize(input: string): string[] {
  const trimmed = input.trim();
  if (!trimmed) return [];
  // Tokenize by spaces while ignoring duplicate whitespace
  return trimmed.split(/\s+/);
}

/**
 * Normalizes resource name using alias map
 */
function normalizeResource(resource: string): string | null {
  const lower = resource.toLowerCase();
  return RESOURCE_ALIASES[lower] || null;
}

/**
 * Pure command executor
 */
export function executeCommand(rawInput: string, data: PortfolioData): CommandResult {
  if (rawInput.length > MAX_INPUT_LENGTH) {
    return {
      type: "error",
      message: `error: command exceeds maximum length of ${MAX_INPUT_LENGTH} characters.`,
    };
  }

  const tokens = tokenize(rawInput);
  if (tokens.length === 0) {
    return { type: "text", content: "" };
  }

  const firstToken = tokens[0].toLowerCase();

  // Handle top-level clear
  if (firstToken === "clear") {
    return { type: "clear" };
  }

  // Handle top-level help
  if (firstToken === "help") {
    return getHelpOutput();
  }

  // Check kubectl or alias k
  if (firstToken !== "kubectl" && firstToken !== "k") {
    return {
      type: "error",
      message: `command not found: ${tokens[0]}. Type 'help'.`,
    };
  }

  if (tokens.length === 1) {
    return {
      type: "error",
      message: 'kubectl controls the Kubernetes cluster manager.\n\nType "help" or "kubectl get profile" to get started.',
    };
  }

  const subCommand = tokens[1].toLowerCase();

  switch (subCommand) {
    case "get":
      return handleGet(tokens.slice(2), data);
    case "describe":
      return handleDescribe(tokens.slice(2), data);
    case "logs":
    case "log":
      return handleLogs(tokens.slice(2), data);
    case "explain":
      return handleExplain(tokens.slice(2));
    case "help":
      return getHelpOutput();
    case "clear":
      return { type: "clear" };
    default:
      return {
        type: "error",
        message: `error: unknown command "${tokens[1]}" for "kubectl". Type 'help' for available commands.`,
      };
  }
}

/**
 * Handles kubectl get <resource>
 */
function handleGet(args: string[], data: PortfolioData): CommandResult {
  if (args.length === 0) {
    return {
      type: "error",
      message: `error: You must specify the type of resource to get.

Available resources:
${AVAILABLE_RESOURCES.join(", ")}`,
    };
  }

  const rawResource = args[0];
  const canonical = normalizeResource(rawResource);

  if (!canonical) {
    return {
      type: "error",
      message: `error: the server doesn't have a resource type "${rawResource}"

Available resources:
${AVAILABLE_RESOURCES.join(", ")}`,
    };
  }

  switch (canonical) {
    case "profile":
      return {
        type: "table",
        resource: "profile",
        headers: ["NAME", "ROLE", "LOCATION", "CLUSTER", "STATUS"],
        rows: [
          [
            data.profile.name,
            data.profile.role,
            data.profile.location,
            data.profile.cluster,
            data.profile.status,
          ],
        ],
        footer: `NAMESPACE: ${data.profile.namespace} | SUMMARY: ${data.profile.summary.slice(0, 85)}...`,
      };

    case "skills":
      return {
        type: "table",
        resource: "skills",
        headers: ["NAME", "CATEGORY", "STATUS", "LEVEL"],
        rows: data.skills.map((s) => [s.name, s.category, s.status, s.level]),
        footer: `Total verified skills: ${data.skills.length} (Active across 7 categories)`,
      };

    case "experience":
      return {
        type: "table",
        resource: "experience",
        headers: ["COMPANY", "ROLE", "RANGE", "LOCATION", "STATUS"],
        rows: data.experience.map((e) => [e.company, e.role, e.range, e.location, e.status]),
        footer: 'Tip: Use "kubectl describe experience <company>" for in-depth responsibilities and outcomes.',
      };

    case "projects":
      return {
        type: "table",
        resource: "projects",
        headers: ["NAME", "POD", "STATUS", "READY", "RESTARTS", "AGE"],
        rows: data.projects.map((p) => [
          p.title,
          p.podName,
          p.status,
          p.ready,
          p.restarts.toString(),
          p.age,
        ]),
        footer: 'Tip: Use "kubectl describe pod <project-name>" or "kubectl logs <project-name>".',
      };

    case "pods":
      return {
        type: "table",
        resource: "pods",
        headers: ["NAME", "READY", "STATUS", "RESTARTS", "AGE", "IP", "NODE"],
        rows: data.projects.map((p) => [
          p.podName,
          p.ready,
          p.status,
          p.restarts.toString(),
          p.age,
          p.ip,
          p.node,
        ]),
        footer: `All pods healthy in namespace "${data.profile.namespace}".`,
      };

    case "services":
      return {
        type: "table",
        resource: "services",
        headers: ["NAME", "TYPE", "CLUSTER-IP", "EXTERNAL-IP", "PORT(S)", "AGE"],
        rows: data.services.map((s) => [
          s.name,
          s.type,
          s.clusterIp,
          s.externalIp,
          s.ports,
          s.age,
        ]),
        footer: `Active service network in cluster "${data.profile.cluster}".`,
      };

    case "certifications":
      // Rule 0: No invented certifications. Graceful empty state.
      return {
        type: "table",
        resource: "certifications",
        headers: ["NAME", "ISSUER", "STATUS", "VERIFIED"],
        rows: [],
        footer: 'No resources found in default namespace.',
      };

    case "education":
      return {
        type: "table",
        resource: "education",
        headers: ["DEGREE", "INSTITUTION", "LOCATION", "PERIOD", "STATUS"],
        rows: data.education.map((edu) => [
          edu.degree,
          edu.institution,
          edu.location,
          edu.period,
          edu.status,
        ]),
      };

    case "contact":
      return {
        type: "table",
        resource: "contact",
        headers: ["CHANNEL", "VALUE", "URL"],
        rows: data.contact.map((c) => [c.name, c.value, c.url]),
        footer: `Direct communication channels for ${data.profile.name}.`,
      };

    case "resume":
      return {
        type: "table",
        resource: "resume",
        headers: ["FILE", "FORMAT", "SIZE", "UPDATED", "URI"],
        rows: [
          [
            data.resume.fileName,
            data.resume.format,
            data.resume.size,
            data.resume.updated,
            data.resume.path,
          ],
        ],
        footer: 'Open or download resume at "/Mohammed_Resume.pdf".',
      };

    case "all":
      return {
        type: "all",
        sections: [
          {
            title: "workloads / pods",
            output: {
              type: "table",
              resource: "pods",
              headers: ["NAME", "READY", "STATUS", "RESTARTS", "AGE"],
              rows: data.projects.map((p) => [
                p.podName,
                p.ready,
                p.status,
                p.restarts.toString(),
                p.age,
              ]),
            },
          },
          {
            title: "services",
            output: {
              type: "table",
              resource: "services",
              headers: ["NAME", "TYPE", "CLUSTER-IP", "EXTERNAL-IP", "PORT(S)"],
              rows: data.services.slice(0, 4).map((s) => [
                s.name,
                s.type,
                s.clusterIp,
                s.externalIp,
                s.ports,
              ]),
            },
          },
          {
            title: "experience",
            output: {
              type: "table",
              resource: "experience",
              headers: ["COMPANY", "ROLE", "RANGE", "STATUS"],
              rows: data.experience.map((e) => [e.company, e.role, e.range, e.status]),
            },
          },
        ],
      };

    default:
      return {
        type: "error",
        message: `error: unknown resource type "${canonical}".`,
      };
  }
}

/**
 * Handles kubectl describe profile | experience <company> | pod <project-name>
 */
function handleDescribe(args: string[], data: PortfolioData): CommandResult {
  if (args.length === 0) {
    return {
      type: "error",
      message: `error: You must specify the type of resource to describe.

Valid targets:
- kubectl describe profile
- kubectl describe experience <company>
- kubectl describe pod <project-name>`,
    };
  }

  const targetType = args[0].toLowerCase();

  if (targetType === "profile" || targetType === "prof") {
    return {
      type: "describe",
      kind: "Profile",
      name: data.profile.name,
      metadata: {
        Name: data.profile.name,
        Namespace: data.profile.namespace,
        Cluster: data.profile.cluster,
        Role: data.profile.role,
        Location: data.profile.location,
        Status: data.profile.status,
        Website: data.profile.website,
        Email: data.profile.email,
      },
      sections: [
        {
          title: "Specializations",
          items: data.profile.specialization,
        },
        {
          title: "Executive Summary",
          items: [data.profile.summary],
        },
        {
          title: "Verified Links",
          fields: {
            GitHub: data.profile.links.github,
            LinkedIn: data.profile.links.linkedin,
            "X / Twitter": data.profile.links.twitter,
            Instagram: data.profile.links.instagram,
          },
        },
      ],
    };
  }

  if (targetType === "experience" || targetType === "exp" || targetType === "job") {
    if (args.length < 2) {
      const validCompanies = data.experience.map((e) => e.company).join(", ");
      return {
        type: "error",
        message: `error: You must specify a company name to describe.\n\nValid companies:\n${validCompanies}`,
      };
    }

    const query = args.slice(1).join(" ").toLowerCase();
    const matched = data.experience.find(
      (e) =>
        e.company.toLowerCase() === query ||
        e.company.toLowerCase().includes(query) ||
        e.id.toLowerCase().includes(query)
    );

    if (!matched) {
      const validCompanies = data.experience.map((e) => e.company).join(", ");
      return {
        type: "error",
        message: `Error from server (NotFound): experience "${args.slice(1).join(" ")}" not found.\n\nValid companies:\n${validCompanies}`,
      };
    }

    return {
      type: "describe",
      kind: "Experience",
      name: matched.company,
      metadata: {
        Company: matched.company,
        Role: matched.role,
        Range: matched.range,
        Location: matched.location,
        Status: matched.status,
      },
      sections: [
        {
          title: "Technologies",
          items: matched.technologies,
        },
        {
          title: "Responsibilities & Impact",
          items: matched.descriptions,
        },
      ],
    };
  }

  if (
    targetType === "pod" ||
    targetType === "pods" ||
    targetType === "po" ||
    targetType === "project" ||
    targetType === "projects"
  ) {
    if (args.length < 2) {
      const validPods = data.projects.map((p) => p.podName).join(", ");
      return {
        type: "error",
        message: `error: You must specify a pod name to describe.\n\nValid pods:\n${validPods}`,
      };
    }

    const query = args.slice(1).join(" ").toLowerCase();
    const matched = data.projects.find(
      (p) =>
        p.podName.toLowerCase() === query ||
        p.podName.toLowerCase().includes(query) ||
        p.title.toLowerCase().includes(query) ||
        p.id.toLowerCase().includes(query)
    );

    if (!matched) {
      const validPods = data.projects.map((p) => p.podName).join(", ");
      return {
        type: "error",
        message: `Error from server (NotFound): pods "${args.slice(1).join(" ")}" not found.\n\nValid pods:\n${validPods}`,
      };
    }

    return {
      type: "describe",
      kind: "Pod",
      name: matched.podName,
      metadata: {
        Name: matched.podName,
        Namespace: data.profile.namespace,
        Priority: "0",
        Node: matched.node,
        IP: matched.ip,
        Status: matched.status,
        Ready: matched.ready,
        Restarts: matched.restarts.toString(),
        Age: matched.age,
        Project: matched.title,
      },
      sections: [
        {
          title: "Technologies",
          items: matched.tech,
        },
        {
          title: "Architecture & Description",
          items: [matched.description],
        },
        {
          title: "Key Responsibilities",
          items: [matched.responsibilities],
        },
        {
          title: "Technical Challenges Solved",
          items: [matched.challenges],
        },
        {
          title: "Measurable Outcomes",
          items: [matched.outcomes],
        },
        {
          title: "Source Repository",
          fields: {
            GitHub: matched.links.github,
          },
        },
      ],
    };
  }

  return {
    type: "error",
    message: `error: unknown describe target "${targetType}".\n\nValid targets: profile, experience <company>, pod <project-name>`,
  };
}

/**
 * Handles kubectl logs <project-name>
 */
function handleLogs(args: string[], data: PortfolioData): CommandResult {
  if (args.length === 0) {
    const validPods = data.projects.map((p) => p.podName).join(", ");
    return {
      type: "error",
      message: `error: You must specify a pod name to view logs.\n\nValid pods:\n${validPods}`,
    };
  }

  // Handle prefix like "pod/infra-automation-sec"
  const rawTarget = args[0].replace(/^pod\//i, "");
  const query = rawTarget.toLowerCase();

  const matched = data.projects.find(
    (p) =>
      p.podName.toLowerCase() === query ||
      p.podName.toLowerCase().includes(query) ||
      p.title.toLowerCase().includes(query) ||
      p.id.toLowerCase().includes(query)
  );

  if (!matched) {
    const validPods = data.projects.map((p) => p.podName).join(", ");
    return {
      type: "error",
      message: `Error from server (NotFound): pods "${rawTarget}" not found.\n\nValid pods:\n${validPods}`,
    };
  }

  return {
    type: "logs",
    podName: matched.podName,
    lines: matched.logs,
  };
}

/**
 * Handles kubectl explain profile
 */
function handleExplain(args: string[]): CommandResult {
  if (args.length === 0 || args[0].toLowerCase() !== "profile") {
    return {
      type: "text",
      isExplain: true,
      content: `KIND:       Profile
VERSION:    portfolio.kubeops.io/v1

DESCRIPTION:
  Profile represents the core engineer specification within the kubeops cluster.

AVAILABLE TOP-LEVEL RESOURCES:
  profile           Professional overview, roles, and cluster state
  skills            Verified technical competencies across 7 categories
  experience        Historical industry roles, companies, and impact
  projects          Workloads, architecture, challenges, and outcomes
  certifications    Verified credentials (shows graceful empty state)
  education         Academic background and degree credentials
  contact           Direct communication and social profiles
  resume            PDF artifact verification and metadata`,
    };
  }

  return {
    type: "text",
    isExplain: true,
    content: `KIND:       Profile
VERSION:    portfolio.kubeops.io/v1
RESOURCE:   profile <Object>

DESCRIPTION:
  Profile encapsulates Mohammed Sab Sagari's engineering identity, specialized
  domains, and operations telemetry.

FIELDS:
  metadata          <Object>
    name            <string> - Full legal name
    namespace       <string> - Cluster namespace (default: portfolio)
    cluster         <string> - Production cluster identifier
  spec              <Object>
    role            <string> - Primary engineering discipline
    location        <string> - Geographic location
    specialization  <[]string> - Core infrastructure competencies
    summary         <string> - Professional profile overview
    experience      <[]Object> - Timeline of industry roles
    skills          <[]Object> - Technology matrix and proficiency
    projects        <[]Object> - Workload pods and architectures
    contact         <Object> - Direct contact channels and links`,
  };
}

/**
 * Generates formatted help output
 */
function getHelpOutput(): TextOutput {
  return {
    type: "text",
    isHelp: true,
    content: `Kubectl Portfolio CLI — Commands Reference:

RESOURCES:
  kubectl get profile              Display professional overview & cluster state
  kubectl get skills               List verified skills across all categories
  kubectl get experience           View employment history & company roles
  kubectl get projects             Display real-world projects & workloads
  kubectl get pods                 View projects represented as cluster pods
  kubectl get services             List infrastructure service network
  kubectl get education            View academic credentials & universities
  kubectl get certifications       Check verified certifications status
  kubectl get contact              Show direct email and social profiles
  kubectl get resume               Inspect resume PDF metadata and location
  kubectl get all                  Consolidated summary of all workloads

DETAILED INSPECTION:
  kubectl describe profile                 Full profile specification & telemetry
  kubectl describe experience <company>    Deep-dive into role responsibilities
  kubectl describe pod <project-name>      Comprehensive workload architecture
  kubectl logs <project-name>              View operational log stream for pod
  kubectl explain profile                  Inspect portfolio schema and fields

SYSTEM:
  help                             Display this reference guide
  clear (or Ctrl+L)                Clear terminal output buffer

ALIASES:
  k -> kubectl  |  po -> pods  |  svc -> services  |  exp -> experience  |  proj -> projects

TIPS:
  • Press Tab for command, resource, company, and pod auto-completion.
  • Press Up / Down arrows to traverse command history.
  • Partial and case-insensitive matching is supported for pod & company names.`,
  };
}
