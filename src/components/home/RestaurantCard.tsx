'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, Bike, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui';

export interface RestaurantItem {
  id: string;
  name: string;
  slug: string;
  coverImage?: string | null;
  logoImage?: string | null;
  rating?: number;
  reviewCount?: number;
  deliveryTimeMin?: number;
  deliveryTimeMax?: number;
  minimumOrder?: number;
  deliveryFee?: number;
  cuisineType: string[];
  isAiVoiceEnabled?: boolean;
}

export function RestaurantCard({ restaurant }: { restaurant: RestaurantItem }) {
  const rating = restaurant.rating || 4.7;
  const reviewCount = restaurant.reviewCount || 120;
  const timeEst = `${restaurant.deliveryTimeMin || 25}-${restaurant.deliveryTimeMax || 40} mins`;
  const minOrder = restaurant.minimumOrder ? `£${(restaurant.minimumOrder / 100).toFixed(2)} min` : 'No min';
  const deliveryFee = restaurant.deliveryFee ? `£${(restaurant.deliveryFee / 100).toFixed(2)} delivery` : 'Free delivery';

  return (
    <Link href={`/restaurants/${restaurant.slug}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Cover Image Container */}
        <div className="relative h-48 w-full bg-muted overflow-hidden">
          {restaurant.coverImage ? (
            <Image
              src={restaurant.coverImage}
              alt={restaurant.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-400 to-amber-500 text-white font-bold text-2xl">
              {restaurant.name.slice(0, 2).toUpperCase()}
            </div>
          )}

          {/* Badges on image */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {restaurant.isAiVoiceEnabled && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-primary-foreground shadow">
                <Sparkles className="h-3 w-3" />
                AI Voice
              </span>
            )}
          </div>

          <div className="absolute bottom-3 right-3 rounded-lg bg-background/90 backdrop-blur px-2 py-1 text-xs font-semibold text-foreground shadow flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            {timeEst}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 shrink-0 rounded-md bg-amber-500/10 px-1.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>{rating.toFixed(1)}</span>
              <span className="text-[10px] text-muted-foreground font-normal">({reviewCount})</span>
            </div>
          </div>

          {/* Cuisines */}
          <div className="flex flex-wrap gap-1">
            {restaurant.cuisineType.slice(0, 3).map((cuisine) => (
              <Badge key={cuisine} variant="secondary" className="text-[11px] font-normal py-0">
                {cuisine}
              </Badge>
            ))}
          </div>

          {/* Metadata footer */}
          <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bike className="h-3.5 w-3.5" />
              <span>{deliveryFee}</span>
            </div>
            <span>{minOrder}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
