import Image from "next/image";
import Link from "next/link";
import React from "react";

const navItems = [
  { href: "/#projects", label: "Work" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
];

const NavBar = (props: { breadcrumb?: string }) => {
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
            {navItems.map((item) => (
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
        </div>
      </div>
    </header>
  );
};

export default NavBar;
