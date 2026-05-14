"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Bucket = {
  label: string;
  items: string[];
};

export type FeatureGroup = {
  kicker: string;
  title: string;
  sub: string;
  flagged?: boolean;
  buckets: Bucket[];
};

type Props = {
  groups: FeatureGroup[];
};

const FeatureCarousel = ({ groups }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w >= 1024) setPerView(3);
      else if (w >= 640) setPerView(2);
      else setPerView(1);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const left = track.scrollLeft;
        let closest = 0;
        let bestDist = Infinity;
        cardRefs.current.forEach((c, idx) => {
          if (!c) return;
          const dist = Math.abs(c.offsetLeft - left);
          if (dist < bestDist) {
            bestDist = dist;
            closest = idx;
          }
        });
        setActiveIndex(closest);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [groups.length]);

  const scrollToIndex = useCallback((idx: number) => {
    const track = trackRef.current;
    const card = cardRefs.current[idx];
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  }, []);

  const goPrev = useCallback(() => {
    scrollToIndex(Math.max(0, activeIndex - perView));
  }, [activeIndex, perView, scrollToIndex]);
  const goNext = useCallback(() => {
    scrollToIndex(Math.min(groups.length - 1, activeIndex + perView));
  }, [activeIndex, perView, scrollToIndex, groups.length]);

  const onTrackKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
  };

  const totalPages = Math.max(1, Math.ceil(groups.length / perView));
  const currentPage = Math.min(
    totalPages - 1,
    Math.floor(activeIndex / perView),
  );

  const atStart = activeIndex === 0;
  const atEnd = activeIndex + perView >= groups.length;

  const totalFeatures = groups.reduce(
    (sum, g) =>
      sum + g.buckets.reduce((s, b) => s + b.items.length, 0),
    0,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-muted">
          {groups.length} components · {totalFeatures} features · page{" "}
          {currentPage + 1} / {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={atStart}
            aria-label="Previous components"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-divider bg-brand-surface text-brand-ink transition hover:border-brand-accent hover:text-brand-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-brand-divider disabled:hover:text-brand-ink"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={atEnd}
            aria-label="Next components"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-divider bg-brand-surface text-brand-ink transition hover:border-brand-accent hover:text-brand-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-brand-divider disabled:hover:text-brand-ink"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-label="Engineering components, scroll horizontally"
        onKeyDown={onTrackKeyDown}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {groups.map((g, idx) => {
          const groupCount = g.buckets.reduce(
            (s, b) => s + b.items.length,
            0,
          );
          return (
          <div
            key={g.title}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            data-idx={idx}
            className="shrink-0 basis-full snap-start sm:basis-[calc(50%-0.375rem)] lg:basis-[calc(33.333%-0.5rem)]"
          >
            <div
              className={`flex h-full flex-col gap-3 rounded-2xl border p-4 sm:p-5 ${
                g.flagged
                  ? "border-brand-accent bg-brand-accent-soft"
                  : "border-brand-divider bg-brand-surface"
              }`}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-muted">
                    {g.kicker}
                  </p>
                  <div className="flex items-center gap-1.5">
                    {g.flagged && (
                      <span className="badge badge-soft badge-success px-1.5 py-0.5 font-mono text-[9px]">
                        Flagged
                      </span>
                    )}
                    <span className="font-mono text-[10px] text-brand-muted">
                      {groupCount} feat.
                    </span>
                  </div>
                </div>
                <h4
                  className={`text-base font-semibold sm:text-lg ${
                    g.flagged ? "text-brand-accent" : "text-brand-ink"
                  }`}
                >
                  {g.title}
                </h4>
                <p className="font-mono text-[11px] leading-snug text-brand-muted">
                  {g.sub}
                </p>
              </div>
              <div className="flex flex-col divide-y divide-brand-divider">
                {g.buckets.map((b) => (
                  <details
                    key={b.label}
                    className="group py-2 first:pt-0 last:pb-0"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent">
                        {b.label}{" "}
                        <span className="text-brand-muted">({b.items.length})</span>
                      </span>
                      <ChevronRight
                        size={12}
                        className="shrink-0 text-brand-muted transition-transform group-open:rotate-90"
                      />
                    </summary>
                    <ul className="mt-2 flex flex-col gap-1">
                      {b.items.map((it) => (
                        <li
                          key={it}
                          className="flex gap-2 text-[12px] leading-snug text-brand-ink"
                        >
                          <span
                            className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-brand-accent/60"
                            aria-hidden
                          />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </div>
          </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-1.5">
        {Array.from({ length: totalPages }).map((_, p) => (
          <button
            key={p}
            type="button"
            onClick={() => scrollToIndex(p * perView)}
            aria-label={`Go to page ${p + 1}`}
            aria-current={p === currentPage ? "page" : undefined}
            className={`h-1.5 rounded-full transition ${
              p === currentPage
                ? "w-8 bg-brand-accent"
                : "w-1.5 bg-brand-divider hover:bg-brand-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureCarousel;
