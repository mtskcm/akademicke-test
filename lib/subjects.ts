import type { Question, SubjectId } from "./types";
import { questions as academicQuestions } from "./questions/akademicke";
import { questions as behaviorQuestions } from "./questions/spravanie";
import { questions as patopsychQuestions } from "./questions/patopsychologia";

export type SubjectAccent = "brand" | "teal" | "amber";

export type Subject = {
  id: SubjectId;
  name: string;
  shortName: string;
  description: string;
  facultyLabel: string;
  emoji: string;
  accent: SubjectAccent;
  questions: Question[];
  examCount: number;
  examMinutes: number;
};

export const SUBJECTS: Subject[] = [
  {
    id: "akademicke",
    name: "Akademický test",
    shortName: "Akademické",
    description:
      "Bakalárska práca — citačná etika, štruktúra, formálne náležitosti.",
    facultyLabel: "Pedagogická fakulta · Prešov",
    emoji: "🎓",
    accent: "brand",
    questions: academicQuestions,
    examCount: 40,
    examMinutes: 25,
  },
  {
    id: "spravanie",
    name: "Problémové správanie",
    shortName: "Správanie",
    description:
      "ABA, sociálne príbehy, funkčné hodnotenie a behaviorálny plán.",
    facultyLabel: "Pedagogická fakulta · Prešov",
    emoji: "🧠",
    accent: "teal",
    questions: behaviorQuestions,
    examCount: 30,
    examMinutes: 25,
  },
  {
    id: "patopsychologia",
    name: "Patopsychológia",
    shortName: "Patopsychológia",
    description:
      "Mentálna retardácia, deprivácia, vzťahové väzby, poruchy správania a rodinné vplyvy.",
    facultyLabel: "Pedagogická fakulta · Prešov · Dubayová",
    emoji: "🧩",
    accent: "amber",
    questions: patopsychQuestions,
    examCount: 25,
    examMinutes: 20,
  },
];

export const getSubject = (id: string | null | undefined): Subject | undefined => {
  if (!id) return undefined;
  return SUBJECTS.find((s) => s.id === id);
};

export const DEFAULT_SUBJECT_ID: SubjectId = "akademicke";
