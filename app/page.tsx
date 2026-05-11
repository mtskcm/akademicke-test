"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadProgress, clearProgress } from "@/lib/storage";
import type { TestState } from "@/lib/types";
import { questions } from "@/lib/questions";
import { isAnswered } from "@/lib/grading";

export default function Home() {
  const [saved, setSaved] = useState<TestState | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [shuffleOn, setShuffleOn] = useState(false);

  useEffect(() => {
    setSaved(loadProgress());
    setHydrated(true);
  }, []);

  const shuffleParam = shuffleOn ? "&shuffle=1" : "";

  const answeredCount = saved
    ? questions.filter((q) => isAnswered(q, saved.answers[q.id])).length
    : 0;

  const handleReset = () => {
    clearProgress();
    setSaved(null);
  };

  return (
    <main className="min-h-screen px-4 py-10 sm:py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold tracking-wider uppercase mb-4">
            Pedagogická fakulta · Prešov
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
            Akademický test
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Bakalárska práca — citačná etika, štruktúra, formálne náležitosti.
            <br />
            <span className="font-semibold text-slate-900 dark:text-slate-200">
              {questions.length} otázok
            </span>{" "}
            v rôznych formátoch.
          </p>
        </div>

        {hydrated && saved && !saved.finished && (
          <div className="mb-6 p-5 rounded-2xl border-2 border-brand-200 dark:border-brand-900 bg-brand-50/50 dark:bg-brand-950/30">
            <p className="text-sm text-brand-900 dark:text-brand-200 mb-3">
              Máš rozrobený test ({saved.mode === "training" ? "tréningový" : "testový"} režim) —{" "}
              <strong>{answeredCount} / {questions.length}</strong> zodpovedaných.
            </p>
            <div className="flex gap-2 flex-wrap">
              <Link
                href="/test"
                className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition-colors"
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

        <label className="mb-5 flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer hover:border-brand-400 transition-all select-none">
          <input
            type="checkbox"
            checked={shuffleOn}
            onChange={(e) => setShuffleOn(e.target.checked)}
            className="w-5 h-5 accent-brand-600 cursor-pointer"
          />
          <span className="flex-1">
            <span className="block font-semibold text-slate-900 dark:text-slate-100">
              🎲 Premiešať otázky
            </span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">
              Pri každom novom spustení tréningu/testu iné poradie — aby si sa nenaučila len poradie odpovedí. (Skúškový režim mieša vždy.)
            </span>
          </span>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href={`/test?mode=training${shuffleParam}`}
            className="group block p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-400 hover:shadow-md transition-all"
          >
            <div className="text-2xl mb-2">📖</div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-brand-600 transition-colors">
              Tréningový režim
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Po každej otázke uvidíš, či si odpovedala správne, a ukáže sa správna odpoveď. Ideálne na učenie.
            </p>
          </Link>

          <Link
            href={`/test?mode=exam${shuffleParam}`}
            className="group block p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-400 hover:shadow-md transition-all"
          >
            <div className="text-2xl mb-2">🎓</div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-brand-600 transition-colors">
              Testový režim
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Vyplň všetky otázky, vyhodnotenie a skóre uvidíš až na konci. Ako pri ostrom teste.
            </p>
          </Link>
        </div>

        <Link
          href="/test?mode=exam&count=40&shuffle=1"
          className="group block mt-4 p-6 rounded-2xl border-2 border-brand-300 dark:border-brand-800 bg-gradient-to-br from-brand-50 to-white dark:from-brand-950 dark:to-slate-900 hover:border-brand-500 hover:shadow-md transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl">🎯</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-700 transition-colors">
                  Skúškový režim
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-brand-600 text-white font-semibold">
                  40 otázok
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Náhodne vybraných <strong>40 otázok</strong> zo všetkých {questions.length}, premiešané otázky aj možnosti, vyhodnotenie až na konci — <em>presne ako pri reálnej skúške</em>.
              </p>
            </div>
          </div>
        </Link>

        <div className="mt-10 text-center text-xs text-slate-500 dark:text-slate-500">
          Otázky sú prepisované z PDF podkladov (PdF Prešov). Otázky označené ⚠️ pri sebe majú odpoveď doplnenú odhadom — overiť so zdrojom.
        </div>
      </div>
    </main>
  );
}
