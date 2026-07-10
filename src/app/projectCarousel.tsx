import Image from "next/image";
import React from "react";
import { ArrowUpRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectDetails } from "./project";

const cardClasses =
  "group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-divider bg-white";

// Hover affordances only on cards that actually go somewhere.
const linkedCardClasses =
  "transition duration-300 hover:-translate-y-1 hover:border-brand-ink hover:shadow-accent-lift";

const CardMedia = ({ p }: { p: ProjectDetails }) => (
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
        {p.website && (
          <div className="absolute right-3 top-3 rounded-full bg-white/90 p-2 opacity-0 backdrop-blur transition group-hover:opacity-100">
            <ArrowUpRight size={16} className="text-brand-ink" />
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

const CardBody = ({ p }: { p: ProjectDetails }) => (
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
  </div>
);

const ProjectCarousel = (props: { projectDetails: ProjectDetails }) => {
  const p = props.projectDetails;

  if (!p.website) {
    return (
      <div className={cardClasses}>
        <CardMedia p={p} />
        <CardBody p={p} />
      </div>
    );
  }

  return (
    <a
      href={p.website}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(cardClasses, linkedCardClasses)}
    >
      <CardMedia p={p} />
      <CardBody p={p} />
    </a>
  );
};

export default ProjectCarousel;
