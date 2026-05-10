import type { Question } from "./types";
import { shuffle } from "./shuffle";

export const optionLengthFor = (q: Question): number => {
  switch (q.type) {
    case "single":
    case "multi":
      return q.options.length;
    case "matching":
      return q.right.length;
    default:
      return 0;
  }
};

export const buildOptionOrder = (q: Question, doShuffle: boolean): number[] => {
  const len = optionLengthFor(q);
  if (len === 0) return [];
  const ids = Array.from({ length: len }, (_, i) => i);
  return doShuffle ? shuffle(ids) : ids;
};

export const buildOptionOrders = (
  questions: Question[],
  doShuffle: boolean,
): Record<number, number[]> => {
  const out: Record<number, number[]> = {};
  for (const q of questions) {
    if (optionLengthFor(q) > 0) {
      out[q.id] = buildOptionOrder(q, doShuffle);
    }
  }
  return out;
};
