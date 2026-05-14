"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { getProjectsWithCaseStudies } from "@/lib/projects";

const navItems = [
  { href: "/#projects", label: "Work" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
];

const NavBar = (props: { breadcrumb?: string }) => {
  const [open, setOpen] = useState(false);
  const [csOpen, setCsOpen] = useState(false);
  const [mobileCsOpen, setMobileCsOpen] = useState(false);
  const desktopCsRef = useRef<HTMLDivElement | null>(null);

  const caseStudies = getProjectsWithCaseStudies();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!csOpen) return;
    const onClick = (e: MouseEvent) => {
      if (
        desktopCsRef.current &&
        !desktopCsRef.current.contains(e.target as Node)
      ) {
        setCsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [csOpen]);

  const closeAll = () => {
    setOpen(false);
    setCsOpen(false);
    setMobileCsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-brand-divider/60 bg-white/70 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image
              src="/pi.jpg"
              alt="Pranav Yadav monogram"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="hidden font-mono text-sm uppercase tracking-[0.18em] text-brand-ink sm:inline">
              pranav&nbsp;yadav
            </span>
          </Link>

          {props.breadcrumb && (
            <>
              <span className="hidden text-brand-divider sm:inline">/</span>
              <span className="truncate font-mono text-xs uppercase tracking-wider text-brand-muted sm:text-sm">
                {props.breadcrumb}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-1 sm:flex">
            <Link
              href={navItems[0].href}
              className="rounded-full px-4 py-2 text-sm font-medium text-brand-muted transition hover:bg-brand-accent-soft hover:text-brand-ink"
            >
              {navItems[0].label}
            </Link>

            <div className="relative" ref={desktopCsRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={csOpen}
                onClick={() => setCsOpen((v) => !v)}
                className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-brand-muted transition hover:bg-brand-accent-soft hover:text-brand-ink"
              >
                Case Studies
                <ChevronDown
                  size={14}
                  className={`transition-transform ${csOpen ? "rotate-180" : ""}`}
                />
              </button>

              {csOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-2 w-96 rounded-2xl border border-brand-divider bg-white p-2 shadow-[0_30px_80px_-20px_rgba(53,87,148,0.25)]"
                >
                  {caseStudies.map((p) => (
                    <div key={p.slug} className="flex flex-col">
                      <Link
                        role="menuitem"
                        href={`/projects/${p.slug}`}
                        onClick={closeAll}
                        className="rounded-xl px-3 py-2 text-sm font-semibold text-brand-ink transition hover:bg-brand-accent-soft"
                      >
                        {p.title}
                      </Link>
                      <ul className="flex flex-col">
                        {p.caseStudy!.decisions.map((d) => (
                          <li key={d.slug}>
                            <Link
                              role="menuitem"
                              href={`/projects/${p.slug}/decisions/${d.slug}`}
                              onClick={closeAll}
                              className="block rounded-xl px-3 py-2 pl-6 text-xs leading-snug text-brand-muted transition hover:bg-brand-accent-soft hover:text-brand-ink"
                            >
                              {d.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-brand-muted transition hover:bg-brand-accent-soft hover:text-brand-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href="mailto:pranavyadav996@gmail.com"
            className="hidden items-center gap-2 rounded-full bg-brand-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-accent sm:inline-flex"
          >
            Contact
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-divider bg-white/80 text-brand-ink transition hover:border-brand-ink sm:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`sm:hidden overflow-hidden border-t border-brand-divider/60 bg-white/95 backdrop-blur-lg transition-[max-height,opacity] duration-300 ease-out ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
          <Link
            href={navItems[0].href}
            onClick={closeAll}
            className="rounded-xl px-3 py-3 text-base font-medium text-brand-ink transition hover:bg-brand-accent-soft"
          >
            {navItems[0].label}
          </Link>

          <div className="flex flex-col">
            <button
              type="button"
              aria-expanded={mobileCsOpen}
              onClick={() => setMobileCsOpen((v) => !v)}
              className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-brand-ink transition hover:bg-brand-accent-soft"
            >
              Case Studies
              <ChevronDown
                size={16}
                className={`transition-transform ${mobileCsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileCsOpen && (
              <div className="flex flex-col gap-0.5 pb-1">
                {caseStudies.map((p) => (
                  <div key={p.slug} className="flex flex-col">
                    <Link
                      href={`/projects/${p.slug}`}
                      onClick={closeAll}
                      className="rounded-xl px-3 py-2 pl-6 text-sm font-semibold text-brand-ink transition hover:bg-brand-accent-soft"
                    >
                      {p.title}
                    </Link>
                    {p.caseStudy!.decisions.map((d) => (
                      <Link
                        key={d.slug}
                        href={`/projects/${p.slug}/decisions/${d.slug}`}
                        onClick={closeAll}
                        className="rounded-xl px-3 py-2 pl-10 text-xs leading-snug text-brand-muted transition hover:bg-brand-accent-soft hover:text-brand-ink"
                      >
                        {d.title}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeAll}
              className="rounded-xl px-3 py-3 text-base font-medium text-brand-ink transition hover:bg-brand-accent-soft"
            >
              {item.label}
            </Link>
          ))}

          <a
            href="mailto:pranavyadav996@gmail.com"
            onClick={closeAll}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand-ink px-4 py-3 text-sm font-medium text-white transition hover:bg-brand-accent"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
