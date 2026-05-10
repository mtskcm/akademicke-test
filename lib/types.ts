export type TrueFalseQuestion = {
  id: number;
  type: "truefalse";
  text: string;
  answer: boolean;
  note?: string;
};

export type SingleChoiceQuestion = {
  id: number;
  type: "single";
  text: string;
  options: string[];
  answer: number;
  note?: string;
};

export type MultiChoiceQuestion = {
  id: number;
  type: "multi";
  text: string;
  options: string[];
  answers: number[];
  exactCount?: number;
  note?: string;
};

export type MatchingQuestion = {
  id: number;
  type: "matching";
  text: string;
  left: string[];
  right: string[];
  pairs: Array<[number, number]>;
  note?: string;
};

export type FillInQuestion = {
  id: number;
  type: "fillin";
  text: string;
  accepted: string[];
  hint?: string;
  note?: string;
};

export type Question =
  | TrueFalseQuestion
  | SingleChoiceQuestion
  | MultiChoiceQuestion
  | MatchingQuestion
  | FillInQuestion;

export type QuestionAnswer =
  | { type: "truefalse"; value: boolean | null }
  | { type: "single"; value: number | null }
  | { type: "multi"; value: number[] }
  | { type: "matching"; value: Array<number | null> }
  | { type: "fillin"; value: string };

export type Mode = "training" | "exam";

export type TestState = {
  mode: Mode;
  currentIndex: number;
  answers: Record<number, QuestionAnswer>;
  finished: boolean;
  startedAt: number;
};
