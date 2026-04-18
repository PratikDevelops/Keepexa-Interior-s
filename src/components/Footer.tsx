import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const footerLinks = [
  { label: 'Windows & Doors', href: '/homepage#features' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Configurator', href: '/product-configurator' },
  { label: 'About', href: '/homepage#about' },
  { label: 'Contact', href: '/homepage#contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/60 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        {/* Logo */}
        <Link href="/homepage" className="flex items-center gap-2.5">
          <AppLogo size={30} />
          <span className="font-bold text-base tracking-tight text-foreground">ShuddhFrame</span>
        </Link>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {footerLinks?.map((link) => (
            <Link
              key={link?.href}
              href={link?.href}
              className="text-sm font-500 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link?.label}
            </Link>
          ))}
        </div>

        {/* Social + Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-200"
            >
              <Icon name="PhotoIcon" size={14} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-200"
            >
              <Icon name="BuildingOfficeIcon" size={14} />
            </a>
          </div>
          <span className="text-xs text-muted-foreground">© 2026 ShuddhFrame · Made in India 🇮🇳</span>
        </div>
      </div>
    </footer>
  );
}