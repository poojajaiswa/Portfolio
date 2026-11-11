import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion language for the whole site.
 * Typed as a 4-tuple so Framer Motion accepts it as a cubic bezier curve.
 */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const SPRING: Transition = { type: 'spring', stiffness: 360, damping: 30 };

/** Viewport config for scroll-triggered animations: play once, slightly early. */
export const ONCE_IN_VIEW = { once: true, margin: '-60px 0px -80px 0px' } as const;

export const fadeUpParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
};

export const fadeUpChild: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
