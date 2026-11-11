'use client';

import { Github, Linkedin, type LucideIcon } from 'lucide-react';
import { isLinkReady, site } from '@/lib/config';

type Platform = 'github' | 'linkedin';

const meta: Record<Platform, { icon: LucideIcon; label: string; hint: string }> = {
  github: {
    icon: Github,
    label: 'GitHub',
    hint: 'GitHub URL not configured yet — add it in lib/config.ts',
  },
  linkedin: {
    icon: Linkedin,
    label: 'LinkedIn',
    hint: 'LinkedIn URL not configured yet — add it in lib/config.ts',
  },
};

/**
 * Social icon button. When the URL in lib/config.ts is still empty the button
 * renders disabled with an explanatory tooltip — never a broken link.
 */
export function SocialIconLink({
  platform,
  className = '',
}: {
  platform: Platform;
  className?: string;
}) {
  const { icon: LucideGlyph, label, hint } = meta[platform];
  const url = site.socials[platform];
  const ready = isLinkReady(url);

  const base =
    'group inline-flex h-11 w-11 items-center justify-center rounded-xl glass transition-all duration-300 ease-premium';

  if (!ready) {
    return (
      <span
        aria-disabled="true"
        title={hint}
        className={`${base} cursor-not-allowed opacity-45 ${className}`}
      >
        <LucideGlyph className="h-[18px] w-[18px]" aria-hidden="true" />
        <span className="sr-only">{`${label} — ${hint}`}</span>
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${site.name} on ${label}`}
      className={`${base} text-muted hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent ${className}`}
    >
      <LucideGlyph className="h-[18px] w-[18px]" aria-hidden="true" />
    </a>
  );
}

/**
 * Project / certificate link. Falls back to a disabled chip with an honest
 * label when the URL has not been published yet.
 */
export function ExternalActionLink({
  href,
  icon: Glyph,
  children,
  pendingLabel,
  variant = 'secondary',
  className = '',
}: {
  href: string | null;
  icon: LucideIcon;
  children: string;
  pendingLabel: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}) {
  const cls = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  if (!isLinkReady(href ?? undefined)) {
    return (
      <span
        aria-disabled="true"
        title={pendingLabel}
        className={`${cls} !px-4 !py-2 text-xs ${className}`}
      >
        <Glyph className="h-4 w-4" aria-hidden="true" />
        {pendingLabel}
      </span>
    );
  }

  return (
    <a
      href={href as string}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cls} !px-4 !py-2 text-xs ${className}`}
    >
      <Glyph className="h-4 w-4" aria-hidden="true" />
      {children}
    </a>
  );
}
