'use client';

import React from 'react';
import useSWR from 'swr';
import { RestaurantCard, RestaurantItem } from './RestaurantCard';
import { Skeleton } from '@/components/ui';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    // Return sample mock data if API is not yet running or returns 404
    return {
      data: [
        {
          id: 'res_1',
          name: 'The Artisan Sourdough Pizza',
          slug: 'the-artisan-pizza',
          coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
          rating: 4.9,
          reviewCount: 340,
          deliveryTimeMin: 20,
          deliveryTimeMax: 35,
          minimumOrder: 1500,
          deliveryFee: 199,
          cuisineType: ['Pizza', 'Italian', 'Vegetarian'],
          isAiVoiceEnabled: true,
        },
        {
          id: 'res_2',
          name: 'Bombay Spice Kitchen',
          slug: 'bombay-spice-kitchen',
          coverImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
          rating: 4.8,
          reviewCount: 512,
          deliveryTimeMin: 30,
          deliveryTimeMax: 45,
          minimumOrder: 2000,
          deliveryFee: 249,
          cuisineType: ['Indian', 'Curry', 'Halal'],
          isAiVoiceEnabled: true,
        },
        {
          id: 'res_3',
          name: 'Tokyo Gourmet Ramen & Sushi',
          slug: 'tokyo-gourmet',
          coverImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
          rating: 4.9,
          reviewCount: 289,
          deliveryTimeMin: 25,
          deliveryTimeMax: 40,
          minimumOrder: 1800,
          deliveryFee: 0,
          cuisineType: ['Japanese', 'Sushi', 'Ramen'],
          isAiVoiceEnabled: false,
        },
        {
          id: 'res_4',
          name: 'Smash & Shake Burger Lab',
          slug: 'smash-shake-burgers',
          coverImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
          rating: 4.7,
          reviewCount: 410,
          deliveryTimeMin: 15,
          deliveryTimeMax: 30,
          minimumOrder: 1200,
          deliveryFee: 149,
          cuisineType: ['Burgers', 'American', 'Shakes'],
          isAiVoiceEnabled: true,
        },
      ],
    };
  }
  return res.json();
};

export function FeaturedRestaurants() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const { data, error, isLoading } = useSWR(
    `${apiUrl}/api/v1/restaurants?featured=true`,
    fetcher,
    { revalidateOnFocus: false }
  );

  const restaurants: RestaurantItem[] = data?.data || [];

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Featured Restaurants
          </h2>
          <p className="text-sm text-muted-foreground">
            Top-rated local favorites with fast UK delivery
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="rounded-2xl border border-border bg-card p-4 space-y-4">
              <div className="h-44 w-full bg-muted rounded-xl animate-pulse" />
              <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </section>
  );
}
