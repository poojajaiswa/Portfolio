'use client';

import { motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Github,
  Globe2,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { isLinkReady, site } from '@/lib/config';
import { contact } from '@/lib/content';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

type FormState = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

type Fields = { name: string; email: string; subject: string; message: string };

const EMPTY: Fields = { name: '', email: '', subject: '', message: '' };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Contact() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [state, setState] = useState<FormState>('idle');
  /** Simple bot trap — real visitors never fill a hidden field. */
  const [trap, setTrap] = useState('');

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Fields> = {};
    if (!fields.name.trim()) next.name = 'Please enter your name.';
    if (!fields.email.trim()) next.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(fields.email.trim())) next.email = 'Please enter a valid email address.';
    if (!fields.subject.trim()) next.subject = 'Please add a subject.';
    if (fields.message.trim().length < 10) next.message = 'Please write at least 10 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const openMailto = () => {
    const body = `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      fields.subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (trap) return; // bot
    if (!validate()) return;

    setState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });

      if (res.ok) {
        setState('sent');
        setFields(EMPTY);
        return;
      }

      // 501 = no email provider configured on this deployment.
      if (res.status === 501) {
        setState('mailto');
        openMailto();
        return;
      }

      setState('error');
    } catch {
      setState('mailto');
      openMailto();
    }
  };

  const details = [
    { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: 'Phone', value: site.phone, href: `tel:${site.phoneHref}` },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: isLinkReady(site.socials.linkedin) ? 'View profile' : 'Add URL in lib/config.ts',
      href: isLinkReady(site.socials.linkedin) ? site.socials.linkedin : null,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: isLinkReady(site.socials.github) ? 'View profile' : 'Add URL in lib/config.ts',
      href: isLinkReady(site.socials.github) ? site.socials.github : null,
    },
    { icon: MapPin, label: 'Location', value: site.locationShort, href: null },
    { icon: Globe2, label: 'Availability', value: 'Remote & onsite', href: null },
  ] as const;

  return (
    <Section id="contact" aria-label="Contact">
      <SectionHeading
        eyebrow="Get in touch"
        title="Let's Build Something"
        accent="Intelligent Together."
        description={contact.description}
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
        {/* --------------------------- Contact details -------------------------- */}
        <div className="space-y-4">
          <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {details.map((d) => {
              const Glyph = d.icon;
              const inner = (
                <>
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface/70 text-accent transition-all duration-500 group-hover:border-accent/40 group-hover:bg-accent/10">
                    <Glyph className="h-[17px] w-[17px]" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted">
                      {d.label}
                    </span>
                    <span className="mt-1 block truncate text-[13px] text-ink">{d.value}</span>
                  </span>
                </>
              );

              return (
                <StaggerItem key={d.label}>
                  {d.href ? (
                    <a
                      href={d.href}
                      {...(d.href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="group card card-hover flex items-center gap-3.5 p-4"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group card flex items-center gap-3.5 p-4">{inner}</div>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>

          <Reveal from="up" delay={0.1}>
            <div className="flex items-start gap-3 rounded-2xl border border-accent/20 bg-accent/[0.06] p-4">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <p className="text-[12.5px] leading-relaxed text-muted">
                Based in {site.locationShort} (IST). Open to remote and onsite roles — I usually
                reply to email within a day.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ------------------------------- Form ------------------------------- */}
        <Reveal from="left">
          <form
            onSubmit={onSubmit}
            noValidate
            className="relative overflow-hidden rounded-3xl glass-strong p-6 sm:p-7"
          >
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgb(var(--c-violet) / 0.26), transparent 70%)',
              }}
              aria-hidden="true"
            />

            <div className="relative">
              <h3 className="font-display text-lg font-semibold">Send a message</h3>
              <p className="mt-1.5 text-[12.5px] text-muted">
                Tell me about the role, project, or idea — I read every message.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="cf-name">
                    Name
                  </label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={fields.name}
                    onChange={set('name')}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'cf-name-err' : undefined}
                    className="field"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p id="cf-name-err" className="mt-1.5 text-[11.5px] text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="label" htmlFor="cf-email">
                    Email
                  </label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={fields.email}
                    onChange={set('email')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'cf-email-err' : undefined}
                    className="field"
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <p id="cf-email-err" className="mt-1.5 text-[11.5px] text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="label" htmlFor="cf-subject">
                  Subject
                </label>
                <input
                  id="cf-subject"
                  name="subject"
                  type="text"
                  value={fields.subject}
                  onChange={set('subject')}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'cf-subject-err' : undefined}
                  className="field"
                  placeholder="Opportunity, collaboration, or question"
                />
                {errors.subject && (
                  <p id="cf-subject-err" className="mt-1.5 text-[11.5px] text-red-400">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label className="label" htmlFor="cf-message">
                  Message
                </label>
                <textarea
                  id="cf-message"
                  name="message"
                  rows={5}
                  value={fields.message}
                  onChange={set('message')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'cf-message-err' : undefined}
                  className="field resize-y"
                  placeholder="A few lines about what you're working on..."
                />
                {errors.message && (
                  <p id="cf-message-err" className="mt-1.5 text-[11.5px] text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Honeypot — visually hidden, never announced */}
              <div className="absolute left-[-9999px] top-0" aria-hidden="true">
                <label htmlFor="cf-company">Company</label>
                <input
                  id="cf-company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={trap}
                  onChange={(e) => setTrap(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={state === 'sending'}
                className="btn-primary mt-6 w-full disabled:cursor-wait disabled:opacity-70"
              >
                {state === 'sending' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Send message
                  </>
                )}
              </button>

              {/* Status */}
              <div aria-live="polite" className="min-h-[1.5rem]">
                {state === 'sent' && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-3 text-[12.5px] text-emerald-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    Thank you — your message has been sent. I&apos;ll get back to you soon.
                  </motion.p>
                )}

                {state === 'mailto' && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-start gap-2 rounded-xl border border-accent/25 bg-accent/10 p-3 text-[12.5px] text-muted"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>
                      Your mail app should now be open with the message ready to send. If nothing
                      happened, email me directly at{' '}
                      <a href={`mailto:${site.email}`} className="text-accent underline">
                        {site.email}
                      </a>
                      .
                    </span>
                  </motion.p>
                )}

                {state === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-start gap-2 rounded-xl border border-red-400/25 bg-red-400/10 p-3 text-[12.5px] text-red-300"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>
                      Something went wrong sending the message. Please email me directly at{' '}
                      <a href={`mailto:${site.email}`} className="underline">
                        {site.email}
                      </a>
                      .
                    </span>
                  </motion.p>
                )}
              </div>

              <p className="mt-4 text-[11px] leading-relaxed text-muted/80">
                Your details are only used to reply to this message.
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
