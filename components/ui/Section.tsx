import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  children: ReactNode;
  /** Adds a faint tinted band to separate adjacent sections. */
  tinted?: boolean;
  className?: string;
  'aria-label'?: string;
};

/** Consistent vertical rhythm + scroll anchor for every page section. */
export function Section({
  id,
  children,
  tinted = false,
  className = '',
  'aria-label': ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={[
        'relative py-20 sm:py-24 lg:py-28',
        tinted ? 'bg-bg-soft/40' : '',
        className,
      ].join(' ')}
    >
      {tinted && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
        </>
      )}
      <div className="shell">{children}</div>
    </section>
  );
}
