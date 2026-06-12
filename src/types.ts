export interface PriceTier {
  minQty: number;
  discountPercent: number; // e.g. 10 for 10%
}

export interface Specification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  subType?: string; // e.g. Conveyor Belt, Cotton, Cotton-Nylon, Nylon, PVC Belt, Synthetic Elevator Belt, V Balt
  description: string;
  basePrice: number; // price per unit for standard wholesale
  moq: number; // Minimum Order Quantity
  unit: string; // e.g., 'Box', 'Reel', 'Kg', 'Pack'
  image: string;
  specifications: Specification[];
  isAvailable: boolean;
  tiers: PriceTier[]; // Wholesale price breakdown
  packaging: string; // e.g., "50 units/carton"
  weight: string; // e.g., "12.5 kg/carton"
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WholesaleInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  businessType: 'Wholesale Distributor' | 'Retail Shop' | 'Construction/Contractor' | 'Industrial Enterprise' | 'Other';
  gstNumber?: string; // Standard commercial registration (e.g. GSTIN in India)
  preferredShipping: 'Standard Freight' | 'Express Air' | 'Self Pickup / Warehouse Lorry';
  comment: string;
  items: {
    productId: string;
    productName: string;
    sku: string;
    quantity: number;
    unitPrice: number;
    discountApplied: number;
    totalPrice: number;
  }[];
  totalInquiryValue: number;
  status: 'Pending Review' | 'Quotation Sent' | 'Order Confirmed' | 'Archived';
  createdAt: string;
  ipAddress?: string;
  ipLocation?: string;
}
