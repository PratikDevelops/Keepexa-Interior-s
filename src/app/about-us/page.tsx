'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const WHY_US = [
  {
    emoji: '🏭',
    title: 'Direct from our factory',
    desc: 'No middlemen, no resellers. You deal directly with the manufacturer — better pricing, full accountability.',
  },
  {
    emoji: '📐',
    title: 'Made-to-measure',
    desc: 'Every window and door is fabricated to your exact site dimensions. Nothing off-the-shelf.',
  },
  {
    emoji: '🇮🇳',
    title: 'Pune-manufactured',
    desc: 'Proudly made in Pune using quality uPVC profiles and hardware — built for Indian climate conditions.',
  },
  {
    emoji: '🛡️',
    title: 'Quality guaranteed',
    desc: 'We back every product with a solid warranty and stand behind our workmanship from day one.',
  },
  {
    emoji: '💬',
    title: 'Honest advice',
    desc: 'Straightforward recommendations — the right product for your space, not the most expensive one.',
  },
  {
    emoji: '🔧',
    title: 'End-to-end service',
    desc: 'Survey, design, manufacture, install, support. One team. Nothing falls through the cracks.',
  },
];

const PRODUCTS = [
  { slug: 'tilt-turn',       label: 'Tilt & Turn',      desc: 'Dual-function inward-opening windows' },
  { slug: 'casement',        label: 'Casement',          desc: 'Classic outward-opening for max airflow' },
  { slug: 'sliding-2track',  label: 'Sliding 2-Track',   desc: 'Space-saving smooth gliding panels' },
  { slug: 'french-casement', label: 'French Casement',   desc: 'Wide double-leaf with no centre bar' },
  { slug: 'lift-slide',      label: 'Lift & Slide',      desc: 'Large-format effortless gliding panels' },
  { slug: 'fixed-picture',   label: 'Fixed / Picture',   desc: 'Frameless glazing for light & views' },
  { slug: 'bay-window',      label: 'Bay Window',        desc: 'Projecting combinations to expand space' },
  { slug: 'louvre',          label: 'Louvre',            desc: 'Slatted panels for airflow and privacy' },
];

