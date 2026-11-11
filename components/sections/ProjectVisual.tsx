'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type React from 'react';
import type { Project } from '@/lib/content';
import { EASE } from '@/lib/motion';

/**
 * Hand-built technical illustration per project — no stock imagery, no fake
 * screenshots. Each variant abstracts the project's real architecture.
 * Everything is drawn with theme tokens so it adapts to dark and light.
 */

const A = 'rgb(var(--c-accent))';
const V = 'rgb(var(--c-violet))';
const C = 'rgb(var(--c-cyan))';
const MUTED = 'rgb(var(--c-muted))';
const LINE = 'rgb(var(--c-border))';

const ONCE = { once: true } as const;

/** Draw-on animation for connector paths. */
const dash = (delay = 0) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: ONCE,
  transition: { duration: 1, delay, ease: EASE },
});

/** Scale-in animation for blocks and nodes. */
const pop = (delay = 0) => ({
  initial: { scale: 0.7, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  viewport: ONCE,
  transition: { duration: 0.5, delay, ease: EASE },
});

/* ------------------------------- variants ------------------------------- */

function InterviewVisual() {
  return (
    <>
      {/* Mic capture */}
      <motion.g {...pop(0.05)}>
        <circle cx="62" cy="96" r="26" fill={`${A}`} fillOpacity="0.12" stroke={A} strokeWidth="1.2" />
        <rect x="56" y="83" width="12" height="18" rx="6" fill={A} />
        <path d="M50 99a12 12 0 0024 0" stroke={A} strokeWidth="1.6" fill="none" />
        <line x1="62" y1="111" x2="62" y2="117" stroke={A} strokeWidth="1.6" />
      </motion.g>
      <text x="62" y="140" fill={MUTED} fontSize="8" textAnchor="middle" fontFamily="monospace">
        SPEECH-TO-TEXT
      </text>

      {/* Waveform */}
      <g>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const h = [10, 20, 32, 14, 26, 36, 18, 11][i];
          return (
            <motion.rect
              key={i}
              x={104 + i * 9}
              y={96 - h / 2}
              width="3.5"
              rx="1.75"
              height={h}
              fill={i % 2 ? C : A}
              fillOpacity="0.75"
              initial={{ scaleY: 0.2, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + i * 0.05, duration: 0.4 }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          );
        })}
      </g>

      {/* LLM core */}
      <motion.g {...pop(0.35)}>
        <rect x="190" y="68" width="80" height="56" rx="14" fill={V} fillOpacity="0.14" stroke={V} strokeWidth="1.2" />
        <text x="230" y="92" fill="rgb(var(--c-text))" fontSize="10" textAnchor="middle" fontWeight="600">
          Gemini
        </text>
        <text x="230" y="106" fill={MUTED} fontSize="7.5" textAnchor="middle" fontFamily="monospace">
          Q-GEN + EVAL
        </text>
      </motion.g>

      <motion.path d="M178 96h10" stroke={A} strokeWidth="1.4" fill="none" {...dash(0.3)} />
      <motion.path d="M272 96h18" stroke={V} strokeWidth="1.4" fill="none" {...dash(0.5)} />

      {/* Score ring */}
      <motion.g {...pop(0.6)}>
        <circle cx="330" cy="96" r="30" fill="none" stroke={LINE} strokeWidth="5" />
        <motion.circle
          cx="330"
          cy="96"
          r="30"
          fill="none"
          stroke={C}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="188"
          initial={{ strokeDashoffset: 188 }}
          whileInView={{ strokeDashoffset: 56 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.7, ease: EASE }}
          transform="rotate(-90 330 96)"
        />
        <text x="330" y="100" fill="rgb(var(--c-text))" fontSize="13" textAnchor="middle" fontWeight="700">
          7/10
        </text>
      </motion.g>
      <text x="330" y="140" fill={MUTED} fontSize="8" textAnchor="middle" fontFamily="monospace">
        AI FEEDBACK
      </text>

      {/* Role chips */}
      <g>
        {['Data Scientist', 'ML Engineer'].map((r, i) => (
          <motion.g key={r} {...pop(0.12 + i * 0.1)}>
            <rect x={120} y={30 + i * 18} width="86" height="14" rx="7" fill={LINE} fillOpacity="0.5" />
            <text x={163} y={40 + i * 18} fill={MUTED} fontSize="7.5" textAnchor="middle">
              {r}
            </text>
          </motion.g>
        ))}
      </g>
    </>
  );
}

