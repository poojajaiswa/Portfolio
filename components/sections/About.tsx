'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, Mail } from 'lucide-react';
import Image from 'next/image';
import { site } from '@/lib/config';
import { about } from '@/lib/content';
import { Icon } from '@/components/ui/Icon';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SocialIconLink } from '@/components/ui/Links';
import { EASE } from '@/lib/motion';

export function About() {
  return (
    <Section id="about" aria-label="About Pooja Jaiswal">
      <SectionHeading
        eyebrow="About me"
        title="Turning complex data into"
        accent="intelligent decisions."
        description={about.lead}
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        {/* ------------------------- Left: narrative ------------------------- */}
        <div>
          <div className="space-y-4">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} from="up" delay={i * 0.06}>
                <p className="text-[15px] leading-[1.75] text-muted">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal from="up" delay={0.1}>
            <h3 className="mt-10 font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink">
              How I approach the work
            </h3>
          </Reveal>

          <Stagger className="mt-5 grid gap-3 sm:grid-cols-2">
            {about.approach.map((a) => (
              <StaggerItem key={a.title}>
                <div className="card card-hover h-full p-4">
                  <div className="flex items-start gap-2.5">
                    <BadgeCheck
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[13.5px] font-medium text-ink">{a.title}</p>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{a.body}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* ------------------------ Right: profile card ----------------------- */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal from="left">
            <article className="relative overflow-hidden rounded-3xl glass-strong p-6 sm:p-7">
              {/* corner glow */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl"
                style={{
                  background:
                    'radial-gradient(circle, rgb(var(--c-accent) / 0.3), transparent 70%)',
                }}
                aria-hidden="true"
              />

              <div className="relative flex items-center gap-4">
                {/* Avatar: real photo when configured, elegant monogram otherwise */}
                <div className="relative h-16 w-16 shrink-0">
                  <span
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent via-violet to-cyan p-[1.5px]"
                    aria-hidden="true"
                  >
                    <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-[14px] bg-bg">
                      {site.profilePhoto ? (
                        <Image
                          src={site.profilePhoto}
                          alt={`Portrait of ${site.name}`}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                          priority={false}
                        />
                      ) : (
                        <span className="font-display text-lg font-bold gradient-text">
                          {site.initials}
                        </span>
                      )}
                    </span>
                  </span>
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-display text-lg font-semibold">{site.name}</h3>
                  <p className="mt-0.5 text-[12.5px] text-muted">
                    {about.profileCard.designation}
                  </p>
                </div>
              </div>

              <div className="hairline my-6" />

              <dl className="space-y-4">
                {about.profileCard.rows.map((row) => (
                  <div key={row.label} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-line bg-surface/60 text-accent">
                      <Icon name={row.icon} className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0">
                      <dt className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted">
                        {row.label}
                      </dt>
                      <dd className="mt-1 text-[13px] leading-snug text-ink">{row.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-2.5">
                <span className="flex items-center gap-2 text-[12px] font-medium text-emerald-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Available for opportunities
                </span>
              </div>

              <div className="mt-5 flex items-center gap-2.5">
                <a href={`mailto:${site.email}`} className="btn-secondary flex-1 !py-2.5 text-xs">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  Email me
                </a>
                <SocialIconLink platform="github" className="!h-10 !w-10" />
                <SocialIconLink platform="linkedin" className="!h-10 !w-10" />
              </div>
            </article>
          </Reveal>

          {/* ---------------------- Animated mini timeline --------------------- */}
          <Reveal from="left" delay={0.12}>
            <div className="mt-6 rounded-3xl glass p-6">
              <h4 className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-muted">
                Journey so far
              </h4>
              <ol className="relative mt-5 space-y-5 pl-7">
                <motion.span
                  className="absolute left-[7px] top-1.5 w-px origin-top bg-gradient-to-b from-accent via-violet to-transparent"
                  style={{ height: '92%' }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: EASE }}
                  aria-hidden="true"
                />
                {about.journey.map((j, i) => (
                  <motion.li
                    key={j.year}
                    className="relative"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.13, duration: 0.5 }}
                  >
                    <span
                      className="absolute -left-7 top-1 h-[11px] w-[11px] rounded-full border-2 border-bg bg-accent shadow-[0_0_0_3px_rgb(var(--c-accent)/0.2)]"
                      aria-hidden="true"
                    />
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                      {j.year}
                    </p>
                    <p className="mt-1 text-[13.5px] font-medium text-ink">{j.label}</p>
                    <p className="mt-0.5 text-[12px] text-muted">{j.detail}</p>
                  </motion.li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>

      {/* --------------------------- Focus areas --------------------------- */}
      <div className="mt-16">
        <Reveal from="up">
          <h3 className="text-center font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink">
            Where I focus
          </h3>
        </Reveal>

        <Stagger className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {about.focusAreas.map((area) => (
            <StaggerItem key={area.title}>
              <div className="group card card-hover h-full p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface/60 text-accent transition-all duration-500 group-hover:border-accent/40 group-hover:bg-accent/10">
                  <Icon name={area.icon} className="h-[18px] w-[18px]" />
                </span>
                <h4 className="mt-4 font-display text-[15px] font-semibold">{area.title}</h4>
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{area.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
