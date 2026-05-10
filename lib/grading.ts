import type { Question, QuestionAnswer } from "./types";
import { normalize } from "./normalize";

export const isAnswered = (q: Question, a: QuestionAnswer | undefined): boolean => {
  if (!a) return false;
  switch (a.type) {
    case "truefalse":
      return a.value !== null;
    case "single":
      return a.value !== null;
    case "multi":
      return a.value.length > 0;
    case "matching":
      return a.value.length === (q as { left: string[] }).left.length && a.value.every((v) => v !== null);
    case "fillin":
      return a.value.trim().length > 0;
  }
};

export const gradeQuestion = (q: Question, a: QuestionAnswer | undefined): boolean => {
  if (!a) return false;
  if (q.type === "truefalse" && a.type === "truefalse") {
    return a.value === q.answer;
  }
  if (q.type === "single" && a.type === "single") {
    return a.value === q.answer;
  }
  if (q.type === "multi" && a.type === "multi") {
    if (a.value.length !== q.answers.length) return false;
    const sortedA = [...a.value].sort((x, y) => x - y);
    const sortedB = [...q.answers].sort((x, y) => x - y);
    return sortedA.every((v, i) => v === sortedB[i]);
  }
  if (q.type === "matching" && a.type === "matching") {
    if (a.value.length !== q.left.length) return false;
    return q.pairs.every(([li, ri]) => a.value[li] === ri);
  }
  if (q.type === "fillin" && a.type === "fillin") {
    const norm = normalize(a.value);
    return q.accepted.some((acc) => normalize(acc) === norm);
  }
  return false;
};

export const computeScore = (
  questions: Question[],
  answers: Record<number, QuestionAnswer>,
): { correct: number; total: number; percentage: number } => {
  const correct = questions.reduce(
    (acc, q) => acc + (gradeQuestion(q, answers[q.id]) ? 1 : 0),
    0,
  );
  const total = questions.length;
  return {
    correct,
    total,
    percentage: total === 0 ? 0 : Math.round((correct / total) * 100),
  };
};
