import React from "react";
import SectionHeader from "./sectionHeader";
import Reveal from "./reveal";

type NowContent = {
  workingOn: React.ReactNode[];
  learning: React.ReactNode[];
  lastUpdated: string;
};

const nowContent: NowContent = {
  workingOn: [
    <>
      <a
        href="https://concall-alpha.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-accent underline decoration-brand-accent/40 underline-offset-4 transition hover:text-brand-ink hover:decoration-brand-ink"
      >
        Story of a Stock
      </a>
      {" — a personal AI platform turning dense company disclosures into investment decisions. Vector retrieval gives fundamental investors a breadth of analysis that wasn't reachable pre-LLM."}
    </>,
    <>
      <a
        href="https://talent.toptal.com/resume/developers/pranav-yadav"
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-accent underline decoration-brand-accent/40 underline-offset-4 transition hover:text-brand-ink hover:decoration-brand-ink"
      >
        Toptal
      </a>
      {" client engagements across a cruise-booking platform and a freight-domain marketing site."}
    </>,
  ],
  learning: [
    <>
      <a
        href="https://github.com/garrytan/gstack"
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-accent underline decoration-brand-accent/40 underline-offset-4 transition hover:text-brand-ink hover:decoration-brand-ink"
      >
        gstack
      </a>
      {" — Garry Tan's open-source toolkit of Claude Code skills for agentic coding scaffolding."}
    </>,
    "Token-efficient visual RAG — extracting signal from diagram-heavy investor decks without blowing the token budget.",
  ],
  lastUpdated: "2026-05-14",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const Column = ({
  label,
  items,
  delay,
}: {
  label: string;
  items: React.ReactNode[];
  delay: number;
}) => (
  <Reveal delay={delay}>
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-brand-divider bg-white p-7 transition hover:-translate-y-0.5 hover:border-brand-ink hover:shadow-[0_20px_50px_-20px_rgba(53,87,148,0.25)]">
      <span className="kicker">
        <span className="kicker-dot" />
        {label}
      </span>
      {items.length === 0 ? (
        <p className="font-mono text-sm text-brand-muted">—</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="text-base leading-relaxed text-brand-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  </Reveal>
);

const Now = () => {
  const sectionDetails = {
    kicker: "Right now",
    title: "Now",
    subtitle: "What I'm focused on at the moment — current direction, not history.",
  };

  return (
    <section
      id="now"
      className="bg-gradient-to-b from-brand-surface to-brand-surface-alt px-6 py-16 sm:py-32"
    >
      <SectionHeader sectionDetails={sectionDetails} />

      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
        <Column label="Currently working on" items={nowContent.workingOn} delay={0} />
        <Column label="Currently learning" items={nowContent.learning} delay={100} />
      </div>

      <Reveal delay={200} className="mx-auto mt-8 max-w-6xl text-center">
        <p className="font-mono text-xs text-brand-muted">
          Last updated {formatDate(nowContent.lastUpdated)}
        </p>
      </Reveal>
    </section>
  );
};

export default Now;
