'use client';

import { Reveal } from './Reveal';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  /** Portion of the title rendered in the accent gradient. */
  accent?: string;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = 'center',
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div
      className={[
        'flex flex-col gap-4',
        centered ? 'items-center text-center' : 'items-start text-left',
      ].join(' ')}
    >
      <Reveal from="up">
        <span className="inline-flex items-center gap-2.5">
          <span className="h-px w-7 bg-gradient-to-r from-transparent to-accent" />
          <span className="eyebrow">{eyebrow}</span>
          {centered && <span className="h-px w-7 bg-gradient-to-l from-transparent to-accent" />}
        </span>
      </Reveal>

      <Reveal from="up" delay={0.08}>
        <h2 className="text-display-lg">
          {title}
          {accent && (
            <>
              {' '}
              <span className="gradient-text">{accent}</span>
            </>
          )}
        </h2>
      </Reveal>

      {description && (
        <Reveal from="up" delay={0.14}>
          <p
            className={[
              'text-[15px] leading-relaxed text-muted',
              centered ? 'mx-auto max-w-2xl' : 'max-w-2xl',
            ].join(' ')}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
