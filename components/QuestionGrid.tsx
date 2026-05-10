"use client";

import type { Question, QuestionAnswer, Mode } from "@/lib/types";
import { gradeQuestion, isAnswered } from "@/lib/grading";

type Props = {
  questions: Question[];
  answers: Record<number, QuestionAnswer>;
  currentIndex: number;
  onSelect: (i: number) => void;
  mode: Mode;
  finished: boolean;
};

export const QuestionGrid = ({
  questions,
  answers,
  currentIndex,
  onSelect,
  mode,
  finished,
}: Props) => {
  const cellClass = (i: number) => {
    const q = questions[i];
    const a = answers[q.id];
    const answered = isAnswered(q, a);
    const showResult = finished || (mode === "training" && answered);

    const base =
      "w-9 h-9 rounded-lg text-xs font-semibold flex items-center justify-center transition-all border";

    if (i === currentIndex) {
      return `${base} bg-brand-600 text-white border-brand-700 ring-2 ring-brand-300`;
    }
    if (showResult && answered) {
      return gradeQuestion(q, a)
        ? `${base} bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800`
        : `${base} bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800`;
    }
    if (answered) {
      return `${base} bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800`;
    }
    return `${base} bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-brand-400`;
  };

  return (
    <div className="grid grid-cols-10 gap-1.5">
      {questions.map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          className={cellClass(i)}
          aria-label={`Otázka ${i + 1}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};
