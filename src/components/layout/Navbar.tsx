'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UtensilsCrossed, Search, ShoppingBag, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui';
import { useCartStore } from '@/store/useCartStore';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const totalCount = useCartStore((state) => state.totalCount());

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/20">
            <UtensilsCrossed className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Food<span className="text-primary">AI</span>
          </span>
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search restaurants or cuisines..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 px-10 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Desktop Nav Links & Actions */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/restaurants"
            className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            Browse Food
          </Link>
          <Link
            href="/profile"
            className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            Orders & Profile
          </Link>

          {/* Cart Icon */}
          <Link href="/checkout" className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ShoppingBag className="h-5 w-5" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white animate-in zoom-in">
                {totalCount}
              </span>
            )}
          </Link>

          {/* Sign In / Account Link */}
          <Link href="/profile">
            <Button variant="outline" size="sm" className="gap-2 text-xs font-bold rounded-full">
              <User className="h-4 w-4" />
              Account
            </Button>
          </Link>
        </nav>

        {/* Mobile Actions & Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Link href="/checkout" className="relative p-2 text-gray-600">
            <ShoppingBag className="h-5 w-5" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                {totalCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-100 bg-white px-4 py-4 space-y-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search restaurants or cuisines..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 px-10 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href="/restaurants"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Browse Food
            </Link>
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              My Orders & Profile
            </Link>
            <Link
              href="/checkout"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Checkout Cart ({totalCount} items)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
