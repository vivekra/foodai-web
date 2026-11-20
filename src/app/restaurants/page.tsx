'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Filter,
  Star,
  Clock,
  Bike,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  MapPin,
  Check,
} from 'lucide-react';
import { Button, Input, Badge } from '@/components/ui';

interface Restaurant {
  id: string;
  name: string;
  slug: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  deliveryTimeMins: string;
  deliveryFeeGbp: number;
  minOrderGbp: number;
  dietary: string[];
  imageUrl: string;
  isFeatured?: boolean;
}

const SAMPLE_RESTAURANTS: Restaurant[] = [
  {
    id: 'res_1',
    name: 'The Artisan Italian & Pizza Bar',
    slug: 'the-artisan-pizza',
    cuisine: ['Italian', 'Pizza'],
    rating: 4.9,
    reviewCount: 342,
    deliveryTimeMins: '20-30',
    deliveryFeeGbp: 1.99,
    minOrderGbp: 12.0,
    dietary: ['Vegetarian', 'Vegan Options'],
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
  },
  {
    id: 'res_2',
    name: 'Bombay Spice Kitchen',
    slug: 'bombay-spice-kitchen',
    cuisine: ['Indian', 'Curry'],
    rating: 4.8,
    reviewCount: 289,
    deliveryTimeMins: '25-40',
    deliveryFeeGbp: 2.49,
    minOrderGbp: 15.0,
    dietary: ['Halal', 'Vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
  },
  {
    id: 'res_3',
    name: 'Smash & Bun Gourmet Burgers',
    slug: 'smash-bun-burgers',
    cuisine: ['Burgers', 'American'],
    rating: 4.7,
    reviewCount: 195,
    deliveryTimeMins: '15-25',
    deliveryFeeGbp: 1.49,
    minOrderGbp: 10.0,
    dietary: ['Halal'],
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'res_4',
    name: 'Sakura Sushi & Ramen Bar',
    slug: 'sakura-sushi',
    cuisine: ['Japanese', 'Sushi'],
    rating: 4.9,
    reviewCount: 412,
    deliveryTimeMins: '30-45',
    deliveryFeeGbp: 2.99,
    minOrderGbp: 18.0,
    dietary: ['Gluten-Free', 'Vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'res_5',
    name: 'Tacos Del Fuego',
    slug: 'tacos-del-fuego',
    cuisine: ['Mexican', 'Street Food'],
    rating: 4.6,
    reviewCount: 147,
    deliveryTimeMins: '20-30',
    deliveryFeeGbp: 1.99,
    minOrderGbp: 12.0,
    dietary: ['Halal', 'Gluten-Free'],
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'res_6',
    name: 'Green Leaf Vegan Bowls',
    slug: 'green-leaf-bowls',
    cuisine: ['Healthy', 'Salads'],
    rating: 4.8,
    reviewCount: 178,
    deliveryTimeMins: '15-25',
    deliveryFeeGbp: 0.99,
    minOrderGbp: 10.0,
    dietary: ['Vegan', 'Gluten-Free'],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
  },
];

const CUISINES = ['All', 'Pizza', 'Indian', 'Burgers', 'Sushi', 'Mexican', 'Healthy'];
const DIETARY_TAGS = ['Halal', 'Vegetarian', 'Vegan', 'Gluten-Free'];

export default function BrowseRestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'rating' | 'time' | 'minOrder'>('rating');

  const toggleDietary = (tag: string) => {
    setSelectedDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredRestaurants = SAMPLE_RESTAURANTS.filter((res) => {
    // Search query match
    if (
      searchQuery &&
      !res.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !res.cuisine.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }
    // Cuisine match
    if (selectedCuisine !== 'All' && !res.cuisine.includes(selectedCuisine)) {
      return false;
    }
    // Dietary match
    if (
      selectedDietary.length > 0 &&
      !selectedDietary.every((d) => res.dietary.some((rd) => rd.includes(d)))
    ) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'minOrder') return a.minOrderGbp - b.minOrderGbp;
    return 0;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Top Search & Filter Bar */}
      <div className="border-b border-gray-100 bg-white sticky top-16 z-20 backdrop-blur-md bg-white/95">
        <div className="container mx-auto px-4 py-4 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search restaurants, cuisines, or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-gray-50 border-gray-200 rounded-full text-sm focus-visible:ring-primary"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'time' | 'minOrder')}
                className="h-11 px-4 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:border-primary"
              >
                <option value="rating">Top Rated ⭐</option>
                <option value="time">Fastest Delivery ⚡</option>
                <option value="minOrder">Lowest Minimum Order 💰</option>
              </select>
            </div>
          </div>

          {/* Cuisine Pill Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CUISINES.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCuisine === cuisine
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cuisine}
              </button>
            ))}
            <div className="h-4 w-px bg-gray-200 mx-1 shrink-0" />
            {/* Dietary Tags */}
            {DIETARY_TAGS.map((tag) => {
              const active = selectedDietary.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleDietary(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all flex items-center gap-1 ${
                    active
                      ? 'border-green-600 bg-green-50 text-green-700 font-semibold'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {active && <Check className="h-3 w-3" />}
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-900">
            {selectedCuisine === 'All' ? 'All Restaurants' : `${selectedCuisine} Restaurants`}
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({filteredRestaurants.length} available)
            </span>
          </h1>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-200 rounded-3xl p-8 max-w-md mx-auto space-y-3">
            <Search className="h-10 w-10 text-gray-300 mx-auto" />
            <h3 className="font-bold text-gray-800">No restaurants found</h3>
            <p className="text-sm text-gray-500">
              Try adjusting your search terms, cuisine filters, or dietary preferences.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCuisine('All');
                setSelectedDietary([]);
              }}
              className="mt-2"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((res) => (
              <Link
                key={res.id}
                href={`/restaurants/${res.slug}`}
                className="group block rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image & Badges */}
                <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={res.imageUrl}
                    alt={res.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {res.isFeatured && (
                    <span className="absolute top-3 left-3 bg-primary text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> Featured
                    </span>
                  )}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
                    <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {res.deliveryTimeMins} mins
                    </span>
                    <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Bike className="h-3.5 w-3.5" /> £{res.deliveryFeeGbp.toFixed(2)} delivery
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                      {res.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md text-xs font-bold shrink-0">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>{res.rating}</span>
                      <span className="text-gray-400 font-normal">({res.reviewCount})</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500">{res.cuisine.join(' • ')}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-xs text-gray-500">
                    <span>Min. order £{res.minOrderGbp.toFixed(2)}</span>
                    <div className="flex items-center gap-1">
                      {res.dietary.map((d) => (
                        <span
                          key={d}
                          className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px] font-medium"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
