'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Config {
  windowType: string;
  width: number;
  height: number;
  glassType: string;
  frameColor: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const windowTypes = [
  { id: 'casement', label: 'Casement', desc: 'Side-hinged, versatile', basePrice: 18500 },
  { id: 'sliding', label: 'Sliding', desc: 'Space-saving, smooth glide', basePrice: 16500 },
  { id: 'tilt-turn', label: 'Tilt & Turn', desc: 'Dual-opening, secure', basePrice: 22000 },
  { id: 'fixed', label: 'Fixed Light', desc: 'Maximum glazed area', basePrice: 13500 },
  { id: 'bay', label: 'Bay Window', desc: 'Panoramic projection', basePrice: 38000 },
  { id: 'arch', label: 'Arch / Shaped', desc: 'Custom curved designs', basePrice: 32000 },
];

const doorTypes = [
  { id: 'upvc-door', label: 'UPVC Door', desc: 'Insulated, secure entry', basePrice: 28000 },
  { id: 'sliding-door', label: 'Sliding Patio Door', desc: 'Wide opening, seamless', basePrice: 42000 },
  { id: 'french-door', label: 'French Door', desc: 'Double-leaf elegance', basePrice: 48000 },
  { id: 'folding-door', label: 'Bi-fold Door', desc: 'Full-width opening', basePrice: 65000 },
];

const glassTypes = [
  { id: 'double', label: 'Double Glazed', desc: 'Standard · Low-E coating', multiplier: 1 },
  { id: 'triple', label: 'Triple Glazed', desc: 'Premium · SHGC 0.25', multiplier: 1.35 },
  { id: 'acoustic', label: 'Acoustic', desc: 'Noise-focused · 42dB', multiplier: 1.55 },
  { id: 'solar', label: 'Solar Control', desc: 'UV filter + heat block', multiplier: 1.45 },
  { id: 'tinted', label: 'Tinted Glass', desc: 'Privacy + solar control', multiplier: 1.3 },
  { id: 'frosted', label: 'Frosted / Obscure', desc: 'Bathroom & privacy use', multiplier: 1.2 },
];

const frameColors = [
  { id: 'white', label: 'Pearl White', hex: '#F5F5F0', border: '#D1CEC8', multiplier: 1 },
  { id: 'cream', label: 'Ivory Cream', hex: '#EDE8DC', border: '#CFC9BC', multiplier: 1 },
  { id: 'anthracite', label: 'Anthracite', hex: '#3C3C3C', border: '#282828', multiplier: 1.12 },
  { id: 'black', label: 'Jet Black', hex: '#1A1A1A', border: '#0D0D0D', multiplier: 1.15 },
  { id: 'woodgrain', label: 'Teak Grain', hex: '#A0784A', border: '#8A6438', multiplier: 1.18 },
  { id: 'grey', label: 'Slate Grey', hex: '#7A8590', border: '#626E78', multiplier: 1.08 },
  { id: 'champagne', label: 'Champagne', hex: '#C8B89A', border: '#B0A080', multiplier: 1.1 },
  { id: 'bronze', label: 'Bronze', hex: '#7B5E3A', border: '#5E4520', multiplier: 1.14 },
];

const productCategories = [
  { id: 'windows', label: 'Windows', icon: 'WindowIcon' },
  { id: 'doors', label: 'Doors', icon: 'HomeIcon' },
];

// ─── Price Calculator ─────────────────────────────────────────────────────────
function calcPrice(config: Config, category: string): number {
  const allTypes = [...windowTypes, ...doorTypes];
  const type = allTypes.find((t) => t.id === config.windowType);
  const glass = glassTypes.find((g) => g.id === config.glassType);
  const color = frameColors.find((c) => c.id === config.frameColor);
  if (!type || !glass || !color) return 0;

  const area = (config.width / 1000) * (config.height / 1000);
  const areaMultiplier = 0.7 + area * 0.6;
  return Math.round(type.basePrice * glass.multiplier * color.multiplier * areaMultiplier);
}

