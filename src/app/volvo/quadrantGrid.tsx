"use client";

import { useState } from "react";
import Reveal from "../reveal";

type QuadrantColor = "measure" | "understand" | "core" | "trust";

type DiagnosticItem = {
  title: string;
  desc: string;
  critical?: boolean;
};

type Quadrant = {
  color: QuadrantColor;
  heading: string;
  question: string;
  items: DiagnosticItem[];
};

type QuadStyle = {
  card: string;
  heading: string;
  question: string;
  marker: string;
  criticalTag: string;
};

type Props = {
  quadrants: Quadrant[];
  quadStyles: Record<QuadrantColor, QuadStyle>;
};

const QuadrantGrid = ({ quadrants, quadStyles }: Props) => {
  const [criticalOnly, setCriticalOnly] = useState(true);

  return (
    <div className="flex flex-col gap-6">
      <Reveal className="self-end">
        <div
          className="flex items-center rounded-full border border-brand-divider bg-brand-surface p-0.5"
          role="group"
          aria-label="Filter checklist items"
        >
          <button
            type="button"
            onClick={() => setCriticalOnly(true)}
            aria-pressed={criticalOnly}
            className={`rounded-full px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] transition ${
              criticalOnly
                ? "bg-brand-accent text-white"
                : "text-brand-muted hover:text-brand-ink"
            }`}
          >
            Critical only
          </button>
          <button
            type="button"
            onClick={() => setCriticalOnly(false)}
            aria-pressed={!criticalOnly}
            className={`rounded-full px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] transition ${
              !criticalOnly
                ? "bg-brand-accent text-white"
                : "text-brand-muted hover:text-brand-ink"
            }`}
          >
            All items
          </button>
        </div>
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-2">
        {quadrants.map((q, idx) => {
          const style = quadStyles[q.color];
          const visibleItems = q.items
            .map((item, i) => ({ ...item, originalIndex: i }))
            .filter((item) => !criticalOnly || item.critical);
          return (
            <Reveal key={q.heading} delay={idx * 80}>
              <div
                className={`flex h-full flex-col gap-4 rounded-2xl border p-6 sm:p-7 ${style.card}`}
              >
                <div>
                  <h3
                    className={`text-xl font-semibold tracking-tight sm:text-2xl ${style.heading}`}
                  >
                    {q.heading}
                  </h3>
                  <p
                    className={`mt-1 border-b pb-4 text-sm italic text-brand-muted ${style.question}`}
                  >
                    {q.question}
                  </p>
                </div>
                <ol className="flex flex-col gap-3">
                  {visibleItems.map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <span
                        className={`mt-0.5 shrink-0 font-mono text-xs font-semibold ${style.marker}`}
                      >
                        {String(item.originalIndex + 1).padStart(2, "0")}
                      </span>
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="text-sm font-semibold text-brand-ink">
                            {item.title}
                          </span>
                          {item.critical && (
                            <span
                              className={`rounded border px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] ${style.criticalTag}`}
                            >
                              Critical
                            </span>
                          )}
                        </div>
                        <p className="text-[13px] leading-snug text-brand-muted">
                          {item.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
};

export default QuadrantGrid;
