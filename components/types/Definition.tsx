"use client";

import type { DefinitionQuestion } from "@/lib/types";

type Props = {
  question: DefinitionQuestion;
  value: string;
  selfCorrect: boolean | null;
  onChange: (v: string) => void;
  onSelfGrade: (correct: boolean) => void;
  disabled?: boolean;
  showCorrect?: boolean;
};

export const Definition = ({
  question,
  value,
  selfCorrect,
  onChange,
  onSelfGrade,
  disabled,
  showCorrect,
}: Props) => {
  const textareaClass = `w-full px-4 py-3 rounded-xl border-2 transition-all bg-white dark:bg-slate-950 min-h-[140px] resize-y leading-relaxed ${
    showCorrect
      ? selfCorrect === true
        ? "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/40"
        : selfCorrect === false
          ? "border-rose-500 bg-rose-50/40 dark:bg-rose-950/40"
          : "border-slate-300 dark:border-slate-600"
      : "border-slate-300 dark:border-slate-600 focus:border-brand-500 focus:outline-none"
  }`;

  return (
    <div className="flex flex-col gap-3">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="napíš definíciu vlastnými slovami…"
        className={textareaClass}
        spellCheck={false}
      />

      {showCorrect && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Referenčná definícia
          </p>
          <p className="text-sm leading-relaxed text-slate-900 dark:text-slate-100">
            {question.reference}
          </p>
        </div>
      )}

      {showCorrect && (
        <div className="flex flex-col sm:flex-row gap-2">
          <p className="text-sm text-slate-600 dark:text-slate-400 sm:self-center sm:mr-2">
            Mala si to správne?
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onSelfGrade(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                selfCorrect === true
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-emerald-300 bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 hover:border-emerald-500"
              }`}
            >
              ✓ Áno, vedela
            </button>
            <button
              type="button"
              onClick={() => onSelfGrade(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                selfCorrect === false
                  ? "border-rose-600 bg-rose-600 text-white"
                  : "border-rose-300 bg-white dark:bg-slate-900 text-rose-700 dark:text-rose-300 hover:border-rose-500"
              }`}
            >
              ✗ Nie, nevedela
            </button>
          </div>
        </div>
      )}

      {!showCorrect && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          💡 Po stlačení „Skontrolovať odpoveď" uvidíš referenčnú definíciu a sama označíš, či si ju vedela.
        </p>
      )}
    </div>
  );
};
