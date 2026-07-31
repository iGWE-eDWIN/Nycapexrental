'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin-sidebar';
import { fetchProperties } from '@/lib/services/properties';
import { fetchInquiries } from '@/lib/services/inquiries';
import { Property, Inquiry } from '@/lib/supabase';
import {
  Building2,
  Star,
  CheckCircle2,
  MessageSquare,
  PlusCircle,
  Eye,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const propsData = await fetchProperties();
        const inqsData = await fetchInquiries();
        setProperties(propsData);
        setInquiries(inqsData);
      } catch (err) {
        console.error('Error loading admin dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalProperties = properties.length;
  const featuredProperties = properties.filter((p) => p.featured).length;
  const availableProperties = properties.filter(
    (p) => p.status.toLowerCase() === 'available'
  ).length;
  const totalInquiries = inquiries.length;
  const unreadInquiries = inquiries.filter((i) => !i.read).length;

  return (
    <div className="min-h-screen bg-surface flex">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 pb-6 border-b border-outline-variant/40">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-champagne-gold">
              Executive Overview
            </span>
            <h1 className="font-display text-3xl font-bold text-charcoal">
              Admin Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/properties/add"
              className="bg-charcoal text-ivory-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-champagne-gold hover:text-charcoal transition-all duration-200 flex items-center gap-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Listing</span>
            </Link>
          </div>
        </div>

        {/* Statistics Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Card 1: Total Properties */}
          <div className="bg-ivory-white p-6 border border-outline-variant/30 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-xs uppercase font-semibold tracking-wider text-gray-500">
                  Total Properties
                </div>
                <div className="font-display text-3xl font-bold text-charcoal mt-1">
                  {loading ? '...' : totalProperties}
                </div>
              </div>
              <div className="p-3 rounded-full bg-surface text-charcoal">
                <Building2 className="w-6 h-6" />
              </div>
            </div>
            <div className="text-[11px] text-gray-500 font-medium">
              Portfolio listings managed
            </div>
          </div>

          {/* Card 2: Featured Properties */}
          <div className="bg-ivory-white p-6 border border-outline-variant/30 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-xs uppercase font-semibold tracking-wider text-gray-500">
                  Featured Section
                </div>
                <div className="font-display text-3xl font-bold text-champagne-gold mt-1">
                  {loading ? '...' : featuredProperties}
                </div>
              </div>
              <div className="p-3 rounded-full bg-amber-50 text-champagne-gold">
                <Star className="w-6 h-6" />
              </div>
            </div>
            <div className="text-[11px] text-gray-500 font-medium">
              Highlighted on home hero
            </div>
          </div>

          {/* Card 3: Available Properties */}
          <div className="bg-ivory-white p-6 border border-outline-variant/30 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-xs uppercase font-semibold tracking-wider text-gray-500">
                  Active Rentals
                </div>
                <div className="font-display text-3xl font-bold text-emerald-700 mt-1">
                  {loading ? '...' : availableProperties}
                </div>
              </div>
              <div className="p-3 rounded-full bg-emerald-50 text-emerald-700">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
            <div className="text-[11px] text-gray-500 font-medium">
              Ready for immediate lease
            </div>
          </div>

          {/* Card 4: Total Inquiries */}
          <div className="bg-ivory-white p-6 border border-outline-variant/30 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-xs uppercase font-semibold tracking-wider text-gray-500">
                  Total Inquiries
                </div>
                <div className="font-display text-3xl font-bold text-charcoal mt-1">
                  {loading ? '...' : totalInquiries}
                </div>
              </div>
              <div className="p-3 rounded-full bg-blue-50 text-blue-600 relative">
                <MessageSquare className="w-6 h-6" />
                {unreadInquiries > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                )}
              </div>
            </div>
            <div className="text-[11px] text-gray-500 font-medium flex items-center gap-1">
              <span className="text-red-600 font-bold">{unreadInquiries} unread</span> messages
            </div>
          </div>
        </div>

        {/* Dashboard Grid: Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Listings */}
          <div className="lg:col-span-7 bg-ivory-white p-6 border border-outline-variant/30 shadow-sm">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h3 className="font-display text-xl font-bold text-charcoal">
                Recent Listings
              </h3>
              <Link
                href="/admin/properties"
                className="text-xs uppercase font-bold tracking-wider text-champagne-gold hover:underline flex items-center gap-1"
              >
                <span>Manage All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {properties.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 bg-surface hover:bg-gray-100 transition-colors border border-outline-variant/20"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={p.thumbnail_url}
                      alt={p.title}
                      className="w-14 h-10 object-cover rounded-sm shrink-0"
                    />
                    <div>
                      <h4 className="font-display text-sm font-bold text-charcoal line-clamp-1">
                        {p.title}
                      </h4>
                      <div className="text-xs text-champagne-gold font-bold">
                        {p.price} • {p.bedrooms} Beds / {p.bathrooms} Baths
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-charcoal text-white">
                      {p.status}
                    </span>
                    <Link
                      href={`/property/${p.id}`}
                      target="_blank"
                      className="p-1.5 text-gray-500 hover:text-charcoal"
                      title="View live page"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="lg:col-span-5 bg-ivory-white p-6 border border-outline-variant/30 shadow-sm">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h3 className="font-display text-xl font-bold text-charcoal">
                Latest Client Messages
              </h3>
              <Link
                href="/admin/inquiries"
                className="text-xs uppercase font-bold tracking-wider text-champagne-gold hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {inquiries.slice(0, 4).map((inq) => (
                <div
                  key={inq.id}
                  className={`p-4 border ${
                    inq.read
                      ? 'bg-surface border-outline-variant/30'
                      : 'bg-amber-50/60 border-champagne-gold/40'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-display text-sm font-bold text-charcoal">
                      {inq.name}
                    </div>
                    <div className="text-[10px] text-gray-500 font-medium">
                      {inq.created_at
                        ? new Date(inq.created_at).toLocaleDateString()
                        : 'Recent'}
                    </div>
                  </div>
                  <div className="text-xs text-champagne-gold font-medium mb-2">
                    {inq.email} • {inq.phone}
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed italic">
                    "{inq.message}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
