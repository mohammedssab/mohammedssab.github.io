"use client";

import React, { useRef, useImperativeHandle, forwardRef } from "react";

export interface TerminalInputHandle {
  focus: () => void;
}

interface TerminalInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  suggestions: string[];
  disabled?: boolean;
}

export const TerminalInput = forwardRef<TerminalInputHandle, TerminalInputProps>(
  ({ value, onChange, onSubmit, onKeyDown, suggestions, disabled = false }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    return (
      <div className="w-full font-mono text-xs sm:text-sm mt-2">
        {/* Autocomplete suggestion banner */}
        {suggestions.length > 0 && (
          <div className="mb-2 p-2 rounded bg-slate-900/90 border border-slate-700/60 text-slate-300 text-xs flex flex-wrap gap-2 items-center">
            <span className="text-cyan-400 font-semibold">Candidates:</span>
            {suggestions.map((sug, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 font-mono text-[11px]"
              >
                {sug}
              </span>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="flex items-center gap-1.5 sm:gap-2 w-full text-slate-100"
        >
          {/* Prompt prefix */}
          <div className="flex items-center gap-1 whitespace-nowrap select-none text-[11px] sm:text-xs font-semibold">
            <span className="text-emerald-400">mohammed@kubeops</span>
            <span className="text-slate-500">:</span>
            <span className="text-cyan-400">~</span>
            <span className="text-emerald-400 font-bold">$</span>
          </div>

          {/* Actual input */}
          <div className="relative flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={disabled}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              aria-label="Kubernetes terminal command line"
              placeholder="Type 'kubectl get profile' or 'help'..."
              className="w-full bg-transparent border-none text-slate-100 font-mono text-xs sm:text-sm focus:outline-none focus:ring-0 p-0 placeholder:text-slate-600 caret-emerald-400"
            />
          </div>
        </form>
      </div>
    );
  }
);

TerminalInput.displayName = "TerminalInput";
