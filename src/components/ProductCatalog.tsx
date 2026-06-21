import React, { useState, useMemo, useEffect } from 'react';
import { Search, Info, ShoppingBag, ArrowUpRight, Check, AlertCircle, X, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Product, CartItem } from '../types';
import { WHOLESALE_PRODUCTS, TRADING_CATEGORIES } from '../data/products';
import { motion, AnimatePresence } from 'motion/react';
import AdSenseInFeed from './AdSenseInFeed';

// B2B Technical Conversion Constant Database
const MESH_CONVERSIONS = [
  { mesh: 10, mm: 2.000, micron: 2000, inch: 0.0787, app: "Coarse agricultural sorting, thresher sieves, pre-cleaner decks", suggested: "Perforated Sheets / Spring Steel Stone Crusher Jali" },
  { mesh: 20, mm: 0.841, micron: 841, inch: 0.0331, app: "Paddy separator grader plates, heavy sand dressing, quarry sizing", suggested: "SS Woven Wire Mesh, Spring Steel Screens" },
  { mesh: 40, mm: 0.420, micron: 420, inch: 0.0165, app: "General industrial slurry filtration, coarse plansifter sieve grids", suggested: "SS Woven Wire Mesh, Sieve Cleaners" },
  { mesh: 60, mm: 0.250, micron: 250, inch: 0.0098, app: "Standard plansifter flour processing (Maida / Rava / Suji grading)", suggested: "Nylon Bolting Cloth (GG-30 to GG-50), Extra-Fine Wire Mesh" },
  { mesh: 80, mm: 0.177, micron: 177, inch: 0.0070, app: "Fine wheat flour dressing, chemical powder sorting", suggested: "Nylon Bolting Cloth (HD / XXX Grade), SS 316 Wire Mesh" },
  { mesh: 120, mm: 0.125, micron: 125, inch: 0.0049, app: "Pharmaceutical granulators powder sifting, fluid bed drier filter socks", suggested: "Nylon Bolting Cloth, Sintered Micro-candle Filters" },
  { mesh: 200, mm: 0.074, micron: 74, inch: 0.0029, app: "Heavy duty chemical reactors, micro-powders chemical separator screen", suggested: "SS 316L Wire Mesh (Ultra-Fine Grade)" },
  { mesh: 325, mm: 0.044, micron: 44, inch: 0.0017, app: "Polishing oil filtration, precision hydraulic sifter mesh", suggested: "Sintered Multi-ply Candle Filters, SS Extruder Screens" },
  { mesh: 400, mm: 0.037, micron: 37, inch: 0.0015, app: "Ultra-fine clinical process control chemical filters", suggested: "Multi-layer Extruder Screen Packs" }
];

const GIDC_TRANSIT_DATA = [
  { zone: "Vatva GIDC (Ahmedabad)", dist: "12 km", time: "1-2 Hours (Same Day Delivery)", type: "Direct Courier / Local Delivery Van", cost: "Nominal Local Freight" },
  { zone: "Naroda GIDC (Ahmedabad)", dist: "6 km", time: "1 Hour (Immediate Express Hand-off)", type: "Direct Hand delivery / Courier", cost: "Free / Nominal Local Freight" },
  { zone: "Sanand GIDC (Auto Industry)", dist: "35 km", time: "2-4 Hours (Same Day Delivery)", type: "Express Tempo Service", cost: "On-Demand Tempo Rate" },
  { zone: "Changodar GIDC (Logistics)", dist: "28 km", time: "2-3 Hours (Same Day Delivery)", type: "Direct Dispatch / Local Freight Van", cost: "Standard Local Rate" },
  { zone: "Kathwada GIDC", dist: "15 km", time: "1-2 Hours (Same Day Dispatch)", type: "Direct Logistics Delivery", cost: "Nominal Local Freight" },
  { zone: "Morbi GIDC (Ceramic World)", dist: "195 km", time: "Overnight Freight (Under 12 Hours)", type: "Professional GIDC Cargo Truck", cost: "Averaged GIDC Freight Rate" },
  { zone: "Vapi GIDC (Chemical Belt)", dist: "360 km", time: "Next-Day Delivery (Under 24 Hours)", type: "Express Direct Cargo", cost: "Standard Logistics Class Rate" },
  { zone: "Ankleshwar GIDC (Industrial)", dist: "190 km", time: "Next-Day Delivery (Under 18 Hours)", type: "Express Daily Cargo Truck", cost: "Standard Logistics Class Rate" },
  { zone: "Alwar / Jaipur GIDC (Rajasthan)", dist: "620 km", time: "1-2 Days Cargo Transit", type: "Inter-State Logistical Transport", cost: "State Permit Freight Rate" },
  { zone: "Ludhiana GIDC (Punjab Mills)", dist: "1,180 km", time: "2-3 Days Rail / Heavy Truck Cargo", type: "Priority Heavy Mill Spares Hub", cost: "Contract rate / Express Rail Cargo" }
];

interface ProductCatalogProps {
  onAddToCart?: (product: Product, quantity: number) => void;
  cartItems?: CartItem[];
}

