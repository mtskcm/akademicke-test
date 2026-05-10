"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { questions as ALL_QUESTIONS } from "@/lib/questions";
import type { Mode, Question, QuestionAnswer, TestState } from "@/lib/types";
import { loadProgress, saveProgress, clearProgress } from "@/lib/storage";
import { gradeQuestion, isAnswered } from "@/lib/grading";
import { shuffle } from "@/lib/shuffle";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressBar } from "@/components/ProgressBar";
import { QuestionGrid } from "@/components/QuestionGrid";
import { Results } from "@/components/Results";

const buildOrder = (questions: Question[], shuffled: boolean): number[] => {
  const ids = questions.map((q) => q.id);
  return shuffled ? shuffle(ids) : ids;
};

const initialState = (mode: Mode, shuffled: boolean): TestState => ({
  mode,
  currentIndex: 0,
  answers: {},
  finished: false,
  startedAt: Date.now(),
  shuffled,
  order: buildOrder(ALL_QUESTIONS, shuffled),
  submittedIds: [],
});

const isAutoSubmit = (type: Question["type"]) => type === "truefalse" || type === "single";

function TestRunner() {
  const searchParams = useSearchParams();
  const requestedMode = (searchParams.get("mode") as Mode) || "training";
  const requestedShuffle = searchParams.get("shuffle") === "1";

  const [state, setState] = useState<TestState | null>(null);
  const [pool, setPool] = useState<Question[]>(ALL_QUESTIONS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadProgress();
    if (saved && !saved.finished) {
      const fixed: TestState = {
        ...saved,
        order: saved.order && saved.order.length > 0 ? saved.order : ALL_QUESTIONS.map((q) => q.id),
        shuffled: saved.shuffled ?? false,
        submittedIds: saved.submittedIds ?? [],
      };
      setState(fixed);
    } else {
      setState(initialState(requestedMode, requestedShuffle));
    }
    setHydrated(true);
  }, [requestedMode, requestedShuffle]);

  useEffect(() => {
    if (state && hydrated) saveProgress(state);
  }, [state, hydrated]);

  const questionsToShow = useMemo(() => {
    if (!state) return [];
    const byId = new Map(pool.map((q) => [q.id, q]));
    return state.order.map((id) => byId.get(id)).filter((q): q is Question => !!q);
  }, [state, pool]);

  const current = questionsToShow[state?.currentIndex ?? 0];

  const setAnswer = (a: QuestionAnswer) => {
    if (!state || !current) return;
    const newAnswers = { ...state.answers, [current.id]: a };
    let newSubmitted = state.submittedIds;
    if (
      state.mode === "training" &&
      isAutoSubmit(current.type) &&
      isAnswered(current, a) &&
      !state.submittedIds.includes(current.id)
    ) {
      newSubmitted = [...state.submittedIds, current.id];
    }
    setState({
      ...state,
      answers: newAnswers,
      submittedIds: newSubmitted,
    });
  };

  const submitCurrent = () => {
    if (!state || !current) return;
    if (state.submittedIds.includes(current.id)) return;
    setState({
      ...state,
      submittedIds: [...state.submittedIds, current.id],
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
    setPool(ALL_QUESTIONS);
    setState(initialState(state?.mode ?? "training", state?.shuffled ?? false));
  };

  const reshuffle = () => {
    if (!state) return;
    clearProgress();
    setPool(ALL_QUESTIONS);
    setState({
      ...initialState(state.mode, true),
    });
  };

  const unshuffle = () => {
    if (!state) return;
    clearProgress();
    setPool(ALL_QUESTIONS);
    setState({
      ...initialState(state.mode, false),
    });
  };

  const retryWrong = () => {
    if (!state) return;
    const wrong = ALL_QUESTIONS.filter((q) => !gradeQuestion(q, state.answers[q.id]));
    if (wrong.length === 0) return;
    clearProgress();
    setPool(wrong);
    const wrongIds = wrong.map((q) => q.id);
    setState({
      ...initialState("training", false),
      order: state.shuffled ? shuffle(wrongIds) : wrongIds,
      shuffled: state.shuffled,
    });
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

  if (!current) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Test je prázdny.
      </div>
    );
  }

  const submittedHere = state.submittedIds.includes(current.id);
  const showCorrect = state.finished || (state.mode === "training" && submittedHere);
  const canCheck =
    state.mode === "training" &&
    !submittedHere &&
    !isAutoSubmit(current.type) &&
    isAnswered(current, state.answers[current.id]);

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
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <span className="text-xs px-2.5 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-medium">
              {state.mode === "training" ? "Tréning" : "Test"}
            </span>
            {state.shuffled ? (
              <button
                type="button"
                onClick={unshuffle}
                title="Vrátiť pôvodné poradie a začať odznova"
                className="text-xs px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 hover:bg-amber-200 dark:hover:bg-amber-900 text-amber-700 dark:text-amber-300 transition-colors"
              >
                🎲 Premiešané
              </button>
            ) : (
              <button
                type="button"
                onClick={reshuffle}
                title="Premiešať otázky a začať odznova"
                className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
              >
                🎲 Premiešať
              </button>
            )}
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

        {canCheck && (
          <div className="mt-4">
            <button
              type="button"
              onClick={submitCurrent}
              className="w-full px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors"
            >
              Skontrolovať odpoveď
            </button>
          </div>
        )}

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
            submittedIds={state.submittedIds}
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
