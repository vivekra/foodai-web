import { z } from 'zod';

export const UKPhoneSchema = z
  .string()
  .regex(/^\+44[0-9]{9,10}$/, 'Must be a valid UK phone number starting with +44');

export const UKPostcodeSchema = z
  .string()
  .regex(/^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i, 'Invalid UK postcode');

export const RegisterSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-d@$!%*?&]/,
      'Password must contain uppercase, lowercase, number, and special character'
    ),
  phone: UKPhoneSchema.optional(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const CreateRestaurantSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  description: z.string().max(1000).optional(),
  addressLine1: z.string().min(5).max(200),
  addressLine2: z.string().max(200).optional(),
  city: z.string().min(2).max(100),
  postcode: UKPostcodeSchema,
  phone: UKPhoneSchema.optional(),
  whatsappNumber: UKPhoneSchema.optional(),
  email: z.string().email().optional(),
  cuisineType: z.array(z.string()).min(1),
});

export const CreateMenuItemSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  basePrice: z.number().positive().max(9999),
  categoryId: z.string().cuid(),
  calories: z.number().int().positive().optional(),
  ingredients: z.array(z.string()).default([]),
  dietary: z.array(z.string()).default([]),
  allergens: z.array(z.string()).default([]),
  spiceLevel: z.number().int().min(0).max(5).default(0),
  sizes: z.array(z.object({
    name: z.string().min(1),
    priceModifier: z.number(),
  })).default([]),
  addons: z.array(z.object({
    name: z.string().min(1),
    price: z.number().min(0),
    required: z.boolean().default(false),
    multiSelect: z.boolean().default(false),
    options: z.array(z.object({
      name: z.string().min(1),
      price: z.number().min(0),
    })).default([]),
  })).default([]),
});

export const CreateOrderSchema = z.object({
  restaurantId: z.string().cuid(),
  orderType: z.enum(['QR_TABLE', 'COUNTER', 'DELIVERY', 'COLLECTION', 'VOICE', 'AI_CHAT']),
  tableId: z.string().cuid().optional(),
  items: z.array(z.object({
    menuItemId: z.string().cuid(),
    quantity: z.number().int().min(1).max(99),
    selectedSize: z.object({
      name: z.string(),
      priceModifier: z.number(),
    }).optional(),
    selectedAddons: z.array(z.object({
      name: z.string(),
      price: z.number(),
    })).default([]),
    notes: z.string().max(500).optional(),
  })).min(1),
  deliveryAddress: z.object({
    line1: z.string().min(5),
    line2: z.string().optional(),
    city: z.string(),
    postcode: UKPostcodeSchema,
    contactName: z.string(),
    contactPhone: UKPhoneSchema,
  }).optional(),
  specialInstructions: z.string().max(1000).optional(),
});

export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const UpdatePricingSchema = z.object({
  freeCommissionRate: z.number().min(0).max(100),
  starterCommissionRate: z.number().min(0).max(100),
  proCommissionRate: z.number().min(0).max(100),
  enterpriseCommissionRate: z.number().min(0).max(100),
  voiceSurchargeRate: z.number().min(0).max(100),
  changeReason: z.string().min(10).max(500),
});

export const DeliveryConfigSchema = z.object({
  provider: z.enum(['uber_direct', 'stuart', 'deliveroo_express', 'gophr', 'shipday']),
  isEnabled: z.boolean(),
  mode: z.enum(['platform', 'byok']).default('platform'),
  clientId: z.string().optional(),
  clientSecret: z.string().optional(),
  apiKey: z.string().optional(),
  customerId: z.string().optional(),
});

// Export types
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type CreateRestaurantInput = z.infer<typeof CreateRestaurantSchema>;
export type CreateMenuItemInput = z.infer<typeof CreateMenuItemSchema>;
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type PaginationInput = z.infer<typeof PaginationSchema>;
export type UpdatePricingInput = z.infer<typeof UpdatePricingSchema>;
export type DeliveryConfigInput = z.infer<typeof DeliveryConfigSchema>;