export default function ProductCatalog({ onAddToCart, cartItems }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  
  // Interactive product image lightbox states
  const [lightboxProduct, setLightboxProduct] = useState<Product | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Pinch-to-zoom and gesture states for mobile touch optimization
  const [touchStartDist, setTouchStartDist] = useState<number | null>(null);
  const [touchStartScale, setTouchStartScale] = useState<number>(1);
  const [lastTap, setLastTap] = useState<number>(0);

  // B2B Technical Sifting Companion States
  const [toolkitOpen, setToolkitOpen] = useState(false);
  const [activeToolkitTab, setActiveToolkitTab] = useState<'converter' | 'transit'>('converter');
  const [selectedMeshPreset, setSelectedMeshPreset] = useState<string>('60'); 
  const [customMeshInput, setCustomMeshInput] = useState<string>('');
  const [selectedGidcZone, setSelectedGidcZone] = useState<string>('Vatva GIDC (Ahmedabad)');

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchStartDist(dist);
      setTouchStartScale(zoomScale);
    } else if (e.touches.length === 1) {
      // Double tap helper for touch interfaces
      const now = Date.now();
      const DOUBLE_TAP_DELAY = 300;
      if (now - lastTap < DOUBLE_TAP_DELAY) {
        setZoomScale((prev) => (prev > 1.2 ? 1 : 2.25));
      }
      setLastTap(now);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
    if (e.touches.length === 2 && touchStartDist !== null) {
      e.preventDefault(); // Prevents page scrolling while pinching
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchStartDist;
      const nextScale = Math.min(3, Math.max(1, touchStartScale * factor));
      setZoomScale(nextScale);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartDist(null);
  };

  // Selected subType for 'Balt' category
  const [selectedBeltSubType, setSelectedBeltSubType] = useState<string>('All');

  // Reset belt subcategory when main category changes
  useEffect(() => {
    setSelectedBeltSubType('All');
  }, [selectedCategory]);

  // Stateful products list backing with local storage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      if (WHOLESALE_PRODUCTS.length === 0) {
        localStorage.removeItem('mukesh_trading_products');
        return [];
      }
      const stored = localStorage.getItem('mukesh_trading_products');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // If the cached list contains old demo products but our hardcoded array is empty or different, clear it
          const hasOldDemoData = parsed.some(p => p.sku === 'MTC-PS-RH-01');
          if (hasOldDemoData) {
            localStorage.removeItem('mukesh_trading_products');
            return WHOLESALE_PRODUCTS;
          }
          
          // Dynamic sync: Keep custom items added in Admin mode, but make sure existing standard products
          // are fully up-to-date with latest category, subType, image and name adjustments made in products.ts
          let isModified = false;
          const updated = parsed.map(curr => {
            const latest = WHOLESALE_PRODUCTS.find(wp => wp.id === curr.id || wp.sku === curr.sku);
            if (latest) {
              if (
                curr.category !== latest.category ||
                curr.subType !== latest.subType ||
                curr.image !== latest.image ||
                curr.name !== latest.name
              ) {
                isModified = true;
                return {
                  ...curr,
                  name: latest.name,
                  category: latest.category,
                  subType: latest.subType,
                  image: latest.image,
                  description: latest.description,
                  specifications: latest.specifications
                };
              }
            }
            return curr;
          });

          // Also check if there are totally new products in WHOLESALE_PRODUCTS that aren't inside the cached list at all
          const hasNewProducts = WHOLESALE_PRODUCTS.some(wp => !updated.some(p => p.sku === wp.sku || p.id === wp.id));
          if (hasNewProducts) {
            const missing = WHOLESALE_PRODUCTS.filter(wp => !updated.some(p => p.sku === wp.sku || p.id === wp.id));
            const merged = [...updated, ...missing];
            localStorage.setItem('mukesh_trading_products', JSON.stringify(merged));
            return merged;
          }

          if (isModified) {
            localStorage.setItem('mukesh_trading_products', JSON.stringify(updated));
            return updated;
          }
          return parsed;
        }
      }
      return WHOLESALE_PRODUCTS;
    } catch {
      return WHOLESALE_PRODUCTS;
    }
  });

  // Track quantities mapping synchronized to our products database template
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    setQuantities((prev) => {
      const newMap = { ...prev };
      products.forEach((p) => {
        if (newMap[p.id] === undefined) {
          newMap[p.id] = p.moq;
        }
      });
      return newMap;
    });
  }, [products]);

  // Sync products database to local storage
  useEffect(() => {
    localStorage.setItem('mukesh_trading_products', JSON.stringify(products));
  }, [products]);

  // Success indicator for added animation
  const [addedItemEffect, setAddedItemEffect] = useState<Record<string, boolean>>({});

  // Pagination State & URL query sync
  const itemsPerPage = 9;

  // Extract page number from path
  const getPageFromPath = (): number => {
    try {
      const path = window.location.pathname;
      const match = path.match(/\/products\/page-?(\d+)/);
      if (match) {
        const p = parseInt(match[1], 10);
        return isNaN(p) || p < 1 ? 1 : p;
      }
      // Keep fallback checks for ?page=X query param if someone has previous links
      const params = new URLSearchParams(window.location.search);
      const p = parseInt(params.get('page') || '1', 10);
      return isNaN(p) || p < 1 ? 1 : p;
    } catch {
      return 1;
    }
  };

  const [currentPage, setCurrentPage] = useState<number>(() => {
    return getPageFromPath();
  });

  // Sync page state & update browser URL
  useEffect(() => {
    try {
      const pathname = window.location.pathname;
      const targetPath = currentPage === 1 ? '/products' : `/products/page${currentPage}`;

      if (pathname !== targetPath) {
        const params = new URLSearchParams(window.location.search);
        params.delete('page');
        const searchStr = params.toString();
        const finalUrl = targetPath + (searchStr ? `?${searchStr}` : '');
        window.history.pushState(null, '', finalUrl);
      } else {
        const params = new URLSearchParams(window.location.search);
        if (params.has('page')) {
          params.delete('page');
          const searchStr = params.toString();
          const finalUrl = targetPath + (searchStr ? `?${searchStr}` : '');
          window.history.replaceState(null, '', finalUrl);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentPage]);

  // Reset page when search or filters update but not on first mount
  const isFirstRender = React.useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedBeltSubType]);

  // Deep-link popstate synchronization
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
      const matchBeltSub = (selectedCategory !== 'Balt' && selectedCategory !== 'Elevator Bucket' && selectedCategory !== 'Perforated Sheets' && selectedCategory !== 'Spring Steel' && selectedCategory !== 'SS Wire Mesh' && selectedCategory !== 'Yogeshwar Copy') || selectedBeltSubType === 'All' || product.subType === selectedBeltSubType;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchBeltSub && matchSearch;
    });
  }, [products, selectedCategory, selectedBeltSubType, searchQuery]);

  // Paginated product selection
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  }, [filteredProducts.length]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredProducts, totalPages, currentPage]);

  // Image Navigation & Keyboard support for Lightbox
  const handlePrevImage = () => {
    if (!lightboxProduct) return;
    const currentIndex = filteredProducts.findIndex((p) => p.id === lightboxProduct.id);
    if (currentIndex > 0) {
      setLightboxProduct(filteredProducts[currentIndex - 1]);
    } else {
      setLightboxProduct(filteredProducts[filteredProducts.length - 1]);
    }
    setZoomScale(1);
    setRotation(0);
  };

  const handleNextImage = () => {
    if (!lightboxProduct) return;
    const currentIndex = filteredProducts.findIndex((p) => p.id === lightboxProduct.id);
    if (currentIndex < filteredProducts.length - 1) {
      setLightboxProduct(filteredProducts[currentIndex + 1]);
    } else {
      setLightboxProduct(filteredProducts[0]);
    }
    setZoomScale(1);
    setRotation(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxProduct) return;
      if (e.key === 'Escape') {
        setLightboxProduct(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxProduct, filteredProducts]);

  // Handle local quantity input change
  const handleQtyChange = (productId: string, val: string) => {
    const num = parseInt(val, 10);
    if (isNaN(num)) {
      setQuantities((prev) => ({ ...prev, [productId]: 0 }));
    } else {
      setQuantities((prev) => ({ ...prev, [productId]: num }));
    }
  };

  // Safe incremental adjusters
  const adjustQty = (productId: string, delta: number, moq: number) => {
    const current = quantities[productId] ?? moq;
    const next = Math.max(0, current + delta);
    setQuantities((prev) => ({ ...prev, [productId]: next }));
  };

  // Add inquiry to App RFQ state
  const handleAddSubmit = (product: Product) => {
    let finalQty = quantities[product.id] ?? product.moq;
    
    // Auto-adjust to MOQ if below limit
    if (finalQty < product.moq) {
      finalQty = product.moq;
      setQuantities((prev) => ({ ...prev, [product.id]: product.moq }));
    }

    onAddToCart?.(product, finalQty);

    // Trigger visual success feedback
    setAddedItemEffect((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemEffect((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  // Calculate dynamic pricing based on quantity tier
  const getTierPriceInfo = (product: Product, qty: number) => {
    let appliedDiscount = 0;
    
    // Find highest matching tier
    const sortedTiers = [...product.tiers].sort((a, b) => b.minQty - a.minQty);
    for (const tier of sortedTiers) {
      if (qty >= tier.minQty) {
        appliedDiscount = tier.discountPercent;
        break;
      }
    }

    const unitPrice = product.basePrice * (1 - appliedDiscount / 100);
    const totalPrice = unitPrice * qty;
    const standardPrice = product.basePrice * qty;
    const saving = standardPrice - totalPrice;

    return {
      appliedDiscount,
      unitPrice,
      totalPrice,
      saving
    };
  };

  // Find preset conversion data
  const presetSelected = MESH_CONVERSIONS.find(c => c.mesh.toString() === selectedMeshPreset);
  // Custom calculations if they type something
  const customMeshNum = parseFloat(customMeshInput);
  const customCalculated = useMemo(() => {
    if (isNaN(customMeshNum) || customMeshNum <= 0) return null;
    const inchOpen = 1 / customMeshNum;
    const mmOpen = 25.4 / customMeshNum;
    const micronOpen = mmOpen * 1000;
    return {
      mesh: customMeshNum,
      mm: parseFloat(mmOpen.toFixed(4)),
      micron: Math.round(micronOpen),
      inch: parseFloat(inchOpen.toFixed(4)),
      app: "Custom B2B sifting specification request",
      suggested: customMeshNum <= 50 ? "SS Woven Wire Mesh / Perforated Screens" : "Swiss Import Nylon Bolting Cloth (HD/XXX)"
    };
  }, [customMeshNum]);

  const activeConversion = customCalculated || presetSelected || MESH_CONVERSIONS[3]; // Fallback to Mesh 60
  const activeGidcStats = GIDC_TRANSIT_DATA.find(z => z.zone === selectedGidcZone) || GIDC_TRANSIT_DATA[0];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 bg-[#FFFFFF]" id="wholesale-catalog-section">
      
      {/* SECTION HEADER */}
      <div className="md:flex md:items-end md:justify-between mb-8">
        <div className="max-w-xl text-left font-sans">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#005fa9] block mb-1">
            Wholesale Trading Goods
          </h2>
          <p className="mt-2 text-3xl font-light tracking-tight text-slate-900 sm:text-4xl uppercase">
            Commercial <span className="font-bold font-sans">Sourcing Catalog</span>
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            Review detailed specifications, technical configurations, physical dimensions, and operational properties of our machinery spares.
          </p>
        </div>

        {/* Action Controls & Search Group */}
        <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center max-w-xl w-full justify-end font-sans">
          
          {/* Toolkit toggle button */}
          <motion.button 
            type="button"
            onClick={() => setToolkitOpen(!toolkitOpen)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`cursor-pointer rounded-none border px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              toolkitOpen 
                ? 'bg-[#005fa9] border-[#005fa9] text-white' 
                : 'bg-[#005fa9]/5 border-[#005fa9]/30 text-[#005fa9] hover:bg-[#005fa9] hover:text-white'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            {toolkitOpen ? 'Close B2B Toolkit' : 'Mesh Unit Converter & GIDC Transit'}
          </motion.button>

          {/* Dynamic Search */}
          <div className="relative max-w-xs w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              id="product-search-bar"
              type="text"
              placeholder="Search by SKU or material..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-none border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs uppercase tracking-wider placeholder-slate-400 focus:border-slate-950 focus:outline-hidden focus:ring-1 focus:ring-slate-950 font-sans"
            />
          </div>
        </div>
      </div>

      {/* B2B INDUSTRIAL HIGH-END TECHNICAL TOOLKIT PANEL */}
      <AnimatePresence>
        {toolkitOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mb-10 border border-[#005fa9]/30 bg-slate-50/50"
          >
            <div className="p-6 sm:p-8 text-left font-sans">
              
              <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-4 mb-6 gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#005fa9] tracking-[0.2em] block mb-1">
                    B2B Commercial & Technical Assistant
                  </span>
                  <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-950">
                    Sifting Mill Companion & Sizing Toolbox
                  </h3>
                </div>

                <div className="flex bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setActiveToolkitTab('converter')}
                    className={`rounded-none px-4 py-1.5 text-[9px] font-bold uppercase tracking-wider transition-all ${
                      activeToolkitTab === 'converter'
                        ? 'bg-[#005fa9] text-white'
                        : 'text-slate-500 hover:text-slate-950'
                    }`}
                  >
                    Mesh to Micron Converter
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveToolkitTab('transit')}
                    className={`rounded-none px-4 py-1.5 text-[9px] font-bold uppercase tracking-wider transition-all ${
                      activeToolkitTab === 'transit'
                        ? 'bg-[#005fa9] text-white'
                        : 'text-slate-500 hover:text-slate-950'
                    }`}
                  >
                    GIDC Transit Dispatch Clock
                  </button>
                </div>
              </div>

              {/* TAB 1: MESH CONVERTER BODY */}
              {activeToolkitTab === 'converter' && (
                <div className="grid gap-6 md:grid-cols-12 items-start">
                  
                  {/* Sizer selectors and inputs */}
                  <div className="md:col-span-5 space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                        Step 1: Select Sifter Mesh Standard Preset
                      </label>
                      <select
                        value={selectedMeshPreset}
                        onChange={(e) => {
                          setSelectedMeshPreset(e.target.value);
                          setCustomMeshInput(''); // reset custom
                        }}
                        className="w-full bg-white border border-slate-200 px-3 py-2.5 text-xs rounded-none font-sans outline-hidden focus:border-[#005fa9]"
                      >
                        {MESH_CONVERSIONS.map((item) => (
                          <option key={item.mesh} value={item.mesh.toString()}>
                            Mesh {item.mesh} ({item.micron} Micron Rating)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[10px] uppercase font-bold text-slate-400">
                        Mesh
                      </div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                        Or Enter Custom Mesh Value:
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 50, 100, 150..."
                        value={customMeshInput}
                        onChange={(e) => {
                          setCustomMeshInput(e.target.value);
                        }}
                        className="w-full bg-white border border-slate-200 px-3 py-2 text-xs rounded-none font-sans outline-hidden focus:border-[#005fa9]"
                      />
                    </div>

                    <div className="text-[10px] text-slate-400 leading-normal">
                      *Note: Sieve calculation uses international engineering standard aperture formulas (Aperture size &asymp; 25.4 / Mesh size minus standard wire bounds).
                    </div>
                  </div>

                  {/* Dynamic results layout */}
                  <div className="md:col-span-7 bg-white border border-slate-200 p-5 sm:p-6 shadow-sm">
                    <h4 className="text-[10px] font-extrabold uppercase text-[#005fa9] tracking-wider mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#005fa9] inline-block" />
                      Dynamic Aperture Conversions (Mesh {activeConversion.mesh})
                    </h4>

                    <div className="grid grid-cols-3 gap-3 text-center mb-6">
                      <div className="border border-slate-100 p-3 bg-slate-50">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Microns &mu;m</div>
                        <div className="text-lg font-mono font-black text-slate-950">{activeConversion.micron}</div>
                      </div>
                      <div className="border border-slate-100 p-3 bg-slate-50">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Millimeters mm</div>
                        <div className="text-lg font-mono font-black text-[#005fa9]">{activeConversion.mm} mm</div>
                      </div>
                      <div className="border border-slate-100 p-3 bg-slate-50">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Inches &quot;</div>
                        <div className="text-lg font-mono font-black text-slate-950">{activeConversion.inch}</div>
                      </div>
                    </div>

                    <div className="space-y-3.5 text-xs">
                      <div className="flex items-start">
                        <span className="font-extrabold text-[10px] uppercase text-slate-400 tracking-wider w-32 flex-shrink-0 pt-0.5">Application:</span>
                        <p className="text-slate-700 font-medium">{activeConversion.app}</p>
                      </div>

                      <div className="flex items-start border-t border-slate-100 pt-3">
                        <span className="font-extrabold text-[10px] uppercase text-[#005fa9] tracking-wider w-32 flex-shrink-0 pt-0.5">Mukesh Inventory:</span>
                        <div>
                          <p className="text-slate-950 font-black uppercase text-[11px] mb-1">{activeConversion.suggested}</p>
                          <p className="text-[10px] text-slate-500">Available original stocks ready for immediate shipment inside Ahmedabad or overnight transport.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: GIDC TRANSIT TIME INDEX */}
              {activeToolkitTab === 'transit' && (
                <div className="grid gap-6 md:grid-cols-12 items-start">
                  
                  {/* Location Selector */}
                  <div className="md:col-span-5 space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                        Select Procurement Hub / GIDC Zone
                      </label>
                      <select
                        value={selectedGidcZone}
                        onChange={(e) => setSelectedGidcZone(e.target.value)}
                        className="w-full bg-white border border-slate-200 px-3 py-2.5 text-xs rounded-none font-sans outline-hidden focus:border-[#005fa9]"
                      >
                        {GIDC_TRANSIT_DATA.map((item) => (
                          <option key={item.zone} value={item.zone}>
                            {item.zone}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-slate-100/50 border border-slate-200/40 p-4 text-xs text-slate-600 leading-relaxed">
                      <strong>Asarwa Dispatch Depot:</strong> Mukesh Trading dispatch station shares immediate connectivity to State Highway &amp; National Highway networks, bypassing metropolitan traffic blocks.
                    </div>
                  </div>

                  {/* Dynamic transit results */}
                  <div className="md:col-span-7 bg-white border border-slate-200 p-5 sm:p-6 shadow-sm">
                    <h4 className="text-[10px] font-extrabold uppercase text-[#005fa9] tracking-wider mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#005fa9] inline-block" />
                      In-Route Courier &amp; Heavy Cargo Diagnostics
                    </h4>

                    <div className="grid grid-cols-2 gap-4 text-left mb-6">
                      <div className="border-l-2 border-[#005fa9] pl-3.5">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Transit Time:</div>
                        <div className="text-sm font-sans font-extrabold text-slate-900">{activeGidcStats.time}</div>
                      </div>
                      <div className="border-l-2 border-[#005fa9] pl-3.5">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Distance from Asarwa:</div>
                        <div className="text-sm font-mono font-extrabold text-slate-900">{activeGidcStats.dist}</div>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs border-t border-slate-100 pt-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-bold uppercase text-[10px]">Logistics Mode:</span>
                        <span className="font-extrabold uppercase text-slate-900 font-sans text-[11px]">{activeGidcStats.type}</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-50 pt-2">
                        <span className="text-slate-400 font-bold uppercase text-[10px]">Freight Band:</span>
                        <span className="font-semibold text-slate-600 italic">{activeGidcStats.cost}</span>
                      </div>
                      <div className="text-[10px] text-[#005fa9] font-medium leading-relaxed bg-[#005fa9]/5 border border-[#005fa9]/20 p-2 text-center mt-2 uppercase tracking-wider">
                        Deliveries accompanied by original test report paperwork &amp; tax invoice certificate copy.
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FILTER BUTTONS ROW */}
      <div className="flex flex-wrap gap-2 mb-6 items-center border-b border-slate-100 pb-6">
        {TRADING_CATEGORIES.map((cat) => (
          <motion.button
            key={cat}
            id={`filter-btn-${cat.replace(/\s+/g, '-').toLowerCase()}`}
            onClick={() => setSelectedCategory(cat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer rounded-none px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all ${
              selectedCategory === cat
                ? 'bg-[#005fa9] text-white'
                : 'bg-white border border-slate-100 text-slate-500 hover:text-slate-950 hover:bg-slate-50'
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* BALT SUB-CATEGORY SPECIALIST FILTERS */}
      {selectedCategory === 'Balt' && (
        <div className="mb-10 p-5 bg-slate-50 border border-slate-200/60 -mt-2 animate-fade-in text-left">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
            Select Specialize Balt Type:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'All',
              'Conveyor Belt',
              'Cotton',
              'Cotton-Nylon',
              'Nylon',
              'PVC Belt',
              'Synthetic Elevator Belt',
              'V Balt'
            ].map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedBeltSubType(sub)}
                className={`cursor-pointer rounded-none px-3.5 py-2 text-[9px] font-bold tracking-wider uppercase transition-all ${
                  selectedBeltSubType === sub
                    ? 'bg-slate-900 border border-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ELEVATOR BUCKET MATERIAL SPECIALIST FILTERS */}
      {selectedCategory === 'Elevator Bucket' && (
        <div className="mb-10 p-5 bg-slate-50 border border-slate-200/60 -mt-2 animate-fade-in text-left">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
            Select Bucket Material Specification:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'All',
              'MS Bucket',
              'PVC Bucket',
              'SS Bucket'
            ].map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedBeltSubType(sub)}
                className={`cursor-pointer rounded-none px-3.5 py-2 text-[9px] font-bold tracking-wider uppercase transition-all ${
                  selectedBeltSubType === sub
                    ? 'bg-slate-900 border border-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PERFORATED SHEET SHAPE / FUNCTION SPECIALIST FILTERS */}
      {selectedCategory === 'Perforated Sheets' && (
        <div className="mb-10 p-5 bg-slate-50 border border-slate-200/60 -mt-2 animate-fade-in text-left">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
            Select Perforator Shape / Deck Type:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'All', label: 'All Perforated Sheets' },
              { id: 'dry stoner screen', label: 'Dry Stoner Screen' },
              { id: 'long hole', label: 'Long Hole' },
              { id: 'Round hole', label: 'Round Hole' },
              { id: 'slotted hole', label: 'Slotted Hole' },
              { id: 'square hole', label: 'Square Hole' },
              { id: 'triangle hole', label: 'Triangle Hole' }
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedBeltSubType(sub.id)}
                className={`cursor-pointer rounded-none px-3.5 py-2 text-[9px] font-bold tracking-wider uppercase transition-all ${
                  selectedBeltSubType === sub.id
                    ? 'bg-slate-900 border border-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SPRING STEEL SUB MATERIAL FILTERS */}
      {selectedCategory === 'Spring Steel' && (
        <div className="mb-10 p-5 bg-slate-50 border border-slate-200/60 -mt-2 animate-fade-in text-left">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
            Select Spring Steel Grade / Deck Type:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'All', label: 'All Spring Steel' },
              { id: 'Spring Steel Wire Mesh', label: 'Fine Wire Mesh' },
              { id: 'Stone Crusher Jali', label: 'Stone Crusher Jali' }
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedBeltSubType(sub.id)}
                className={`cursor-pointer rounded-none px-3.5 py-2 text-[9px] font-bold tracking-wider uppercase transition-all ${
                  selectedBeltSubType === sub.id
                    ? 'bg-slate-900 border border-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SS WIRE MESH SUB CATEGORY FILTERS */}
      {selectedCategory === 'SS Wire Mesh' && (
        <div className="mb-10 p-5 bg-slate-50 border border-slate-200/60 -mt-2 animate-fade-in text-left">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
            Select Wire Mesh Specification / Subtype:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'All', label: 'All SS Wire Mesh' },
              { id: 'ceiling wire mesh', label: 'Ceiling Wire Mesh / POP Jali' },
              { id: 'Chain Link Fencing', label: 'Chain Link Fencing' },
              { id: 'crimped wire mesh', label: 'Crimped Wire Mesh' },
              { id: 'mosquito mesh net', label: 'Mosquito Mesh Net' },
              { id: 'Stainless Wire mesh', label: 'Stainless Steel Wire Mesh' },
              { id: 'weld mesh', label: 'Weld Mesh' }
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedBeltSubType(sub.id)}
                className={`cursor-pointer rounded-none px-3.5 py-2 text-[9px] font-bold tracking-wider uppercase transition-all ${
                  selectedBeltSubType === sub.id
                    ? 'bg-slate-900 border border-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* YOGESHWAR COPY SUB CATEGORY FILTERS */}
      {selectedCategory === 'Yogeshwar Copy' && (
        <div className="mb-10 p-5 bg-slate-50 border border-slate-200/60 -mt-2 animate-fade-in text-left">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
            Select Yogeshwar Copy Specification / Subtype:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'All', label: 'All Yogeshwar Copy' },
              { id: 'Candle Filter', label: 'Candle Filters' },
              { id: 'Extruder Screen', label: 'Extruder Screens' },
              { id: 'Welded Mesh', label: 'Welded Mesh' }
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedBeltSubType(sub.id)}
                className={`cursor-pointer rounded-none px-3.5 py-2 text-[9px] font-bold tracking-wider uppercase transition-all ${
                  selectedBeltSubType === sub.id
                    ? 'bg-slate-900 border border-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCTS GRID */}
      {paginatedProducts.length > 0 ? (
        <div className="space-y-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedProducts.map((product, index) => {
              const hasEffect = addedItemEffect[product.id];
              const isExpanded = expandedProduct === product.id;
              const inputQty = quantities[product.id] ?? product.moq;
              const priceInfo = getTierPriceInfo(product, inputQty);
              const isBelowMoq = inputQty < product.moq;

              // Check if item already exists in inquiry basket
              const alreadyInCart = cartItems?.find((item) => item.product.id === product.id);

              return (
                <React.Fragment key={product.id}>
                  <motion.div
                    layout
                    id={`product-card-${product.id}`}
                    whileHover={{ y: -6, borderColor: '#005fa9', boxShadow: "0 10px 25px -5px rgba(0,0,0,0.06)" }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="flex flex-col rounded-none border border-slate-200 bg-[#FFFFFF] p-6 relative text-left group cursor-pointer transition-all duration-300 shadow-xs hover:shadow-md"
                  >
                  {/* SKU Badge & Availability */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-bold tracking-wider text-slate-500 uppercase font-mono bg-slate-50 border border-slate-100 rounded-none px-2 py-1">
                      SKU: {product.sku}
                    </span>
                    
                    {product.isAvailable ? (
                      <span className="inline-flex items-center text-[9px] font-black tracking-widest uppercase text-[#005fa9] bg-[#005fa9]/5 px-2 py-1 border border-[#005fa9]/10 rounded-none">
                        ● READY STOCK
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-[9px] font-bold tracking-widest uppercase text-slate-400 bg-slate-50 px-2 py-1 border border-slate-100 rounded-none">
                        RESTOCKING
                      </span>
                    )}
                  </div>

                  {/* Product Image Panel */}
                  <div 
                    onClick={() => {
                      setLightboxProduct(product);
                      setZoomScale(1);
                      setRotation(0);
                    }}
                    className="aspect-video relative w-full overflow-hidden rounded-none bg-slate-50 mb-4 border border-slate-150 group cursor-zoom-in"
                    title="Click to maximize and zoom"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Category overlay */}
                    <span className="absolute bottom-2 left-2 bg-slate-950 text-[9px] font-black uppercase tracking-widest text-white px-2 py-1 rounded-none z-10">
                      {product.category}
                    </span>

                    {/* Elegant Magnify/Zoom Icon overlay on Hover */}
                    <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <div className="bg-slate-950/80 text-white flex items-center space-x-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest border border-white/10 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <Maximize2 className="h-3.5 w-3.5 text-[#3ba2ff]" />
                        <span>Maximize Details</span>
                      </div>
                    </div>
                  </div>

                  {/* Info Text */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-950 uppercase tracking-wide line-clamp-2 min-h-[40px] leading-snug flex items-start group-hover:text-[#005fa9] transition-colors duration-200">
                        {product.name}
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed font-sans">
                        {product.description}
                      </p>

                      {/* Packaging Details */}
                      <div className="mt-3 flex flex-wrap gap-2 text-[9px] font-extrabold uppercase tracking-wider text-slate-500 font-sans">
                        <span className="bg-slate-50 border border-slate-250 px-2 py-1 rounded-none">
                          Pack: {product.packaging}
                        </span>
                        <span className="bg-slate-50 border border-slate-250 px-2 py-1 rounded-none font-mono">
                          W: {product.weight}
                        </span>
                      </div>
                    </div>

                    {/* B2B Minimum Order limits & dynamic calculations */}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Wholesale MOQ Limit:
                        </span>
                        <span className="text-[10px] font-mono font-extrabold text-slate-900 bg-slate-50 px-2 py-0.5 border border-slate-150">
                          {product.moq} {product.unit}
                        </span>
                      </div>

                      {/* QUANTITY CONTROL BAR & BASKET ACTION */}
                      <div className="flex flex-col space-y-2">
                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">
                          Select Requisition Quantity:
                        </span>
                        <div className="flex items-center justify-between gap-2 bg-slate-50 border border-slate-100 p-1">
                          <div className="flex items-center space-x-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                adjustQty(product.id, -Math.max(1, Math.round(product.moq / 10)), product.moq);
                              }}
                              className="w-7 h-7 bg-white border border-slate-200 text-slate-600 hover:bg-[#005fa9] hover:text-white flex items-center justify-center font-bold text-xs"
                              title="Decrease"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={inputQty}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                setQuantities((prev) => ({ ...prev, [product.id]: isNaN(val) ? 0 : val }));
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="w-14 h-7 text-center font-mono font-bold text-xs bg-white border border-slate-200 focus:border-[#005fa9] outline-hidden focus:ring-1 focus:ring-[#005fa9]"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                adjustQty(product.id, Math.max(1, Math.round(product.moq / 10)), product.moq);
                              }}
                              className="w-7 h-7 bg-white border border-slate-200 text-slate-600 hover:bg-[#005fa9] hover:text-white flex items-center justify-center font-bold text-xs"
                              title="Increase"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-1">
                            {product.unit}s
                          </span>
                        </div>

                        {/* Error Warning */}
                        {isBelowMoq && (
                          <div className="text-[9px] text-[#E31C1C] font-semibold flex items-center gap-1 bg-red-50/50 p-1.5 border border-red-100/50">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>Warning: Order size is below {product.moq} {product.unit} MOQ limit. Click below to auto-correct and add.</span>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddSubmit(product);
                          }}
                          className={`w-full rounded-none py-2.5 text-[9px] font-bold uppercase tracking-widest text-center cursor-pointer transition-all duration-300 flex items-center justify-center space-x-1.5 shadow-sm border ${
                            hasEffect
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : alreadyInCart
                              ? 'bg-[#005fa9]/5 border-[#005fa9]/30 text-[#005fa9] hover:bg-[#005fa9] hover:text-white'
                              : 'bg-slate-950 border-slate-950 text-white hover:bg-[#005fa9] hover:border-[#005fa9]'
                          }`}
                        >
                          {hasEffect ? (
                            <>
                              <Check className="h-3.5 w-3.5 stroke-[3]" />
                              <span>Added Successfully!</span>
                            </>
                          ) : alreadyInCart ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              <span>Update In Basket ({inputQty})</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="h-3.5 w-3.5" />
                              <span>Add to Inquiry Basket</span>
                            </>
                          )}
                        </button>

                        {alreadyInCart && !hasEffect && (
                          <span className="text-[9px] text-[#005fa9] font-extrabold uppercase tracking-widest text-center block mt-1 bg-[#005fa9]/5 p-1 border border-[#005fa9]/15">
                            Currently In Inquiry list ({alreadyInCart.quantity} Units)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* EXPANDABLE SPECS */}
                  <div className="mt-4">
                    <button
                      id={`toggle-details-btn-${product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedProduct(isExpanded ? null : product.id);
                      }}
                      className="flex w-full items-center justify-between font-bold rounded-none border border-slate-200 px-3 py-2.5 text-[9px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-slate-950 transition-colors"
                    >
                      <span className="flex items-center space-x-1">
                        <Info className="h-3.5 w-3.5 text-[#005fa9]" />
                        <span>{isExpanded ? 'Hide Technical Data' : 'View Technical Specifications'}</span>
                      </span>
                      <ArrowUpRight className={`h-3 w-3 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 overflow-hidden rounded-none bg-slate-950 p-4 text-slate-300 text-left border border-slate-900"
                        >
                          {/* Specifications */}
                          <div>
                            <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-800 pb-1 mb-2">
                              Technical Data Specifications
                            </h4>
                            <div className="space-y-1">
                              {product.specifications && product.specifications.length > 0 ? (
                                product.specifications.map((spec, i) => (
                                  <div key={i} className="flex justify-between text-[11px] leading-6 font-sans">
                                    <span className="text-slate-500 font-medium">{spec.label}:</span>
                                    <span className="font-bold text-slate-200">{spec.value}</span>
                                  </div>
                                ))
                              ) : (
                                <div className="text-[10px] text-slate-500 italic font-sans">No specification list loaded.</div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
                {/* Insert AdSense in-feed native ads inside the product lists */}
                {index === 2 && (
                  <AdSenseInFeed className="sm:col-span-1 h-full" />
                )}
              </React.Fragment>
              );
            })}
          </div>

          {/* B2B METRIC PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-8" id="catalog-pagination">
              <p className="text-xs text-slate-500 font-sans">
                Showing <span className="font-semibold text-slate-900">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredProducts.length)}</span> to{' '}
                <span className="font-semibold text-slate-900">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</span> of{' '}
                <span className="font-semibold text-slate-900">{filteredProducts.length}</span> materials
              </p>

              <div className="flex items-center space-x-1.5 font-mono text-[10px]">
                {/* FIRST */}
                <motion.button
                  type="button"
                  onClick={() => {
                    setCurrentPage(1);
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                  whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                  className={`px-3 py-2 uppercase font-extrabold tracking-widest rounded-none border transition-all ${
                    currentPage === 1
                      ? 'text-slate-300 border-slate-100 cursor-not-allowed bg-slate-50/50'
                      : 'text-[#005fa9] border-slate-200 hover:border-[#005fa9] hover:bg-slate-50 cursor-pointer'
                  }`}
                >
                  First
                </motion.button>

                {/* PREV < */}
                <motion.button
                  type="button"
                  onClick={() => {
                    setCurrentPage(prev => Math.max(1, prev - 1));
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                  whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                  className={`flex items-center justify-center p-2 border transition-all ${
                    currentPage === 1
                      ? 'text-slate-300 border-slate-100 cursor-not-allowed bg-slate-50/50'
                      : 'text-[#005fa9] border-slate-200 hover:border-[#005fa9] hover:bg-slate-50 cursor-pointer'
                  }`}
                  title="Previous Page"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </motion.button>

                {/* PAGE NUMBERS */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <motion.button
                    key={pageNum}
                    type="button"
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-8.5 h-8.5 flex items-center justify-center font-bold font-sans transition-all border ${
                      currentPage === pageNum
                        ? 'bg-[#005fa9] border-[#005fa9] text-white'
                        : 'text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-50 cursor-pointer'
                    }`}
                  >
                    {pageNum}
                  </motion.button>
                ))}

                {/* NEXT > */}
                <motion.button
                  type="button"
                  onClick={() => {
                    setCurrentPage(prev => Math.min(totalPages, prev + 1));
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
                  whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                  className={`flex items-center justify-center p-2 border transition-all ${
                    currentPage === totalPages
                      ? 'text-slate-300 border-slate-100 cursor-not-allowed bg-slate-50/50'
                      : 'text-[#005fa9] border-slate-200 hover:border-[#005fa9] hover:bg-slate-50 cursor-pointer'
                  }`}
                  title="Next Page"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </motion.button>

                {/* LAST */}
                <motion.button
                  type="button"
                  onClick={() => {
                    setCurrentPage(totalPages);
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
                  whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                  className={`px-3 py-2 uppercase font-extrabold tracking-widest rounded-none border transition-all ${
                    currentPage === totalPages
                      ? 'text-slate-300 border-slate-100 cursor-not-allowed bg-slate-50/50'
                      : 'text-[#005fa9] border-slate-200 hover:border-[#005fa9] hover:bg-slate-50 cursor-pointer'
                  }`}
                >
                  Last
                </motion.button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div id="catalog-no-results" className="text-center py-12 md:py-16 bg-white border border-slate-150 rounded-none p-6 sm:p-10 max-w-xl mx-auto font-sans shadow-xs">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-50 border border-red-100 rounded-none text-[#E31C1C]">
              <AlertCircle className="h-8 w-8" />
            </div>
          </div>
          
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-900 leading-tight">No industrial materials matched</h3>
          <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
            Your query <span className="font-mono bg-slate-100 px-1.5 py-0.5 text-slate-700">"{searchQuery}"</span> didn't match our active inventory of premium wire mesh, sifter cloths, or perforated sheets.
          </p>

          {/* INTEGRATED DIRECT SEARCH BOX */}
          <div className="mt-6 max-w-md mx-auto relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-[#005fa9]" />
            </div>
            <input
              type="text"
              id="no-results-interactive-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search other premium mesh, micron sizing..."
              className="block w-full rounded-none border border-slate-300 bg-white py-3 pl-10 pr-4 text-xs font-sans text-slate-900 placeholder-slate-400 focus:border-[#005fa9] focus:outline-none focus:ring-1 focus:ring-[#005fa9]"
            />
          </div>

          {/* POPULAR B2B MATRICES / QUICK SEARCH SUGGESTIONS */}
          <div className="mt-6 text-left max-w-md mx-auto">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2 text-center">
              Or Instant Query Presets:
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                'Wire Mesh',
                'Nylon Sifter',
                'Perforated',
                'Conveyor',
                'Stainless Steel',
                'Micro Sieve'
              ].map((tag) => (
                <motion.button
                  key={tag}
                  type="button"
                  whileHover={{ scale: 1.05, borderColor: '#005fa9', color: '#005fa9' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCategory('All Categories');
                    setSearchQuery(tag);
                  }}
                  className="px-2.5 py-1.5 bg-slate-50 hover:bg-white text-[10px] font-bold uppercase tracking-wider text-slate-600 border border-slate-200 transition-colors cursor-pointer"
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-slate-150 pt-6 flex flex-col sm:flex-row justify-center gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSelectedCategory('All Categories');
                setSearchQuery('');
              }}
              className="cursor-pointer rounded-none bg-slate-950 border border-slate-950 text-white px-5 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800"
            >
              Reset Search &amp; Filters
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                // Focus top primary search bar
                const primarySearch = document.getElementById('product-search-bar');
                if (primarySearch) {
                  primarySearch.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  primarySearch.focus();
                }
              }}
              className="cursor-pointer rounded-none bg-white border border-slate-200 text-slate-700 px-5 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 hover:text-slate-900"
            >
              Focus Main Search Bar
            </motion.button>
          </div>
        </div>
      )}

      {/* FULL-SCREEN INTERACTIVE LIGHTBOX */}
      <AnimatePresence>
        {lightboxProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-slate-950/95 backdrop-blur-md p-4 md:p-6 overflow-hidden select-none"
            onClick={() => setLightboxProduct(null)}
          >
            {/* Top Bar Controls */}
            <div 
              className="flex items-center justify-between w-full max-w-7xl mx-auto z-50 gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-left">
                <p className="text-[10px] font-bold tracking-widest text-[#3ba2ff] uppercase">
                  {lightboxProduct.category} {lightboxProduct.subType ? `• ${lightboxProduct.subType}` : ''}
                </p>
                <h2 className="text-xs md:text-sm font-bold text-white uppercase tracking-wider line-clamp-1">{lightboxProduct.name}</h2>
                <p className="text-[9px] font-mono text-slate-500 uppercase mt-0.5">SKU: {lightboxProduct.sku}</p>
              </div>

              {/* Functional Scaling & Rotation tools */}
              <div className="flex items-center space-x-2 bg-slate-900/90 border border-slate-850 p-1.5 md:p-2">
                {/* Zoom Out */}
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.max(1, prev - 0.25))}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Zoom Out"
                  disabled={zoomScale <= 1}
                >
                  <ZoomOut className="h-4 w-4" />
                </button>

                {/* Scaler indicator / Reset */}
                <button
                  type="button"
                  onClick={() => {
                    setZoomScale(1);
                    setRotation(0);
                  }}
                  className="px-2 py-0.5 text-[10px] bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold font-mono transition-colors cursor-pointer"
                  title="Reset Zoom"
                >
                  {Math.round(zoomScale * 100)}%
                </button>

                {/* Zoom In */}
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.min(3, prev + 0.25))}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Zoom In"
                  disabled={zoomScale >= 3}
                >
                  <ZoomIn className="h-4 w-4" />
                </button>

                <div className="w-[1px] h-4 bg-slate-800 mx-1" />

                {/* Rotation */}
                <button
                  type="button"
                  onClick={() => setRotation((prev) => (prev + 90) % 360)}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Rotate 90°"
                >
                  <RotateCw className="h-4 w-4" />
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setLightboxProduct(null)}
                className="p-2 md:p-2.5 bg-slate-900 border border-slate-800 text-slate-450 hover:text-white hover:bg-slate-850 transition-colors cursor-pointer"
                title="Close Lightbox (Esc)"
              >
                <X className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>

            {/* Display Stage with Navigation */}
            <div className="relative flex-1 w-full max-w-7xl mx-auto flex items-center justify-between my-2 md:my-4">
              
              {/* Previous Image Chevron */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                className="absolute left-0 z-50 p-2 md:p-3 bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Previous Material (Left Arrow)"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </button>

              {/* Main Image Viewport Area */}
              <div 
                className="w-full h-full flex items-center justify-center overflow-auto p-4 md:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative max-w-full max-h-[60vh] md:max-h-[65vh] overflow-hidden flex items-center justify-center">
                  <motion.img
                    key={lightboxProduct.id}
                    src={lightboxProduct.image}
                    alt={lightboxProduct.name}
                    drag={zoomScale > 1}
                    dragConstraints={{
                      left: -450 * (zoomScale - 1),
                      right: 450 * (zoomScale - 1),
                      top: -350 * (zoomScale - 1),
                      bottom: 350 * (zoomScale - 1),
                    }}
                    dragElastic={0.2}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    animate={{
                      scale: zoomScale,
                      rotate: rotation,
                      x: zoomScale <= 1 ? 0 : undefined,
                      y: zoomScale <= 1 ? 0 : undefined,
                    }}
                    transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                    onClick={() => {
                      setZoomScale((prev) => (prev === 1 ? 2 : 1));
                    }}
                    className={`max-w-full max-h-[60vh] md:max-h-[65vh] object-contain shadow-2xl select-none transition-shadow duration-200 ${
                      zoomScale > 1 ? 'cursor-grab active:cursor-grabbing hover:shadow-cyan-950/20' : 'cursor-zoom-in'
                    }`}
                    referrerPolicy="no-referrer"
                  />

                  {/* Elegant Touch/Finger Guidance Bar for Mobile & Desktop UI */}
                  {zoomScale === 1 && (
                    <div className="absolute bottom-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 border border-slate-800/80 pointer-events-none select-none text-center rounded-none z-10 hidden sm:flex items-center gap-2 animate-pulse">
                      <span className="w-1.5 h-1.5 bg-sky-400 rounded-full" />
                      <p className="text-[10px] uppercase font-sans tracking-widest text-slate-300 font-semibold leading-none">
                        Double-click to zoom • Drag to explore
                      </p>
                    </div>
                  )}
                  {zoomScale === 1 && (
                    <div className="absolute bottom-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 border border-slate-800/80 pointer-events-none select-none text-center rounded-none z-10 flex sm:hidden items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-ping" />
                      <p className="text-[9px] uppercase font-sans tracking-wider text-slate-300 font-bold leading-none">
                        Pinch to zoom • Drag with Finger
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Next Image Chevron */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-0 z-50 p-2 md:p-3 bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Next Material (Right Arrow)"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>

            {/* Bottom Bar: Detailed specifications and thumb strip */}
            <div 
              className="w-full max-w-7xl mx-auto space-y-3 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Details & Specs Section */}
              <div className="bg-slate-900/90 border border-slate-850 p-3 md:p-4 text-left grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 font-sans">
                <div className="md:col-span-2 space-y-1">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#3ba2ff]">Sourcing Specification Description</p>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{lightboxProduct.description}</p>
                </div>
                <div className="bg-slate-950 p-2.5 border border-slate-850 space-y-1.5 self-center">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Logistics & Packaging</p>
                  <div className="text-[10px] text-slate-450 space-y-1 leading-tight font-mono">
                    <div><span className="text-slate-500 font-sans">Weight:</span> {lightboxProduct.weight}</div>
                    <div><span className="text-slate-500 font-sans">Standard Units:</span> {lightboxProduct.packaging}</div>
                    {lightboxProduct.specifications && lightboxProduct.specifications.length > 0 && (
                      <div><span className="text-slate-500 font-sans">{lightboxProduct.specifications[0].label}:</span> {lightboxProduct.specifications[0].value}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Thumbnail strip for rapid browsing inside active category */}
              <div className="space-y-1 text-left">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Explore matching categories ({filteredProducts.length})</p>
                <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                  {filteredProducts.map((p) => {
                    const isSelected = p.id === lightboxProduct.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setLightboxProduct(p);
                          setZoomScale(1);
                          setRotation(0);
                        }}
                        className={`relative h-12 w-16 md:h-14 md:w-20 flex-shrink-0 bg-slate-900 border transition-all cursor-pointer ${
                          isSelected ? 'border-[#3ba2ff] ring-1 ring-[#3ba2ff]' : 'border-slate-850 opacity-60 hover:opacity-100 hover:border-slate-600'
                        }`}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
