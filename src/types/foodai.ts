// User & Auth
export type UserRole = 'SUPER_ADMIN' | 'RESTAURANT_OWNER' | 'RESTAURANT_STAFF' | 'CUSTOMER';
export type SubscriptionPlan = 'FREE' | 'STARTER' | 'PRO' | 'ENTERPRISE';
export type StaffRole = 'OWNER' | 'MANAGER' | 'STAFF' | 'KITCHEN';

// Orders
export type OrderStatus = 'PENDING' | 'ACCEPTED' | 'PREPARING' | 'READY' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED' | 'REJECTED';
export type OrderType = 'QR_TABLE' | 'COUNTER' | 'DELIVERY' | 'COLLECTION' | 'VOICE' | 'AI_CHAT';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'PARTIAL_REFUND';

// Delivery
export type DeliveryStatus = 'PENDING' | 'SEARCHING' | 'DRIVER_ASSIGNED' | 'PICKED_UP' | 'DELIVERED' | 'FAILED' | 'CANCELLED';
export type DeliveryProvider = 'uber_direct' | 'stuart' | 'deliveroo_express' | 'gophr' | 'shipday';

// Notifications
export type NotificationType = 'ORDER_PLACED' | 'ORDER_ACCEPTED' | 'ORDER_REJECTED' | 'ORDER_READY' | 'ORDER_OUT_FOR_DELIVERY' | 'ORDER_DELIVERED' | 'PAYMENT_RECEIVED' | 'PAYMENT_LINK_SENT' | 'NEW_REVIEW' | 'LOW_STOCK' | 'SYSTEM';

// Address
export interface Address {
  line1: string;
  line2?: string;
  city: string;
  postcode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  contactName: string;
  contactPhone: string;
}

// Menu
export interface MenuItemSize {
  name: string;
  priceModifier: number;
}

export interface MenuItemAddonOption {
  name: string;
  price: number;
}

export interface MenuItemAddon {
  name: string;
  price: number;
  required: boolean;
  multiSelect: boolean;
  options: MenuItemAddonOption[];
}

// Delivery Abstractions
export interface DeliveryQuoteRequest {
  pickup: Address;
  dropoff: Address;
  items?: Array<{ name: string; quantity: number }>;
}

export interface DeliveryQuote {
  provider: DeliveryProvider;
  priceGbp: number;
  etaMinutes: number;
  quoteId: string;
}

export interface CreateDeliveryRequest {
  quoteId?: string;
  orderId: string;
  pickup: Address;
  dropoff: Address;
  customerPhone: string;
  notes?: string;
  items?: Array<{ name: string; quantity: number }>;
}

export interface DeliveryResult {
  jobId: string;
  trackingUrl?: string;
  estimatedPickupAt?: Date;
  estimatedDropoffAt?: Date;
}

// The delivery provider interface — all providers implement this
export interface IDeliveryProvider {
  getQuote(request: DeliveryQuoteRequest): Promise<DeliveryQuote>;
  createDelivery(request: CreateDeliveryRequest): Promise<DeliveryResult>;
  cancelDelivery(jobId: string): Promise<void>;
  getStatus(jobId: string): Promise<DeliveryStatus>;
}

// API Response shapes
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Commission calculation result
export interface CommissionResult {
  subtotal: number;
  platformFee: number;
  voiceSurcharge: number;
  restaurantAmount: number;
  total: number;
  commissionRate: number;
  voiceRate: number;
}

// Voice agent
export type VoiceAgentScope = 'menu:read' | 'orders:write';

export interface VoiceAgentJwtPayload {
  restaurantId: string;
  scope: VoiceAgentScope[];
  callSid: string;
  exp: number;
  iat: number;
}

// Socket.io events
export interface KitchenOrderEvent {
  orderId: string;
  orderNumber: string;
  status: OrderStatus;
  orderType: OrderType;
  items: Array<{ name: string; quantity: number; notes?: string }>;
  specialInstructions?: string;
  estimatedPrepTime?: number;
  placedByAI: boolean;
  createdAt: string;
}
