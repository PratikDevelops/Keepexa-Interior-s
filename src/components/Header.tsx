'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const navLinks = [
  { label: 'Windows & Doors', href: '/homepage#features' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/homepage#about' },
  { label: 'Contact', href: '/homepage#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href.includes('#')) return false;
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-soft border-b border-border/60'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/homepage" className="flex items-center gap-2.5 group">
            <AppLogo
              size={36}
              onClick={() => {}}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-bold text-xl tracking-tight text-foreground">
              ShuddhFrame
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-500 transition-colors duration-200 relative group ${
                  isActive(link.href)
                    ? 'text-primary font-600' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                    isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/product-configurator"
              className="btn-primary text-sm py-2.5 px-5"
            >
              Get Free Quote
              <Icon name="ArrowRightIcon" size={16} />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={22} className="text-foreground" />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col pt-24 px-6 pb-8 md:hidden">
          <nav className="flex flex-col gap-1 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-4 text-lg font-500 text-foreground border-b border-border/50 hover:text-primary transition-colors"
              >
                {link.label}
                <Icon name="ChevronRightIcon" size={18} className="text-muted-foreground" />
              </Link>
            ))}
          </nav>
          <Link
            href="/product-configurator"
            onClick={() => setMenuOpen(false)}
            className="btn-primary justify-center mt-6"
          >
            Get Free Quote
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
        </div>
      )}
    </>
  );
}