"use client";

import React, { useState } from "react";
import { COMMAND_CATALOG } from "../../lib/terminal/commandCatalog.ts";
import { FiChevronDown, FiChevronUp, FiPlay, FiCornerDownLeft } from "react-icons/fi";

interface CommandReferenceProps {
  onRunCommand: (command: string) => void;
  onInsertCommand: (command: string) => void;
}

export const CommandReference: React.FC<CommandReferenceProps> = ({
  onRunCommand,
  onInsertCommand,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const referenceEntries = COMMAND_CATALOG.filter((cmd) => cmd.referenceEntry);

  return (
    <div className="w-full mt-4 font-mono text-xs border border-slate-800 rounded-lg bg-slate-950/60 overflow-hidden">
      {/* Header Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full px-4 py-2.5 flex items-center justify-between text-left text-slate-300 hover:text-emerald-400 hover:bg-slate-900/60 transition-colors cursor-pointer select-none"
      >
        <span className="flex items-center gap-2 font-semibold">
          <span className="text-cyan-400">📖</span>
          <span>Command Reference & Syntax Guide ({referenceEntries.length})</span>
        </span>
        <span className="text-slate-500 flex items-center gap-1 text-[11px]">
          <span>{isOpen ? "Collapse" : "Expand"}</span>
          {isOpen ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
        </span>
      </button>

      {/* Collapsible Body */}
      {isOpen && (
        <div className="border-t border-slate-800/80 p-3 sm:p-4 space-y-2.5 max-h-[360px] overflow-y-auto terminal-scroll divide-y divide-slate-900">
          {referenceEntries.map((cmd) => (
            <div
              key={cmd.id}
              className="pt-2.5 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-900/30 p-2 rounded transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-200">
                    {cmd.referenceEntry?.title}
                  </span>
                  <span className="text-[10px] text-slate-500 bg-slate-850 px-1.5 py-0.2 rounded border border-slate-800">
                    {cmd.category}
                  </span>
                </div>
                <code className="text-emerald-400 text-xs block break-all">
                  {cmd.referenceEntry?.syntax}
                </code>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {cmd.referenceEntry?.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 shrink-0 pt-1 sm:pt-0">
                <button
                  type="button"
                  onClick={() => onInsertCommand(cmd.exampleString)}
                  title="Insert command into prompt without running"
                  aria-label={`Insert ${cmd.exampleString}`}
                  className="px-2.5 py-1 rounded text-[11px] border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <FiCornerDownLeft size={12} />
                  <span>Insert</span>
                </button>
                <button
                  type="button"
                  onClick={() => onRunCommand(cmd.exampleString)}
                  title="Run command immediately"
                  aria-label={`Run ${cmd.exampleString}`}
                  className="px-2.5 py-1 rounded text-[11px] border border-emerald-800/60 bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/50 hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <FiPlay size={12} />
                  <span>Run</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
