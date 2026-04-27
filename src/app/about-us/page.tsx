'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const STATS = [
  { value: 5000,  suffix: '+', label: 'Windows & Doors Installed' },
  { value: 12,    suffix: '+', label: 'Years of Craftsmanship' },
  { value: 98,    suffix: '%', label: 'Customer Satisfaction' },
  { value: 3,     suffix: '',  label: 'ISO Certifications' },
];

const TIMELINE = [
  {
    year: '2012',
    title: 'Founded in Pune',
    desc: 'Started with a single workshop and a passion for precision-engineered uPVC systems.',
  },
  {
    year: '2015',
    title: 'ISO 9001 Certified',
    desc: 'Achieved our first international quality certification — a milestone that shaped our culture.',
  },
  {
    year: '2018',
    title: 'State-of-the-art plant',
    desc: 'Moved to a 40,000 sq ft manufacturing facility with German CNC machinery.',
  },
  {
    year: '2021',
    title: '3,000 homes milestone',
    desc: 'Crossed 3,000 installations across Maharashtra, Goa, and Karnataka.',
  },
  {
    year: '2024',
    title: 'Lift & Slide launch',
    desc: 'Introduced large-format Lift & Slide systems — the first Pune-manufactured product of its kind.',
  },
];

const VALUES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Quality Without Compromise',
    desc: 'Every profile, seal, and hardware piece is tested to exceed BIS standards before it leaves our floor.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'On-Time Delivery',
    desc: 'Our project management system ensures site delivery is always on schedule — no surprises.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Customer First',
    desc: 'From free home survey to post-installation support, we treat every project as our own home.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Local Expertise',
    desc: 'Pune-manufactured. No middlemen. Deep knowledge of local climate and building norms.',
  },
];

const TEAM = [
  { name: 'Aditya Kulkarni',  role: 'Founder & CEO',           initials: 'AK', color: 'bg-amber-100 text-amber-800' },
  { name: 'Priya Deshmukh',   role: 'Head of Operations',       initials: 'PD', color: 'bg-sky-100 text-sky-800' },
  { name: 'Rahul Joshi',      role: 'Lead Design Engineer',     initials: 'RJ', color: 'bg-emerald-100 text-emerald-800' },
  { name: 'Sneha Patil',      role: 'Customer Success Manager', initials: 'SP', color: 'bg-rose-100 text-rose-800' },
];

/* ─────────────────────────────────────────────
   Animated counter
───────────────────────────────────────────── */
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─────────────────────────────────────────────
   Fade-in wrapper
