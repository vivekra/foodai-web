'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';

const cuisines = [
  { label: 'Pizza', emoji: '🍕' },
  { label: 'Burgers', emoji: '🍔' },
  { label: 'Chinese', emoji: '🍜' },
  { label: 'Indian', emoji: '🍛' },
  { label: 'Mexican', emoji: '🌮' },
  { label: 'Sushi', emoji: '🍣' },
  { label: 'Healthy', emoji: '🥗' },
];

export function Hero() {
  const [postcode, setPostcode] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode.trim()) return;
    router.push(`/restaurants?postcode=${encodeURIComponent(postcode.trim())}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-orange-50 via-amber-50/50 to-background dark:from-orange-950/20 dark:via-background dark:to-background px-4 py-20 overflow-hidden">
      <motion.div
        className="container mx-auto max-w-4xl text-center space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-semibold tracking-wide uppercase">
          <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
          AI-Powered UK Food Delivery &amp; Dine-in
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
          Discover &amp; Order <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
            From the Best Restaurants Near You
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          AI-powered ordering — search, chat, voice. Food, your way.
        </motion.p>

        {/* Postcode Search */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto bg-card p-2 rounded-2xl shadow-xl shadow-orange-500/5 border border-border"
        >
          <div className="flex items-center gap-3 w-full px-4 py-2">
            <MapPin className="h-5 w-5 text-orange-500 shrink-0" />
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="Enter your UK postcode (e.g. SW1A 1AA)..."
              className="w-full bg-transparent text-sm md:text-base outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto shrink-0 gap-2 font-semibold">
            Find Food
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.form>

        {/* Cuisine Quick Filters */}
        <motion.div variants={itemVariants} className="pt-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
            Popular Cuisines
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {cuisines.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => router.push(`/restaurants?cuisine=${encodeURIComponent(c.label)}`)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-background border border-border hover:border-orange-500 hover:text-orange-600 text-sm font-medium transition-all shadow-sm active:scale-95"
              >
                <span>{c.emoji}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
