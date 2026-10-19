import assert from "node:assert";
import { portfolioData } from "../src/data/portfolioData.ts";
import { executeCommand, tokenizeInput } from "../src/lib/terminal/parser.ts";
import { getAutocomplete } from "../src/lib/terminal/autocomplete.ts";
import { createHistoryManager } from "../src/lib/terminal/history.ts";
import {
  COMMAND_CATALOG,
  SUPPORTED_RESOURCES,
} from "../src/lib/terminal/commandCatalog.ts";

console.log("Running comprehensive Phase 2 Kubernetes CLI terminal test suite...\n");

let passed = 0;
let total = 0;

function test(name: string, fn: () => void) {
  total++;
  try {
    fn();
    passed++;
    console.log(`✓ PASS: ${name}`);
  } catch (err) {
    console.error(`✗ FAIL: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// ==================================================
// 1. Core get & Table Output
// ==================================================
test("kubectl get profile returns profile table", () => {
  const res = executeCommand("kubectl get profile", portfolioData);
  assert.strictEqual(res.type, "table");
  if (res.type === "table") {
    assert.strictEqual(res.resource, "profile");
    assert.strictEqual(res.rows[0][0], "Mohammed Sab Sagari");
  }
});

test("kubectl get skills returns all verified skills", () => {
  const res = executeCommand("kubectl get skills", portfolioData);
  assert.strictEqual(res.type, "table");
  if (res.type === "table") {
    assert.strictEqual(res.rows.length, portfolioData.skills.length);
  }
});

test("kubectl get experience returns company history", () => {
  const res = executeCommand("kubectl get experience", portfolioData);
  assert.strictEqual(res.type, "table");
  if (res.type === "table") {
    assert.strictEqual(res.rows.length, 3);
  }
});

test("kubectl get projects returns real workloads", () => {
  const res = executeCommand("kubectl get projects", portfolioData);
  assert.strictEqual(res.type, "table");
  if (res.type === "table") {
    assert.strictEqual(res.rows.length, 3);
  }
});

test("kubectl get certifications returns graceful empty state", () => {
  const res = executeCommand("kubectl get certifications", portfolioData);
  assert.strictEqual(res.type, "table");
  if (res.type === "table") {
    assert.strictEqual(res.rows.length, 0);
    assert.strictEqual(res.footer, "No resources found in default namespace.");
  }
});

test("kubectl get education returns university degrees", () => {
  const res = executeCommand("kubectl get education", portfolioData);
  assert.strictEqual(res.type, "table");
  if (res.type === "table") {
    assert.strictEqual(res.rows.length, 2);
  }
});

test("kubectl get contact returns contact channels", () => {
  const res = executeCommand("kubectl get contact", portfolioData);
  assert.strictEqual(res.type, "table");
  if (res.type === "table") {
    assert(res.rows.some((r) => r[0] === "Email"));
  }
});

test("kubectl get resume returns resume metadata", () => {
  const res = executeCommand("kubectl get resume", portfolioData);
  assert.strictEqual(res.type, "table");
  if (res.type === "table") {
    assert.strictEqual(res.rows[0][0], "Mohammed_Resume.pdf");
  }
});

test("kubectl get all returns combined workloads", () => {
  const res = executeCommand("kubectl get all", portfolioData);
  assert.strictEqual(res.type, "all");
  if (res.type === "all") {
    assert.strictEqual(res.sections.length, 3);
  }
});

// ==================================================
// 2. Wide Output
// ==================================================
test("wide output adds verified columns for skills, projects, and experience", () => {
  const skillsWide = executeCommand("kubectl get skills -o wide", portfolioData);
  assert.strictEqual(skillsWide.type, "table");
  if (skillsWide.type === "table") {
    assert.strictEqual(skillsWide.isWide, true);
    assert(skillsWide.headers.includes("LEVEL"));
  }

  const projectsWide = executeCommand("kubectl get projects -o wide", portfolioData);
  assert.strictEqual(projectsWide.type, "table");
  if (projectsWide.type === "table") {
    assert.strictEqual(projectsWide.isWide, true);
    assert(projectsWide.headers.includes("NODE"));
    assert(projectsWide.headers.includes("IP"));
    assert(projectsWide.headers.includes("TECH"));
  }

  const expWide = executeCommand("kubectl get experience --output=wide", portfolioData);
  assert.strictEqual(expWide.type, "table");
  if (expWide.type === "table") {
    assert.strictEqual(expWide.isWide, true);
    assert(expWide.headers.includes("TECHNOLOGIES"));
  }
});

// ==================================================
// 3. YAML Output
// ==================================================
test("yaml output formats valid deterministic YAML", () => {
  const res = executeCommand("kubectl get profile -o yaml", portfolioData);
  assert.strictEqual(res.type, "code");
  if (res.type === "code") {
    assert.strictEqual(res.language, "yaml");
    assert(res.content.includes("kind: Profile"));
    assert(res.content.includes("name: Mohammed Sab Sagari"));
    assert(res.content.includes("apiVersion: portfolio.kubeops.io/v1"));
  }
});

// ==================================================
// 4. JSON Output
// ==================================================
test("json output parses successfully and matches portfolio data", () => {
  const res = executeCommand("kubectl get projects -o json", portfolioData);
  assert.strictEqual(res.type, "code");
  if (res.type === "code") {
    assert.strictEqual(res.language, "json");
    const parsed = JSON.parse(res.content);
    assert.strictEqual(parsed.kind, "PodList");
    assert.strictEqual(parsed.items.length, 3);
    assert.strictEqual(parsed.items[0].metadata.name, portfolioData.projects[0].podName);
  }
});

// ==================================================
// 5. Name Output
// ==================================================
test("name output returns resource/name format", () => {
  const res = executeCommand("kubectl get projects -o name", portfolioData);
  assert.strictEqual(res.type, "name");
  if (res.type === "name") {
    assert.strictEqual(res.names.length, 3);
    assert.strictEqual(res.names[0], `pod/${portfolioData.projects[0].podName}`);
  }

  const skillsRes = executeCommand("kubectl get skills -o name", portfolioData);
  assert.strictEqual(skillsRes.type, "name");
  if (skillsRes.type === "name") {
    assert(skillsRes.names[0].startsWith("skill/"));
  }
});

// ==================================================
// 6. Unknown Resources
// ==================================================
test("unknown resource returns kubectl-like error with available resources", () => {
  const res = executeCommand("kubectl get unknownresource", portfolioData);
  assert.strictEqual(res.type, "error");
  if (res.type === "error") {
    assert(res.message.includes('the server doesn\'t have a resource type "unknownresource"'));
    assert(res.message.includes("profile, skills"));
  }
});

// ==================================================
// 7. Unsupported Output Format Per Resource
// ==================================================
test("unsupported output format returns error listing valid formats", () => {
  const res = executeCommand("kubectl get education -o wide", portfolioData);
  assert.strictEqual(res.type, "error");
  if (res.type === "error") {
    assert(res.message.includes('unable to match a printer for format "wide" on resource "education"'));
    assert(res.message.includes("table, yaml, json, name"));
  }
});

// ==================================================
// 8. Unknown Flags and Malformed Arguments
// ==================================================
test("unknown flags and missing flag arguments return clear errors", () => {
  const res1 = executeCommand("kubectl get profile --invalid-flag", portfolioData);
  assert.strictEqual(res1.type, "error");
  if (res1.type === "error") {
    assert(res1.message.includes("unknown flag: --invalid-flag"));
  }

  const res2 = executeCommand("kubectl get profile -o", portfolioData);
  assert.strictEqual(res2.type, "error");
  if (res2.type === "error") {
    assert(res2.message.includes("flag needs an argument: 'o'"));
  }

  const res3 = executeCommand("kubectl get profile -o=invalidformat", portfolioData);
  assert.strictEqual(res3.type, "error");
  if (res3.type === "error") {
    assert(res3.message.includes('unknown output format "invalidformat"'));
  }
});

test("tokenizer supports quoted arguments with spaces", () => {
  const tokens = tokenizeInput('kubectl describe experience "Shaurya Technosoft"');
  assert.strictEqual(tokens.length, 4);
  assert.strictEqual(tokens[3], "Shaurya Technosoft");
});

// ==================================================
// 9. Empty and Whitespace-only Input
// ==================================================
test("empty and whitespace-only input returns empty text without error", () => {
  const emptyRes = executeCommand("", portfolioData);
  assert.strictEqual(emptyRes.type, "text");
  if (emptyRes.type === "text") {
    assert.strictEqual(emptyRes.content, "");
  }

  const whitespaceRes = executeCommand("     ", portfolioData);
  assert.strictEqual(whitespaceRes.type, "text");
});

// ==================================================
// 10. Aliases (Every Alias in Catalog)
// ==================================================
test("all resource aliases resolve correctly", () => {
  for (const [canonical, def] of Object.entries(SUPPORTED_RESOURCES)) {
    for (const alias of def.aliases) {
      const res = executeCommand(`k get ${alias}`, portfolioData);
      assert.notStrictEqual(res.type, "error", `Alias "${alias}" for "${canonical}" returned error`);
    }
  }
});

// ==================================================
// 11. History Module Behavior
// ==================================================
test("history manager correctly adds, navigates, de-duplicates, and preserves draft", () => {
  const hm = createHistoryManager();
  assert.strictEqual(hm.getEntries().length, 0);

  hm.add("kubectl get profile");
  hm.add("kubectl get profile"); // consecutive duplicate should be ignored
  assert.strictEqual(hm.getEntries().length, 1);

  hm.add("kubectl get skills");
  assert.strictEqual(hm.getEntries().length, 2);

  // Previous moves backward
  const prev1 = hm.previous("draft line");
  assert.strictEqual(prev1, "kubectl get skills");
  assert.strictEqual(hm.getDraft(), "draft line");

  const prev2 = hm.previous("");
  assert.strictEqual(prev2, "kubectl get profile");

  // Next moves forward
  const next1 = hm.next();
  assert.strictEqual(next1, "kubectl get skills");

  const nextDraft = hm.next();
  assert.strictEqual(nextDraft, "draft line");
  assert.strictEqual(hm.getCurrentIndex(), null);
});

// ==================================================
// 12. Context-Aware Tab Completion
// ==================================================
test("context-aware tab completion handles verbs, resources, flags, and targets", () => {
  // After "k"
  const ac1 = getAutocomplete("k", portfolioData);
  assert.strictEqual(ac1.replacement, "kubectl ");

  // After "kubectl "
  const ac2 = getAutocomplete("kubectl ", portfolioData);
  assert(ac2.suggestions.includes("get"));
  assert(ac2.suggestions.includes("describe"));

  // After "kubectl get "
  const ac3 = getAutocomplete("kubectl get ", portfolioData);
  assert(ac3.suggestions.includes("profile"));
  assert(ac3.suggestions.includes("skills"));

  // After "kubectl get skills -o "
  const ac4 = getAutocomplete("kubectl get skills -o ", portfolioData);
  assert(ac4.suggestions.includes("wide"));
  assert(ac4.suggestions.includes("yaml"));

  // After "kubectl describe pod "
  const ac5 = getAutocomplete("kubectl describe pod ", portfolioData);
  assert(ac5.suggestions.includes("infra-automation-sec-7f98b5"));

  // After "kubectl logs "
  const ac6 = getAutocomplete("kubectl logs ", portfolioData);
  assert(ac6.suggestions.includes("ha-monitoring-stack-4d32a1"));
});

// ==================================================
// 13. Partial & Ambiguous Matching
// ==================================================
test("partial company and pod matching resolves unique match or reports ambiguous", () => {
  const res1 = executeCommand("kubectl describe experience Shaurya", portfolioData);
  assert.strictEqual(res1.type, "describe");
  if (res1.type === "describe") {
    assert.strictEqual(res1.name, "Shaurya Technosoft");
  }

  const res2 = executeCommand("kubectl describe pod infra", portfolioData);
  assert.strictEqual(res2.type, "describe");
  if (res2.type === "describe") {
    assert.strictEqual(res2.name, "infra-automation-sec-7f98b5");
  }

  const notFound = executeCommand("kubectl describe pod nonexistent", portfolioData);
  assert.strictEqual(notFound.type, "error");
  if (notFound.type === "error") {
    assert(notFound.message.includes("NotFound"));
  }
});

// ==================================================
// 14. Describe Pod & Logs for EVERY Real Project
// ==================================================
test("describe pod and logs succeed for every real project", () => {
  for (const proj of portfolioData.projects) {
    const describeRes = executeCommand(`kubectl describe pod ${proj.podName}`, portfolioData);
    assert.strictEqual(describeRes.type, "describe");
    if (describeRes.type === "describe") {
      assert.strictEqual(describeRes.name, proj.podName);
    }

    const logsRes = executeCommand(`kubectl logs ${proj.podName}`, portfolioData);
    assert.strictEqual(logsRes.type, "logs");
    if (logsRes.type === "logs") {
      assert(logsRes.lines.length > 0);
    }
  }
});

// ==================================================
// 15. Destructive / Unsupported Verbs
// ==================================================
test("destructive or unsupported verbs return clear read-only simulation message", () => {
  const verbs = ["delete", "apply", "drain", "exec", "edit", "scale", "create"];
  for (const v of verbs) {
    const res = executeCommand(`kubectl ${v} pod test`, portfolioData);
    assert.strictEqual(res.type, "error");
    if (res.type === "error") {
      assert(res.message.includes(`"${v}" is not available in this portfolio simulation.`));
      assert(res.message.includes("This terminal is read-only"));
    }
  }
});

// ==================================================
// 16. Determinism
// ==================================================
test("commands are completely deterministic", () => {
  const run1 = executeCommand("kubectl get profile -o yaml", portfolioData);
  const run2 = executeCommand("kubectl get profile -o yaml", portfolioData);
  assert.deepStrictEqual(run1, run2);

  const json1 = executeCommand("kubectl get projects -o json", portfolioData);
  const json2 = executeCommand("kubectl get projects -o json", portfolioData);
  assert.deepStrictEqual(json1, json2);
});

// ==================================================
// 17. Catalog Consistency
// ==================================================
test("every example string in the command catalog parses successfully", () => {
  for (const cmd of COMMAND_CATALOG) {
    const res = executeCommand(cmd.exampleString, portfolioData);
    assert.notStrictEqual(
      res.type,
      "error",
      `Command catalog example "${cmd.exampleString}" failed with error: ${res.type === "error" ? res.message : ""}`
    );
  }
});

// ==================================================
// 18. Input Length Cap
// ==================================================
test("input length exceeding 200 characters returns error", () => {
  const longCmd = "kubectl get " + "a".repeat(200);
  const res = executeCommand(longCmd, portfolioData);
  assert.strictEqual(res.type, "error");
  if (res.type === "error") {
    assert(res.message.includes("exceeds maximum length of 200 characters"));
  }
});

// ==================================================
// 19. Version & Explain
// ==================================================
test("kubectl version and kubectl explain work as specified", () => {
  const ver = executeCommand("kubectl version", portfolioData);
  assert.strictEqual(ver.type, "text");
  if (ver.type === "text") {
    assert(ver.content.includes("Client Version:"));
    assert(ver.content.includes("Simulated portfolio environment"));
  }

  const exp = executeCommand("kubectl explain skills", portfolioData);
  assert.strictEqual(exp.type, "text");
  if (exp.type === "text") {
    assert(exp.content.includes("KIND:       SkillList"));
  }
});

console.log(`\n========================================`);
console.log(`Summary: All ${passed}/${total} Phase 2 unit tests passed successfully!`);
console.log(`========================================\n`);
