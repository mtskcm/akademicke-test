"use client";

import type { TrueFalseQuestion } from "@/lib/types";

type Props = {
  question: TrueFalseQuestion;
  value: boolean | null;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  showCorrect?: boolean;
};

export const TrueFalse = ({ question, value, onChange, disabled, showCorrect }: Props) => {
  const buttonClass = (forValue: boolean) => {
    const base =
      "flex-1 px-6 py-5 rounded-xl border-2 font-medium text-lg transition-all";
    const inactive =
      "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-slate-800";
    const selected =
      "border-brand-600 bg-brand-50 dark:bg-brand-950 text-brand-900 dark:text-brand-200";
    const correct = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200";
    const wrong = "border-rose-500 bg-rose-50 dark:bg-rose-950 text-rose-900 dark:text-rose-200";

    if (showCorrect) {
      if (forValue === question.answer) return `${base} ${correct}`;
      if (value === forValue && forValue !== question.answer) return `${base} ${wrong}`;
      return `${base} ${inactive} opacity-60`;
    }
    return `${base} ${value === forValue ? selected : inactive}`;
  };

  return (
    <div className="flex gap-3">
      <button
        type="button"
        className={buttonClass(true)}
        onClick={() => !disabled && onChange(true)}
        disabled={disabled}
      >
        Pravda
      </button>
      <button
        type="button"
        className={buttonClass(false)}
        onClick={() => !disabled && onChange(false)}
        disabled={disabled}
      >
        Nepravda
      </button>
    </div>
  );
};
