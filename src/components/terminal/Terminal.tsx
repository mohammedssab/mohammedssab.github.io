"use client";

import React, { useState, useRef, useEffect } from "react";
import { portfolioData } from "../../data/portfolioData.ts";
import { executeCommand } from "../../lib/terminal/parser.ts";
import { getAutocomplete } from "../../lib/terminal/autocomplete.ts";
import { createHistoryManager } from "../../lib/terminal/history.ts";
import type { HistoryItem } from "../../lib/terminal/types.ts";
import { TerminalOutput } from "./TerminalOutput.tsx";
import { TerminalInput, TerminalInputHandle } from "./TerminalInput.tsx";
import { CommandReference } from "./CommandReference.tsx";

export const Terminal: React.FC = () => {
  // Initialize with initial executed command
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const initialCmd = "kubectl get profile";
    const initialResult = executeCommand(initialCmd, portfolioData);
    return [
      {
        id: "initial-profile",
        command: initialCmd,
        result: initialResult,
        timestamp: Date.now(),
      },
    ];
  });

  const [inputVal, setInputVal] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // History Manager instance in ref so it persists across renders without recreating
  const historyManagerRef = useRef(createHistoryManager(["kubectl get profile"]));

  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputHandleRef = useRef<TerminalInputHandle>(null);
  const isInitialMount = useRef(true);

  // Auto-scroll terminal body ONLY on new output, WITHOUT stealing window scroll
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = (commandToRun: string) => {
    const trimmed = commandToRun.trim();
    if (!trimmed) {
      setInputVal("");
      setSuggestions([]);
      return;
    }

    // Add to history manager
    historyManagerRef.current.add(trimmed);

    const result = executeCommand(trimmed, portfolioData);

    if (result.type === "clear") {
      setHistory([]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          command: trimmed,
          result,
          timestamp: Date.now(),
        },
      ]);
    }

    setInputVal("");
    setSuggestions([]);
  };

  const insertCommand = (commandToInsert: string) => {
    setInputVal(commandToInsert);
    setSuggestions([]);
    inputHandleRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Ctrl+L to clear screen
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setHistory([]);
      setInputVal("");
      setSuggestions([]);
      return;
    }

    // Ctrl+C to cancel current line
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
      e.preventDefault();
      if (inputVal) {
        setHistory((prev) => [
          ...prev,
          {
            id: `${Date.now()}-cancelled`,
            command: `${inputVal} ^C`,
            result: { type: "text", content: "" },
            timestamp: Date.now(),
          },
        ]);
      }
      setInputVal("");
      historyManagerRef.current.resetNavigation();
      setSuggestions([]);
      return;
    }

    // Tab for completion
    if (e.key === "Tab") {
      e.preventDefault();
      const ac = getAutocomplete(inputVal, portfolioData);
      if (ac.replacement !== inputVal) {
        setInputVal(ac.replacement);
      }
      setSuggestions(ac.suggestions);
      return;
    }

    // Arrow Up: navigate backward in command history
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = historyManagerRef.current.previous(inputVal);
      if (prev !== null) {
        setInputVal(prev);
      }
      setSuggestions([]);
      return;
    }

    // Arrow Down: navigate forward in command history
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = historyManagerRef.current.next();
      if (next !== null) {
        setInputVal(next);
      }
      setSuggestions([]);
      return;
    }

    // Clear suggestions when user types regular characters
    if (
      suggestions.length > 0 &&
      e.key !== "Shift" &&
      e.key !== "Control" &&
      e.key !== "Alt"
    ) {
      setSuggestions([]);
    }
  };

  const handleTerminalClick = (e: React.MouseEvent) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      return;
    }
    const target = e.target as HTMLElement;
    if (target.tagName !== "A" && target.tagName !== "BUTTON") {
      inputHandleRef.current?.focus();
    }
  };

const QUICK_CHIPS = [
  "kubectl get profile",
  "kubectl get skills",
  "kubectl get projects",
  "kubectl get experience",
  "kubectl get all",
  "help",
];

  return (
    <div className="w-full max-w-[1000px] mx-auto">
      {/* Terminal Window Container */}
      <div
        ref={terminalRef}
        onClick={handleTerminalClick}
        className="rounded-xl border border-slate-800 bg-[#080e1a]/95 backdrop-blur-md shadow-2xl overflow-hidden transition-all duration-300 hover:border-slate-700/80 focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/20"
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-slate-900/90 border-b border-slate-800 select-none">
          {/* Window control dots & title */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block border border-rose-600/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block border border-amber-600/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/40" />
            </div>
            <span className="font-mono text-[13px] text-white font-medium ml-1">
              mohammed@portfolio
            </span>
          </div>

          {/* Clear button */}
          <button
            type="button"
            onClick={() => runCommand("clear")}
            title="Clear terminal buffer (Ctrl+L)"
            aria-label="Clear terminal"
            className="font-mono text-xs text-slate-300 hover:text-white hover:bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700/60 transition-colors cursor-pointer"
          >
            Clear
          </button>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalBodyRef}
          role="log"
          aria-live="polite"
          className="p-3 sm:p-4 min-h-[380px] max-h-[560px] overflow-y-auto terminal-scroll text-slate-200 font-mono text-[13px] sm:text-sm space-y-3"
        >
          {/* Thin hint & disclaimer line */}
          <div className="p-2 sm:px-3 sm:py-2 rounded bg-slate-900/60 border border-slate-800/80 flex flex-wrap items-center justify-between gap-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="text-slate-400">Try:</span>
              <button
                type="button"
                onClick={() => runCommand("kubectl get skills")}
                className="text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer font-medium"
              >
                kubectl get skills
              </button>
              <span className="text-slate-500">·</span>
              <button
                type="button"
                onClick={() => runCommand("kubectl get projects")}
                className="text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer font-medium"
              >
                kubectl get projects
              </button>
            </div>
            <span className="text-slate-400 text-[11px] sm:text-xs">
              Simulated portfolio environment — not a live Kubernetes cluster.
            </span>
          </div>

          {/* Executed History */}
          {history.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-white text-[13px] sm:text-sm">
                <span className="text-emerald-400 select-none">mohammed@portfolio:~$</span>
                <span className="font-semibold text-white">{item.command}</span>
              </div>
              <TerminalOutput result={item.result} />
            </div>
          ))}

          {/* Active Input Prompt */}
          <TerminalInput
            ref={inputHandleRef}
            value={inputVal}
            onChange={setInputVal}
            onSubmit={() => runCommand(inputVal)}
            onKeyDown={handleKeyDown}
            suggestions={suggestions}
          />
        </div>

        {/* Terminal Footer with Quick Command Chips */}
        <div className="px-3 sm:px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 text-xs font-semibold mr-1">Quick:</span>
            {QUICK_CHIPS.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => runCommand(cmd)}
                aria-label={`Execute ${cmd}`}
                className="px-2.5 py-1 rounded text-xs border border-slate-700/80 bg-slate-800/80 text-slate-200 hover:border-emerald-500/50 hover:text-emerald-300 hover:bg-emerald-950/30 active:scale-95 transition-all cursor-pointer font-mono"
              >
                <span className="text-cyan-400 mr-1">$</span>
                <span>{cmd}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Collapsible Command Reference panel */}
      <CommandReference
        onRunCommand={runCommand}
        onInsertCommand={insertCommand}
      />
    </div>
  );
};
