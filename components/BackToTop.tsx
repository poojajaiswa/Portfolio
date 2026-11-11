'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EASE } from '@/lib/motion';

export function BackToTop() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setShow(window.scrollY > window.innerHeight * 0.9);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="back-to-top"
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
          }
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="fixed bottom-6 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-xl glass-strong text-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:text-accent sm:bottom-8 sm:right-8"
        >
          <ArrowUp className="h-[18px] w-[18px]" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
