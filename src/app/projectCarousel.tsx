import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectDetails } from "./project";

const cardClasses =
  "group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-divider bg-white";

// Hover affordances only on cards that actually go somewhere.
const linkedCardClasses =
  "transition duration-300 hover:-translate-y-1 hover:border-brand-ink hover:shadow-accent-lift";

const actionRowClasses =
  "mt-auto flex items-center gap-1.5 border-t border-brand-divider pt-4 font-mono text-[11px] uppercase tracking-wider";

type CardKind = "case-study" | "external" | "private";

const cardKind = (p: ProjectDetails): CardKind => {
  if (p.caseStudy) return "case-study";
  if (p.website) return "external";
  return "private";
};

const CardMedia = ({ p, kind }: { p: ProjectDetails; kind: CardKind }) => (
  <div className="relative aspect-[16/9] overflow-hidden bg-brand-surface-alt">
    {p.imageUrl ? (
      <>
        <Image
          src={p.imageUrl}
          alt={`${p.title} — project screenshot`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-left transition duration-500 group-hover:scale-[1.03]"
        />
        {kind !== "private" && (
          <div className="absolute right-3 top-3 rounded-full bg-white/90 p-2 opacity-0 backdrop-blur transition group-hover:opacity-100">
            {kind === "case-study" ? (
              <ArrowRight size={16} className="text-brand-ink" />
            ) : (
              <ArrowUpRight size={16} className="text-brand-ink" />
            )}
          </div>
        )}
      </>
    ) : (
      <div className="flex h-full flex-col items-center justify-center gap-2 bg-brand-accent-soft">
        <Lock size={16} className="text-brand-accent/60" />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-accent">
          Client work · Private
        </span>
      </div>
    )}
  </div>
);

const CardBody = ({ p, kind }: { p: ProjectDetails; kind: CardKind }) => (
  <div className="flex flex-1 flex-col gap-4 p-6">
    <div className="flex items-start justify-between gap-3">
      <h3 className="text-xl font-semibold tracking-tight text-brand-ink">
        {p.title}
      </h3>
      <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-brand-accent">
        {p.role}
      </span>
    </div>

    <p className="text-sm leading-relaxed text-brand-muted">{p.description}</p>

    <p className="text-sm font-medium text-brand-ink">{p.impact}</p>

    <div className="flex flex-wrap gap-1.5">
      {p.stack.map((tech) => (
        <span
          key={tech}
          className="rounded-md bg-brand-surface-alt px-2 py-1 font-mono text-[11px] text-brand-muted"
        >
          {tech}
        </span>
      ))}
    </div>

    {kind === "case-study" && (
      <span className={cn(actionRowClasses, "text-brand-accent")}>
        Read case study
        <ArrowRight
          size={12}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </span>
    )}
    {kind === "external" && (
      <span className={cn(actionRowClasses, "text-brand-accent")}>
        Visit live site
        <ArrowUpRight
          size={12}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    )}
    {kind === "private" && (
      <span className={cn(actionRowClasses, "text-brand-muted")}>
        <Lock size={12} />
        Private client build
      </span>
    )}
  </div>
);

const ProjectCarousel = (props: { projectDetails: ProjectDetails }) => {
  const p = props.projectDetails;
  const kind = cardKind(p);

  if (kind === "case-study") {
    return (
      <Link
        href={`/projects/${p.slug}`}
        className={cn(cardClasses, linkedCardClasses)}
      >
        <CardMedia p={p} kind={kind} />
        <CardBody p={p} kind={kind} />
      </Link>
    );
  }

  if (kind === "external") {
    return (
      <a
        href={p.website}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(cardClasses, linkedCardClasses)}
      >
        <CardMedia p={p} kind={kind} />
        <CardBody p={p} kind={kind} />
      </a>
    );
  }

  return (
    <div className={cardClasses}>
      <CardMedia p={p} kind={kind} />
      <CardBody p={p} kind={kind} />
    </div>
  );
};

export default ProjectCarousel;
