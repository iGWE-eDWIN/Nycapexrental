'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminSidebar from '@/components/admin-sidebar';
import { createProperty, uploadMediaFile } from '@/lib/services/properties';
import {
  ArrowLeft,
  Upload,
  Video,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Save,
  Loader2,
} from 'lucide-react';

export default function AddPropertyPage() {
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'Available' | 'Sold' | 'Pending'>('Available');
  const [featured, setFeatured] = useState(false);

  // Custom File Uploads
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailUrlInput, setThumbnailUrlInput] = useState('');

  // Status & Progress Tracking
  const [submitting, setSubmitting] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ['video/mp4', 'video/quicktime', 'video/webm'];
      if (!validTypes.includes(file.type)) {
        setErrorMsg('Invalid video format. Accepted types: MP4, MOV, WebM.');
        return;
      }
      if (file.size > 100 * 1024 * 1024) {
        setErrorMsg('Video file size exceeds maximum limit of 100MB.');
        return;
      }
      setErrorMsg('');
      setVideoFile(file);
    }
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrorMsg('Invalid image format. Accepted types: JPG, PNG, WebP.');
        return;
      }
      setErrorMsg('');
      setThumbnailFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !description) {
      setErrorMsg('Please fill in all required fields (Title, Price, Description).');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg('');
      setProgressMsg('Initializing media uploads...');

      let finalVideoUrl = videoUrlInput;
      let finalThumbnailUrl = thumbnailUrlInput;

      // 1. Upload Video if selected
      if (videoFile) {
        setProgressMsg('Uploading video to Supabase Storage bucket property-videos...');
        finalVideoUrl = await uploadMediaFile(videoFile, 'videos');
      }

      // Default sample video if none provided
      if (!finalVideoUrl) {
        finalVideoUrl =
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
      }

      // 2. Upload Thumbnail if selected
      if (thumbnailFile) {
        setProgressMsg('Uploading thumbnail image...');
        finalThumbnailUrl = await uploadMediaFile(thumbnailFile, 'thumbnails');
      }

      // Default sample thumbnail if none provided
      if (!finalThumbnailUrl) {
        finalThumbnailUrl =
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';
      }

      // 3. Save Property to Supabase Database
      setProgressMsg('Saving property record to Supabase database...');
      await createProperty({
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
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while creating the property listing.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Top Header */}
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
              Add New Property Listing
            </h1>
          </div>
        </div>

        {/* Status Alerts */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 p-4 mb-6 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 mb-6 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Property created successfully! Redirecting to property manager...</span>
          </div>
        )}

        {/* Main Form Card */}
        <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
          {/* General Information Section */}
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
                  placeholder="e.g. The Obsidian Penthouse - 432 Park Ave"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-surface border border-outline-variant/50 focus:outline-none focus:border-charcoal font-body"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold tracking-wider text-gray-700 mb-1.5">
                  Price * (e.g., "$850,000" or "$14,500,000")
                </label>
                <input
                  type="text"
                  required
                  placeholder="$850,000"
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
                  className="w-full px-4 py-3 text-sm bg-surface border border-outline-variant/50 focus:outline-none focus:border-charcoal font-body"
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
                  className="w-full px-4 py-3 text-sm bg-surface border border-outline-variant/50 focus:outline-none focus:border-charcoal font-body"
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
                placeholder="Provide detailed description, views, finishes, amenities, and lease terms..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-surface border border-outline-variant/50 focus:outline-none focus:border-charcoal font-body resize-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="featuredToggle"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-champagne-gold focus:ring-champagne-gold border-gray-300 rounded-none cursor-pointer"
              />
              <label htmlFor="featuredToggle" className="text-xs uppercase font-bold tracking-wider text-charcoal cursor-pointer">
                Feature on Homepage Showcase
              </label>
            </div>
          </div>

          {/* Media Upload Section */}
          <div className="bg-ivory-white p-6 md:p-8 border border-outline-variant/30 shadow-sm space-y-6">
            <h3 className="font-display text-xl font-bold text-charcoal border-b border-gray-100 pb-3">
              Video & Thumbnail Media (Supabase Storage)
            </h3>

            {/* Video File Upload */}
            <div className="space-y-2">
              <label className="block text-xs uppercase font-semibold tracking-wider text-gray-700">
                Video Upload (MP4, MOV, WebM - Max 100MB)
              </label>
              <div className="border-2 border-dashed border-outline-variant/60 p-6 text-center bg-surface hover:bg-gray-100 transition-colors relative cursor-pointer">
                <input
                  type="file"
                  accept="video/mp4,video/quicktime,video/webm"
                  onChange={handleVideoSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Video className="w-8 h-8 text-champagne-gold mx-auto mb-2" />
                {videoFile ? (
                  <p className="text-xs font-bold text-charcoal">{videoFile.name} ({(videoFile.size / 1024 / 1024).toFixed(1)} MB)</p>
                ) : (
                  <div>
                    <p className="text-xs font-semibold text-charcoal">Click to select video file</p>
                    <p className="text-[10px] text-gray-500">Will be uploaded to bucket 'property-videos'</p>
                  </div>
                )}
              </div>
              <div className="text-[11px] text-gray-500">Or paste external video URL:</div>
              <input
                type="url"
                placeholder="https://..."
                value={videoUrlInput}
                onChange={(e) => setVideoUrlInput(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-surface border border-outline-variant/50 focus:outline-none"
              />
            </div>

            {/* Thumbnail Image Upload */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="block text-xs uppercase font-semibold tracking-wider text-gray-700">
                Thumbnail Image Upload (JPG, PNG, WebP)
              </label>
              <div className="border-2 border-dashed border-outline-variant/60 p-6 text-center bg-surface hover:bg-gray-100 transition-colors relative cursor-pointer">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleThumbnailSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <ImageIcon className="w-8 h-8 text-champagne-gold mx-auto mb-2" />
                {thumbnailFile ? (
                  <p className="text-xs font-bold text-charcoal">{thumbnailFile.name}</p>
                ) : (
                  <div>
                    <p className="text-xs font-semibold text-charcoal">Click to select image file</p>
                    <p className="text-[10px] text-gray-500">High-resolution cover poster</p>
                  </div>
                )}
              </div>
              <div className="text-[11px] text-gray-500">Or paste external image URL:</div>
              <input
                type="url"
                placeholder="https://..."
                value={thumbnailUrlInput}
                onChange={(e) => setThumbnailUrlInput(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-surface border border-outline-variant/50 focus:outline-none"
              />
            </div>
          </div>

          {/* Upload Progress Indicator */}
          {submitting && (
            <div className="bg-charcoal text-ivory-white p-4 text-xs font-semibold flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-champagne-gold animate-spin" />
              <span>{progressMsg || 'Processing listing submission...'}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-charcoal text-ivory-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-champagne-gold hover:text-charcoal transition-all duration-200 flex items-center gap-2 shadow-lg disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>Publish Property Listing</span>
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
