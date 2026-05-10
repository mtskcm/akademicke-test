import type { TestState } from "./types";

const KEY = "akademicke-test-v1";

export const loadProgress = (): TestState | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === "object" &&
      typeof parsed.currentIndex === "number" &&
      typeof parsed.answers === "object"
    ) {
      return parsed as TestState;
    }
    return null;
  } catch {
    return null;
  }
};

export const saveProgress = (state: TestState): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignore quota errors
  }
};

export const clearProgress = (): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
};
