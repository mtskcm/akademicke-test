"use client";

import type { MultiChoiceQuestion } from "@/lib/types";

type Props = {
  question: MultiChoiceQuestion;
  value: number[];
  onChange: (v: number[]) => void;
  disabled?: boolean;
  showCorrect?: boolean;
};

export const MultiChoice = ({ question, value, onChange, disabled, showCorrect }: Props) => {
  const isChecked = (i: number) => value.includes(i);
  const isCorrect = (i: number) => question.answers.includes(i);

  const toggle = (i: number) => {
    if (disabled) return;
    if (isChecked(i)) {
      onChange(value.filter((v) => v !== i));
    } else {
      onChange([...value, i].sort((a, b) => a - b));
    }
  };

  const optionClass = (i: number) => {
    const base =
      "w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-start gap-3";
    const inactive =
      "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-slate-800";
    const selected =
      "border-brand-600 bg-brand-50 dark:bg-brand-950 text-brand-900 dark:text-brand-200";
    const correct = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200";
    const wrong = "border-rose-500 bg-rose-50 dark:bg-rose-950 text-rose-900 dark:text-rose-200";
    const missed = "border-amber-500 bg-amber-50 dark:bg-amber-950 text-amber-900 dark:text-amber-200";

    if (showCorrect) {
      const checked = isChecked(i);
      const should = isCorrect(i);
      if (checked && should) return `${base} ${correct}`;
      if (checked && !should) return `${base} ${wrong}`;
      if (!checked && should) return `${base} ${missed}`;
      return `${base} ${inactive} opacity-60`;
    }
    return `${base} ${isChecked(i) ? selected : inactive}`;
  };

  const showCountWarning =
    !!question.exactCount && !showCorrect && value.length !== question.exactCount && value.length > 0;

  return (
    <div className="flex flex-col gap-2.5">
      {question.exactCount && (
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
          Vyber presne <strong>{question.exactCount}</strong> {question.exactCount === 2 ? "možnosti" : "možností"}.
        </p>
      )}
      {question.options.map((opt, i) => (
        <button
          key={i}
          type="button"
          className={optionClass(i)}
          onClick={() => toggle(i)}
          disabled={disabled}
        >
          <span
            className={`flex-shrink-0 w-7 h-7 rounded-md border-2 border-current flex items-center justify-center text-sm font-bold ${
              isChecked(i) ? "bg-current" : ""
            }`}
          >
            {isChecked(i) && <span className="text-white dark:text-slate-900">✓</span>}
          </span>
          <span className="flex-1 leading-relaxed">{opt}</span>
        </button>
      ))}
      {showCountWarning && (
        <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
          Máš zaškrtnuté {value.length} z {question.exactCount}.
        </p>
      )}
    </div>
  );
};
