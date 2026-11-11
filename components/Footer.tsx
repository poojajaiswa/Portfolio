'use client';

import { Download, Mail, MapPin } from 'lucide-react';
import { navLinks, site } from '@/lib/config';
import { SocialIconLink } from '@/components/ui/Links';

export function Footer() {
  const year = new Date().getFullYear();

  const go = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', href);
  };

  return (
    <footer className="relative border-t border-line bg-bg-soft/40">
      <div className="shell py-12">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#home" onClick={go('#home')} className="inline-flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-violet font-display text-[13px] font-bold text-white">
                {site.initials}
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[14px] font-semibold tracking-tight">
                  {site.name}
                </span>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                  AI / ML Engineer
                </span>
              </span>
            </a>

            <p className="mt-4 max-w-sm text-[12.5px] leading-relaxed text-muted">
              Building intelligent, data-driven systems across machine learning, Generative AI,
              agentic workflows, and AI for cybersecurity.
            </p>

            <div className="mt-5 flex items-center gap-2.5">
              <SocialIconLink platform="github" className="!h-10 !w-10" />
              <SocialIconLink platform="linkedin" className="!h-10 !w-10" />
              <a
                href={`mailto:${site.email}`}
                aria-label={`Email ${site.name}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl glass text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
              >
                <Mail className="h-[17px] w-[17px]" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-muted">
              Navigate
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={go(link.href)}
                    className="text-[12.5px] text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-muted">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-2.5 text-[12.5px]">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all text-muted transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="text-muted transition-colors hover:text-accent"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-muted">
                <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                {site.locationShort}
              </li>
            </ul>

            <a href={site.resumePath} download className="btn-secondary mt-5 !px-4 !py-2 text-xs">
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Download Resume
            </a>
          </div>
        </div>

        <div className="hairline my-8" />

        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-[11.5px] text-muted">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-[11.5px] text-muted">
            Built with Next.js, TypeScript, Tailwind CSS &amp; Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
