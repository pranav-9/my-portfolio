import Image from "next/image";
import React from "react";

export type JobDetails = {
  duration: string;
  role: string;
  company: string;
  companyImage: string;
  summary: string;
  tags: string[];
};

const JobHolder = (props: {
  jobDetails: JobDetails;
  align: "left" | "right";
}) => {
  const { jobDetails: j, align } = props;

  return (
    <div className="relative grid grid-cols-[28px_1fr] gap-4 sm:grid-cols-2 sm:gap-12">
      {/* Timeline dot */}
      <div
        className={`relative flex items-center justify-center pt-4 sm:absolute sm:inset-y-0 sm:left-1/2 sm:-translate-x-1/2 ${
          align === "right" ? "sm:order-2" : ""
        }`}
      >
        <div className="relative z-10 h-6 w-6 rounded-full border-2 border-brand-accent bg-white">
          <div className="absolute inset-1 rounded-full bg-brand-accent" />
        </div>
      </div>

      {/* Spacer for the opposite column on desktop */}
      <div
        className={`hidden sm:block ${
          align === "right" ? "sm:order-1" : "sm:order-3"
        }`}
      />

      {/* Card */}
      <div
        className={`flex flex-col gap-4 rounded-2xl border border-brand-divider bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-ink hover:shadow-[0_20px_50px_-20px_rgba(53,87,148,0.25)] ${
          align === "right" ? "sm:order-3" : "sm:order-1"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-brand-divider bg-white p-1">
            <Image
              src={j.companyImage}
              alt={`${j.company} logo`}
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-base font-semibold text-brand-ink sm:text-lg">
              {j.role}
            </p>
            <p className="text-sm font-medium text-brand-accent">{j.company}</p>
          </div>
        </div>

        <p className="font-mono text-[11px] uppercase tracking-wider text-brand-muted">
          {j.duration}
        </p>

        <p className="text-sm leading-relaxed text-brand-muted">{j.summary}</p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {j.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-brand-surface-alt px-2 py-1 font-mono text-[11px] text-brand-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobHolder;
