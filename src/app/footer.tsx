import React from "react";
import { ArrowUpRight, Linkedin, Mail } from "lucide-react";
import Reveal from "./reveal";

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-brand-divider bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal className="flex flex-col gap-10">
          <span className="kicker">
            <span className="kicker-dot" />
            Let&rsquo;s talk
          </span>
          <h2 className="max-w-3xl text-4xl sm:text-6xl font-semibold tracking-tight text-brand-ink leading-[1.05]">
            Have a product in mind?{" "}
            <span className="text-brand-muted">I&rsquo;d love to hear about it.</span>
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:pranavyadav996@gmail.com"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-ink px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-accent"
            >
              <Mail size={16} />
              pranavyadav996@gmail.com
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/pranav-yadav-375247b6/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-brand-divider px-6 py-3 text-sm font-medium text-brand-ink transition hover:border-brand-ink"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a
              href="https://talent.toptal.com/resume/developers/pranav-yadav"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-brand-divider px-6 py-3 text-sm font-medium text-brand-ink transition hover:border-brand-ink"
            >
              Toptal resume
              <ArrowUpRight size={14} />
            </a>
          </div>
        </Reveal>

        <div className="mt-24 flex flex-col items-start justify-between gap-4 border-t border-brand-divider pt-8 text-sm text-brand-muted sm:flex-row sm:items-center">
          <p className="font-mono text-xs uppercase tracking-wider">
            © {new Date().getFullYear()} Pranav Yadav · New Delhi · BTech CS, DTU &rsquo;18
          </p>
          <p className="font-mono text-xs uppercase tracking-wider">
            Built with Next.js · Tailwind · shipped on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
