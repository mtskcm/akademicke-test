import type { SubjectId, TestState } from "./types";

const LEGACY_KEY = "akademicke-test-v1";
const keyFor = (subjectId: SubjectId) => `akademicke-test-v1:${subjectId}`;

const parseState = (raw: string | null): TestState | null => {
  if (!raw) return null;
  try {
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

export const loadProgress = (subjectId: SubjectId): TestState | null => {
  if (typeof window === "undefined") return null;
  try {
    const fresh = parseState(window.localStorage.getItem(keyFor(subjectId)));
    if (fresh) return fresh;
    // Backward compat: starý kľúč bez subject suffixu — patrí akademickému
    if (subjectId === "akademicke") {
      const legacy = parseState(window.localStorage.getItem(LEGACY_KEY));
      if (legacy) {
        const migrated: TestState = { ...legacy, subjectId: "akademicke" };
        window.localStorage.setItem(keyFor("akademicke"), JSON.stringify(migrated));
        window.localStorage.removeItem(LEGACY_KEY);
        return migrated;
      }
    }
    return null;
  } catch {
    return null;
  }
};

export const saveProgress = (state: TestState): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(keyFor(state.subjectId), JSON.stringify(state));
  } catch {
    // ignore quota errors
  }
};

export const clearProgress = (subjectId: SubjectId): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(keyFor(subjectId));
    if (subjectId === "akademicke") {
      window.localStorage.removeItem(LEGACY_KEY);
    }
  } catch {
    // ignore
  }
};