const PROMISES = [
  {
    n: '01',
    title: 'Transparent pricing',
    desc: 'Detailed itemised quote upfront. No hidden charges, no surprises on delivery day.',
  },
  {
    n: '02',
    title: 'On-time installation',
    desc: "We commit to a timeline and stick to it. If we're delayed, you're the first to know.",
  },
  {
    n: '03',
    title: 'Post-install support',
    desc: "Our job doesn't end at installation. We're reachable for adjustments and aftercare.",
  },
];

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="h-px w-8 bg-primary" />
      <span className="text-[11px] font-700 uppercase tracking-[0.2em] text-primary">{text}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="bg-background min-h-screen pt-[72px]">

        {/* ══════════════════════════════════
            HERO
        ══════════════════════════════════ */}
        <section className="border-b border-border/50">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel text="About Us" />
              <h1 className="text-4xl sm:text-5xl font-800 text-foreground leading-[1.12] tracking-tight max-w-2xl">
                A new kind of window &amp; door company —{' '}
                <span className="text-primary">built different from day one.</span>
              </h1>
              <p className="mt-5 text-muted-foreground text-base sm:text-lg max-w-xl leading-relaxed">
                We're a freshly launched uPVC windows and doors manufacturer based in Pune.
                We may be new, but the reason we started is simple — we saw how the industry
                treated customers and decided to do it better.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/book-survey" className="btn-primary text-sm">
                  Book a Free Survey
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
                <Link
                  href="/homepage#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-500 text-foreground hover:bg-secondary/60 transition-colors duration-200"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>

            {/* Highlights strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {[
                { icon: '🏠', label: 'Free home survey' },
                { icon: '⚙️', label: 'Factory-direct pricing' },
                { icon: '📦', label: 'Custom-made every time' },
                { icon: '📞', label: 'Same-day quote' },
              ].map((h) => (
                <div
                  key={h.label}
                  className="flex items-center gap-3 bg-secondary/40 border border-border/50 rounded-xl px-4 py-3"
                >
                  <span className="text-lg leading-none">{h.icon}</span>
                  <span className="text-xs font-600 text-foreground">{h.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════
            WHY WE STARTED
        ══════════════════════════════════ */}
        <section className="border-b border-border/50 bg-secondary/20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <FadeUp>
              <SectionLabel text="Why We Started" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground leading-tight">
                The industry needed a manufacturer who actually cares.
              </h2>
            </FadeUp>

            <FadeUp delay={0.1} className="flex flex-col gap-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                Walk into most window showrooms in India and you'll find pushy salespeople,
                vague pricing, and products sourced from whoever offers the biggest margin.
                Customers pay more and get less.
              </p>
              <p>
                We started this company to change that. As a direct manufacturer in Pune,
                we cut out every middleman. You get factory pricing, factory-level quality
                control, and a team that is personally accountable for every unit we make.
              </p>
              <p>
                We are just getting started — and we are building our reputation one
                satisfied customer at a time. That means every project we take on gets
                our full attention, not the leftovers.
              </p>

              {/* Pull quote */}
              <div className="mt-2 border-l-2 border-primary pl-4 py-1">
                <p className="text-foreground font-600 text-sm italic">
                  "Being new isn't a weakness — it means we have everything to prove
                  and nothing to cut corners on."
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ══════════════════════════════════
            WHAT MAKES US DIFFERENT
        ══════════════════════════════════ */}
        <section className="border-b border-border/50">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
            <FadeUp className="mb-10">
              <SectionLabel text="Why Choose Us" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">What makes us different</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                Being new means we have nothing to un-learn. We're doing things right from the start.
              </p>
            </FadeUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WHY_US.map((item, i) => (
                <FadeUp key={item.title} delay={i * 0.055}>
                  <div className="flex gap-4 p-5 rounded-2xl border border-border/60 hover:border-primary/30 hover:bg-secondary/30 transition-all duration-200 h-full">
                    <span className="text-2xl leading-none mt-0.5 shrink-0">{item.emoji}</span>
                    <div>
                      <p className="text-sm font-700 text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            PRODUCTS WE MAKE
        ══════════════════════════════════ */}
        <section className="border-b border-border/50 bg-secondary/20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
            <FadeUp className="mb-10">
              <SectionLabel text="Our Products" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">
                Windows &amp; doors we manufacture
              </h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                Every type is available in custom sizes, colours, and glass specifications.
              </p>
            </FadeUp>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PRODUCTS.map((p, i) => (
                <FadeUp key={p.slug} delay={i * 0.04}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="group flex flex-col gap-1.5 p-4 rounded-xl border border-border/60 bg-background hover:border-primary/40 hover:shadow-soft transition-all duration-200 h-full"
                  >
                    <p className="text-sm font-700 text-foreground group-hover:text-primary transition-colors duration-200">
                      {p.label}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                    <span className="mt-auto pt-3 text-[11px] text-primary font-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Explore
                      <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M2 6h8M7 3l3 3-3 3" />
                      </svg>
                    </span>
                  </Link>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.2} className="mt-6 text-center">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-sm font-600 text-primary hover:underline underline-offset-2"
              >
                See our work in the gallery
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </FadeUp>
          </div>
        </section>

        {/* ══════════════════════════════════
            HOW WE WORK
        ══════════════════════════════════ */}
        <section className="border-b border-border/50">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
            <FadeUp className="mb-10">
              <SectionLabel text="How It Works" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">From inquiry to installation</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                A simple, transparent process — you know exactly what's happening at every step.
              </p>
            </FadeUp>

            <div className="flex flex-col gap-0">
              {[
                { n: '01', title: 'Book a free survey',      desc: 'Fill the form or call us. Our team visits your site, takes measurements and understands your requirements — completely free.' },
                { n: '02', title: 'Receive your quote',       desc: 'We prepare a detailed, itemised quote within 24 hours. No vague estimates — you see exactly what you\'re paying for.' },
                { n: '03', title: 'We manufacture your order', desc: 'Once you confirm, we begin fabrication at our Pune factory. Every unit is made to your exact dimensions and specs.' },
                { n: '04', title: 'Professional installation', desc: 'Our trained installation team arrives on the scheduled day. Clean, efficient, and done right the first time.' },
                { n: '05', title: 'Aftercare & support',      desc: 'We check in after installation and remain reachable for any queries, adjustments, or warranty support.' },
              ].map((step, i, arr) => (
                <FadeUp key={step.n} delay={i * 0.06}>
                  <div className="flex gap-5 pb-8 last:pb-0">
                    {/* Step indicator + connector */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-9 h-9 rounded-full border-2 border-primary bg-primary/8 flex items-center justify-center z-10">
                        <span className="text-[11px] font-800 text-primary">{step.n}</span>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="flex-1 w-px bg-border/50 mt-1.5" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pt-1.5 pb-2">
                      <p className="text-sm font-700 text-foreground">{step.title}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed max-w-lg">{step.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            OUR PROMISE
        ══════════════════════════════════ */}
        <section className="border-b border-border/50 bg-secondary/20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
            <FadeUp className="mb-10">
              <SectionLabel text="Our Promise" />
              <h2 className="text-2xl sm:text-3xl font-800 text-foreground">
                What you can always expect from us
              </h2>
            </FadeUp>

            <div className="grid sm:grid-cols-3 gap-4">
              {PROMISES.map((item, i) => (
                <FadeUp key={item.n} delay={i * 0.08}>
                  <div className="p-6 rounded-2xl border border-border/60 bg-background h-full flex flex-col gap-3">
                    <span className="text-4xl font-900 text-primary/12 leading-none">{item.n}</span>
                    <p className="text-sm font-700 text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            LOCATION / CONTACT STRIP
        ══════════════════════════════════ */}
        <section className="border-b border-border/50">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 grid sm:grid-cols-3 gap-6 text-center sm:text-left">
            {[
              { emoji: '📍', title: 'Based in Pune', sub: 'Manufacturing & showroom in Pune, Maharashtra.' },
              { emoji: '🕘', title: 'Working hours',  sub: 'Mon – Sat, 9:00 AM to 6:00 PM' },
              { emoji: '📞', title: 'Call or WhatsApp', sub: '+91 99999 99999' },
            ].map((c, i) => (
              <FadeUp key={c.title} delay={i * 0.07} className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                <span className="text-2xl leading-none">{c.emoji}</span>
                <div>
                  <p className="text-sm font-700 text-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.sub}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════
            CTA
        ══════════════════════════════════ */}
        <section className="bg-secondary/20">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <FadeUp>
              <h2 className="text-xl sm:text-2xl font-800 text-foreground max-w-sm leading-snug">
                Let's start with a free home survey — no commitment needed.
              </h2>
              <p className="text-sm text-muted-foreground mt-1.5">
                We'll visit, measure, advise, and quote. All free of charge.
              </p>
            </FadeUp>

            <FadeUp delay={0.1} className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/book-survey" className="btn-primary text-sm whitespace-nowrap">
                Book a Survey
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
              <a
                href="tel:+919999999999"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-500 text-foreground hover:bg-background transition-colors duration-200 whitespace-nowrap"
              >
                Call Us
              </a>
            </FadeUp>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}