"use client";

import type { MatchingQuestion } from "@/lib/types";

type Props = {
  question: MatchingQuestion;
  value: Array<number | null>;
  onChange: (v: Array<number | null>) => void;
  disabled?: boolean;
  showCorrect?: boolean;
};

export const Matching = ({ question, value, onChange, disabled, showCorrect }: Props) => {
  const current = value.length === question.left.length ? value : Array(question.left.length).fill(null);

  const set = (leftIndex: number, rightIndex: number | null) => {
    if (disabled) return;
    const next = [...current];
    next[leftIndex] = rightIndex;
    onChange(next);
  };

  const correctRightFor = (leftIndex: number): number => {
    const pair = question.pairs.find(([l]) => l === leftIndex);
    return pair ? pair[1] : -1;
  };

  return (
    <div className="flex flex-col gap-3">
      {question.left.map((leftText, li) => {
        const selected = current[li];
        const correctRight = correctRightFor(li);
        const isCorrect = showCorrect && selected === correctRight;
        const isWrong = showCorrect && selected !== correctRight;

        const containerClass = `rounded-xl border-2 p-4 flex flex-col sm:flex-row sm:items-center gap-3 transition-all ${
          showCorrect
            ? isCorrect
              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950"
              : "border-rose-500 bg-rose-50 dark:bg-rose-950"
            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
        }`;

        return (
          <div key={li} className={containerClass}>
            <div className="flex-1 leading-relaxed">{leftText}</div>
            <div className="sm:w-72">
              <select
                value={selected ?? ""}
                onChange={(e) =>
                  set(li, e.target.value === "" ? null : Number(e.target.value))
                }
                disabled={disabled}
                className="w-full px-3 py-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-950 focus:border-brand-500 focus:outline-none disabled:opacity-60"
              >
                <option value="">— vyber —</option>
                {question.right.map((rightText, ri) => (
                  <option key={ri} value={ri}>
                    {rightText}
                  </option>
                ))}
              </select>
              {showCorrect && isWrong && correctRight >= 0 && (
                <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1.5">
                  Správne: <strong>{question.right[correctRight]}</strong>
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
