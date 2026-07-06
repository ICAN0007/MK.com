import { 
  Warehouse, 
  HeartHandshake, 
  ShieldAlert, 
  Award, 
  ChevronRight, 
  PhoneCall, 
  Mail, 
  Navigation, 
  Building2, 
  Coins, 
  ShieldCheck,
  Calendar,
  MapPin,
  Clock,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesPanelProps {
  onCatalogClick: () => void;
  onDealerFormFocus: () => void;
}

export default function ServicesPanel({ onCatalogClick, onDealerFormFocus }: ServicesPanelProps) {
  const steps = [
    {
      num: '01',
      title: 'Submit Inquiry RFQ',
      desc: 'Select specific sifting meshes, plansifter cleaners, or perforated sheets, specify quantities, and submit your RFQ request.'
    },
    {
      num: '02',
      title: 'Mill Spec Verification',
      desc: 'Our technical support team reviews your machinery models (Buhler, Alapala, Ocrim, etc.) to ensure perfect sizing and compatibility.'
    },
    {
      num: '03',
      title: 'Stock Allocation',
      desc: 'We count sifter cleaners, cut the Swiss nylon bolting cloth, and prepare perforated sheet batches in our Ahmedabad godown.'
    },
    {
      num: '04',
      title: 'Crate Delivery',
      desc: 'Your sifter spares and sheets are packed in secure wooden pallets or heavy crates and dispatched via trusted regional freight transport.'
    }
  ];

  const valueProps = [
    {
      icon: Warehouse,
      title: 'Premium Ready Stocks',
      desc: 'Immediate access to hundreds of standard round, long, and slotted screen dies, thousands of plansifter sifter pads, polyurethane cleaners, sifter pan scrapers, and Swiss nylon rolls in our Ahmedabad godown.'
    },
    {
      icon: HeartHandshake,
      title: 'Technical Mill Advisory',
      desc: 'Our experienced staff helps you select the correct plansifter mesh, sifter cleaner weights, and conveyor belt plies to maximize flour throughput and avoid screen tears.'
    },
    {
      icon: ShieldAlert,
      title: 'Strict Quality Testing',
      desc: 'Every single batch of perforated panels, SS wire netting, and Swiss monofilament nylon bolting cloth undergoes strict flatness reviews, aperture checks, and durability tests.'
    },
    {
      icon: Award,
      title: 'All-Metals Punch Selection',
      desc: 'Get raw or galvanised punching in mild steel, stainless steels (SS 304/316), brass, or aluminium, perfectly custom-cut to fit any stoner, huller, cleaner, or sorting machinery.'
    }
  ];

  return (
    <div className="bg-slate-50 flex flex-col items-stretch" id="wholesale-services-panel">
      
      {/* BRAND HERITAGE / ABOUT US SECTION */}
      <section 
        id="history-specifications-anchor" 
        className="scroll-mt-24 bg-white border-b border-slate-200/60 py-20 sm:py-24 text-left"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          
          {/* Header Row */}
          <div className="border-b border-slate-100 pb-8 mb-12">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#005fa9] block mb-2">
              Corporate Heritage Profile
            </span>
            <h2 className="text-3xl font-light tracking-tight text-slate-950 sm:text-4xl uppercase">
              About <span className="font-extrabold text-[#005fa9]">Mukesh Trading Co.</span>
            </h2>
            <p className="text-xs text-slate-500 font-sans mt-2 max-w-2xl">
              Serving the industrial landscape of Gujarat and India with uncompromised engineering spares since 1975.
            </p>
          </div>

          {/* Staggered Grid Content */}
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            
            {/* Left Big Accent Column (EST. 1975) */}
            <div className="lg:col-span-5 space-y-6 bg-slate-950 text-white p-8 sm:p-10 border-l-[6px] border-[#005fa9] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#005fa9]/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center space-x-3 text-[#005fa9]">
                <Calendar className="h-5 w-5" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#4fa7eb]">A Legacy of Leadership</span>
              </div>

              <div>
                <p className="text-sm font-light text-slate-400">Established In</p>
                <p className="text-6xl font-black tracking-tight text-white font-mono mt-1">1975</p>
              </div>

              <div className="pt-6 border-t border-slate-800">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-extrabold mb-3">Our Core Pillars</p>
                <div className="space-y-4">
                  <motion.div whileHover={{ x: 6 }} className="cursor-pointer transition-colors hover:text-white">
                    <span className="text-xs font-bold text-white tracking-widest block uppercase">01. Experience</span>
                    <span className="text-[10.5px] text-slate-400 leading-relaxed font-sans block mt-0.5">Four decades of industry expertise translating deep client needs into perfect components.</span>
                  </motion.div>
                  <motion.div whileHover={{ x: 6 }} className="cursor-pointer transition-colors hover:text-white">
                    <span className="text-xs font-bold text-white tracking-widest block uppercase">02. Integrity</span>
                    <span className="text-[10.5px] text-slate-400 leading-relaxed font-sans block mt-0.5">Transparent commercial routing with direct, reliable technical specifications.</span>
                  </motion.div>
                  <motion.div whileHover={{ x: 6 }} className="cursor-pointer transition-colors hover:text-white">
                    <span className="text-xs font-bold text-white tracking-widest block uppercase">03. Reliability</span>
                    <span className="text-[10.5px] text-slate-400 leading-relaxed font-sans block mt-0.5">Continuous support ensuring flour machinery, pharmaceutical mixers and industrial plants run uninterrupted.</span>
                  </motion.div>
                </div>
              </div>

              <div className="bg-slate-900 px-4 py-3.5 border border-slate-800 text-center">
                <p className="text-xs font-bold tracking-widest text-[#3ba2ff] uppercase italic">
                  Experience. Integrity. Reliability.
                </p>
              </div>
            </div>

            {/* Right Rich Text Column */}
            <div className="lg:col-span-7 space-y-6 text-slate-700">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Four Decades of Engineering Trust</h3>
              
              <p className="text-sm leading-relaxed font-sans text-slate-600">
                Established in <strong className="text-slate-950 font-bold">1975</strong>, <span className="font-bold text-slate-950">Mukesh Trading Co.</span> has been a trusted name in industrial machine products trading for over four decades. Located in the heart of Asarwa, Ahmedabad, we have built a strong, foundational reputation for delivering exceptional quality products and highly reliable service to a diverse range of industries across Gujarat and beyond.
              </p>

              <p className="text-sm leading-relaxed font-sans text-slate-600">
                From mills and pharmaceutical companies to cement plants and large-scale manufacturing units, we understand the precise, demanding requirements of every sector we serve. Our extensive product knowledge, long-standing supplier relationships, and commitment to sourcing the exactly right components make us a dependable partner for businesses of all sizes.
              </p>

              <p className="text-sm leading-relaxed font-sans text-slate-600">
                At Mukesh Trading Co., client satisfaction is not just an ambition — it is the foundation on which we operate. Over the years, we have cultivated lasting relationships with our clients by consistently prioritizing <strong className="text-slate-950 font-bold">quality, absolute transparency, and timely delivery</strong>. Every interaction, whether a first inquiry or a multi-year account, receives the same dedicated attention.
              </p>

              {/* B2B Trust Badges Grid */}
              <div className="grid gap-4 sm:grid-cols-2 pt-4">
                
                {/* Location Badge Card */}
                <motion.div 
                  whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)", borderColor: "#005fa9" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-slate-50 border border-slate-200/60 p-5 rounded-none flex items-start space-x-3 text-left cursor-pointer transition-colors"
                >
                  <MapPin className="h-5 w-5 text-[#005fa9] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-900">Physical Access Depot</h4>
                    <p className="text-[11.5px] text-slate-500 font-sans mt-1 leading-normal">
                      G/4, Abhishek Industrial Estate, Civil Road, Asarwa, Ahmedabad — opposite Haripur Bus Stand.
                    </p>
                  </div>
                </motion.div>

                {/* Financial Settlement Card */}
                <motion.div 
                  whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)", borderColor: "#005fa9" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-slate-50 border border-slate-200/60 p-5 rounded-none flex items-start space-x-3 text-left cursor-pointer transition-colors"
                >
                  <Coins className="h-5 w-5 text-[#005fa9] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-900">Settlement Options</h4>
                    <p className="text-[11.5px] text-slate-500 font-sans mt-1 leading-normal">
                      We accept straightforward commercial payments via <strong className="text-slate-800">Cash and Cheque</strong> for smooth, friction-free transactions.
                    </p>
                  </div>
                </motion.div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* DETAILED TECHNICAL SERVICES */}
      <section className="bg-white py-20 sm:py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 block mb-1">
              Logistics & Engineering
            </span>
            <p className="mt-2 text-3xl font-light tracking-tight text-slate-950 sm:text-4xl uppercase">
              Specialist <span className="font-bold">Milling Spares Support</span>
            </p>
            <div className="mx-auto mt-4 h-px w-12 bg-slate-200" />
            <p className="mt-4 text-xs leading-relaxed text-slate-500 font-sans max-w-xl mx-auto">
              MUKESH TRADING CO. distributes premium wire netting, Swiss sifting fabrics, and milling spares. We keep high-capacity flour, rice, and seed mills operating seamlessly.
            </p>
          </div>

          {/* CORE SERVICES BENTO GRID */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-6 md:grid-cols-2">
              {valueProps.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={idx}
                    id={`service-prop-${idx}`}
                    whileHover={{ scale: 1.02, borderColor: '#005fa9', boxShadow: "0 10px 25px -5px rgba(0,0,0,0.04)" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="rounded-none border border-slate-100 bg-white p-6 flex items-start space-x-4 transition-colors text-left cursor-pointer"
                  >
                    <div className="flex-shrink-0 rounded-none bg-slate-50 border border-slate-150 p-3 text-slate-900">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950">{item.title}</h3>
                      <p className="mt-2 text-xs text-slate-500 leading-relaxed font-sans">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* PARTNERSHIP WORKFLOW PROCESS */}
          <div className="mx-auto mt-24 max-w-5xl rounded-none bg-slate-950 text-white p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.02),transparent_50%)]" />

            <div className="relative z-10 text-center md:text-left md:flex md:items-center md:justify-between border-b border-slate-800 pb-8 mb-8">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">How It Works</span>
                <h3 className="mt-1 text-2xl font-light uppercase tracking-wide text-slate-100">
                  Dealer <span className="font-bold">Onboarding Sequence</span>
                </h3>
              </div>
              <motion.button
                id="dealer-form-scroll-trigger"
                onClick={onDealerFormFocus}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 md:mt-0 text-[10px] uppercase tracking-widest font-bold bg-[#005fa9] hover:bg-[#004d8a] text-white px-6 py-4 rounded-none flex items-center justify-center space-x-1 cursor-pointer transition-colors"
              >
                <span>Apply for Dealership Now</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </motion.button>
            </div>

            <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, idx) => (
                <motion.div 
                  key={idx} 
                  className="text-left relative cursor-pointer" 
                  id={`step-card-${idx}`}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-4xl font-light text-slate-800 font-mono tracking-tighter leading-none block">
                    {s.num}
                  </span>
                  <h4 className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-100">{s.title}</h4>
                  <p className="mt-1.5 text-xs text-slate-400 leading-relaxed font-sans">{s.desc}</p>
                  {idx < 3 && (
                    <div className="hidden lg:block absolute top-4 right-[-12px] text-slate-800 font-bold text-lg select-none">
                      &rarr;
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* PHYSICAL CONTACT INFORMATION & DEPOTS */}
          <div className="mx-auto mt-24 max-w-5xl rounded-none border border-slate-100 bg-white p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left divide-y md:divide-y-0 md:divide-x divide-slate-100">
              
              <div className="pt-4 md:pt-0 md:pr-4" id="depot-info-box">
                <span className="flex items-center text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-2">
                  <Navigation className="h-4 w-4 text-slate-900 mr-2" />
                  Head Office Depot & Godown
                </span>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-950 mt-1">MUKESH TRADING CO.</p>
                <p className="text-xs text-slate-900 mt-1.5 leading-relaxed font-sans font-medium">
                  G-4, Abhishak Industrial Estate,<br />
                  Opp. Haripura Bus Stand, Civil Road,<br />
                  Asarwa, Ahmedabad
                </p>
                <p className="text-[11px] text-slate-500 mt-2 font-sans border-t border-slate-100 pt-2" lang="gu">
                  ગોડાઉન : જી-૪, અભિષેક ઈન્ડસ્ટ્રીયલ એસ્ટેટ, હરિપુરા બસ સ્ટેન્ડ સામે, સિવિલ રોડ, અસારવા, અમદાવાદ.
                </p>
                <div className="mt-3">
                  <a 
                    href="https://maps.google.com/?q=MUKESH+TRADING+CO.+Abhishek+Industrial+Estate+Asarwa+Ahmedabad+Gujarat+380016"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-[10px] font-extrabold uppercase tracking-widest text-[#005fa9] hover:text-[#004d8a] transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="pt-6 md:pt-0 md:px-6" id="comms-info-box">
                <span className="flex items-center text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-2">
                  <PhoneCall className="h-4 w-4 text-slate-900 mr-2" />
                  Trading Hotlines
                </span>
                <p className="text-xs font-bold text-slate-950 mt-1">Direct Procurement Panel:</p>
                <div className="text-xs font-bold text-slate-900 mt-1 select-all font-mono space-y-1">
                  <a href="tel:+919879211012" className="block hover:underline hover:text-[#005fa9]">+91 98792 11012</a>
                  <a href="tel:+919429356522" className="block hover:underline hover:text-[#005fa9]">+91 94293 56522</a>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 font-mono">Mon - Sat: 09:00 to 19:00 (IST)</p>
              </div>

              <div className="pt-6 md:pt-0 md:pl-6" id="sales-channels-box">
                <span className="flex items-center text-[10px] font-bold text-[#005fa9] uppercase tracking-wider mb-2">
                  <Mail className="h-4 w-4 text-[#005fa9] mr-2" />
                  Corporate Enquiries
                </span>
                <p className="text-xs font-bold text-slate-950 mt-1">Bulk Sales & Dealerships:</p>
                <p className="text-xs mt-1 select-all font-mono">
                  <a href="mailto:mukeshtradingco16@gmail.com" className="text-slate-900 hover:text-[#005fa9] font-bold hover:underline">
                    mukeshtradingco16@gmail.com
                  </a>
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