// ─── Animated Price ───────────────────────────────────────────────────────────
function AnimatedPrice({ price }: { price: number }) {
  const [displayed, setDisplayed] = useState(price);
  const [prev, setPrev] = useState(price);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (price === prev) return;
    setAnimating(true);
    const start = prev;
    const end = price;
    const duration = 600;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(start + (end - start) * ease));
      if (progress < 1) requestAnimationFrame(animate);
      else {
        setDisplayed(end);
        setPrev(end);
        setAnimating(false);
      }
    };
    requestAnimationFrame(animate);
  }, [price]);

  return (
    <span className={`transition-colors duration-200 ${animating ? 'text-accent' : 'text-primary'}`}>
      ₹{displayed.toLocaleString('en-IN')}
    </span>
  );
}

// ─── Window Preview SVG ───────────────────────────────────────────────────────
function WindowPreview({ config }: { config: Config }) {
  const color = frameColors.find((c) => c.id === config.frameColor) || frameColors[0];
  const frameW = Math.min(220, Math.max(140, config.width / 8));
  const frameH = Math.min(260, Math.max(160, config.height / 8));
  const frameStroke = 10;
  const svgW = frameW + 60;
  const svgH = frameH + 80;

  const glassColor = config.glassType === 'solar' ? 'rgba(180,210,200,0.45)'
    : config.glassType === 'acoustic' ? 'rgba(200,215,240,0.45)'
    : config.glassType === 'tinted' ? 'rgba(100,140,180,0.55)'
    : config.glassType === 'frosted' ? 'rgba(220,225,235,0.75)'
    : 'rgba(210,225,245,0.45)';

  const isSash = config.windowType === 'sliding';
  const isTiltTurn = config.windowType === 'tilt-turn';
  const isBay = config.windowType === 'bay';
  const isDoor = ['upvc-door', 'sliding-door', 'french-door', 'folding-door'].includes(config.windowType);

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        width={svgW}
        height={svgH}
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="drop-shadow-[0_8px_32px_rgba(44,74,110,0.18)]"
      >
        {/* Shadow */}
        <rect x={34} y={24} width={frameW} height={frameH} rx={4} fill="rgba(0,0,0,0.08)" />
        {/* Outer frame */}
        <rect x={30} y={20} width={frameW} height={frameH} rx={3} fill={color.hex} stroke={color.border} strokeWidth={2} />
        {/* Inner glass area */}
        <rect x={30 + frameStroke} y={20 + frameStroke} width={frameW - frameStroke * 2} height={frameH - frameStroke * 2} rx={1} fill={glassColor} stroke={color.border} strokeWidth={1} />
        {/* Glass reflection */}
        <rect x={30 + frameStroke + 6} y={20 + frameStroke + 6} width={16} height={(frameH - frameStroke * 2) * 0.6} rx={2} fill="rgba(255,255,255,0.25)" />
        {/* Sliding divider */}
        {isSash && (
          <rect x={30 + frameStroke} y={20 + frameH / 2 - 4} width={frameW - frameStroke * 2} height={frameStroke - 2} fill={color.hex} stroke={color.border} strokeWidth={1} />
        )}
        {/* Casement handle */}
        {config.windowType === 'casement' && (
          <rect x={30 + frameW - frameStroke - 10} y={20 + frameH / 2 - 8} width={6} height={16} rx={3} fill={color.border} />
        )}
        {/* Tilt-turn indicator */}
        {isTiltTurn && (
          <>
            <line x1={30 + frameStroke + 4} y1={20 + frameH - frameStroke - 4} x2={30 + frameW / 2} y2={20 + frameStroke + 4} stroke={color.border} strokeWidth={1.5} strokeDasharray="4 3" />
            <line x1={30 + frameW - frameStroke - 4} y1={20 + frameH - frameStroke - 4} x2={30 + frameW / 2} y2={20 + frameH / 2} stroke={color.border} strokeWidth={1.5} strokeDasharray="4 3" />
          </>
        )}
        {/* Bay window extra panels */}
        {isBay && (
          <>
            <rect x={30 + frameStroke} y={20 + frameStroke} width={(frameW - frameStroke * 2) / 3 - 2} height={frameH - frameStroke * 2} rx={1} fill={glassColor} stroke={color.border} strokeWidth={1} />
            <rect x={30 + frameStroke + (frameW - frameStroke * 2) * 2 / 3 + 2} y={20 + frameStroke} width={(frameW - frameStroke * 2) / 3 - 2} height={frameH - frameStroke * 2} rx={1} fill={glassColor} stroke={color.border} strokeWidth={1} />
          </>
        )}
        {/* Door handle */}
        {isDoor && (
          <>
            <rect x={30 + frameW / 2 - 3} y={20 + frameH * 0.55} width={6} height={20} rx={3} fill={color.border} />
            <rect x={30 + frameStroke} y={20 + frameH - frameStroke * 2} width={frameW - frameStroke * 2} height={frameStroke - 2} fill={color.hex} stroke={color.border} strokeWidth={1} />
          </>
        )}
        {/* Sill */}
        <rect x={22} y={20 + frameH} width={frameW + 16} height={10} rx={2} fill={color.hex} stroke={color.border} strokeWidth={1.5} />
      </svg>

      {/* Dimensions label */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="font-600 text-foreground">{config.width}mm</span>
        <Icon name="XMarkIcon" size={10} />
        <span className="font-600 text-foreground">{config.height}mm</span>
      </div>
    </div>
  );
}

