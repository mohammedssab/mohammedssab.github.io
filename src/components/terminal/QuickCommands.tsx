"use client";

import React, { useState } from "react";
import { COMMAND_CATALOG } from "../../lib/terminal/commandCatalog.ts";
import type { CommandCategory } from "../../lib/terminal/commandCatalog.ts";

interface QuickCommandsProps {
  onRunCommand: (command: string) => void;
}

const CATEGORIES: CommandCategory[] = [
  "Profile",
  "Skills",
  "Experience",
  "Projects",
  "Advanced Output",
  "Help & Discovery",
];

export const QuickCommands: React.FC<QuickCommandsProps> = ({ onRunCommand }) => {
  const [activeCategory, setActiveCategory] = useState<CommandCategory>("Profile");

  // Filter commands having quickCommand definition for current category
  const activeChips = COMMAND_CATALOG.filter(
    (cmd) => cmd.quickCommand && cmd.quickCommand.group === activeCategory
  ).sort((a, b) => (a.quickCommand?.priority || 0) - (b.quickCommand?.priority || 0));

  return (
    <div className="w-full mt-3 space-y-2 font-mono">
      {/* Category Tabs Header */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-800/80 pb-1.5">
        <div className="flex items-center gap-1.5 text-xs text-slate-300">
          <span className="text-emerald-400">⚡</span>
          <span className="font-semibold text-white">Quick Commands</span>
        </div>

        {/* Tab Switcher */}
        <div
          role="tablist"
          aria-label="Quick command category tabs"
          className="flex flex-wrap gap-1 text-xs"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              type="button"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                activeCategory === cat
                  ? "bg-slate-800 text-emerald-300 font-medium border border-slate-700"
                  : "text-slate-300 hover:text-white hover:bg-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Chips Container */}
      <div
        role="toolbar"
        aria-label={`${activeCategory} commands`}
        className="flex flex-wrap gap-1.5 items-center"
      >
        {activeChips.map((cmd) => (
          <button
            key={cmd.id}
            type="button"
            onClick={() => onRunCommand(cmd.exampleString)}
            title={cmd.shortDescription}
            aria-label={`Execute: ${cmd.exampleString} - ${cmd.shortDescription}`}
            className="px-2.5 py-1 rounded text-xs border border-slate-800 bg-slate-900/90 text-slate-200 hover:border-emerald-500/50 hover:text-emerald-300 hover:bg-emerald-950/20 active:scale-95 transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-400"
          >
            <span className="text-slate-400 mr-1">$</span>
            <span className="font-medium text-slate-100">{cmd.quickCommand?.label || cmd.exampleString}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
