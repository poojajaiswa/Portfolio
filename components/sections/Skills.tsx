'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { skillGroups, skillTracks, type SkillTrack } from '@/lib/content';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EASE } from '@/lib/motion';

type TrackFilter = 'all' | SkillTrack;

export function Skills() {
  const [track, setTrack] = useState<TrackFilter>('all');

  const groups = useMemo(
    () => (track === 'all' ? skillGroups : skillGroups.filter((g) => g.tracks.includes(track))),
    [track],
  );

  const totalSkills = useMemo(
    () => new Set(skillGroups.flatMap((g) => g.skills)).size,
    [],
  );

  return (
    <Section id="skills" tinted aria-label="Technical skills">
      <SectionHeading
        eyebrow="Technical skills"
        title="The stack I build"
        accent="intelligent systems with."
        description={`${totalSkills} technologies across modelling, generative AI, data engineering, and deployment — grouped by what they are actually used for.`}
      />

      {/* Filter chips */}
      <Reveal from="up" delay={0.1}>
        <div
          role="group"
          aria-label="Filter skills by track"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {skillTracks.map((t) => {
            const isActive = track === t.id;
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setTrack(t.id as TrackFilter)}
                className={[
                  'relative rounded-full px-4 py-2 text-[12.5px] font-medium transition-colors duration-300',
                  isActive ? 'text-white' : 'text-muted hover:text-ink',
                ].join(' ')}
              >
                {isActive && (
                  <motion.span
                    layoutId="skill-track-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent to-violet shadow-[0_8px_24px_-12px_rgb(var(--c-accent)/0.9)]"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <span className="absolute inset-0 -z-10 rounded-full border border-line bg-surface/40" />
                )}
                {t.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Skill group cards */}
      <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {groups.map((group) => (
            <motion.article
              key={group.id}
              layout
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="group card card-hover relative overflow-hidden p-5"
            >
              {/* hover sheen */}
              <span
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle, rgb(var(--c-accent) / 0.35), transparent 70%)',
                }}
                aria-hidden="true"
              />

              <header className="relative flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface/70 text-accent transition-all duration-500 group-hover:border-accent/40 group-hover:bg-accent/10">
                  <Icon name={group.icon} className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[14.5px] font-semibold leading-snug">
                    {group.title}
                  </h3>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-muted">{group.blurb}</p>
                </div>
              </header>

              <ul className="relative mt-4 flex flex-wrap gap-1.5">
                {group.skills.map((skill, i) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.035, duration: 0.35 }}
                  >
                    <span className="tag">{skill}</span>
                  </motion.li>
                ))}
              </ul>

              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <Reveal from="up">
        <p className="mt-8 text-center text-[12px] text-muted">
          Skills are shown as capability areas rather than invented proficiency percentages.
        </p>
      </Reveal>
    </Section>
  );
}
