'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminSidebar from '@/components/admin-sidebar';
import {
  fetchPropertyById,
  updateProperty,
  uploadMediaFile,
} from '@/lib/services/properties';
import {
  ArrowLeft,
  Video,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Save,
  Loader2,
} from 'lucide-react';

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = typeof params?.id === 'string' ? params.id : '';

  const [loadingProperty, setLoadingProperty] = useState(true);

  // Form State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'Available' | 'Sold' | 'Pending'>('Available');
  const [featured, setFeatured] = useState(false);

  // Media
  const [existingVideoUrl, setExistingVideoUrl] = useState('');
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // Status & Progress Tracking
  const [submitting, setSubmitting] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!propertyId) return;
      try {
        setLoadingProperty(true);
        const item = await fetchPropertyById(propertyId);
        if (item) {
          setTitle(item.title);
          setPrice(item.price);
          setBedrooms(item.bedrooms);
          setBathrooms(item.bathrooms);
          setDescription(item.description);
          setStatus(item.status);
          setFeatured(item.featured);
          setExistingVideoUrl(item.video_url);
          setExistingThumbnailUrl(item.thumbnail_url);
        } else {
          setErrorMsg('Property listing not found.');
        }
      } catch (err) {
        console.error('Failed to load property:', err);
      } finally {
        setLoadingProperty(false);
      }
    }
    loadData();
  }, [propertyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !description) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg('');
      setProgressMsg('Updating property details...');

      let finalVideoUrl = existingVideoUrl;
      let finalThumbnailUrl = existingThumbnailUrl;

      if (videoFile) {
        setProgressMsg('Uploading new video to Supabase Storage...');
        finalVideoUrl = await uploadMediaFile(videoFile, 'videos');
      }

      if (thumbnailFile) {
        setProgressMsg('Uploading new thumbnail image...');
        finalThumbnailUrl = await uploadMediaFile(thumbnailFile, 'thumbnails');
      }

      setProgressMsg('Saving changes to database...');
      await updateProperty(propertyId, {
        title,
        price,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        description,
        video_url: finalVideoUrl,
        thumbnail_url: finalThumbnailUrl,
        status,
        featured,
      });

      setSuccess(true);
      setProgressMsg('');
      setTimeout(() => {
        router.push('/admin/properties');
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update property listing.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingProperty) {
    return (
      <div className="min-h-screen bg-surface flex">
        <AdminSidebar />
        <main className="flex-1 p-10 flex items-center justify-center">
          <div className="flex items-center gap-3 text-charcoal">
            <Loader2 className="w-6 h-6 animate-spin text-champagne-gold" />
            <span className="font-display font-bold uppercase tracking-wider text-xs">
              Loading listing details...
            </span>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-outline-variant/40">
          <div>
            <Link
              href="/admin/properties"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-charcoal hover:text-champagne-gold transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Properties</span>
            </Link>
            <h1 className="font-display text-3xl font-bold text-charcoal">
              Edit Property Listing
            </h1>
          </div>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 p-4 mb-6 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 mb-6 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Property updated successfully! Returning to properties list...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
          <div className="bg-ivory-white p-6 md:p-8 border border-outline-variant/30 shadow-sm space-y-6">
            <h3 className="font-display text-xl font-bold text-charcoal border-b border-gray-100 pb-3">
              General Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase font-semibold tracking-wider text-gray-700 mb-1.5">
                  Property Title / Address *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-surface border border-outline-variant/50 focus:outline-none focus:border-charcoal font-body"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold tracking-wider text-gray-700 mb-1.5">
                  Price *
                </label>
                <input
                  type="text"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-surface border border-outline-variant/50 focus:outline-none focus:border-charcoal font-body"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold tracking-wider text-gray-700 mb-1.5">
                  Listing Status *
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-4 py-3 text-sm bg-surface border border-outline-variant/50 focus:outline-none focus:border-charcoal font-body font-semibold"
                >
                  <option value="Available">Available</option>
                  <option value="Pending">Pending</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold tracking-wider text-gray-700 mb-1.5">
                  Bedrooms *
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={bedrooms}
                  onChange={(e) => setBedrooms(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 text-sm bg-surface border border-outline-variant/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold tracking-wider text-gray-700 mb-1.5">
                  Bathrooms *
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={bathrooms}
                  onChange={(e) => setBathrooms(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 text-sm bg-surface border border-outline-variant/50 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold tracking-wider text-gray-700 mb-1.5">
                Full Description *
              </label>
              <textarea
                rows={6}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-surface border border-outline-variant/50 focus:outline-none resize-none font-body"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="editFeaturedToggle"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-champagne-gold focus:ring-champagne-gold border-gray-300 rounded-none cursor-pointer"
              />
              <label htmlFor="editFeaturedToggle" className="text-xs uppercase font-bold tracking-wider text-charcoal cursor-pointer">
                Feature on Homepage Showcase
              </label>
            </div>
          </div>

          <div className="bg-ivory-white p-6 md:p-8 border border-outline-variant/30 shadow-sm space-y-6">
            <h3 className="font-display text-xl font-bold text-charcoal border-b border-gray-100 pb-3">
              Media Settings
            </h3>

            <div>
              <label className="block text-xs uppercase font-semibold tracking-wider text-gray-700 mb-1">
                Current Video URL
              </label>
              <input
                type="url"
                value={existingVideoUrl}
                onChange={(e) => setExistingVideoUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-surface border border-outline-variant/40 mb-3"
              />
              <div className="text-[11px] text-gray-500 mb-2">Upload replacement video file:</div>
              <input
                type="file"
                accept="video/mp4,video/quicktime,video/webm"
                onChange={(e) => e.target.files && setVideoFile(e.target.files[0])}
                className="text-xs text-gray-500"
              />
            </div>

            <div className="pt-4 border-t border-gray-100">
              <label className="block text-xs uppercase font-semibold tracking-wider text-gray-700 mb-1">
                Current Thumbnail URL
              </label>
              <input
                type="url"
                value={existingThumbnailUrl}
                onChange={(e) => setExistingThumbnailUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-surface border border-outline-variant/40 mb-3"
              />
              <div className="text-[11px] text-gray-500 mb-2">Upload replacement thumbnail image:</div>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => e.target.files && setThumbnailFile(e.target.files[0])}
                className="text-xs text-gray-500"
              />
            </div>
          </div>

          {submitting && (
            <div className="bg-charcoal text-ivory-white p-4 text-xs font-semibold flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-champagne-gold animate-spin" />
              <span>{progressMsg || 'Saving property changes...'}</span>
            </div>
          )}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-charcoal text-ivory-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-champagne-gold hover:text-charcoal transition-all duration-200 flex items-center gap-2 shadow-lg disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
            <Link
              href="/admin/properties"
              className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600 hover:text-charcoal"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
