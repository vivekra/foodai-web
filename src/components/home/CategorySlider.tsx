'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All', emoji: '🍽️' },
  { id: 'pizza', label: 'Pizza', emoji: '🍕' },
  { id: 'burgers', label: 'Burgers', emoji: '🍔' },
  { id: 'chinese', label: 'Chinese', emoji: '🍜' },
  { id: 'indian', label: 'Indian', emoji: '🍛' },
  { id: 'sushi', label: 'Sushi', emoji: '🍣' },
  { id: 'mexican', label: 'Mexican', emoji: '🌮' },
  { id: 'kebabs', label: 'Kebabs', emoji: '🥙' },
  { id: 'thai', label: 'Thai', emoji: '🍲' },
  { id: 'italian', label: 'Italian', emoji: '🍝' },
  { id: 'healthy', label: 'Healthy & Salads', emoji: '🥗' },
  { id: 'desserts', label: 'Desserts', emoji: '🍰' },
  { id: 'breakfast', label: 'Breakfast', emoji: '🥐' },
  { id: 'coffee', label: 'Coffee & Drinks', emoji: '☕' },
];

export function CategorySlider() {
  const [activeCategory, setActiveCategory] = useState('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -250 : 250;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Explore by Category
          </h2>
          <p className="text-sm text-muted-foreground">Find what you crave right now</p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full border border-border hover:bg-muted text-foreground transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full border border-border hover:bg-muted text-foreground transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center justify-center min-w-[90px] md:min-w-[105px] h-24 rounded-2xl border px-3 py-2 transition-all ${
                isActive
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 font-semibold shadow-sm'
                  : 'border-border bg-card text-muted-foreground hover:border-orange-200 hover:text-foreground'
              }`}
            >
              <span className="text-3xl mb-1.5">{cat.emoji}</span>
              <span className="text-xs text-center truncate w-full">{cat.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
