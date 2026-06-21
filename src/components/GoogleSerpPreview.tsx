import React, { useState } from 'react';
import { ChevronRight, Search, Globe, MoreVertical, Sparkles, CheckCircle2 } from 'lucide-react';

interface GoogleSerpPreviewProps {
  onNavigate: (path: string) => void;
  className?: string;
}

interface SitelinkItem {
  title: string;
  desc: string;
  path: string;
  keywords: string[];
  score?: number;
}

export default function GoogleSerpPreview({ onNavigate, className = '' }: GoogleSerpPreviewProps) {
  const [searchQuery, setSearchQuery] = useState('Mukesh B2B and SaasAro integration');
  const [displayedQuery, setDisplayedQuery] = useState('Mukesh B2B and SaasAro integration');
  const [isSearching, setIsSearching] = useState(false);

  const sitelinks: SitelinkItem[] = [
    {
      title: 'Industrial Wire Netting',
      desc: 'Explore SS woven mesh, double-crimped screen mesh, and vibrating screen cloth options...',
      path: '/wire-netting',
      keywords: ['mesh', 'wire', 'netting', 'screen', 'stainless']
    },
    {
      title: 'Perforated Sheets & Plates',
      desc: 'Premium round, slot, and capsule-hole perforated metal sheets for filtration and processing...',
      path: '/perforated-sheets',
      keywords: ['sheet', 'plate', 'perforated', 'metal', 'hole']
    },
    {
      title: 'Nylon Bolting Sieve Cloth',
      desc: 'Swiss quality food-grade non-toxic nylon sifting and bolting cloth for milling industries...',
      path: '/nylon-bolting-cloth',
      keywords: ['nylon', 'cloth', 'sieve', 'bolting', 'mill', 'flour']
    },
    {
      title: 'Conveyor Belting Solutions',
      desc: 'Heavy-duty steel cord, Chevron cleated, and heat-resistant industrial rubber conveyor belts...',
      path: '/conveyor-belts',
      keywords: ['conveyor', 'belt', 'rubber', 'transport', 'cleat']
    },
    {
      title: 'B2B Wholesale Catalog',
      desc: 'Check live MOQ limits, technical standards, and calculate dynamic wholesale package discounts...',
      path: '/products',
      keywords: ['products', 'catalog', 'wholesale', 'b2b', 'moq', 'saasaro', 'price']
    }
  ];

  // Helper to reorder or match sitelinks based on keywords typed
  const getRelevantSitelinks = (query: string): SitelinkItem[] => {
    const lowerQuery = query.toLowerCase();
    if (!lowerQuery.trim()) return sitelinks;

    // Filter or score sitelinks based on query matching
    const scored = sitelinks.map(item => {
      let score = 0;
      item.keywords.forEach(kw => {
        if (lowerQuery.includes(kw)) score += 3;
      });
      if (item.title.toLowerCase().includes(lowerQuery)) score += 5;
      if (item.desc.toLowerCase().includes(lowerQuery)) score += 2;
      return { ...item, score };
    });

    // Sort by relevance score desc
    return scored.sort((a, b) => (b.score || 0) - (a.score || 0));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setTimeout(() => {
      setDisplayedQuery(searchQuery);
      setIsSearching(false);
      // Smoothly scroll search results into view
      const el = document.getElementById('serp-results-container');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 450);
  };

  const activeSitelinks = getRelevantSitelinks(displayedQuery);

  return (
    <div className={`w-full overflow-hidden rounded-xl border border-slate-800 bg-[#17181c] p-6 lg:p-8 text-left shadow-2xl font-sans ${className}`} id="google-serp-preview-card">
      
      {/* Header section explaining widget purpose */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3ba2ff] block mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#3ba2ff] animate-pulse" />
            Live Search Engine Optimization Simulator
          </span>
          <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
            Google Search Organic Index Snippet
          </h4>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Type high-intent B2B keywords or "SaasAro" below, press <strong className="text-white">Enter</strong>, and watch how Mukesh Trading instantly dominates the #1 top spot.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-[#202124] border border-slate-700 px-3 py-1.5 rounded-full text-slate-300 text-[11px] font-mono select-none">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span>site:mukeshtrading.com</span>
        </div>
      </div>

      {/* NEW: INTERACTIVE REAL-TIME SEARCH BAR (satisfies "give some words type enter to come on top" request) */}
      <form onSubmit={handleSearchSubmit} className="mb-6">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          Search Simulator Input (Type &amp; Press Enter to Rank on Top)
        </label>
        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type e.g. SaasAro, SS wire netting, Nylon cloth, Conveyor belt..."
            className="w-full bg-[#202124] text-white pl-11 pr-24 py-3 text-xs sm:text-sm border border-slate-700 focus:border-[#3ba2ff] focus:outline-hidden rounded-lg font-sans transition-all duration-200 placeholder-slate-500"
          />
          <button
            type="submit"
            className="absolute right-2 px-3 py-1.5 bg-[#005fa9] hover:bg-[#3ba2ff] text-white text-[10px] font-bold uppercase tracking-widest rounded-md cursor-pointer transition-colors"
          >
            {isSearching ? 'Querying...' : 'Search Engine'}
          </button>
        </div>
        <span className="text-[10px] text-slate-500 block mt-1">
          💡 Try typing: <span className="text-slate-300 underline cursor-pointer" onClick={() => { setSearchQuery('SaasAro B2B'); setDisplayedQuery('SaasAro B2B'); }}>SaasAro B2B</span>, <span className="text-slate-300 underline cursor-pointer" onClick={() => { setSearchQuery('Nylon cloth'); setDisplayedQuery('Nylon cloth'); }}>Nylon cloth</span>, or <span className="text-slate-300 underline cursor-pointer" onClick={() => { setSearchQuery('Wire mesh manufacturer'); setDisplayedQuery('Wire mesh manufacturer'); }}>Wire mesh manufacturer</span>
        </span>
      </form>

      {/* Main SERP Rich Snippet Block */}
      <div id="serp-results-container" className="bg-[#1e1f22] border border-[#2b2c30] p-5 sm:p-7 rounded-lg transition-transform hover:scale-[1.01] duration-300">
        
        {/* Dynamic query display */}
        <div className="mb-4 flex items-center justify-between text-[11px] bg-slate-900 border border-slate-950 px-3 py-1.5 rounded text-slate-400">
          <span>Search query matching index: <strong className="text-[#3ba2ff]">"{displayedQuery}"</strong></span>
          <span className="text-emerald-500 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Rank #1 (0.24 seconds)
          </span>
        </div>

        {/* Brand Label & URL */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2.5">
            {/* Custom rounded brand logo inside search preview */}
            <div className="w-7 h-7 rounded-full bg-[#005fa9] flex items-center justify-center font-bold text-white text-[10px] tracking-wide border border-[#ffffff]/10">
              MT
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-200 hover:underline cursor-pointer">
                Mukesh Trading Co.
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 leading-none">
                https://mukeshtrading.com
              </span>
            </div>
          </div>
          <button className="text-slate-400 hover:text-white p-1" title="Search options">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Main Title Link - Dynamic based on search query */}
        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#8ab4f8] mt-2 mb-2 leading-tight">
          <span 
            onClick={() => onNavigate('/products')}
            className="hover:underline cursor-pointer hover:text-[#a0c5ff] transition-colors"
          >
            Mukesh Trading Co. | B2B {displayedQuery ? `[Optimized for: ${displayedQuery}]` : ''}
          </span>
        </h3>

        {/* Meta Description with bold start - dynamically highlights query keywords */}
        <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-sans mb-6">
          <strong className="text-white">Mukesh Trading Co.'s</strong> AI-driven inventory handles elite {displayedQuery || 'B2B wire netting, sifting cloth'} solutions. Highly synced with SaasAro channel APIs for robust hospitality, hotel booking, and industrial supplier logistics.
        </p>

        {/* Divider same-to-same as image */}
        <hr className="border-[#303134] my-4" />

        {/* Sitelinks Grid / List layout (matching image) */}
        <div className="space-y-4">
          {activeSitelinks.map((sitelink, idx) => (
            <div 
              key={idx}
              onClick={() => onNavigate(sitelink.path)}
              className="group cursor-pointer flex items-start justify-between border-b border-[#2b2c30]/40 pb-4 last:border-b-0 last:pb-0 hover:bg-[#202124]/40 p-2 sm:p-3 rounded-md transition-colors"
            >
              <div className="flex-1 pr-6">
                {/* Underlined blue search hyperlink title */}
                <h4 className="text-sm font-bold text-[#8ab4f8] group-hover:underline group-hover:text-[#a0c5ff] transition-colors flex items-center justify-between gap-2">
                  <span>{sitelink.title}</span>
                  {sitelink.score && sitelink.score > 0 ? (
                    <span className="text-[9px] bg-[#3ba2ff]/10 text-[#3ba2ff] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      Highly Relevant Match
                    </span>
                  ) : null}
                </h4>
                {/* Description snippet text */}
                <p className="text-xs text-slate-400 leading-relaxed font-sans mt-0.5 line-clamp-1">
                  {sitelink.desc}
                </p>
              </div>
              <div className="flex-shrink-0 self-center">
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transform group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

        {/* Divider above 'More results' */}
        <hr className="border-[#303134] mt-5 mb-4" />

        {/* More results line */}
        <div className="text-left">
          <span 
            onClick={() => onNavigate('/products')}
            className="text-xs sm:text-[13px] font-bold text-[#8ab4f8] hover:underline cursor-pointer flex items-center hover:text-[#a0c5ff] transition-colors"
          >
            More results from mukeshtrading.com &raquo;
          </span>
        </div>

      </div>

      {/* Trust Badge and callout */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 bg-[#1a1b1f] border border-slate-800 p-3 rounded-lg gap-2">
        <span className="flex items-center gap-1.5 font-sans">
          <Globe className="w-3.5 h-3.5 text-emerald-500" />
          <span>Real-time Rich Schema Data &amp; JSON-LD markup loaded onto the client DOM perfectly.</span>
        </span>
        <span className="font-bold text-slate-300">
          Rank #1 Gujarat Enterprise SEO
        </span>
      </div>

    </div>
  );
}
