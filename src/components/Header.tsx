import { useState } from 'react';
import { Menu, X, ShoppingCart, Inbox, Phone, Search, FileText, Cpu, Info, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export default function Header({ currentPath, onNavigate, isDarkMode, onToggleDarkMode }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Complete list matching the exact navigation with clean URL structures
  const navigations = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About Us', path: '/about-us' },
    { id: 'catalog', label: 'Products', path: '/products' },
    { id: 'industries', label: 'Industries Served', path: '/industries-served' },
    { id: 'contact', label: 'Contact Us', path: '/contact-us' },
  ] as const;

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const isTabActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath === path) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#131313] text-white border-b border-neutral-900" id="corporate-header">
      {/* Container maintains fluid desktop boundaries */}
      <div className="mx-auto flex h-16 sm:h-20 max-w-full items-stretch justify-between pl-4 sm:pl-6 md:pl-8 pr-0">
        
        {/* LOGO AREA - inspired by the elegant layout in reference images */}
        <motion.div 
          onClick={() => handleNavClick('/')} 
          whileTap={{ scale: 0.98 }}
          whileHover={{ opacity: 0.92 }}
          className="flex cursor-pointer items-center space-x-3 py-4"
          id="header-logo-container"
        >
          {/* Logo Icon - rendered as a high-fidelity inline SVG to guarantee instant loading and absolute visibility */}
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white p-0.5 flex items-center justify-center overflow-hidden">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 512 512" 
              className="w-full h-full object-contain"
            >
              <defs>
                <pattern id="pat-vertical-header" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect width="8" height="20" fill="#E31C1C" />
                  <rect x="8" width="12" height="20" fill="#FFFFFF" />
                </pattern>
                <pattern id="pat-perforated-1-header" width="16" height="16" patternUnits="userSpaceOnUse">
                  <rect width="16" height="16" fill="#E31C1C" />
                  <circle cx="8" cy="8" r="3.5" fill="#FFFFFF" />
                  <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
                  <circle cx="16" cy="0" r="1.5" fill="#FFFFFF" />
                  <circle cx="0" cy="16" r="1.5" fill="#FFFFFF" />
                  <circle cx="16" cy="16" r="1.5" fill="#FFFFFF" />
                </pattern>
                <pattern id="pat-square-mesh-header" width="16" height="16" patternUnits="userSpaceOnUse">
                  <rect width="16" height="16" fill="#FFFFFF" />
                  <rect width="16" height="16" fill="none" stroke="#E31C1C" strokeWidth="4" />
                </pattern>
                <pattern id="pat-perforated-2-header" width="24" height="24" patternUnits="userSpaceOnUse">
                  <rect width="24" height="24" fill="#E31C1C" />
                  <circle cx="12" cy="12" r="5" fill="#FFFFFF" />
                </pattern>
                <pattern id="pat-bubble-header" width="40" height="40" patternUnits="userSpaceOnUse">
                  <rect width="40" height="40" fill="#FFFFFF" />
                  <circle cx="20" cy="20" r="14" fill="#E31C1C" />
                </pattern>
                <pattern id="pat-diagonal-grid-header" width="20" height="20" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                  <rect width="20" height="20" fill="#FFFFFF" stroke="#E31C1C" strokeWidth="4" />
                </pattern>
                <pattern id="pat-grating-header" width="24" height="24" patternUnits="userSpaceOnUse">
                  <rect width="24" height="24" fill="#FFFFFF" />
                  <rect width="24" height="24" fill="none" stroke="#E31C1C" strokeWidth="5" />
                </pattern>
                <pattern id="pat-checkerboard-header" width="10" height="10" patternUnits="userSpaceOnUse">
                  <rect width="5" height="5" fill="#E31C1C" />
                  <rect x="5" width="5" height="5" fill="#FFFFFF" />
                  <rect y="5" width="5" height="5" fill="#FFFFFF" />
                  <rect x="5" y="5" width="5" height="5" fill="#E31C1C" />
                </pattern>
              </defs>
              <rect x="180" y="50" width="152" height="152" transform="rotate(0, 256, 256)" fill="url(#pat-vertical-header)" stroke="#FFFFFF" strokeWidth="6px" strokeLinejoin="round" />
              <rect x="180" y="50" width="152" height="152" transform="rotate(45, 256, 256)" fill="url(#pat-perforated-1-header)" stroke="#FFFFFF" strokeWidth="6px" strokeLinejoin="round" />
              <rect x="180" y="50" width="152" height="152" transform="rotate(90, 256, 256)" fill="url(#pat-square-mesh-header)" stroke="#FFFFFF" strokeWidth="6px" strokeLinejoin="round" />
              <rect x="180" y="50" width="152" height="152" transform="rotate(135, 256, 256)" fill="url(#pat-perforated-2-header)" stroke="#FFFFFF" strokeWidth="6px" strokeLinejoin="round" />
              <rect x="180" y="50" width="152" height="152" transform="rotate(180, 256, 256)" fill="url(#pat-bubble-header)" stroke="#FFFFFF" strokeWidth="6px" strokeLinejoin="round" />
              <rect x="180" y="50" width="152" height="152" transform="rotate(225, 256, 256)" fill="url(#pat-diagonal-grid-header)" stroke="#FFFFFF" strokeWidth="6px" strokeLinejoin="round" />
              <rect x="180" y="50" width="152" height="152" transform="rotate(270, 256, 256)" fill="url(#pat-grating-header)" stroke="#FFFFFF" strokeWidth="6px" strokeLinejoin="round" />
              <rect x="180" y="50" width="152" height="152" transform="rotate(315, 256, 256)" fill="url(#pat-checkerboard-header)" stroke="#FFFFFF" strokeWidth="6px" strokeLinejoin="round" />
              <circle cx="256" cy="256" r="82" fill="#FFFFFF" stroke="#E31C1C" strokeWidth="6" />
              <path d="M 238 188 H 274 M 256 188 V 212" stroke="#E31C1C" strokeWidth="7" strokeLinecap="square" fill="none" />
              <polygon points="214,280 214,214 232,214 256,255 280,214 298,214 298,280 278,280 278,236 256,274 232,236 232,280" fill="#E31C1C" />
              <path d="M 270,294 H 244 V 318 H 270" stroke="#E31C1C" strokeWidth="8" strokeLinecap="square" fill="none" />
            </svg>
          </div>
          {/* uppercase bold brand layout */}
          <div className="flex items-baseline font-sans text-sm sm:text-base tracking-wider uppercase">
            <span className="font-extrabold text-white">MUKESH TRADING CO.</span>
            <span className="w-1.5 h-1.5 bg-[#E31C1C] ml-1.5 rounded-full animate-pulse inline-block" />
          </div>
        </motion.div>

        {/* DESKTOP NAVIGATION & ACTIONS */}
        <div className="hidden md:flex items-stretch">
          <nav className="flex items-stretch text-xs font-medium tracking-[0.05em]" id="desktop-nav-menu">
            {navigations.map((item) => {
              const active = isTabActive(item.path);
              return (
                <motion.button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => {
                    handleNavClick(item.path);
                  }}
                  whileHover={{ backgroundColor: active ? '#005fa9' : 'rgba(26,26,26,1)' }}
                  whileTap={{ scale: 0.95 }}
                  className={`cursor-pointer px-3.5 lg:px-5 flex items-center justify-center text-xs transition-colors border-r border-[#1a1a1a]/80 ${
                    active 
                      ? 'bg-[#005fa9] text-white font-bold' 
                      : 'text-neutral-300 hover:bg-neutral-900/40 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* SEARCH UTILITY SECTION */}
          <div className="flex items-center px-6 space-x-3 border-l border-neutral-800">
            {/* Search Icon Shortcut */}
            <motion.button 
              onClick={() => {
                handleNavClick('/products');
                setTimeout(() => {
                  const searchInput = document.getElementById('product-search-bar');
                  searchInput?.focus();
                }, 100);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-neutral-400 hover:text-white transition-colors p-1 flex items-center space-x-2"
              title="Search Materials catalog"
            >
              <Search className="h-4 w-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Search Catalogue</span>
            </motion.button>
          </div>
        </div>

        {/* TELEPHONE KEYSTONE CTA (FAR RIGHT BLUE TAB) - Identical to Image 1 & 3 */}
        <div className="flex items-stretch">
          {/* Mobile burger toggle */}
          <motion.button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center px-4 text-neutral-300 md:hidden hover:text-white border-l border-neutral-800"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>

          {/* The Distinct Royal Blue Telecom Block */}
          <motion.a
            href="tel:+919879211012"
            whileHover={{ scale: 1.02, backgroundColor: '#004d8a' }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#005fa9] text-white px-5 sm:px-8 flex items-center justify-center font-bold tracking-wider font-sans text-xs sm:text-sm shadow-inner"
            title="Call MUKESH TRADING CO. procurement experts directly"
            id="header-phone-keystone"
          >
            <Phone className="h-4 w-4 mr-2 hidden sm:inline" />
            <span>+91 9879211012</span>
          </motion.a>
        </div>

      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-neutral-900 bg-[#161616] text-white md:hidden"
            id="mobile-navigation-drawer"
          >
            <div className="space-y-1 px-4 py-4 sm:px-6">
              {navigations.map((item) => {
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => {
                      handleNavClick(item.path);
                    }}
                    className={`flex w-full items-center justify-between px-3 py-3 text-left text-xs font-bold uppercase tracking-widest transition-all ${
                      isTabActive(item.path) 
                        ? 'bg-[#005fa9] text-white border-l-4 border-white pl-2' 
                        : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
