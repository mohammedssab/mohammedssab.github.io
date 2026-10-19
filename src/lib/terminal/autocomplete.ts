import type { PortfolioData } from "../../data/portfolioData.ts";

const TOP_LEVEL_COMMANDS = ["kubectl", "help", "clear"];
const KUBECTL_SUBCOMMANDS = ["get", "describe", "logs", "explain", "help", "clear"];
const GET_RESOURCES = [
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
const DESCRIBE_TARGETS = ["profile", "experience", "pod"];

export interface AutocompleteResult {
  replacement: string;
  suggestions: string[];
}

/**
 * Finds the longest common prefix among an array of strings
 */
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

/**
 * Calculates tab completion for given input
 */
export function getAutocomplete(input: string, data: PortfolioData): AutocompleteResult {
  const trimmedLeading = input.replace(/^\s+/, "");
  const trailingSpace = input.endsWith(" ");
  const tokens = trimmedLeading.split(/\s+/).filter(Boolean);

  if (tokens.length === 0) {
    return { replacement: input, suggestions: ["kubectl", "help", "clear"] };
  }

  // 1. Completing top-level command
  if (tokens.length === 1 && !trailingSpace) {
    const current = tokens[0].toLowerCase();
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

  const isKubectl = tokens[0].toLowerCase() === "kubectl" || tokens[0].toLowerCase() === "k";
  if (!isKubectl) {
    return { replacement: input, suggestions: [] };
  }

  // 2. Completing kubectl subcommand
  if (tokens.length === 1 && trailingSpace) {
    return { replacement: input, suggestions: KUBECTL_SUBCOMMANDS };
  }

  if (tokens.length === 2 && !trailingSpace) {
    const current = tokens[1].toLowerCase();
    const matches = KUBECTL_SUBCOMMANDS.filter((cmd) => cmd.startsWith(current));
    if (matches.length === 1) {
      return { replacement: `${tokens[0]} ${matches[0]} `, suggestions: [] };
    }
    if (matches.length > 1) {
      const lcp = getLongestCommonPrefix(matches);
      return { replacement: `${tokens[0]} ${lcp}`, suggestions: matches };
    }
    return { replacement: input, suggestions: [] };
  }

  const subcommand = tokens[1].toLowerCase();

  // 3. Completing "kubectl get <resource>"
  if (subcommand === "get") {
    if (tokens.length === 2 && trailingSpace) {
      return { replacement: input, suggestions: GET_RESOURCES };
    }
    if (tokens.length === 3 && !trailingSpace) {
      const current = tokens[2].toLowerCase();
      const matches = GET_RESOURCES.filter((res) => res.startsWith(current));
      if (matches.length === 1) {
        return { replacement: `${tokens[0]} get ${matches[0]} `, suggestions: [] };
      }
      if (matches.length > 1) {
        const lcp = getLongestCommonPrefix(matches);
        return { replacement: `${tokens[0]} get ${lcp}`, suggestions: matches };
      }
    }
    return { replacement: input, suggestions: [] };
  }

  // 4. Completing "kubectl describe <target>"
  if (subcommand === "describe") {
    if (tokens.length === 2 && trailingSpace) {
      return { replacement: input, suggestions: DESCRIBE_TARGETS };
    }
    if (tokens.length === 3 && !trailingSpace) {
      const current = tokens[2].toLowerCase();
      const matches = DESCRIBE_TARGETS.filter((target) => target.startsWith(current));
      if (matches.length === 1) {
        return { replacement: `${tokens[0]} describe ${matches[0]} `, suggestions: [] };
      }
      if (matches.length > 1) {
        const lcp = getLongestCommonPrefix(matches);
        return { replacement: `${tokens[0]} describe ${lcp}`, suggestions: matches };
      }
    }

    const describeTarget = tokens[2]?.toLowerCase();

    // Completing company for "kubectl describe experience <company>"
    if (describeTarget === "experience" || describeTarget === "exp") {
      const companySlugs = data.experience.map((e) => e.company.replace(/\s+/g, "-"));
      if (tokens.length === 3 && trailingSpace) {
        return { replacement: input, suggestions: companySlugs };
      }
      if (tokens.length === 4 && !trailingSpace) {
        const current = tokens[3].toLowerCase();
        const matches = companySlugs.filter((c) => c.toLowerCase().startsWith(current));
        if (matches.length === 1) {
          return { replacement: `${tokens[0]} describe ${tokens[2]} ${matches[0]} `, suggestions: [] };
        }
        if (matches.length > 1) {
          const lcp = getLongestCommonPrefix(matches);
          return { replacement: `${tokens[0]} describe ${tokens[2]} ${lcp}`, suggestions: matches };
        }
      }
    }

    // Completing pod for "kubectl describe pod <pod>"
    if (describeTarget === "pod" || describeTarget === "po") {
      const podNames = data.projects.map((p) => p.podName);
      if (tokens.length === 3 && trailingSpace) {
        return { replacement: input, suggestions: podNames };
      }
      if (tokens.length === 4 && !trailingSpace) {
        const current = tokens[3].toLowerCase();
        const matches = podNames.filter((p) => p.toLowerCase().startsWith(current));
        if (matches.length === 1) {
          return { replacement: `${tokens[0]} describe ${tokens[2]} ${matches[0]} `, suggestions: [] };
        }
        if (matches.length > 1) {
          const lcp = getLongestCommonPrefix(matches);
          return { replacement: `${tokens[0]} describe ${tokens[2]} ${lcp}`, suggestions: matches };
        }
      }
    }

    return { replacement: input, suggestions: [] };
  }

  // 5. Completing "kubectl logs <pod>"
  if (subcommand === "logs" || subcommand === "log") {
    const podNames = data.projects.map((p) => p.podName);
    if (tokens.length === 2 && trailingSpace) {
      return { replacement: input, suggestions: podNames };
    }
    if (tokens.length === 3 && !trailingSpace) {
      const current = tokens[2].toLowerCase();
      const matches = podNames.filter((p) => p.toLowerCase().startsWith(current));
      if (matches.length === 1) {
        return { replacement: `${tokens[0]} logs ${matches[0]} `, suggestions: [] };
      }
      if (matches.length > 1) {
        const lcp = getLongestCommonPrefix(matches);
        return { replacement: `${tokens[0]} logs ${lcp}`, suggestions: matches };
      }
    }
    return { replacement: input, suggestions: [] };
  }

  return { replacement: input, suggestions: [] };
}
