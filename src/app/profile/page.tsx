'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  MapPin,
  Clock,
  Star,
  ShoppingBag,
  Phone,
  Mail,
  ShieldCheck,
  ChevronRight,
  Plus,
  RotateCcw,
} from 'lucide-react';
import { Button, Input, Badge } from '@/components/ui';
import { toast } from 'sonner';

interface OrderHistoryItem {
  id: string;
  orderNumber: string;
  restaurantName: string;
  restaurantSlug: string;
  date: string;
  totalGbp: number;
  status: 'DELIVERED' | 'CANCELLED';
  itemsSummary: string;
  hasReviewed: boolean;
}

const SAMPLE_ORDERS: OrderHistoryItem[] = [
  {
    id: 'ord_910',
    orderNumber: '#A910',
    restaurantName: 'The Artisan Italian & Pizza Bar',
    restaurantSlug: 'the-artisan-pizza',
    date: '18 Nov 2026, 19:42',
    totalGbp: 24.5,
    status: 'DELIVERED',
    itemsSummary: '1x Margherita D.O.P., 1x Diavola Spicy Salami, 2x San Pellegrino',
    hasReviewed: false,
  },
  {
    id: 'ord_845',
    orderNumber: '#A845',
    restaurantName: 'Bombay Spice Kitchen',
    restaurantSlug: 'bombay-spice-kitchen',
    date: '12 Nov 2026, 20:15',
    totalGbp: 31.0,
    status: 'DELIVERED',
    itemsSummary: '2x Chicken Tikka Masala, 2x Garlic Naan, 1x Pilau Rice',
    hasReviewed: true,
  },
];

export default function CustomerProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('orders');
  const [reviewModalOrder, setReviewModalOrder] = useState<OrderHistoryItem | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const [profile, setProfile] = useState({
    name: 'Alex Morgan',
    email: 'alex.morgan@example.co.uk',
    phone: '+44 7911 123456',
  });

  const [addresses, setAddresses] = useState([
    {
      id: 'addr_1',
      label: 'Home',
      line1: '42 Baker Street',
      city: 'London',
      postcode: 'NW1 6XE',
      isDefault: true,
    },
    {
      id: 'addr_2',
      label: 'Office',
      line1: '100 Bishopsgate, Floor 14',
      city: 'London',
      postcode: 'EC2N 4AG',
      isDefault: false,
    },
  ]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile information updated successfully');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Thank you! Your ${rating}-star review has been posted.`);
    setReviewModalOrder(null);
    setComment('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-6">
          <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">
            AM
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-sm text-gray-500">{profile.email} • {profile.phone}</p>
          </div>
          <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" /> Verified Customer
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === 'orders'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Past Orders
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === 'addresses'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Saved Addresses
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Personal Details
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {SAMPLE_ORDERS.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-50 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">{order.restaurantName}</h3>
                      <Badge variant="outline" className="text-xs">
                        {order.orderNumber}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-gray-900">£{order.totalGbp.toFixed(2)}</span>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      Delivered
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600">{order.itemsSummary}</p>

                <div className="flex items-center justify-end gap-3 pt-2">
                  {!order.hasReviewed && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setReviewModalOrder(order)}
                      className="text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                      Rate & Review
                    </Button>
                  )}
                  <Link href={`/restaurants/${order.restaurantSlug}`}>
                    <Button size="sm" className="text-xs font-semibold flex items-center gap-1.5">
                      <RotateCcw className="h-3.5 w-3.5" /> Re-order
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={() => toast.info('Add new address modal')}
                className="flex items-center gap-1 text-xs"
              >
                <Plus className="h-4 w-4" /> Add New Address
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-primary" /> {addr.label}
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{addr.line1}</p>
                  <p className="text-xs text-gray-600">{addr.city}, {addr.postcode}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Profile */}
        {activeTab === 'profile' && (
          <form
            onSubmit={handleSaveProfile}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm max-w-xl space-y-4"
          >
            <div>
              <label className="text-xs font-bold text-gray-700">Full Name</label>
              <Input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="mt-1"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700">Email Address</label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="mt-1"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700">UK Mobile Phone</label>
              <Input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="mt-1"
                required
              />
            </div>
            <Button type="submit" className="mt-2">
              Save Changes
            </Button>
          </form>
        )}
      </div>

      {/* Review Modal */}
      {reviewModalOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-bold text-lg text-gray-900">
              Rate your meal from {reviewModalOrder.restaurantName}
            </h3>

            {/* Stars */}
            <div className="flex items-center justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'
                    }`}
                  />
                </button>
              ))}
            </div>

            <textarea
              placeholder="What did you love? How was the delivery and food quality?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-28 p-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-primary resize-none"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setReviewModalOrder(null)}>
                Cancel
              </Button>
              <Button onClick={handleReviewSubmit}>Submit Review</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
