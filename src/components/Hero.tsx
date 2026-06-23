import React, { useState, useEffect } from 'react';
import { Building, ShieldCheck, Truck, Scale, ChevronDown, Award, Users, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import CountUp from './CountUp';

interface HeroProps {
  onExploreClick: () => void;
  onPartnerClick: () => void;
}

export default function Hero({ onExploreClick, onPartnerClick }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);

  // Stats setup mapping end numbers, suffixes, and labels
  const stats = [
    { value: 30, suffix: '+', label: 'Years Milling Expertise', icon: Award },
    { value: 1200, suffix: '+', label: 'Active Industrial Mills', icon: Users },
    { value: 80, suffix: '+', label: 'Cleaner & Tool Spares', icon: Scale },
    { value: 100, suffix: '%', label: 'Food-Safe Materials', icon: Shield },
  ];

  const highlights = [
    {
      icon: Scale,
      title: 'Precision Sifting & Meshes',
      desc: 'Original Swiss-imported SEFAR NYTAL Nylon Bolting Cloth, cotton sifter cleaner pads, and food-grade polyurethane pan cleaners.',
      color: 'text-blue-500 bg-neutral-900 border-neutral-800',
    },
    {
      icon: Truck,
      title: 'Milling Perforated Sheets',
      desc: 'All kinds of round, long, slotted, triangular, indented lip-shaped sheets, and dry stoner screens punched perfectly in all metals.',
      color: 'text-blue-500 bg-neutral-900 border-neutral-800',
    },
    {
      icon: ShieldCheck,
      title: 'Certified Food Machinery Specs',
      desc: 'All wire netting, plansifter accessories, sifter cleaners, and pneumatic sleeves fully comply with standard mill safety guidelines.',
      color: 'text-emerald-500 bg-neutral-900 border-neutral-800',
    },
  ];

  // Performance optimized passive parallax scroll effect
  useEffect(() => {
    let active = true;
    const handleScroll = () => {
      if (!active) return;
      if (window.innerWidth >= 768) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      active = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToMore = () => {
    const target = document.getElementById('wholesale-catalog-section');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  const parallaxY = scrollY * 0.35; // optimal scroll rate for depth effect

  return (
    <div className="relative text-white overflow-hidden" id="architectural-hero-section">
      
      {/* Dynamic Keyframes Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes kenBurnsDrift {
          0% {
            transform: scale(1.05) translate3d(0px, 0px, 0px);
          }
          50% {
            transform: scale(1.15) translate3d(10px, -15px, 0px);
          }
          100% {
            transform: scale(1.05) translate3d(0px, 0px, 0px);
          }
        }

        .animate-ken-burns {
          animation: kenBurnsDrift 28s ease-in-out infinite;
          will-change: transform;
        }

        .animate-pulse-slow {
          animation: pulseSlow 8s ease-in-out infinite;
        }

        @keyframes pulseSlow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.25; }
        }
      ` }} />

      {/* FULL-WIDTH BG IMAGE WITH DUAL ANIMATION LAYERS */}
      <div 
        className="relative w-full min-h-[640px] lg:min-h-[760px] flex flex-col justify-center items-center px-4 py-20 text-center bg-slate-950 overflow-hidden"
        id="hero-banner-image-container"
      >
        {/* Parallax Container wrapping hardware-accelerated Ken burns layer */}
        <div 
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none will-change-transform"
          style={{ transform: `translate3d(0, ${parallaxY}px, 0)` }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center animate-ken-burns"
            style={{
              backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.45), rgba(15, 15, 15, 0.65)), url('https://i.ibb.co/fG9kDh3g/2f9eb394-1796-43d0-a38c-cb555323144c.png')`,
            }}
          />
        </div>

        {/* Dark aesthetic gradients covering the layout shift points */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/85 via-slate-950/80 to-slate-900/90 pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-radial-at-c from-[#005fa9]/20 via-transparent to-transparent pointer-events-none" />

        {/* Complex technical mesh system grid overlay */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none animate-pulse-slow font-sans" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Welcome Title Statement with Underline */}
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-2xl sm:text-5xl md:text-6xl font-sans font-extrabold tracking-[0.15em] sm:tracking-[0.2em] text-white uppercase text-center leading-none"
            id="hero-title-main"
          >
            MUKESH TRADING CO.
          </motion.h2>

          {/* Established Subtitle (Heritage serif styling) */}
          <motion.span 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs sm:text-lg font-serif italic text-[#3ba2ff] tracking-widest mt-3.5 block select-none"
            id="hero-heritage-tag"
          >
            Established 1975 &middot; Asarwa, Ahmedabad
          </motion.span>

          {/* Precise industrial blue separator bar */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="h-[2px] bg-linear-to-r from-blue-500 to-[#005fa9] my-6" 
          />

          {/* Subtitle Highlight */}
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-sm sm:text-xl lg:text-3xl font-sans font-semibold tracking-wide text-white uppercase max-w-3xl leading-snug border-b border-white/10 pb-5 px-2"
            id="hero-subtitle"
          >
            Your Trusted Partner for Industrial Screening, Filtration &amp; Processing Solutions
          </motion.h3>

          {/* Narrative copy block optimized for legibility and spacing */}
          <div className="mt-8 flex flex-col gap-4 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed text-center font-sans font-light tracking-wide px-3 sm:px-0">
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              id="hero-narrative-p1"
            >
              For over four decades, <strong>Mukesh Trading Co.</strong> has been a trusted name in industrial supply across Gujarat and beyond. We specialise in wire netting, perforated sheets, and precision screening solutions, proudly serving the Pharmaceutical, Chemical, Milling, Agro Processing, Recycling, and Manufacturing industries.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              id="hero-narrative-p2"
            >
              As authorised suppliers of Swiss-made <strong>SEFAR NYTAL Nylon Bolting Cloth</strong> &mdash; the global benchmark in precision sifting &mdash; we offer a complete range of screening, filtration, and processing components, making us a single reliable source for all your industrial needs.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              id="hero-narrative-p3"
            >
              With 50+ years of experience and a commitment to quality, <strong>Mukesh Trading Co.</strong> remains the preferred partner for industries that demand precision and reliability.
            </motion.p>
          </div>

          {/* Redesigned clean button system - mobile-friendly touch targets with zero layout shifting */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto px-4 sm:px-0"
          >
            <motion.button
              id="hero-primary-outline-btn"
              onClick={scrollToMore}
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto group cursor-pointer flex items-center justify-center space-x-2 rounded-none bg-transparent border border-white/60 hover:border-white text-white px-7 py-3.5 sm:py-3 text-[11px] uppercase tracking-[0.2em] font-extrabold transition-all min-h-[44px]"
            >
              <span>Find Out More</span>
              <ChevronDown className="h-4 w-4 text-slate-300 group-hover:translate-y-0.5 transition-transform" />
            </motion.button>

            <motion.button
              id="hero-explore-tab-btn"
              onClick={onExploreClick}
              whileHover={{ scale: 1.03, backgroundColor: '#004d8a' }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto cursor-pointer bg-[#005fa9] text-white px-7 py-3.5 sm:py-3 text-[11px] uppercase tracking-[0.2em] font-extrabold transition-colors min-h-[44px] text-center"
            >
              View Products
            </motion.button>
          </motion.div>

        </div>
      </div>

      {/* METRICS & BRAND PROMISES - LOWER DESK SECTION */}
      <div className="bg-slate-50 text-slate-900 border-b border-slate-100 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* STATS COUNT GRID - 1-COL MOBILE, 2-COL TABLET, 4-COL DESKTOP (CENTERED WITH GLASSMORPHIC LOOK) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto mb-20">
            {stats.map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: idx * 0.12, ease: "easeOut" }}
                  className="relative overflow-hidden group border border-slate-200/80 bg-white/80 backdrop-blur-md p-8 sm:p-10 text-center rounded-none shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center" 
                  id={`stat-box-${idx}`}
                  whileHover={{ y: -4, borderColor: '#005fa9' }}
                >
                  {/* Subtle Top Blue Highlight Line */}
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-slate-200 group-hover:bg-[#005fa9] transition-colors duration-300" />
                  
                  {/* Decorative faint background code icon */}
                  <div className="absolute right-3 bottom-2 opacity-[0.03] text-slate-900 pointer-events-none">
                    <StatIcon className="w-24 h-24 stroke-[1]" />
                  </div>

                  <div className="flex items-center justify-center w-12 h-12 rounded-none bg-[#005fa9]/5 border border-[#005fa9]/10 text-[#005fa9] mb-4 group-hover:bg-[#005fa9] group-hover:text-white transition-all duration-300">
                    <StatIcon className="w-5 h-5" />
                  </div>

                  <p className="text-4xl sm:text-5xl font-black tracking-tight text-[#005fa9] font-sans flex items-center justify-center leading-none">
                    <CountUp end={stat.value} suffix={stat.suffix} speed={14} />
                  </p>
                  
                  <p className="mt-3.5 text-xs font-bold text-slate-500 uppercase tracking-[0.2em] font-sans">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* HIGHLIGHT DETAILS */}
          <div className="max-w-5xl mx-auto mt-6">
            <span className="text-center text-[10px] font-black uppercase tracking-[0.25em] text-[#005fa9] block">
              Milling Machinery Credentials
            </span>
            <p className="text-center mt-3 text-xl sm:text-2xl lg:text-3xl font-light text-slate-900 uppercase tracking-tight max-w-3xl mx-auto px-4">
              Supplying the finest spares for <span className="font-extrabold text-slate-950">High-Performance Industrial Mills.</span>
            </p>

            <div className="mt-14 grid gap-6 md:grid-cols-3 px-2 sm:px-0">
              {highlights.map((h, idx) => {
                const Icon = h.icon;
                return (
                  <motion.div
                    key={idx}
                    id={`highlight-card-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    whileHover={{ y: -6, boxShadow: "0 14px 30px -5px rgba(0,0,0,0.06)", borderColor: '#005fa9' }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-none border border-slate-200 bg-white p-7 text-left transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="inline-flex rounded-none p-3 border border-slate-150 bg-slate-50 text-[#005fa9] mb-5">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-950">{h.title}</h4>
                      <p className="mt-3 text-xs sm:text-[13px] text-slate-500 leading-relaxed font-sans">{h.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
