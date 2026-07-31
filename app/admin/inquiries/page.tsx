'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin-sidebar';
import {
  fetchInquiries,
  toggleInquiryRead,
  deleteInquiry,
} from '@/lib/services/inquiries';
import { Inquiry } from '@/lib/supabase';
import {
  MessageSquare,
  Mail,
  Phone,
  Trash2,
  CheckCircle2,
  Circle,
  RefreshCw,
  Search,
  Building2,
} from 'lucide-react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [search, setSearch] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchInquiries();
      setInquiries(data);
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleRead = async (id: string, currentReadStatus: boolean) => {
    try {
      setProcessingId(id);
      await toggleInquiryRead(id, !currentReadStatus);
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, read: !currentReadStatus } : i))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete inquiry from "${name}"?`)) {
      try {
        setProcessingId(id);
        await deleteInquiry(id);
        setInquiries((prev) => prev.filter((i) => i.id !== id));
      } catch (err: any) {
        alert(err.message || 'Failed to delete inquiry');
      } finally {
        setProcessingId(null);
      }
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (filter === 'unread' && inq.read) return false;
    if (filter === 'read' && !inq.read) return false;
    if (search) {
      const q = search.toLowerCase();
      const matchName = inq.name.toLowerCase().includes(q);
      const matchEmail = inq.email.toLowerCase().includes(q);
      const matchMsg = inq.message.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchMsg) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-surface md:flex">
      <AdminSidebar />

      <main className="flex-1 p-4 pt-16 md:pt-10 md:p-10 overflow-y-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 pb-6 border-b border-outline-variant/40">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-champagne-gold">
              Lead & Client Management
            </span>
            <h1 className="font-display text-3xl font-bold text-charcoal">
              Contact Form Inquiries ({filteredInquiries.length})
            </h1>
          </div>

          <button
            onClick={loadData}
            className="flex items-center gap-2 border border-outline-variant/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-charcoal hover:bg-ivory-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Submissions</span>
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-ivory-white p-4 border border-outline-variant/30 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sender name, email, or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-surface border border-outline-variant/40 focus:outline-none focus:border-charcoal font-body"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
                filter === 'all'
                  ? 'bg-charcoal text-ivory-white'
                  : 'bg-surface text-gray-600 hover:text-charcoal'
              }`}
            >
              All ({inquiries.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
                filter === 'unread'
                  ? 'bg-amber-600 text-ivory-white'
                  : 'bg-surface text-gray-600 hover:text-charcoal'
              }`}
            >
              Unread ({inquiries.filter((i) => !i.read).length})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
                filter === 'read'
                  ? 'bg-emerald-700 text-ivory-white'
                  : 'bg-surface text-gray-600 hover:text-charcoal'
              }`}
            >
              Read ({inquiries.filter((i) => i.read).length})
            </button>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="bg-ivory-white border border-outline-variant/30 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500 space-y-3">
              <RefreshCw className="w-8 h-8 text-champagne-gold animate-spin mx-auto" />
              <p className="text-xs uppercase tracking-widest font-bold">
                Loading client messages...
              </p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <MessageSquare className="w-10 h-10 text-gray-400 mx-auto" />
              <h3 className="font-display text-lg font-bold text-charcoal">No Inquiries Found</h3>
              <p className="text-xs text-gray-500">There are no client inquiry submissions matching your current filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-charcoal text-ivory-white font-body text-[11px] uppercase tracking-wider">
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Sender Details</th>
                    <th className="p-4 font-semibold">Linked Listing</th>
                    <th className="p-4 font-semibold">Message</th>
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-body text-xs text-charcoal">
                  {filteredInquiries.map((inq) => (
                    <tr
                      key={inq.id}
                      className={`hover:bg-surface/80 transition-colors ${
                        !inq.read ? 'bg-amber-50/40 font-semibold' : ''
                      }`}
                    >
                      {/* Status */}
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleRead(inq.id, Boolean(inq.read))}
                          disabled={processingId === inq.id}
                          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider"
                          title="Click to toggle read state"
                        >
                          {inq.read ? (
                            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Read</span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-amber-800 bg-amber-100 px-2 py-0.5 border border-amber-300">
                              <Circle className="w-3 h-3 fill-amber-500 text-amber-500" />
                              <span>Unread</span>
                            </span>
                          )}
                        </button>
                      </td>

                      {/* Sender Details */}
                      <td className="p-4 max-w-xs">
                        <div className="font-display text-sm font-bold text-charcoal">{inq.name}</div>
                        <div className="text-[11px] text-champagne-gold font-medium flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <a href={`mailto:${inq.email}`} className="hover:underline">{inq.email}</a>
                        </div>
                        {inq.phone && (
                          <div className="text-[11px] text-gray-500 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <a href={`tel:${inq.phone}`} className="hover:underline">{inq.phone}</a>
                          </div>
                        )}
                      </td>

                      {/* Linked Property */}
                      <td className="p-4">
                        {inq.property_id ? (
                          <Link
                            href={`/property/${inq.property_id}`}
                            target="_blank"
                            className="text-xs text-charcoal hover:text-champagne-gold font-bold underline flex items-center gap-1"
                          >
                            <Building2 className="w-3.5 h-3.5" />
                            <span className="truncate max-w-[160px]">{inq.property_title || 'View Property'}</span>
                          </Link>
                        ) : (
                          <span className="text-[11px] text-gray-400 italic">General Site Inquiry</span>
                        )}
                      </td>

                      {/* Message */}
                      <td className="p-4 max-w-md">
                        <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">
                          "{inq.message}"
                        </p>
                      </td>

                      {/* Date */}
                      <td className="p-4 text-gray-500 text-[11px] whitespace-nowrap">
                        {inq.created_at
                          ? new Date(inq.created_at).toLocaleString()
                          : 'Recent'}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDelete(inq.id, inq.name)}
                          disabled={processingId === inq.id}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors disabled:opacity-50"
                          title="Delete Inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
