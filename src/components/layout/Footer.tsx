import React from 'react';
import Link from 'next/link';
import { UtensilsCrossed } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <UtensilsCrossed className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                Food<span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Next-generation UK food delivery and ordering powered by AI voice agents, live tracking, and seamless table ordering.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Discover</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/restaurants" className="hover:text-foreground transition-colors">
                  All Restaurants
                </Link>
              </li>
              <li>
                <Link href="/cuisines" className="hover:text-foreground transition-colors">
                  Popular Cuisines
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-foreground transition-colors">
                  Exclusive Deals
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-foreground transition-colors">
                  Track Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Business & Partners */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">For Restaurants</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="http://localhost:3002" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                  Partner with FoodAI
                </a>
              </li>
              <li>
                <a href="http://localhost:3002/pricing" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                  Merchant Pricing
                </a>
              </li>
              <li>
                <a href="http://localhost:3003" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                  Kitchen Display System
                </a>
              </li>
              <li>
                <Link href="/voice-ordering" className="hover:text-foreground transition-colors">
                  AI Voice Agent Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal & Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2025 FoodAI Ltd. Registered in England & Wales. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Prices include UK VAT where applicable</span>
            <span>Secured with Stripe Connect</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
