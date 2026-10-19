"use client";

import React, { useState, useRef, useEffect } from "react";
import { portfolioData } from "../../data/portfolioData.ts";
import { executeCommand } from "../../lib/terminal/parser.ts";
import { getAutocomplete } from "../../lib/terminal/autocomplete.ts";
import type { HistoryItem } from "../../lib/terminal/types.ts";
import { TerminalOutput } from "./TerminalOutput.tsx";
import { TerminalInput, TerminalInputHandle } from "./TerminalInput.tsx";
import { QuickCommands } from "./QuickCommands.tsx";

export const Terminal: React.FC = () => {
  // Initialize with welcome message and kubectl get profile
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
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [tempInput, setTempInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputHandleRef = useRef<TerminalInputHandle>(null);
  const isInitialMount = useRef(true);

  // Auto-scroll terminal body only on new output, WITHOUT stealing page scroll
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
    if (!trimmed) return;

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
    setHistoryIndex(null);
    setTempInput("");
    setSuggestions([]);
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
      setHistoryIndex(null);
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
      if (history.length === 0) return;

      if (historyIndex === null) {
        setTempInput(inputVal);
        const newIdx = history.length - 1;
        setHistoryIndex(newIdx);
        setInputVal(history[newIdx].command);
      } else if (historyIndex > 0) {
        const newIdx = historyIndex - 1;
        setHistoryIndex(newIdx);
        setInputVal(history[newIdx].command);
      }
      setSuggestions([]);
      return;
    }

    // Arrow Down: navigate forward in command history
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;

      if (historyIndex < history.length - 1) {
        const newIdx = historyIndex + 1;
        setHistoryIndex(newIdx);
        setInputVal(history[newIdx].command);
      } else {
        setHistoryIndex(null);
        setInputVal(tempInput);
      }
      setSuggestions([]);
      return;
    }

    // Clear suggestions when user types regular characters
    if (suggestions.length > 0 && e.key !== "Shift" && e.key !== "Control" && e.key !== "Alt") {
      setSuggestions([]);
    }
  };

  const handleTerminalClick = (e: React.MouseEvent) => {
    // If user is selecting text, do not steal focus
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      return;
    }
    // Only focus if not clicking an interactive link or button
    const target = e.target as HTMLElement;
    if (target.tagName !== "A" && target.tagName !== "BUTTON") {
      inputHandleRef.current?.focus();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-6 px-3 sm:px-6">
      {/* Terminal Window Container */}
      <div
        ref={terminalRef}
        onClick={handleTerminalClick}
        className="rounded-xl border border-slate-800 bg-[#080e1a]/95 backdrop-blur-md shadow-2xl overflow-hidden transition-all duration-300 hover:border-slate-700/80 focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/20"
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 select-none">
          {/* Window control buttons */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block border border-rose-600/50" />
            <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block border border-amber-600/50" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block border border-emerald-600/50" />
            <span className="ml-2 font-mono text-[11px] text-slate-400 hidden sm:inline">
              kubeops-terminal -- bash
            </span>
          </div>

          {/* Title & context */}
          <div className="font-mono text-xs text-slate-300 font-medium flex items-center gap-1.5 truncate">
            <span className="text-cyan-400">⎈</span>
            <span className="text-slate-100">mohammed@kubeops</span>
            <span className="text-slate-500 hidden md:inline">~ cluster: prod-pune-01</span>
          </div>

          {/* Status & clear button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Ready</span>
            </div>
            <button
              type="button"
              onClick={() => runCommand("clear")}
              title="Clear terminal buffer (Ctrl+L)"
              aria-label="Clear terminal"
              className="font-mono text-[11px] text-slate-400 hover:text-slate-200 hover:bg-slate-800 px-2 py-0.5 rounded border border-slate-800 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalBodyRef}
          role="log"
          aria-live="polite"
          className="p-3 sm:p-5 max-h-[580px] min-h-[380px] overflow-y-auto terminal-scroll text-slate-200 font-mono text-xs sm:text-sm space-y-4"
        >
          {/* Welcome Banner */}
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/70 text-slate-300 space-y-1.5 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-2">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <span>⎈</span>
                <span>Kubernetes CLI Portfolio Environment [v1.31.2-k8s]</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                Context: mohammed@kubeops (namespace: portfolio)
              </span>
            </div>
            <p className="text-slate-400 text-[11px] pt-1">
              Type <span className="text-emerald-400 font-semibold">&apos;kubectl get profile&apos;</span>,{" "}
              <span className="text-cyan-400 font-semibold">&apos;kubectl get skills&apos;</span>, or{" "}
              <span className="text-sky-400 font-semibold">&apos;help&apos;</span> to explore Mohammed&apos;s
              profile. Tab completion and arrow history are enabled.
            </p>
            <div className="text-[10px] text-slate-500 flex items-center gap-1.5 pt-0.5">
              <span>ⓘ</span>
              <span>Portfolio simulation — not a live Kubernetes cluster.</span>
            </div>
          </div>

          {/* Executed History */}
          {history.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-100 text-xs sm:text-sm">
                <span className="text-emerald-400 select-none">mohammed@kubeops:~$</span>
                <span className="font-semibold text-slate-100">{item.command}</span>
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
      </div>

      {/* Quick Commands row */}
      <QuickCommands onRunCommand={runCommand} />
    </div>
  );
};
