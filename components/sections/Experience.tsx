'use client';

import { motion } from 'framer-motion';
import { Building2, CalendarDays, TrendingUp } from 'lucide-react';
import { experiences } from '@/lib/content';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EASE } from '@/lib/motion';

export function Experience() {
  return (
    <Section id="experience" aria-label="Professional experience">
      <SectionHeading
        eyebrow="Experience"
        title="Where I have shipped"
        accent="real AI work."
        description="Two roles across AI/cybersecurity R&D and applied analytics — the timeline below reflects my resume exactly."
      />

      <div className="relative mt-14">
        {/* Timeline rail */}
        <motion.span
          className="absolute left-[11px] top-2 w-px origin-top bg-gradient-to-b from-accent via-violet to-transparent sm:left-[15px]"
          style={{ height: 'calc(100% - 2rem)' }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.3, ease: EASE }}
          aria-hidden="true"
        />

        <ol className="space-y-6">
          {experiences.map((exp, i) => (
            <li key={`${exp.company}-${exp.period}`} className="relative pl-10 sm:pl-14">
              {/* Node */}
              <motion.span
                className="absolute left-0 top-6 flex h-[23px] w-[23px] items-center justify-center rounded-full border border-line bg-bg sm:h-[31px] sm:w-[31px]"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15, type: 'spring', stiffness: 300, damping: 20 }}
                aria-hidden="true"
              >
                <span className="h-2 w-2 rounded-full bg-gradient-to-br from-accent to-violet shadow-[0_0_0_4px_rgb(var(--c-accent)/0.16)] sm:h-2.5 sm:w-2.5" />
              </motion.span>

              <Reveal from="right" delay={i * 0.08}>
                <article className="group card card-hover overflow-hidden p-5 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                        {exp.role}
                      </h3>
                      <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13.5px]">
                        <Building2 className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                        <span className="font-medium text-accent">{exp.company}</span>
                        {exp.companyNote && (
                          <span className="text-muted">({exp.companyNote})</span>
                        )}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface/60 px-2.5 py-1 font-mono text-[10.5px] text-muted">
                        <CalendarDays className="h-3 w-3" aria-hidden="true" />
                        {exp.period}
                      </span>
                      <span className="rounded-lg border border-violet/25 bg-violet/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-violet">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-[13.5px] leading-relaxed text-muted">{exp.summary}</p>

                  {/* Measurable outcome */}
                  {exp.metric && (
                    <div className="mt-5 flex items-center gap-3 rounded-xl border border-accent/20 bg-accent/[0.07] px-4 py-3">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-violet text-white">
                        <TrendingUp className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <p className="text-[13px]">
                        <span className="font-display text-base font-semibold gradient-text">
                          {exp.metric.value}
                        </span>{' '}
                        <span className="text-muted">{exp.metric.label}</span>
                      </p>
                    </div>
                  )}

                  <div className="hairline my-5" />

                  <h4 className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-muted">
                    Key contributions
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {exp.highlights.map((h, hi) => (
                      <motion.li
                        key={h}
                        className="flex gap-2.5 text-[13px] leading-relaxed text-muted"
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + hi * 0.05, duration: 0.4 }}
                      >
                        <span
                          className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        <span>{h}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {exp.stack.map((tech) => (
                      <li key={tech}>
                        <span className="tag">{tech}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
