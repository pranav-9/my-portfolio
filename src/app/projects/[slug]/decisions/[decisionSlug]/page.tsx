import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  getDecision,
  getProjectsWithCaseStudies,
} from "@/lib/projects";
import NavBar from "../../../../navbar";
import Footer from "../../../../footer";
import Reveal from "../../../../reveal";

export const generateStaticParams = () =>
  getProjectsWithCaseStudies().flatMap((p) =>
    p.caseStudy!.decisions.map((d) => ({
      slug: p.slug,
      decisionSlug: d.slug,
    })),
  );

export const generateMetadata = async (
  props: { params: Promise<{ slug: string; decisionSlug: string }> },
) => {
  const { slug, decisionSlug } = await props.params;
  const found = getDecision(slug, decisionSlug);
  if (!found) return {};
  return {
    title: `${found.decision.title} — ${found.project.title}`,
    description: found.decision.rationale,
  };
};

export default async function DecisionPage(
  props: { params: Promise<{ slug: string; decisionSlug: string }> },
) {
  const { slug, decisionSlug } = await props.params;
  const found = getDecision(slug, decisionSlug);
  if (!found) notFound();

  const { project, decision } = found;

  return (
    <div>
      <NavBar
        breadcrumb={`Case study · ${project.title} · ${decision.title}`}
      />

      <article className="bg-gradient-to-b from-brand-surface to-brand-surface-alt">
        <div className="mx-auto max-w-3xl px-6 pt-12 pb-8 sm:pt-16">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-muted transition hover:text-brand-ink"
          >
            <ArrowLeft size={14} />
            Back to {project.title}
          </Link>
        </div>

        <header className="mx-auto max-w-3xl px-6 pb-14">
          <Reveal className="flex flex-col gap-7">
            <span className="kicker">
              <span className="kicker-dot" />
              Deep dive · {project.title}
            </span>
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-brand-ink leading-[1.05]">
              {decision.title}
            </h1>
            <p className="text-xl text-brand-muted leading-relaxed sm:text-2xl">
              {decision.rationale}
            </p>
          </Reveal>
        </header>
      </article>

      <article className="bg-brand-surface px-6 py-20 sm:py-28">
        <div className="mx-auto flex max-w-3xl flex-col gap-16">
          {decision.body && (
            <Reveal>
              <div className="flex flex-col gap-6 text-base leading-relaxed text-brand-muted sm:text-lg">
                {decision.body.split(/\n\n+/).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </Reveal>
          )}

          {decision.metrics && decision.metrics.length > 0 && (
            <Reveal>
              <div className="flex flex-col gap-6">
                <header className="flex items-baseline gap-4 border-b border-brand-divider pb-4">
                  <span className="font-mono text-sm text-brand-accent">
                    Metrics
                  </span>
                </header>
                <div className="grid gap-4 sm:grid-cols-3">
                  {decision.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="flex flex-col gap-2 rounded-2xl border border-brand-divider bg-white p-6"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-wider text-brand-muted">
                        {m.label}
                      </span>
                      <span className="text-2xl font-semibold text-brand-ink sm:text-3xl">
                        {m.value}
                      </span>
                      {m.caption && (
                        <span className="text-xs leading-relaxed text-brand-muted">
                          {m.caption}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          <Reveal>
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 self-start rounded-full border border-brand-divider bg-white px-5 py-3 text-sm font-medium text-brand-ink transition hover:border-brand-ink"
            >
              <ArrowLeft size={14} />
              Back to {project.title} case study
            </Link>
          </Reveal>
        </div>
      </article>

      <Footer />
    </div>
  );
}
