import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  getProject,
  getProjectsWithCaseStudies,
} from "@/lib/projects";
import NavBar from "../../navbar";
import Footer from "../../footer";
import Reveal from "../../reveal";

export const generateStaticParams = () =>
  getProjectsWithCaseStudies().map((p) => ({ slug: p.slug }));

export const generateMetadata = async (
  props: { params: Promise<{ slug: string }> },
) => {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project?.caseStudy) return {};
  return {
    title: `${project.title} — Pranav Yadav`,
    description: project.caseStudy.problem,
  };
};

export default async function ProjectPage(
  props: { params: Promise<{ slug: string }> },
) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();

  const cs = project.caseStudy;

  return (
    <div>
      <NavBar breadcrumb={`Case study · ${project.title}`} />

      <article className="bg-gradient-to-b from-brand-surface to-brand-surface-alt">
        <div className="mx-auto max-w-3xl px-6 pt-12 pb-8 sm:pt-16">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-muted transition hover:text-brand-ink"
          >
            <ArrowLeft size={14} />
            Back to projects
          </Link>
        </div>

        <header className="mx-auto max-w-3xl px-6 pb-14">
          <Reveal className="flex flex-col gap-7">
            <span className="kicker">
              <span className="kicker-dot" />
              Case study · {project.role}
            </span>
            <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight text-brand-ink leading-[1.02]">
              {project.title}
            </h1>
            <p className="text-xl sm:text-2xl text-brand-muted leading-relaxed">
              {cs.problem}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-brand-divider bg-white/70 px-2.5 py-1 font-mono text-xs text-brand-muted backdrop-blur"
                >
                  {tech}
                </span>
              ))}
            </div>

            {cs.liveUrl && (
              <div className="pt-2">
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-brand-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-accent"
                >
                  Visit live site
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            )}
          </Reveal>
        </header>

        <div className="mx-auto max-w-5xl px-6 pb-20 sm:pb-24">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-brand-divider bg-white shadow-[0_30px_80px_-30px_rgba(53,87,148,0.35)]">
              <div className="relative aspect-[16/9]">
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} — screenshot`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover object-left-top"
                  priority
                />
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      <article className="bg-brand-surface px-6 py-20 sm:py-28">
        <div className="mx-auto flex max-w-3xl flex-col gap-24">
          <Reveal>
            <Section number="01" title="Context">
              <ul className="flex flex-col gap-4">
                {cs.context.map((c) => (
                  <li
                    key={c}
                    className="flex gap-4 text-base leading-relaxed text-brand-muted sm:text-lg"
                  >
                    <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-brand-accent" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </Reveal>

          {cs.pullQuote && (
            <Reveal>
              <blockquote className="relative rounded-3xl border border-brand-ink/10 bg-white px-8 py-12 shadow-[0_20px_60px_-30px_rgba(53,87,148,0.3)] sm:px-14 sm:py-14">
                <span
                  aria-hidden
                  className="absolute -top-6 left-6 font-serif text-8xl leading-none text-brand-accent sm:-top-8 sm:left-10 sm:text-9xl"
                >
                  &ldquo;
                </span>
                <p className="relative text-2xl font-semibold leading-tight text-brand-ink sm:text-3xl">
                  {cs.pullQuote}
                </p>
              </blockquote>
            </Reveal>
          )}

          <Reveal>
            <Section number="02" title="What I built">
              <div className="flex flex-col gap-8">
                {cs.whatIBuilt.map((para, i) => (
                  <p
                    key={i}
                    className="text-base leading-relaxed text-brand-muted sm:text-lg"
                  >
                    {para}
                  </p>
                ))}
                {cs.phases && cs.phases.length > 0 && (
                  <div className="grid gap-4 pt-2 sm:grid-cols-2">
                    {cs.phases.map((phase, i) => (
                      <div
                        key={phase.id}
                        className="flex flex-col gap-3 rounded-2xl border border-brand-divider bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-ink hover:shadow-[0_20px_50px_-20px_rgba(53,87,148,0.25)]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs uppercase tracking-wider text-brand-accent">
                            {phase.id}
                          </span>
                          <span className="font-mono text-[10px] text-brand-divider">
                            {String(i + 1).padStart(2, "0")} /{" "}
                            {String(cs.phases!.length).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-brand-ink">
                          {phase.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-brand-muted">
                          {phase.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Section>
          </Reveal>

          <Reveal>
            <Section number="03" title="Key decisions">
              <div className="flex flex-col gap-5">
                {cs.decisions.map((d, idx) => (
                  <div
                    key={d.title}
                    className="flex gap-6 rounded-3xl border border-brand-divider bg-white p-7 transition hover:border-brand-ink hover:shadow-[0_20px_50px_-20px_rgba(53,87,148,0.25)] sm:gap-8 sm:p-10"
                  >
                    <span className="font-mono text-3xl leading-none text-brand-accent/30 sm:text-5xl">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-lg font-semibold text-brand-ink sm:text-xl">
                        {d.title}
                      </h3>
                      <p className="text-base leading-relaxed text-brand-muted">
                        {d.rationale}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </Reveal>

          {cs.scope && (
            <Reveal>
              <aside className="flex flex-col gap-4 rounded-3xl border-2 border-dashed border-brand-divider bg-brand-surface-alt p-7 sm:p-10">
                <span className="font-mono text-xs uppercase tracking-wider text-brand-accent">
                  Scope · what this deliberately isn&rsquo;t
                </span>
                <p className="text-base leading-relaxed text-brand-ink sm:text-lg">
                  {cs.scope}
                </p>
              </aside>
            </Reveal>
          )}

          <Reveal>
            <Section number="04" title="Outcome">
              <ul className="flex flex-col gap-4">
                {cs.outcome.map((o) => (
                  <li
                    key={o}
                    className="flex gap-4 text-base leading-relaxed text-brand-ink sm:text-lg"
                  >
                    <span className="mt-2 font-mono text-sm text-brand-accent">
                      →
                    </span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </Reveal>

          {(cs.liveUrl || cs.repoUrl) && (
            <Reveal>
              <aside className="flex flex-col gap-6 rounded-3xl bg-brand-ink p-8 text-white sm:p-12">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-brand-accent">
                    Live
                  </span>
                  <h3 className="text-2xl font-semibold sm:text-3xl">
                    See it in action
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {cs.liveUrl && (
                    <a
                      href={cs.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-brand-ink transition hover:bg-brand-accent-soft"
                    >
                      Visit {project.title}
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  )}
                  {cs.repoUrl && (
                    <a
                      href={cs.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:border-white"
                    >
                      View repo
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </aside>
            </Reveal>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
}

const Section = (props: {
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="flex flex-col gap-8">
    <header className="flex items-baseline gap-4 border-b border-brand-divider pb-4">
      <span className="font-mono text-sm text-brand-accent">
        {props.number}
      </span>
      <h2 className="text-2xl font-semibold tracking-tight text-brand-ink sm:text-3xl">
        {props.title}
      </h2>
    </header>
    {props.children}
  </section>
);
