'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Code2,
  ExternalLink,
  Github,
  Target,
  Wrench,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  otherProjects,
  projectCategories,
  projects,
  type ProjectCategory,
} from '@/lib/content';
import { Icon } from '@/components/ui/Icon';
import { ExternalActionLink } from '@/components/ui/Links';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectVisual } from './ProjectVisual';
import { EASE } from '@/lib/motion';

type Filter = 'all' | ProjectCategory;

export function Projects() {
  const [filter, setFilter] = useState<Filter>('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const [openOther, setOpenOther] = useState<string | null>(null);

  const featured = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );
  const compact = useMemo(
    () => (filter === 'all' ? otherProjects : otherProjects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <Section id="projects" tinted aria-label="Featured projects">
      <SectionHeading
        eyebrow="Featured projects"
        title="Systems I have designed,"
        accent="built, and shipped."
        description="Each project below starts from a real problem. Architecture, feature set, and stack are described exactly as built — links appear here as repositories and demos are published."
      />

      {/* --------------------------- Filter chips --------------------------- */}
      <Reveal from="up" delay={0.1}>
        <div
          role="group"
          aria-label="Filter projects by domain"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {projectCategories.map((c) => {
            const isActive = filter === c.id;
            const count =
              c.id === 'all'
                ? projects.length + otherProjects.length
                : [...projects, ...otherProjects].filter((p) => p.category === c.id).length;

            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setFilter(c.id as Filter);
                  setOpenId(null);
                  setOpenOther(null);
                }}
                className={[
                  'relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-medium transition-colors duration-300',
                  isActive ? 'text-white' : 'text-muted hover:text-ink',
                ].join(' ')}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent to-violet shadow-[0_8px_24px_-12px_rgb(var(--c-accent)/0.9)]"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <span className="absolute inset-0 -z-10 rounded-full border border-line bg-surface/40" />
                )}
                {c.label}
                <span
                  className={[
                    'font-mono text-[10px]',
                    isActive ? 'text-white/70' : 'text-muted/60',
                  ].join(' ')}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* ------------------------ Featured project list --------------------- */}
      <div className="mt-14 space-y-16 lg:space-y-20">
        <AnimatePresence mode="popLayout">
          {featured.map((project, index) => {
            const isOpen = openId === project.id;
            const flip = index % 2 === 1;

            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
              >
                {/* ---- Visual ---- */}
                <Reveal
                  from={flip ? 'left' : 'right'}
                  className={flip ? 'lg:order-2' : undefined}
                >
                  <ProjectVisual variant={project.visual} label={project.title} />
                </Reveal>

                {/* ---- Content ---- */}
                <div className={flip ? 'lg:order-1' : undefined}>
                  <Reveal from="up">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-[11px] text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px w-6 bg-line" aria-hidden="true" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                        {projectCategories.find((c) => c.id === project.category)?.label}
                      </span>
                      {project.status && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-amber-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 motion-safe:animate-pulse" />
                          {project.status}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3.5 text-display-md">{project.title}</h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                      {project.tagline}
                    </p>
                  </Reveal>

                  {/* Problem / Solution */}
                  <Reveal from="up" delay={0.08}>
                    <div className="mt-6 space-y-4">
                      <div className="flex gap-3">
                        <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-line bg-surface/60 text-amber-400">
                          <Target className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted">
                            The problem
                          </p>
                          <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                            {project.problem}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-line bg-surface/60 text-accent">
                          <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted">
                            The solution
                          </p>
                          <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                            {project.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>

                  {/* Stack */}
                  <Reveal from="up" delay={0.12}>
                    <ul className="mt-6 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <li key={tech}>
                          <span className="tag">{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  {/* Expandable technical detail */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 rounded-2xl glass p-5">
                          <h4 className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-muted">
                            Architecture / workflow
                          </h4>
                          <ol className="mt-3.5 flex flex-wrap items-center gap-x-1.5 gap-y-2.5">
                            {project.architecture.map((step, si) => (
                              <li key={step} className="flex items-center gap-1.5">
                                <span className="inline-flex items-center gap-1.5 rounded-lg border border-accent/20 bg-accent/[0.07] px-2.5 py-1.5 text-[11.5px] text-ink">
                                  <span className="font-mono text-[9px] text-accent">
                                    {si + 1}
                                  </span>
                                  {step}
                                </span>
                                {si < project.architecture.length - 1 && (
                                  <ArrowRight
                                    className="h-3 w-3 shrink-0 text-muted/50"
                                    aria-hidden="true"
                                  />
                                )}
                              </li>
                            ))}
                          </ol>

                          <div className="hairline my-5" />

                          <h4 className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-muted">
                            Key features
                          </h4>
                          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                            {project.features.map((f) => (
                              <li
                                key={f}
                                className="flex gap-2 text-[12.5px] leading-relaxed text-muted"
                              >
                                <span
                                  className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-cyan"
                                  aria-hidden="true"
                                />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Actions */}
                  <div className="mt-7 flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : project.id)}
                      aria-expanded={isOpen}
                      className="btn-primary !px-4 !py-2 text-xs"
                    >
                      {isOpen ? 'Hide details' : 'Technical details'}
                      <ChevronDown
                        className={[
                          'h-3.5 w-3.5 transition-transform duration-300',
                          isOpen ? 'rotate-180' : '',
                        ].join(' ')}
                        aria-hidden="true"
                      />
                    </button>

                    <ExternalActionLink
                      href={project.github}
                      icon={Github}
                      pendingLabel="Code not published"
                    >
                      View code
                    </ExternalActionLink>

                    <ExternalActionLink
                      href={project.demo}
                      icon={ExternalLink}
                      pendingLabel="Demo coming soon"
                    >
                      Live demo
                    </ExternalActionLink>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      {/* --------------------------- Other projects ------------------------- */}
      {compact.length > 0 && (
        <div className="mt-20">
          <Reveal from="up">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  Other projects
                </h3>
                <p className="mt-1.5 text-[13px] text-muted">
                  Smaller builds and experiments — expand any card for detail.
                </p>
              </div>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">
                {compact.length} {compact.length === 1 ? 'project' : 'projects'}
              </span>
            </div>
          </Reveal>

          <motion.div layout className="mt-7 grid gap-4 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {compact.map((p) => {
                const isOpen = openOther === p.id;
                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <article className="group card card-hover h-full p-5">
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface/70 text-accent transition-all duration-500 group-hover:border-accent/40 group-hover:bg-accent/10">
                          <Icon name={p.icon} className="h-[18px] w-[18px]" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-display text-[15px] font-semibold leading-snug">
                            {p.title}
                          </h4>
                          <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
                            {p.summary}
                          </p>
                        </div>
                      </div>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.32, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <ul className="mt-4 space-y-2 border-t border-line pt-4">
                              {p.points.map((pt) => (
                                <li
                                  key={pt}
                                  className="flex gap-2 text-[12.5px] leading-relaxed text-muted"
                                >
                                  <span
                                    className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent"
                                    aria-hidden="true"
                                  />
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {p.stack.map((tech) => (
                          <li key={tech}>
                            <span className="tag">{tech}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                        <button
                          type="button"
                          onClick={() => setOpenOther(isOpen ? null : p.id)}
                          aria-expanded={isOpen}
                          className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-accent transition-opacity hover:opacity-75"
                        >
                          {isOpen ? 'Show less' : 'Show more'}
                          <ChevronDown
                            className={[
                              'h-3.5 w-3.5 transition-transform duration-300',
                              isOpen ? 'rotate-180' : '',
                            ].join(' ')}
                            aria-hidden="true"
                          />
                        </button>

                        <ExternalActionLink
                          href={p.github}
                          icon={Code2}
                          pendingLabel="Code not published"
                        >
                          View code
                        </ExternalActionLink>
                      </div>
                    </article>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      {featured.length === 0 && compact.length === 0 && (
        <p className="mt-14 text-center text-sm text-muted">
          No projects in this category yet.
        </p>
      )}
    </Section>
  );
}
