'use client';

import { useEffect, useRef } from 'react';

type Node = { x: number; y: number; vx: number; vy: number; r: number };

/**
 * Ambient site background: a slow particle constellation on canvas, a faint
 * technical grid, and two drifting gradient orbs.
 *
 * Performance guards:
 *  - particle count scales with viewport, capped low
 *  - rAF loop pauses when the tab is hidden
 *  - canvas is skipped entirely for `prefers-reduced-motion`
 *  - DPR capped at 2 so 3x phones don't render 9x the pixels
 */
export function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;
    let running = true;

    const pointer = { x: -9999, y: -9999, active: false };

    const readAccent = () => {
      const styles = getComputedStyle(document.documentElement);
      const raw = styles.getPropertyValue('--c-accent').trim() || '96 165 250';
      return raw.split(/\s+/).join(',');
    };
    let accent = readAccent();

    const build = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = width < 640 ? 17000 : width < 1280 ? 14000 : 12000;
      const count = Math.min(Math.round((width * height) / density), 64);

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.17,
        vy: (Math.random() - 0.5) * 0.17,
        r: Math.random() * 1.3 + 0.7,
      }));
    };

    const linkDistance = () => (width < 768 ? 120 : 158);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const maxDist = linkDistance();

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      // Connections — faint, and brighter near the cursor.
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > maxDist) continue;

          let alpha = (1 - dist / maxDist) * 0.16;

          if (pointer.active) {
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            const pd = Math.hypot(midX - pointer.x, midY - pointer.y);
            if (pd < 190) alpha += (1 - pd / 190) * 0.3;
          }

          ctx.strokeStyle = `rgba(${accent},${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Nodes
      for (const n of nodes) {
        let alpha = 0.3;
        if (pointer.active) {
          const pd = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          if (pd < 190) alpha += (1 - pd / 190) * 0.5;
        }
        ctx.fillStyle = `rgba(${accent},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running) raf = requestAnimationFrame(draw);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 180);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };

    // Re-read the accent colour when the theme class flips.
    const themeObserver = new MutationObserver(() => {
      accent = readAccent();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    build();
    raf = requestAnimationFrame(draw);

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Base wash */}
      <div className="absolute inset-0 bg-bg" />

      {/* Technical grid, faded towards the bottom */}
      <div
        className="absolute inset-0 bg-grid-fade opacity-[0.16] mask-fade-b dark:opacity-[0.1]"
        style={{ backgroundSize: '58px 58px' }}
      />

      {/* Drifting gradient orbs */}
      <div
        className="orb animate-drift"
        style={{
          top: '-14%',
          left: '-8%',
          width: '46vw',
          height: '46vw',
          background:
            'radial-gradient(circle at 30% 30%, rgb(var(--c-accent) / 0.30), transparent 68%)',
          animationDelay: '-4s',
        }}
      />
      <div
        className="orb animate-drift"
        style={{
          top: '28%',
          right: '-12%',
          width: '42vw',
          height: '42vw',
          background:
            'radial-gradient(circle at 60% 40%, rgb(var(--c-violet) / 0.26), transparent 70%)',
          animationDelay: '-13s',
        }}
      />
      <div
        className="orb animate-drift"
        style={{
          bottom: '-16%',
          left: '26%',
          width: '38vw',
          height: '38vw',
          background:
            'radial-gradient(circle at 50% 50%, rgb(var(--c-cyan) / 0.16), transparent 72%)',
          animationDelay: '-21s',
        }}
      />

      {/* Particle constellation */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Vignette keeps text contrast high over the effects */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 0%, transparent 35%, rgb(var(--c-bg) / 0.55) 100%)',
        }}
      />
    </div>
  );
}
