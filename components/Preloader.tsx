'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { site } from '@/lib/config';
import { EASE } from '@/lib/motion';

/**
 * Brief branded loading curtain. It never blocks for long: it clears on
 * `window.load` or after a hard 1100 ms cap, whichever comes first, and is
 * skipped outright for reduced-motion visitors.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(!reduce);

  useEffect(() => {
    if (reduce) {
      setVisible(false);
      return;
    }

    const hide = () => setVisible(false);
    const cap = window.setTimeout(hide, 1100);

    if (document.readyState === 'complete') {
      const quick = window.setTimeout(hide, 520);
      return () => {
        window.clearTimeout(cap);
        window.clearTimeout(quick);
      };
    }

    window.addEventListener('load', hide, { once: true });
    return () => {
      window.clearTimeout(cap);
      window.removeEventListener('load', hide);
    };
  }, [reduce]);

  // Lock scrolling only while the curtain is up.
  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: EASE } }}
          aria-hidden="true"
        >
          <div className="relative flex h-20 w-20 items-center justify-center">
            <span className="absolute inset-0 rounded-2xl border border-accent/30 animate-pulse-ring" />
            <span
              className="absolute inset-0 rounded-2xl border border-violet/25 animate-pulse-ring"
              style={{ animationDelay: '0.8s' }}
            />
            <motion.span
              className="font-display text-2xl font-semibold gradient-text"
              initial={{ scale: 0.86, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              {site.initials}
            </motion.span>
          </div>

          <div className="mt-7 h-px w-36 overflow-hidden rounded-full bg-line">
            <div className="h-full w-1/2 animate-progress-sweep bg-gradient-to-r from-transparent via-accent to-transparent" />
          </div>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
            Initialising
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