───────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-background pt-[72px] overflow-x-hidden">

        {/* ════════════════════════════════════════
            HERO
        ════════════════════════════════════════ */}
        <section className="relative bg-background border-b border-border/40 overflow-hidden">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          {/* Large decorative text */}
          <div
            aria-hidden
            className="absolute -right-8 top-1/2 -translate-y-1/2 text-[clamp(120px,20vw,240px)] font-900 text-foreground/[0.03] leading-none select-none pointer-events-none whitespace-nowrap"
          >
            SINCE 2012
          </div>

          <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-px w-10 bg-primary" />
                  <span className="text-xs font-700 uppercase tracking-[0.22em] text-primary">About Us</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-800 text-foreground leading-[1.1] tracking-tight">
                  Crafting spaces that<br />
                  <span className="text-primary">breathe better.</span>
                </h1>
                <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed">
                  We're a Pune-based manufacturer of precision-engineered uPVC windows and doors —
                  built in India, benchmarked globally, trusted across 5,000+ homes.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/book-survey" className="btn-primary">
                    Book a Free Survey
                    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </Link>
                  <Link href="/gallery" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-500 text-foreground hover:bg-secondary/60 transition-colors duration-200">
                    View Gallery
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right – ISO badge cluster */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex flex-col gap-4 items-end"
            >
              {[
                { badge: 'ISO 9001:2015', label: 'Quality Management' },
                { badge: 'ISO 14001:2015', label: 'Environmental Management' },
                { badge: 'BIS Certified', label: 'Bureau of Indian Standards' },
              ].map((c, i) => (
                <motion.div
                  key={c.badge}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-4 bg-background border border-border/60 rounded-2xl px-5 py-4 shadow-soft"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-800 text-xs text-center leading-tight">
                    ✓
                  </div>
                  <div>
                    <p className="text-sm font-700 text-foreground">{c.badge}</p>
                    <p className="text-xs text-muted-foreground">{c.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            STATS
        ════════════════════════════════════════ */}
        <section className="border-b border-border/40 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {STATS.map((s, i) => (
                <FadeUp key={s.label} delay={i * 0.08} className="text-center">
                  <p className="text-4xl sm:text-5xl font-800 text-primary tabular-nums">
                    <Counter target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground font-500 mt-2 leading-snug">{s.label}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            STORY
        ════════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Visual – stacked cards */}
          <FadeUp className="relative h-[420px] hidden lg:block">
            {/* Background card */}
            <div className="absolute top-8 left-8 right-0 bottom-0 rounded-3xl bg-secondary/50 border border-border/40" />
            {/* Main card */}
            <div className="absolute top-0 left-0 right-8 bottom-8 rounded-3xl bg-primary/8 border border-primary/15 flex flex-col justify-end p-8">
              <p className="text-5xl font-900 text-primary/20 leading-none mb-3">12</p>
              <p className="text-xl font-700 text-foreground">Years perfecting the art of fenestration.</p>
              <p className="text-sm text-muted-foreground mt-2">From a 600 sq ft workshop in Hadapsar to a 40,000 sq ft plant.</p>
            </div>
            {/* Floating chip */}
            <div className="absolute top-6 right-4 bg-background border border-border/60 rounded-xl px-4 py-2.5 shadow-medium text-xs font-600 text-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Pune-Manufactured
            </div>
          </FadeUp>

          {/* Copy */}
          <div>
            <FadeUp>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-primary" />
                <span className="text-xs font-700 uppercase tracking-[0.22em] text-primary">Our Story</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-800 text-foreground leading-tight">
                Built on the belief that<br />good windows change lives.
              </h2>
            </FadeUp>

            <FadeUp delay={0.1} className="mt-6 flex flex-col gap-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
              <p>
                In 2012, our founder Aditya Kulkarni returned from a decade in Germany frustrated by one thing:
                India's homes deserved the same quality fenestration he'd seen in European architecture —
                but without the import prices.
              </p>
              <p>
                He set up a small workshop in Hadapsar, hired four technicians, and started making uPVC
                windows the hard way: by hand-testing every weld, every seal, every hardware fitting.
              </p>
              <p>
                Today, 5,000 homes and three ISO certifications later, that obsession with quality hasn't
                changed — it's just operating at a much larger scale.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ════════════════════════════════════════
            TIMELINE
        ════════════════════════════════════════ */}
        <section className="bg-secondary/30 border-y border-border/40">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
            <FadeUp className="text-center mb-14">
              <span className="text-xs font-700 uppercase tracking-[0.22em] text-primary">Our Journey</span>
              <h2 className="text-3xl sm:text-4xl font-800 text-foreground mt-3">Milestones that shaped us</h2>
            </FadeUp>

            <div className="relative">
              {/* Vertical line — desktop */}
              <div className="hidden lg:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-border/60" />

              <div className="flex flex-col gap-8 lg:gap-10">
                {TIMELINE.map((item, i) => (
                  <FadeUp key={item.year} delay={i * 0.07}>
                    <div className={`flex flex-col lg:flex-row items-start lg:items-center gap-6 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                      {/* Content */}
                      <div className={`flex-1 ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                        <div className={`bg-background border border-border/60 rounded-2xl p-6 shadow-soft inline-block w-full lg:max-w-sm ${i % 2 === 0 ? 'lg:ml-auto' : ''}`}>
                          <p className="text-xs font-700 text-primary uppercase tracking-widest mb-1">{item.year}</p>
                          <p className="text-base font-700 text-foreground">{item.title}</p>
                          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>

                      {/* Centre dot */}
                      <div className="hidden lg:flex shrink-0 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-sm z-10" />

                      {/* Spacer */}
                      <div className="flex-1 hidden lg:block" />
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            VALUES
        ════════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
          <FadeUp className="text-center mb-14">
            <span className="text-xs font-700 uppercase tracking-[0.22em] text-primary">What We Stand For</span>
            <h2 className="text-3xl sm:text-4xl font-800 text-foreground mt-3">Our core values</h2>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.07}>
                <div className="group bg-background border border-border/60 rounded-2xl p-6 hover:border-primary/40 hover:shadow-medium transition-all duration-300 h-full flex flex-col gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {v.icon}
                  </div>
                  <div>
                    <p className="text-sm font-700 text-foreground">{v.title}</p>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            TEAM
        ════════════════════════════════════════ */}
        <section className="bg-secondary/30 border-y border-border/40">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
            <FadeUp className="text-center mb-14">
              <span className="text-xs font-700 uppercase tracking-[0.22em] text-primary">The People</span>
              <h2 className="text-3xl sm:text-4xl font-800 text-foreground mt-3">Meet the team</h2>
              <p className="text-muted-foreground text-sm mt-3 max-w-md mx-auto">
                A tight-knit group of engineers, designers, and customer champions who live and breathe quality fenestration.
              </p>
            </FadeUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TEAM.map((member, i) => (
                <FadeUp key={member.name} delay={i * 0.07}>
                  <div className="bg-background border border-border/60 rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:shadow-medium transition-shadow duration-300">
                    {/* Avatar */}
                    <div className={`w-16 h-16 rounded-2xl ${member.color} flex items-center justify-center text-xl font-800 select-none`}>
                      {member.initials}
                    </div>
                    <div>
                      <p className="text-sm font-700 text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            MANUFACTURING
        ════════════════════════════════════════ */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <FadeUp>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-primary" />
                <span className="text-xs font-700 uppercase tracking-[0.22em] text-primary">Manufacturing</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-800 text-foreground leading-tight">
                Made in Pune.<br />Engineered for India.
              </h2>
            </FadeUp>

            <FadeUp delay={0.1} className="mt-6 flex flex-col gap-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Our 40,000 sq ft plant in Chakan houses state-of-the-art German CNC welding and
                fabrication lines. Every window starts as a raw uPVC profile and leaves as a
                finished, quality-checked unit — no outsourcing, no compromise.
              </p>
              <p>
                Because we manufacture everything in-house, we can offer faster lead times,
                tighter tolerances, and a 10-year product warranty that we can actually stand behind.
              </p>
            </FadeUp>

            <FadeUp delay={0.15} className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: '40,000 sq ft', sub: 'manufacturing plant' },
                { label: 'German CNC', sub: 'welding machinery' },
                { label: '10-year', sub: 'product warranty' },
                { label: 'Zero', sub: 'outsourcing' },
              ].map((f) => (
                <div key={f.label} className="bg-secondary/50 rounded-xl p-4 border border-border/40">
                  <p className="text-base font-800 text-foreground">{f.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.sub}</p>
                </div>
              ))}
            </FadeUp>
          </div>

          {/* Decorative visual */}
          <FadeUp delay={0.1} className="hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden bg-primary/5 border border-primary/15 p-10 flex flex-col gap-6">
              {/* Progress bars as "quality meters" */}
              {[
                { label: 'Welding Precision',     pct: 99 },
                { label: 'Thermal Performance',   pct: 96 },
                { label: 'Sound Insulation',       pct: 94 },
                { label: 'Weather Resistance',     pct: 98 },
                { label: 'Hardware Durability',    pct: 97 },
              ].map((item, i) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs font-500 mb-1.5">
                    <span className="text-foreground">{item.label}</span>
                    <span className="text-primary font-700">{item.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-border overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground text-center mt-2">Based on internal QC data — 2024</p>
            </div>
          </FadeUp>
        </section>

        {/* ════════════════════════════════════════
            CTA BANNER
        ════════════════════════════════════════ */}
        <section className="bg-primary mx-4 sm:mx-8 mb-16 rounded-3xl overflow-hidden">
          <FadeUp>
            <div className="relative px-8 sm:px-14 py-14 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-8">
              {/* Decorative blob */}
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10"
                style={{ background: 'radial-gradient(circle at 80% 50%, white 0%, transparent 70%)' }}
              />

              <div className="relative">
                <p className="text-primary-foreground/70 text-xs font-700 uppercase tracking-widest mb-2">Free of charge</p>
                <h2 className="text-2xl sm:text-3xl font-800 text-primary-foreground leading-tight max-w-md">
                  Ready to transform your home? Let's start with a free survey.
                </h2>
              </div>

              <div className="relative flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/book-survey"
                  className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-700 text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-opacity duration-200 whitespace-nowrap"
                >
                  Book a Survey
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
                <a
                  href="tel:+919999999999"
                  className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground font-600 text-sm px-6 py-3 rounded-xl hover:bg-primary-foreground/10 transition-colors duration-200 whitespace-nowrap"
                >
                  Call Us
                </a>
              </div>
            </div>
          </FadeUp>
        </section>

      </main>

      <Footer />
    </>
  );
}