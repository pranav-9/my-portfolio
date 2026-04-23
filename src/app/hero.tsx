import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Reveal from "./reveal";

const Hero = () => {
  return (
    <section className="hero-backdrop relative overflow-hidden">
      <div className="grid-texture absolute inset-0 pointer-events-none" />
      <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col-reverse items-center gap-12 px-6 py-16 sm:flex-row sm:gap-16 sm:py-24">
        <Reveal className="flex flex-1 flex-col gap-8">
          <span className="kicker">
            <span className="kicker-dot" />
            Full Stack Engineer · Bengaluru, India
          </span>
          <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight text-brand-ink leading-[1.02]">
            Pranav Yadav
          </h1>
          <p className="max-w-xl text-xl sm:text-2xl text-brand-muted leading-relaxed">
            I ship products end-to-end — from{" "}
            <span className="text-brand-ink font-medium">API architecture</span>{" "}
            to{" "}
            <span className="text-brand-ink font-medium">
              pixel-tight frontends
            </span>
            . 7+ years across fintech, consumer, and 0-to-1 startups.
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

          <div className="flex items-center gap-5 pt-4 text-brand-muted">
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
              href="https://talent.toptal.com/resume/developers/pranav-yadav"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Toptal resume"
              className="text-sm font-mono uppercase tracking-wider transition hover:text-brand-ink"
            >
              Toptal
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition hover:text-brand-ink"
            >
              <Github size={20} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative flex-shrink-0">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand-accent/20 via-transparent to-brand-accent/5 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-brand-divider bg-white p-2 shadow-[0_30px_80px_-20px_rgba(53,87,148,0.25)]">
            <Image
              src="/pai-2.jpg"
              alt="Portrait of Pranav Yadav"
              width={380}
              height={480}
              priority
              className="rounded-[1.4rem] object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
