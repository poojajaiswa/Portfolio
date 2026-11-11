'use client';

import { FlaskConical } from 'lucide-react';
import { research } from '@/lib/content';
import { Icon } from '@/components/ui/Icon';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

const accentStyles = {
  accent: {
    text: 'text-accent',
    border: 'group-hover:border-accent/45',
    glow: 'rgb(var(--c-accent) / 0.3)',
    bar: 'from-accent to-cyan',
    dot: 'bg-accent',
  },
  violet: {
    text: 'text-violet',
    border: 'group-hover:border-violet/45',
    glow: 'rgb(var(--c-violet) / 0.3)',
    bar: 'from-violet to-accent',
    dot: 'bg-violet',
  },
  cyan: {
    text: 'text-cyan',
    border: 'group-hover:border-cyan/45',
    glow: 'rgb(var(--c-cyan) / 0.28)',
    bar: 'from-cyan to-violet',
    dot: 'bg-cyan',
  },
} as const;

export function Research() {
  return (
    <Section id="research" aria-label="AI and cybersecurity research interests">
      <SectionHeading
        eyebrow="Research & exploration"
        title={research.title}
        description={research.intro}
      />

      <Stagger className="mt-14 grid gap-5 lg:grid-cols-3">
        {research.cards.map((card) => {
          const style = accentStyles[card.accent];
          return (
            <StaggerItem key={card.title}>
              <article
                className={`group relative h-full overflow-hidden rounded-3xl glass p-6 transition-all duration-500 ease-premium hover:-translate-y-1.5 ${style.border}`}
              >
                {/* top gradient bar */}
                <span
                  className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${style.bar} opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
                  aria-hidden="true"
                />
                {/* corner glow */}
                <span
                  className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle, ${style.glow}, transparent 70%)` }}
                  aria-hidden="true"
                />

                <div className="relative">
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-surface/70 ${style.text} transition-transform duration-500 group-hover:scale-105`}
                  >
                    <Icon name={card.icon} className="h-5 w-5" />
                  </span>

                  <h3 className="mt-5 font-display text-[17px] font-semibold leading-snug">
                    {card.title}
                  </h3>

                  <ul className="mt-5 space-y-2.5">
                    {card.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-[13px] text-muted">
                        <span
                          className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`}
                          aria-hidden="true"
                        />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal from="up" delay={0.1}>
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-line bg-surface/40 p-4 sm:items-center">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-cyan">
            <FlaskConical className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="text-[12.5px] leading-relaxed text-muted">
            These are active learning and prototyping areas, listed separately from the delivered
            professional work above so the distinction stays clear.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
