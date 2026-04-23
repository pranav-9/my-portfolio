import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import type { ProjectDetails } from "./project";

const ProjectCarousel = (props: { projectDetails: ProjectDetails }) => {
  const p = props.projectDetails;
  const hasCaseStudy = Boolean(p.caseStudy);

  const cardClass =
    "group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-divider bg-white transition duration-300 hover:-translate-y-1 hover:border-brand-ink hover:shadow-[0_30px_80px_-30px_rgba(53,87,148,0.35)]";

  const inner = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-surface-alt">
        <Image
          src={p.imageUrl}
          alt={`${p.title} — project screenshot`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute right-3 top-3 rounded-full bg-white/90 p-2 opacity-0 backdrop-blur transition group-hover:opacity-100">
          <ArrowUpRight size={16} className="text-brand-ink" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold tracking-tight text-brand-ink">
            {p.title}
          </h3>
          <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-brand-accent">
            {p.role}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-brand-muted">
          {p.description}
        </p>

        <p className="text-sm font-medium text-brand-ink">{p.impact}</p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {p.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-brand-surface-alt px-2 py-1 font-mono text-[11px] text-brand-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        {hasCaseStudy && (
          <p className="font-mono text-[10px] uppercase tracking-wider text-brand-accent">
            Read case study →
          </p>
        )}
      </div>
    </>
  );

  if (hasCaseStudy) {
    return (
      <Link href={`/projects/${p.slug}`} className={cardClass}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={p.website}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClass}
    >
      {inner}
    </a>
  );
};

export default ProjectCarousel;
