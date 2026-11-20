'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { Utensils, Star, Clock, Bike, ArrowLeft, QrCode } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { useCartStore } from '@/store/useCartStore';

export default function RestaurantDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const { addItem } = useCartStore();

  const restaurant = {
    id: 'res_1',
    name: 'The Artisan Sourdough Pizza',
    slug,
    description: 'Speciality Neapolitan pizza baked in high-temp wood stone oven with artisanal ingredients.',
    rating: 4.9,
    reviewCount: 340,
    deliveryTimeMin: 20,
    deliveryTimeMax: 35,
    minimumOrder: 1500,
    deliveryFee: 199,
    cuisines: ['Pizza', 'Italian', 'Vegetarian'],
    menu: [
      {
        category: 'Wood-fired Pizza',
        items: [
          {
            id: 'item_pizza_1',
            name: 'Margherita D.O.P.',
            description: 'San Marzano tomatoes, buffalo mozzarella, fresh basil, extra virgin olive oil.',
            price: 1195,
          },
          {
            id: 'item_pizza_2',
            name: 'Diavola Hot Honey',
            description: 'Spicy Calabrian spianata salami, fior di latte, hot honey drizzle.',
            price: 1395,
          },
        ],
      },
      {
        category: 'Sides & Drinks',
        items: [
          {
            id: 'item_side_1',
            name: 'Garlic Rosemary Sourdough Focaccia',
            description: 'Drizzled with sea salt and rosemary oil.',
            price: 550,
          },
          {
            id: 'item_side_2',
            name: 'San Pellegrino Blood Orange',
            description: '330ml can.',
            price: 295,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Header Banner */}
      <div className="bg-muted/40 border-b border-border py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Back to restaurants
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{restaurant.name}</h1>
              <p className="text-sm text-muted-foreground mt-1 max-w-xl">{restaurant.description}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1 font-semibold text-foreground">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span>{restaurant.rating}</span>
                  <span className="text-xs text-muted-foreground">({restaurant.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{restaurant.deliveryTimeMin}-{restaurant.deliveryTimeMax} mins</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bike className="h-4 w-4" />
                  <span>£{(restaurant.deliveryFee / 100).toFixed(2)} delivery</span>
                </div>
              </div>
            </div>

            <Link href={`/menu/${slug}?table=1`}>
              <Button variant="outline" className="gap-2">
                <QrCode className="h-4 w-4" /> Dine-in QR Menu
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8 max-w-4xl">
          {restaurant.menu.map((section) => (
            <div key={section.category} className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">{section.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between p-4 rounded-xl border border-border bg-card shadow-sm"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <span className="font-bold text-primary">£{(item.price / 100).toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() =>
                        addItem({
                          menuItemId: item.id,
                          name: item.name,
                          price: item.price,
                          quantity: 1,
                          restaurantId: restaurant.id,
                        })
                      }
                      className="mt-4 self-end"
                    >
                      Add to Cart
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
