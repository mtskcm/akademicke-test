"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { questions as ALL_QUESTIONS } from "@/lib/questions";
import type { Mode, Question, QuestionAnswer, TestState } from "@/lib/types";
import { loadProgress, saveProgress, clearProgress } from "@/lib/storage";
import { gradeQuestion, isAnswered } from "@/lib/grading";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressBar } from "@/components/ProgressBar";
import { QuestionGrid } from "@/components/QuestionGrid";
import { Results } from "@/components/Results";

const initialState = (mode: Mode): TestState => ({
  mode,
  currentIndex: 0,
  answers: {},
  finished: false,
  startedAt: Date.now(),
});

function TestRunner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedMode = (searchParams.get("mode") as Mode) || "training";

  const [state, setState] = useState<TestState | null>(null);
  const [questionsToShow, setQuestionsToShow] = useState<Question[]>(ALL_QUESTIONS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadProgress();
    if (saved && !saved.finished) {
      setState(saved);
    } else {
      setState(initialState(requestedMode));
    }
    setHydrated(true);
  }, [requestedMode]);

  useEffect(() => {
    if (state && hydrated) saveProgress(state);
  }, [state, hydrated]);

  const current = questionsToShow[state?.currentIndex ?? 0];

  const setAnswer = (a: QuestionAnswer) => {
    if (!state || !current) return;
    setState({
      ...state,
      answers: { ...state.answers, [current.id]: a },
    });
  };

  const goTo = (i: number) => {
    if (!state) return;
    setState({ ...state, currentIndex: Math.max(0, Math.min(questionsToShow.length - 1, i)) });
  };

  const finish = () => {
    if (!state) return;
    setState({ ...state, finished: true });
  };

  const restart = () => {
    clearProgress();
    setQuestionsToShow(ALL_QUESTIONS);
    setState(initialState(state?.mode ?? "training"));
  };

  const retryWrong = () => {
    if (!state) return;
    const wrong = ALL_QUESTIONS.filter((q) => !gradeQuestion(q, state.answers[q.id]));
    if (wrong.length === 0) return;
    clearProgress();
    setQuestionsToShow(wrong);
    setState(initialState("training"));
  };

  const answeredCount = useMemo(
    () =>
      state
        ? questionsToShow.filter((q) => isAnswered(q, state.answers[q.id])).length
        : 0,
    [state, questionsToShow],
  );

  if (!state || !hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Načítavam…
      </div>
    );
  }

  const showCorrect =
    state.finished || (state.mode === "training" && isAnswered(current, state.answers[current.id]));

  if (state.finished) {
    return (
      <main className="min-h-screen px-4 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 transition-colors"
            >
              ← Domov
            </Link>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Vyhodnotené
            </span>
          </div>
          <Results
            questions={questionsToShow}
            answers={state.answers}
            onRestart={restart}
            onRetryWrong={retryWrong}
            onJumpTo={(i) => {
              setState({ ...state, finished: false, currentIndex: i });
            }}
          />
        </div>
      </main>
    );
  }

  const isLast = state.currentIndex === questionsToShow.length - 1;

  return (
    <main className="min-h-screen px-4 py-6 sm:py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4 gap-3">
          <Link
            href="/"
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 transition-colors flex-shrink-0"
          >
            ← Domov
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-medium">
              {state.mode === "training" ? "Tréning" : "Test"}
            </span>
            <button
              type="button"
              onClick={restart}
              className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mb-6">
          <ProgressBar current={answeredCount} total={questionsToShow.length} />
        </div>

        <QuestionCard
          question={current}
          answer={state.answers[current.id]}
          onAnswer={setAnswer}
          showCorrect={showCorrect}
          index={state.currentIndex}
          total={questionsToShow.length}
        />

        <div className="flex items-center justify-between gap-3 mt-6">
          <button
            type="button"
            onClick={() => goTo(state.currentIndex - 1)}
            disabled={state.currentIndex === 0}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:border-brand-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            ← Predošlá
          </button>
          {isLast ? (
            <button
              type="button"
              onClick={finish}
              className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold transition-colors"
            >
              Vyhodnotiť test
            </button>
          ) : (
            <button
              type="button"
              onClick={() => goTo(state.currentIndex + 1)}
              className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium transition-colors"
            >
              Ďalšia →
            </button>
          )}
        </div>

        <div className="mt-10">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Prehľad otázok
          </h3>
          <QuestionGrid
            questions={questionsToShow}
            answers={state.answers}
            currentIndex={state.currentIndex}
            onSelect={goTo}
            mode={state.mode}
            finished={state.finished}
          />
          <div className="flex flex-wrap gap-3 mt-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-brand-600 border border-brand-700" />
              aktuálna
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-800" />
              vyplnená
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800" />
              správne
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-rose-100 dark:bg-rose-950 border border-rose-300 dark:border-rose-800" />
              zle
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function TestPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-slate-500">
          Načítavam…
        </div>
      }
    >
      <TestRunner />
    </Suspense>
  );
}
