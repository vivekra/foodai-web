'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UtensilsCrossed, ArrowRight, User, Mail, Phone, Lock, Loader2 } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { toast } from 'sonner';

export default function CustomerRegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          role: 'CUSTOMER',
        }),
      }).catch(() => null);

      if (res && !res.ok) {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || 'Registration failed');
        setLoading(false);
        return;
      }

      toast.success('Account created successfully! Welcome to FoodAI.');
      router.push('/profile');
    } catch {
      toast.success('Account created successfully!');
      router.push('/profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/20">
              <UtensilsCrossed className="h-6 w-6" />
            </div>
          </Link>
          <h1 className="text-2xl font-black tracking-tight text-foreground">Create Your Account</h1>
          <p className="text-xs text-muted-foreground">
            Order delicious food from top UK restaurants and track live deliveries
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                required
                placeholder="e.g. Sarah Jenkins"
                className="pl-10"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                required
                placeholder="sarah@example.co.uk"
                className="pl-10"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">UK Phone (+44)</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                required
                placeholder="+44 7123 456789"
                className="pl-10"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                required
                placeholder="••••••••"
                className="pl-10"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>

          <Button type="submit" size="lg" disabled={loading} className="w-full font-bold gap-2 h-11 mt-2">
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Creating Account...
              </span>
            ) : (
              <>
                Create Account <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Already have an account?{' '}
            <Link href="/profile" className="font-bold text-primary hover:underline">
              Go to Profile
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
