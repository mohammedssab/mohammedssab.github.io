"use client";

import React from "react";

interface QuickCommandsProps {
  onRunCommand: (command: string) => void;
}

interface CommandChip {
  command: string;
  label: string;
  description: string;
  accent?: "green" | "cyan" | "blue";
}

const QUICK_COMMANDS: CommandChip[] = [
  {
    command: "kubectl get profile",
    label: "get profile",
    description: "Display executive summary & cluster status",
    accent: "green",
  },
  {
    command: "kubectl get skills",
    label: "get skills",
    description: "List verified technical capabilities across 7 categories",
    accent: "cyan",
  },
  {
    command: "kubectl get experience",
    label: "get experience",
    description: "View production roles at Shaurya, LetsReflect, and MKCL",
    accent: "blue",
  },
  {
    command: "kubectl get projects",
    label: "get projects",
    description: "Inspect automation, monitoring, and k8s workloads",
    accent: "green",
  },
  {
    command: "kubectl get pods",
    label: "get pods",
    description: "View real projects simulated as cluster pods",
    accent: "cyan",
  },
  {
    command: "kubectl get services",
    label: "get services",
    description: "List cluster networking and telemetry services",
    accent: "blue",
  },
  {
    command: "kubectl describe profile",
    label: "describe profile",
    description: "Deep dive into full profile specification and links",
    accent: "green",
  },
  {
    command: "kubectl get contact",
    label: "get contact",
    description: "Direct email and professional social channels",
    accent: "cyan",
  },
  {
    command: "kubectl get resume",
    label: "get resume",
    description: "Inspect verified resume PDF metadata",
    accent: "blue",
  },
];

export const QuickCommands: React.FC<QuickCommandsProps> = ({ onRunCommand }) => {
  return (
    <div className="w-full mt-4 space-y-2">
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="text-emerald-400">⚡</span> Quick Commands
        </span>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          Click any chip to simulate command in terminal
        </span>
      </div>

      <div className="flex flex-wrap gap-2 items-center" role="toolbar" aria-label="Quick kubectl commands">
        {QUICK_COMMANDS.map((chip, idx) => {
          let accentClasses = "border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-300 hover:bg-emerald-950/20";
          if (chip.accent === "cyan") {
            accentClasses = "border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 hover:bg-cyan-950/20";
          } else if (chip.accent === "blue") {
            accentClasses = "border-slate-800 text-slate-300 hover:border-sky-500/50 hover:text-sky-300 hover:bg-sky-950/20";
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onRunCommand(chip.command)}
              title={chip.description}
              aria-label={`Execute: ${chip.command} - ${chip.description}`}
              className={`px-3 py-1.5 rounded-md font-mono text-xs border bg-slate-900/60 transition-all duration-200 cursor-pointer shadow-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 ${accentClasses}`}
            >
              <span className="text-slate-500 mr-1">$</span>
              <span className="font-medium">{chip.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
