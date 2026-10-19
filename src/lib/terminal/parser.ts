import type { PortfolioData } from "../../data/portfolioData.ts";
import type {
  CommandResult,
  TableOutput,
  TextOutput,
  CodeOutput,
  NameOutput,
  AllOutput,
} from "./types.ts";
import {
  SUPPORTED_RESOURCES,
  UNSUPPORTED_VERBS,
  resolveResource,
} from "./commandCatalog.ts";
import type { OutputFormat } from "./commandCatalog.ts";
import { serializeYaml } from "./yaml.ts";

const MAX_INPUT_LENGTH = 200;

/**
 * Tokenize command string supporting single and double quotes
 */
export function tokenizeInput(input: string): string[] {
  const trimmed = input.trim();
  if (!trimmed) return [];

  const tokens: string[] = [];
  let current = "";
  let inDoubleQuote = false;
  let inSingleQuote = false;

  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];

    if (char === '"' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
      continue;
    }

    if (char === "'" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
      continue;
    }

    if (/\s/.test(char) && !inDoubleQuote && !inSingleQuote) {
      if (current.length > 0) {
        tokens.push(current);
        current = "";
      }
    } else {
      current += char;
    }
  }

  if (current.length > 0) {
    tokens.push(current);
  }

  return tokens;
}

interface ParsedFlags {
  outputFormat?: OutputFormat;
  error?: string;
  cleanArgs: string[];
}

/**
 * Extracts and validates output flags (-o, --output, -o=, --output=)
 */
function extractFlags(tokens: string[]): ParsedFlags {
  const cleanArgs: string[] = [];
  let outputFormat: OutputFormat | undefined;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    // Case 1: -o=format or --output=format
    if (token.startsWith("-o=") || token.startsWith("--output=")) {
      const parts = token.split("=");
      const val = parts[1]?.toLowerCase();
      if (!val) {
        return { error: `error: flag needs an argument: 'o' in ${token}`, cleanArgs: [] };
      }
      if (!isValidFormat(val)) {
        return { error: `error: unknown output format "${val}". Valid formats: table, wide, yaml, json, name`, cleanArgs: [] };
      }
      outputFormat = val as OutputFormat;
      continue;
    }

    // Case 2: -o format or --output format
    if (token === "-o" || token === "--output") {
      if (i + 1 >= tokens.length || tokens[i + 1].startsWith("-")) {
        return { error: `error: flag needs an argument: 'o' in ${token}`, cleanArgs: [] };
      }
      i++;
      const val = tokens[i].toLowerCase();
      if (!isValidFormat(val)) {
        return { error: `error: unknown output format "${val}". Valid formats: table, wide, yaml, json, name`, cleanArgs: [] };
      }
      outputFormat = val as OutputFormat;
      continue;
    }

    // Check for other unknown flags
    if (token.startsWith("-") && token.length > 1) {
      const suggestion = token.includes("out") || token.startsWith("-o") ? " Did you mean --output?" : "";
      return { error: `error: unknown flag: ${token}.${suggestion}`, cleanArgs: [] };
    }

    cleanArgs.push(token);
  }

  return { outputFormat, cleanArgs };
}