function AgentsVisual() {
  const agents = [
    { x: 92, y: 52, label: 'PLAN' },
    { x: 92, y: 148, label: 'RESEARCH' },
    { x: 310, y: 52, label: 'TOOLS' },
    { x: 310, y: 148, label: 'VERIFY' },
  ];

  return (
    <>
      {/* Links */}
      {agents.map((a, i) => (
        <motion.path
          key={a.label}
          d={`M201 100 L${a.x} ${a.y}`}
          stroke={i % 2 ? V : A}
          strokeWidth="1.2"
          strokeDasharray="4 4"
          fill="none"
          {...dash(0.2 + i * 0.1)}
        />
      ))}

      {/* Orchestrator */}
      <motion.g {...pop(0.05)}>
        <circle cx="201" cy="100" r="42" fill={V} fillOpacity="0.1" stroke={V} strokeWidth="1.3" />
        <circle cx="201" cy="100" r="29" fill="none" stroke={V} strokeWidth="0.8" strokeOpacity="0.5" strokeDasharray="3 5" />
        <text x="201" y="97" fill="rgb(var(--c-text))" fontSize="9.5" textAnchor="middle" fontWeight="700">
          ORCHESTRATOR
        </text>
        <text x="201" y="110" fill={MUTED} fontSize="7" textAnchor="middle" fontFamily="monospace">
          ROUTE · DELEGATE
        </text>
      </motion.g>

      {/* Agents */}
      {agents.map((a, i) => (
        <motion.g key={`node-${a.label}`} {...pop(0.4 + i * 0.1)}>
          <rect
            x={a.x - 40}
            y={a.y - 17}
            width="80"
            height="34"
            rx="10"
            fill="rgb(var(--c-surface))"
            fillOpacity="0.85"
            stroke={i % 2 ? A : C}
            strokeWidth="1.1"
          />
          <circle cx={a.x - 27} cy={a.y} r="4.5" fill={i % 2 ? A : C} />
          <text x={a.x + 6} y={a.y + 3} fill="rgb(var(--c-text))" fontSize="8" textAnchor="middle" fontFamily="monospace">
            {a.label}
          </text>
        </motion.g>
      ))}

      {/* Shared context bar */}
      <motion.g {...pop(0.85)}>
        <rect x="120" y="183" width="162" height="20" rx="10" fill={C} fillOpacity="0.1" stroke={C} strokeWidth="1" />
        <text x="201" y="196" fill={MUTED} fontSize="7.5" textAnchor="middle" fontFamily="monospace">
          SHARED CONTEXT + MEMORY
        </text>
      </motion.g>

      {/* In-development marker */}
      <motion.g {...pop(1)}>
        <rect x="150" y="14" width="102" height="18" rx="9" fill="rgb(251 191 36 / 0.14)" stroke="rgb(251 191 36 / 0.5)" strokeWidth="1" />
        <text x="201" y="26" fill="rgb(251 191 36)" fontSize="7.5" textAnchor="middle" fontFamily="monospace">
          IN DEVELOPMENT
        </text>
      </motion.g>
    </>
  );
}

