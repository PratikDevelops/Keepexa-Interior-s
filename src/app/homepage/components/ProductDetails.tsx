'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────
   AppImage / Icon
───────────────────────────────────────────── */
function AppImage({ src, alt, fill, className }: { src: string; alt: string; fill?: boolean; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={[fill ? 'absolute inset-0 w-full h-full' : '', className].join(' ')} />
  );
}

function Icon({ name, size = 16, className = '' }: { name: string; size?: number; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    ArrowRightIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    ArrowLeftIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 8H3M7 4L3 8l4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    CheckIcon: (
      <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    ShieldIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M8 2l5 2.5v4C13 11.5 10.5 14 8 15 5.5 14 3 11.5 3 8.5v-4L8 2z" strokeLinejoin="round" />
      </svg>
    ),
    ThermometerIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M8 2v7M6 4h4M5.5 13a2.5 2.5 0 005 0c0-1-.6-1.8-1.5-2.2V2H7v8.8C6.1 11.2 5.5 12 5.5 13z" strokeLinecap="round" />
      </svg>
    ),
    SoundIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 6v4h3l4 3V3L6 6H3z" strokeLinejoin="round" />
        <path d="M11.5 5a3 3 0 010 6" strokeLinecap="round" />
      </svg>
    ),
    LayersIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M8 2L2 5.5l6 3.5 6-3.5L8 2z" strokeLinejoin="round" />
        <path d="M2 9l6 3.5L14 9" strokeLinecap="round" />
      </svg>
    ),
    WindIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M2 8h8a2 2 0 100-4" strokeLinecap="round" />
        <path d="M2 11h6a2 2 0 110 4" strokeLinecap="round" />
      </svg>
    ),
    RulerIcon: (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="5" width="12" height="6" rx="1" />
        <path d="M5 5v2M8 5v3M11 5v2" strokeLinecap="round" />
      </svg>
    ),
  };
  return <span className={`inline-flex items-center justify-center ${className}`}>{icons[name] ?? null}</span>;
}

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface ProductDetail {
  id: string;
  slug: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  badge?: { label: string; variant: 'popular' | 'new' | 'premium' | 'eco' };
  startingPrice: string;
  priceUnit: string;
  rating: number;
  reviews: number;
  uValue: string;
  acoustic: string;
  profiles: string;
  highlights: string[];
  features: { icon: string; title: string; body: string }[];
  specs: { label: string; value: string }[];
  applications: string[];
  relatedSlugs: string[];
  href: string;
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const allProducts: ProductDetail[] = [
  {
    id: 'tilt-turn',
    slug: 'tilt-turn',
    category: 'Tilt & Turn',
    name: 'Tilt & Turn',
    tagline: "Europe's most versatile window, engineered for India",
    description: 'A single handle controls two opening modes — tilt inward for ventilation without rain ingress, turn fully open for cleaning or emergency egress.',
    longDescription: `The Tilt & Turn is our flagship window — a German-engineered masterpiece adapted for Indian climate and construction. A single multi-point handle rotates through three positions: closed (fully sealed), tilt (top opens inward 10–15 cm for passive ventilation), and turn (sash swings fully inward on side hinges for cleaning or egress).

Our 6-chamber profile achieves a U-Value of 1.0 W/m²K — roughly 4× better than standard aluminium — making it the go-to specification for premium residential towers, corporate campuses, and hospitality projects demanding LEED or GRIHA credits.

Available in 40+ RAL colours, woodgrain foils, and dual-colour options (white inside / any colour outside). Maximum sash size 1500 × 2200 mm.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'Premium UPVC tilt and turn window in tilt position',
    badge: { label: "Editor's Choice", variant: 'eco' },
    startingPrice: '₹750',
    priceUnit: 'per sq ft',
    rating: 4.9,
    reviews: 445,
    uValue: '1.0 W/m²K',
    acoustic: '45 dB',
    profiles: '6-chamber',
    highlights: ['Dual-mode single handle', 'Child-safe tilt limiter', 'Passive ventilation', 'Inward clean access'],
    features: [
      { icon: 'WindIcon', title: 'Tilt Mode Ventilation', body: 'Top tilts inward 12 cm — fresh air enters without rain, dust, or insects. Ideal for sleeping rooms and high-rise apartments.' },
      { icon: 'ShieldIcon', title: 'Multi-Point Security', body: '7 locking points around the perimeter engage simultaneously with a single handle turn, achieving RC 2 burglar resistance.' },
      { icon: 'ThermometerIcon', title: 'Thermal Break Technology', body: '6-chamber profile with 70 mm depth and optional foam-fill delivers U-Values as low as 0.9 W/m²K with triple glazing.' },
      { icon: 'SoundIcon', title: 'Acoustic Comfort', body: 'Combined with 6/12/6 mm laminated IGU, the system achieves Rw 45 dB — exceeding NBC acoustic requirements for bedrooms.' },
    ],
    specs: [
      { label: 'Profile Depth', value: '70 mm' },
      { label: 'Chambers', value: '6-chamber' },
      { label: 'U-Value', value: '1.0 W/m²K' },
      { label: 'Acoustic', value: '45 dB' },
      { label: 'Max Sash Size', value: '1500 × 2200 mm' },
      { label: 'Locking Points', value: '7-point' },
      { label: 'Opening Modes', value: 'Tilt + Turn' },
      { label: 'Colour Options', value: '40+ RAL' },
    ],
    applications: ['Premium Residential', 'Hospitality', 'Corporate Campuses', 'Green-rated Buildings'],
    relatedSlugs: ['casement', 'french-casement', 'fixed-picture'],
    href: '/products/tilt-turn',
  },
  {
    id: 'casement-classic',
    slug: 'casement',
    category: 'Casement',
    name: 'Classic Casement',
    tagline: 'Side-hung sash, full ventilation, timeless profile',
    description: 'The benchmark casement — side-hinged sash with multi-point locking, weather-seal gasket, and optional trickle vent.',
    longDescription: `The Classic Casement is our highest-volume window — chosen by builders, developers and homeowners who demand reliability, clean lines, and proven performance.

The side-hinged sash opens outward (or inward on request) for full-face ventilation. A continuous thermoplastic elastomer gasket presses uniformly against the frame on closure, delivering class-leading weatherproofing even at 40 m/s wind pressure.

Standard 5-chamber 60 mm profile can be upgraded to our 6-chamber 70 mm system for enhanced thermal performance. Egress hardware, friction stays, and cat-flap sub-frames all available as factory-fitted options. Largest sash size: 900 × 1500 mm.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'Classic white UPVC casement window, chrome handle, open position',
    badge: { label: 'Best Seller', variant: 'popular' },
    startingPrice: '₹550',
    priceUnit: 'per sq ft',
    rating: 4.9,
    reviews: 612,
    uValue: '1.2 W/m²K',
    acoustic: '42 dB',
    profiles: '5-chamber',
    highlights: ['Multi-point locking', 'Weather-seal gasket', 'Trickle vent option', 'Outward or inward opening'],
    features: [
      { icon: 'WindIcon', title: 'Full-Face Ventilation', body: 'Sash opens to 90° for unobstructed airflow — the highest ventilation-to-frame ratio of any opening window type.' },
      { icon: 'ShieldIcon', title: 'Multi-Point Lock', body: '5 locking points with hook bolt and roller cams distribute clamping force evenly around the perimeter for a hermetic seal.' },
      { icon: 'ThermometerIcon', title: '5-Chamber Profile', body: '60 mm frame depth with co-extruded steel reinforcement handles spans up to 2.4 m without deflection.' },
      { icon: 'SoundIcon', title: 'Trickle Vent Ready', body: 'Factory-routed slot in the head section accepts our snap-fit trickle vent, providing background ventilation to meet Part F.' },
    ],
    specs: [
      { label: 'Profile Depth', value: '60 mm' },
      { label: 'Chambers', value: '5-chamber' },
      { label: 'U-Value', value: '1.2 W/m²K' },
      { label: 'Acoustic', value: '42 dB' },
      { label: 'Max Sash Size', value: '900 × 1500 mm' },
      { label: 'Locking Points', value: '5-point' },
      { label: 'Opening', value: 'Outward / Inward' },
      { label: 'Colour Options', value: '40+ RAL' },
    ],
    applications: ['Mass Housing', 'Villas', 'Renovation', 'Schools'],
    relatedSlugs: ['tilt-turn', 'french-casement', 'fixed-picture'],
    href: '/products/casement',
  },
  {
    id: 'sliding-2track',
    slug: 'sliding-2track',
    category: 'Sliding',
    name: 'Sliding 2-Track',
    tagline: 'Space-saving horizontal slide, perfect for balconies',
    description: 'Horizontal sliding sash on stainless steel rollers. Anti-lift security locks and optional mosquito mesh integration.',
    longDescription: `When floor space is tight or outward swing isn't permitted — balconies, corridors, narrow sills — the Sliding 2-Track is the default choice for millions of Indian homes.

Two sashes slide on independent stainless-steel tandem roller sets. The anti-lift security system prevents the sash being lifted off the track from outside. An optional integrated mesh track provides year-round mosquito protection without a separate frame.

Our 4-chamber profile is engineered specifically for the Indian coastal and monsoon climate: UV-stabilised compound, sealed drainage channels, and a recessed sill lip that directs driving rain away from interior finishes. Widths to 2400 mm, heights to 1800 mm as standard.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'UPVC horizontal sliding window overlooking balcony, white frame',
    badge: { label: 'Most Popular', variant: 'popular' },
    startingPrice: '₹400',
    priceUnit: 'per sq ft',
    rating: 4.7,
    reviews: 834,
    uValue: '1.4 W/m²K',
    acoustic: '38 dB',
    profiles: '4-chamber',
    highlights: ['Anti-lift locks', 'Stainless rollers', 'Mesh-ready track', 'Monsoon drainage'],
    features: [
      { icon: 'RulerIcon', title: 'No Swing Space Needed', body: 'Zero outward projection makes it ideal for balconies, roadside rooms, and any opening adjacent to walkways or furniture.' },
      { icon: 'ShieldIcon', title: 'Anti-Lift Security', body: 'Mushroom cams in the meeting stile and recessed track clips prevent the sash being lifted from outside — a common break-in method.' },
      { icon: 'WindIcon', title: 'Integrated Mesh Option', body: 'A third track factory-fitted behind the sash tracks accepts our fibreglass mosquito mesh, eliminating the need for a separate mesh frame.' },
      { icon: 'ThermometerIcon', title: 'Monsoon-Ready Drainage', body: 'Tiered drainage channels with weep holes in the sill section flush rainwater to the outside before it can reach the interior.' },
    ],
    specs: [
      { label: 'Profile Depth', value: '60 mm' },
      { label: 'Chambers', value: '4-chamber' },
      { label: 'U-Value', value: '1.4 W/m²K' },
      { label: 'Acoustic', value: '38 dB' },
      { label: 'Max Width', value: '2400 mm' },
      { label: 'Max Height', value: '1800 mm' },
      { label: 'Track System', value: '2-track SS roller' },
      { label: 'Colour Options', value: '30+ RAL' },
    ],
    applications: ['Apartments', 'Balconies', 'Corridors', 'Affordable Housing'],
    relatedSlugs: ['lift-slide', 'fixed-picture', 'louvre'],
    href: '/products/sliding-2track',
  },
  {
    id: 'french-casement',
    slug: 'french-casement',
    category: 'Casement',
    name: 'French Casement',
    tagline: 'Double-leaf, no centre post, unobstructed opening',
    description: 'Two sashes open outward from a central meeting point with no fixed mullion. Espagnolette bolt secures both leaves.',
    longDescription: `The French Casement is the architectural choice when the view matters as much as the window itself. Two full-height sashes meet at the centre with no fixed mullion — opened together they deliver an uninterrupted aperture up to 1800 mm wide.

The Espagnolette bolt system locks the passive (first-close) leaf top and bottom before the active leaf engages its own multi-point locks, creating a combined locking sequence that is both secure and elegant. Ultra-slim 6-chamber frame sections at the meeting stile reduce sight lines to as little as 78 mm across both leaves combined.

Commonly specified for master bedroom balcony doors, living room feature openings, and heritage renovation projects where period proportions must be respected.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'UPVC French casement double window open wide, white frame',
    badge: { label: 'Premium', variant: 'premium' },
    startingPrice: '₹650',
    priceUnit: 'per sq ft',
    rating: 4.8,
    reviews: 289,
    uValue: '1.1 W/m²K',
    acoustic: '44 dB',
    profiles: '6-chamber',
    highlights: ['No centre mullion', 'Espagnolette bolt', 'Slim sightlines', 'Full-width opening'],
    features: [
      { icon: 'RulerIcon', title: 'No Mullion View', body: 'Meeting stiles are slimmed to 78 mm combined width — visually equivalent to a fixed picture window when closed, yet fully openable.' },
      { icon: 'ShieldIcon', title: 'Espagnolette Security', body: 'Passive leaf locks top and bottom; active leaf then engages 5-point locks. Both leaves secured before either can be forced open.' },
      { icon: 'WindIcon', title: 'Full-Width Ventilation', body: 'Open both sashes to expose 100% of the frame aperture — the highest ventilation area achievable in any double-leaf window system.' },
      { icon: 'ThermometerIcon', title: '6-Chamber Profile', body: '70 mm profile depth with thermal break delivers U-Value 1.1 W/m²K with standard double glazing, upgradeable to 0.9 with triple.' },
    ],
    specs: [
      { label: 'Profile Depth', value: '70 mm' },
      { label: 'Chambers', value: '6-chamber' },
      { label: 'U-Value', value: '1.1 W/m²K' },
      { label: 'Acoustic', value: '44 dB' },
      { label: 'Max Width', value: '1800 mm' },
      { label: 'Max Height', value: '2200 mm' },
      { label: 'Locking', value: 'Espagnolette + 5-pt' },
      { label: 'Colour Options', value: '40+ RAL' },
    ],
    applications: ['Master Bedrooms', 'Balcony Doors', 'Heritage Buildings', 'Feature Openings'],
    relatedSlugs: ['tilt-turn', 'casement', 'fixed-picture'],
    href: '/products/french-casement',
  },
  {
    id: 'lift-slide',
    slug: 'lift-slide',
    category: 'Sliding',
    name: 'Lift & Slide',
    tagline: 'Large-format panels, effortless handle-lift operation',
    description: 'Panel lifts off its seal with a quarter-turn of the handle, then glides on precision rollers. Up to 3 m wide.',
    longDescription: `The Lift & Slide is the system of choice for seamless indoor-outdoor living — contemporary villas, duplex penthouses, and resort developments where the boundary between inside and outside should dissolve.

Unlike a standard sliding door, the panel presses down firmly onto its triple-sealed compression gasket when the handle is closed, achieving thermal and acoustic performance close to a fixed light. A quarter-turn of the handle lifts the panel 3 mm off the seal onto low-friction tandem rollers, after which the full panel glides with finger-tip effort regardless of glass weight.

Single panels up to 3000 × 2400 mm and 400 kg. 2, 3, and 4-panel configurations available. Ultra-slim 20 mm sight line sill profile option for near-flush floor transitions.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'Large UPVC lift and slide patio door panel, panoramic garden view',
    badge: { label: 'New', variant: 'new' },
    startingPrice: '₹2500',
    priceUnit: 'per sq ft',
    rating: 4.9,
    reviews: 97,
    uValue: '0.9 W/m²K',
    acoustic: '46 dB',
    profiles: '6-chamber',
    highlights: ['Up to 3 m panel width', 'Low-threshold sill', 'Triple-sealed track', 'Finger-tip operation'],
    features: [
      { icon: 'RulerIcon', title: '3 m Panel Width', body: 'Individual panels up to 3000 mm wide and 400 kg supported on precision aluminium-encased tandem roller carriages.' },
      { icon: 'ShieldIcon', title: 'Compression Seal Closed', body: 'When handle is closed, the panel locks down onto a triple-gasket perimeter seal — thermally equivalent to a fixed frame.' },
      { icon: 'ThermometerIcon', title: 'Best-in-Class U-Value', body: '6-chamber 82 mm profile with triple glazing achieves U-Value 0.9 W/m²K — the lowest of any sliding system in our range.' },
      { icon: 'SoundIcon', title: 'Premium Acoustic', body: 'The compression seal when closed eliminates the acoustic path that defeats standard sliding systems; Rw 46 dB achieved.' },
    ],
    specs: [
      { label: 'Profile Depth', value: '82 mm' },
      { label: 'Chambers', value: '6-chamber' },
      { label: 'U-Value', value: '0.9 W/m²K' },
      { label: 'Acoustic', value: '46 dB' },
      { label: 'Max Panel Width', value: '3000 mm' },
      { label: 'Max Panel Weight', value: '400 kg' },
      { label: 'Sill Height', value: '20 mm (flush)' },
      { label: 'Configurations', value: '2, 3, 4 panels' },
    ],
    applications: ['Luxury Villas', 'Penthouse Terraces', 'Resort Hotels', 'Indoor-Outdoor Living'],
    relatedSlugs: ['sliding-2track', 'bay-window', 'fixed-picture'],
    href: '/products/lift-slide',
  },
  {
    id: 'fixed-picture',
    slug: 'fixed-picture',
    category: 'Fixed',
    name: 'Fixed Picture',
    tagline: 'Maximum glazing, zero infiltration, pure views',
    description: 'Fully fixed frame with no moving parts — highest thermal and acoustic performance. Custom shapes available.',
    longDescription: `Where the view is the feature, the Fixed Picture window disappears into it. With no hinges, handles, seals, or gaps, a fixed light achieves the highest thermal and acoustic performance of any window type — a fact that drives its specification in data centres, recording studios, gallery spaces, and premium residential feature walls.

Our Fixed Picture is available in any shape: rectangle, arch, circle, triangle, trapezoid, or fully bespoke CNC-cut profiles. Structural silicone glazing allows glass-to-glass corner joints with a 5 mm visual butt, eliminating frame sections entirely at corners.

Standard 5-chamber profile is upgradeable to 6-chamber for enhanced performance. Maximum single pane size limited only by the glass manufacturer's capabilities — we have installed 5000 × 2500 mm lites on commercial projects.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'Large fixed UPVC picture window, minimal white frame, mountain view',
    startingPrice: '₹500',
    priceUnit: 'per sq ft',
    rating: 4.8,
    reviews: 318,
    uValue: '0.8 W/m²K',
    acoustic: '48 dB',
    profiles: '5-chamber',
    highlights: ['Full-frame glazing', 'Custom shapes', 'Structural silicone seal', 'Maximum view'],
    features: [
      { icon: 'ThermometerIcon', title: 'Highest Thermal Performance', body: 'No opening hardware means no seal degradation over time. U-Value 0.8 W/m²K with triple glazing; best figure in our entire range.' },
      { icon: 'SoundIcon', title: 'Maximum Acoustic Isolation', body: 'No gaps, no seals to fail, no moving parts: Rw 48 dB as standard with 6.4/16/6.4 laminated IGU.' },
      { icon: 'RulerIcon', title: 'Custom Shapes', body: 'CNC-welded corners allow any polygon. Arches, circles, and trapezia router-cut in our Mumbai factory. Lead time 10 working days.' },
      { icon: 'LayersIcon', title: 'Structural Silicone Joints', body: 'Glass-to-glass corners with 5 mm silicone butt joint eliminate frame sections at corners — the closest thing to no frame at all.' },
    ],
    specs: [
      { label: 'Profile Depth', value: '60 mm' },
      { label: 'Chambers', value: '5-chamber (6 opt.)' },
      { label: 'U-Value', value: '0.8 W/m²K' },
      { label: 'Acoustic', value: '48 dB' },
      { label: 'Max Size', value: 'Project-specific' },
      { label: 'Shapes', value: 'Any polygon + arch' },
      { label: 'Corner Detail', value: 'Structural silicone' },
      { label: 'Colour Options', value: '40+ RAL' },
    ],
    applications: ['Feature Walls', 'Recording Studios', 'Galleries', 'Data Centres'],
    relatedSlugs: ['tilt-turn', 'casement', 'sliding-2track'],
    href: '/products/fixed-picture',
  },
  {
    id: 'bay-window',
    slug: 'bay-window',
    category: 'Bay & Bow',
    name: 'Bay Window',
    tagline: 'Three-panel angled projection, light and space',
    description: 'Classic three-panel bay at 30° or 45° projection with structural corner posts and optional integrated seat board.',
    longDescription: `The Bay Window is the most transformative architectural element we manufacture — projecting 300–600 mm beyond the wall plane, flooding the interior with three-directional light, and visually doubling the apparent width of any room it serves.

Our bay consists of a large fixed or opening centre light flanked by two angled sidelights at 30° (shallow projection, suits most masonry reveals) or 45° (deeper projection, maximum light gain). Structural UPVC corner posts carry the full dead and wind load — no steel angle or timber knee brace required.

Options include: casement or tilt-turn sidelights, integrated painted MDF seat board, external soffit liner, and a full range of glazing styles (obscure, stained-effect, solar-control). Supplied as a factory-assembled bay for single-day installation.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'White UPVC bay window projecting from living room wall, classic styling',
    badge: { label: 'Premium', variant: 'premium' },
    startingPrice: '₹600',
    priceUnit: 'set',
    rating: 4.7,
    reviews: 156,
    uValue: '1.1 W/m²K',
    acoustic: '43 dB',
    profiles: '6-chamber',
    highlights: ['30° / 45° angles', 'Structural corner posts', 'Seat board option', 'Factory assembled'],
    features: [
      { icon: 'RulerIcon', title: '30° or 45° Projection', body: '30° suits most reveals and projects 300–400 mm; 45° maximises light capture and projects 400–600 mm. Both structurally self-supporting.' },
      { icon: 'LayersIcon', title: 'Self-Supporting Posts', body: 'Extruded structural UPVC corner posts with co-extruded aluminium core carry dead load and wind pressure — no hidden steel required.' },
      { icon: 'WindIcon', title: 'Opening Sidelights', body: 'Sidelights can be specified as casement or tilt-turn for ventilation. Centre light is typically fixed to maximise glazed area.' },
      { icon: 'ThermometerIcon', title: 'Integrated Seat Board', body: 'Painted MDF seat board finished with same colour as frame interior — installed in factory and site-fitted as single unit.' },
    ],
    specs: [
      { label: 'Projection Angles', value: '30° and 45°' },
      { label: 'Profile', value: '6-chamber 70 mm' },
      { label: 'U-Value', value: '1.1 W/m²K' },
      { label: 'Acoustic', value: '43 dB' },
      { label: 'Centre Width', value: '600–1500 mm' },
      { label: 'Side Width', value: '400–600 mm' },
      { label: 'Supply', value: 'Factory-assembled' },
      { label: 'Lead Time', value: '15–20 working days' },
    ],
    applications: ['Living Rooms', 'Master Bedrooms', 'Period Properties', 'Bungalows'],
    relatedSlugs: ['french-casement', 'lift-slide', 'fixed-picture'],
    href: '/products/bay-window',
  },
  {
    id: 'louvre',
    slug: 'louvre',
    category: 'Louvre',
    name: 'Louvre Vent',
    tagline: 'Angled blades, continuous airflow, rain-resistant',
    description: 'Adjustable glass blades allow continuous passive ventilation even during light rain. Monsoon-rated drainage channel.',
    longDescription: `Designed for India's tropical climate, the Louvre Vent delivers what no other window can: continuous passive ventilation that keeps working during light rain and works entirely without electricity.

Between 4 and 8 glass blades (50 mm wide) are held in neoprene-lined aluminium holders and pivot simultaneously via a crank operator. Angle them near-horizontal for maximum airflow, steepen them to deflect driving rain. Our monsoon-rated drainage channel captures any water that penetrates and drains it to the outside.

Ideal for utility rooms, bathrooms, stairwells, kitchens, and any space where persistent background ventilation is essential. Requires no mechanical extract fan when correctly sized. Blade glass available in clear, tinted, obscured, or wired options.`,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16a9d29c5-1773648814205.png',
    imageAlt: 'UPVC louvre vent window with angled glass blades in tropical setting',
    badge: { label: 'Eco Choice', variant: 'eco' },
    startingPrice: '₹550',
    priceUnit: 'per sq ft',
    rating: 4.6,
    reviews: 203,
    uValue: '1.6 W/m²K',
    acoustic: '34 dB',
    profiles: '4-chamber',
    highlights: ['Adjustable blade angle', 'No power needed', 'Monsoon drainage', 'Replaces extract fans'],
    features: [
      { icon: 'WindIcon', title: 'Continuous Passive Ventilation', body: '4–8 glass blades open independently of rain — the only window type that ventilates even during a monsoon shower.' },
      { icon: 'ThermometerIcon', title: 'No Electricity Required', body: 'Gravity-driven cross-ventilation. When oriented perpendicular to prevailing breeze, replaces mechanical extract fans in bathrooms and kitchens entirely.' },
      { icon: 'RulerIcon', title: 'Adjustable Blade Angle', body: 'Crank operator adjusts all blades simultaneously from 15° (rain exclusion) to 75° (maximum airflow). Locking positions at every 15°.' },
      { icon: 'LayersIcon', title: 'Monsoon-Rated Drainage', body: 'Deep drainage channel below the blade bank captures any ingress and routes it to external weep holes — tested at 600 Pa simulated driving rain.' },
    ],
    specs: [
      { label: 'Profile Depth', value: '60 mm' },
      { label: 'Chambers', value: '4-chamber' },
      { label: 'U-Value', value: '1.6 W/m²K' },
      { label: 'Acoustic', value: '34 dB' },
      { label: 'Blade Count', value: '4–8 blades' },
      { label: 'Blade Width', value: '50 mm each' },
      { label: 'Operation', value: 'Crank + locking' },
      { label: 'Glass Options', value: 'Clear / Tinted / Obscure' },
    ],
    applications: ['Bathrooms', 'Kitchens', 'Stairwells', 'Utility Rooms'],
    relatedSlugs: ['sliding-2track', 'fixed-picture', 'casement'],
    href: '/products/louvre',
  },
];

/* ─────────────────────────────────────────────
   Badge styles
───────────────────────────────────────────── */
const badgeStyles: Record<string, string> = {
  popular: 'bg-primary/10 text-primary border-primary/20',
  new: 'bg-accent/10 text-accent border-accent/20',
  premium: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  eco: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
};

function Badge({ label, variant }: { label: string; variant: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-700 px-3 py-1 rounded-full border ${badgeStyles[variant]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 shrink-0" />
      {label}
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} viewBox="0 0 12 12" className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? 'fill-amber-400' : 'fill-border'}`}>
          <path d="M6 1l1.24 2.52L10 3.93l-2 1.95.47 2.76L6 7.27 3.53 8.64 4 5.88 2 3.93l2.76-.41z" />
        </svg>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Related Card
───────────────────────────────────────────── */
function RelatedCard({ product }: { product: ProductDetail }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={product.href}
      className="group block rounded-2xl border border-border/60 bg-card overflow-hidden"
      style={{
        boxShadow: hovered ? '0 20px 48px -8px rgba(0,0,0,0.14)' : '0 2px 8px -2px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-36 overflow-hidden bg-secondary/30">
        <AppImage
          src={product.image}
          alt={product.imageAlt}
          fill
          className={`object-cover transition-transform duration-700 ease-out ${hovered ? 'scale-[1.08]' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="absolute top-3 left-3 text-[10px] font-500 text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">
          {product.category}
        </span>
      </div>
      <div className="p-4">
        <p className="text-sm font-700 text-foreground leading-tight">{product.name}</p>
        <p className="text-xs font-400 text-muted-foreground mt-1 leading-snug line-clamp-2">{product.tagline}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
          <p className="text-sm font-700 text-foreground">{product.startingPrice}</p>
          <span className="text-xs font-600 text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
            View <Icon name="ArrowRightIcon" size={11} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function ProductDetailPage({ slug }: { slug: string }) {
  const product = allProducts.find((p) => p.slug === slug);

  const heroRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const heroView = useInView(heroRef, { once: true });
  const bodyView = useInView(bodyRef, { once: true, margin: '-60px' });

  const [tab, setTab] = useState<'features' | 'specs'>('features');

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-lg font-700 text-foreground">Product not found</p>
        <p className="text-xs font-400 text-muted-foreground font-mono bg-secondary px-3 py-1 rounded">
          slug: &quot;{slug}&quot;
        </p>
        <Link href="/#products" className="btn-primary inline-flex items-center gap-2">
          <Icon name="ArrowLeftIcon" size={14} />
          Back to Products
        </Link>
      </main>
    );
  }

  const relatedProducts = product.relatedSlugs
    .map((s) => allProducts.find((p) => p.slug === s))
    .filter(Boolean) as ProductDetail[];

  return (
    <main className="min-h-screen mt-[100px] bg-background">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative overflow-hidden bg-background">

        {/* Full-bleed background image */}
        <div className="absolute inset-0 h-[520px] sm:h-[580px] lg:h-[640px]">
          <AppImage
            src={product.image}
            alt={product.imageAlt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-12 sm:py-16 lg:py-20 items-center min-h-[520px] sm:min-h-[580px] lg:min-h-[640px]">

            {/* Left: product info */}
            <div className="lg:col-span-7 flex flex-col justify-center gap-5">

              {/* Category + Badge row */}
              <motion.div
                className="flex items-center gap-2.5 flex-wrap"
                initial={{ opacity: 0, y: 16 }}
                animate={heroView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <Link
                  href="/#products"
                  className="inline-flex items-center gap-1.5 text-xs font-500 text-foreground hover:text-foreground transition-colors bg-background/95 border border-border/70 px-3 py-1.5 rounded-full shadow-sm"
                >
                  <Icon name="ArrowLeftIcon" size={11} />
                  All Products
                </Link>
                <span className="text-xs font-500 text-foreground bg-background/95 border border-border/70 px-3 py-1.5 rounded-full shadow-sm">
                  {product.category}
                </span>
                {product.badge && <Badge label={product.badge.label} variant={product.badge.variant} />}
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-800 tracking-tight text-foreground leading-[1.02]"
                  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.12)' }}
                >
                  {product.name}
                </h1>
                <p className="mt-3 text-base sm:text-lg font-600 text-primary leading-snug">
                  {product.tagline}
                </p>
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-sm sm:text-base font-400 text-foreground/90 leading-relaxed max-w-lg"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.10)' }}
                initial={{ opacity: 0, y: 14 }}
                animate={heroView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                {product.description}
              </motion.p>

              {/* Rating */}
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={heroView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Stars rating={product.rating} />
                <span className="text-sm font-700 text-foreground">{product.rating}</span>
                <span className="text-sm font-400 text-foreground/80">({product.reviews} verified reviews)</span>
              </motion.div>

              {/* Highlight chips */}
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={heroView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                {product.highlights.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1.5 text-xs font-500 text-foreground bg-background/95 backdrop-blur-sm border border-border/80 px-3 py-1.5 rounded-full shadow-md"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {h}
                  </span>
                ))}
              </motion.div>

              {/* Mobile CTA strip */}
              <motion.div
                className="flex items-center gap-3 lg:hidden pt-1"
                initial={{ opacity: 0, y: 10 }}
                animate={heroView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link href="/product-configurator" className="btn-primary flex-1 justify-center text-sm">
                  Get Quote
                  <Icon name="ArrowRightIcon" size={14} />
                </Link>
                <Link
                  href="/book-survey"
                  className="flex-1 flex items-center justify-center px-4 py-2.5 rounded-xl border border-border/80 text-sm font-500 text-foreground hover:bg-secondary/60 transition-colors"
                >
                  Book Survey
                </Link>
              </motion.div>
            </div>

            {/* Right: pricing card — desktop only */}
            <motion.div
              className="lg:col-span-5 hidden lg:flex items-center justify-end"
              initial={{ opacity: 0, x: 24 }}
              animate={heroView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-full max-w-sm bg-card/90 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-2xl">
                {/* Spec trio */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {[
                    { label: 'U-Value', value: product.uValue },
                    { label: 'Acoustic', value: product.acoustic },
                    { label: 'Profile', value: product.profiles },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-1 px-2 py-3.5 rounded-2xl bg-secondary/80 border border-border/30">
                      <span className="text-xs font-700 text-primary text-center leading-tight">{s.value}</span>
                      <span className="text-[9px] font-500 text-muted-foreground uppercase tracking-widest">{s.label}</span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-border/50 mb-5" />

                {/* Price */}
                <div className="mb-5">
                  <p className="text-[10px] font-700 text-muted-foreground uppercase tracking-[0.2em] mb-1">Starting from</p>
                  <p className="text-4xl font-800 text-foreground tracking-tight leading-none">
                    {product.startingPrice}
                  </p>
                  <p className="text-xs font-400 text-muted-foreground mt-1.5">{product.priceUnit} · including installation</p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-2.5">
                  <Link href="/product-configurator" className="btn-primary w-full justify-center py-3">
                    Configure &amp; Get Quote
                    <Icon name="ArrowRightIcon" size={15} />
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-center gap-4">
                  {['ISO Certified', 'Made in Mumbai', '10-yr Warranty'].map((t) => (
                    <span key={t} className="text-[9px] font-500 text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-primary/60" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div ref={bodyRef} className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 space-y-20 sm:space-y-24 lg:space-y-28">

          {/* ── About + Applications ── */}
          <motion.section
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
            initial={{ opacity: 0, y: 28 }}
            animate={bodyView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Long description */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-6 h-0.5 bg-primary rounded-full" />
                <span className="section-label">About This Product</span>
              </div>
              <div className="space-y-4 text-sm sm:text-base font-400 text-muted-foreground leading-relaxed">
                {product.longDescription.split('\n\n').map((para, i) => (
                  <p key={i}>{para.trim()}</p>
                ))}
              </div>
            </div>

            {/* Applications */}
            <div className="lg:col-span-5">
              <p className="text-xs font-700 text-muted-foreground uppercase tracking-[0.18em] mb-4">Best Suited For</p>
              <div className="flex flex-col gap-2.5">
                {product.applications.map((app, i) => (
                  <motion.div
                    key={app}
                    className="flex items-center gap-3.5 px-4 py-3.5 rounded-2xl bg-secondary/50 border border-border/40 hover:border-primary/20 hover:bg-secondary/80 transition-colors"
                    initial={{ opacity: 0, x: 16 }}
                    animate={bodyView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                  >
                    <div className="w-7 h-7 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center shrink-0">
                      <Icon name="CheckIcon" size={11} className="text-primary" />
                    </div>
                    <span className="text-sm font-600 text-foreground">{app}</span>
                  </motion.div>
                ))}
              </div>

              {/* Mobile pricing card */}
              <div className="mt-8 lg:hidden bg-card border border-border/50 rounded-3xl p-5 shadow-lg">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: 'U-Value', value: product.uValue },
                    { label: 'Acoustic', value: product.acoustic },
                    { label: 'Profile', value: product.profiles },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-1 px-2 py-3 rounded-xl bg-secondary/80">
                      <span className="text-xs font-700 text-primary text-center leading-tight">{s.value}</span>
                      <span className="text-[9px] font-500 text-muted-foreground uppercase tracking-widest">{s.label}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border/40 pt-4">
                  <p className="text-[10px] font-700 text-muted-foreground uppercase tracking-[0.15em]">Starting from</p>
                  <p className="text-3xl font-800 text-foreground mt-1">{product.startingPrice}</p>
                  <p className="text-xs font-400 text-muted-foreground mt-1">{product.priceUnit} · including installation</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ── Features / Specs tabs ── */}
          <motion.section
            initial={{ opacity: 0, y: 28 }}
            animate={bodyView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="block w-6 h-0.5 bg-primary rounded-full" />
                <span className="section-label">Details</span>
              </div>

              {/* Tab switcher */}
              <div className="flex items-center gap-1 p-1 bg-secondary/70 border border-border/40 rounded-2xl">
                {(['features', 'specs'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`relative px-5 py-2 rounded-xl text-sm font-500 transition-colors duration-200 ${
                      tab === t ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab === t && (
                      <motion.span
                        layoutId="detail-tab-pill"
                        className="absolute inset-0 bg-primary rounded-xl"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 capitalize">{t}</span>
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {tab === 'features' ? (
                <motion.div
                  key="features"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {product.features.map((f, i) => (
                    <motion.div
                      key={f.title}
                      className="flex gap-4 p-5 sm:p-6 rounded-2xl bg-card border border-border/50 hover:border-border/80 hover:shadow-md transition-all duration-200"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                    >
                      <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/10 flex items-center justify-center shrink-0">
                        <Icon name={f.icon} size={20} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-700 text-foreground mb-1.5">{f.title}</p>
                        <p className="text-xs font-400 text-muted-foreground leading-relaxed">{f.body}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="specs"
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {product.specs.map((s, i) => (
                    <motion.div
                      key={s.label}
                      className="flex flex-col gap-1.5 p-4 sm:p-5 rounded-2xl bg-card border border-border/50 hover:border-border/80 hover:shadow-md transition-all duration-200"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <span className="text-[9px] font-700 text-muted-foreground uppercase tracking-[0.18em]">{s.label}</span>
                      <span className="text-sm sm:text-base font-700 text-foreground leading-tight">{s.value}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* ── Related products ── */}
          {relatedProducts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 28 }}
              animate={bodyView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18 }}
            >
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <span className="block w-6 h-0.5 bg-primary rounded-full" />
                  <span className="section-label">You Might Also Consider</span>
                </div>
                <Link href="/#products" className="text-xs font-500 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  View all <Icon name="ArrowRightIcon" size={11} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {relatedProducts.map((rp) => (
                  <RelatedCard key={rp.id} product={rp} />
                ))}
              </div>
            </motion.section>
          )}

          {/* ── CTA Banner ── */}
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-border/50 bg-card"
            initial={{ opacity: 0, y: 20 }}
            animate={bodyView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10">
              <div className="text-center sm:text-left">
                <p className="text-xl sm:text-2xl font-800 text-foreground leading-tight">
                  Ready for a quote on {product.name}?
                </p>
                <p className="text-sm font-400 text-muted-foreground mt-2 max-w-md">
                  Our specialists visit, measure, and recommend — completely free. No obligation.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center sm:justify-end">
                <Link href="/product-configurator" className="btn-primary whitespace-nowrap">
                  Configure Windows
                  <Icon name="ArrowRightIcon" size={16} />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}