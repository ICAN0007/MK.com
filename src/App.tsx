import { useState, useEffect } from 'react';
import { Product, CartItem, WholesaleInquiry } from './types';
import { WHOLESALE_PRODUCTS } from './data/products';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import ServicesPanel from './components/ServicesPanel';
import InquiriesDashboard from './components/InquiriesDashboard';
import AdSenseBanner from './components/AdSenseBanner';
import AdSenseMultiplex from './components/AdSenseMultiplex';
import AdSenseDisplay from './components/AdSenseDisplay';
import GoogleSerpPreview from './components/GoogleSerpPreview';
import { 
  Building, Mail, Phone, Clock, ChevronRight, Check, MapPin, ExternalLink, 
  ArrowRight, ShieldCheck, HelpCircle, FileText, Compass, Settings, AlertCircle, ShoppingCart 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import Keyword-Rich B2B SEO Content Modules
import { homeSEO } from './seo-content/home';
import { aboutSEO } from './seo-content/about';
import { wireNettingSEO } from './seo-content/wireNetting';
import { perforatedSheetsSEO } from './seo-content/perforatedSheets';
import { nylonBoltingClothSEO } from './seo-content/nylonBoltingCloth';
import { conveyorBeltsSEO } from './seo-content/conveyorBelts';
import { elevatorBucketsSEO } from './seo-content/elevatorBuckets';
import { industrialFiltersSEO } from './seo-content/industrialFilters';
import { industriesServedSEO, requestQuoteSEO, additionalProductsSEO } from './seo-content/extraPages';


// Demostration inquiry log database seed
const DEMO_INQUIRIES: WholesaleInquiry[] = [
  {
    id: 'RFQ-748912',
    name: 'Bhavesh Patel',
    email: 'purchase@gujaratsifters.com',
    phone: '+91 98250 88312',
    companyName: 'Gujarat Agro Sifters & Millers Pvt Ltd',
    businessType: 'Industrial Enterprise',
    gstNumber: '24AAAACG1234F1Z5',
    preferredShipping: 'Standard Freight',
    comment: 'Requesting wholesale pricing on 50 rolls of Swiss Standard Nylon Bolting Cloth (GG-40, 115cm width) and matching polyurethane plansifter cleaners.',
    items: [],
    totalInquiryValue: 0,
    status: 'Pending Review',
    createdAt: new Date(Date.now() - 3600 * 1000 * 6).toISOString(),
    ipAddress: '122.179.91.54',
    ipLocation: 'Ahmedabad, Gujarat, India'
  }
];

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    // Check initial path on mount for link sharing / deep linking
    let path = window.location.pathname;
    if (path === '' || path === undefined) return '/';
    // Normalize /products/page[X] to /products internally
    if (path.match(/^\/products\/page-?\d+$/)) {
      return '/products';
    }
    // Normalize /products/xxx to /xxx internally for robust routing and category matching
    if (path.startsWith('/products/') && path !== '/products/') {
      return path.replace('/products', '');
    }
    return path;
  });

  // Client-side quotation list
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('mukesh_trading_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // CRM sales log state
  const [inquiries, setInquiries] = useState<WholesaleInquiry[]>(() => {
    try {
      const stored = localStorage.getItem('mukesh_trading_inquiries');
      if (stored) {
        return JSON.parse(stored);
      } else {
        localStorage.setItem('mukesh_trading_inquiries', JSON.stringify(DEMO_INQUIRIES));
        return DEMO_INQUIRIES;
      }
    } catch {
      return DEMO_INQUIRIES;
    }
  });

  const [visitorIp, setVisitorIp] = useState<string>('Detecting...');
  const [visitorLocation, setVisitorLocation] = useState<string>('Ahmedabad, India (Default)');

  useEffect(() => {
    const detectIp = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        if (res.ok) {
          const data = await res.json();
          if (data.ip) {
            setVisitorIp(data.ip);
            let locParts = [];
            if (data.city) locParts.push(data.city);
            if (data.region) locParts.push(data.region);
            if (data.country_name) locParts.push(data.country_name);
            setVisitorLocation(locParts.join(', ') || 'India');
            return;
          }
        }
      } catch (err) {
        console.warn("Could not load ipapi.co, trying alternative", err);
      }

      try {
        const res = await fetch('https://api.ipify.org?format=json');
        if (res.ok) {
          const data = await res.json();
          if (data.ip) {
            setVisitorIp(data.ip);
            setVisitorLocation('India (Identified)');
          }
        }
      } catch (err) {
        console.error("All client-side IP API requests failed (Adblock/Offline)", err);
        setVisitorIp('Local/Shielded');
        setVisitorLocation('Client Proxy (Identified)');
      }
    };

    detectIp();
  }, []);

  // Dynamic routing navigation mechanism
  const navigateTo = (path: string) => {
    let targetPath = path;
    if (path.match(/^\/products\/page-?\d+$/)) {
      targetPath = '/products';
    } else if (path.startsWith('/products/') && path !== '/products/') {
      targetPath = path.substring('/products'.length);
    }
    window.history.pushState(null, '', path);
    setCurrentPath(targetPath);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Sync back/forward button clicks to UI state & custom component transitions
  useEffect(() => {
    const handlePopState = () => {
      let path = window.location.pathname || '/';
      let targetPath = path;
      if (path.match(/^\/products\/page-?\d+$/)) {
        targetPath = '/products';
      } else if (path.startsWith('/products/') && path !== '/products/') {
        targetPath = path.substring('/products'.length);
      }
      setCurrentPath(targetPath);
    };
    
    const handleCustomNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        navigateTo(customEvent.detail);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('app-navigate', handleCustomNavigate);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('app-navigate', handleCustomNavigate);
    };
  }, []);

  // Redirect /request-quote to /contact-us to keep URL mapping unbroken
  useEffect(() => {
    if (currentPath === '/request-quote') {
      navigateTo('/contact-us');
    }
  }, [currentPath]);

  // Sync states to browser LocalStorage
  useEffect(() => {
    localStorage.setItem('mukesh_trading_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('mukesh_trading_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Handle Dynamic Meta Title, Description, and JSON-LD schema insertion
  useEffect(() => {
    let title = 'Wire Netting & SS Wire Mesh Ahmedabad | Mukesh Trading';
    let desc = 'Premium SS Wire Mesh Supplier Gujarat. Mukesh Trading Co. supplies wire netting, perforated sheets, nylon sifter cloth, and conveyor belts in Ahmedabad since 1975.';
    
    let canonicalPath = currentPath;
    if (currentPath === '/products') {
      canonicalPath = window.location.pathname;
    }
    let canonical = 'https://mukeshtrading.com' + canonicalPath;

    let pageSuffix = '';
    const pageMatch = window.location.pathname.match(/\/products\/page-?(\d+)/);
    if (pageMatch) {
      pageSuffix = ` - Page ${pageMatch[1]}`;
    }

    // Define correct meta tags on each category or main page subpath
    if (currentPath === '/') {
      title = homeSEO.metaTitle;
      desc = homeSEO.metaDescription;
    } else if (currentPath === '/about-us') {
      title = aboutSEO.metaTitle;
      desc = aboutSEO.metaDescription;
    } else if (currentPath === '/contact-us') {
      title = 'Contact Mukesh Trading Co | Wire Mesh Supplier Ahmedabad';
      desc = 'Contact Mukesh Trading Co Ahmedabad for wholesale prices on SS Wire Mesh, thresher parts, sifter screens, and conveyor belts. Request direct quote.';
    } else if (currentPath === '/products') {
      title = 'B2B Industrial Products Catalog | Mukesh Trading Ahmedbad' + pageSuffix;
      desc = 'Explore our comprehensive product catalog containing wire netting, perforated sheets, Swiss nylon cloth, cotton elevator belts, and bucket carriage bolts.';
    } else if (currentPath === '/industries-served') {
      title = industriesServedSEO.metaTitle;
      desc = industriesServedSEO.metaDescription;
    } else if (currentPath === '/wire-mesh') {
      title = additionalProductsSEO.wireMesh.metaTitle;
      desc = additionalProductsSEO.wireMesh.metaDescription;
    } else if (currentPath === '/wire-netting') {
      title = wireNettingSEO.metaTitle;
      desc = wireNettingSEO.metaDescription;
    } else if (currentPath === '/perforated-sheets') {
      title = perforatedSheetsSEO.metaTitle;
      desc = perforatedSheetsSEO.metaDescription;
    } else if (currentPath === '/nylon-bolting-cloth') {
      title = nylonBoltingClothSEO.metaTitle;
      desc = nylonBoltingClothSEO.metaDescription;
    } else if (currentPath === '/stainless-steel-mesh') {
      title = additionalProductsSEO.stainlessSteelMesh.metaTitle;
      desc = additionalProductsSEO.stainlessSteelMesh.metaDescription;
    } else if (currentPath === '/industrial-filters') {
      title = industrialFiltersSEO.metaTitle;
      desc = industrialFiltersSEO.metaDescription;
    } else if (currentPath === '/vibrating-screens') {
      title = additionalProductsSEO.vibratingScreens.metaTitle;
      desc = additionalProductsSEO.vibratingScreens.metaDescription;
    } else if (currentPath === '/screening-equipment') {
      title = additionalProductsSEO.screeningEquipment.metaTitle;
      desc = additionalProductsSEO.screeningEquipment.metaDescription;
    } else if (currentPath === '/conveyor-belts') {
      title = conveyorBeltsSEO.metaTitle;
      desc = conveyorBeltsSEO.metaDescription;
    } else if (currentPath === '/elevator-buckets') {
      title = elevatorBucketsSEO.metaTitle;
      desc = elevatorBucketsSEO.metaDescription;
    }

    // Set page parameters
    document.title = title;
    
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', desc);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = desc;
      document.head.appendChild(meta);
    }

    // Append Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonical);
    } else {
      const link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', canonical);
      document.head.appendChild(link);
    }

    // Manage Open Graph properties (og:title, og:description, etc.)
    const setOgTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (element) {
        element.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    setOgTag('og:title', title);
    setOgTag('og:description', desc);
    setOgTag('og:url', canonical);
    setOgTag('og:image', 'https://i.ibb.co/fG9kDh3g/2f9eb394-1796-43d0-a38c-cb555323144c.png');
    setOgTag('og:type', 'website');
  }, [currentPath]);

  // Handle Sales CRM logs updates
  const handleAddInquiry = (inquiry: WholesaleInquiry) => {
    setInquiries((prev) => [inquiry, ...prev]);
  };

  const handleUpdateInquiryStatus = (id: string, newStatus: WholesaleInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((iq) => (iq.id === id ? { ...iq, status: newStatus } : iq))
    );
  };

  const handleClearInquiriesDb = () => {
    if (confirm('Are you sure you want to clear the sales database? This removes simulated lists and live entries.')) {
      setInquiries([]);
      localStorage.setItem('mukesh_trading_inquiries', JSON.stringify([]));
    }
  };

  // Shared components click-thru shortcuts
  const handleExploreClick = () => {
    navigateTo('/products');
  };

  // FAQ Expand state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Structured breadcrumb arrays
  const getBreadcrumbs = () => {
    const segments = currentPath.split('/').filter(Boolean);
    const crumbs = [{ label: 'Home', path: '/' }];
    
    // If it's a flat product path, inject 'Products' as intermediate crumb
    const isFlatProduct = [
      'wire-mesh',
      'wire-netting',
      'perforated-sheets',
      'nylon-bolting-cloth',
      'stainless-steel-mesh',
      'industrial-filters',
      'vibrating-screens',
      'screening-equipment',
      'conveyor-belts',
      'elevator-buckets'
    ].includes(segments[0]);

    if (isFlatProduct && segments[0] !== 'products') {
      crumbs.push({ label: 'Products', path: '/products' });
    }

    let tempPath = '';
    segments.forEach((seg, index) => {
      tempPath += `/${seg}`;
      let label = seg.replace(/-/g, ' ');
      if (seg === 'products') label = 'Products';
      else if (seg === 'wire-mesh') label = 'Wire Mesh';
      else if (seg === 'wire-netting') label = 'Wire Netting';
      else if (seg === 'perforated-sheets') label = 'Perforated Sheets';
      else if (seg === 'nylon-bolting-cloth') label = 'Nylon Bolting Cloth';
      else if (seg === 'stainless-steel-mesh') label = 'Stainless Steel Mesh';
      else if (seg === 'vibrating-screens') label = 'Vibrating Screens';
      else if (seg === 'screening-equipment') label = 'Screening Equipment';
      else if (seg === 'conveyor-belts') label = 'Conveyor Belting';
      else if (seg === 'elevator-buckets') label = 'Elevator Buckets';
      else if (seg === 'industrial-filters') label = 'Industrial Filters';
      else if (seg === 'industries-served') label = 'Industries Served';
      
      // Capitalize Words
      label = label.replace(/\b\w/g, c => c.toUpperCase());
      crumbs.push({ label, path: index === segments.length - 1 ? '' : tempPath });
    });
    return crumbs;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 leading-normal antialiased pb-16 md:pb-0">
      
      {/* 1. KEYSTONE HEADER PANEL WITH INTEGRATED PATH ROUTER */}
      <Header
        currentPath={currentPath}
        onNavigate={(path) => navigateTo(path)}
      />

      {/* RENDER INJECTABLE HEADER JSON-LD SCHEMA BLOCKS */}
      <SchemaMarkup currentPath={currentPath} />

      {/* TOP HEADER LEADERBOARD AD - HIGH VIEWABILITY AND PREMIUM CPM */}
      <div className="bg-white border-b border-slate-200 py-2 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AdSenseBanner className="my-1 min-h-[90px]" />
        </div>
      </div>

      {/* CORE FRAMEWORK FOR SYSTEM ROUTING */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          
          {/* A. HOME VIEW (PATH: '/') */}
          {currentPath === '/' && (
            <motion.div
              key="home-path"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* Cover Banner */}
              <Hero
                onExploreClick={() => navigateTo('/products')}
                onPartnerClick={() => navigateTo('/contact-us')}
              />

              {/* 1500+ Words Hero Core Narrative Section */}
              <section className="bg-white py-16 sm:py-24 border-b border-slate-100 text-left">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto">
                    
                    {/* H1 Structured accurately */}
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#005fa9] block mb-2">
                      Certified Gujarat Industrial Enterprise
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-slate-950 uppercase mb-6">
                      {homeSEO.h1}
                    </h1>

                    <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans font-light mb-8 border-l-4 border-[#005fa9] pl-4 italic">
                      {homeSEO.introduction.title}. {homeSEO.introduction.subtitle}
                    </p>

                    <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-6 font-sans">
                      <p>{homeSEO.introduction.body}</p>
                      
                      {/* Loop rich keyword sections */}
                      <div className="space-y-12 pt-8">
                        {homeSEO.sections.map((sec, idx) => (
                          <div key={idx} className="border-t border-slate-100 pt-8" id={`home-section-${idx}`}>
                            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-slate-950 mb-4 flex items-center">
                              <span className="w-2.5 h-2.5 bg-[#005fa9] mr-3 rounded-none inline-block" />
                              {sec.title}
                            </h2>
                            <p className="whitespace-pre-line leading-relaxed">{sec.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Geography section */}
                    <div className="mt-16 bg-slate-950 text-white p-8 sm:p-10 border-t-4 border-[#005fa9] text-left">
                      <div className="flex items-center space-x-3 text-[#3ba2ff] mb-4">
                        <MapPin className="h-5 w-5" />
                        <h3 className="text-xs font-bold uppercase tracking-widest">{homeSEO.localGeoSection.heading}</h3>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold uppercase tracking-wide mb-3 text-slate-100">
                        {homeSEO.localGeoSection.subheading}
                      </h4>
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-sans">
                        {homeSEO.localGeoSection.content}
                      </p>
                    </div>

                    {/* Middle Page Display Ad */}
                    <AdSenseDisplay className="mt-16" />

                    {/* Direct shortcuts to the 6 category pages (satisfies linking & visual categories requirement) */}
                    <div className="mt-16 border-t border-slate-100 pt-16">
                      <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#005fa9] mb-4">
                        Explore Specialized Portfolios
                      </h3>
                      <p className="text-xs font-sans text-slate-500 mb-8">
                        Select a category to view technical parameters, material standards, and custom mesh sizes.
                      </p>
                      
                      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {[
                          { title: 'Wire Netting', path: '/wire-netting', desc: 'SS woven mesh, double-crimped screen mesh, and vibrating screen cloth.' },
                          { title: 'Perforated Sheets', path: '/perforated-sheets', desc: 'Round, slots, and capsule perforated metal screen plates.' },
                          { title: 'Nylon Bolting Cloth', path: '/nylon-bolting-cloth', desc: 'Swiss import quality monofilament polyamide sifting sifter cloth.' },
                          { title: 'Conveyor Belts', path: '/conveyor-belts', desc: 'Flat smooth rubber and cleated Chevron EP conveyor belting.' },
                          { title: 'Elevator Buckets', path: '/elevator-buckets', desc: 'Virgin HDPE, polyurethane, and pressed carbon steel buckets.' },
                          { title: 'Industrial Filters', path: '/industrial-filters', desc: 'Sintered meshes, extruder screens, candle filters, and chemical meshes.' },
                        ].map((cat, index) => (
                          <div 
                            key={index} 
                            onClick={() => navigateTo(cat.path)}
                            className="group cursor-pointer bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between hover:border-[#005fa9] transition-all hover:bg-white"
                          >
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950 group-hover:text-[#005fa9] transition-colors">
                                {cat.title} &rarr;
                              </h4>
                              <p className="text-[11.5px] text-slate-500 font-sans mt-2 leading-relaxed">
                                {cat.desc}
                              </p>
                            </div>
                            <span className="text-[10px] text-[#005fa9] font-bold uppercase tracking-wider mt-4 block group-hover:translate-x-1 transition-transform">
                              View Sizing Page
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* INTERACTIVE ORGANIC SEARCH SITELINK LAYOUT (SAME-TO-SAME AS REFERENCE IMAGE) */}
                    <div className="mt-20">
                      <GoogleSerpPreview onNavigate={navigateTo} />
                    </div>

                    {/* FAQS Accordion: 20 Questions (satisfies SEO FAQ requirement) */}
                    <div className="mt-20 border-t border-slate-100 pt-16" id="home-faqs-accordion">
                      <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2">Technical Hub</h3>
                      <h2 className="text-2xl font-light text-slate-900 uppercase tracking-tight mb-8">
                        Frequently Asked Questions &middot; <span className="font-extrabold text-[#005fa9]">Industrial FAQ</span>
                      </h2>

                      <div className="space-y-4">
                        {homeSEO.faq.map((item, idx) => {
                          const isOpen = openFaqIdx === idx;
                          return (
                            <div 
                              key={idx} 
                              className="bg-white border border-slate-200 overflow-hidden text-left transition-all"
                              id={`faq-block-${idx}`}
                            >
                              <button
                                onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                                className="w-full flex items-center justify-between text-left px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer"
                              >
                                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 font-sans">
                                  {idx + 1}. {item.q}
                                </span>
                                <span className="text-lg font-bold text-[#005fa9] ml-4">
                                  {isOpen ? '−' : '+'}
                                </span>
                              </button>
                              
                              <AnimatePresence>
                                {isOpen && (
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    className="border-t border-slate-100"
                                  >
                                    <p className="px-5 py-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                                      {item.a}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom CTA Block */}
                    <div className="mt-20 bg-[#005fa9] text-white p-8 sm:p-12 text-center text-left">
                      <h3 className="text-lg sm:text-2.5xl font-light uppercase tracking-tight mb-4">
                        Need Custom Sorter Dimensions?
                      </h3>
                      <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mx-auto mb-8 font-sans">
                        Our technical sales staff is ready to evaluate your plansifter frameworks, chemical fluids, or custom thresher segments. Submit an inquiry today!
                      </p>
                      <button 
                        onClick={() => navigateTo('/contact-us')}
                        className="cursor-pointer bg-white text-slate-950 px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-blue-50 transition-colors"
                      >
                        Request B2B Contract Quotation
                      </button>
                    </div>

                  </div>
                </div>
              </section>

              {/* Show logistics processes summary */}
              <ServicesPanel
                onCatalogClick={() => navigateTo('/products')}
                onDealerFormFocus={() => navigateTo('/contact-us')}
              />
            </motion.div>
          )}

          {/* B. ABOUT US VIEW (PATH: '/about-us') */}
          {currentPath === '/about-us' && (
            <motion.div
              key="about-path"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <section className="bg-white py-16 sm:py-24 text-left">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto">
                    
                    {/* BREADCRUMBS */}
                    <Breadcrumbs crumbs={getBreadcrumbs()} onNavigate={navigateTo} />

                    {/* EXACT ONE H1 */}
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#005fa9] block mb-2">
                      Indian Mining & Sifting Spares Authority
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-slate-950 uppercase mb-6">
                      {aboutSEO.h1}
                    </h1>

                    <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans font-light mb-8 border-l-4 border-[#005fa9] pl-4 italic">
                      {aboutSEO.intro.title}. {aboutSEO.intro.subtitle}
                    </p>

                    {/* Timeline and narrative */}
                    <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-8 font-sans">
                      <p>{aboutSEO.intro.body}</p>

                      {/* Display metric grid */}
                      <div className="grid grid-cols-2 gap-4 my-10 bg-slate-50 p-6 border border-slate-200">
                        {aboutSEO.stats.map((st, idx) => (
                          <div key={idx} className="p-4 bg-white border border-slate-150">
                            <span className="text-2xl font-black text-[#005fa9] block font-mono">{st.value}</span>
                            <span className="text-[10px] uppercase font-bold text-slate-400 mt-1 block">{st.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Middle page Display Ad banner */}
                      <AdSenseDisplay className="my-10" />

                      {/* Timeline Sections */}
                      <div className="space-y-12">
                        {aboutSEO.blocks.map((block, idx) => (
                          <div key={idx} className="border-t border-slate-100 pt-8" id={`about-block-${idx}`}>
                            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-slate-950 mb-4 flex items-center">
                              <span className="w-2.5 h-2.5 bg-[#005fa9] mr-3 rounded-none inline-block" />
                              {block.title}
                            </h2>
                            <p className="whitespace-pre-line leading-relaxed">{block.text}</p>
                          </div>
                        ))}
                      </div>

                      {/* Local Geo Quote */}
                      <div className="bg-slate-50 border border-slate-200 text-slate-800 p-6 sm:p-8 mt-12 block">
                        <p className="text-xs sm:text-sm italic text-slate-600 leading-relaxed font-serif">
                          "{aboutSEO.localGeoQuote}"
                        </p>
                        <span className="text-[10px] uppercase font-bold text-[#005fa9] tracking-widest mt-4 block">
                          &mdash; Technical Directorate, Mukesh Trading Co.
                        </span>
                      </div>

                      {/* Links to related product categories (Internal linking optimization) */}
                      <div className="mt-16 pt-12 border-t border-slate-100">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-950 mb-4">
                          Explore Category Solutions:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { name: 'Wire Netting', path: '/wire-netting' },
                            { name: 'Perforated Sheets', path: '/perforated-sheets' },
                            { name: 'Nylon Bolting Cloth', path: '/nylon-bolting-cloth' },
                            { name: 'Conveyor Belts', path: '/conveyor-belts' },
                            { name: 'Elevator Buckets', path: '/elevator-buckets' },
                            { name: 'Industrial Filters', path: '/industrial-filters' }
                          ].map((cat, index) => (
                            <button
                              key={index}
                              onClick={() => navigateTo(cat.path)}
                              className="cursor-pointer border border-slate-250 hover:border-[#005fa9] px-4 py-2 text-[10.5px] uppercase font-bold tracking-widest text-slate-700 hover:text-[#005fa9] hover:bg-white transition-all bg-slate-50"
                            >
                              {cat.name} &rarr;
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Top level linking */}
                      <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between text-[11px] uppercase tracking-wider font-bold">
                        <button onClick={() => navigateTo('/')} className="hover:text-[#005fa9]">Home</button>
                        <button onClick={() => navigateTo('/contact-us')} className="hover:text-[#005fa9]">Contact Us</button>
                        <button onClick={() => navigateTo('/products')} className="text-[#005fa9]">Products Catalogue</button>
                      </div>

                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* C. GENERAL DATA PRODUCTS LIST (PATH: '/products') */}
          {currentPath === '/products' && (
            <motion.div
              key="products-path"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* Product catalog list & filters */}
              <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <Breadcrumbs crumbs={getBreadcrumbs()} onNavigate={navigateTo} />
                <ProductCatalog 
                  cartItems={cartItems} 
                  onAddToCart={(p, q) => {
                    setCartItems((prev) => {
                      const existingIdx = prev.findIndex((item) => item.product.id === p.id);
                      if (existingIdx > -1) {
                        const updated = [...prev];
                        updated[existingIdx].quantity = q;
                        return updated;
                      } else {
                        return [...prev, { product: p, quantity: q }];
                      }
                    });
                  }} 
                />
                {/* Horizontal ad banner */}
                <AdSenseBanner />
              </div>
            </motion.div>
          )}

          {/* D. PRODUCT SUB-CATEGORY PAGES (PATHS MATCHING PRODUCT_PATHS) */}
          {[
            '/wire-mesh',
            '/wire-netting',
            '/perforated-sheets',
            '/nylon-bolting-cloth',
            '/stainless-steel-mesh',
            '/industrial-filters',
            '/vibrating-screens',
            '/screening-equipment',
            '/conveyor-belts',
            '/elevator-buckets'
          ].includes(currentPath) && (
            <motion.div
              key={`category-${currentPath}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <section className="bg-white py-16 sm:py-24 text-left">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto">
                    
                    {/* BREADCRUMBS */}
                    <Breadcrumbs crumbs={getBreadcrumbs()} onNavigate={navigateTo} />
 
                    {/* SELECT CURRENT SEO MODEL */}
                    <CategoryRouteRenderer 
                      path={currentPath} 
                      onNavigate={navigateTo} 
                      cartItems={cartItems}
                      onAddToCart={(p, q) => {
                        setCartItems((prev) => {
                          const existingIdx = prev.findIndex((item) => item.product.id === p.id);
                          if (existingIdx > -1) {
                            const updated = [...prev];
                            updated[existingIdx].quantity = q;
                            return updated;
                          } else {
                            return [...prev, { product: p, quantity: q }];
                          }
                        });
                      }}
                    />
 
                    {/* Horizontal ad banner */}
                    <AdSenseBanner className="mt-8 pt-6 border-t border-slate-100" />
 
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* INDUSTRIES SERVED VIEW (PATH: '/industries-served') */}
          {currentPath === '/industries-served' && (
            <motion.div
              key="industries-path"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <section className="bg-white py-16 sm:py-24 text-left">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto">
                    <Breadcrumbs crumbs={getBreadcrumbs()} onNavigate={navigateTo} />
                    
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#005fa9] block mb-2">
                      Industrial Sectors Served
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-slate-950 uppercase mb-6" id="industries-main-title">
                      {industriesServedSEO.h1}
                    </h1>

                    <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans font-light mb-8 border-l-4 border-[#005fa9] pl-4 italic">
                      {industriesServedSEO.intro.title}. {industriesServedSEO.intro.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-8">{industriesServedSEO.intro.body}</p>

                    <div className="space-y-12">
                      {industriesServedSEO.sections.map((sec, idx) => (
                        <div key={idx} className="border-t border-slate-100 pt-8" id={`indust-block-${idx}`}>
                          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-slate-950 mb-4 flex items-center">
                            <span className="w-2.5 h-2.5 bg-[#005fa9] mr-3 rounded-none inline-block" />
                            {sec.title}
                          </h2>
                          <p className="text-[13px] text-slate-650 leading-relaxed whitespace-pre-line font-sans">{sec.content}</p>
                        </div>
                      ))}
                    </div>

                    {/* Middle Page Display Ad */}
                    <AdSenseDisplay className="my-12" />

                    {/* Engineering Mechanics formula */}
                    <div className="bg-slate-950 text-white p-6 sm:p-8 border-l-[6px] border-[#005fa9] text-left mt-12 rounded-none">
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#3ba2ff] block mb-2">
                        Plansifter Sieve Capacity Sizing Mechanics
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-slate-100 mb-3">
                        {industriesServedSEO.engineeringMath.title}
                      </h4>
                      <p className="text-xs sm:text-sm font-mono leading-relaxed text-slate-300 whitespace-pre-line">
                        {industriesServedSEO.engineeringMath.formula}
                      </p>
                    </div>

                    {/* Specifications / Buyer steps */}
                    <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8 mt-12 text-left">
                      <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#005fa9] mb-4">
                        {industriesServedSEO.buyerGuide.title}
                      </h3>
                      <div className="space-y-4">
                        {industriesServedSEO.buyerGuide.steps.map((step, idx) => (
                          <div key={idx} className="flex items-start">
                            <span className="flex items-center justify-center bg-[#005fa9] text-white font-mono font-bold text-xs w-6 h-6 flex-shrink-0 mr-4">
                              {idx + 1}
                            </span>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#005fa9] text-white p-8 mt-12 text-center">
                      <p className="text-xs sm:text-sm leading-relaxed mb-6">
                        {industriesServedSEO.ctaText}
                      </p>
                      <button 
                        onClick={() => navigateTo('/contact-us')}
                        className="cursor-pointer bg-white text-slate-950 px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-blue-50 transition-colors"
                      >
                        Request Industrial Solution Quote
                      </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between text-[11px] uppercase tracking-wider font-bold text-slate-505">
                      <button onClick={() => navigateTo('/')} className="hover:text-[#005fa9]">Home</button>
                      <button onClick={() => navigateTo('/about-us')} className="hover:text-[#005fa9]">About Us</button>
                      <button onClick={() => navigateTo('/products')} className="hover:text-[#005fa9]">Products Catalogue</button>
                    </div>

                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* E. CONTACT US / LEAD SUBMISSION PORTAL (PATH: '/contact-us') */}
          {currentPath === '/contact-us' && (
            <motion.div
              key="contact-path"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-left">
                <Breadcrumbs crumbs={getBreadcrumbs()} onNavigate={navigateTo} />
                
                <div className="border-b border-slate-200 pb-6 mb-12">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#005fa9] block mb-2">
                    Commercial Sourcing Depot
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-slate-950 uppercase">
                    Contact Us &middot; <span className="text-[#005fa9] font-black">Procurement Desk</span>
                  </h1>
                  <p className="text-xs text-slate-500 font-sans mt-2">
                    Submit chemical fluid criteria, thresher dimensions, or plansifter accessorizing parameters.
                  </p>
                </div>

                <div className="grid gap-12 lg:grid-cols-12 items-start">
                  
                  {/* Left Metadata list, WhatsApp Buttons, click call, google map */}
                  <div className="lg:col-span-5 space-y-8" id="contact-info-col">
                    
                    {/* Physical Markings Address Cards */}
                    <div className="bg-slate-950 text-white p-6 sm:p-8 border-l-4 border-[#005fa9]">
                      <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#4fa7eb] mb-4">
                        Physical Warehouse Depot
                      </h3>
                      
                      <div className="space-y-4 text-xs font-sans">
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block text-slate-100">MUKESH TRADING CO.</span>
                            <span className="text-slate-350 block mt-1 leading-relaxed">
                              G-4, Abhishek Industrial Estate, Opp. Haripura Bus Stand, Civil Road, Asarwa, Ahmedabad, Gujarat 380016, India.
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 pt-2">
                          <Clock className="h-4 w-4 text-white" />
                          <span>Mon &mdash; Sat: 09:00 AM &mdash; 07:00 PM IST (Sundays Closed)</span>
                        </div>
                      </div>
                    </div>

                    {/* Local SEO keywords section for local search optimization */}
                    <div className="p-6 bg-slate-50 border border-slate-200">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                        Local Business SEO Directory
                      </h4>
                      <p className="text-xs font-sans text-slate-600 leading-relaxed">
                        Looking for a <strong>Wire Mesh Supplier Ahmedabad</strong> or an <strong>Industrial Supplier Near Me</strong>? Mukesh Trading Co Ahmedabad provides central pick-up facilities at Abhishek Industrial Estate, opposite Haripura Bus Stand. We are certified sifting and filtering suppliers across Vatva, Naroda, GIDC Odhav, Changodar, Kathwada, and Sanand.
                      </p>
                    </div>

                    {/* Dynamic click-to-command links */}
                    <div className="p-6 bg-white border border-slate-200 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950">
                        Immediate Telecommunications (Click to Dial)
                      </h3>
                      
                      <div className="grid gap-4 sm:grid-cols-2">
                        <a 
                          href="tel:+919879211012"
                          className="flex items-center justify-center space-x-2 border border-slate-300 hover:border-[#005fa9] p-3 text-xs font-bold text-slate-800 hover:text-[#005fa9] transition-all bg-slate-50 uppercase tracking-wider"
                        >
                          <Phone className="h-4 w-4" />
                          <span>+91 98792 11012</span>
                        </a>

                        <a 
                          href="tel:+919429356522"
                          className="flex items-center justify-center space-x-2 border border-slate-300 hover:border-[#005fa9] p-3 text-xs font-bold text-slate-800 hover:text-[#005fa9] transition-all bg-slate-50 uppercase tracking-wider"
                        >
                          <Phone className="h-4 w-4" />
                          <span>+91 94293 56522</span>
                        </a>
                      </div>

                      {/* WhatsApp click Button */}
                      <a 
                        href="https://wa.me/919879211012?text=Hello%20Mukesh%20Trading%20Co,%20I%20am%20interested%20in%20your%20industrial%20wire%20mesh%20and%20screening%20products."
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center space-x-2 w-full bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.451L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.59 2.019 14.13 1.01 11.999 1.01 6.563 1.01 2.139 5.378 2.135 10.81c0 1.679.444 3.321 1.286 4.773L2.433 21.4l6.023-1.581c1.391.761 2.96 1.161 4.544 1.163z" />
                        </svg>
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>

                    {/* Highly Professional Google Maps Iframe Embed of Asarwa high compatibility coords */}
                    <div className="border border-slate-200 overflow-hidden h-[260px] relative bg-slate-150">
                      <iframe 
                        title="Mukesh Trading Co. Location Map"
                        src="https://www.google.com/maps/embed?pb=!11m18!1m12!1m3!1d117512.44111306385!2d72.5019232876694!3d23.04169229891823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e869766904dbf%3A0x6bba3bc2f55819df!2sAsarwa%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1714521012356!5m2!1sen!2sin"
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={false} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>

                  </div>

                  {/* Right hand contact form (Integrated dynamic inquires CRM table log tracker) */}
                  <div className="lg:col-span-7">
                    <InquiriesDashboard
                      inquiries={inquiries}
                      onUpdateStatus={handleUpdateInquiryStatus}
                      onClearAll={handleClearInquiriesDb}
                      onAddInquiry={handleAddInquiry}
                      visitorIp={visitorIp}
                      visitorLocation={visitorLocation}
                    />
                  </div>

                </div>                {/* Lower linking */}
                <div className="mt-16 pt-8 border-t border-slate-200 flex flex-wrap gap-4 text-[11px] uppercase tracking-wider font-bold text-slate-505">
                  <button onClick={() => navigateTo('/')} className="hover:text-[#005fa9]">Home</button>
                  <button onClick={() => navigateTo('/about-us')} className="hover:text-[#005fa9]">About Us</button>
                  <button onClick={() => navigateTo('/products')} className="hover:text-[#005fa9]">Products Catalogue</button>
                  <span>&bull;</span>
                  <button onClick={() => navigateTo('/wire-netting')} className="hover:text-[#005fa9]">Wire Netting</button>
                  <button onClick={() => navigateTo('/perforated-sheets')} className="hover:text-[#005fa9]">Perforated Sheets</button>
                  <button onClick={() => navigateTo('/nylon-bolting-cloth')} className="hover:text-[#005fa9]">Bolting Cloth</button>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* End of the page multiplex ads */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
        <AdSenseMultiplex />
      </div>

      {/* FOOTER ACCORDING TO HIGH FIDELITY SPEC */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900" id="corporate-footer">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-4 text-left">
            
            {/* COLUMN 1: CORPORATE MARKINGS */}
            <div id="footer-branding-col" className="space-y-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="/favicon.svg" 
                  alt="MUKESH TRADING CO. Logo" 
                  className="h-10 w-10 object-contain rounded-full bg-white p-0.5" 
                  referrerPolicy="no-referrer"
                />
                <span className="text-sm font-black tracking-widest text-white uppercase font-sans">
                  MUKESH TRADING CO.
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Gujarat's premium wholesale distribution platform established in 1975 at Asarwa, Ahmedabad. Sourcing high-spec Wire Netting, SS Wire Mesh, computerized Perforated Sheets, monofilament Nylon Bolting Cloth, and complete Plansifter spares.
              </p>
            </div>

            {/* COLUMN 2: INTERNAL SEO LINKING CATEGORIES */}
            <div id="footer-materials-col">
              <h4 className="text-[10px] font-bold text-slate-200 uppercase tracking-widest mb-4">SEO Category Landing Pages</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => navigateTo('/wire-netting')} className="hover:text-white transition-colors cursor-pointer text-left uppercase text-[10px] tracking-wider font-semibold text-slate-400">Wire Netting &amp; Mesh</button></li>
                <li><button onClick={() => navigateTo('/perforated-sheets')} className="hover:text-white transition-colors cursor-pointer text-left uppercase text-[10px] tracking-wider font-semibold text-slate-400">Perforated Steel Sheets</button></li>
                <li><button onClick={() => navigateTo('/nylon-bolting-cloth')} className="hover:text-white transition-colors cursor-pointer text-left uppercase text-[10px] tracking-wider font-semibold text-slate-400">Nylon Bolting Cloth</button></li>
                <li><button onClick={() => navigateTo('/conveyor-belts')} className="hover:text-white transition-colors cursor-pointer text-left uppercase text-[10px] tracking-wider font-semibold text-slate-400">Conveyor Belting Spares</button></li>
                <li><button onClick={() => navigateTo('/elevator-buckets')} className="hover:text-white transition-colors cursor-pointer text-left uppercase text-[10px] tracking-wider font-semibold text-slate-400">Vertical Elevator Buckets</button></li>
                <li><button onClick={() => navigateTo('/industrial-filters')} className="hover:text-white transition-colors cursor-pointer text-left uppercase text-[10px] tracking-wider font-semibold text-slate-400 font-sans">Sintered Candle Filters</button></li>
              </ul>
            </div>

            {/* COLUMN 3: CORPORATE CHANNELS */}
            <div id="footer-terms-col" className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-200 uppercase tracking-widest mb-4">Corporate Links</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => navigateTo('/')} className="hover:text-white transition-colors">Home Page</button></li>
                <li><button onClick={() => navigateTo('/about-us')} className="hover:text-white transition-colors">About History Since 1975</button></li>
                <li><button onClick={() => navigateTo('/contact-us')} className="hover:text-white transition-colors">Contact Procurement Desk</button></li>
                <li><button onClick={() => navigateTo('/industries-served')} className="hover:text-white transition-colors">Industries Served</button></li>
              </ul>
            </div>

            {/* COLUMN 4: LOCAL ADVISORY STATEMENT */}
            <div id="footer-actions-col" className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-200 uppercase tracking-widest mb-4">Wholesale Support</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                Supplying major industrial enterprises across Naroda, Vatva, Changodar, Sanand, Gandhinaagar, Mehsana, Vadodara, Morbi and outer-states like Punjab, Haryana, Rajasthan and South India.
              </p>
              <button
                id="footer-catalog-shortcut"
                onClick={() => navigateTo('/products')}
                className="inline-flex w-full items-center justify-center space-x-2 rounded-none bg-slate-900 text-slate-200 py-3 px-4 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 border border-slate-800 cursor-pointer"
              >
                <span>Interactive CRM Catalog &rarr;</span>
              </button>
            </div>

          </div>

          {/* LOWER ROW */}
          <div className="mt-16 pt-8 border-t border-slate-900 text-center md:flex md:items-center md:justify-between text-[11px] text-slate-600 font-sans">
            <p>&copy; 2026 MUKESH TRADING CO. All industrial rights reserved. Designed to precise digital corporate standards on mukeshtrading.com.</p>
            <div className="mt-4 md:mt-0 flex justify-center space-x-4 font-mono text-[10px]">
              <span>GIDC-MUTES-1975-AHMD</span>
              <span>&middot;</span>
              <span onClick={() => navigateTo('/contact-us')} className="cursor-pointer hover:text-white">Request Quotation</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY B2B QUICK ACTIONS (OPTIMIZED FOR MOBILE USERS IN INDIA) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#161616]/95 backdrop-blur-md border-t border-neutral-800 md:hidden grid grid-cols-2 shadow-2xl">
        <a 
          href="tel:+919879211012"
          className="flex items-center justify-center space-x-2 py-4 bg-[#005fa9] hover:bg-[#004d8a] transition-all text-white font-extrabold uppercase tracking-widest text-[10px] font-sans border-r border-[#131313]/20"
        >
          <Phone className="h-3.5 w-3.5" />
          <span>Procurement Call</span>
        </a>
        <a 
          href="https://wa.me/919879211012?text=Hello%20Mukesh%20Trading%20Co,%20I%20am%20interested%20in%20your%20industrial%20wire%20mesh%20and%20screening%20products."
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center space-x-2 py-4 bg-[#25D366] hover:bg-[#20ba59] transition-all text-white font-extrabold uppercase tracking-widest text-[10px] font-sans"
        >
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.451L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.59 2.019 14.13 1.01 11.999 1.01 6.563 1.01 2.139 5.378 2.135 10.81c0 1.679.444 3.321 1.286 4.773L2.433 21.4l6.023-1.581c1.391.761 2.96 1.161 4.544 1.163z" />
          </svg>
          <span>WhatsApp Chat</span>
        </a>
      </div>

    </div>
  );
}

// BREADCRUMB COMPONENT
interface BreadcrumbsProps {
  crumbs: { label: string; path: string }[];
  onNavigate: (path: string) => void;
}
function Breadcrumbs({ crumbs, onNavigate }: BreadcrumbsProps) {
  return (
    <nav className="flex mb-6 text-[10.5px] font-bold uppercase tracking-widest text-slate-400">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {crumbs.map((crumb, idx) => (
          <li key={idx} className="inline-flex items-center">
            {idx > 0 && <span className="mx-2 text-slate-300">/</span>}
            {crumb.path ? (
              <button 
                onClick={() => onNavigate(crumb.path)}
                className="hover:text-[#005fa9] hover:underline cursor-pointer"
              >
                {crumb.label}
              </button>
            ) : (
              <span className="text-slate-600 font-sans">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ROUTER MATCHER COMPONENT FOR INDIVIDUAL PRODUCT CATEGORIES
interface CategoryRouteRendererProps {
  path: string;
  onNavigate: (path: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  cartItems: CartItem[];
}
function CategoryRouteRenderer({ path, onNavigate, onAddToCart, cartItems }: CategoryRouteRendererProps) {
  
  // Choose model
  let model: any = null;
  let categoryProductsFilter: string[] = [];

  if (path === '/wire-netting' || path === '/products/wire-netting') {
    model = wireNettingSEO;
    categoryProductsFilter = ['SS Wire Mesh', 'Spring Steel'];
  } else if (path === '/perforated-sheets' || path === '/products/perforated-sheets') {
    model = perforatedSheetsSEO;
    categoryProductsFilter = ['Thresher Parts', 'Perforated Sheets'];
  } else if (path === '/nylon-bolting-cloth' || path === '/products/nylon-bolting-cloth') {
    model = nylonBoltingClothSEO;
    categoryProductsFilter = ['SS Wire Mesh', 'Thresher Parts']; // Fallbacks or matching plansifter accessories
  } else if (path === '/conveyor-belts' || path === '/products/conveyor-belts') {
    model = conveyorBeltsSEO;
    categoryProductsFilter = ['Balt', 'Belt Lacing Clip', 'Conveyor Belt Fastener'];
  } else if (path === '/elevator-buckets' || path === '/products/elevator-buckets') {
    model = elevatorBucketsSEO;
    categoryProductsFilter = ['Elevator Bucket', 'Bucket Bolt', 'Patta Bolt'];
  } else if (path === '/industrial-filters' || path === '/products/industrial-filters') {
    model = industrialFiltersSEO;
    categoryProductsFilter = ['Candle Filter & Extruder Screens'];
  } else if (path === '/wire-mesh') {
    model = additionalProductsSEO.wireMesh;
    categoryProductsFilter = ['SS Wire Mesh'];
  } else if (path === '/stainless-steel-mesh') {
    model = additionalProductsSEO.stainlessSteelMesh;
    categoryProductsFilter = ['SS Wire Mesh'];
  } else if (path === '/vibrating-screens') {
    model = additionalProductsSEO.vibratingScreens;
    categoryProductsFilter = ['Spring Steel'];
  } else if (path === '/screening-equipment') {
    model = additionalProductsSEO.screeningEquipment;
    categoryProductsFilter = ['Thresher Parts'];
  }

  if (!model) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Path Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">The requested sifting product subcategory could not be located in our index.</p>
        <button onClick={() => onNavigate('/products')} className="mt-6 bg-[#005fa9] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider">
          Return To Catalogue
        </button>
      </div>
    );
  }

  // Find related components from mock databases for dynamic products list (Image 2 style)
  // To keep it 100% robust, if the custom filtered list doesn't yield anything we pull standard items
  let filteredProducts: Product[] = WHOLESALE_PRODUCTS.filter((p: Product) => 
    categoryProductsFilter.includes(p.category) || (p.subType && categoryProductsFilter.some(filter => p.subType?.toLowerCase().includes(filter.toLowerCase())))
  );
  if (filteredProducts.length === 0) {
    filteredProducts = WHOLESALE_PRODUCTS.slice(0, 3);
  }

  // Stretch standard lists or items if available
  const displaySpecsTable = model.specsTable || model.technicalSpec || model.technicalSpecifications || model.specifications || [];
  const displaySteps = model.installationGuide?.steps || model.maintenanceTips?.steps || model.assemblyMatters?.steps || model.buyerGuide?.steps || [];
  const displayStepsTitle = model.installationGuide?.title || model.maintenanceTips?.title || model.assemblyMatters?.title || model.buyerGuide?.title || "Operational B2B Sizing Guide";
  const displayFormula = model.engineeringMath?.formula || null;
  const displayFormulaTitle = model.engineeringMath?.title || null;

  return (
    <div className="space-y-12">
      
      {/* 1. EXACT ONE H1 */}
      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#005fa9] block mb-2">
          B2B Technical Screening Spec Sheet
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-slate-950 uppercase">
          {model.h1}
        </h1>
      </div>

      {/* Intro Box */}
      <div className="border-l-4 border-[#005fa9] pl-6 italic bg-slate-50 py-6 pr-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#005fa9] mb-2">{model.intro.title}</h3>
        <h4 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">{model.intro.subtitle}</h4>
        <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-sans not-italic font-light">{model.intro.body}</p>
      </div>

      {/* Specifications Table */}
      {displaySpecsTable.length > 0 && (
        <div className="border border-slate-200" id="specs-grid-panel">
          <div className="bg-slate-50 border-b border-slate-200 px-5 py-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">
              Technical Tolerances &amp; Sizing Specs
            </h3>
          </div>
          <table className="min-w-full divide-y divide-slate-200 text-xs font-sans">
            <tbody className="bg-white divide-y divide-slate-200">
              {displaySpecsTable.map((spec: any, idx: number) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                  <td className="px-5 py-3.5 font-bold text-slate-950 border-r border-slate-100 uppercase tracking-wider text-[10px] w-1/3">
                    {spec.label}
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 leading-normal">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 1500+ Words Narrative Sections */}
      <div className="space-y-12 py-6 border-t border-slate-100">
        {model.sections.map((sec: any, idx: number) => (
          <div key={idx} className="scroll-mt-24 pt-4" id={`categ-section-${idx}`}>
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-slate-950 mb-4 flex items-center">
              <span className="w-2.5 h-2.5 bg-[#005fa9] mr-3 rounded-none inline-block" />
              {sec.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line font-sans font-normal">
              {sec.content}
            </p>
          </div>
        ))}
      </div>

      {/* Mathematics/Formula Blocks if exists */}
      {displayFormula && (
        <div className="bg-slate-950 text-white p-6 sm:p-8 border-l-[6px] border-[#005fa9] text-left">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#3ba2ff] block mb-2">Technical Mechanics Mathematical Reference</span>
          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-slate-100 mb-3">
            {displayFormulaTitle}
          </h4>
          <p className="text-xs sm:text-sm font-mono leading-relaxed text-slate-300">
            {displayFormula}
          </p>
        </div>
      )}

      {/* Standard Step items / Buyer guideline list */}
      {displaySteps.length > 0 && (
        <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8 text-left">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#005fa9] mb-4">
            {displayStepsTitle}
          </h3>
          
          <div className="space-y-4">
            {displaySteps.map((step: string, idx: number) => (
              <div key={idx} className="flex items-start">
                <span className="flex items-center justify-center bg-[#005fa9] text-white font-mono font-bold text-xs w-6 h-6 flex-shrink-0 mr-4 rounded-none">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Catalogue items Section (satisfies Dynamic Related Products requirement) */}
      <div className="pt-12 border-t border-slate-100" id="related-hardware-catalog">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Product Stock Portfolio</h3>
        <h2 className="text-xl font-light text-slate-900 uppercase tracking-tight mb-8">
          In-Stock Hardware &middot; <span className="font-extrabold text-[#005fa9]">{path.split('/').pop()?.replace(/-/g, ' ')}</span>
        </h2>
        
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filteredProducts.map((p) => (
            <div 
              key={p.id} 
              className="bg-white border border-slate-200 flex flex-col justify-between hover:border-[#005fa9] transition-all"
              id={`related-card-${p.id}`}
            >
              <div>
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative border-b border-slate-100">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover grayscale opacity-90 transition-all hover:grayscale-0 hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 left-2 bg-slate-950 text-white text-[9px] font-bold uppercase py-1 px-2.5 tracking-wider">
                    {p.sku}
                  </span>
                </div>
                <div className="p-5 text-left">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                    {p.category}
                  </span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950 leading-normal mb-2">
                    {p.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-sans leading-normal line-clamp-2">
                    {p.description}
                  </p>
                </div>
              </div>
              
              <div className="p-5 pt-0 text-left flex flex-col gap-3">
                <div className="border-t border-slate-100 pt-3 text-[10px] font-sans text-slate-500 space-y-1">
                  <div><strong>MOQ:</strong> {p.moq} {p.unit}</div>
                  <div><strong>Unit weight:</strong> {p.weight}</div>
                </div>
                <button
                  onClick={() => {
                    onAddToCart(p, p.moq);
                    onNavigate('/contact-us');
                  }}
                  className="w-full text-center bg-slate-950 hover:bg-[#005fa9] text-white py-2.5 text-[10px] font-extrabold uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Request B2B Quote</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Internal SEO links back to standard hubs (satisfies Internal linking requirement) */}
      <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8 space-y-4 text-left" id="seo-internal-links-section">
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#005fa9]">
          B2B Internal Navigation Directory &amp; Related Links
        </h4>
        <p className="text-xs font-sans text-slate-500 leading-relaxed">
          To simplify commercial sourcing for multi-milling facilities, we cross-link all process solutions across central hubs. Navigate directly to compare relevant products:
        </p>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4 font-sans text-xs">
          <button onClick={() => onNavigate('/')} className="text-left font-bold text-slate-700 hover:text-[#005fa9]">&bull; Back to Home Page</button>
          <button onClick={() => onNavigate('/about-us')} className="text-left font-bold text-slate-700 hover:text-[#005fa9]">&bull; About History Since 1975</button>
          <button onClick={() => onNavigate('/contact-us')} className="text-left font-bold text-slate-700 hover:text-[#005fa9]">&bull; Contact Procurement Desk</button>
          <button onClick={() => onNavigate('/products')} className="text-left font-bold text-[#005fa9] hover:underline">&bull; Interactive CRM Catalog</button>
        </div>
        
        <div className="border-t border-slate-200 pt-4">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">Relevant Mill Spares Categories</span>
          <div className="flex flex-wrap gap-2 pt-1 font-sans">
            {[
              { label: 'Stainless Steel Mesh', path: '/wire-netting' },
              { label: 'Thresher Perforations', path: '/perforated-sheets' },
              { label: 'Nylon plansifters', path: '/nylon-bolting-cloth' },
              { label: 'Conveyor Belting', path: '/conveyor-belts' },
              { label: 'HDPE Elevators', path: '/elevator-buckets' },
              { label: 'Sintered Candle Filters', path: '/industrial-filters' },
            ].map((lnk, index) => (
              <button 
                key={index}
                onClick={() => onNavigate(lnk.path)}
                className="text-[10px] bg-white border border-slate-250 px-3 py-1.5 font-bold uppercase text-slate-600 hover:border-[#005fa9] hover:text-[#005fa9]"
              >
                {lnk.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* B2B call to action */}
      <div className="bg-[#005fa9] text-white p-8 sm:p-10 text-center text-left">
        <p className="text-xs sm:text-sm font-sans tracking-wide leading-relaxed text-blue-100 mb-6">
          {model.ctaText}
        </p>
        <button 
          onClick={() => onNavigate('/contact-us')}
          className="cursor-pointer bg-white text-slate-950 px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-blue-50 transition-colors"
        >
          Submit Commercial Inquiry Form
        </button>
      </div>

    </div>
  );
}

// INJECTABLE JSON-LD SCHEMAS
function SchemaMarkup({ currentPath }: { currentPath: string }) {
  // Setup standard WebSite schema for Google Search Engine Site Name
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Mukesh Trading Co.",
    "alternateName": [
      "Mukesh Trading Company",
      "MUKESH TRADING CO.",
      "Mukesh Trading"
    ],
    "url": "https://mukeshtrading.com/"
  };

  // Setup standard LocalBusiness and Organization
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://mukeshtrading.com/#organization",
    "name": "Mukesh Trading Co.",
    "url": "https://mukeshtrading.com/",
    "logo": "https://mukeshtrading.com/favicon.svg",
    "foundingDate": "1975",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-98792-11012",
      "contactType": "sales",
      "email": "mukeshtradingco16@gmail.com",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi", "gu"]
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://mukeshtrading.com/#localbusiness",
    "name": "Mukesh Trading Co.",
    "image": "https://i.ibb.co/fG9kDh3g/2f9eb394-1796-43d0-a38c-cb555323144c.png",
    "url": "https://mukeshtrading.com/",
    "telephone": "+91-98792-11012",
    "email": "mukeshtradingco16@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "G-4, Abhishek Industrial Estate, Opp. Haripura Bus Stand, Civil Road, Asarwa",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "380016",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.0416",
      "longitude": "72.6019"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    }
  };

  const faqsSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": homeSEO.faq.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://mukeshtrading.com/"
      },
      currentPath !== '/' ? {
        "@type": "ListItem",
        "position": 2,
        "name": currentPath.replace('/', '').replace(/-/g, ' ').toUpperCase(),
        "item": "https://mukeshtrading.com" + currentPath
      } : null
    ].filter(Boolean)
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(orgSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbsSchema)}
      </script>
      {currentPath === '/' && (
        <script type="application/ld+json">
          {JSON.stringify(faqsSchema)}
        </script>
      )}
    </>
  );
}