// ─── Enhanced Quote Form ──────────────────────────────────────────────────────
function QuoteForm({ config, price, onClose, category }: { config: Config; price: number; onClose: () => void; category: string }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    propertyType: '',
    quantity: '1',
    timeline: '',
    notes: '',
  });
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const allTypes = [...windowTypes, ...doorTypes];
  const colorLabel = frameColors.find((c) => c.id === config.frameColor)?.label;
  const glassLabel = glassTypes.find((g) => g.id === config.glassType)?.label;
  const typeLabel = allTypes.find((t) => t.id === config.windowType)?.label;

  const inputClass =
    'w-full h-11 px-4 rounded-xl border border-border/80 bg-white text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-200';
  const selectClass =
    'w-full h-11 px-4 rounded-xl border border-border/80 bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-200 cursor-pointer';

  const totalEstimate = price * parseInt(form.quantity || '1');

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-card rounded-3xl shadow-strong border border-border/60 w-full max-w-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Header */}
        <div className="bg-primary px-7 py-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-800 text-white">Get Your Free Quote</h3>
            <p className="text-white/70 text-xs mt-0.5">Instant estimate · No obligation · Free home survey</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <Icon name="XMarkIcon" size={18} className="text-white" />
          </button>
        </div>

        <div className="p-7 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <motion.div
              className="flex flex-col items-center text-center gap-5 py-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="CheckIcon" size={28} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-800 text-foreground">Quote request sent!</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Dhanyavaad, {form.name || 'there'}! A Keepexa Interior's specialist will contact you within 2 hours to confirm your quote and arrange a free home survey in {form.city || 'your city'}.
                </p>
              </div>
              <div className="w-full p-4 rounded-2xl bg-secondary/60 border border-border/60 text-left">
                <p className="text-xs font-700 text-muted-foreground uppercase tracking-wide mb-3">Your Configuration Summary</p>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div><span className="text-muted-foreground text-xs">Product:</span><p className="font-600 text-foreground">{typeLabel}</p></div>
                  <div><span className="text-muted-foreground text-xs">Glass:</span><p className="font-600 text-foreground">{glassLabel}</p></div>
                  <div><span className="text-muted-foreground text-xs">Size:</span><p className="font-600 text-foreground">{config.width} × {config.height}mm</p></div>
                  <div><span className="text-muted-foreground text-xs">Colour:</span><p className="font-600 text-foreground">{colorLabel}</p></div>
                  <div><span className="text-muted-foreground text-xs">Quantity:</span><p className="font-600 text-foreground">{form.quantity} unit(s)</p></div>
                  <div><span className="text-muted-foreground text-xs">City:</span><p className="font-600 text-foreground">{form.city}</p></div>
                </div>
                <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Estimate</span>
                  <span className="text-xl font-800 text-primary">₹{totalEstimate.toLocaleString('en-IN')} <span className="text-xs font-500 text-muted-foreground">+ GST</span></span>
                </div>
              </div>
              <button onClick={onClose} className="btn-primary w-full justify-center">
                Configure Another Product
              </button>
            </motion.div>
          ) : (
            <>
              {/* Config summary */}
              <div className="p-4 rounded-2xl bg-secondary/60 border border-border/60 mb-5">
                <p className="text-xs font-700 text-muted-foreground uppercase tracking-wide mb-2">Your Selection</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-muted-foreground">Type:</span> <span className="font-600 text-foreground">{typeLabel}</span></div>
                  <div><span className="text-muted-foreground">Glass:</span> <span className="font-600 text-foreground">{glassLabel}</span></div>
                  <div><span className="text-muted-foreground">Size:</span> <span className="font-600 text-foreground">{config.width} × {config.height}mm</span></div>
                  <div><span className="text-muted-foreground">Colour:</span> <span className="font-600 text-foreground">{colorLabel}</span></div>
                </div>
                <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Per Unit Estimate</span>
                  <span className="text-xl font-800 text-primary">₹{price.toLocaleString('en-IN')} <span className="text-xs font-500 text-muted-foreground">+ GST</span></span>
                </div>
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-5">
                <div className={`flex items-center gap-1.5 text-xs font-700 px-3 py-1.5 rounded-full ${step === 1 ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                  <span>1</span><span>Contact Details</span>
                </div>
                <div className="flex-1 h-px bg-border/60" />
                <div className={`flex items-center gap-1.5 text-xs font-700 px-3 py-1.5 rounded-full ${step === 2 ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>
                  <span>2</span><span>Project Details</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {step === 1 ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-700 text-muted-foreground uppercase tracking-wide block mb-1.5">Full Name *</label>
                        <input type="text" className={inputClass} placeholder="Rahul Sharma" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                      </div>
                      <div>
                        <label className="text-xs font-700 text-muted-foreground uppercase tracking-wide block mb-1.5">Mobile *</label>
                        <input type="tel" className={inputClass} placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-700 text-muted-foreground uppercase tracking-wide block mb-1.5">Email Address *</label>
                      <input type="email" className={inputClass} placeholder="rahul@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                    </div>
                    <div>
                      <label className="text-xs font-700 text-muted-foreground uppercase tracking-wide block mb-1.5">City *</label>
                      <select className={selectClass} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required>
                        <option value="">Select your city</option>
                        {['Mumbai', 'Delhi NCR', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Ahmedabad', 'Kolkata', 'Jaipur', 'Chandigarh', 'Surat', 'Nagpur', 'Other'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!form.name || !form.phone || !form.email || !form.city}
                      className="btn-primary justify-center mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next: Project Details
                      <Icon name="ArrowRightIcon" size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-700 text-muted-foreground uppercase tracking-wide block mb-1.5">Property Type</label>
                        <select className={selectClass} value={form.propertyType} onChange={(e) => setForm({ ...form, propertyType: e.target.value })}>
                          <option value="">Select type</option>
                          {['Apartment / Flat', 'Independent House', 'Villa', 'Bungalow', 'Commercial Office', 'Retail Shop', 'Builder Project'].map(p => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-700 text-muted-foreground uppercase tracking-wide block mb-1.5">Quantity</label>
                        <input type="number" min="1" max="500" className={inputClass} placeholder="No. of units" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-700 text-muted-foreground uppercase tracking-wide block mb-1.5">Expected Timeline</label>
                      <select className={selectClass} value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })}>
                        <option value="">When do you need this?</option>
                        {['Within 1 month', '1–3 months', '3–6 months', 'Planning stage', 'Just exploring'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-700 text-muted-foreground uppercase tracking-wide block mb-1.5">Additional Notes</label>
                      <textarea
                        className={`${inputClass} h-20 py-3 resize-none`}
                        placeholder="Any special requirements, floor number, existing frame type..."
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      />
                    </div>
                    {/* Total estimate */}
                    <div className="p-3 rounded-xl bg-primary/5 border border-primary/15 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Total for {form.quantity || 1} unit(s)</p>
                        <p className="text-lg font-800 text-primary">₹{totalEstimate.toLocaleString('en-IN')} <span className="text-xs font-500 text-muted-foreground">+ GST</span></p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Includes</p>
                        <p className="text-xs font-600 text-foreground">Supply + Installation</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center">
                        <Icon name="ChevronLeftIcon" size={16} />
                        Back
                      </button>
                      <button type="submit" className="btn-primary flex-1 justify-center">
                        Request Quote
                        <Icon name="ArrowRightIcon" size={16} />
                      </button>
                    </div>
                  </>
                )}
                <p className="text-xs text-center text-muted-foreground">
                  No obligation · Free home survey included · Response within 2 hours
                </p>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Configurator ────────────────────────────────────────────────────────
export default function ConfiguratorMain() {
  const [category, setCategory] = useState<string>('windows');
  const [config, setConfig] = useState<Config>({
    windowType: 'casement',
    width: 1200,
    height: 1400,
    glassType: 'double',
    frameColor: 'white',
  });
  const [quoteOpen, setQuoteOpen] = useState(false);
  const price = calcPrice(config, category);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const selectedColor = frameColors.find((c) => c.id === config.frameColor) || frameColors[0];
  const currentTypes = category === 'windows' ? windowTypes : doorTypes;

  // Reset window type when category changes
  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setConfig((prev) => ({
      ...prev,
      windowType: cat === 'windows' ? 'casement' : 'upvc-door',
    }));
  };

  return (
    <>
      <section className="py-8 sm:py-12 pb-16 sm:pb-24 bg-background" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Category Tabs */}
          <motion.div
            className="flex items-center gap-2 mb-6 sm:mb-8 p-1.5 bg-secondary/60 rounded-2xl border border-border/60 w-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-700 transition-all duration-200 ${
                  category === cat.id
                    ? 'bg-white text-primary shadow-soft border border-border/60'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={cat.icon as 'WindowIcon'} size={16} />
                {cat.label}
              </button>
            ))}
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* ── Left: Preview Panel ─────────────────────────────────────── */}
            <div className="lg:sticky lg:top-28">
              <div className="bg-card rounded-3xl border border-border/60 shadow-medium overflow-hidden">
                {/* Preview area */}
                <div
                  className="relative flex items-center justify-center py-10 sm:py-14 px-6 sm:px-8"
                  style={{ background: `linear-gradient(135deg, ${selectedColor.hex}22 0%, #F0EDE820 100%)` }}
                >
                  <WindowPreview config={config} />

                  {/* Glass type badge */}
                  <div className="absolute top-4 right-4 glass-card px-3 py-1.5 rounded-full border border-border/60">
                    <span className="text-xs font-700 text-foreground">
                      {glassTypes.find((g) => g.id === config.glassType)?.label}
                    </span>
                  </div>
                </div>

                {/* Price display */}
                <div className="px-5 sm:px-7 py-4 sm:py-5 border-t border-border/60">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-700 text-muted-foreground uppercase tracking-wide">Estimated Price</p>
                      <p className="text-2xl sm:text-3xl font-800 mt-1 leading-none">
                        <AnimatedPrice price={price} />
                        <span className="text-sm font-500 text-muted-foreground ml-1">+ GST</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1.5">Per unit · Supply & installation included</p>
                    </div>
                    <button
                      onClick={() => setQuoteOpen(true)}
                      className="btn-primary text-sm py-3 px-4 sm:px-5 shrink-0"
                    >
                      Get Quote
                      <Icon name="ArrowRightIcon" size={15} />
                    </button>
                  </div>
                </div>

                {/* Config summary chips */}
                <div className="px-5 sm:px-7 pb-5 flex flex-wrap gap-2">
                  {[
                    [...windowTypes, ...doorTypes].find((t) => t.id === config.windowType)?.label,
                    `${config.width} × ${config.height}mm`,
                    glassTypes.find((g) => g.id === config.glassType)?.label,
                    frameColors.find((c) => c.id === config.frameColor)?.label,
                  ].map((chip) => (
                    <span key={chip} className="text-xs font-500 text-muted-foreground bg-secondary/80 border border-border/60 px-3 py-1.5 rounded-lg">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: Controls Panel ────────────────────────────────────── */}
            <div className="flex flex-col gap-5 sm:gap-6">
              {/* Product Type */}
              <div className="bg-card rounded-3xl border border-border/60 shadow-soft p-5 sm:p-6">
                <h3 className="text-sm font-700 text-foreground uppercase tracking-wide mb-4">
                  {category === 'windows' ? 'Window Type' : 'Door Type'}
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {currentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setConfig({ ...config, windowType: type.id })}
                      className={`p-3 sm:p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                        config.windowType === type.id
                          ? 'border-primary bg-primary/5' : 'border-border/60 hover:border-accent/60 bg-background'
                      }`}
                    >
                      <p className={`text-sm font-700 ${config.windowType === type.id ? 'text-primary' : 'text-foreground'}`}>
                        {type.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{type.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions */}
              <div className="bg-card rounded-3xl border border-border/60 shadow-soft p-5 sm:p-6">
                <h3 className="text-sm font-700 text-foreground uppercase tracking-wide mb-5">Dimensions</h3>
                <div className="flex flex-col gap-6">
                  {[
                    { label: 'Width', key: 'width' as const, min: 400, max: 2400, unit: 'mm' },
                    { label: 'Height', key: 'height' as const, min: 400, max: 2400, unit: 'mm' },
                  ].map((dim) => (
                    <div key={dim.key}>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-600 text-foreground">{dim.label}</label>
                        <span className="text-sm font-800 text-primary">{config[dim.key]}mm</span>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min={dim.min}
                          max={dim.max}
                          step={50}
                          value={config[dim.key]}
                          onChange={(e) => setConfig({ ...config, [dim.key]: Number(e.target.value) })}
                          className="w-full h-2 rounded-full appearance-none cursor-pointer accent-primary bg-muted"
                          style={{
                            background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${((config[dim.key] - dim.min) / (dim.max - dim.min)) * 100}%, var(--muted) ${((config[dim.key] - dim.min) / (dim.max - dim.min)) * 100}%, var(--muted) 100%)`
                          }}
                        />
                        <div className="flex justify-between mt-1.5">
                          <span className="text-xs text-muted-foreground">{dim.min}mm</span>
                          <span className="text-xs text-muted-foreground">{dim.max}mm</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Glass Type */}
              <div className="bg-card rounded-3xl border border-border/60 shadow-soft p-5 sm:p-6">
                <h3 className="text-sm font-700 text-foreground uppercase tracking-wide mb-4">Glass Type</h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {glassTypes.map((glass) => (
                    <button
                      key={glass.id}
                      onClick={() => setConfig({ ...config, glassType: glass.id })}
                      className={`flex flex-col p-3 sm:p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                        config.glassType === glass.id
                          ? 'border-primary bg-primary/5' : 'border-border/60 hover:border-accent/60 bg-background'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm font-700 ${config.glassType === glass.id ? 'text-primary' : 'text-foreground'}`}>
                          {glass.label}
                        </p>
                        {config.glassType === glass.id && (
                          <Icon name="CheckCircleIcon" size={16} className="text-primary shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{glass.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Frame Color */}
              <div className="bg-card rounded-3xl border border-border/60 shadow-soft p-5 sm:p-6">
                <h3 className="text-sm font-700 text-foreground uppercase tracking-wide mb-4">Frame Colour</h3>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-3">
                  {frameColors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setConfig({ ...config, frameColor: color.id })}
                      className="flex flex-col items-center gap-1.5 sm:gap-2 group"
                      title={color.label}
                    >
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-2 transition-all duration-200 shadow-soft group-hover:scale-110 ${
                          config.frameColor === color.id
                            ? 'border-primary ring-2 ring-primary/30 scale-110' : 'border-border/60'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className={`text-[9px] sm:text-[10px] font-500 leading-tight text-center ${config.frameColor === color.id ? 'text-primary font-700' : 'text-muted-foreground'}`}>
                        {color.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => setQuoteOpen(true)}
                className="btn-primary justify-center text-base py-4 w-full"
              >
                Get Instant Quote in ₹
                <Icon name="ArrowRightIcon" size={18} />
              </button>
              <p className="text-xs text-center text-muted-foreground -mt-3">
                Free home survey included · No obligation · Pan-India delivery
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {quoteOpen && (
          <QuoteForm
            config={config}
            price={price}
            onClose={() => setQuoteOpen(false)}
            category={category}
          />
        )}
      </AnimatePresence>
    </>
  );
}