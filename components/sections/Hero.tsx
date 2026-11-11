'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Download, Mail, MapPin, Sparkles } from 'lucide-react';
import { site } from '@/lib/config';
import { intro } from '@/lib/content';
import { SocialIconLink } from '@/components/ui/Links';
import { HeroVisual } from './HeroVisual';
import { EASE } from '@/lib/motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Hero() {
  const reduce = useReducedMotion();

  const scrollTo = (hash: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      .querySelector(hash)
      ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(null, '', hash);
  };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pb-20 lg:pb-10"
    >
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* ---------------- Copy ---------------- */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-accent">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                {intro.greeting}
              </span>
              <span className="chip">
                <MapPin className="h-3 w-3 text-accent" aria-hidden="true" />
                {site.locationShort}
              </span>
            </motion.div>

            <motion.h1 variants={item} className="mt-6 text-display-xl text-shadow-soft">
              Building Intelligent Solutions{' '}
              <span className="relative inline-block">
                <span className="gradient-text-animated">Through Data &amp; AI.</span>
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 font-mono text-[12.5px] uppercase tracking-[0.17em] text-muted sm:text-[13px]"
            >
              {intro.subtitle.split(' | ').map((part, i, arr) => (
                <span key={part}>
                  <span className="text-ink/85">{part}</span>
                  {i < arr.length - 1 && <span className="mx-2 text-accent/60">/</span>}
                </span>
              ))}
            </motion.p>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base"
            >
              {intro.heroDescription}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#projects" onClick={scrollTo('#projects')} className="btn-primary">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Explore My Work
              </a>
              <a href={site.resumePath} download className="btn-secondary">
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </a>
              <a href="#contact" onClick={scrollTo('#contact')} className="btn-ghost">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Let&apos;s Connect
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div variants={item} className="mt-8 flex items-center gap-3">
              <SocialIconLink platform="github" />
              <SocialIconLink platform="linkedin" />
              <span className="ml-1 h-px w-10 bg-line" aria-hidden="true" />
              <a
                href={`mailto:${site.email}`}
                className="text-[13px] text-muted transition-colors hover:text-accent"
              >
                {site.email}
              </a>
            </motion.div>

            {/* Factual snapshot */}
            <motion.dl
              variants={item}
              className="mt-10 grid max-w-lg grid-cols-3 gap-3 border-t border-line pt-6"
            >
              {intro.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-semibold gradient-text">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-[11.5px] leading-snug text-muted">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* ---------------- Visual ---------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.95, delay: 0.2, ease: EASE }}
            className="relative"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        onClick={scrollTo('#about')}
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-accent lg:flex"
      >
        <span className="font-mono text-[9.5px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown className="h-4 w-4 motion-safe:animate-float" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
