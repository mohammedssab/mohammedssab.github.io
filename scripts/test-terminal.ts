import assert from "node:assert";
import { portfolioData } from "../src/data/portfolioData.ts";
import { executeCommand } from "../src/lib/terminal/parser.ts";
import { getAutocomplete } from "../src/lib/terminal/autocomplete.ts";

console.log("Running comprehensive Kubernetes CLI terminal test suite...\n");

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

// 1. Core get commands
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

test("kubectl get pods and services work", () => {
  const podRes = executeCommand("kubectl get pods", portfolioData);
  assert.strictEqual(podRes.type, "table");

  const svcRes = executeCommand("kubectl get services", portfolioData);
  assert.strictEqual(svcRes.type, "table");
});

test("kubectl get all returns combined workloads", () => {
  const res = executeCommand("kubectl get all", portfolioData);
  assert.strictEqual(res.type, "all");
  if (res.type === "all") {
    assert.strictEqual(res.sections.length, 3);
  }
});

// 2. Aliases
test("aliases work (k, po, svc, exp, proj)", () => {
  const res1 = executeCommand("k get po", portfolioData);
  assert.strictEqual(res1.type, "table");

  const res2 = executeCommand("k get svc", portfolioData);
  assert.strictEqual(res2.type, "table");

  const res3 = executeCommand("k get exp", portfolioData);
  assert.strictEqual(res3.type, "table");

  const res4 = executeCommand("k get proj", portfolioData);
  assert.strictEqual(res4.type, "table");
});

// 3. Describe commands
test("kubectl describe profile returns full spec", () => {
  const res = executeCommand("kubectl describe profile", portfolioData);
  assert.strictEqual(res.type, "describe");
  if (res.type === "describe") {
    assert.strictEqual(res.kind, "Profile");
    assert.strictEqual(res.metadata.Name, "Mohammed Sab Sagari");
  }
});

test("kubectl describe experience <company> supports partial/case-insensitive matching", () => {
  const res1 = executeCommand("kubectl describe experience Shaurya", portfolioData);
  assert.strictEqual(res1.type, "describe");
  if (res1.type === "describe") {
    assert.strictEqual(res1.name, "Shaurya Technosoft");
  }

  const res2 = executeCommand("kubectl describe exp letsreflect", portfolioData);
  assert.strictEqual(res2.type, "describe");
  if (res2.type === "describe") {
    assert.strictEqual(res2.name, "LetsReflect");
  }
});

test("kubectl describe pod <project-name> works", () => {
  const res = executeCommand("kubectl describe pod infra-automation", portfolioData);
  assert.strictEqual(res.type, "describe");
  if (res.type === "describe") {
    assert.strictEqual(res.kind, "Pod");
    assert(res.name.includes("infra-automation"));
  }
});

// 4. Logs commands
test("kubectl logs <project-name> returns log lines", () => {
  const res = executeCommand("kubectl logs ha-monitoring", portfolioData);
  assert.strictEqual(res.type, "logs");
  if (res.type === "logs") {
    assert(res.lines.length > 0);
  }
});

// 5. Explain, help, clear
test("kubectl explain profile returns schema", () => {
  const res = executeCommand("kubectl explain profile", portfolioData);
  assert.strictEqual(res.type, "text");
  if (res.type === "text") {
    assert(res.content.includes("KIND:       Profile"));
  }
});

test("help and clear commands work", () => {
  const helpRes = executeCommand("help", portfolioData);
  assert.strictEqual(helpRes.type, "text");

  const clearRes = executeCommand("clear", portfolioData);
  assert.strictEqual(clearRes.type, "clear");
});

// 6. Error handling
test("unknown resource returns kubectl-like error", () => {
  const res = executeCommand("kubectl get unknownresource", portfolioData);
  assert.strictEqual(res.type, "error");
  if (res.type === "error") {
    assert(res.message.includes('the server doesn\'t have a resource type "unknownresource"'));
  }
});

test("unknown top-level command returns helpful error", () => {
  const res = executeCommand("git status", portfolioData);
  assert.strictEqual(res.type, "error");
  if (res.type === "error") {
    assert(res.message.includes("command not found: git. Type 'help'."));
  }
});

test("missing describe company returns valid names error", () => {
  const res = executeCommand("kubectl describe experience", portfolioData);
  assert.strictEqual(res.type, "error");
  if (res.type === "error") {
    assert(res.message.includes("Valid companies:"));
  }
});

test("nonexistent pod returns NotFound error", () => {
  const res = executeCommand("kubectl describe pod nonexistent-pod", portfolioData);
  assert.strictEqual(res.type, "error");
  if (res.type === "error") {
    assert(res.message.includes("NotFound"));
  }
});

// 7. Autocomplete tests
test("autocomplete suggests kubectl for 'k'", () => {
  const ac = getAutocomplete("k", portfolioData);
  assert.strictEqual(ac.replacement, "kubectl ");
});

test("autocomplete completes 'kubectl g' to 'kubectl get '", () => {
  const ac = getAutocomplete("kubectl g", portfolioData);
  assert.strictEqual(ac.replacement, "kubectl get ");
});

test("autocomplete suggests resources for 'kubectl get '", () => {
  const ac = getAutocomplete("kubectl get ", portfolioData);
  assert(ac.suggestions.includes("profile"));
  assert(ac.suggestions.includes("skills"));
  assert(ac.suggestions.includes("experience"));
});

test("autocomplete completes unique resource 'kubectl get prof' to 'kubectl get profile '", () => {
  const ac = getAutocomplete("kubectl get prof", portfolioData);
  assert.strictEqual(ac.replacement, "kubectl get profile ");
});

console.log(`\n========================================`);
console.log(`Summary: All ${passed}/${total} unit tests passed successfully!`);
console.log(`========================================\n`);
