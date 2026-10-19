/**
 * Pure, UI-independent terminal history manager.
 * Supports add, previous, next, de-duplicating consecutive entries,
 * and preserving uncommitted draft lines.
 */

export interface HistoryManager {
  add: (command: string) => void;
  previous: (currentInput: string) => string | null;
  next: () => string | null;
  getEntries: () => string[];
  getCurrentIndex: () => number | null;
  getDraft: () => string;
  clear: () => void;
  resetNavigation: () => void;
}

export function createHistoryManager(initialEntries: string[] = []): HistoryManager {
  let entries: string[] = [...initialEntries];
  let currentIndex: number | null = null;
  let draftLine = "";

  return {
    add(command: string) {
      const trimmed = command.trim();
      if (!trimmed) {
        currentIndex = null;
        draftLine = "";
        return;
      }

      // De-duplicate consecutive identical commands
      if (entries.length === 0 || entries[entries.length - 1] !== trimmed) {
        entries.push(trimmed);
      }

      currentIndex = null;
      draftLine = "";
    },

    previous(currentInput: string): string | null {
      if (entries.length === 0) return null;

      if (currentIndex === null) {
        draftLine = currentInput;
        currentIndex = entries.length - 1;
        return entries[currentIndex];
      }

      if (currentIndex > 0) {
        currentIndex--;
        return entries[currentIndex];
      }

      return entries[0];
    },

    next(): string | null {
      if (currentIndex === null) return null;

      if (currentIndex < entries.length - 1) {
        currentIndex++;
        return entries[currentIndex];
      }

      // Reached past latest entry, restore the draft line
      currentIndex = null;
      return draftLine;
    },

    getEntries(): string[] {
      return [...entries];
    },

    getCurrentIndex(): number | null {
      return currentIndex;
    },

    getDraft(): string {
      return draftLine;
    },

    clear() {
      entries = [];
      currentIndex = null;
      draftLine = "";
    },

    resetNavigation() {
      currentIndex = null;
      draftLine = "";
    },
  };
}
