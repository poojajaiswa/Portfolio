'use client';

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { navLinks, sectionIds, site } from '@/lib/config';
import { ThemeToggle } from './ThemeToggle';
import { EASE } from '@/lib/motion';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  /* ---- scroll state + active section ---- */
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);

      const probe = window.scrollY + 140;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) current = id;
      }

      // Guarantee the last section highlights when the page bottoms out.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 80;
      if (atBottom) current = sectionIds[sectionIds.length - 1];

      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /* ---- mobile menu: scroll lock + Escape ---- */
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const go = useCallback(
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setMenuOpen(false);
      const el = document.querySelector(href);
      if (!el) return;
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      // Keep the URL shareable without triggering a second jump.
      window.history.replaceState(null, '', href);
    },
    [reduce],
  );

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={[
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium',
          scrolled ? 'py-2.5' : 'py-4',
        ].join(' ')}
      >
        <div className="shell">
          <nav
            aria-label="Primary"
            className={[
              'relative flex items-center justify-between rounded-2xl px-3.5 transition-all duration-500 ease-premium',
              scrolled
                ? 'glass-strong py-2.5 shadow-[0_18px_40px_-28px_rgb(2_6_23_/_0.6)]'
                : 'border border-transparent bg-transparent py-3',
            ].join(' ')}
          >
            {/* Brand */}
            <a
              href="#home"
              onClick={go('#home')}
              className="group flex shrink-0 items-center gap-2.5"
              aria-label={`${site.name} — back to top`}
            >
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-violet font-display text-[13px] font-bold text-white shadow-[0_8px_20px_-8px_rgb(var(--c-accent)/0.9)]">
                {site.initials}
              </span>
              <span className="hidden flex-col leading-none sm:flex">
                <span className="font-display text-[13px] font-semibold tracking-tight">
                  {site.name}
                </span>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                  AI / ML Engineer
                </span>
              </span>
            </a>

            {/* Desktop links */}
            <ul className="hidden items-center gap-0.5 lg:flex">
              {navLinks.map((link) => {
                const id = link.href.slice(1);
                const isActive = active === id;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={go(link.href)}
                      aria-current={isActive ? 'page' : undefined}
                      className={[
                        'relative inline-flex rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-300',
                        isActive ? 'text-ink' : 'text-muted hover:text-ink',
                      ].join(' ')}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-lg border border-accent/30 bg-accent/10"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
              <ThemeToggle />
              <a
                href={site.resumePath}
                download
                className="btn-primary hidden !px-4 !py-2 text-xs sm:inline-flex"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                Resume
              </a>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl glass text-muted transition-colors hover:text-accent lg:hidden"
              >
                {menuOpen ? (
                  <X className="h-[18px] w-[18px]" aria-hidden="true" />
                ) : (
                  <Menu className="h-[18px] w-[18px]" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Scroll progress */}
            <motion.span
              className="absolute inset-x-3.5 bottom-0 h-px origin-left rounded-full bg-gradient-to-r from-accent via-violet to-cyan"
              style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
            />
          </nav>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-nav"
              key="mobile-nav"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="shell lg:hidden"
            >
              <div className="mt-2 overflow-hidden rounded-2xl glass-strong p-2.5">
                <ul className="flex flex-col">
                  {navLinks.map((link, i) => {
                    const isActive = active === link.href.slice(1);
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 + i * 0.035, duration: 0.3 }}
                      >
                        <a
                          href={link.href}
                          onClick={go(link.href)}
                          aria-current={isActive ? 'page' : undefined}
                          className={[
                            'flex items-center justify-between rounded-xl px-3.5 py-3 text-sm transition-colors',
                            isActive
                              ? 'bg-accent/10 font-medium text-accent'
                              : 'text-muted hover:bg-surface/60 hover:text-ink',
                          ].join(' ')}
                        >
                          {link.label}
                          <span className="font-mono text-[10px] text-muted/60">
                            0{navLinks.indexOf(link) + 1}
                          </span>
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
                <a
                  href={site.resumePath}
                  download
                  className="btn-primary mt-2 w-full sm:hidden"
                  onClick={() => setMenuOpen(false)}
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
