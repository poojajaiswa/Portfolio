'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink, GraduationCap } from 'lucide-react';
import { certifications, education } from '@/lib/content';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EASE } from '@/lib/motion';

export function Education() {
  return (
    <Section id="education" tinted aria-label="Education and certifications">
      <SectionHeading
        eyebrow="Education & certifications"
        title="Academic foundation and"
        accent="continued learning."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        {/* ----------------------------- Education ---------------------------- */}
        <div>
          <Reveal from="up">
            <h3 className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              <GraduationCap className="h-4 w-4 text-accent" aria-hidden="true" />
              Education
            </h3>
          </Reveal>

          <div className="relative mt-6">
            <motion.span
              className="absolute left-[11px] top-2 w-px origin-top bg-gradient-to-b from-accent via-violet to-transparent"
              style={{ height: 'calc(100% - 1.5rem)' }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: EASE }}
              aria-hidden="true"
            />

            <ol className="space-y-5">
              {education.map((ed, i) => (
                <li key={ed.degree} className="relative pl-10">
                  <motion.span
                    className="absolute left-0 top-5 flex h-[23px] w-[23px] items-center justify-center rounded-full border border-line bg-bg"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.2 + i * 0.14,
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    }}
                    aria-hidden="true"
                  >
                    <span className="h-2 w-2 rounded-full bg-gradient-to-br from-accent to-violet shadow-[0_0_0_4px_rgb(var(--c-accent)/0.16)]" />
                  </motion.span>

                  <Reveal from="right" delay={i * 0.08}>
                    <article className="card card-hover p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h4 className="font-display text-[15.5px] font-semibold leading-snug">
                          {ed.degree}
                        </h4>
                        <span
                          className={[
                            'shrink-0 rounded-lg border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider',
                            ed.status === 'ongoing'
                              ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                              : 'border-line bg-surface/60 text-muted',
                          ].join(' ')}
                        >
                          {ed.period}
                        </span>
                      </div>

                      <p className="mt-2 text-[13px] font-medium text-accent">{ed.institution}</p>

                      {ed.details.length > 0 && (
                        <ul className="mt-3.5 space-y-2 border-t border-line pt-3.5">
                          {ed.details.map((d) => (
                            <li
                              key={d}
                              className="flex gap-2.5 text-[12.5px] leading-relaxed text-muted"
                            >
                              <span
                                className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent"
                                aria-hidden="true"
                              />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* -------------------------- Certifications -------------------------- */}
        <div>
          <Reveal from="up">
            <h3 className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              <Award className="h-4 w-4 text-violet" aria-hidden="true" />
              Certifications
            </h3>
          </Reveal>

          <Stagger className="mt-6 grid gap-3.5 sm:grid-cols-2">
            {certifications.map((cert) => (
              <StaggerItem key={cert.title}>
                <article className="group card card-hover relative h-full overflow-hidden p-5">
                  <span
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(circle, rgb(var(--c-violet) / 0.3), transparent 70%)',
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface/70 text-violet transition-all duration-500 group-hover:border-violet/40 group-hover:bg-violet/10">
                      <Award className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>

                    <h4 className="mt-4 font-display text-[14px] font-semibold leading-snug">
                      {cert.title}
                    </h4>
                    <p className="mt-1.5 text-[12px] text-muted">{cert.issuer}</p>

                    {cert.credentialUrl ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3.5 inline-flex items-center gap-1.5 text-[11.5px] font-medium text-accent transition-opacity hover:opacity-75"
                      >
                        Verify credential
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    ) : (
                      <p className="mt-3.5 font-mono text-[10px] uppercase tracking-wider text-muted/70">
                        Certificate on file
                      </p>
                    )}
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal from="up" delay={0.1}>
            <p className="mt-5 text-[12px] leading-relaxed text-muted">
              Verification links appear automatically for any certificate once its URL is added in{' '}
              <code className="rounded bg-surface/70 px-1.5 py-0.5 font-mono text-[11px] text-accent">
                lib/content.ts
              </code>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
