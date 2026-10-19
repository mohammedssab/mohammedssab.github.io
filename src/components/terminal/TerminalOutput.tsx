"use client";

import React from "react";
import type {
  CommandResult,
  TableOutput,
  DescribeOutput,
  LogsOutput,
  TextOutput,
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
 * Kubectl Table View with responsive scrolling
 */
const TableView: React.FC<{ output: TableOutput }> = ({ output }) => {
  return (
    <div className="my-2 space-y-1.5 font-mono text-xs sm:text-sm">
      <div className="overflow-x-auto terminal-scroll max-w-full rounded border border-slate-800/80 bg-slate-950/50 p-2 sm:p-3">
        <table className="w-full text-left border-collapse min-w-[540px]">
          <thead>
            <tr className="text-cyan-400 border-b border-slate-800 text-[11px] sm:text-xs uppercase tracking-wider">
              {output.headers.map((header, i) => (
                <th key={i} className="py-1.5 px-2.5 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900/60 text-slate-300">
            {output.rows.length === 0 ? (
              <tr>
                <td
                  colSpan={output.headers.length}
                  className="py-4 px-2.5 text-center text-slate-500 italic"
                >
                  {output.footer || "No resources found in default namespace."}
                </td>
              </tr>
            ) : (
              output.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-900/40 transition-colors">
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
                        className={`py-1.5 px-2.5 whitespace-nowrap ${
                          isName ? "text-slate-100 font-medium" : ""
                        }`}
                      >
                        {isStatus ? (
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              cell === "Running" || cell === "Active" || cell === "Ready"
                                ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/50"
                                : "bg-slate-800/80 text-slate-300 border border-slate-700/50"
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
        <p className="text-[11px] text-slate-400 px-1 pt-1 italic">{output.footer}</p>
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
          <span>{output.kind} / {output.name}</span>
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
          STREAM ATTACHED
        </span>
      </div>
      {output.lines.map((line, idx) => {
        const isInfo = line.includes("[INFO]");
        const isWarn = line.includes("[WARN]");
        return (
          <div key={idx} className="whitespace-pre leading-relaxed">
            {isInfo && (
              <span className="text-emerald-400 font-medium">
                {line.slice(0, line.indexOf("[INFO]") + 6)}
              </span>
            )}
            {isWarn && (
              <span className="text-amber-400 font-medium">
                {line.slice(0, line.indexOf("[WARN]") + 6)}
              </span>
            )}
            {!isInfo && !isWarn && <span>{line}</span>}
            {(isInfo || isWarn) && (
              <span className="text-slate-200">
                {line.slice(line.indexOf("]") + 1)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

/**
 * Kubectl Text / Explain / Help View
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