function isValidFormat(format: string): boolean {
  return ["table", "wide", "yaml", "json", "name"].includes(format);
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

  const tokens = tokenizeInput(rawInput);
  if (tokens.length === 0) {
    return { type: "text", content: "" };
  }

  const firstToken = tokens[0].toLowerCase();

  // Top-level clear
  if (firstToken === "clear") {
    return { type: "clear" };
  }

  // Top-level help
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

  const secondToken = tokens[1].toLowerCase();

  // Check help flag
  if (secondToken === "--help" || secondToken === "-h" || secondToken === "help") {
    return getHelpOutput();
  }

  // Check version command
  if (secondToken === "version") {
    return getVersionOutput();
  }

  // Check for unsupported / destructive verbs
  if (UNSUPPORTED_VERBS[secondToken]) {
    return {
      type: "error",
      message: `error: "${secondToken}" is not available in this portfolio simulation.\nThis terminal is read-only and runs no real cluster operations.\nTry: kubectl get projects, kubectl describe profile, help`,
    };
  }

  // Dispatch supported verbs
  switch (secondToken) {
    case "get":
      return handleGet(tokens.slice(2), data);
    case "describe":
      return handleDescribe(tokens.slice(2), data);
    case "logs":
    case "log":
      return handleLogs(tokens.slice(2), data);
    case "explain":
      return handleExplain(tokens.slice(2));
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
 * Handles kubectl get <resource> [-o format]
 */
function handleGet(rawArgs: string[], data: PortfolioData): CommandResult {
  const { outputFormat = "table", error, cleanArgs } = extractFlags(rawArgs);

  if (error) {
    return { type: "error", message: error };
  }

  if (cleanArgs.length === 0) {
    const validList = Object.keys(SUPPORTED_RESOURCES).join(", ");
    return {
      type: "error",
      message: `error: You must specify the type of resource to get.\n\nAvailable resources:\n${validList}`,
    };
  }

  const rawResource = cleanArgs[0];
  const canonical = resolveResource(rawResource);

  if (!canonical) {
    const validList = Object.keys(SUPPORTED_RESOURCES).join(", ");
    return {
      type: "error",
      message: `error: the server doesn't have a resource type "${rawResource}"\n\nAvailable resources:\n${validList}`,
    };
  }

  const resourceDef = SUPPORTED_RESOURCES[canonical];

  // Validate format against resource matrix
  if (!resourceDef.supportedFormats.includes(outputFormat)) {
    return {
      type: "error",
      message: `error: unable to match a printer for format "${outputFormat}" on resource "${canonical}". Supported formats: ${resourceDef.supportedFormats.join(", ")}`,
    };
  }

  // Handle name output format
  if (outputFormat === "name") {
    return renderNameFormat(canonical, data);
  }

  // Handle YAML / JSON formats
  if (outputFormat === "yaml" || outputFormat === "json") {
    return renderSerializationFormat(canonical, outputFormat, data);
  }

  // Handle table & wide formats
  return renderTableFormat(canonical, outputFormat === "wide", data);
}

/**
 * Serializes resource as YAML or JSON
 */
function renderSerializationFormat(
  canonical: string,
  format: "yaml" | "json",
  data: PortfolioData
): CodeOutput {
  let payload: unknown;

  switch (canonical) {
    case "profile":
      payload = {
        apiVersion: "portfolio.kubeops.io/v1",
        kind: "Profile",
        metadata: {
          name: data.profile.name,
          namespace: data.profile.namespace,
          cluster: data.profile.cluster,
        },
        spec: {
          role: data.profile.role,
          location: data.profile.location,
          status: data.profile.status,
          specialization: data.profile.specialization,
          summary: data.profile.summary,
          links: data.profile.links,
        },
      };
      break;
    case "skills":
      payload = {
        apiVersion: "portfolio.kubeops.io/v1",
        kind: "SkillList",
        items: data.skills,
      };
      break;
    case "experience":
      payload = {
        apiVersion: "portfolio.kubeops.io/v1",
        kind: "ExperienceList",
        items: data.experience,
      };
      break;
    case "projects":
      payload = {
        apiVersion: "v1",
        kind: "PodList",
        metadata: {
          note: "Simulated presentation workloads representing verified projects",
        },
        items: data.projects.map((p) => ({
          metadata: {
            name: p.podName,
            namespace: data.profile.namespace,
            node: p.node,
          },
          spec: {
            title: p.title,
            category: p.category,
            tech: p.tech,
            responsibilities: p.responsibilities,
            challenges: p.challenges,
            outcomes: p.outcomes,
            github: p.links.github,
          },
          status: {
            phase: p.status,
            ready: p.ready,
            restarts: p.restarts,
            age: p.age,
            ip: p.ip,
          },
        })),
      };
      break;
    case "education":
      payload = {
        apiVersion: "portfolio.kubeops.io/v1",
        kind: "EducationList",
        items: data.education,
      };
      break;
    case "certifications":
      payload = {
        apiVersion: "portfolio.kubeops.io/v1",
        kind: "CertificationList",
        items: [],
        status: "No resources found in default namespace.",
      };
      break;
    case "contact":
      payload = {
        apiVersion: "portfolio.kubeops.io/v1",
        kind: "ContactList",
        items: data.contact,
      };
      break;
    case "resume":
      payload = {
        apiVersion: "portfolio.kubeops.io/v1",
        kind: "ResumeArtifact",
        spec: data.resume,
      };
      break;
    case "all":
      payload = {
        apiVersion: "portfolio.kubeops.io/v1",
        kind: "ClusterSummary",
        profile: data.profile,
        workloads: data.projects,
        experience: data.experience,
      };
      break;
    default:
      payload = {};
  }

  const content =
    format === "yaml"
      ? serializeYaml(payload)
      : JSON.stringify(payload, null, 2);

  return {
    type: "code",
    language: format,
    content,
  };
}

/**
 * Formats resource as resource/name
 */
function renderNameFormat(canonical: string, data: PortfolioData): NameOutput {
  let names: string[] = [];

  switch (canonical) {
    case "profile":
      names = [`profile/${data.profile.name.toLowerCase().replace(/\s+/g, "-")}`];
      break;
    case "skills":
      names = data.skills.map((s) => `skill/${s.name.toLowerCase().replace(/[\s/]+/g, "-")}`);
      break;
    case "experience":
      names = data.experience.map((e) => `experience/${e.id}`);
      break;
    case "projects":
      names = data.projects.map((p) => `pod/${p.podName}`);
      break;
    case "education":
      names = data.education.map((e) => `education/${e.degree.toLowerCase().replace(/\s+/g, "-")}`);
      break;
    case "certifications":
      names = [];
      break;
    case "contact":
      names = data.contact.map((c) => `contact/${c.name.toLowerCase().replace(/[\s()]+/g, "-")}`);
      break;
    case "resume":
      names = [`resume/${data.resume.fileName.toLowerCase()}`];
      break;
    default:
      names = [];
  }

  return {
    type: "name",
    resource: canonical,
    names,
  };
}

/**
 * Formats resource as standard or wide table
 */
function renderTableFormat(
  canonical: string,
  isWide: boolean,
  data: PortfolioData
): TableOutput | AllOutput {
  switch (canonical) {
    case "profile":
      return {
        type: "table",
        resource: "profile",
        isWide,
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
        footer: `NAMESPACE: ${data.profile.namespace}\nSUMMARY: ${data.profile.summary}`,
      };

    case "skills":
      if (isWide) {
        return {
          type: "table",
          resource: "skills",
          isWide: true,
          headers: ["NAME", "CATEGORY", "LEVEL", "STATUS"],
          rows: data.skills.map((s) => [s.name, s.category, s.level, s.status]),
          footer: `Total verified skills: ${data.skills.length} (7 categories, production proficiency indicated)`,
        };
      }
      return {
        type: "table",
        resource: "skills",
        isWide: false,
        headers: ["NAME", "CATEGORY", "STATUS"],
        rows: data.skills.map((s) => [s.name, s.category, s.status]),
        footer: `Total verified skills: ${data.skills.length} (Tip: use -o wide for proficiency)`,
      };

    case "experience":
      if (isWide) {
        return {
          type: "table",
          resource: "experience",
          isWide: true,
          headers: ["COMPANY", "ROLE", "RANGE", "LOCATION", "STATUS", "TECHNOLOGIES"],
          rows: data.experience.map((e) => [
            e.company,
            e.role,
            e.range,
            e.location,
            e.status,
            e.technologies.slice(0, 5).join(", "),
          ]),
          footer: 'Tip: Use "kubectl describe experience <company>" for responsibilities and impact.',
        };
      }
      return {
        type: "table",
        resource: "experience",
        isWide: false,
        headers: ["COMPANY", "ROLE", "RANGE", "LOCATION", "STATUS"],
        rows: data.experience.map((e) => [e.company, e.role, e.range, e.location, e.status]),
        footer: 'Tip: Use "kubectl describe experience <company>" for in-depth responsibilities.',
      };

    case "projects":
      if (isWide) {
        return {
          type: "table",
          resource: "projects",
          isWide: true,
          headers: ["NAME", "POD", "READY", "STATUS", "RESTARTS", "AGE", "IP", "NODE", "TECH"],
          rows: data.projects.map((p) => [
            p.title,
            p.podName,
            p.ready,
            p.status,
            p.restarts.toString(),
            p.age,
            p.ip,
            p.node,
            p.tech.join(", "),
          ]),
          footer: 'Simulated pod status values. Tip: Use "kubectl describe pod <name>" or "kubectl logs <name>".',
        };
      }
      return {
        type: "table",
        resource: "projects",
        isWide: false,
        headers: ["NAME", "POD", "STATUS", "READY", "RESTARTS", "AGE"],
        rows: data.projects.map((p) => [
          p.title,
          p.podName,
          p.status,
          p.ready,
          p.restarts.toString(),
          p.age,
        ]),
        footer: 'Simulated pod status values. Tip: Use -o wide for node, IP, and tech details.',
      };

    case "education":
      return {
        type: "table",
        resource: "education",
        isWide,
        headers: ["DEGREE", "INSTITUTION", "LOCATION", "PERIOD", "STATUS"],
        rows: data.education.map((edu) => [
          edu.degree,
          edu.institution,
          edu.location,
          edu.period,
          edu.status,
        ]),
      };

    case "certifications":
      return {
        type: "table",
        resource: "certifications",
        isWide,
        headers: ["NAME", "ISSUER", "STATUS", "VERIFIED"],
        rows: [],
        footer: "No resources found in default namespace.",
      };

    case "contact":
      return {
        type: "table",
        resource: "contact",
        isWide,
        headers: ["CHANNEL", "VALUE", "URL"],
        rows: data.contact.map((c) => [c.name, c.value, c.url]),
        footer: `Direct communication channels for ${data.profile.name}.`,
      };

    case "resume":
      return {
        type: "table",
        resource: "resume",
        isWide,
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
        type: "table",
        resource: canonical,
        headers: ["RESOURCE"],
        rows: [],
        footer: "No resources found.",
      };
  }
}

/**
 * Handles kubectl describe profile | experience <company> | pod <project-name>
 */
function handleDescribe(tokens: string[], data: PortfolioData): CommandResult {
  if (tokens.length === 0) {
    return {
      type: "error",
      message: `error: You must specify the type of resource to describe.\n\nValid targets:\n- kubectl describe profile\n- kubectl describe experience <company>\n- kubectl describe pod <project-name>`,
    };
  }

  const targetType = tokens[0].toLowerCase();

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
        Status: `${data.profile.status} (Simulated presentation value)`,
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

  if (targetType === "experience" || targetType === "exp" || targetType === "job" || targetType === "jobs") {
    if (tokens.length < 2) {
      const validCompanies = data.experience.map((e) => e.company).join(", ");
      return {
        type: "error",
        message: `error: You must specify a company name to describe.\n\nValid companies:\n${validCompanies}`,
      };
    }

    const query = tokens.slice(1).join(" ").toLowerCase();
    const matched = data.experience.filter(
      (e) =>
        e.company.toLowerCase() === query ||
        e.company.toLowerCase().includes(query) ||
        e.id.toLowerCase().includes(query)
    );

    if (matched.length === 0) {
      const validCompanies = data.experience.map((e) => e.company).join(", ");
      return {
        type: "error",
        message: `Error from server (NotFound): experience "${tokens.slice(1).join(" ")}" not found.\n\nValid companies:\n${validCompanies}`,
      };
    }

    if (matched.length > 1) {
      const candidateNames = matched.map((e) => e.company).join(", ");
      return {
        type: "error",
        message: `error: "${tokens.slice(1).join(" ")}" is ambiguous. Multiple matching companies found:\n${candidateNames}`,
      };
    }

    const company = matched[0];
    return {
      type: "describe",
      kind: "Experience",
      name: company.company,
      metadata: {
        Company: company.company,
        Role: company.role,
        Range: company.range,
        Location: company.location,
        Status: company.status,
      },
      sections: [
        {
          title: "Technologies",
          items: company.technologies,
        },
        {
          title: "Responsibilities & Impact",
          items: company.descriptions,
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
    if (tokens.length < 2) {
      const validPods = data.projects.map((p) => p.podName).join(", ");
      return {
        type: "error",
        message: `error: You must specify a pod name to describe.\n\nValid pods:\n${validPods}`,
      };
    }

    const query = tokens.slice(1).join(" ").toLowerCase();
    const matched = data.projects.filter(
      (p) =>
        p.podName.toLowerCase() === query ||
        p.podName.toLowerCase().includes(query) ||
        p.title.toLowerCase().includes(query) ||
        p.id.toLowerCase().includes(query)
    );

    if (matched.length === 0) {
      const validPods = data.projects.map((p) => p.podName).join(", ");
      return {
        type: "error",
        message: `Error from server (NotFound): pods "${tokens.slice(1).join(" ")}" not found.\n\nValid pods:\n${validPods}`,
      };
    }

    if (matched.length > 1) {
      const candidateNames = matched.map((p) => p.podName).join(", ");
      return {
        type: "error",
        message: `error: "${tokens.slice(1).join(" ")}" is ambiguous. Multiple matching pods found:\n${candidateNames}`,
      };
    }

    const pod = matched[0];
    return {
      type: "describe",
      kind: "Pod",
      name: pod.podName,
      metadata: {
        Name: pod.podName,
        Namespace: data.profile.namespace,
        Priority: "0",
        Node: pod.node,
        IP: pod.ip,
        Status: `${pod.status} (Simulated presentation value)`,
        Ready: pod.ready,
        Restarts: pod.restarts.toString(),
        Age: pod.age,
        Project: pod.title,
      },
      sections: [
        {
          title: "Technologies",
          items: pod.tech,
        },
        {
          title: "Architecture & Scope",
          items: [pod.description],
        },
        {
          title: "Key Responsibilities",
          items: [pod.responsibilities],
        },
        {
          title: "Technical Challenges Solved",
          items: [pod.challenges],
        },
        {
          title: "Measurable Outcomes",
          items: [pod.outcomes],
        },
        {
          title: "Source Repository",
          fields: {
            GitHub: pod.links.github,
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
function handleLogs(tokens: string[], data: PortfolioData): CommandResult {
  if (tokens.length === 0) {
    const validPods = data.projects.map((p) => p.podName).join(", ");
    return {
      type: "error",
      message: `error: You must specify a pod name to view logs.\n\nValid pods:\n${validPods}`,
    };
  }

  const rawTarget = tokens[0].replace(/^pod\//i, "");
  const query = rawTarget.toLowerCase();

  const matched = data.projects.filter(
    (p) =>
      p.podName.toLowerCase() === query ||
      p.podName.toLowerCase().includes(query) ||
      p.title.toLowerCase().includes(query) ||
      p.id.toLowerCase().includes(query)
  );

  if (matched.length === 0) {
    const validPods = data.projects.map((p) => p.podName).join(", ");
    return {
      type: "error",
      message: `Error from server (NotFound): pods "${rawTarget}" not found.\n\nValid pods:\n${validPods}`,
    };
  }

  if (matched.length > 1) {
    const candidateNames = matched.map((p) => p.podName).join(", ");
    return {
      type: "error",
      message: `error: "${rawTarget}" is ambiguous. Multiple matching pods found:\n${candidateNames}`,
    };
  }

  const pod = matched[0];
  if (!pod.logs || pod.logs.length === 0) {
    return {
      type: "logs",
      podName: pod.podName,
      lines: ["[info] No documented log stream available for this workload."],
    };
  }

  return {
    type: "logs",
    podName: pod.podName,
    lines: pod.logs,
  };
}

/**
 * Handles kubectl explain <resource>
 */
function handleExplain(tokens: string[]): CommandResult {
  if (tokens.length === 0) {
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
  education         Academic background and degree credentials
  certifications    Verified credentials status (graceful empty state)
  contact           Direct communication and social profiles
  resume            PDF artifact verification and metadata

Use "kubectl explain <resource>" for detailed field descriptions.
Note: Project STATUS and pod phase values are simulated presentation representations.`,
    };
  }

  const rawResource = tokens[0].toLowerCase();
  const canonical = resolveResource(rawResource);

  if (!canonical || !SUPPORTED_RESOURCES[canonical]) {
    const validResources = Object.keys(SUPPORTED_RESOURCES).join(", ");
    return {
      type: "error",
      message: `error: couldn't find resource "${tokens[0]}".\n\nValid resources to explain:\n${validResources}`,
    };
  }

  const resDef = SUPPORTED_RESOURCES[canonical];
  const fieldLines = Object.entries(resDef.explainFields).map(
    ([k, v]) => `  ${k.padEnd(22)} ${v}`
  );

  return {
    type: "text",
    isExplain: true,
    content: `KIND:       ${resDef.explainKind}
VERSION:    portfolio.kubeops.io/v1
RESOURCE:   ${canonical} <Object>

DESCRIPTION:
  ${resDef.description}.
  (Note: STATUS values are simulated presentation representations).

FIELDS:
${fieldLines.join("\n")}`,
  };
}

/**
 * Handles kubectl version
 */
function getVersionOutput(): TextOutput {
  return {
    type: "text",
    isVersion: true,
    content: `Client Version: client v1.31.2 (simulated)
Kustomize Version: v5.4.3
Server Version: v1.31.2 (portfolio-demo)
Note: Simulated portfolio environment — not a live Kubernetes cluster.`,
  };
}

/**
 * Generates formatted help output from catalog
 */
function getHelpOutput(): TextOutput {
  return {
    type: "text",
    isHelp: true,
    content: `Kubectl Portfolio CLI — Commands Reference:

CORE WORKLOADS:
  kubectl get profile [-o yaml|json|name]     Overview & cluster state
  kubectl get skills [-o wide|yaml|json|name] Verified technical capabilities
  kubectl get experience [-o wide|yaml|json]  Employment history & company roles
  kubectl get projects [-o wide|yaml|json]    Real-world workloads as pods
  kubectl get all                             Consolidated summary of workloads

INSPECTION & LOGS:
  kubectl describe profile                    Profile specification & verified links
  kubectl describe experience <company>       Deep-dive into role responsibilities
  kubectl describe pod <project-name>         Workload architecture & outcomes
  kubectl logs <project-name>                 Documented operational log history
  kubectl explain <resource>                  Schema documentation & field types

SYSTEM & UTILITIES:
  kubectl version                             Simulated client/server version
  help | kubectl --help                       Command reference guide
  clear (or Ctrl+L)                           Clear terminal screen buffer

OUTPUT FORMATS (-o, --output):
  table (default), wide (extended columns), yaml, json, name

ALIASES:
  k -> kubectl  |  po/pod -> projects  |  svc -> skills  |  exp -> experience

NOTE:
  Simulated portfolio environment — not a live Kubernetes cluster. Read-only terminal.`,
  };
}
