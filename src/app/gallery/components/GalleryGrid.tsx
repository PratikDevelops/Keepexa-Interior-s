'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

type FilterKey = 'all' | 'residential' | 'commercial' | 'heritage';

interface Project {
  id: string;
  src: string;
  alt: string;
  title: string;
  location: string;
  category: FilterKey;
  type: string;
  windows: string;
  year: string;
  span?: string;
}

const projects: Project[] = [
{
  id: 'kensington',
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_13b106961-1764673107155.png",
  alt: 'Modern detached home with anthracite grey UPVC casement windows, white render exterior, manicured garden, bright overcast daylight',
  title: 'Kensington Residence',
  location: 'London, W8',
  category: 'residential',
  type: 'Full Replacement',
  windows: '14 casement',
  year: '2025',
  span: 'md:col-span-2'
},
{
  id: 'salford',
  src: "https://images.unsplash.com/photo-1722122278797-e3d012b9543e",
  alt: 'Contemporary apartment building facade with slim-profile white UPVC windows, glass balustrades, urban Manchester setting, clear sky',
  title: 'Salford Apartments',
  location: 'Manchester, M3',
  category: 'commercial',
  type: 'New Build',
  windows: '42 units',
  year: '2025'
},
{
  id: 'clifton',
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_12b111869-1772714398507.png",
  alt: 'Victorian period terraced house with sympathetically designed white UPVC sash windows, traditional red brick, period-correct detailing',
  title: 'Clifton Period Terrace',
  location: 'Bristol, BS8',
  category: 'heritage',
  type: 'Heritage Sash',
  windows: '10 sash',
  year: '2024'
},
{
  id: 'shoreditch',
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_14d1a4ffa-1772060949097.png",
  alt: 'Minimalist loft interior with floor-to-ceiling UPVC tilt-and-turn windows, white walls, exposed concrete, flooded with natural light',
  title: 'Shoreditch Loft',
  location: 'London, E1',
  category: 'residential',
  type: 'Bespoke Tilt & Turn',
  windows: '6 tilt-turn',
  year: '2024',
  span: 'md:col-span-2'
},
{
  id: 'harrogate',
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1964f2603-1776518770496.png",
  alt: 'Detached Yorkshire stone farmhouse conversion with cream UPVC windows, traditional countryside setting, green hills background',
  title: 'Harrogate Farmhouse',
  location: 'Harrogate, HG1',
  category: 'heritage',
  type: 'Farmhouse Casement',
  windows: '18 casement',
  year: '2024'
},
{
  id: 'canary',
  src: "https://images.unsplash.com/photo-1629800988475-981ca9ae24b6",
  alt: 'Modern glass office building facade with floor-to-ceiling UPVC curtain glazing, anthracite frames, city skyline reflection',
  title: 'Canary Wharf Offices',
  location: 'London, E14',
  category: 'commercial',
  type: 'Commercial Curtain',
  windows: '80+ panels',
  year: '2023'
}];


const filters: {key: FilterKey;label: string;}[] = [
{ key: 'all', label: 'All Projects' },
{ key: 'residential', label: 'Residential' },
{ key: 'commercial', label: 'Commercial' },
{ key: 'heritage', label: 'Heritage' }];


export default function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const filtered = activeFilter === 'all' ?
  projects :
  projects.filter((p) => p.category === activeFilter);

  return (
    <section className="py-10 sm:py-14 pb-16 sm:pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Filter tabs */}
        <motion.div
          ref={ref}
          className="flex flex-wrap gap-2 mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          
          {filters.map((f) =>
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-600 transition-all duration-200 ${
            activeFilter === f.key ?
            'bg-primary text-white shadow-primary/20 shadow-md' :
            'bg-secondary/80 text-muted-foreground hover:text-foreground border border-border/60'}`
            }>
              {f.label}
            </button>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 auto-rows-[280px] sm:auto-rows-[340px] md:auto-rows-[380px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45 }}>
            
            {filtered.map((project, index) =>
            <motion.div
              key={project.id}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer shadow-medium ${project.span || ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}>
              
                <AppImage
                src={project.src}
                alt={project.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105" />
              
                {/* Gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Top badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="glass-card text-xs font-600 text-foreground px-3 py-1.5 rounded-full border border-white/50">
                    {project.type}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="glass-card text-xs font-600 text-muted-foreground px-2.5 py-1.5 rounded-full border border-white/40">
                    {project.year}
                  </span>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                  <h3 className="text-lg sm:text-xl font-700 text-white mb-1">{project.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Icon name="MapPinIcon" size={13} className="text-accent" />
                      <span className="text-sm text-white/70 font-500">{project.location}</span>
                    </div>
                    <span className="text-xs text-white/60 font-500">{project.windows}</span>
                  </div>
                  {/* Hover CTA */}
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                    href="/product-configurator"
                    className="inline-flex items-center gap-1.5 text-xs font-700 text-white bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg hover:bg-white/30 transition-colors">
                      Configure Similar
                      <Icon name="ArrowRightIcon" size={12} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          className="mt-10 sm:mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}>
          
          <p className="text-base text-muted-foreground mb-5">
            Ready to add your home to the gallery?
          </p>
          <Link href="/product-configurator" className="btn-primary inline-flex">
            Start Your Configuration
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
        </motion.div>
      </div>
    </section>);

}