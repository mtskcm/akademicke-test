"use client";

import type { Question, QuestionAnswer } from "@/lib/types";
import { TrueFalse } from "./types/TrueFalse";
import { SingleChoice } from "./types/SingleChoice";
import { MultiChoice } from "./types/MultiChoice";
import { Matching } from "./types/Matching";
import { FillIn } from "./types/FillIn";
import { gradeQuestion, isAnswered } from "@/lib/grading";

type Props = {
  question: Question;
  answer: QuestionAnswer | undefined;
  onAnswer: (a: QuestionAnswer) => void;
  showCorrect: boolean;
  index: number;
  total: number;
};

const TYPE_LABELS: Record<Question["type"], string> = {
  truefalse: "Pravda / Nepravda",
  single: "Jedna odpoveď",
  multi: "Viac odpovedí",
  matching: "Priraďovanie",
  fillin: "Doplň odpoveď",
};

export const QuestionCard = ({
  question,
  answer,
  onAnswer,
  showCorrect,
  index,
  total,
}: Props) => {
  const isCorrect = showCorrect && gradeQuestion(question, answer);
  const isWrongOrUnanswered = showCorrect && !isCorrect;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
            Otázka {index + 1} / {total}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-medium">
            {TYPE_LABELS[question.type]}
          </span>
        </div>
        {showCorrect && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isCorrect
                ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                : "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
            }`}
          >
            {isCorrect ? "✓ Správne" : isAnswered(question, answer) ? "✗ Zle" : "— bez odpovede"}
          </span>
        )}
      </div>

      <h2 className="text-lg sm:text-xl font-semibold leading-relaxed mb-6 text-slate-900 dark:text-slate-100">
        {question.text}
      </h2>

      {question.type === "truefalse" && (
        <TrueFalse
          question={question}
          value={answer?.type === "truefalse" ? answer.value : null}
          onChange={(v) => onAnswer({ type: "truefalse", value: v })}
          disabled={showCorrect}
          showCorrect={showCorrect}
        />
      )}

      {question.type === "single" && (
        <SingleChoice
          question={question}
          value={answer?.type === "single" ? answer.value : null}
          onChange={(v) => onAnswer({ type: "single", value: v })}
          disabled={showCorrect}
          showCorrect={showCorrect}
        />
      )}

      {question.type === "multi" && (
        <MultiChoice
          question={question}
          value={answer?.type === "multi" ? answer.value : []}
          onChange={(v) => onAnswer({ type: "multi", value: v })}
          disabled={showCorrect}
          showCorrect={showCorrect}
        />
      )}

      {question.type === "matching" && (
        <Matching
          question={question}
          value={
            answer?.type === "matching"
              ? answer.value
              : Array(question.left.length).fill(null)
          }
          onChange={(v) => onAnswer({ type: "matching", value: v })}
          disabled={showCorrect}
          showCorrect={showCorrect}
        />
      )}

      {question.type === "fillin" && (
        <FillIn
          question={question}
          value={answer?.type === "fillin" ? answer.value : ""}
          onChange={(v) => onAnswer({ type: "fillin", value: v })}
          disabled={showCorrect}
          showCorrect={showCorrect}
        />
      )}

      {showCorrect && isWrongOrUnanswered && question.note && (
        <div className="mt-5 p-4 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 text-sm text-amber-900 dark:text-amber-200">
          <strong>Poznámka:</strong> {question.note}
        </div>
      )}

      {!showCorrect && question.note && (
        <div className="mt-5 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300">
          {question.note}
        </div>
      )}
    </div>
  );
};
