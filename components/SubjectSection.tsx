"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isAnswered } from "@/lib/grading";
import { loadProgress, clearProgress } from "@/lib/storage";
import type { Subject } from "@/lib/subjects";
import type { TestState } from "@/lib/types";

type Props = {
  subject: Subject;
};

const ACCENT_CLASSES = {
  brand: {
    chip: "bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300",
    accentText: "group-hover:text-brand-600",
    accentBorder: "hover:border-brand-400",
    examBorder: "border-brand-300 dark:border-brand-800 hover:border-brand-500",
    examBg: "from-brand-50 to-white dark:from-brand-950 dark:to-slate-900",
    examTextHover: "group-hover:text-brand-700",
    examCountBadge: "bg-brand-600 text-white",
    accentCheckbox: "accent-brand-600",
    continueBox:
      "border-brand-200 dark:border-brand-900 bg-brand-50/50 dark:bg-brand-950/30",
    continueText: "text-brand-900 dark:text-brand-200",
    continueButton: "bg-brand-600 hover:bg-brand-700 text-white",
  },
  teal: {
    chip: "bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300",
    accentText: "group-hover:text-teal-600",
    accentBorder: "hover:border-teal-400",
    examBorder: "border-teal-300 dark:border-teal-800 hover:border-teal-500",
    examBg: "from-teal-50 to-white dark:from-teal-950 dark:to-slate-900",
    examTextHover: "group-hover:text-teal-700",
    examCountBadge: "bg-teal-600 text-white",
    accentCheckbox: "accent-teal-600",
    continueBox:
      "border-teal-200 dark:border-teal-900 bg-teal-50/50 dark:bg-teal-950/30",
    continueText: "text-teal-900 dark:text-teal-200",
    continueButton: "bg-teal-600 hover:bg-teal-700 text-white",
  },
  amber: {
    chip: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300",
    accentText: "group-hover:text-amber-600",
    accentBorder: "hover:border-amber-400",
    examBorder: "border-amber-300 dark:border-amber-800 hover:border-amber-500",
    examBg: "from-amber-50 to-white dark:from-amber-950 dark:to-slate-900",
    examTextHover: "group-hover:text-amber-700",
    examCountBadge: "bg-amber-600 text-white",
    accentCheckbox: "accent-amber-600",
    continueBox:
      "border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/30",
    continueText: "text-amber-900 dark:text-amber-200",
    continueButton: "bg-amber-600 hover:bg-amber-700 text-white",
  },
} as const;

export const SubjectSection = ({ subject }: Props) => {
  const a = ACCENT_CLASSES[subject.accent];
  const [shuffleOn, setShuffleOn] = useState(false);
  const [saved, setSaved] = useState<TestState | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSaved(loadProgress(subject.id));
    setHydrated(true);
  }, [subject.id]);

  const shuffleParam = shuffleOn ? "&shuffle=1" : "";

  const answeredCount = saved
    ? subject.questions.filter((q) => isAnswered(q, saved.answers[q.id])).length
    : 0;
  const totalInSaved = saved?.order?.length ?? subject.questions.length;

  const handleReset = () => {
    clearProgress(subject.id);
    setSaved(null);
  };

  return (
    <section className="mb-12">
      <div className="text-center mb-7">
        <div
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 ${a.chip}`}
        >
          {subject.facultyLabel}
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
          {subject.emoji} {subject.name}
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400">
          {subject.description}
          <br />
          <span className="font-semibold text-slate-900 dark:text-slate-200">
            {subject.questions.length} otázok
          </span>{" "}
          v rôznych formátoch.
        </p>
      </div>

      {hydrated && saved && !saved.finished && (
        <div
          className={`mb-5 p-5 rounded-2xl border-2 ${a.continueBox}`}
        >
          <p className={`text-sm mb-3 ${a.continueText}`}>
            Máš rozrobený test ({saved.mode === "training" ? "tréningový" : "testový"} režim) —{" "}
            <strong>{answeredCount} / {totalInSaved}</strong> zodpovedaných.
          </p>
          <div className="flex gap-2 flex-wrap">
            <Link
              href={`/test?subject=${subject.id}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${a.continueButton}`}
            >
              Pokračovať
            </Link>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Zahodiť a začať odznova
            </button>
          </div>
        </div>
      )}

      <label className={`mb-4 flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer transition-all select-none ${a.accentBorder}`}>
        <input
          type="checkbox"
          checked={shuffleOn}
          onChange={(e) => setShuffleOn(e.target.checked)}
          className={`w-5 h-5 cursor-pointer ${a.accentCheckbox}`}
        />
        <span className="flex-1">
          <span className="block font-semibold text-slate-900 dark:text-slate-100">
            🎲 Premiešať otázky
          </span>
          <span className="block text-xs text-slate-500 dark:text-slate-400">
            Pri každom novom spustení tréningu/testu iné poradie. (Skúškový režim mieša vždy.)
          </span>
        </span>
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href={`/test?subject=${subject.id}&mode=training${shuffleParam}`}
          className={`group block p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-all ${a.accentBorder}`}
        >
          <div className="text-2xl mb-2">📖</div>
          <h3 className={`text-lg font-bold text-slate-900 dark:text-slate-100 mb-1 transition-colors ${a.accentText}`}>
            Tréningový režim
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Po každej otázke uvidíš, či si odpovedala správne. Ideálne na učenie.
          </p>
        </Link>

        <Link
          href={`/test?subject=${subject.id}&mode=exam${shuffleParam}`}
          className={`group block p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-all ${a.accentBorder}`}
        >
          <div className="text-2xl mb-2">🎓</div>
          <h3 className={`text-lg font-bold text-slate-900 dark:text-slate-100 mb-1 transition-colors ${a.accentText}`}>
            Testový režim
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Vyplň všetky otázky, vyhodnotenie a skóre uvidíš až na konci.
          </p>
        </Link>
      </div>

      <Link
        href={`/test?subject=${subject.id}&mode=exam&count=${subject.examCount}&shuffle=1&time=${subject.examMinutes}&closed=1`}
        className={`group block mt-3 p-5 rounded-2xl border-2 bg-gradient-to-br hover:shadow-md transition-all ${a.examBorder} ${a.examBg}`}
      >
        <div className="flex items-start gap-3">
          <div className="text-3xl">🎯</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <h3 className={`text-lg font-bold text-slate-900 dark:text-slate-100 transition-colors ${a.examTextHover}`}>
                Skúškový režim
              </h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${a.examCountBadge}`}>
                {subject.examCount} otázok
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-600 text-white font-semibold">
                ⏱ {subject.examMinutes} minút
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Náhodne vybraných <strong>{subject.examCount} otázok</strong> (bez doplňovacích), premiešané otázky aj možnosti, <strong>časový limit {subject.examMinutes} minút</strong> — <em>ako pri reálnej skúške</em>.
            </p>
          </div>
        </div>
      </Link>
    </section>
  );
};
