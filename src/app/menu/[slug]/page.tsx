'use client';

import React, { use, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Utensils, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { useCartStore } from '@/store/useCartStore';

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  dietary?: string[];
  imageUrl?: string;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export default function QrMenuPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();

  const tableParam = searchParams.get('table') || '1';
  const slug = resolvedParams.slug;

  const { items, addItem, updateQuantity, subtotal, totalCount } = useCartStore();
  const [activeCategory, setActiveCategory] = useState<string>('cat_1');

  // Sample data fallback for the scanned restaurant menu
  const restaurant = {
    id: 'res_sample_1',
    name: 'The Artisan Italian & Pizza Bar',
    slug: slug,
    description: 'Authentic stonebaked sourdough pizza, handmade pasta, and fresh drinks.',
    tableNumber: tableParam,
  };

  const categories: MenuCategory[] = [
    {
      id: 'cat_1',
      name: '🍕 Stonebaked Pizzas',
      items: [
        {
          id: 'item_1',
          name: 'Margherita D.O.P.',
          description: 'San Marzano tomatoes, buffalo mozzarella, fresh basil, extra virgin olive oil.',
          price: 1195,
          dietary: ['Vegetarian'],
          imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 'item_2',
          name: 'Diavola Spicy Salami',
          description: 'Fior di latte, spicy Calabrian spianata, fresh red chillies, hot honey.',
          price: 1395,
          dietary: [],
          imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 'item_3',
          name: 'Truffle & Wild Mushroom',
          description: 'White base, sauteed portobello, white truffle oil, rosemary, parmesan shavings.',
          price: 1450,
          dietary: ['Vegetarian'],
          imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
        },
      ],
    },
    {
      id: 'cat_2',
      name: '🍝 Fresh Handmade Pastas',
      items: [
        {
          id: 'item_4',
          name: 'Slow-Cooked Beef Shin Ragu Tagliatelle',
          description: 'Braised 8 hours in Chianti with rosemary and aged parmesan.',
          price: 1550,
          dietary: [],
        },
        {
          id: 'item_5',
          name: 'Cacio e Pepe Rigatoni',
          description: 'Pecorino Romano, crushed toasted black pepper, silky pasta emulsion.',
          price: 1250,
          dietary: ['Vegetarian'],
        },
      ],
    },
    {
      id: 'cat_3',
      name: '🍷 Drinks & Desserts',
      items: [
        {
          id: 'item_6',
          name: 'House Tiramisu Classico',
          description: 'Savoiardi soaked in espresso and Marsala wine, whipped mascarpone cream.',
          price: 650,
          dietary: ['Vegetarian'],
        },
        {
          id: 'item_7',
          name: 'San Pellegrino Sparkling (500ml)',
          description: 'Sparkling natural Italian mineral water.',
          price: 320,
          dietary: ['Vegan'],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-muted/20 pb-24 lg:pb-12">
      {/* Top Banner with Table Context */}
      <div className="bg-primary text-primary-foreground py-3 px-4 shadow-sm sticky top-0 z-30">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            <span className="font-semibold text-sm">{restaurant.name}</span>
          </div>
          <div className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-wide">
            Table #{tableParam}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">{restaurant.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">{restaurant.description}</p>
        </div>

        {/* Category Pills Header */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === c.id
                  ? 'bg-primary text-primary-foreground shadow'
                  : 'bg-card border border-border text-foreground hover:bg-muted'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Main Grid: Menu Items & Order Summary Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {categories.map((cat) => (
              <section key={cat.id} id={cat.id} className="space-y-4">
                <h2 className="text-xl font-bold text-foreground border-b border-border pb-2">
                  {cat.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cat.items.map((item) => {
                    const inCart = items.find((i) => i.menuItemId === item.id);
                    return (
                      <div
                        key={item.id}
                        className="flex flex-col justify-between p-4 rounded-2xl border border-border bg-card shadow-sm hover:shadow transition-shadow"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-base text-foreground">{item.name}</h3>
                            <span className="font-bold text-primary shrink-0">
                              £{(item.price / 100).toFixed(2)}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                          {item.dietary && item.dietary.length > 0 && (
                            <div className="flex gap-1 mt-2">
                              {item.dietary.map((d) => (
                                <Badge key={d} variant="outline" className="text-[10px] py-0">
                                  {d}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                          {inCart ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(inCart.id, -1)}
                                className="h-8 w-8 rounded-full border border-border flex items-center justify-center hover:bg-muted"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-sm font-bold w-6 text-center">{inCart.quantity}</span>
                              <button
                                onClick={() => updateQuantity(inCart.id, 1)}
                                className="h-8 w-8 rounded-full border border-border flex items-center justify-center hover:bg-muted"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          ) : (
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
                              className="w-full gap-1.5"
                            >
                              <Plus className="h-4 w-4" /> Add
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Sidebar / Desktop Cart Summary */}
          <div className="hidden lg:block">
            <div className="sticky top-20 rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  Your Table Order
                </h3>
                <span className="text-xs bg-muted px-2 py-0.5 rounded font-semibold">
                  Table {tableParam}
                </span>
              </div>

              {items.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground text-sm">
                  <p>Your order is empty.</p>
                  <p className="text-xs mt-1">Tap items from the menu to add them.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                    {items.map((i) => (
                      <div key={i.id} className="flex items-center justify-between text-sm">
                        <div className="flex-1 truncate">
                          <p className="font-medium truncate">{i.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {i.quantity}</p>
                        </div>
                        <span className="font-semibold ml-2">
                          £{((i.price * i.quantity) / 100).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-border space-y-1.5 text-sm">
                    <div className="flex justify-between font-bold text-base">
                      <span>Total</span>
                      <span>£{(subtotal() / 100).toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => router.push(`/checkout?table=${tableParam}`)}
                    className="w-full gap-2 mt-4"
                    size="lg"
                  >
                    Place Table Order
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      {totalCount() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border lg:hidden z-40">
          <Button
            onClick={() => router.push(`/checkout?table=${tableParam}`)}
            className="w-full flex items-center justify-between py-6"
            size="lg"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                {totalCount()}
              </span>
              <span>View Order</span>
            </div>
            <span className="font-bold">£{(subtotal() / 100).toFixed(2)}</span>
          </Button>
        </div>
      )}
    </div>
  );
}
