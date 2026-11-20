'use client';

import React, { use, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { CheckCircle2, Clock, MapPin, ChefHat, Bike, AlertCircle, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui';

type OrderStatus = 'PENDING' | 'ACCEPTED' | 'PREPARING' | 'READY' | 'OUT_FOR_DELIVERY' | 'DELIVERED';

const steps: { key: OrderStatus; label: string; icon: React.ElementType }[] = [
  { key: 'PENDING', label: 'Order Placed', icon: ShoppingBag },
  { key: 'ACCEPTED', label: 'Accepted by Kitchen', icon: CheckCircle2 },
  { key: 'PREPARING', label: 'Cooking & Preparing', icon: ChefHat },
  { key: 'READY', label: 'Ready for Driver', icon: Clock },
  { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', icon: Bike },
  { key: 'DELIVERED', label: 'Delivered', icon: MapPin },
];

export default function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;
  const [status, setStatus] = useState<OrderStatus>('PREPARING');
  const [etaMinutes, setEtaMinutes] = useState(25);

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';
    const socket: Socket = io(socketUrl, {
      transports: ['websocket'],
      autoConnect: true,
    });

    socket.on('connect', () => {
      socket.emit('join:order', { orderId });
    });

    socket.on('order:update', (data: { status: OrderStatus; etaMinutes?: number }) => {
      if (data.status) setStatus(data.status);
      if (data.etaMinutes) setEtaMinutes(data.etaMinutes);
    });

    return () => {
      socket.disconnect();
    };
  }, [orderId]);

  const currentStepIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Live Order Status</span>
          <h1 className="text-2xl font-bold text-foreground mt-0.5">Order #{orderId.slice(-6).toUpperCase()}</h1>
          <p className="text-xs text-muted-foreground mt-1">Placed with The Artisan Sourdough Pizza</p>
        </div>
        <div className="text-right sm:border-l sm:border-border sm:pl-6">
          <p className="text-xs text-muted-foreground">Estimated Arrival</p>
          <p className="text-3xl font-extrabold text-foreground text-orange-600">{etaMinutes} mins</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-base font-bold text-foreground mb-6">Delivery Progress</h2>
        <div className="relative">
          <div className="space-y-8">
            {steps.map((step, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const Icon = step.icon;

              return (
                <div key={step.key} className="flex items-center gap-4 relative z-10">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                      isCurrent
                        ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/30 ring-4 ring-orange-500/20'
                        : isPast
                        ? 'border-green-600 bg-green-600 text-white'
                        : 'border-muted bg-card text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-semibold ${
                        isCurrent
                          ? 'text-orange-600 dark:text-orange-400 font-bold'
                          : isPast
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {step.label}
                    </p>
                    {isCurrent && (
                      <p className="text-xs text-muted-foreground mt-0.5">In progress...</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-foreground">Driver Location</h2>
        <div className="h-48 w-full rounded-xl bg-muted/60 border border-border/80 flex flex-col items-center justify-center text-muted-foreground">
          <MapPin className="h-8 w-8 text-orange-500 mb-2 animate-bounce" />
          <p className="text-sm font-medium text-foreground">Live Driver GPS Tracking</p>
          <p className="text-xs">Driver is approaching the collection point via Stuart Courier</p>
        </div>
      </div>
    </div>
  );
}
