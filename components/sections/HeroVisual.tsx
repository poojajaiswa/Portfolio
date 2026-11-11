'use client';

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useCallback } from 'react';
import { heroTechLabels } from '@/lib/content';
import { EASE } from '@/lib/motion';

/* ---- network geometry -------------------------------------------------- */

const LAYERS: { x: number; ys: number[] }[] = [
  { x: 54, ys: [108, 178, 248, 318] },
  { x: 164, ys: [78, 143, 208, 273, 338] },
  { x: 274, ys: [78, 143, 208, 273, 338] },
  { x: 384, ys: [143, 208, 273] },
];

type Edge = { x1: number; y1: number; x2: number; y2: number; key: string };

const EDGES: Edge[] = LAYERS.slice(0, -1).flatMap((layer, li) =>
  layer.ys.flatMap((y1) =>
    LAYERS[li + 1].ys.map((y2) => ({
      x1: layer.x,
      y1,
      x2: LAYERS[li + 1].x,
      y2,
      key: `${li}-${y1}-${y2}`,
    })),
  ),
);

/** A deterministic subset of edges carries an animated signal pulse. */
const FLOW_EDGES = EDGES.filter((_, i) => i % 7 === 0);

/* ---- floating technology labels --------------------------------------- */

/**
 * Offsets stay within a few percent of the frame so the labels never clip
 * outside the page gutter on narrow phones (body hides horizontal overflow).
 */
const LABEL_POSITIONS = [
  { top: '4%', left: '-1%', depth: 26 },
  { top: '17%', right: '-2%', depth: 18 },
  { top: '46%', left: '-4%', depth: 32 },
  { bottom: '20%', right: '-3%', depth: 22 },
  { bottom: '2%', left: '7%', depth: 14 },
  { top: '70%', right: '7%', depth: 28 },
] as const;

