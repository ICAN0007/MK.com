import { Product } from '../types';

export const TRADING_CATEGORIES = [
  'All Categories',
  'Thresher Parts',
  'Balt',
  'Belt Lacing Clip',
  'Bucket Bolt',
  'Elevator Bucket',
  'Conveyor Belt Fastener',
  'KKK Bearing',
  'Pillow Block Bearing',
  'Patta Bolt',
  'Perforated Sheets',
  'Spring Steel',
  'SS Wire Mesh',
  'Candle Filter & Extruder Screens'
];

export const WHOLESALE_PRODUCTS: Product[] = [
  {
    id: 'mtc-th-rh-01',
    name: 'Premium Heavy-Duty Thresher Screen (Round Hole)',
    sku: 'MTC-TH-RH-01',
    category: 'Thresher Parts',
    description: 'Specially engineered round-hole perforated screen sheets for crop cleaning and threshing machinery. Fabricated from high-tensile wear-resistant carbon steel, optimized to handle high-RPM threshing drums. Provides clean crop separation with minimal waste and maximum throughput rate.',
    basePrice: 0,
    moq: 1,
    unit: 'Sheet',
    image: 'https://i.ibb.co/bjvCTwfx/thresher-parts.jpg',
    packaging: 'Protected heavy bundles of 5',
    weight: '15.0 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Material Suitability', value: 'High-Tensile Carbon Steel Sheet' },
      { label: 'Aperture Range (Round)', value: '4.0 mm - 12.0 mm (Fully Customizable)' },
      { label: 'Sheet Thickness', value: '2.5 mm Heavy Duty Gauge' },
      { label: 'Standard Dimensions', value: '4ft x 3ft (Fits Most Commercial Threshers)' },
      { label: 'Crop Application', value: 'Wheat, Paddy, Barley, Corn & Maize' }
    ],
    tiers: []
  },
  {
    id: 'mtc-th-cg-02',
    name: 'Agricultural Thresher Concave Grate Screen',
    sku: 'MTC-TH-CG-02',
    category: 'Thresher Parts',
    description: 'Heavy robust concaves designed for challenging threshing and sifting drums. Built with deep-set capsule slotted hole patterns for excellent filtering control, grain segregation, and flawless crop sliding handling. Anti-choke structure prevents crop dampness from blockading the flow.',
    basePrice: 0,
    moq: 1,
    unit: 'Sheet',
    image: 'https://i.ibb.co/N6S2TDp3/thresher-parts-20260415082808813.webp',
    packaging: 'Industrial timber-pallatized wraps',
    weight: '22.5 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Material Suitability', value: 'Forged Structural Mild Steel with Hardened Outer Edge' },
      { label: 'Perforation Pattern', value: 'Bridge / Capsule Slots (Staggered Arrangement)' },
      { label: 'Sheet Thickness', value: '3.2 mm Extra Strength Plate' },
      { label: 'Standard Dimensions', value: '3.5ft x 2.5ft Pre-curved Flat Adaptable Grid' },
      { label: 'Crop Application', value: 'Soybeans, Groundnut/Peanut, Pulses & Mustard Seeds' }
    ],
    tiers: []
  },
  {
    id: 'mtc-th-ms-03',
    name: 'Precision Multi-Crop Thresher Sieve Assembly',
    sku: 'MTC-TH-MS-03',
    category: 'Thresher Parts',
    description: 'Premium double-reinforced sieve segment equipped with electrostatic anti-corrosion industrial coating. Offers high sifting efficiency through balanced layout patterns. Extremely rigid, standard replacement frame designed to optimize separator speed.',
    basePrice: 0,
    moq: 1,
    unit: 'Sheet',
    image: 'https://i.ibb.co/svYC0Vks/Thresher-Parts-Manufacturer.jpg',
    packaging: '10 units per reinforced wooden box',
    weight: '11.0 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Material Suitability', value: 'Pre-Galvanized Premium Steel Plate' },
      { label: 'Finished Surface', value: 'Electrostatic Heat-Cured Red Powder Coating' },
      { label: 'Aperture Layout', value: 'Staggered Oval & Oblong Stamp Holes' },
      { label: 'Sheet Thickness', value: '1.8 mm Premium Precision Gauge' },
      { label: 'Crop Application', value: 'Millet, Sorghum, Sunflower, Sesame & Canola' }
    ],
    tiers: []
  },
  
  // CONVEYOR BELTS
  {
    id: 'mtc-bl-cv-01',
    name: 'Heavy-Duty Flat Rubber Conveyor Belt',
    sku: 'MTC-BL-CV-01',
    category: 'Balt',
    subType: 'Conveyor Belt',
    description: 'Premium heavy-duty flat rubber conveyor belt designed for bulk material handling and milling operations. Built with multiple high-strength fabric plies and premium quality rubber compounds to resist abrasion, impact, and heat. Designed to withstand continuous high load and severe tension requirements.',
    basePrice: 0,
    moq: 1,
    unit: 'Meter',
    image: 'https://i.ibb.co/XxqbJyn5/01.jpg',
    packaging: 'Coiled rolls on heavy timber cores',
    weight: '4.8 kg / meter',
    isAvailable: true,
    specifications: [
      { label: 'Material Suitability', value: 'Grade-M Wear Resistant Vulcanized Rubber' },
      { label: 'Reinforcement', value: 'EP-200 Polyester-Nylon Plies (3-Ply / 4-Ply)' },
      { label: 'Top Cover Thickness', value: '4.0 mm Heavy Cover' },
      { label: 'Bottom Cover Thickness', value: '2.0 mm Standard Cover' },
      { label: 'Belt Width Range', value: '300 mm to 1200 mm custom-slit widths' }
    ],
    tiers: []
  },
  {
    id: 'mtc-bl-cv-02',
    name: 'Industrial Chevron Profile Conveyor Belt',
    sku: 'MTC-BL-CV-02',
    category: 'Balt',
    subType: 'Conveyor Belt',
    description: 'Superb cleated Chevron conveyor belt carefully developed for steep inclined transport. The integral moulded V-shaped cleat pattern prevents material back-slip, securing stable transport of grains, seeds, fertilizer, and sand at angles of 20° to 45° with full physical reliability.',
    basePrice: 0,
    moq: 1,
    unit: 'Meter',
    image: 'https://i.ibb.co/7xZrLss0/chevron-Conveyor-Belt.webp',
    packaging: 'Export grade heavy wrapping protection',
    weight: '6.2 kg / meter',
    isAvailable: true,
    specifications: [
      { label: 'Cleat Profile Shape', value: 'V-Groove Chevron (Open / Closed)' },
      { label: 'Cleat Height', value: '15 mm High Moulded Cleats' },
      { label: 'Maximum Inclination', value: 'Up to 40 Degrees' },
      { label: 'Base Belt Type', value: 'High-Tensile EP fabric core structure' },
      { label: 'Operating Condition', value: 'Heavy dust / Agro-industry processing' }
    ],
    tiers: []
  },
  {
    id: 'mtc-bl-cv-03',
    name: 'Industrial Fabric Reinforced Conveyor Belt',
    sku: 'MTC-BL-CV-03',
    category: 'Balt',
    subType: 'Conveyor Belt',
    description: 'Tough, multi-ply textile reinforced conveyor belt for general purpose distribution. Excellent dimensional stability, anti-static safety ratings, and superb tracking. Ideally suited for seed packaging plants, food processors, and multi-handling industrial warehouse automation.',
    basePrice: 0,
    moq: 1,
    unit: 'Meter',
    image: 'https://i.ibb.co/KzsY9TTc/images.jpg',
    packaging: 'Protected wrapped rolls',
    weight: '3.5 kg / meter',
    isAvailable: true,
    specifications: [
      { label: 'Carcass Fabric Type', value: 'NN (Nylon-Nylon) / EP Interwoven' },
      { label: 'Anti-Static Properties', value: 'Surface resistance meets ISO-284 standards' },
      { label: 'Tensile Strength', value: 'MTC-N150 (800 N/mm)' },
      { label: 'Standard Widths', value: '18 inches, 24 inches, 30 inches, 36 inches' },
      { label: 'Operating Temp', value: '-20°C to +80°C stable operations' }
    ],
    tiers: []
  },

  // COTTON BELTS
  {
    id: 'mtc-bl-ct-01',
    name: 'Pure Solid Woven Cotton Elevator Belt',
    sku: 'MTC-BL-CT-01',
    category: 'Balt',
    subType: 'Cotton',
    description: 'Premium quality solid woven cotton elevator belt. Manufactured from long-staple cotton fibers intertwined using high-density loom configurations. Ideal for agricultural vertical transportation and bucket elevators handling delicate seeds and white oil seeds where oil and grease resistance is required naturally.',
    basePrice: 0,
    moq: 1,
    unit: 'Meter',
    image: 'https://i.ibb.co/h17cJwM3/20201025-093313-600x800-1.jpg',
    packaging: 'Moisture-proof sealed rolls',
    weight: '2.1 kg / meter',
    isAvailable: true,
    specifications: [
      { label: 'Composition', value: '100% Pure Natural Long-Staple Cotton' },
      { label: 'Weaving Structure', value: 'Solid Multi-Ply Interlocking Weave (Multiple Thicks)' },
      { label: 'Fabric Density', value: 'Dense Heavy Duty Canvas' },
      { label: 'Bolt Holding Strength', value: 'Highly Reinforced Edge Structure (Anti-Fray)' },
      { label: 'Best Suited For', value: 'Vertical Rice Milling, Flour, Grain Silos, Pulses' }
    ],
    tiers: []
  },
  {
    id: 'mtc-bl-ct-02',
    name: 'White Cotton Feed & Conveyor Belt',
    sku: 'MTC-BL-CT-02',
    category: 'Balt',
    subType: 'Cotton',
    description: 'Clean, oil-absorbing white cotton feed belt designed for horizontal distribution in process machinery. Ideal for dry flour handling, hot parboiled rice, and processing lines where synthetic smell or chemical static is strictly barred. Breathable structure allows heat venting.',
    basePrice: 0,
    moq: 1,
    unit: 'Meter',
    image: 'https://i.ibb.co/39Zr3zBD/white-cotton-belt-conveyor-be-20240417052100724.jpg',
    packaging: 'Food-safe plastic wrappers',
    weight: '1.8 kg / meter',
    isAvailable: true,
    specifications: [
      { label: 'Material Suitability', value: 'Food-Grade Spun Woven Pure Cotton' },
      { label: 'Thickness Option', value: '4 mm / 6 mm / 8 mm Standard Gauges' },
      { label: 'Breathability Level', value: 'Excellent Vapor Venting Core' },
      { label: 'Anti-Static Rating', value: 'Naturally Static-Free' }
    ],
    tiers: []
  },

  // COTTON-NYLON BELTS
  {
    id: 'mtc-bl-cn-01',
    name: 'Cotton-Nylon Conveyor Belt for Rice Mill',
    sku: 'MTC-BL-CN-01',
    category: 'Balt',
    subType: 'Cotton-Nylon',
    description: 'Specially engineered compound Cotton-Nylon conveyor belt tailored for rice milling machinery. Seamlessly blends the natural moisture absorbing properties of fine cotton with the superior tensile strength, flexibility, and elongation resistance of nylon threads. Highly stretch-resistant.',
    basePrice: 0,
    moq: 1,
    unit: 'Meter',
    image: 'https://i.ibb.co/chXDQcdB/cotton-conveyor-belt-for-rice-mill-machine.jpg',
    packaging: 'Sealed heavy-duty polypropylene rolls',
    weight: '2.9 kg / meter',
    isAvailable: true,
    specifications: [
      { label: 'Fabric Composition', value: '65% Premium Cotton Outer - 35% Nylon Core thread' },
      { label: 'Application Suitability', value: 'Rice Polishing, Grading, and Sorting Conveyors' },
      { label: 'Friction Coefficient', value: 'High grip surface preventing grain slippage' },
      { label: 'Belt Ply', value: 'Integrated multi-ply matrix' }
    ],
    tiers: []
  },
  {
    id: 'mtc-bl-cn-02',
    name: 'Heavy-Duty Cotton-Nylon Transmission Belt',
    sku: 'MTC-BL-CN-02',
    category: 'Balt',
    subType: 'Cotton-Nylon',
    description: 'High-strength joint-less cotton-nylon composite belt crafted for main drives and heavy high-friction elevator pulleys. Exhibits minimal stretching under load with excellent flexibility for high-RPM and small diameter drives.',
    basePrice: 0,
    moq: 1,
    unit: 'Meter',
    image: 'https://i.ibb.co/93p1qbgM/Cotton-Nylon-Belts.jpg',
    packaging: 'Wrapped secure bundles',
    weight: '3.1 kg / meter',
    isAvailable: true,
    specifications: [
      { label: 'Tensile Core', value: 'Nylon Cord Matrix (High Elongation Resistance)' },
      { label: 'Outer Friction Layer', value: 'Woven Cotton Canvas Coat' },
      { label: 'Maximum Velocity', value: '45 m/s' },
      { label: 'Stretch Rating', value: 'Less than 1.2% under full mill load' }
    ],
    tiers: []
  },

  // NYLON BELTS
  {
    id: 'mtc-bl-ny-01',
    name: 'High-Tensile Nylon Sandwich Transmission Belt',
    sku: 'MTC-BL-NY-01',
    category: 'Balt',
    subType: 'Nylon',
    description: 'High-speed flat nylon transmission sandwich belt. Built with an extremely durable oriented polyamide sheet core providing superior tensile strength, laminated on both sides with high-friction nitrile rubber. Maximizes energy transfer coefficients, reducing mill utility costs.',
    basePrice: 0,
    moq: 1,
    unit: 'Meter',
    image: 'https://i.ibb.co/RG4zm1KP/images-1.jpg',
    packaging: 'Anti-static protective coils',
    weight: '2.4 kg / meter',
    isAvailable: true,
    specifications: [
      { label: 'Core Polyamide Film', value: 'Extruded Oriented Nylon sheet' },
      { label: 'Surface Coating', value: 'Nitrile (NBR) High-Coefficient Friction Rubber' },
      { label: 'Thickness Range', value: '1.5 mm to 4.5 mm custom-engineered sheets' },
      { label: 'Power Transmission Rate', value: '98.5% Efficiency' }
    ],
    tiers: []
  },
  {
    id: 'mtc-bl-ny-02',
    name: 'Premium Nylon Bucket Elevator Belt',
    sku: 'MTC-BL-NY-02',
    category: 'Balt',
    subType: 'Nylon',
    description: 'Pure synthetic, high-performance nylon carcass elevator belt designed for mounting steel or polymer buckets. Extremely rigid transverse stiffness prevents belt sagging/waviness, which maintains absolute bucket alignment even at maximum elevation speeds.',
    basePrice: 0,
    moq: 1,
    unit: 'Meter',
    image: 'https://i.ibb.co/hxVdXYDC/nylon-bucket-elevator-belts.jpg',
    packaging: 'Reinforced timber core drum rolls',
    weight: '3.6 kg / meter',
    isAvailable: true,
    specifications: [
      { label: 'Highlight/Feature', value: 'High Tenacity Multi-Ply Textile Carcass' },
      { label: 'Tensile Fabric Plies', value: 'Type-NN 200 Heavy Duty Nylon Canvas' },
      { label: 'Transverse Stiffness', value: 'Excellent rigidity for secure bucket mounting' },
      { label: 'Bolt Pullout Resistance', value: 'Max-Force Reinforced matrix' },
      { label: 'Cover Quality', value: 'Super abrasion resistant rubber outer skins' }
    ],
    tiers: []
  },

  // PVC BELTS
  {
    id: 'mtc-bl-pv-01',
    name: 'Green Food-Grade PVC Conveyor Belt',
    sku: 'MTC-BL-PV-01',
    category: 'Balt',
    subType: 'PVC Belt',
    description: 'Premium light-green industrial PVC conveyor belt. Water-resistant, oil-resistant, and acid-resistant thermoplastic PVC layers. Outstanding dimensional stability, low stretch, quiet operation, and non-marking attributes makes it ideal for direct food-grain sifting and packaging lines.',
    basePrice: 0,
    moq: 1,
    unit: 'Meter',
    image: 'https://i.ibb.co/DgmQcb9v/whatsapp-image-2025-03-22-at-1-35-59-pm-500x500.webp',
    packaging: 'Moisture resistant clear wraps',
    weight: '2.2 kg / meter',
    isAvailable: true,
    specifications: [
      { label: 'Top Surface', value: 'Smooth Oil-Resistant PVC' },
      { label: 'Bottom Surface', value: 'Low-Noise Interwoven Fabric Back' },
      { label: 'Belt Thickness', value: '2.0 mm / 3.0 mm Multi-Ply' },
      { label: 'Minimum Pulley Diam.', value: '40 mm (Super flexible)' }
    ],
    tiers: []
  },

  // SYNTHETIC ELEVATOR BELTS
  {
    id: 'mtc-bl-sy-01',
    name: 'Duraflex White Synthetic Elevator Belt',
    sku: 'MTC-BL-SY-01',
    category: 'Balt',
    subType: 'Synthetic Elevator Belt',
    description: 'Original high-grade Duraflex white synthetic elevator belt. Engineered with a multi-ply polyester/nylon fabric core and synthetic covers to provide minimal elongation and excellent tracking. Odorless and non-contaminating, designed to protect raw milling streams.',
    basePrice: 0,
    moq: 1,
    unit: 'Meter',
    image: 'https://i.ibb.co/4RF77J0m/Duraflex-White-Synthetic-Belts-For-Elevator-Rice-Mill-Kart-2677265.webp',
    packaging: 'Wrapped core-stabilized pallets',
    weight: '3.3 kg / meter',
    isAvailable: true,
    specifications: [
      { label: 'Core Construction', value: 'Polyester-Polyamide (Woven EP Fabric Multi-Ply)' },
      { label: 'Synthetic Compound', value: 'High-Grade White FDA Nitrile (Food-Grade)' },
      { label: 'Anti-Static Rating', value: 'Fully Anti-Static (ISO Certified)' },
      { label: 'Target Applications', value: 'Rice milling, Flour milling feed lines, Seed sorting' }
    ],
    tiers: []
  },
  {
    id: 'mtc-bl-sy-02',
    name: 'White Synthetic Grain Elevator Belt',
    sku: 'MTC-BL-SY-02',
    category: 'Balt',
    subType: 'Synthetic Elevator Belt',
    description: 'Durable white synthetic compilation elevator belt. Highly resistant to grain oils, cooking greases, animal fats, and light chemicals. Designed for safe, efficient heavy-volume vertical grain processing systems.',
    basePrice: 0,
    moq: 1,
    unit: 'Meter',
    image: 'https://i.ibb.co/TBSWskH2/synthetic-elevator-belt-1000x1000.webp',
    packaging: 'Duct-wrapped core rolls',
    weight: '3.0 kg / meter',
    isAvailable: true,
    specifications: [
      { label: 'Tensile Core', value: 'EP Multi-Plies' },
      { label: 'Outer Layer Colour', value: 'Pure White (Safe/Sanitary Handling)' },
      { label: 'Elongation under load', value: 'Extremely Low Peak Elongation' },
      { label: 'Usage Fields', value: 'Agricultural Elevators, Feed silos, Wheat processing' }
    ],
    tiers: []
  },
  {
    id: 'mtc-bl-sy-03',
    name: 'Superior Food-Grade Synthetic Elevator Belt',
    sku: 'MTC-BL-SY-03',
    category: 'Balt',
    subType: 'Synthetic Elevator Belt',
    description: 'Supreme hygienic synthetic lift belt built using premium synthetic rubbers. The clean non-fading surface ensures product purity during seed elevators, powder sifting, and spices handling, meeting rigorous global health indices.',
    basePrice: 0,
    moq: 1,
    unit: 'Meter',
    image: 'https://i.ibb.co/s9Qb1g1s/Synthetic-White-Elevator-Belt.jpg',
    packaging: 'Wooden core export rolls',
    weight: '3.2 kg / meter',
    isAvailable: true,
    specifications: [
      { label: 'Material Quality', value: 'FDA-Grade Pure White Synthetic Rubber Elastomer' },
      { label: 'Belt Widths', value: '6 inches to 16 inches custom configurations' },
      { label: 'Carcass Ply Structural', value: '100% synthetic continuous yarns' },
      { label: 'Temperature Threshold', value: 'Steady up to 100°C' }
    ],
    tiers: []
  },

  // V-BELTS
  {
    id: 'mtc-bl-vb-01',
    name: 'Heavy-Duty Classic V-Belt',
    sku: 'MTC-BL-VB-01',
    category: 'Balt',
    subType: 'V Balt',
    description: 'High-power classic wrapping V-belt designed for high load transmission drives. Features premium heat-resistant cured rubber covers and extra-tough polyester strength cords. Provides perfect grip and minimum slippage in heavy crop sifting and threshing machinery drives.',
    basePrice: 0,
    moq: 1,
    unit: 'Piece',
    image: 'https://i.ibb.co/RkTVrTNt/download.jpg',
    packaging: 'Industrial banded box bundles',
    weight: '0.4 kg / piece',
    isAvailable: true,
    specifications: [
      { label: 'Type Group', value: 'Classic Wrapped V-Belt (Sections A, B, C, D, E)' },
      { label: 'Reinforcement Cord', value: 'High-Modulus Polyester Tension Cords' },
      { label: 'Compound Blend', value: 'Chloroprene (CR) with anti-heat friction additives' },
      { label: 'Anti-Static Rating', value: 'Fully Meets ISO 1813 specs' }
    ],
    tiers: []
  },
  {
    id: 'mtc-bl-vb-02',
    name: 'Cogged Raw Edge Industrial V-Belt',
    sku: 'MTC-BL-VB-02',
    category: 'Balt',
    subType: 'V Balt',
    description: 'Precision cogged raw edge industrial V-belt with moulded notches. Underneath cogs reduce bending stress on smaller pulleys, allowing maximum heat dissipation and longer lifespan on power-intensive flour milling and thresher machinery systems.',
    basePrice: 0,
    moq: 1,
    unit: 'Piece',
    image: 'https://i.ibb.co/Fbhd8NXL/images.jpg',
    packaging: 'Banded sets of 10 items',
    weight: '0.35 kg / piece',
    isAvailable: true,
    specifications: [
      { label: 'Core Structure', value: 'Moulded Notch Cogged Raw Edge (Group AX, BX, CX)' },
      { label: 'Bending Flexibility', value: 'Superior (Allows high speed over smaller pulleys)' },
      { label: 'Mechanical Wear Resistance', value: 'Extremely High' },
      { label: 'Energy Conservation Metric', value: 'Saves up to 3% electrical cost over classic belts' }
    ],
    tiers: []
  },
  
  // BELT LACING CLIPS
  {
    id: 'mtc-bl-lc-01',
    name: 'Premium Alloy Steel Conveyor Belt Lacing Clip',
    sku: 'MTC-BL-LC-01',
    category: 'Belt Lacing Clip',
    description: 'High-durability metal lacing fasteners engineered for rapid, strong joints on agricultural and milling belts. Specially formed teeth grip structural fibers securely without reducing belt integrity, offering a perfectly low-profile, smooth-running transition over pulley edges.',
    basePrice: 0,
    moq: 1,
    unit: 'Box',
    image: 'https://i.ibb.co/Wv96WPXt/Conveyor-Steel-Belt-Lacing.jpg',
    packaging: 'Heavily packed timber boxes',
    weight: '1.2 kg / box',
    isAvailable: true,
    specifications: [
      { label: 'Material Quality', value: 'Tempered Carbon Steel or Galvanized Plated Sheet' },
      { label: 'Compatible Belt Thickness', value: '3.0 mm - 8.0 mm wide belt configurations' },
      { label: 'Fastener Type', value: 'Integral Staple Plate Design' },
      { label: 'Joint Performance', value: 'Near-zero profile slippage with maximum physical latching' }
    ],
    tiers: []
  },
  {
    id: 'mtc-bl-lc-02',
    name: 'Heavy-Duty Hinged Industrial Belt Fastener Clips',
    sku: 'MTC-BL-LC-02',
    category: 'Belt Lacing Clip',
    description: 'Segmented steel fastener series offering reliable joint pull-out resistance. Perfectly suited for high-tension grains elevator belts and parboiled flour conveyors needing on-site maintenance or adjustments.',
    basePrice: 0,
    moq: 1,
    unit: 'Box',
    image: 'https://i.ibb.co/bggW1yW5/hqdefault.jpg',
    packaging: 'Industrial banded box cartons',
    weight: '1.5 kg / box',
    isAvailable: true,
    specifications: [
      { label: 'Core Composition', value: 'Wear-resistant structural steel alloy' },
      { label: 'Connecting Pin Type', value: 'Corrosion-Resistant Nylon Covered Core Wire' },
      { label: 'Application Field', value: 'Continuous conveyor splicing and elevator belts repair' }
    ],
    tiers: []
  },
  {
    id: 'mtc-bl-lc-03',
    name: 'High-Tensile Wire Hook Belt Lacing Fasteners',
    sku: 'MTC-BL-LC-03',
    category: 'Belt Lacing Clip',
    description: 'Precision manufactured wire hooks designed with double staggered grip points for high flexibility. Minimizes noise and wear on drive components during continuous grain operations.',
    basePrice: 0,
    moq: 1,
    unit: 'Box',
    image: 'https://i.ibb.co/Z117cm4p/images-1.jpg',
    packaging: 'Sealed heavy-duty individual cartons',
    weight: '0.90 kg / box',
    isAvailable: true,
    specifications: [
      { label: 'Style Layout', value: 'Staggered Carded Wire Hooks' },
      { label: 'Bending Resilience', value: 'Excellent loop life on tiny conveyor pulleys' },
      { label: 'Friction Performance', value: 'Extremely silent operation' }
    ],
    tiers: []
  },
  
  // BUCKET BOLTS
  {
    id: 'mtc-bb-fb-01',
    name: 'Premium Fang-Style Elevator Bucket Bolt',
    sku: 'MTC-BB-FB-01',
    category: 'Bucket Bolt',
    description: 'High-strength fang-style elevator bucket bolts, engineered with specialized dual fangs on the head flat side. Outstanding performance in preventing bolt rotation during tightening or operation, safeguarding pristine conveyor belts from tearing.',
    basePrice: 0,
    moq: 100,
    unit: 'Piece',
    image: 'https://i.ibb.co/vxc5gn87/1.jpg',
    packaging: 'Industrial reinforced boxes of 100 sets',
    weight: '2.4 kg / 100 pcs',
    isAvailable: true,
    specifications: [
      { label: 'Material Suitability', value: 'Grade 5 Carbon Steel, Clear Zinc Plating' },
      { label: 'Head Structure', value: 'Flat Countersunk with Anti-Spin Dual Fangs' },
      { label: 'Available Sizes', value: '5/16" x 1", 5/16" x 1-1/4", M8 x 25mm, M8 x 30mm' },
      { label: 'Included Accessories', value: 'Matching Hex Nut, Large Flat Fender Washer & Split Lock Washer' },
      { label: 'Application Suitability', value: 'Agricultural lift buckets, deep industrial scoop elevator belts' }
    ],
    tiers: []
  },
  {
    id: 'mtc-bb-nw-02',
    name: 'Industrial Norway Flat-Head Bucket Bolt',
    sku: 'MTC-BB-NW-02',
    category: 'Bucket Bolt',
    description: 'Traditional Norway-style large flat counter-sunk head bucket bolts. Extremely low clearance profile minimizes friction during transition runs on pulleys, ensuring clean and quiet bucket distribution along seed & dust conveyors.',
    basePrice: 0,
    moq: 100,
    unit: 'Piece',
    image: 'https://i.ibb.co/ymNBDqd7/bolt-cut-out-overview.jpg',
    packaging: 'Export graded heavy-duty cartons',
    weight: '2.1 kg / 100 pcs',
    isAvailable: true,
    specifications: [
      { label: 'Design Origin Style', value: 'Norway Standard Flat-Head (Low-Profile Clearance)' },
      { label: 'Surface Guard Coating', value: 'Electro-galvanized zinc passivated' },
      { label: 'Standard Threading', value: 'M6 / M8 / M10 high precision coarse thread pitch' },
      { label: 'Mechanical Strength', value: 'Class 8.8 High Strength structural rating' }
    ],
    tiers: []
  },
  {
    id: 'mtc-bb-sn-03',
    name: 'Heavy-Duty Square Neck Elevator Bucket Bolt',
    sku: 'MTC-BB-SN-03',
    category: 'Bucket Bolt',
    description: 'Robust square-neck bucket bolts built for heavy polymeric or steel elevator scoops. The precise square shoulder fits perfectly into bucket mounting slots, preventing spinning and ensuring simple single-wrench installation.',
    basePrice: 0,
    moq: 100,
    unit: 'Piece',
    image: 'https://i.ibb.co/ZshppVY/images.jpg',
    packaging: 'Protected sealed individual packets',
    weight: '2.8 kg / 100 pcs',
    isAvailable: true,
    specifications: [
      { label: 'Material Suitability', value: 'Zinc-Chromate Yellow Passivated Alloy Steel' },
      { label: 'Bolt Style Layout', value: 'Round Dome Head with Square Locking Shoulder' },
      { label: 'Thread Pitch Size', value: 'Unified Coarse (UNC) heavy-duty specifications' },
      { label: 'Recommended Use', value: 'High weight elevator buckets, fertilizer handling lift conveyors' }
    ],
    tiers: []
  },

  // ELEVATOR BUCKETS - MS (MILD STEEL)
  {
    id: 'mtc-bk-ms-01',
    name: 'Premium Pressed Mild Steel (MS) Elevator Bucket',
    sku: 'MTC-BK-MS-01',
    category: 'Elevator Bucket',
    subType: 'MS Bucket',
    description: 'High-durability mild steel (MS) elevator bucket, cold-pressed with seamless drawing technology. Engineered for rugged grain elevators and heavy industrial material handling. Features reinforced lips and optimized depth for efficient loading and clean discharge.',
    basePrice: 0,
    moq: 10,
    unit: 'Piece',
    image: 'https://i.ibb.co/spqxhPN5/ms-elevator-bucket.jpg',
    packaging: 'Standard bundled stacks inside crate packaging',
    weight: '1.2 kg',
    isAvailable: true,
    specifications: [
      { label: 'Material Composition', value: 'Grade A Hardened Mild Steel (MS)' },
      { label: 'Manufacturing Process', value: 'Seamless deep-drawn pressed steel' },
      { label: 'Outer Finish', value: 'Anti-rust corrosion-resistant oiled coating' },
      { label: 'Available Sizes', value: '6" x 4", 8" x 5", 10" x 6", 12" x 7"' },
      { label: 'Recommended Use', value: 'Grains, seed, dust extraction, parboiled paddy, and aggregates' }
    ],
    tiers: []
  },
  {
    id: 'mtc-bk-ms-02',
    name: 'Heavy-Duty Welded MS Elevator Scoop Bucket',
    sku: 'MTC-BK-MS-02',
    category: 'Elevator Bucket',
    subType: 'MS Bucket',
    description: 'Custom-designed fabricated mild steel elevator bucket with heavy-gauge welded walls. Offers high capacity, extreme physical impact resistance, and extra rigid backplates for high speed mills.',
    basePrice: 0,
    moq: 10,
    unit: 'Piece',
    image: 'https://i.ibb.co/1YHkJjpd/product-jpeg-500x500.webp',
    packaging: 'Heavy banded palettes for export',
    weight: '1.8 kg',
    isAvailable: true,
    specifications: [
      { label: 'Manufacturing Process', value: 'Precision welded extra-stiff steel plates' },
      { label: 'Thickness Range', value: '2.0 mm to 4.0 mm structural backplate' },
      { label: 'Wear Guards', value: 'Dual-lip reinforcement strips' }
    ],
    tiers: []
  },
  {
    id: 'mtc-bk-ms-03',
    name: 'Seamless High-Capacity MS Elevator Bucket',
    sku: 'MTC-BK-MS-03',
    category: 'Elevator Bucket',
    subType: 'MS Bucket',
    description: 'Pressed carbon steel bucket engineered perfectly for maximum payload transfer. High back wall height enables quick bucket discharge with minimal product retention or dust clouding.',
    basePrice: 0,
    moq: 10,
    unit: 'Piece',
    image: 'https://i.ibb.co/V09pmjsJ/1671810444.jpg',
    packaging: 'Standard heavy nested bundles',
    weight: '1.45 kg',
    isAvailable: true,
    specifications: [
      { label: 'Design Profile', value: 'High Capacity Deep Scoop Layout' },
      { label: 'Tension Resistance', value: 'Superb durability under maximum vertical load speeds' },
      { label: 'Mounting Style', value: 'Standard backplate punch holes default' }
    ],
    tiers: []
  },

  // ELEVATOR BUCKETS - PVC
  {
    id: 'mtc-bk-pvc-01',
    name: 'Premium PVC High-Density Polymeric Elevator Bucket',
    sku: 'MTC-BK-PVC-01',
    category: 'Elevator Bucket',
    subType: 'PVC Bucket',
    description: 'Lightweight and resilient plastic elevator bucket constructed from premium food-grade high-density polyethylene/polymeric compounds. Features thick wear-resistant lips and dynamic inner taper to prevent product sticking, providing smooth bulk conveying without damaging delicate grains.',
    basePrice: 0,
    moq: 10,
    unit: 'Piece',
    image: 'https://i.ibb.co/qLB1hbYF/Cangilones-VERCAN-de-Poliamida-01-scaled.jpg',
    packaging: 'Carton boxing nested protective storage',
    weight: '0.35 kg',
    isAvailable: true,
    specifications: [
      { label: 'Material Composition', value: 'Food-Grade High-Density Virgin Polyurethanes / PVC' },
      { label: 'Weight Reduction Advantage', value: 'Up to 80% lighter than standard iron buckets' },
      { label: 'Temperature Threshold', value: '-40°C to +80°C continuous continuous operations' },
      { label: 'Certification Standard', value: 'FDA food contact compliant & static-dissipative' },
      { label: 'Operational Speed', value: 'Highly suitable for fast high-speed sorting belts' }
    ],
    tiers: []
  },
  {
    id: 'mtc-bk-pvc-02',
    name: 'Food-Grade Lightweight PVC Elevator Bucket',
    sku: 'MTC-BK-PVC-02',
    category: 'Elevator Bucket',
    subType: 'PVC Bucket',
    description: 'Smooth white polymeric bucket engineered for dry food and milling applications. Highly non-toxic surface prevents any dust adhesion, guaranteeing top sanitization.',
    basePrice: 0,
    moq: 20,
    unit: 'Piece',
    image: 'https://i.ibb.co/zTWP8KZr/41-Kj-Leq-GKx-L.jpg',
    packaging: 'Nested in clean standard carton box packs',
    weight: '0.28 kg',
    isAvailable: true,
    specifications: [
      { label: 'Core Formula', value: 'Anti-static, impact modified polyvinyl polymer' },
      { label: 'Abrasion Resilience', value: 'Excellent sliding grain sliding friction capability' },
      { label: 'Hole Pattern', value: 'Pre-bored universal distance mounting pitch' }
    ],
    tiers: []
  },
  {
    id: 'mtc-bk-pvc-03',
    name: 'Industrial Strength Polyethylene Elevator Bucket',
    sku: 'MTC-BK-PVC-03',
    category: 'Elevator Bucket',
    subType: 'PVC Bucket',
    description: 'Tough high-impact HDPE bucket designed for heavy service, agricultural grains, and mineral transport in highly humid or wet processing environments.',
    basePrice: 0,
    moq: 10,
    unit: 'Piece',
    image: 'https://i.ibb.co/zVnhtHzr/pvc-elevat-1753522439-7306267-2568552.webp',
    packaging: 'Industrial heavy pallet nests',
    weight: '0.42 kg',
    isAvailable: true,
    specifications: [
      { label: 'Polymer Structure', value: 'Reinforced wear-resistant thick lip polymer' },
      { label: 'Chemical Safeguard', value: 'Outstanding resistance to acids, bases, rust, and water' },
      { label: 'Shape Stability', value: 'Zero deformation or bending stress' }
    ],
    tiers: []
  },

  // ELEVATOR BUCKETS - SS (STAINLESS STEEL)
  {
    id: 'mtc-bk-ss-01',
    name: 'Premium Sanitary Stainless Steel (SS) Elevator Bucket',
    sku: 'MTC-BK-SS-01',
    category: 'Elevator Bucket',
    subType: 'SS Bucket',
    description: 'Premium-grade stainless steel (SS304 / SS316) elevator bucket. Delivers matchless corrosion resistance, maximum temperature endurance, and clean, sanitary performance. Highly recommended for pharmaceutical, extreme chemical, and high-standard food processing plants.',
    basePrice: 0,
    moq: 5,
    unit: 'Piece',
    image: 'https://i.ibb.co/Q3wL2BvW/elevator-buckets-1000x1000.jpg',
    packaging: 'Custom bubble-wrapped sanitary wood-board crates',
    weight: '1.3 kg',
    isAvailable: true,
    specifications: [
      { label: 'Material Suitability', value: 'AISI 304 / AISI 316 Premium Grade Stainless Steel' },
      { label: 'Surface Finish Quality', value: 'High gloss mirror polished, zero burr edges' },
      { label: 'Mechanical Joint Strength', value: 'Double continuous weld seam reinforcement' },
      { label: 'Anti-Corrosion Level', value: 'Complete rust protection under chemical exposure limit' },
      { label: 'Target Industry Fields', value: 'Pharmaceutical pills, sanitary flour milling, chemical salts' }
    ],
    tiers: []
  },
  {
    id: 'mtc-bk-ss-02',
    name: 'Heavy-Weight Food-Safe Stainless Steel Bucket',
    sku: 'MTC-BK-SS-02',
    category: 'Elevator Bucket',
    subType: 'SS Bucket',
    description: 'Reinforced ultra-sanitary stainless steel scoop built with heavy Gauge-14 steel sheet. Specifically polished for easy chemical washdowns and sticky materials processing.',
    basePrice: 0,
    moq: 5,
    unit: 'Piece',
    image: 'https://i.ibb.co/d49TZ9zh/industrial-elevator-bucket-500x500.webp',
    packaging: 'Sanitary heavy cartons with foam corners',
    weight: '1.55 kg',
    isAvailable: true,
    specifications: [
      { label: 'Alloy Class', value: 'SS304 Premium Marine-and-Food Grade' },
      { label: 'High Temperature Limit', value: 'Sustained thermal resistance up to 450°C' },
      { label: 'Lip Structure', value: 'Rolled anti-spillage high lip edge specification' }
    ],
    tiers: []
  },
  
  // CONVEYOR BELT FASTENERS
  {
    id: 'mtc-bf-hd-01',
    name: 'Heavy-Duty Solid Plate Conveyor Belt Fastener',
    sku: 'MTC-BF-HD-01',
    category: 'Conveyor Belt Fastener',
    description: 'High-strength solid plate fasteners designed for demanding heavy-industrial conveyors. Engineered to distribute tension evenly across the entire belt width, preventing joint fatigue and maximizing service longevity under extreme payloads.',
    basePrice: 0,
    moq: 50,
    unit: 'Set',
    image: 'https://i.ibb.co/V0j9MSYr/1.jpg',
    packaging: 'Durable composite pack boxes of 50 sets with bolts & nuts',
    weight: '3.6 kg / box',
    isAvailable: true,
    specifications: [
      { label: 'Material Quality', value: 'High-tensile wear-resistant carbon steel' },
      { label: 'Incurred Joint Style', value: 'Low profile solid plate compression joint' },
      { label: 'Belt Thickness Compatibility', value: '8mm to 14mm thick conveyor belts' },
      { label: 'Bolt Tension Rating', value: 'Superb pull-out strength for primary aggregate transport' }
    ],
    tiers: []
  },
  {
    id: 'mtc-bf-bc-02',
    name: 'Industrial Bolt Hinged Conveyor Belt Fastener',
    sku: 'MTC-BF-BC-02',
    category: 'Conveyor Belt Fastener',
    description: 'Specially crafted hinged belt fasteners designed for quick installation and smooth operation over smaller pulley diameters. The articulating joint provides excellent flexibility while keeping high-tension materials moving without interruption.',
    basePrice: 0,
    moq: 50,
    unit: 'Set',
    image: 'https://i.ibb.co/wrcvsc0w/conveyor-belt-fasteners.jpg',
    packaging: 'Reinforced industrial boxes of 50 sets',
    weight: '3.2 kg / box',
    isAvailable: true,
    specifications: [
      { label: 'Mechanical Style', value: 'Hinged design with heavy-duty locking pivot pin' },
      { label: 'Anti-Rust Coating', value: 'Tempered zinc-chromate corrosion barrier' },
      { label: 'Ideal Applications', value: 'Wheat flour mills, seed processors, grain storage buckets' },
      { label: 'Assembly Advantage', value: 'Easy on-site joint separation without dismantling conveyor rails' }
    ],
    tiers: []
  },
  {
    id: 'mtc-bf-rv-03',
    name: 'Heavy-Duty Rivet Solid Plate Fastener',
    sku: 'MTC-BF-RV-03',
    category: 'Conveyor Belt Fastener',
    description: 'Self-setting rivet fasteners featuring a secure stagger-pattern design for high pull-out resistance. Offers a smooth, exceptionally clean belt transition across driving pulleys, ideal for high-capacity industrial systems.',
    basePrice: 0,
    moq: 50,
    unit: 'Set',
    image: 'https://i.ibb.co/WQbSW0Z/hqdefault.jpg',
    packaging: 'Polystyrene protected wholesale container cartons',
    weight: '4.1 kg / carton',
    isAvailable: true,
    specifications: [
      { label: 'Structural Spec', value: 'Rivet fastened high-gauge galvanized steel plates' },
      { label: 'Rivet Pattern', value: 'Double staggered self-aligning rivet layout' },
      { label: 'Flex Limits', value: 'Maintains elite joint tightness on reverse-flex pulleys' },
      { label: 'Preferred Industries', value: 'Cement elevators, parboiled paddy mills, heavy industrial handling' }
    ],
    tiers: []
  },
  {
    id: 'mtc-bf-ah-04',
    name: 'Alloy Steel Alligator-Style Belt Lacing Fastener',
    sku: 'MTC-BF-AH-04',
    category: 'Conveyor Belt Fastener',
    description: 'One-piece alligator lacing designed to ensure a strong, continuous grip across the entire belt width. Features precision-formed claws that penetrate the belt carcass cleanly without tearing the structural fibers.',
    basePrice: 0,
    moq: 20,
    unit: 'Set',
    image: 'https://i.ibb.co/Swds47XP/images.jpg',
    packaging: 'Sturdy transparent storage tubes with steel gauge pins',
    weight: '1.9 kg / packet',
    isAvailable: true,
    specifications: [
      { label: 'Lacing Style Type', value: 'Continuous alligator jaw claw-tooth joint' },
      { label: 'Material Blend', value: 'Premium spring-tempered high-durability alloy steel' },
      { label: 'Thickness Range', value: '3.2mm up to 8mm lightweight conveyor lines' },
      { label: 'Standard Accessories', value: 'High strength hinge pin included per packet' }
    ],
    tiers: []
  },
  
  // KKK BEARINGS
  {
    id: 'mtc-brg-kkk-01',
    name: 'Genuine KKK Premium Pillow Block Bearing UCP205',
    sku: 'MTC-BRG-KKK-01',
    category: 'KKK Bearing',
    description: 'Genuine high-precision KKK pillow block self-aligning ball bearing units. Renowned for outstanding high-speed stability, heavy load endurance, and robust industrial cast iron housing. Pre-lubricated with high-grade industrial grease, perfect for flour milling and agricultural elevators.',
    basePrice: 0,
    moq: 10,
    unit: 'Piece',
    image: 'https://i.ibb.co/WvJv8gsz/download.jpg',
    packaging: 'Individual KKK branded anti-rust box packaging',
    weight: '0.85 kg',
    isAvailable: true,
    specifications: [
      { label: 'Component Type', value: 'Pillow Block Journal Bearing Unit' },
      { label: 'Bearing Insert', value: 'UC205 chrome steel self-aligning insert' },
      { label: 'Housing Style', value: 'Heavy-duty cast iron base with grease nipple' },
      { label: 'Shaft Locking System', value: 'Dual set screws lock' },
      { label: 'Speed Limit', value: '5,800 RPM continuous operational rating' }
    ],
    tiers: []
  },
  {
    id: 'mtc-brg-kkk-02',
    name: 'KKK Flange Block Bearing UCF204 Unit',
    sku: 'MTC-BRG-KKK-02',
    category: 'KKK Bearing',
    description: 'Top-grade UCF series four-bolt flanged bearing unit crafted by KKK. Solid standard housing base accommodates combined radial thrust and physical loads cleanly, ideal for vertical elevator drives and mill spout applications.',
    basePrice: 0,
    moq: 10,
    unit: 'Piece',
    image: 'https://i.ibb.co/VYfHZDrg/images.jpg',
    packaging: 'KKK branded heavy wholesale paper packets with anti-humidity liners',
    weight: '0.62 kg',
    isAvailable: true,
    specifications: [
      { label: 'Housing Type', value: '4-Bolt Square Flange Bracket Unit' },
      { label: 'Core Insert', value: 'UC204 high-tensile chrome carbon steel' },
      { label: 'Precision Grade', value: 'ISO P6 / ABEC-3 tolerance class' },
      { label: 'Max Static Load', value: '6.6 kN limit capacity' }
    ],
    tiers: []
  },
  {
    id: 'mtc-brg-kkk-03',
    name: 'KKK Industrial Cast Housing 4-Bolt Bearing UCF206',
    sku: 'MTC-BRG-KKK-03',
    category: 'KKK Bearing',
    description: 'Premium performance square 4-bolt flanged housing bearing engineered specifically by KKK. Built with superior cast iron and dual-lip contact seals to securely block dust, husks, and grit from entering the internal rolling track.',
    basePrice: 0,
    moq: 10,
    unit: 'Piece',
    image: 'https://i.ibb.co/ZzkrPVpY/product-jpeg-500x500.webp',
    packaging: 'Trademark KKK protective sealed containers',
    weight: '1.15 kg',
    isAvailable: true,
    specifications: [
      { label: 'Bearing Class', value: 'UCF206 Premium Grade Industrial Series' },
      { label: 'Seal Protection', value: 'Rubber double-lip dust seal + steel slinger ring' },
      { label: 'Dynamic Lubrication', value: 'Built-in re-greasable fitting nipple' },
      { label: 'Application Suitability', value: 'Milling roller shafts, food grain conveyors, heavy agricultural thrashing tools' }
    ],
    tiers: []
  },
  
  // PATTA BOLTS
  {
    id: 'mtc-pb-01',
    name: 'Premium Carbon Steel Flat-Head Patta Bolt',
    sku: 'MTC-PB-01',
    category: 'Patta Bolt',
    description: 'Specialized flat-head Patta Bolts (or elevator belt fastener bolts) manufactured with premium grade carbon steel. Built specifically for high-strength joint stability in industrial drive belts and heavy conveyor belts, ensuring secure locking and preventing belt slippage.',
    basePrice: 0,
    moq: 100,
    unit: 'Set',
    image: 'https://i.ibb.co/DfB8mtZd/patta-bolt-833.jpg',
    packaging: 'Industrial grade polybags inside 100-set cartons',
    weight: '3.1 kg / 100 sets',
    isAvailable: true,
    specifications: [
      { label: 'Item Class', value: 'Flat-Head Elevator Belt Fastener (Patta Bolt)' },
      { label: 'Thread Pitch Quality', value: 'Precision metric fine thread coarse pitch' },
      { label: 'Locking System', value: 'Included heavy hex nut, flat washer, and split washer' },
      { label: 'Common Uses', value: 'Agricultural power drive belts, flour mills, rice huller drives' }
    ],
    tiers: []
  },
  {
    id: 'mtc-pb-02',
    name: 'Heavy-Duty Zinc Plated Patta Bolt Fastener Set',
    sku: 'MTC-PB-02',
    category: 'Patta Bolt',
    description: 'High-strength zinc plated elevator belt joint Patta Bolts. Offering double rust and tear resistance, this fastener is the perfect choice for high tension flour mill drive belts and grain storage silos.',
    basePrice: 0,
    moq: 100,
    unit: 'Set',
    image: 'https://i.ibb.co/3yHWWF5m/patta-bolt-belt-fasteners-250x250.webp',
    packaging: 'Heavy duty wooden box bulk boxes',
    weight: '3.4 kg / 100 sets',
    isAvailable: true,
    specifications: [
      { label: 'Material Suitability', value: 'Zinc plated high-tensile hardened carbon steel' },
      { label: 'Anti-Rust Security', value: 'Superior silver corrosion barrier' },
      { label: 'Included Components', value: 'Full set: 1 Bolt, 1 Hex Nut, 2 Flat Washers, 1 Spring Washer' },
      { label: 'Mechanical Durability', value: 'Engineered for continuous power transmission systems' }
    ],
    tiers: []
  },
  
  // PERFORATED SHEETS - DRY STONER SCREEN
  {
    id: 'mtc-ps-ds-01',
    name: 'Premium Fluid-Bed Dry Stoner Microscreen Sheet',
    sku: 'MTC-PS-DS-01',
    category: 'Perforated Sheets',
    subType: 'dry stoner screen',
    description: 'Elite dry stoner screen, designed with angled scales and directional micro-embossed slits that allow air fluidization. Highly optimized for gravity-separation equipment, ensuring quick stone, glass, and heavy impurity separation from grains.',
    basePrice: 0,
    moq: 2,
    unit: 'Sheet',
    image: 'https://i.ibb.co/sp9QbP1n/download.jpg',
    packaging: 'Rigid corrugated sheets with edge protections',
    weight: '14.2 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Material Suitability', value: 'High-Tensile Carbon Steel / SUS304 Grade' },
      { label: 'Screen Airflow Layout', value: 'Overlapping scale vents with specialized micro-embossed scale design' },
      { label: 'Standard Dimensions', value: '1000mm x 2000mm / 4ft x 8ft high yield sizes' },
      { label: 'Application Suitability', value: 'Wheat gravity separators, de-stoners, and seed cleaning machines' }
    ],
    tiers: []
  },
  {
    id: 'mtc-ps-ds-02',
    name: 'Industrial Grade Air-Fluidized Stoner Sieve Plate',
    sku: 'MTC-PS-DS-02',
    category: 'Perforated Sheets',
    subType: 'dry stoner screen',
    description: 'High performance destoning screen plate designed for precise density segregation. Delivers uniform air distribution, long-life abrasive resist wear patterns, and minimal maintenance noise levels.',
    basePrice: 0,
    moq: 2,
    unit: 'Sheet',
    image: 'https://i.ibb.co/TMbT6qTt/images.jpg',
    packaging: 'Sturdy stacked delivery pallets',
    weight: '12.8 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Physical Finish', value: 'Fully passivated rust resistant zinc finish' },
      { label: 'Deck Compatibility', value: 'Buhler style dry stoning systems & premium grain decks' },
      { label: 'Staggered Layout', value: 'Heavy Duty 30-degree scale inclination' }
    ],
    tiers: []
  },
  {
    id: 'mtc-ps-ds-03',
    name: 'Heavy-Duty Fabricated De-Stoner Deck Panel',
    sku: 'MTC-PS-DS-03',
    category: 'Perforated Sheets',
    subType: 'dry stoner screen',
    description: 'Engineered stoning deck screen panel built with custom fish-scale slit profiles. Excellent wear protection, rigid flat surface design, and heavy dynamic loading tolerance.',
    basePrice: 0,
    moq: 2,
    unit: 'Sheet',
    image: 'https://i.ibb.co/x8LtQ4cd/structure-jpg.webp',
    packaging: 'Reinforced wood crate packaging',
    weight: '16.5 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Material Quality', value: 'Thick Gauged Hardened Steel Alloy Sheet' },
      { label: 'Scale Micro-Openings', value: '0.8mm to 1.5mm precise slot sizes' },
      { label: 'Tension Durability', value: 'High stress resistance in vibratory sorting mills' }
    ],
    tiers: []
  },

  // PERFORATED SHEETS - LONG HOLE
  {
    id: 'mtc-ps-lh-01',
    name: 'Premium Stainless Steel Long Hole Perforated Screen',
    sku: 'MTC-PS-LH-01',
    category: 'Perforated Sheets',
    subType: 'long hole',
    description: 'Top grade stainless steel sifting sheets with precise oblong/long hole layout. Built for length-based grading and thickness-based sortation of grains, sunflower seeds, and beans with elite accuracy.',
    basePrice: 0,
    moq: 4,
    unit: 'Sheet',
    image: 'https://i.ibb.co/wrsNWRxz/178R0063.jpg',
    packaging: 'Protective packaging wrap inside wood crates',
    weight: '9.8 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Alloy Composition', value: 'Premium Non-Magnetic AISI 304 Stainless Steel' },
      { label: 'Slot Opening Pattern', value: 'Oblong / Slots with staggered end-rows' },
      { label: 'Aperture Geometry', value: '2.5mm x 20mm up to 8.0mm x 25mm dimensions' },
      { label: 'Surface Finish', value: 'Mirror polished, zero friction burr ridges' }
    ],
    tiers: []
  },
  {
    id: 'mtc-ps-lh-02',
    name: 'Grains Industry Long Hole Grading Sieve',
    sku: 'MTC-PS-LH-02',
    category: 'Perforated Sheets',
    subType: 'long hole',
    description: 'Specialist sifting and sorting sheets designed specifically for wheat, paddy, and oil-seed cleaning plants. Rectangular slots are outstandingly capable of separating oversized straw, stalks, and large field impurities.',
    basePrice: 0,
    moq: 4,
    unit: 'Sheet',
    image: 'https://i.ibb.co/qF1Vyvf7/grains-industry-perforated.jpg',
    packaging: 'Industrial export bundles in nylon bags',
    weight: '8.4 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Material Type', value: 'Deep Drawn Electro-zinc coated steel sheet' },
      { label: 'Aperture Length Range', value: 'Precision punched 2.2mm x 15mm default parameters' },
      { label: 'Rust Guard Level', value: 'Double-face corrosion control passivated layer' }
    ],
    tiers: []
  },
  {
    id: 'mtc-ps-lh-03',
    name: 'Mild Steel Oblong Sifting Plate',
    sku: 'MTC-PS-LH-03',
    category: 'Perforated Sheets',
    subType: 'long hole',
    description: 'High fatigue limit mild steel long-hole screen panels. Excellent durability for heavy industrial vibrating frames, feed sizing screens, and seed graders.',
    basePrice: 0,
    moq: 5,
    unit: 'Sheet',
    image: 'https://i.ibb.co/NgTZ53x4/ms-long-hole-perforated-sheets-1000x1000.webp',
    packaging: 'Nested stacks on dense pallets',
    weight: '11.5 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Sheet Thickness', value: '2.0mm thick heavy gauge panel' },
      { label: 'Pitch Specification', value: 'Custom staggered end-margin pitch' },
      { label: 'Typical Material', value: 'Grade-40 cold rolled commercial steel' }
    ],
    tiers: []
  },

  // PERFORATED SHEETS - ROUND HOLE
  {
    id: 'mtc-ps-rh-01',
    name: 'Zinc Plated Round Hole Perforated Sieve Sheet',
    sku: 'MTC-PS-RH-01',
    category: 'Perforated Sheets',
    subType: 'Round hole',
    description: 'Standard heavy-gauge round hole screening sheet with precision staggered pattern. Highly reliable performance in sorting, cleaning, and filtering crops of varying shapes.',
    basePrice: 0,
    moq: 5,
    unit: 'Sheet',
    image: 'https://i.ibb.co/4n53TLpM/images-1.jpg',
    packaging: 'Protected moisture-proof plastic bundles',
    weight: '10.3 kg',
    isAvailable: true,
    specifications: [
      { label: 'Pattern Design', value: '60-degree staggered triangular grid' },
      { label: 'Steel Compound', value: 'Premium pre-galvanized zinc metal' },
      { label: 'Hole Dia Range', value: '3.0mm, 4.5mm, 6.0mm, 8.0mm standard stock sizes' }
    ],
    tiers: []
  },
  {
    id: 'mtc-ps-rh-02',
    name: 'High-Precision Micro Round Sieve Sheet',
    sku: 'MTC-PS-RH-02',
    category: 'Perforated Sheets',
    subType: 'Round hole',
    description: 'Micro-perforated sifting screen featuring clean, consistent round apertures for sorting minor agricultural seeds, flour components, spices, and split dals.',
    basePrice: 0,
    moq: 5,
    unit: 'Sheet',
    image: 'https://i.ibb.co/Kcdx1NTM/Round-Hole-Pattern-Illustration.jpg',
    packaging: 'Paper inter-layered cardboard boxes',
    weight: '7.2 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Aperture Size', value: '1.2mm to 2.5mm high accuracy tiny circular bores' },
      { label: 'Pitch Separation', value: '3.0mm pitch staggered layout' },
      { label: 'Flatness Standard', value: 'Underwent absolute tension leveling' }
    ],
    tiers: []
  },
  {
    id: 'mtc-ps-rh-03',
    name: 'Stainless Steel 304 2mm Round-Hole Screen',
    sku: 'MTC-PS-RH-03',
    category: 'Perforated Sheets',
    subType: 'Round hole',
    description: 'Top-grade SS304 premium round-hole perforated screen with 2mm hole size on a 3mm pitch layout. Highly resistant to humidity and fruit acids, suitable for pharmaceutical powder grading and premium food grain elevators.',
    basePrice: 0,
    moq: 2,
    unit: 'Sheet',
    image: 'https://i.ibb.co/d0mzxXND/Stainless-Steel-304-2mm-Round-Hole-Perforated-Mesh-x-3mm-Pitch-x-1mm-Thick-Image-5.jpg',
    packaging: 'Bubble wrapped premium wooden boxes',
    weight: '6.9 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Material Suitability', value: 'Sanitary Food-Safe AISI 304 Stainless Steel' },
      { label: 'Hole Dimension', value: '2.0mm Clean Punched Circular Geometry' },
      { label: 'Pitch Array Layout', value: '3.0mm Triangular Staggered Pitch' },
      { label: 'Sheet Thickness', value: '1.0mm Precision Grade Sheet' }
    ],
    tiers: []
  },

  // PERFORATED SHEETS - SLOTTED HOLE
  {
    id: 'mtc-ps-sl-01',
    name: 'Premium SS304 Slotted Perforated Screen Sheet',
    sku: 'MTC-PS-SL-01',
    category: 'Perforated Sheets',
    subType: 'slotted hole',
    description: 'Heavy duty, rustproof slotted perforated sifter sheets made of premium SS304. Rectangular-profile slots deliver unparalleled performance for separator decks and seed grading applications.',
    basePrice: 0,
    moq: 3,
    unit: 'Sheet',
    image: 'https://i.ibb.co/0y7nWWr2/slotted-perforated-sheet-ss304.webp',
    packaging: 'Double wall protective cartons',
    weight: '8.8 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Stainless Spec', value: 'Solid Grade 304 Stainless Steel' },
      { label: 'Slot Dimensions', value: '1.8mm x 20mm / 2.2mm x 20mm' },
      { label: 'Recommended Use', value: 'Rice length graders, seed sorting systems, chemical separators' }
    ],
    tiers: []
  },
  {
    id: 'mtc-ps-sl-02',
    name: 'Stainless Steel Slotted Hopper Sieve Sheet',
    sku: 'MTC-PS-SL-02',
    category: 'Perforated Sheets',
    subType: 'slotted hole',
    description: 'High throughput slotted screen plate with specialized long straight rows. Promotes fast sorting flow rates and completely blocks fibrous impurities and twigs.',
    basePrice: 0,
    moq: 3,
    unit: 'Sheet',
    image: 'https://i.ibb.co/TDFPK3g3/stainless-steel-slotted-hole-perforated-sheet.webp',
    packaging: 'Export wood casing stacks',
    weight: '9.2 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Material Quality', value: 'AISI 304 Corrosion Shield Alloy' },
      { label: 'Slot Shape Layout', value: 'Side-staggered straight round-ended slots' },
      { label: 'Open area percentage', value: 'Averages 42% high volume sifting capacity' }
    ],
    tiers: []
  },

  // PERFORATED SHEETS - SQUARE HOLE
  {
    id: 'mtc-ps-sq-01',
    name: 'Industrial Square Hole Perforated Metal Sheet',
    sku: 'MTC-PS-SQ-01',
    category: 'Perforated Sheets',
    subType: 'square hole',
    description: 'Classic high open-area square pattern perforated screen sheets. Offering up to 52% open surface area for quick transit sorting of dry granules, feed ingredients, and dust sorting.',
    basePrice: 0,
    moq: 4,
    unit: 'Sheet',
    image: 'https://i.ibb.co/DfyWhTKg/image.webp',
    packaging: 'Strap locked heavy steel frames',
    weight: '11.0 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Grid Profile Layout', value: 'Linear straight row square pattern' },
      { label: 'Hole Side Length', value: '8mm x 8mm / 10mm x 10mm options' },
      { label: 'Structural Steel', value: 'Cold pressed rustproof structural steel' }
    ],
    tiers: []
  },
  {
    id: 'mtc-ps-sq-02',
    name: 'High-Strength Square Sieve Sifter Sheet',
    sku: 'MTC-PS-SQ-02',
    category: 'Perforated Sheets',
    subType: 'square hole',
    description: 'Reinforced square opening screen panel. Designed specifically for agricultural separators, material screens, and high-velocity feed mills requiring massive volumetric transit flow.',
    basePrice: 0,
    moq: 4,
    unit: 'Sheet',
    image: 'https://i.ibb.co/YBNR6CYy/imgi-140-square-hole-metal-perforated-sheet-500x500.webp',
    packaging: 'Moisture resistant nylon wrapped bundles',
    weight: '12.4 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Carbon Steel Quality', value: 'High grade structural steel plate' },
      { label: 'Open Area Rate', value: 'Optimal 48% maximum throughput scale' },
      { label: 'Sheet Thickness', value: '1.5mm standard steel gauge' }
    ],
    tiers: []
  },

  // PERFORATED SHEETS - TRIANGLE HOLE
  {
    id: 'mtc-ps-tr-01',
    name: 'Triangle Hole Perforated Grain Cleaning Screen',
    sku: 'MTC-PS-TR-01',
    category: 'Perforated Sheets',
    subType: 'triangle hole',
    description: 'Unique custom triangle-hole perforated screen sheets. Engineered primarily to eliminate wild oat seeds, broken grains, and angular seeds from circular wheat or legume harvests.',
    basePrice: 0,
    moq: 2,
    unit: 'Sheet',
    image: 'https://i.ibb.co/d49C6y59/triangle-hole-perforated-sheet.png',
    packaging: 'Reinforced secure cardboard wraps',
    weight: '9.5 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Aperture Shape Profile', value: 'Equilateral triangular punched geometry' },
      { label: 'Material Suitability', value: 'Highly elastic passivated spring steel' },
      { label: 'Aperture Side Size', value: '5.0mm / 6.5mm / 8.0mm precision boundaries' }
    ],
    tiers: []
  },
  {
    id: 'mtc-ps-tr-02',
    name: 'Premium Tri-Aperture Sifter-Cleaning Sieve',
    sku: 'MTC-PS-TR-02',
    category: 'Perforated Sheets',
    subType: 'triangle hole',
    description: 'Premium quality precision-punched triangular grid screening sheet. Excellent sorting and grading accuracy, heavy friction protection coating, and robust operational lifetime.',
    basePrice: 0,
    moq: 2,
    unit: 'Sheet',
    image: 'https://i.ibb.co/jkcvnRP6/triangle-hole-perforated-sheet-1000x1000.jpg',
    packaging: 'Custom banded palletized nested crates',
    weight: '10.6 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Material Spec Quality', value: 'Extra wear alloy steel sheet' },
      { label: 'Stagger Rating Layout', value: 'Staggered continuous triangular flow rows' },
      { label: 'Optimal Uses', value: 'Seed grading mills, gravity tables separator linings' }
    ],
    tiers: []
  },
  
  // PILLOW BLOCK BEARINGS
  {
    id: 'mtc-brg-skf-01',
    name: 'Original SKF Premium Pillow Block Bearing Unit',
    sku: 'MTC-BRG-SKF-01',
    category: 'Pillow Block Bearing',
    description: 'High-grade premium SKF pillow block bearing assembly featuring an advanced self-aligning design. Equipped with double-lip protective rubber seals and a robust cast-iron housing for superior radial and axial load management in critical driving systems.',
    basePrice: 0,
    moq: 6,
    unit: 'Piece',
    image: 'https://i.ibb.co/ZR3ZftHb/Block-Bearing-Factory-Wholesale-Original-SKF-Pillow-Block-Bearing.jpg',
    packaging: 'SKF factory laser-marked individual carton cases',
    weight: '1.45 kg',
    isAvailable: true,
    specifications: [
      { label: 'Manufacturer Standard', value: 'SKF Original Premium Grade Series' },
      { label: 'Housing Assembly', value: 'Precision grey cast iron UCP standard housing' },
      { label: 'Bearing Type', value: 'Self-aligning chrome carbon steel ball insert' },
      { label: 'Dynamic Load Rating', value: '14.0 kN structural power rating' },
      { label: 'Shaft Fitting System', value: 'Dual eccentric locking set-screws' }
    ],
    tiers: []
  },
  {
    id: 'mtc-brg-pb-02',
    name: 'Heavy-Duty Cast Iron Pillow Block Bearing Unit',
    sku: 'MTC-BRG-PB-02',
    category: 'Pillow Block Bearing',
    description: 'Rugged standard pillow block bearing unit built with thick-walled grey cast iron. Loaded with a pre-greased, heat-stabilized chrome steel insert. Specially engineered to stand up to severe vibration in agricultural milling environments.',
    basePrice: 0,
    moq: 10,
    unit: 'Piece',
    image: 'https://i.ibb.co/chMNYdXx/download-1.jpg',
    packaging: 'Anti-humidity waxed paper packs in cartons',
    weight: '1.12 kg',
    isAvailable: true,
    specifications: [
      { label: 'Mounting Style', value: '2-Bolt Cast-Base Pedestal Frame' },
      { label: 'Internal Bearing Insert', value: 'Hardened AISI 52100 high carbon chromium steel' },
      { label: 'Sealing Efficiency', value: 'Friction-resistant rubber contact seals with steel slingers' },
      { label: 'Lubrication Maintenance', value: 'Fitted grease fitting for easy re-greasing' }
    ],
    tiers: []
  },
  {
    id: 'mtc-brg-fyh-03',
    name: 'FYH Premium Japanese Style Pillow Block Bearing',
    sku: 'MTC-BRG-FYH-03',
    category: 'Pillow Block Bearing',
    description: 'Top-tier Japanese engineering design FYH self-aligning bearing unit. Designed with a superior spherical outer ring matching the precision-honed housing bore, reducing start-up friction and maximizing operating life.',
    basePrice: 0,
    moq: 6,
    unit: 'Piece',
    image: 'https://i.ibb.co/kgBdM95M/FYH-pillow-block-bearing-image.jpg',
    packaging: 'FYH branded premium retail boxes with protective plastic wrap',
    weight: '1.25 kg',
    isAvailable: true,
    specifications: [
      { label: 'Brand Spec', value: 'FYH High Performance Standard' },
      { label: 'Precision Rating', value: 'Premium ISO P6 class tolerance' },
      { label: 'Seal Design', value: 'Special patented triple-lip high speed dust seals' },
      { label: 'Applicable Fields', value: 'Seed processors, heavy elevator head pulley systems, commercial grain mixers' }
    ],
    tiers: []
  },
  {
    id: 'mtc-brg-pb-04',
    name: 'Multi-Type Heavy Industrial Pillow Block Bearing Set',
    sku: 'MTC-BRG-PB-04',
    category: 'Pillow Block Bearing',
    description: 'Versatile industrial-grade bearing unit assortment including pillow block pedestals and flanged blocks. Ideal for diverse mill alignments, multi-stage conveyor rollers, and heavy-duty power-shaft set-ups.',
    basePrice: 0,
    moq: 8,
    unit: 'Piece',
    image: 'https://i.ibb.co/G3rf5zxx/pillow-block-bearings-all-types-500x500.webp',
    packaging: 'Protected heavy export packing pallets',
    weight: '1.6 kg',
    isAvailable: true,
    specifications: [
      { label: 'Housing Options', value: 'Available in UCP, UCF, and UCFL structural styles' },
      { label: 'Insert Composition', value: 'Chrome steel high fatigue-resistance element' },
      { label: 'Sling Grease Guard', value: 'In-built high protection double-sided shield plates' },
      { label: 'Operating Temp Range', value: '-30°C to +120°C high-heat compatibility' }
    ],
    tiers: []
  },
  
  // SPRING STEEL - WIRE MESH & CRUSHER JALI
  {
    id: 'mtc-wn-ss-01',
    name: 'Premium High-Tensile Spring Steel Wire Mesh',
    sku: 'MTC-WN-SS-01',
    category: 'Spring Steel',
    subType: 'Spring Steel Wire Mesh',
    description: 'Premium industrial fine-woven spring steel wire mesh designed with extreme high-tensile strength. Specifically engineered for demanding sieving, grading, and highly abrasive sorting tasks in modern flour mills, crop processors, and mineral screening setups.',
    basePrice: 0,
    moq: 5,
    unit: 'Roll',
    image: 'https://i.ibb.co/G4C9VS3H/fine-wire-mesh-500x500.webp',
    packaging: 'Heavy waterproof kraft paper rolls with protective plastic shrink wrapping',
    weight: '24.5 kg / roll',
    isAvailable: true,
    specifications: [
      { label: 'Material Composition', value: 'High-Carbon Spring Steel (Grade 65Mn)' },
      { label: 'Aperture Selection', value: '1.0mm up to 5.0mm high precision mesh openings' },
      { label: 'Weaving Pattern', value: 'Double crimped plain weave design' },
      { label: 'Standard Roll Dimensions', value: '1m x 15m / 1.2m x 15m robust lengths' },
      { label: 'Anti-Abrasion Level', value: 'Superb friction endurance under heavy granular movement' }
    ],
    tiers: []
  },
  {
    id: 'mtc-wn-ss-02',
    name: 'Heavy-Duty Spring Steel Stone Crusher Jali (Wire Screen)',
    sku: 'MTC-WN-SS-02',
    category: 'Spring Steel',
    subType: 'Stone Crusher Jali',
    description: 'Extremely rugged spring steel stone crusher screen mesh (commonly known as Crusher Jali) engineered to withstand extreme physical impacts, heavy vibratory tension, and rough abrasion. Perfect for sorting heavy-duty materials, quarry sifting, sand grading, and aggregate seed mill separators.',
    basePrice: 0,
    moq: 2,
    unit: 'Piece',
    image: 'https://i.ibb.co/qYnYLsyJ/stone-crusher-jali-500x500.webp',
    packaging: 'Durable steel-strapped bundles on heavy-duty wooden delivery pallets',
    weight: '18.2 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Material Suitability', value: 'Hardened Premium Spring Steel (Super Wear-Resistant)' },
      { label: 'Wire Diameter Range', value: '2.5mm up to 8.0mm thick wire calibre' },
      { label: 'Mesh Apertures', value: '10mm x 10mm, 15mm x 15mm, 25mm x 25mm in stock' },
      { label: 'Edge Finish Layout', value: 'Precision folded clamping hooks / Plain square cuts' },
      { label: 'Screen Vibration Rating', value: 'Elite resistance to fatigue crack propagation' }
    ],
    tiers: []
  },

  // SS WIRE MESH - CEILING WIRE MESH
  {
    id: 'mtc-swm-cm-01',
    name: 'POP Jali / Plaster Ceiling Wire Mesh Screen',
    sku: 'MTC-SWM-CM-01',
    category: 'SS Wire Mesh',
    subType: 'ceiling wire mesh',
    description: 'Specialized POP Jali woven wire mesh engineered for plaster reinforcement, false ceiling backings, and structural wall support. Delivers high grip tensile hold and zero sagging features.',
    basePrice: 0,
    moq: 10,
    unit: 'Roll',
    image: 'https://i.ibb.co/DfRmqnPh/pop-wire-mesh-pop-jali-354.jpg',
    packaging: 'Protected heavy paper wraps in tight industrial rolls',
    weight: '3.6 kg / roll',
    isAvailable: true,
    specifications: [
      { label: 'Mesh Application', value: 'POP plaster bonding, false ceilings, facade walls' },
      { label: 'Anti-Rust Protection', value: 'Electro-galvanized bright coat' },
      { label: 'Wire gauge standard', value: 'Ultra-thin flexible structural mesh' }
    ],
    tiers: []
  },
  {
    id: 'mtc-swm-cm-02',
    name: 'Premium Wire Mesh False Ceiling Grid Panel',
    sku: 'MTC-SWM-CM-02',
    category: 'SS Wire Mesh',
    subType: 'ceiling wire mesh',
    description: 'High-end Architectural wire mesh tile custom designed for false ceilings, decorative interior paneling, and ventilation covers. Provides a sleek, industrial design aesthetic with maximum air circulation.',
    basePrice: 0,
    moq: 15,
    unit: 'Piece',
    image: 'https://i.ibb.co/jZhGQ0tC/wire-mesh-false-cieling-500x500.webp',
    packaging: 'Packed inside double cardboard boxes with corner defenders',
    weight: '1.2 kg / tile',
    isAvailable: true,
    specifications: [
      { label: 'Aesthetic Styling', value: 'Modern industrial interior grid profile' },
      { label: 'Composition Specs', value: 'Double-side coated premium steel wire structures' },
      { label: 'Standard Dimensions', value: '600mm x 600mm clean square tiles' }
    ],
    tiers: []
  },

  // SS WIRE MESH - CHAIN LINK FENCING
  {
    id: 'mtc-swm-clf-01',
    name: 'Galvanized Chain Link Fencing Diamond Mesh (Roll)',
    sku: 'MTC-SWM-CLF-01',
    category: 'SS Wire Mesh',
    subType: 'Chain Link Fencing',
    description: 'Extremely durable double-galvanized chain link fencing mesh woven in classic diamond-aperture geometry. Perfectly suited for border protection, farm perimeters, industrial zoning, and security closures.',
    basePrice: 0,
    moq: 1,
    unit: 'Roll',
    image: 'https://i.ibb.co/ZPSfhKQ/chain-link-fences-1000x1000.webp',
    packaging: 'Protective hessian cloth wrap at roll ends',
    weight: '45.0 kg / roll',
    isAvailable: true,
    specifications: [
      { label: 'Zinc Coating Level', value: 'Heavy Hot-Dip Galvanizing (80-120 g/m²)' },
      { label: 'Aperture Metric', value: '50mm x 50mm diamond mesh standard' },
      { label: 'Mesh Height Standard', value: '4 feet up to 10 feet heights available' }
    ],
    tiers: []
  },
  {
    id: 'mtc-swm-clf-02',
    name: 'Heavy Duty Industrial Chain Link Security Mesh',
    sku: 'MTC-SWM-CLF-02',
    category: 'SS Wire Mesh',
    subType: 'Chain Link Fencing',
    description: 'Rigid protective fence wire built with heavy continuous gauge alloy core. Excellent defense against heavy impact and climate corrosion.',
    basePrice: 0,
    moq: 2,
    unit: 'Roll',
    image: 'https://i.ibb.co/BVBMBk47/chain-link-fencing-500x500.webp',
    packaging: 'Banded heavy transport bundle structures',
    weight: '52.0 kg / roll',
    isAvailable: true,
    specifications: [
      { label: 'Aperture Layout', value: '60mm x 60mm diamond patterns' },
      { label: 'Tensile Force Spec', value: 'High grade steel wires (450 N/mm²)' },
      { label: 'Anti-Oxidation Coating', value: 'Hot-dip bright galvanized layers' }
    ],
    tiers: []
  },
  {
    id: 'mtc-swm-clf-03',
    name: 'Premium Iron Chain Link Protective Fencing Mesh',
    sku: 'MTC-SWM-CLF-03',
    category: 'SS Wire Mesh',
    subType: 'Chain Link Fencing',
    description: 'Traditional heavy-gauge woven steel wire fence panel. Delivers robust fence stability, simple post attachment, and exceptional cost-effectiveness for vast land boundary projects.',
    basePrice: 0,
    moq: 2,
    unit: 'Roll',
    image: 'https://i.ibb.co/bjg12yKc/iron-chain-link-fencing-mesh-500x500.webp',
    packaging: 'Securely stacked and palletized roll structures',
    weight: '38.8 kg / roll',
    isAvailable: true,
    specifications: [
      { label: 'Wire Diameter Gauge', value: '3.0mm heavy gauge wire core' },
      { label: 'Flexible Installation', value: 'Knuckle-knuckle roll border endings' },
      { label: 'Weather Endurance', value: 'Fully anti-rust passivated surface steel' }
    ],
    tiers: []
  },

  // SS WIRE MESH - CRIMPED WIRE MESH
  {
    id: 'mtc-swm-cwm-01',
    name: 'High-Strength Single-Crimp Stainless Screen Mesh',
    sku: 'MTC-SWM-CWM-01',
    category: 'SS Wire Mesh',
    subType: 'crimped wire mesh',
    description: 'Elite quality wave-crimped stainless steel wire screen panel. The single-crimp pattern locks spacing securely, delivering a perfectly uniform mesh aperture for high-stress agricultural sorting.',
    basePrice: 0,
    moq: 4,
    unit: 'Piece',
    image: 'https://i.ibb.co/ynkM8Wsf/68a84025566455c9f27e0312.jpg',
    packaging: 'Thick cardboard sheet sandwich packing with metal band tie-downs',
    weight: '11.2 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Steel Formulation', value: 'Stainless Steel SUS304 Grade Series' },
      { label: 'Aperture Accuracy', value: 'Stiff 5.0mm x 5.0mm square openings' },
      { label: 'Crimp Geometry', value: 'Single-crimp locks keeping perfect dimensions' }
    ],
    tiers: []
  },
  {
    id: 'mtc-swm-cwm-02',
    name: 'Premium Double Crimped Stainless Steel Screen Jali',
    sku: 'MTC-SWM-CWM-02',
    category: 'SS Wire Mesh',
    subType: 'crimped wire mesh',
    description: 'Specially engineered high wear-resistance double-crimped screen mesh. Perfectly flat top structure prevents grain damage during high-frequency feed grading processes.',
    basePrice: 0,
    moq: 4,
    unit: 'Piece',
    image: 'https://i.ibb.co/XxjmcHB4/crimped-wire-mesh.jpg',
    packaging: 'Wooden side-clamped protective pallets',
    weight: '12.5 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Mesh Density Size', value: 'Heavy 8mm square screening clearances' },
      { label: 'Material Spec', value: 'High grade stainless steel AISI 304' },
      { label: 'Vibrator Mounts', value: 'Hooked / Flat borders options' }
    ],
    tiers: []
  },
  {
    id: 'mtc-swm-cwm-03',
    name: 'Intermediate Crimped Stainless Wire Mesh Panel',
    sku: 'MTC-SWM-CWM-03',
    category: 'SS Wire Mesh',
    subType: 'crimped wire mesh',
    description: 'Highly versatile multi-crimp stainless steel mesh screen. Providing an excellent balance of raw open area and rigid structural durability for flour milling plansifter screen frames.',
    basePrice: 0,
    moq: 5,
    unit: 'Piece',
    image: 'https://i.ibb.co/kg1yrGGS/crimp-wire-mesh-net-500x500.webp',
    packaging: 'Bubble wrapped industrial delivery frames',
    weight: '9.4 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Design Structure', value: 'Intermediate wave crumping pattern' },
      { label: 'Material Protection', value: 'Pure 304 food-safety stainless steel' },
      { label: 'Typical Use-Case', value: 'Primary grading filters, spice mill screens' }
    ],
    tiers: []
  },

  // SS WIRE MESH - MOSQUITO MESH NET
  {
    id: 'mtc-swm-mmn-01',
    name: 'Premium Fiberglass Anti-Mosquito Insect Screen Netting',
    sku: 'MTC-SWM-MMN-01',
    category: 'SS Wire Mesh',
    subType: 'mosquito mesh net',
    description: 'Top-tier fiberglass-coated high density window mosquito net mesh. Soft-touch texture, exceptionally high direct light transmission, with excellent puncture endurance.',
    basePrice: 0,
    moq: 5,
    unit: 'Roll',
    image: 'https://i.ibb.co/qFRhwy5t/9.jpg',
    packaging: 'Individually plastic wrapped roll cores with barcode label',
    weight: '2.8 kg / roll',
    isAvailable: true,
    specifications: [
      { label: 'Mesh Core Fiber', value: '18x16 High Grade Premium Fiberglass filament' },
      { label: 'Heat Protection', value: 'UV Stabilized & Retardant coating layers' },
      { label: 'Mesh Dimensions', value: '3ft x 30m / 4ft x 30m versatile roll bounds' }
    ],
    tiers: []
  },
  {
    id: 'mtc-swm-mmn-02',
    name: 'Fireproof Fine-Weave Mosquito Barrier Fiberglass Net',
    sku: 'MTC-SWM-MMN-02',
    category: 'SS Wire Mesh',
    subType: 'mosquito mesh net',
    description: 'High-quality fireproof fiberglass mosquito mesh netting, designed for modern home window systems and sliding door insect barriers. Superb durability and high cost-efficiency.',
    basePrice: 0,
    moq: 5,
    unit: 'Roll',
    image: 'https://i.ibb.co/35PcW9C7/Ha389cc9d0d3b436191d609e21016390bt-General-Fireproof-Cheap-Price-30m-roll-Fiberglass.webp',
    packaging: 'Protected export bundles wrapped inside heavy plastic sacks',
    weight: '3.1 kg / roll',
    isAvailable: true,
    specifications: [
      { label: 'Flame Resistance', value: 'Passed dynamic fire retardant standards' },
      { label: 'Visibility index', value: 'Elite micro-filament invisible transparency' },
      { label: 'Coagulation Spec', value: 'Vinyl coated fiber junctions' }
    ],
    tiers: []
  },
  {
    id: 'mtc-swm-mmn-03',
    name: 'Aluminum Alloy Insect Window Screen Net Roll',
    sku: 'MTC-SWM-MMN-03',
    category: 'SS Wire Mesh',
    subType: 'mosquito mesh net',
    description: 'Heavy duty, metal alloy insect screen roll. Exceptionally puncture-resistant and protective against pets, birds, and large pests, offering an elegant shiny metallic finish with great air draft ventilation.',
    basePrice: 0,
    moq: 3,
    unit: 'Roll',
    image: 'https://i.ibb.co/6RCJD5fw/images.jpg',
    packaging: 'Cardboard tubes inside tough external shipping boxes',
    weight: '6.4 kg / roll',
    isAvailable: true,
    specifications: [
      { label: 'Raw Composition', value: 'Rustproof Aluminum-Magnesium Metallic Alloy' },
      { label: 'Open Clearance', value: '18x18 tiny mesh structure blocking minor midges' },
      { label: 'Operating Lifespan', value: 'Anti-corrosion lifetime up to 10+ years' }
    ],
    tiers: []
  },

  // SS WIRE MESH - STAINLESS WIRE MESH
  {
    id: 'mtc-swm-ssm-01',
    name: 'SS304 Premium Fine-Aperture Stainless Wire Mesh Roll',
    sku: 'MTC-SWM-SSM-01',
    category: 'SS Wire Mesh',
    subType: 'Stainless Wire mesh',
    description: 'Industrial reference-grade stainless steel wire mesh roll crafted from heavy SS304. Uniform square weaves prevent sifting bypass, highly recommended for plansifter filter screen linings.',
    basePrice: 0,
    moq: 2,
    unit: 'Roll',
    image: 'https://i.ibb.co/99qGg6gP/SS-Wire-Mesh-Rolls-scaled-removebg-preview.png',
    packaging: 'Moisture barrier lining with rigid cardboard exterior wrap',
    weight: '12.8 kg / roll',
    isAvailable: true,
    specifications: [
      { label: 'Alloy Composition', value: 'Pure Non-magnetic Grade 304 Stainless Steel' },
      { label: 'Mesh Aperture Options', value: '24 Mesh, 30 Mesh, 40 Mesh, 60 Mesh in stock' },
      { label: 'Open Area Rate', value: '45.5% precision high flow rate area' }
    ],
    tiers: []
  },
  {
    id: 'mtc-swm-ssm-02',
    name: 'SS316 Acid-Resistant Industrial Wire Mesh Screening',
    sku: 'MTC-SWM-SSM-02',
    category: 'SS Wire Mesh',
    subType: 'Stainless Wire mesh',
    description: 'Supreme-grade acid-proof SS316 woven wire mesh roll. Engineered specifically for harsh chemical processing, saltwater applications, and ultra-hygienic food separation mills.',
    basePrice: 0,
    moq: 2,
    unit: 'Roll',
    image: 'https://i.ibb.co/zVnyMk9v/stainless-steel-wire-mesh.jpg',
    packaging: 'Heavy wood-crated cylinder roll protections',
    weight: '14.2 kg / roll',
    isAvailable: true,
    specifications: [
      { label: 'Material Composition', value: 'Molybdenum-alloyed AISI 316 Stainless Steel' },
      { label: 'Aperture Style', value: 'Plain weave tight-geometry secure locks' },
      { label: 'Maximum Temperature', value: 'Maintains structure up to +800°C extreme temps' }
    ],
    tiers: []
  },
  {
    id: 'mtc-swm-ssm-03',
    name: 'High-Density Square Weave Stainless Steel Mesh Screen',
    sku: 'MTC-SWM-SSM-03',
    category: 'SS Wire Mesh',
    subType: 'Stainless Wire mesh',
    description: 'Extra dense, uniform filter mesh structure designed for liquid separation, fine powder collection, and highly demanding laboratory grain classification sieves.',
    basePrice: 0,
    moq: 3,
    unit: 'Roll',
    image: 'https://i.ibb.co/zWJQtNWk/Stainless-Steel-Wire-Mesh-Screen-2.jpg',
    packaging: 'Interleaved protective sheets in export boxes',
    weight: '10.5 kg / roll',
    isAvailable: true,
    specifications: [
      { label: 'Raw Wire Calibre', value: '0.25mm ultra accurate fine wire calibre' },
      { label: 'Aperture Dimensions', value: '80 Mesh to 200 Mesh micro pore clearances' },
      { label: 'Weaving Mechanism', value: 'Twill woven pattern layout' }
    ],
    tiers: []
  },

  // SS WIRE MESH - WELD MESH
  {
    id: 'mtc-swm-wm-01',
    name: 'Premium Galvanized Welded Mesh Grid Roll',
    sku: 'MTC-SWM-WM-01',
    category: 'SS Wire Mesh',
    subType: 'weld mesh',
    description: 'Electric-welded high durability galvanized wire mesh roll. Every wire cross-junction is fused via resistance welding to prevent dimensional slips under high transport pressure.',
    basePrice: 0,
    moq: 4,
    unit: 'Roll',
    image: 'https://i.ibb.co/0RKhWBzZ/61h-R-wboir-L-AC-UF894-1000-QL80.jpg',
    packaging: 'Double polypropylene sleeves enclosing the entire roll bundle',
    weight: '18.5 kg / roll',
    isAvailable: true,
    specifications: [
      { label: 'Grid Hole Metric', value: '1 inch x 1 inch square woven structure' },
      { label: 'Galvanizing Finish', value: 'Thick electro-galvanized after weed weld fuses' },
      { label: 'Wire Gauge Standard', value: '18 Gage (1.2mm) highly flexible wire structure' }
    ],
    tiers: []
  },
  {
    id: 'mtc-swm-wm-02',
    name: 'Heavy Gauge Welded Wire Mesh Reinforcement Net',
    sku: 'MTC-SWM-WM-02',
    category: 'SS Wire Mesh',
    subType: 'weld mesh',
    description: 'Industrial-grade stiff welded mesh panel, providing exceptional structural rigidity, concrete reinforcement support, and cage enclosure durability.',
    basePrice: 0,
    moq: 5,
    unit: 'Piece',
    image: 'https://i.ibb.co/1GBT038J/811-JUHZl-TWL.jpg',
    packaging: 'Steel strapping bound in flat bundles',
    weight: '25.0 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Welding Strength', value: 'Ultra-stiff resistance-fused intersections' },
      { label: 'Standard Dimensions', value: '2 inch x 2 inch square openings structure' },
      { label: 'Raw Steel Wire', value: 'Cold drawn high carbon industrial steel core' }
    ],
    tiers: []
  },
  {
    id: 'mtc-swm-wm-03',
    name: 'PVC Coated Corrosion Guard Welded Wire Fence Mesh',
    sku: 'MTC-SWM-WM-03',
    category: 'SS Wire Mesh',
    subType: 'weld mesh',
    description: 'Rustproof, attractive green PVC coated welded wire grid fence roll. Delivers double-grade weather barrier shield with high resistance to dynamic soil and rain moisture.',
    basePrice: 0,
    moq: 2,
    unit: 'Roll',
    image: 'https://i.ibb.co/F4bL16y5/ahqrg4a0.jpg',
    packaging: 'Shrink-wrapped rolls inside carton tubes',
    weight: '22.4 kg / roll',
    isAvailable: true,
    specifications: [
      { label: 'Corrosion Shielding', value: 'Hot Galvanized Core + Heavy Polyvinyl Chloride (PVC) Jacket' },
      { label: 'Visual Style', value: 'Elite Deep Green finish' },
      { label: 'Dimension Array', value: '1.5 inch x 1.5 inch mesh grids' }
    ],
    tiers: []
  },
  {
    id: 'mtc-swm-wm-04',
    name: 'Industrial Structural Welded Wire Grid Panel',
    sku: 'MTC-SWM-WM-04',
    category: 'SS Wire Mesh',
    subType: 'weld mesh',
    description: 'High-strength structural flat mesh grid sheet. Excellent choice for machinery wraps, partition guards, and heavy-duty sorting deck framework support.',
    basePrice: 0,
    moq: 5,
    unit: 'Piece',
    image: 'https://i.ibb.co/99hG6G9X/welded-mesh-500x500.jpg',
    packaging: 'Banded nested sheet packs on heavy wooden pallets',
    weight: '16.8 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Grid Clearance', value: '3 inch x 3 inch solid grid blocks' },
      { label: 'Wire Width', value: '4.0mm heavy gauge wire diameter' },
      { label: 'Corrosion Shield', value: 'Anti-corrosion oil coated steel standard finish' }
    ],
    tiers: []
  },

  // YOGESHWAR COPY - CANDLE FILTER
  {
    id: 'mtc-yc-cf-01',
    name: 'Industrial Premium Candle Filter Element',
    sku: 'YGC-CF-01',
    category: 'Candle Filter & Extruder Screens',
    subType: 'Candle Filter',
    description: 'Highly advanced and brand industrial candle filter element. Crafted with precision mesh wrapping for fine filtration and long operational life under heavy process currents.',
    basePrice: 0,
    moq: 4,
    unit: 'Piece',
    image: 'https://i.ibb.co/4gYrTTtC/candle-filter.png',
    packaging: 'Individually boxed in protective casing',
    weight: '2.5 kg',
    isAvailable: true,
    specifications: [
      { label: 'Filter Element Type', value: 'Precision Mesh Wrapped Candle Design' },
      { label: 'Material Suitability', value: 'Premium Food-Safe AISI 316 Stainless Steel' },
      { label: 'Micron Rating Range', value: '5 μm to 100 μm high precision filtering' }
    ],
    tiers: []
  },
  {
    id: 'mtc-yc-cf-02',
    name: 'Heavy Duty SS Woven Candle Filter Sleeve',
    sku: 'YGC-CF-02',
    category: 'Candle Filter & Extruder Screens',
    subType: 'Candle Filter',
    description: 'Heavy duty SS woven wire cloth sleeve for candle filter systems. Designed to possess high mechanical stability, low pressure drop, and easy clean backwash characteristics.',
    basePrice: 0,
    moq: 4,
    unit: 'Piece',
    image: 'https://i.ibb.co/6JgPWmKh/candle-filter1.jpg',
    packaging: 'Sealed plastic sleeves in robust wooden box packs',
    weight: '1.9 kg',
    isAvailable: true,
    specifications: [
      { label: 'Mesh Composition', value: 'Heavy Grade Double-Weave 316 Stainless Steel' },
      { label: 'Pressure Durability', value: 'Sustains high backwashing pressure spikes' },
      { label: 'Cleaning Adaptability', value: 'Highly recommended for chemical, oil, and flour mills' }
    ],
    tiers: []
  },
  {
    id: 'mtc-yc-cf-03',
    name: 'Multi-Layer Sintered Candle Filter Tube',
    sku: 'YGC-CF-03',
    category: 'Candle Filter & Extruder Screens',
    subType: 'Candle Filter',
    description: 'Premium sintered multi-layer candle filter tube. Built for extreme filtration tasks requiring utmost rigidity, absolute thermal tolerance, and high particulate holding capacity.',
    basePrice: 0,
    moq: 2,
    unit: 'Piece',
    image: 'https://i.ibb.co/DgYwxWxT/candle-filter3.jpg',
    packaging: 'Cushioned single compartment cartons',
    weight: '3.1 kg',
    isAvailable: true,
    specifications: [
      { label: 'Sintering Spec', value: '5-Layer Vacuum Sintered Mesh Structure' },
      { label: 'Alloy Composition', value: 'Inconel / Premium Stainless Steel 316L' },
      { label: 'Maximum Temp Limits', value: 'Up to +450°C continuous heating exposure' }
    ],
    tiers: []
  },

  // YOGESHWAR COPY - EXTRUDER SCREENS
  {
    id: 'mtc-yc-es-01',
    name: 'Premium Circular Extruder Screen Pack',
    sku: 'YGC-ES-01',
    category: 'Candle Filter & Extruder Screens',
    subType: 'Extruder Screen',
    description: 'High performance wire mesh circular extruder screens. Handcrafted to deliver uniform melt filtration of polymers and rubbers in extrusion machinery, preventing foreign debris from spoiling products.',
    basePrice: 0,
    moq: 10,
    unit: 'Pack',
    image: 'https://i.ibb.co/2Y31XBpz/71ktrzgvvll-ac-uf894-1000-ql80-500x500.webp',
    packaging: 'Shrink-wrapped counts of 50 per bag',
    weight: '1.8 kg / pack',
    isAvailable: true,
    specifications: [
      { label: 'Mesh Sizes Combined', value: 'Multi-mesh layout (20 / 40 / 60 / 80 mesh variants)' },
      { label: 'Shape Geometry', value: 'Perfect circular discs without burr edges' },
      { label: 'Metal Core Spec', value: 'Corrosion resistant stainless steel wire' }
    ],
    tiers: []
  },
  {
    id: 'mtc-yc-es-02',
    name: 'Spot Welded Multilayer Extruder Screen Disc',
    sku: 'YGC-ES-02',
    category: 'Candle Filter & Extruder Screens',
    subType: 'Extruder Screen',
    description: 'Premium multilayer extruder screen disc with robust spot-welded borders. Extremely stable under strong shear stress and high polymer melt pressures in plastic reclamation systems.',
    basePrice: 0,
    moq: 10,
    unit: 'Pack',
    image: 'https://i.ibb.co/zHGXS8gR/extruder-screens1.jpg',
    packaging: 'Corrugated cartons with inter-layered paper sheets',
    weight: '2.1 kg / pack',
    isAvailable: true,
    specifications: [
      { label: 'Multilayer Border', value: 'Precision electro-spot welded circumference' },
      { label: 'Mesh Array Design', value: '3-Layer or 5-Layer stacked density mesh' },
      { label: 'Weaving Pattern', value: 'Plain Dutch / Standard reverse weave selection' }
    ],
    tiers: []
  },
  {
    id: 'mtc-yc-es-03',
    name: 'Cylindrical Plastic Extruder Screen Pack',
    sku: 'YGC-ES-03',
    category: 'Candle Filter & Extruder Screens',
    subType: 'Extruder Screen',
    description: 'Cylindrical form multi-layer extruder filter pack. Provides expansive filtration surface area, suitable for continuous blow molding and chemical pipe extrusion lines.',
    basePrice: 0,
    moq: 5,
    unit: 'Pack',
    image: 'https://i.ibb.co/B241ppgQ/extruder-screens-1000x1000.jpg',
    packaging: 'Sealed damp-proof high-grade bubble bags',
    weight: '3.4 kg / pack',
    isAvailable: true,
    specifications: [
      { label: 'Filter Shape', value: 'Cylindrical cartridge profile screen' },
      { label: 'Material Quality', value: 'High purity AISI 304 Stainless Mesh' },
      { label: 'Filtration Absolute', value: 'Strictly graded filtration flow lines' }
    ],
    tiers: []
  },
  {
    id: 'mtc-yc-es-04',
    name: 'Rim-Bound Stainless Steel Extruder Disc',
    sku: 'YGC-ES-04',
    category: 'Candle Filter & Extruder Screens',
    subType: 'Extruder Screen',
    description: 'Architectural-grade premium extruder disc finished with a secure zinc-plated copper rim edge. Eliminates risk of wire fraying or bypass at outer contact boundaries.',
    basePrice: 0,
    moq: 10,
    unit: 'Pack',
    image: 'https://i.ibb.co/pvnGQwfX/product-jpeg-1000x1000.webp',
    packaging: 'Rigid export wood crates with internal nesting partitions',
    weight: '1.7 kg / pack',
    isAvailable: true,
    specifications: [
      { label: 'Rim Material Spec', value: 'Fitted Copper/Aluminum alloy border frame' },
      { label: 'Aperture Geometry', value: 'Fine woven micro mesh filters' },
      { label: 'Operational Level', value: 'Heavy continuous duty polymer lines' }
    ],
    tiers: []
  },
  {
    id: 'mtc-yc-es-05',
    name: 'SS Wire Mesh Extruder Sintered Filter',
    sku: 'YGC-ES-05',
    category: 'Candle Filter & Extruder Screens',
    subType: 'Extruder Screen',
    description: 'Top-tier sintered stainless steel wire mesh filter disc. Ideal for extremely high-viscosity resins, chemical fiber spinning, and premium plastic compounding setups.',
    basePrice: 0,
    moq: 5,
    unit: 'Pack',
    image: 'https://i.ibb.co/kgXPx6BJ/s-s-wire-mesh-filters-1000x1000.jpg',
    packaging: 'Padded impact-absorption box casings',
    weight: '2.5 kg / pack',
    isAvailable: true,
    specifications: [
      { label: 'Structure Sintering', value: 'Multi-layer vacuum bonded wire mesh sheet' },
      { label: 'Maximum Pressure', value: 'Stands up to 350 bar extreme melt pressures' },
      { label: 'Material Quality', value: 'AISI 316L rustproof stainless steel alloy' }
    ],
    tiers: []
  },

  // YOGESHWAR COPY - WELDED MESH
  {
    id: 'mtc-yc-wm-01',
    name: 'Galvanized Welded Mesh Screen Roll',
    sku: 'YGC-WM-01',
    category: 'Candle Filter & Extruder Screens',
    subType: 'Welded Mesh',
    description: 'High durability galvanized woven-looking welded wire mesh roll. Spot-welded at every junction to retain perfect grid spacing under tension, preventing any distortion over time.',
    basePrice: 0,
    moq: 4,
    unit: 'Roll',
    image: 'https://i.ibb.co/JRXDJ7cR/galvanized-wire-mesh-250x250.webp',
    packaging: 'Moisture-proof plastic casing wrapping',
    weight: '15.6 kg / roll',
    isAvailable: true,
    specifications: [
      { label: 'Grid Clearance', value: '0.5 inch x 0.5 inch uniform squares' },
      { label: 'Rust Protection', value: 'Thick pre-galvanized bright coat' },
      { label: 'Tensile Core Standard', value: 'Flexible high-tensile iron wire standard' }
    ],
    tiers: []
  },
  {
    id: 'mtc-yc-wm-02',
    name: 'GI Square Welded Wire Mesh Sheet',
    sku: 'YGC-WM-02',
    category: 'Candle Filter & Extruder Screens',
    subType: 'Welded Mesh',
    description: 'Premium galvanized iron (GI) square welded wire mesh sheet. Rigid build quality with strong double-zinc coating, highly suitable for machine guards, partition fencing, and material grading separators.',
    basePrice: 0,
    moq: 5,
    unit: 'Piece',
    image: 'https://i.ibb.co/1Gf0LBPk/gi-square-welded-wire-mesh.jpg',
    packaging: 'Durable strapped flat packs on wooden pallets',
    weight: '11.8 kg / sheet',
    isAvailable: true,
    specifications: [
      { label: 'Mesh Opening Pattern', value: '1 inch x 1 inch clean grid clearances' },
      { label: 'Galvanizing Method', value: 'Hot-dip galvanized after welding (GAW)' },
      { label: 'Sheet standard dimensions', value: '4ft x 8ft rectangular panels' }
    ],
    tiers: []
  }
];

