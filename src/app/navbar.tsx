import Image from "next/image";
import Link from "next/link";
import React from "react";

const navItems = [
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
];

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-divider/60 bg-white/70 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/pi.jpg"
            alt="Pranav Yadav monogram"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="font-mono text-sm uppercase tracking-[0.18em] text-brand-ink">
            pranav&nbsp;yadav
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-brand-muted transition hover:bg-brand-accent-soft hover:text-brand-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="mailto:pranavyadav996@gmail.com"
          className="hidden items-center gap-2 rounded-full bg-brand-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-accent sm:inline-flex"
        >
          Contact
        </a>
      </div>
    </header>
  );
};

export default NavBar;