export function HeroVisual() {
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 110, damping: 20 });
  const sy = useSpring(my, { stiffness: 110, damping: 20 });

  const rotateY = useTransform(sx, [-0.5, 0.5], [9, -9]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-7, 7]);

  /**
   * Parallax offsets for the floating labels. Hooks cannot run inside a loop,
   * so one transform pair is declared per fixed label slot up front.
   */
  const d = LABEL_POSITIONS.map((p) => p.depth);
  const labelX = [
    useTransform(sx, [-0.5, 0.5], [d[0], -d[0]]),
    useTransform(sx, [-0.5, 0.5], [d[1], -d[1]]),
    useTransform(sx, [-0.5, 0.5], [d[2], -d[2]]),
    useTransform(sx, [-0.5, 0.5], [d[3], -d[3]]),
    useTransform(sx, [-0.5, 0.5], [d[4], -d[4]]),
    useTransform(sx, [-0.5, 0.5], [d[5], -d[5]]),
  ];
  const labelY = [
    useTransform(sy, [-0.5, 0.5], [d[0] * 0.6, -d[0] * 0.6]),
    useTransform(sy, [-0.5, 0.5], [d[1] * 0.6, -d[1] * 0.6]),
    useTransform(sy, [-0.5, 0.5], [d[2] * 0.6, -d[2] * 0.6]),
    useTransform(sy, [-0.5, 0.5], [d[3] * 0.6, -d[3] * 0.6]),
    useTransform(sy, [-0.5, 0.5], [d[4] * 0.6, -d[4] * 0.6]),
    useTransform(sy, [-0.5, 0.5], [d[5] * 0.6, -d[5] * 0.6]),
  ];

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduce || e.pointerType === 'touch') return;
      const rect = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mx, my, reduce],
  );

  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <div
      className="relative mx-auto w-full max-w-[520px]"
      style={{ perspective: '1200px' }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        className="relative aspect-square w-full"
        style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY, transformStyle: 'preserve-3d' }}
      >
        {/* Ambient glow behind the network */}
        <div
          className="absolute inset-[8%] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgb(var(--c-accent) / 0.26), rgb(var(--c-violet) / 0.18) 45%, transparent 72%)',
          }}
          aria-hidden="true"
        />

        {/* Rotating technical rings */}
        <div
          className="absolute inset-[3%] rounded-full border border-dashed border-line/70 ring-spin"
          aria-hidden="true"
        />
        <div
          className="absolute inset-[14%] rounded-full border border-line/50 ring-spin-reverse"
          aria-hidden="true"
        >
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_12px_2px_rgb(var(--c-cyan)/0.7)]" />
        </div>

        {/* The network */}
        <svg
          viewBox="0 0 438 416"
          className="relative h-full w-full"
          role="img"
          aria-label="Abstract illustration of a neural network with interconnected nodes representing layered AI model architecture"
        >
          <defs>
            <linearGradient id="hv-edge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(var(--c-accent))" stopOpacity="0.1" />
              <stop offset="50%" stopColor="rgb(var(--c-violet))" stopOpacity="0.32" />
              <stop offset="100%" stopColor="rgb(var(--c-cyan))" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="hv-flow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(var(--c-cyan))" />
              <stop offset="100%" stopColor="rgb(var(--c-accent))" />
            </linearGradient>
            <radialGradient id="hv-node" cx="35%" cy="30%">
              <stop offset="0%" stopColor="rgb(var(--c-cyan))" />
              <stop offset="100%" stopColor="rgb(var(--c-accent))" />
            </radialGradient>
            <radialGradient id="hv-node-out" cx="35%" cy="30%">
              <stop offset="0%" stopColor="rgb(var(--c-violet))" />
              <stop offset="100%" stopColor="rgb(var(--c-accent))" />
            </radialGradient>
            <filter id="hv-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Static connections */}
          <g stroke="url(#hv-edge)" strokeWidth="0.9">
            {EDGES.map((e) => (
              <line key={e.key} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} />
            ))}
          </g>

          {/* Animated signal pulses */}
          {!reduce && (
            <g stroke="url(#hv-flow)" strokeWidth="1.8" strokeLinecap="round">
              {FLOW_EDGES.map((e, i) => (
                <line
                  key={`flow-${e.key}`}
                  x1={e.x1}
                  y1={e.y1}
                  x2={e.x2}
                  y2={e.y2}
                  className="edge-flow"
                  style={{ animationDelay: `${(i % 9) * 0.36}s` }}
                />
              ))}
            </g>
          )}

          {/* Nodes */}
          {LAYERS.map((layer, li) => (
            <g key={`layer-${li}`} filter="url(#hv-glow)">
              {layer.ys.map((y, ni) => {
                const isOutput = li === LAYERS.length - 1;
                return (
                  <circle
                    key={`${li}-${y}`}
                    cx={layer.x}
                    cy={y}
                    r={isOutput ? 6.5 : 5}
                    fill={isOutput ? 'url(#hv-node-out)' : 'url(#hv-node)'}
                    className={reduce ? undefined : 'node-breathe'}
                    style={{ animationDelay: `${(li * 5 + ni) * 0.22}s` }}
                  />
                );
              })}
            </g>
          ))}

          {/* Layer captions */}
          <g
            fill="rgb(var(--c-muted))"
            fontSize="8.5"
            fontFamily="var(--font-mono), monospace"
            letterSpacing="1.6"
            textAnchor="middle"
          >
            <text x="54" y="372">INPUT</text>
            <text x="164" y="372">EMBED</text>
            <text x="274" y="372">REASON</text>
            <text x="384" y="372">OUTPUT</text>
          </g>
        </svg>

        {/* Floating technology labels */}
        {heroTechLabels.slice(0, LABEL_POSITIONS.length).map((label, i) => {
          const { depth: _depth, ...placement } = LABEL_POSITIONS[i];
          return (
            <motion.span
              key={label}
              className="absolute z-10 inline-flex items-center gap-1.5 rounded-xl glass-strong px-3 py-1.5 font-mono text-[10.5px] font-medium tracking-wide text-ink shadow-[0_10px_26px_-18px_rgb(2_6_23_/_0.8)]"
              style={{
                ...placement,
                x: reduce ? 0 : labelX[i],
                y: reduce ? 0 : labelY[i],
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: EASE }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background:
                    i % 3 === 0
                      ? 'rgb(var(--c-cyan))'
                      : i % 3 === 1
                        ? 'rgb(var(--c-accent))'
                        : 'rgb(var(--c-violet))',
                }}
                aria-hidden="true"
              />
              {label}
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
}
