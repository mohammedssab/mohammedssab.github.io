import type { PortfolioData } from "../../data/portfolioData.ts";
import { SUPPORTED_RESOURCES, resolveResource } from "./commandCatalog.ts";

const TOP_LEVEL_COMMANDS = ["kubectl", "help", "clear"];
const KUBECTL_SUBCOMMANDS = [
  "get",
  "describe",
  "logs",
  "explain",
  "version",
  "help",
  "clear",
];
const DESCRIBE_TARGETS = ["profile", "experience", "pod"];
const EXPLAIN_TARGETS = [
  "profile",
  "pod",
  "skills",
  "experience",
  "projects",
  "education",
  "certifications",
  "contact",
  "resume",
];

export interface AutocompleteResult {
  replacement: string;
  suggestions: string[];
}

function getLongestCommonPrefix(strings: string[]): string {
  if (strings.length === 0) return "";
  if (strings.length === 1) return strings[0];

  let prefix = strings[0];
  for (let i = 1; i < strings.length; i++) {
    while (!strings[i].toLowerCase().startsWith(prefix.toLowerCase())) {
      prefix = prefix.slice(0, -1);
      if (prefix === "") return "";
    }
  }
  return prefix;
}

export function getAutocomplete(
  input: string,
  data: PortfolioData
): AutocompleteResult {
  const trimmedLeading = input.replace(/^\s+/, "");
  const trailingSpace = input.endsWith(" ");
  const rawTokens = trimmedLeading.split(/\s+/).filter(Boolean);

  if (rawTokens.length === 0) {
    return { replacement: input, suggestions: TOP_LEVEL_COMMANDS };
  }

  // 1. Top-level command completion
  if (rawTokens.length === 1 && !trailingSpace) {
    const current = rawTokens[0].toLowerCase();
    const matches = TOP_LEVEL_COMMANDS.filter((cmd) => cmd.startsWith(current));
    if (matches.length === 1) {
      return { replacement: matches[0] + " ", suggestions: [] };
    }
    if (matches.length > 1) {
      const lcp = getLongestCommonPrefix(matches);
      return { replacement: lcp, suggestions: matches };
    }
    return { replacement: input, suggestions: [] };
  }

  const isKubectl =
    rawTokens[0].toLowerCase() === "kubectl" || rawTokens[0].toLowerCase() === "k";
  if (!isKubectl) {
    return { replacement: input, suggestions: [] };
  }

  // 2. Kubectl subcommand completion
  if (rawTokens.length === 1 && trailingSpace) {
    return { replacement: input, suggestions: KUBECTL_SUBCOMMANDS };
  }

  if (rawTokens.length === 2 && !trailingSpace) {
    const current = rawTokens[1].toLowerCase();
    const matches = KUBECTL_SUBCOMMANDS.filter((cmd) => cmd.startsWith(current));
    if (matches.length === 1) {
      return { replacement: `${rawTokens[0]} ${matches[0]} `, suggestions: [] };
    }
    if (matches.length > 1) {
      const lcp = getLongestCommonPrefix(matches);
      return { replacement: `${rawTokens[0]} ${lcp}`, suggestions: matches };
    }
    return { replacement: input, suggestions: [] };
  }

  const verb = rawTokens[1].toLowerCase();

  // 3. kubectl get completions
  if (verb === "get") {
    const allResources = Object.keys(SUPPORTED_RESOURCES);

    // After "kubectl get "
    if (rawTokens.length === 2 && trailingSpace) {
      return { replacement: input, suggestions: allResources };
    }

    // Completing resource name: "kubectl get p..."
    if (rawTokens.length === 3 && !trailingSpace) {
      const current = rawTokens[2].toLowerCase();
      const matches = allResources.filter((res) => res.startsWith(current));
      if (matches.length === 1) {
        return { replacement: `${rawTokens[0]} get ${matches[0]} `, suggestions: [] };
      }
      if (matches.length > 1) {
        const lcp = getLongestCommonPrefix(matches);
        return { replacement: `${rawTokens[0]} get ${lcp}`, suggestions: matches };
      }
      return { replacement: input, suggestions: [] };
    }

    // After resource name: "kubectl get <resource> "
    const resourceCanonical = resolveResource(rawTokens[2]);
    const resourceDef = resourceCanonical ? SUPPORTED_RESOURCES[resourceCanonical] : null;
    const supportedFormats = resourceDef ? resourceDef.supportedFormats : ["yaml", "json", "wide", "name"];

    // Completing flag name: "kubectl get <resource> -"
    if (rawTokens.length === 4 && !trailingSpace && rawTokens[3].startsWith("-")) {
      const flagOptions = ["-o", "--output"];
      const matches = flagOptions.filter((f) => f.startsWith(rawTokens[3]));
      if (matches.length === 1) {
        return {
          replacement: `${rawTokens[0]} get ${rawTokens[2]} ${matches[0]} `,
          suggestions: [],
        };
      }
      return { replacement: input, suggestions: flagOptions };
    }

    // After flag: "kubectl get <resource> -o " or "--output "
    if (
      (rawTokens.length === 4 && trailingSpace && (rawTokens[3] === "-o" || rawTokens[3] === "--output")) ||
      (rawTokens.length === 4 && rawTokens[3].endsWith("="))
    ) {
      return { replacement: input, suggestions: supportedFormats };
    }

    // Completing format value: "kubectl get <resource> -o y..."
    if (
      rawTokens.length === 5 &&
      !trailingSpace &&
      (rawTokens[3] === "-o" || rawTokens[3] === "--output")
    ) {
      const current = rawTokens[4].toLowerCase();
      const matches = supportedFormats.filter((fmt) => fmt.startsWith(current));
      if (matches.length === 1) {
        return {
          replacement: `${rawTokens[0]} get ${rawTokens[2]} ${rawTokens[3]} ${matches[0]} `,
          suggestions: [],
        };
      }
      if (matches.length > 1) {
        const lcp = getLongestCommonPrefix(matches);
        return {
          replacement: `${rawTokens[0]} get ${rawTokens[2]} ${rawTokens[3]} ${lcp}`,
          suggestions: matches,
        };
      }
    }

    return { replacement: input, suggestions: [] };
  }

  // 4. kubectl describe completions
  if (verb === "describe") {
    if (rawTokens.length === 2 && trailingSpace) {
      return { replacement: input, suggestions: DESCRIBE_TARGETS };
    }

    if (rawTokens.length === 3 && !trailingSpace) {
      const current = rawTokens[2].toLowerCase();
      const matches = DESCRIBE_TARGETS.filter((t) => t.startsWith(current));
      if (matches.length === 1) {
        return { replacement: `${rawTokens[0]} describe ${matches[0]} `, suggestions: [] };
      }
      if (matches.length > 1) {
        const lcp = getLongestCommonPrefix(matches);
        return { replacement: `${rawTokens[0]} describe ${lcp}`, suggestions: matches };
      }
    }

    const describeTarget = rawTokens[2]?.toLowerCase();

    // Completing company for "kubectl describe experience "
    if (describeTarget === "experience" || describeTarget === "exp") {
      const companies = data.experience.map((e) => e.company.replace(/\s+/g, "-"));
      if (rawTokens.length === 3 && trailingSpace) {
        return { replacement: input, suggestions: companies };
      }
      if (rawTokens.length === 4 && !trailingSpace) {
        const current = rawTokens[3].toLowerCase();
        const matches = companies.filter((c) => c.toLowerCase().startsWith(current));
        if (matches.length === 1) {
          return {
            replacement: `${rawTokens[0]} describe ${rawTokens[2]} ${matches[0]} `,
            suggestions: [],
          };
        }
        if (matches.length > 1) {
          const lcp = getLongestCommonPrefix(matches);
          return {
            replacement: `${rawTokens[0]} describe ${rawTokens[2]} ${lcp}`,
            suggestions: matches,
          };
        }
      }
    }

    // Completing pod for "kubectl describe pod "
    if (
      describeTarget === "pod" ||
      describeTarget === "pods" ||
      describeTarget === "po" ||
      describeTarget === "projects"
    ) {
      const pods = data.projects.map((p) => p.podName);
      if (rawTokens.length === 3 && trailingSpace) {
        return { replacement: input, suggestions: pods };
      }
      if (rawTokens.length === 4 && !trailingSpace) {
        const current = rawTokens[3].toLowerCase();
        const matches = pods.filter((p) => p.toLowerCase().startsWith(current));
        if (matches.length === 1) {
          return {
            replacement: `${rawTokens[0]} describe ${rawTokens[2]} ${matches[0]} `,
            suggestions: [],
          };
        }
        if (matches.length > 1) {
          const lcp = getLongestCommonPrefix(matches);
          return {
            replacement: `${rawTokens[0]} describe ${rawTokens[2]} ${lcp}`,
            suggestions: matches,
          };
        }
      }
    }

    return { replacement: input, suggestions: [] };
  }

  // 5. kubectl logs completions
  if (verb === "logs" || verb === "log") {
    const pods = data.projects.map((p) => p.podName);
    if (rawTokens.length === 2 && trailingSpace) {
      return { replacement: input, suggestions: pods };
    }
    if (rawTokens.length === 3 && !trailingSpace) {
      const current = rawTokens[2].toLowerCase();
      const matches = pods.filter((p) => p.toLowerCase().startsWith(current));
      if (matches.length === 1) {
        return { replacement: `${rawTokens[0]} logs ${matches[0]} `, suggestions: [] };
      }
      if (matches.length > 1) {
        const lcp = getLongestCommonPrefix(matches);
        return { replacement: `${rawTokens[0]} logs ${lcp}`, suggestions: matches };
      }
    }
    return { replacement: input, suggestions: [] };
  }

  // 6. kubectl explain completions
  if (verb === "explain") {
    if (rawTokens.length === 2 && trailingSpace) {
      return { replacement: input, suggestions: EXPLAIN_TARGETS };
    }
    if (rawTokens.length === 3 && !trailingSpace) {
      const current = rawTokens[2].toLowerCase();
      const matches = EXPLAIN_TARGETS.filter((t) => t.startsWith(current));
      if (matches.length === 1) {
        return { replacement: `${rawTokens[0]} explain ${matches[0]} `, suggestions: [] };
      }
      if (matches.length > 1) {
        const lcp = getLongestCommonPrefix(matches);
        return { replacement: `${rawTokens[0]} explain ${lcp}`, suggestions: matches };
      }
    }
    return { replacement: input, suggestions: [] };
  }

  return { replacement: input, suggestions: [] };
}
