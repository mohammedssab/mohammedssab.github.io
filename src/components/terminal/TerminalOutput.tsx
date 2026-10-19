"use client";

import React from "react";
import type {
  CommandResult,
  TableOutput,
  DescribeOutput,
  LogsOutput,
  TextOutput,
  CodeOutput,
  NameOutput,
  ErrorOutput,
  AllOutput,
} from "../../lib/terminal/types.ts";

interface TerminalOutputProps {
  result: CommandResult;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ result }) => {
  switch (result.type) {
    case "table":
      return <TableView output={result} />;
    case "describe":
      return <DescribeView output={result} />;
    case "logs":
      return <LogsView output={result} />;
    case "code":
      return <CodeView output={result} />;
    case "name":
      return <NameView output={result} />;
    case "text":
      return <TextView output={result} />;
    case "error":
      return <ErrorView output={result} />;
    case "all":
      return <AllView output={result} />;
    case "clear":
      return null;
    default:
      return null;
  }
};

/**
 * Profile Key-Value Block View (avoids wide table clipping, wraps summary cleanly)
 */
const ProfileBlockView: React.FC<{ output: TableOutput }> = ({ output }) => {
  const row = output.rows[0] || [];
  const name = row[0] || "Mohammed Sab Sagari";
  const role = row[1] || "DevOps Engineer & Linux System Administrator";
  const location = row[2] || "Pune, IN";
  const status = row[4] || "Active";

  const summaryMatch = output.footer?.match(/SUMMARY:\s*([\s\S]+)/);
  const summary = summaryMatch ? summaryMatch[1].trim() : (output.footer || "");

  return (
    <div className="my-2.5 p-3.5 sm:p-4 rounded-lg bg-slate-950/70 border border-slate-800 font-mono text-[13px] sm:text-sm space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-800/80">
        <div>
          <span className="text-cyan-400 font-semibold block text-[11px] uppercase tracking-wider">
            NAME
          </span>
          <span className="text-white font-medium text-sm">{name}</span>
        </div>
        <div>
          <span className="text-cyan-400 font-semibold block text-[11px] uppercase tracking-wider">
            ROLE
          </span>
          <span className="text-white font-medium text-sm">{role}</span>
        </div>
        <div>
          <span className="text-cyan-400 font-semibold block text-[11px] uppercase tracking-wider">
            LOCATION
          </span>
          <span className="text-white font-medium text-sm">{location}</span>
        </div>
        <div>
          <span className="text-cyan-400 font-semibold block text-[11px] uppercase tracking-wider">
            STATUS
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-800/60 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {status}
          </span>
        </div>
      </div>
      <div>
        <span className="text-cyan-400 font-semibold block text-[11px] uppercase tracking-wider mb-1">
          SUMMARY
        </span>
        <p className="text-slate-200 leading-relaxed whitespace-pre-wrap text-[13px] sm:text-sm font-mono">
          {summary}
        </p>
      </div>
    </div>
  );
};

/**
 * Kubectl Table View with responsive scrolling and wide format support
 */
