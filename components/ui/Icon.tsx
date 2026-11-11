'use client';

import {
  BarChart3,
  Bot,
  Brain,
  Briefcase,
  Cloud,
  Code2,
  Container,
  CreditCard,
  Database,
  Eye,
  Globe,
  GraduationCap,
  Library,
  MailWarning,
  MapPin,
  MessagesSquare,
  Network,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

/**
 * Explicit icon registry: content files reference icons by name, but only the
 * icons listed here are bundled — this keeps lucide out of the critical path.
 */
const registry: Record<string, LucideIcon> = {
  BarChart3,
  Bot,
  Brain,
  Briefcase,
  Cloud,
  Code2,
  Container,
  CreditCard,
  Database,
  Eye,
  Globe,
  GraduationCap,
  Library,
  MailWarning,
  MapPin,
  MessagesSquare,
  Network,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
};

type IconProps = {
  name: string;
  className?: string;
  strokeWidth?: number;
};

export function Icon({ name, className, strokeWidth = 1.75 }: IconProps) {
  const Cmp = registry[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
