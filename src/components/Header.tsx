import { useState } from 'react';
import { Menu, X, ShoppingCart, Inbox, Phone, Search, FileText, Cpu, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
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
          {/* Logo Icon */}
          <img 
            src="/favicon.svg" 
            alt="MUKESH TRADING CO. Logo" 
            className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-full bg-white p-0.5" 
            referrerPolicy="no-referrer"
          />
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
            className="flex items-center justify-center px-4 text-neutral-300 md:hidden hover:text-white"
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
