"use client";

import type {
  MatchingQuestion,
  MultiChoiceQuestion,
  Question,
  QuestionAnswer,
  SingleChoiceQuestion,
} from "@/lib/types";
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
  optionOrder?: number[];
};

const TYPE_LABELS: Record<Question["type"], string> = {
  truefalse: "Pravda / Nepravda",
  single: "Jedna odpoveď",
  multi: "Viac odpovedí",
  matching: "Priraďovanie",
  fillin: "Doplň odpoveď",
};

const identityOrder = (n: number): number[] =>
  Array.from({ length: n }, (_, i) => i);

const reorderSingle = (
  q: SingleChoiceQuestion,
  order: number[],
): SingleChoiceQuestion => ({
  ...q,
  options: order.map((i) => q.options[i]),
  answer: order.indexOf(q.answer),
});

const reorderMulti = (
  q: MultiChoiceQuestion,
  order: number[],
): MultiChoiceQuestion => ({
  ...q,
  options: order.map((i) => q.options[i]),
  answers: q.answers.map((a) => order.indexOf(a)).sort((a, b) => a - b),
});

const reorderMatching = (
  q: MatchingQuestion,
  rightOrder: number[],
): MatchingQuestion => ({
  ...q,
  right: rightOrder.map((i) => q.right[i]),
  pairs: q.pairs.map(([li, ri]) => [li, rightOrder.indexOf(ri)] as [number, number]),
});

export const QuestionCard = ({
  question,
  answer,
  onAnswer,
  showCorrect,
  index,
  total,
  optionOrder,
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

      {question.type === "single" && (() => {
        const order = optionOrder ?? identityOrder(question.options.length);
        const displayQ = reorderSingle(question, order);
        const origValue = answer?.type === "single" ? answer.value : null;
        const displayValue = origValue == null ? null : order.indexOf(origValue);
        return (
          <SingleChoice
            question={displayQ}
            value={displayValue}
            onChange={(k) => onAnswer({ type: "single", value: order[k] })}
            disabled={showCorrect}
            showCorrect={showCorrect}
          />
        );
      })()}

      {question.type === "multi" && (() => {
        const order = optionOrder ?? identityOrder(question.options.length);
        const displayQ = reorderMulti(question, order);
        const origValue = answer?.type === "multi" ? answer.value : [];
        const displayValue = origValue
          .map((v) => order.indexOf(v))
          .filter((v) => v >= 0)
          .sort((a, b) => a - b);
        return (
          <MultiChoice
            question={displayQ}
            value={displayValue}
            onChange={(v) =>
              onAnswer({
                type: "multi",
                value: v.map((k) => order[k]).sort((a, b) => a - b),
              })
            }
            disabled={showCorrect}
            showCorrect={showCorrect}
          />
        );
      })()}

      {question.type === "matching" && (() => {
        const order = optionOrder ?? identityOrder(question.right.length);
        const displayQ = reorderMatching(question, order);
        const origValue =
          answer?.type === "matching"
            ? answer.value
            : Array(question.left.length).fill(null);
        const displayValue = origValue.map((v) =>
          v == null ? null : order.indexOf(v),
        );
        return (
          <Matching
            question={displayQ}
            value={displayValue}
            onChange={(v) =>
              onAnswer({
                type: "matching",
                value: v.map((k) => (k == null ? null : order[k])),
              })
            }
            disabled={showCorrect}
            showCorrect={showCorrect}
          />
        );
      })()}

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
