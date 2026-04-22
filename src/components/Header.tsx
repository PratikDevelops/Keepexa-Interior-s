'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

/* ─────────────────────────────────────────────
   Nav links
───────────────────────────────────────────── */
const navLinks = [
  { label: 'Windows & Doors', href: '/homepage#features' },
  { label: 'Gallery',         href: '/gallery' },
  { label: 'About Us',        href: '/homepage#about' },
  { label: 'Why Choose Us',   href: '/homepage#why-choose-us' },
  { label: 'FAQ',             href: '/homepage#faq' },
  { label: 'Contact Us',      href: '/homepage#contact' },
];

/* ─────────────────────────────────────────────
   Animated hamburger icon (3 bars → X)
───────────────────────────────────────────── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="w-5 h-4 flex flex-col justify-between">
      <motion.span
        className="block h-0.5 bg-foreground rounded-full origin-center"
        animate={open ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="block h-0.5 bg-foreground rounded-full"
        animate={open ? { opacity: 0, scaleX: 0.5 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-0.5 bg-foreground rounded-full origin-center"
        animate={open ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Mobile nav link row
───────────────────────────────────────────── */
function MobileNavLink({
  link,
  index,
  onClose,
}: {
  link: { label: string; href: string };
  index: number;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: 0.08 + index * 0.055, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={link.href}
        onClick={onClose}
        className="group flex items-center justify-between py-4 text-base font-500 text-foreground border-b border-border/50 hover:text-primary transition-colors duration-200"
      >
        <span>{link.label}</span>
        <motion.span
          className="text-muted-foreground group-hover:text-primary transition-colors"
          whileHover={{ x: 3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <Icon name="ChevronRightIcon" size={16} />
        </motion.span>
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Header
───────────────────────────────────────────── */
export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();

  /* scroll listener */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href.includes('#')) return false;
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <>
      {/* ── Desktop / Scroll header ── */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-xl shadow-soft border-b border-border/60'
            : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between py-4">

          {/* Logo */}
          <Link href="/homepage" className="flex items-center gap-2.5 group shrink-0">
            <AppLogo
              size={36}
              onClick={() => {}}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-800 text-xl tracking-tight text-foreground">
              Keepexa Interior's
            </span>
          </Link>

          {/* Desktop nav links */}
          <div
            className="hidden md:flex items-center gap-1"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-500 transition-colors duration-200 ${
                    active
                      ? 'text-primary font-600'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {/* Hover background pill */}
                  {hoveredLink === link.href && !active && (
                    <motion.span
                      layoutId="nav-hover-bg"
                      className="absolute inset-0 bg-secondary/70 rounded-xl"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Active underline indicator */}
                  {active && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/product-configurator"
              className="hidden md:inline-flex btn-primary text-sm py-2.5 px-5"
            >
              Get Free Quote
              <Icon name="ArrowRightIcon" size={15} />
            </Link>

            {/* Hamburger — animated */}
            <button
              className="md:hidden p-2.5 rounded-xl hover:bg-secondary/70 transition-colors duration-200"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-down panel */}
            <motion.div
              className="fixed top-0 left-0 right-0 z-40 md:hidden bg-background border-b border-border/60 shadow-medium pt-20 px-5 pb-7 flex flex-col"
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Eyebrow label */}
              <motion.div
                className="flex items-center gap-2.5 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <span className="block w-4 h-px bg-primary/50" />
                <span className="text-[10px] font-700 text-muted-foreground uppercase tracking-[0.2em]">
                  Navigation
                </span>
              </motion.div>

              {/* Nav links */}
              <nav className="flex flex-col">
                {navLinks.map((link, i) => (
                  <MobileNavLink
                    key={link.href}
                    link={link}
                    index={i}
                    onClose={() => setMenuOpen(false)}
                  />
                ))}
              </nav>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.08 + navLinks.length * 0.055 + 0.05 }}
                className="mt-6"
              >
                <Link
                  href="/product-configurator"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary justify-center w-full"
                >
                  Get Free Quote
                  <Icon name="ArrowRightIcon" size={16} />
                </Link>
              </motion.div>

              {/* Bottom tag line */}
              <motion.p
                className="text-center text-xs text-muted-foreground mt-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                ISO-certified · Pune-manufactured · No resellers
              </motion.p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}