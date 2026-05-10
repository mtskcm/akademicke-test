"use client";

import type { SingleChoiceQuestion } from "@/lib/types";

type Props = {
  question: SingleChoiceQuestion;
  value: number | null;
  onChange: (v: number) => void;
  disabled?: boolean;
  showCorrect?: boolean;
};

export const SingleChoice = ({ question, value, onChange, disabled, showCorrect }: Props) => {
  const optionClass = (i: number) => {
    const base =
      "w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-start gap-3";
    const inactive =
      "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-slate-800";
    const selected =
      "border-brand-600 bg-brand-50 dark:bg-brand-950 text-brand-900 dark:text-brand-200";
    const correct = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200";
    const wrong = "border-rose-500 bg-rose-50 dark:bg-rose-950 text-rose-900 dark:text-rose-200";

    if (showCorrect) {
      if (i === question.answer) return `${base} ${correct}`;
      if (value === i && i !== question.answer) return `${base} ${wrong}`;
      return `${base} ${inactive} opacity-60`;
    }
    return `${base} ${value === i ? selected : inactive}`;
  };

  return (
    <div className="flex flex-col gap-2.5">
      {question.options.map((opt, i) => (
        <button
          key={i}
          type="button"
          className={optionClass(i)}
          onClick={() => !disabled && onChange(i)}
          disabled={disabled}
        >
          <span className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-sm font-semibold">
            {String.fromCharCode(97 + i)}
          </span>
          <span className="flex-1 leading-relaxed">{opt}</span>
        </button>
      ))}
    </div>
  );
};