const TableView: React.FC<{ output: TableOutput }> = ({ output }) => {
  if (output.resource === "profile" && !output.isWide) {
    return <ProfileBlockView output={output} />;
  }

  return (
    <div className="my-2 space-y-2 font-mono text-[13px] sm:text-sm">
      <div className="overflow-x-auto terminal-scroll max-w-full rounded border border-slate-800/80 bg-slate-950/60 p-2 sm:p-3">
        <div className="flex items-center justify-between pb-1.5 text-[11px] text-slate-400">
          <span className="hidden sm:inline">table view</span>
          <span className="sm:hidden text-cyan-400/80">↔ Scroll table horizontally</span>
          {output.isWide && (
            <span className="font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40 font-semibold">
              WIDE FORMAT (-o wide)
            </span>
          )}
        </div>
        <table className="w-full text-left border-collapse min-w-[520px]">
          <thead>
            <tr className="text-cyan-400 border-b border-slate-800 text-[12px] uppercase tracking-wider">
              {output.headers.map((header, i) => (
                <th key={i} className="py-2 px-3 font-semibold whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850/80 text-slate-200">
            {output.rows.length === 0 ? (
              <tr>
                <td
                  colSpan={output.headers.length}
                  className="py-4 px-3 text-center text-slate-400 italic"
                >
                  {output.footer || "No resources found in default namespace."}
                </td>
              </tr>
            ) : (
              output.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-900/60 transition-colors">
                  {row.map((cell, cIdx) => {
                    const isStatus =
                      cell === "Running" ||
                      cell === "Active" ||
                      cell === "Completed" ||
                      cell === "Ready";
                    const isName = cIdx === 0;
                    return (
                      <td
                        key={cIdx}
                        className={`py-2 px-3 whitespace-nowrap ${
                          isName ? "text-white font-medium" : "text-slate-200"
                        }`}
                      >
                        {isStatus ? (
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${
                              cell === "Running" || cell === "Active" || cell === "Ready"
                                ? "bg-emerald-950/90 text-emerald-300 border border-emerald-800/60"
                                : "bg-slate-800/90 text-slate-200 border border-slate-700/60"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                cell === "Running" || cell === "Active" || cell === "Ready"
                                  ? "bg-emerald-400"
                                  : "bg-slate-400"
                              }`}
                            />
                            {cell}
                          </span>
                        ) : (
                          cell
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {output.footer && output.rows.length > 0 && (
        <div className="pt-2 px-1 text-[13px] text-slate-300 whitespace-pre-wrap leading-relaxed font-mono">
          {output.footer}
        </div>
      )}
    </div>
  );
};

/**
 * Kubectl Code View (YAML & JSON serialized output)
 */
const CodeView: React.FC<{ output: CodeOutput }> = ({ output }) => {
  return (
    <div className="my-2.5 font-mono text-xs bg-slate-950/90 border border-slate-800 rounded-lg p-3 sm:p-4 text-slate-300 overflow-x-auto terminal-scroll">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-[11px] text-slate-500">
        <span className="uppercase tracking-wider font-semibold text-emerald-400">
          OUTPUT: {output.language}
        </span>
        <span className="text-[10px] text-slate-400">Deterministic Serialization</span>
      </div>
      <pre className="whitespace-pre font-mono text-xs text-slate-200 leading-relaxed">
        {output.content}
      </pre>
    </div>
  );
};

/**
 * Kubectl Name View (-o name output format)
 */
const NameView: React.FC<{ output: NameOutput }> = ({ output }) => {
  return (
    <div className="my-2 font-mono text-xs sm:text-sm bg-slate-950/60 border border-slate-800/60 rounded p-3 text-slate-300 space-y-1">
      {output.names.length === 0 ? (
        <div className="text-slate-500 italic">No resources found in default namespace.</div>
      ) : (
        output.names.map((name, i) => (
          <div key={i} className="text-emerald-400">
            {name}
          </div>
        ))
      )}
    </div>
  );
};

/**
 * Kubectl Describe View
 */
const DescribeView: React.FC<{ output: DescribeOutput }> = ({ output }) => {
  return (
    <div className="my-2.5 font-mono text-xs sm:text-sm bg-slate-950/60 border border-slate-800 rounded-lg p-3 sm:p-4 space-y-4 max-w-full overflow-x-auto terminal-scroll">
      <div className="border-b border-slate-800/80 pb-2">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm sm:text-base">
          <span>⎈</span>
          <span>
            {output.kind} / {output.name}
          </span>
        </div>
      </div>

      {/* Metadata */}
      <div>
        <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
          Metadata & Specification
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-300 bg-slate-900/50 p-2.5 rounded border border-slate-800/50">
          {Object.entries(output.metadata).map(([key, val]) => (
            <div key={key} className="flex gap-2">
              <span className="text-slate-400 min-w-[90px]">{key}:</span>
              <span className="text-slate-200 font-medium break-all">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sections */}
      {output.sections.map((sec, i) => (
        <div key={i} className="space-y-1.5">
          <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
            {sec.title}
          </div>
          {sec.items && (
            <ul className="space-y-1 text-xs text-slate-300 pl-2">
              {sec.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">▹</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}
          {sec.fields && (
            <div className="grid grid-cols-1 gap-1 text-xs text-slate-300 pl-2">
              {Object.entries(sec.fields).map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span className="text-slate-400 min-w-[100px]">{k}:</span>
                  <a
                    href={v}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline break-all"
                  >
                    {v}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/**
 * Kubectl Logs View
 */
const LogsView: React.FC<{ output: LogsOutput }> = ({ output }) => {
  return (
    <div className="my-2.5 font-mono text-xs bg-slate-950/80 border border-slate-800 rounded-lg p-3 sm:p-4 space-y-1 text-slate-300 overflow-x-auto terminal-scroll">
      <div className="text-[11px] text-slate-400 border-b border-slate-800/80 pb-1.5 mb-2 flex items-center justify-between">
        <span className="text-cyan-400 font-semibold">logs/pod: {output.podName}</span>
        <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
          LOG STREAM ATTACHED
        </span>
      </div>
      {output.lines.map((line, idx) => {
        const bracketEnd = line.indexOf("]");
        const prefix = bracketEnd !== -1 ? line.slice(0, bracketEnd + 1) : "";
        const body = bracketEnd !== -1 ? line.slice(bracketEnd + 1) : line;

        return (
          <div key={idx} className="whitespace-pre leading-relaxed">
            {prefix && <span className="text-cyan-400 font-semibold">{prefix}</span>}
            <span className="text-slate-200">{body}</span>
          </div>
        );
      })}
    </div>
  );
};

/**
 * Kubectl Text / Explain / Help / Version View
 */
const TextView: React.FC<{ output: TextOutput }> = ({ output }) => {
  if (!output.content) return null;
  return (
    <div className="my-2 font-mono text-xs sm:text-sm bg-slate-950/40 p-3 rounded border border-slate-900 text-slate-300 whitespace-pre-wrap leading-relaxed">
      {output.content}
    </div>
  );
};

/**
 * Kubectl Error View
 */
const ErrorView: React.FC<{ output: ErrorOutput }> = ({ output }) => {
  return (
    <div className="my-2 font-mono text-xs sm:text-sm bg-rose-950/30 border border-rose-900/60 text-rose-300 p-3 rounded space-y-1">
      <div className="whitespace-pre-wrap">{output.message}</div>
      {output.suggestion && (
        <div className="text-[11px] text-slate-400 mt-1">{output.suggestion}</div>
      )}
    </div>
  );
};

/**
 * Kubectl All Composite View
 */
const AllView: React.FC<{ output: AllOutput }> = ({ output }) => {
  return (
    <div className="my-2 space-y-4">
      {output.sections.map((sec, idx) => (
        <div key={idx} className="space-y-1">
          <div className="font-mono text-xs font-semibold uppercase text-cyan-400 pl-1">
            {sec.title}
          </div>
          <TableView output={sec.output} />
        </div>
      ))}
    </div>
  );
};
