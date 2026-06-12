import { Building, ShieldCheck, Truck, Scale, ArrowRight, Zap, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onExploreClick: () => void;
  onPartnerClick: () => void;
}

export default function Hero({ onExploreClick, onPartnerClick }: HeroProps) {
  const stats = [
    { value: '30+', label: 'Years Milling Expertise' },
    { value: '1,200+', label: 'Active Industrial Mills' },
    { value: '80+', label: 'Cleaner & Tool Spares' },
    { value: '100%', label: 'Food-Safe Materials' },
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

  const scrollToMore = () => {
    const target = document.getElementById('wholesale-catalog-section');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative text-white" id="architectural-hero-section">
      
      {/* FULL-WIDTH BG IMAGE WITH DARK GLASSMORPHIC OVERLAY */}
      <div 
        className="relative w-full min-h-[640px] lg:min-h-[720px] flex flex-col justify-center items-center px-4 py-20 text-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.8), rgba(15, 15, 15, 0.9)), url('https://i.ibb.co/fG9kDh3g/2f9eb394-1796-43d0-a38c-cb555323144c.png')`,
        }}
        id="hero-banner-image-container"
      >
        {/* Subtle grid accent */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Welcome Title Statement with Underline */}
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl md:text-6xl font-sans font-extrabold tracking-[0.2em] text-white uppercase"
            id="hero-title-main"
          >
            MUKESH TRADING CO.
          </motion.h2>

          {/* Established Subtitle (Heritage serif styling) */}
          <motion.span 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs sm:text-lg font-serif italic text-[#3ba2ff] tracking-widest mt-2 block"
            id="hero-heritage-tag"
          >
            Established 1975 &middot; Asarwa, Ahmedabad
          </motion.span>

          {/* Thin dividing line */}
          <div className="w-24 h-[1.5px] bg-[#005fa9] my-6" />

          {/* Subtitle Highlight */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-xl lg:text-3xl font-sans font-semibold tracking-wide text-white uppercase max-w-3xl leading-tight border-b border-white/10 pb-5"
            id="hero-subtitle"
          >
            Your Trusted Partner for Industrial Screening, Filtration & Processing Solutions
          </motion.h3>

          {/* Narrative copy block containing all text provided by the user */}
          <div className="mt-6 flex flex-col gap-4 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed text-center font-sans font-light tracking-wide">
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              id="hero-narrative-p1"
            >
              For over four decades, <strong>Mukesh Trading Co.</strong> has been a trusted name in industrial supply across Gujarat and beyond. We specialise in wire netting, perforated sheets, and precision screening solutions, proudly serving the Pharmaceutical, Chemical, Milling, Agro Processing, Recycling, and Manufacturing industries.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              id="hero-narrative-p2"
            >
              As authorised suppliers of Swiss-made <strong>SEFAR NYTAL Nylon Bolting Cloth</strong> &mdash; the global benchmark in precision sifting &mdash; we offer a complete range of screening, filtration, and processing components, making us a single reliable source for all your industrial needs.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              id="hero-narrative-p3"
            >
              With 50+ years of experience and a commitment to quality, <strong>Mukesh Trading Co.</strong> remains the preferred partner for industries that demand precision and reliability.
            </motion.p>
          </div>

          {/* The centered transparent outline action button - FIND OUT MORE v */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              id="hero-primary-outline-btn"
              onClick={scrollToMore}
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.97 }}
              className="group cursor-pointer flex items-center space-x-2 rounded-none bg-transparent border border-white/60 hover:border-white text-white px-7 py-3 text-[11px] uppercase tracking-[0.2em] font-bold transition-all"
            >
              <span>Find Out More</span>
              <ChevronDown className="h-4 w-4 text-slate-350 group-hover:translate-y-0.5 transition-transform" />
            </motion.button>

            <motion.button
              id="hero-explore-tab-btn"
              onClick={onExploreClick}
              whileHover={{ scale: 1.03, backgroundColor: '#004d8a' }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer bg-[#005fa9] text-white px-7 py-3 text-[11px] uppercase tracking-[0.2em] font-bold transition-colors"
            >
              View Products
            </motion.button>
          </motion.div>

        </div>
      </div>

      {/* METRICS & BRAND PROMISES - LOWER DESK SECTION */}
      <div className="bg-slate-50 text-slate-900 border-b border-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          
          {/* STATS COUNT */}
          <div className="grid grid-cols-2 gap-y-8 gap-x-4 md:grid-cols-4 md:divide-x md:divide-slate-200 bg-white border border-slate-100 p-8 shadow-xs mb-16">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                className="text-center md:px-4 cursor-pointer" 
                id={`stat-box-${idx}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <p className="text-3xl font-light tracking-tight text-[#005fa9] md:text-4xl font-sans">
                  {stat.value}
                </p>
                <p className="mt-2 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* HIGHLIGHT DETAILS */}
          <div className="max-w-5xl mx-auto">
            <span className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-[#005fa9] block">
              Milling Machinery Credentials
            </span>
            <p className="text-center mt-2 text-2xl font-light text-slate-900 uppercase tracking-wide">
              Supplying the finest spares for <span className="font-bold text-slate-950">High-Performance Industrial Mills.</span>
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {highlights.map((h, idx) => {
                const Icon = h.icon;
                return (
                  <motion.div
                    key={idx}
                    id={`highlight-card-${idx}`}
                    whileHover={{ y: -6, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)", borderColor: '#005fa9' }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="rounded-none border border-slate-100 bg-white p-6 text-left transition-colors cursor-pointer"
                  >
                    <div className="inline-flex rounded-none p-3 border border-slate-150 bg-slate-50 text-[#005fa9] mb-4">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-950">{h.title}</h4>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed font-sans">{h.desc}</p>
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
