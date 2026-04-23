import React from "react";
import Reveal from "./reveal";

const SectionHeader = (props: {
  sectionDetails: { title: string; subtitle: string; kicker?: string };
}) => {
  const { title, subtitle, kicker } = props.sectionDetails;

  return (
    <Reveal className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-4 text-center sm:mb-16">
      <span className="kicker">
        <span className="kicker-dot" />
        {kicker ?? title}
      </span>
      <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight text-brand-ink">
        {title}
      </h2>
      <p className="max-w-2xl text-base sm:text-lg text-brand-muted">
        {subtitle}
      </p>
    </Reveal>
  );
};

export default SectionHeader;