function FaceVisual() {
  return (
    <>
      {/* Camera viewport */}
      <motion.g {...pop(0.05)}>
        <rect x="42" y="36" width="170" height="128" rx="12" fill="rgb(var(--c-surface))" fillOpacity="0.5" stroke={LINE} strokeWidth="1.2" />
        {/* viewport corners */}
        {[
          [52, 46, 1, 1],
          [202, 46, -1, 1],
          [52, 154, 1, -1],
          [202, 154, -1, -1],
        ].map(([x, y, sx, sy], i) => (
          <path
            key={i}
            d={`M${x} ${(y as number) + 12 * (sy as number)} L${x} ${y} L${(x as number) + 12 * (sx as number)} ${y}`}
            stroke={C}
            strokeWidth="1.6"
            fill="none"
          />
        ))}
      </motion.g>

      {/* Face abstraction + detection box */}
      <motion.g {...pop(0.3)}>
        <circle cx="127" cy="88" r="25" fill={A} fillOpacity="0.14" stroke={A} strokeWidth="1.1" />
        <path d="M94 150a33 33 0 0166 0" fill={A} fillOpacity="0.1" stroke={A} strokeWidth="1.1" />
        {/* landmarks */}
        {[
          [117, 83],
          [137, 83],
          [127, 93],
          [120, 100],
          [134, 100],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.6" fill={C} />
        ))}
      </motion.g>

      <motion.rect
        x="96"
        y="58"
        width="62"
        height="62"
        rx="4"
        fill="none"
        stroke="rgb(239 68 68)"
        strokeWidth="1.5"
        strokeDasharray="7 5"
        initial={{ opacity: 0, scale: 1.2 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />
      <motion.g {...pop(0.75)}>
        <rect x="96" y="44" width="78" height="13" rx="3" fill="rgb(239 68 68 / 0.9)" />
        <text x="135" y="53.5" fill="#fff" fontSize="7" textAnchor="middle" fontFamily="monospace">
          UNAUTHORISED
        </text>
      </motion.g>

      {/* Scan line */}
      <motion.rect
        x="44"
        y="38"
        width="166"
        height="2"
        fill={C}
        fillOpacity="0.5"
        initial={{ y: 42 }}
        whileInView={{ y: 156 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />

      {/* Pipeline */}
      <motion.path d="M218 100h20" stroke={A} strokeWidth="1.4" fill="none" {...dash(0.7)} />
      {[
        { y: 46, label: 'CNN MATCH', color: V },
        { y: 90, label: 'SCREEN LOCK', color: 'rgb(239 68 68)' },
        { y: 134, label: 'MONGODB LOG', color: C },
      ].map((row, i) => (
        <motion.g key={row.label} {...pop(0.8 + i * 0.12)}>
          <rect
            x="244"
            y={row.y}
            width="118"
            height="30"
            rx="9"
            fill="rgb(var(--c-surface))"
            fillOpacity="0.8"
            stroke={row.color}
            strokeWidth="1.1"
            strokeOpacity="0.6"
          />
          <circle cx="259" cy={row.y + 15} r="4" fill={row.color} />
          <text x="276" y={row.y + 18} fill="rgb(var(--c-text))" fontSize="7.5" fontFamily="monospace">
            {row.label}
          </text>
        </motion.g>
      ))}
    </>
  );
}

function TrafficVisual() {
  const cars = [
    { x: 62, y: 62, w: 52, h: 30, id: 'ID 04' },
    { x: 152, y: 104, w: 60, h: 34, id: 'ID 07' },
    { x: 256, y: 56, w: 48, h: 28, id: 'ID 11' },
  ];

  return (
    <>
      {/* Road */}
      <motion.g {...pop(0.05)}>
        <path d="M30 170 L120 36 L300 36 L380 170 Z" fill={LINE} fillOpacity="0.22" />
        {[0, 1, 2, 3].map((i) => (
          <motion.rect
            key={i}
            x={203}
            y={44 + i * 32}
            width="4"
            height="18"
            rx="2"
            fill={MUTED}
            fillOpacity="0.45"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.07 }}
          />
        ))}
      </motion.g>

      {/* Detections */}
      {cars.map((c2, i) => (
        <motion.g key={c2.id} {...pop(0.3 + i * 0.13)}>
          <rect
            x={c2.x}
            y={c2.y}
            width={c2.w}
            height={c2.h}
            rx="4"
            fill={A}
            fillOpacity="0.1"
            stroke={i === 1 ? C : A}
            strokeWidth="1.5"
          />
          <rect x={c2.x} y={c2.y - 12} width="34" height="11" rx="2.5" fill={i === 1 ? C : A} />
          <text x={c2.x + 17} y={c2.y - 3.5} fill="rgb(var(--c-bg))" fontSize="6.5" textAnchor="middle" fontFamily="monospace" fontWeight="700">
            {c2.id}
          </text>
          {/* tracking trail */}
          <motion.path
            d={`M${c2.x + c2.w / 2} ${c2.y + c2.h} q -6 22 -14 38`}
            stroke={i === 1 ? C : A}
            strokeWidth="1"
            strokeDasharray="3 3"
            fill="none"
            {...dash(0.6 + i * 0.1)}
          />
        </motion.g>
      ))}

      {/* Live counter panel */}
      <motion.g {...pop(0.75)}>
        <rect x="272" y="104" width="104" height="76" rx="10" fill="rgb(var(--c-surface))" fillOpacity="0.9" stroke={LINE} strokeWidth="1" />
        <text x="286" y="122" fill={MUTED} fontSize="7" fontFamily="monospace">
          LIVE COUNT
        </text>
        <text x="286" y="142" fill="rgb(var(--c-text))" fontSize="17" fontWeight="700">
          128
        </text>
        {/* mini plot */}
        <motion.path
          d="M286 170 L300 160 L314 165 L328 150 L342 156 L360 142"
          stroke={C}
          strokeWidth="1.6"
          fill="none"
          {...dash(1)}
        />
      </motion.g>

      <motion.g {...pop(0.2)}>
        <rect x="30" y="14" width="96" height="17" rx="8" fill={V} fillOpacity="0.14" stroke={V} strokeWidth="1" />
        <text x="78" y="26" fill={V} fontSize="7.5" textAnchor="middle" fontFamily="monospace">
          YOLOv8 + SORT
        </text>
      </motion.g>
    </>
  );
}

function IdsVisual() {
  const nodes = [
    { x: 70, y: 60 },
    { x: 70, y: 140 },
    { x: 136, y: 100 },
    { x: 136, y: 42 },
    { x: 136, y: 158 },
  ];

  return (
    <>
      {/* Network mesh */}
      <g>
        {nodes.map((n, i) =>
          nodes.slice(i + 1).map((m, j) => (
            <motion.line
              key={`${i}-${j}`}
              x1={n.x}
              y1={n.y}
              x2={m.x}
              y2={m.y}
              stroke={LINE}
              strokeWidth="0.8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + (i + j) * 0.04 }}
            />
          )),
        )}
        {nodes.map((n, i) => (
          <motion.circle
            key={`n-${i}`}
            cx={n.x}
            cy={n.y}
            r={i === 2 ? 8 : 5.5}
            fill={i === 2 ? V : A}
            fillOpacity={i === 2 ? 0.9 : 0.6}
            {...pop(0.15 + i * 0.06)}
          />
        ))}
        {/* flagged packet */}
        <motion.circle cx="70" cy="140" r="11" fill="none" stroke="rgb(239 68 68)" strokeWidth="1.4" {...pop(0.55)} />
      </g>

      <text x="103" y="188" fill={MUTED} fontSize="7.5" textAnchor="middle" fontFamily="monospace">
        NETWORK TRAFFIC
      </text>

      <motion.path d="M152 100h26" stroke={A} strokeWidth="1.4" fill="none" {...dash(0.5)} />

      {/* Ensemble classifiers */}
      {[
        { y: 52, label: 'RANDOM FOREST' },
        { y: 118, label: 'XGBOOST' },
      ].map((m, i) => (
        <motion.g key={m.label} {...pop(0.6 + i * 0.12)}>
          <rect x="182" y={m.y} width="104" height="30" rx="9" fill={V} fillOpacity="0.12" stroke={V} strokeWidth="1.1" />
          <text x="234" y={m.y + 19} fill="rgb(var(--c-text))" fontSize="7.5" textAnchor="middle" fontFamily="monospace">
            {m.label}
          </text>
        </motion.g>
      ))}

      <motion.path d="M290 67h14l0 33h12" stroke={V} strokeWidth="1.2" fill="none" {...dash(0.85)} />
      <motion.path d="M290 133h14l0 -33h12" stroke={V} strokeWidth="1.2" fill="none" {...dash(0.9)} />

      {/* Verdict bars */}
      <motion.g {...pop(1)}>
        <rect x="318" y="58" width="62" height="84" rx="10" fill="rgb(var(--c-surface))" fillOpacity="0.9" stroke={LINE} strokeWidth="1" />
        {[
          { label: 'NORMAL', w: 40, color: C, y: 74 },
          { label: 'THREAT', w: 24, color: 'rgb(239 68 68)', y: 106 },
        ].map((b) => (
          <g key={b.label}>
            <text x="328" y={b.y} fill={MUTED} fontSize="6.5" fontFamily="monospace">
              {b.label}
            </text>
            <rect x="328" y={b.y + 5} width="44" height="5" rx="2.5" fill={LINE} />
            <motion.rect
              x="328"
              y={b.y + 5}
              height="5"
              rx="2.5"
              fill={b.color}
              initial={{ width: 0 }}
              whileInView={{ width: b.w }}
              viewport={{ once: true }}
              transition={{ delay: 1.15, duration: 0.8, ease: EASE }}
            />
          </g>
        ))}
      </motion.g>
    </>
  );
}

/* --------------------------------- shell -------------------------------- */

const variants: Record<Project['visual'], React.ComponentType> = {
  interview: InterviewVisual,
  agents: AgentsVisual,
  face: FaceVisual,
  traffic: TrafficVisual,
  ids: IdsVisual,
};

export function ProjectVisual({
  variant,
  label,
}: {
  variant: Project['visual'];
  label: string;
}) {
  const reduce = useReducedMotion();
  const Body = variants[variant];

  return (
    <div className="group/visual relative overflow-hidden rounded-2xl glass">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-line/80 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-red-400/60" />
          <span className="h-2 w-2 rounded-full bg-amber-400/60" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
        </span>
        <span className="ml-1 truncate font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted">
          {label}
        </span>
      </div>

      <div className="relative">
        {/* grid + glow backdrop */}
        <div
          className="absolute inset-0 bg-grid-fade opacity-[0.3]"
          style={{ backgroundSize: '26px 26px' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover/visual:opacity-100"
          style={{
            background:
              'radial-gradient(70% 60% at 50% 40%, rgb(var(--c-accent) / 0.16), transparent 70%)',
          }}
          aria-hidden="true"
        />
        <svg
          viewBox="0 0 402 215"
          className="relative block w-full"
          role="img"
          aria-label={`Architecture diagram for ${label}`}
        >
          {reduce ? (
            <g opacity="1">
              <Body />
            </g>
          ) : (
            <Body />
          )}
        </svg>
      </div>
    </div>
  );
}
