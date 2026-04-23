import React from "react";
import Reveal from "./reveal";

const SectionHeader = (props: {
  sectionDetails: { title: string; subtitle: string; kicker?: string };
  compact?: boolean;
}) => {
  const { title, subtitle, kicker } = props.sectionDetails;
  const { compact } = props;

  return (
    <Reveal
      className={`mx-auto flex max-w-3xl flex-col items-center text-center ${
        compact
          ? "mb-6 gap-3 sm:mb-8"
          : "mb-12 gap-4 sm:mb-16"
      }`}
    >
      <span className="kicker">
        <span className="kicker-dot" />
        {kicker ?? title}
      </span>
      <h2
        className={`font-semibold tracking-tight text-brand-ink ${
          compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-6xl"
        }`}
      >
        {title}
      </h2>
      <p
        className={`max-w-2xl text-brand-muted ${
          compact ? "text-sm sm:text-base" : "text-base sm:text-lg"
        }`}
      >
        {subtitle}
      </p>
    </Reveal>
  );
};

export default SectionHeader;
