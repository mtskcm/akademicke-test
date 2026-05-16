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

export type DefinitionQuestion = {
  id: number;
  type: "definition";
  text: string;
  reference: string;
  note?: string;
};

export type Question =
  | TrueFalseQuestion
  | SingleChoiceQuestion
  | MultiChoiceQuestion
  | MatchingQuestion
  | FillInQuestion
  | DefinitionQuestion;

export type QuestionAnswer =
  | { type: "truefalse"; value: boolean | null }
  | { type: "single"; value: number | null }
  | { type: "multi"; value: number[] }
  | { type: "matching"; value: Array<number | null> }
  | { type: "fillin"; value: string }
  | { type: "definition"; value: string; selfCorrect: boolean | null };

export type Mode = "training" | "exam";

export type SubjectId = "akademicke" | "spravanie" | "patopsychologia";

export type TestState = {
  subjectId: SubjectId;
  mode: Mode;
  currentIndex: number;
  answers: Record<number, QuestionAnswer>;
  finished: boolean;
  startedAt: number;
  order: number[];
  shuffled: boolean;
  submittedIds: number[];
  optionOrders: Record<number, number[]>;
  count: number | null;
  timeLimitMinutes: number | null;
};
