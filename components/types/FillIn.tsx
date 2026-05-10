"use client";

import type { FillInQuestion } from "@/lib/types";
import { normalize } from "@/lib/normalize";

type Props = {
  question: FillInQuestion;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  showCorrect?: boolean;
};

export const FillIn = ({ question, value, onChange, disabled, showCorrect }: Props) => {
  const norm = normalize(value);
  const isCorrect = question.accepted.some((a) => normalize(a) === norm);

  const inputClass = `w-full px-4 py-3.5 rounded-xl border-2 text-lg transition-all bg-white dark:bg-slate-950 ${
    showCorrect
      ? isCorrect
        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950"
        : "border-rose-500 bg-rose-50 dark:bg-rose-950"
      : "border-slate-300 dark:border-slate-600 focus:border-brand-500 focus:outline-none"
  }`;

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={question.hint || "napíš odpoveď…"}
        className={inputClass}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
      />
      {showCorrect && !isCorrect && (
        <p className="text-sm text-emerald-700 dark:text-emerald-300">
          Správna odpoveď:{" "}
          <strong>
            {question.accepted.find((a) => /[áčďéíĺľňóôŕšťúýž]/i.test(a)) ||
              question.accepted[0]}
          </strong>
        </p>
      )}
      {!showCorrect && question.hint && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          💡 {question.hint}
        </p>
      )}
    </div>
  );
};
