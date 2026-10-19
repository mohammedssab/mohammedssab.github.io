/**
 * Small, deterministic in-repo YAML serializer.
 * Produces valid, human-readable YAML with stable key ordering,
 * correct quoting of special characters, and clean multiline handling.
 * Zero external runtime dependencies.
 */

function shouldQuoteString(val: string): boolean {
  if (val === "") return true;
  if (val === "true" || val === "false" || val === "null" || val === "yes" || val === "no") return true;
  if (/^-?\d+(\.\d+)?$/.test(val)) return true;
  // Special YAML characters or leading/trailing whitespace
  if (/[#:[\]{},&*?|<>=!%@`"'\t]/.test(val)) return true;
  if (val.startsWith(" ") || val.endsWith(" ")) return true;
  if (val.startsWith("- ") || val.startsWith("? ")) return true;
  return false;
}

function escapeString(val: string): string {
  return val.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export function serializeYaml(obj: unknown, indentLevel = 0): string {
  const indent = "  ".repeat(indentLevel);

  if (obj === null || obj === undefined) {
    return "null";
  }

  if (typeof obj === "boolean" || typeof obj === "number") {
    return String(obj);
  }

  if (typeof obj === "string") {
    if (obj.includes("\n")) {
      const lines = obj.split("\n");
      const subIndent = "  ".repeat(indentLevel + 1);
      return `|\n${lines.map((l) => `${subIndent}${l}`).join("\n")}`;
    }
    if (shouldQuoteString(obj)) {
      return `"${escapeString(obj)}"`;
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      return "[]";
    }
    const lines: string[] = [];
    for (const item of obj) {
      if (typeof item === "object" && item !== null && !Array.isArray(item)) {
        const itemObj = item as Record<string, unknown>;
        const keys = Object.keys(itemObj).sort();
        if (keys.length === 0) {
          lines.push(`${indent}- {}`);
        } else {
          const firstKey = keys[0];
          const firstVal = itemObj[firstKey];
          const isComplex = typeof firstVal === "object" && firstVal !== null;
          if (isComplex) {
            lines.push(`${indent}-`);
            lines.push(`${indent}  ${firstKey}: ${serializeYaml(firstVal, indentLevel + 2)}`);
          } else {
            lines.push(`${indent}- ${firstKey}: ${serializeYaml(firstVal, indentLevel + 1)}`);
          }
          for (let i = 1; i < keys.length; i++) {
            const k = keys[i];
            const v = itemObj[k];
            lines.push(`${indent}  ${k}: ${serializeYaml(v, indentLevel + 1)}`);
          }
        }
      } else {
        lines.push(`${indent}- ${serializeYaml(item, indentLevel + 1)}`);
      }
    }
    return lines.join("\n");
  }

  if (typeof obj === "object") {
    const record = obj as Record<string, unknown>;
    const keys = Object.keys(record).sort();
    if (keys.length === 0) {
      return "{}";
    }
    const lines: string[] = [];
    for (const k of keys) {
      const v = record[k];
      if (v === undefined) continue;
      const isComplex = typeof v === "object" && v !== null && (Array.isArray(v) ? v.length > 0 : Object.keys(v).length > 0);
      if (isComplex) {
        lines.push(`${indent}${k}:\n${serializeYaml(v, indentLevel + 1)}`);
      } else {
        lines.push(`${indent}${k}: ${serializeYaml(v, indentLevel + 1)}`);
      }
    }
    return lines.join("\n");
  }

  return String(obj);
}
