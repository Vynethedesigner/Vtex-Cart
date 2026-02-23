export interface CartItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  unitPrice: string;
  quantity: number;
  image: string;
  supplierId: string;
}

export interface Supplier {
  id: string;
  name: string;
  minimumOrderValue: number;
  currentTotal: number;
  items: CartItem[];
}

export interface SuggestedItem {
  id: string;
  supplier: string;
  name: string;
  description: string;
  price: number;
  unitPrice: string;
  image: string;
}

export interface CouponState {
  isExpanded: boolean;
  code: string;
  status: 'idle' | 'typing' | 'invalid' | 'applied';
  discount?: number;
  discountPercent?: number;
}

export type CartView = 'main' | 'supplier-review';

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'error' | 'info';
  action?: { label: string; onClick: () => void };
}
