"use client";

import { useState } from "react";
import type { Question, QuestionAnswer } from "@/lib/types";
import { computeScore, gradeQuestion } from "@/lib/grading";
import { QuestionCard } from "./QuestionCard";

type Props = {
  questions: Question[];
  answers: Record<number, QuestionAnswer>;
  optionOrders: Record<number, number[]>;
  onRestart: () => void;
  onRetryWrong: () => void;
  onJumpTo: (i: number) => void;
};

const grade = (pct: number): { msg: string; color: string } => {
  if (pct >= 90) return { msg: "Výborne!", color: "text-emerald-600" };
  if (pct >= 75) return { msg: "Veľmi dobre!", color: "text-emerald-600" };
  if (pct >= 60) return { msg: "Dobre!", color: "text-amber-600" };
  if (pct >= 40) return { msg: "Treba ešte trošku", color: "text-amber-600" };
  return { msg: "Skús to znova", color: "text-rose-600" };
};

export const Results = ({ questions, answers, optionOrders, onRestart, onRetryWrong, onJumpTo }: Props) => {
  const [filter, setFilter] = useState<"all" | "wrong">("wrong");
  const score = computeScore(questions, answers);
  const g = grade(score.percentage);

  const visible =
    filter === "all"
      ? questions
      : questions.filter((q) => !gradeQuestion(q, answers[q.id]));

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center">
        <p className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Tvoj výsledok
        </p>
        <p className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
          {score.correct} / {score.total}
        </p>
        <p className="text-2xl font-semibold mt-2 text-brand-600">
          {score.percentage}%
        </p>
        <p className={`text-lg font-medium mt-3 ${g.color}`}>{g.msg}</p>

        <div className="flex flex-wrap gap-2 justify-center mt-6">
          <button
            type="button"
            onClick={onRestart}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium transition-colors"
          >
            Skúsiť celý test znova
          </button>
          <button
            type="button"
            onClick={onRetryWrong}
            className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-medium transition-colors"
            disabled={score.correct === score.total}
          >
            Iba zlé otázky znova
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setFilter("wrong")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === "wrong"
              ? "bg-brand-600 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          }`}
        >
          Iba zlé ({score.total - score.correct})
        </button>
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === "all"
              ? "bg-brand-600 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          }`}
        >
          Všetky ({score.total})
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {visible.length === 0 ? (
          <div className="text-center text-slate-500 dark:text-slate-400 py-12">
            Skvelé! Žiadne zlé odpovede. 🎉
          </div>
        ) : (
          visible.map((q) => {
            const a = answers[q.id];
            const realIndex = questions.findIndex((x) => x.id === q.id);
            return (
              <div key={q.id} className="relative">
                <QuestionCard
                  question={q}
                  answer={a}
                  onAnswer={() => {}}
                  showCorrect={true}
                  index={realIndex}
                  total={questions.length}
                  optionOrder={optionOrders[q.id]}
                />
                <button
                  type="button"
                  onClick={() => onJumpTo(realIndex)}
                  className="absolute top-4 right-4 text-xs text-brand-600 hover:underline"
                >
                  Skočiť na otázku
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
