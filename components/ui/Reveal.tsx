'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE } from '@/lib/motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 26 },
  down: { x: 0, y: -26 },
  left: { x: 34, y: 0 },
  right: { x: -34, y: 0 },
  none: { x: 0, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  /** Direction the element travels *from*. */
  from?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'span';
};

/**
 * Scroll-triggered reveal. Animations run once, and collapse to a plain
 * fade (effectively nothing) when the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  from = 'up',
  delay = 0,
  duration = 0.65,
  className,
  as = 'div',
}: RevealProps) {
  const reduce = useReducedMotion();
  const { x, y } = reduce ? offsets.none : offsets[from];
  const Cmp = motion[as];

  return (
    <Cmp
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px 0px -80px 0px' }}
      transition={{
        duration: reduce ? 0.25 : duration,
        delay: reduce ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </Cmp>
  );
}

/** Parent/child pair for staggered lists (tags, cards, bullet lists). */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
};

export function Stagger({ children, className }: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}
