'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin-sidebar';
import { fetchProperties, deleteProperty } from '@/lib/services/properties';
import { Property } from '@/lib/supabase';
import {
  PlusCircle,
  Search,
  Edit3,
  Trash2,
  Eye,
  Filter,
  Star,
  Building2,
  RefreshCw,
} from 'lucide-react';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchProperties();
      setProperties(data);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete listing "${title}"?`)) {
      try {
        setDeletingId(id);
        await deleteProperty(id);
        setProperties((prev) => prev.filter((p) => p.id !== id));
      } catch (err: any) {
        alert(err.message || 'Failed to delete property.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const filteredProperties = properties.filter((p) => {
    if (search) {
      const q = search.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }
    if (statusFilter !== 'All') {
      if (p.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'sold':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-surface flex">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 pb-6 border-b border-outline-variant/40">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-champagne-gold">
              Portfolio Management
            </span>
            <h1 className="font-display text-3xl font-bold text-charcoal">
              Property Listings ({filteredProperties.length})
            </h1>
          </div>

          <Link
            href="/admin/properties/add"
            className="bg-charcoal text-ivory-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-champagne-gold hover:text-charcoal transition-all duration-200 flex items-center gap-2 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Listing</span>
          </Link>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-ivory-white p-4 border border-outline-variant/30 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search listings by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-surface border border-outline-variant/40 focus:outline-none focus:border-charcoal font-body"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-surface text-charcoal border border-outline-variant/40 px-3 py-2 text-xs font-semibold uppercase tracking-wider focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Sold">Sold</option>
            </select>

            <button
              onClick={loadData}
              className="p-2 border border-outline-variant/40 hover:bg-surface text-gray-600"
              title="Refresh listings"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Properties Table */}
        <div className="bg-ivory-white border border-outline-variant/30 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500 space-y-3">
              <RefreshCw className="w-8 h-8 text-champagne-gold animate-spin mx-auto" />
              <p className="text-xs uppercase tracking-widest font-bold">Loading listings database...</p>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Building2 className="w-10 h-10 text-gray-400 mx-auto" />
              <h3 className="font-display text-lg font-bold text-charcoal">No Listings Found</h3>
              <p className="text-xs text-gray-500">There are no property records matching your filter parameters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-charcoal text-ivory-white font-body text-[11px] uppercase tracking-wider">
                    <th className="p-4 font-semibold">Thumbnail</th>
                    <th className="p-4 font-semibold">Property Title</th>
                    <th className="p-4 font-semibold">Price</th>
                    <th className="p-4 font-semibold">Bed / Bath</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Created Date</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-body text-xs text-charcoal">
                  {filteredProperties.map((p) => (
                    <tr key={p.id} className="hover:bg-surface/80 transition-colors">
                      {/* Thumbnail */}
                      <td className="p-4">
                        <div className="relative w-16 h-12 bg-gray-100 overflow-hidden border border-outline-variant/30">
                          <img
                            src={p.thumbnail_url}
                            alt={p.title}
                            className="w-full h-full object-cover"
                          />
                          {p.featured && (
                            <span className="absolute top-0.5 right-0.5 bg-champagne-gold text-charcoal p-0.5 rounded-full" title="Featured">
                              <Star className="w-3 h-3 fill-current" />
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Title */}
                      <td className="p-4 font-bold max-w-xs">
                        <div className="truncate font-display text-sm text-charcoal">{p.title}</div>
                        <div className="text-[10px] text-gray-400 font-mono truncate">{p.id}</div>
                      </td>

                      {/* Price */}
                      <td className="p-4 font-display font-bold text-champagne-gold text-sm">
                        {p.price}
                      </td>

                      {/* Bed / Bath */}
                      <td className="p-4 font-semibold text-gray-700">
                        {p.bedrooms} Beds / {p.bathrooms} Baths
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(p.status)}`}>
                          {p.status}
                        </span>
                      </td>

                      {/* Created Date */}
                      <td className="p-4 text-gray-500">
                        {p.created_at
                          ? new Date(p.created_at).toLocaleDateString()
                          : 'N/A'}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/property/${p.id}`}
                            target="_blank"
                            className="p-2 text-gray-600 hover:text-charcoal hover:bg-gray-100 transition-colors"
                            title="View Public Page"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/admin/properties/edit/${p.id}`}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors"
                            title="Edit Listing"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(p.id, p.title)}
                            disabled={deletingId === p.id}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors disabled:opacity-50"
                            title="Delete Listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
