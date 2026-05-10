"use client";

type Props = {
  current: number;
  total: number;
};

export const ProgressBar = ({ current, total }: Props) => {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-brand-600 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 tabular-nums">
        {current} / {total}
      </span>
    </div>
  );
};
