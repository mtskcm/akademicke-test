import { SUBJECTS } from "@/lib/subjects";
import { SubjectSection } from "@/components/SubjectSection";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-10 sm:py-14">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
            Skúškové testy
          </h1>
          <p className="text-base text-slate-500 dark:text-slate-400">
            Vyber si predmet — každý má vlastný tréningový, testový aj skúškový režim.
          </p>
        </div>

        {SUBJECTS.map((subject, idx) => (
          <div key={subject.id}>
            {idx > 0 && (
              <hr className="my-10 border-slate-200 dark:border-slate-800" />
            )}
            <SubjectSection subject={subject} />
          </div>
        ))}

        <div className="mt-2 text-center text-xs text-slate-500 dark:text-slate-500">
          Otázky sú prepisované z PDF a Moodle podkladov. Otázky označené ⚠️ majú odpoveď doplnenú odhadom — overiť so zdrojom.
        </div>
      </div>
    </main>
  );
}
