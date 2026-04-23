import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Reveal from "./reveal";

const Hero = () => {
  return (
    <section className="hero-backdrop relative overflow-hidden">
      <div className="grid-texture absolute inset-0 pointer-events-none" />
      <div className="relative mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-6 py-12 sm:min-h-[calc(100vh-64px)] sm:flex-row sm:gap-16 sm:py-24">
        <Reveal className="flex flex-1 flex-col gap-6 sm:gap-8">
          <span className="kicker">
            <span className="kicker-dot" />
            <span className="sm:hidden">AI · Automation · 9 yrs</span>
            <span className="hidden sm:inline">
              AI · Automation · Integrations · 9 yrs · 4 yrs Toptal
            </span>
          </span>
          <h1 className="text-4xl sm:text-7xl font-semibold tracking-tight text-brand-ink leading-[1.02]">
            Pranav Yadav
          </h1>
          <p className="max-w-xl text-lg sm:text-2xl text-brand-muted leading-relaxed">
            I ship products end-to-end — from{" "}
            <span className="text-brand-ink font-medium">LLM pipelines</span>{" "}
            to{" "}
            <span className="text-brand-ink font-medium">
              pixel-tight frontends
            </span>
            . 9 years across fintech, insurance, and AI; ex-CTO; 4 on Toptal.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-accent"
            >
              See selected work
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <a
              href="mailto:pranavyadav996@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-brand-divider bg-white/70 px-5 py-3 text-sm font-medium text-brand-ink backdrop-blur transition hover:border-brand-ink"
            >
              <Mail size={16} />
              Get in touch
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4 text-brand-muted sm:gap-5">
            <a
              href="https://talent.toptal.com/resume/developers/pranav-yadav"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Toptal profile"
              className="inline-flex items-center gap-2 rounded-full border border-brand-ink/15 bg-white px-3 py-1.5 text-xs font-medium text-brand-ink transition hover:border-brand-ink hover:shadow-[0_8px_20px_-10px_rgba(53,87,148,0.4)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
              Top 3% · Toptal Network · 4 yrs
            </a>
            <a
              href="https://www.linkedin.com/in/pranav-yadav-375247b6/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition hover:text-brand-ink"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/pranav-9"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition hover:text-brand-ink"
            >
              <Github size={20} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative w-full max-w-[260px] sm:w-auto sm:max-w-none sm:flex-shrink-0">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand-accent/20 via-transparent to-brand-accent/5 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-brand-divider bg-white p-2 shadow-[0_30px_80px_-20px_rgba(53,87,148,0.25)]">
            <Image
              src="/pai-2.jpg"
              alt="Portrait of Pranav Yadav"
              width={380}
              height={480}
              priority
              sizes="(max-width: 640px) 260px, 380px"
              className="h-auto w-full rounded-[1.4rem] object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
