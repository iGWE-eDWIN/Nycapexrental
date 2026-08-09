'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import PropertyCard from '@/components/property-card';
import ContactSection from '@/components/contact-section';
import VideoModal from '@/components/video-modal';
import { fetchPropertyById, fetchProperties } from '@/lib/services/properties';
import { Property } from '@/lib/supabase';
import { Bed, Bath, ArrowLeft, Play, Phone, Mail, Share2, Check } from 'lucide-react';

export default function PropertyDetailPage() {
  const [property, setProperty] = useState<Property | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideoModal, setActiveVideoModal] = useState<Property | null>(null);
  const [copied, setCopied] = useState(false);

  const params = useParams();
  const propertyId = typeof params?.id === 'string' ? params.id : '';

  useEffect(() => {
    async function loadPropertyData() {
      if (!propertyId) return;
      try {
        setLoading(true);
        const item = await fetchPropertyById(propertyId);
        setProperty(item);

        const all = await fetchProperties();
        const related = all.filter((p) => p.id !== propertyId).slice(0, 3);
        setSimilarProperties(related);
      } catch (err) {
        console.error('Failed to load property details:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPropertyData();
  }, [propertyId]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col justify-between">
        <Navbar />
        <div className="max-w-7xl mx-auto py-24 px-4 w-full flex-1">
          <div className="h-12 w-64 bg-gray-200 animate-pulse mb-8" />
          <div className="aspect-video w-full bg-gray-300 animate-pulse mb-8" />
          <div className="h-8 w-1/2 bg-gray-200 animate-pulse mb-4" />
          <div className="h-24 w-full bg-gray-200 animate-pulse" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-surface flex flex-col justify-between">
        <Navbar />
        <div className="max-w-4xl mx-auto py-24 px-4 text-center space-y-6 flex-1">
          <h1 className="font-display text-4xl font-bold text-charcoal">Property Not Found</h1>
          <p className="text-gray-600">The listing you are looking for may have been removed or updated.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-charcoal text-ivory-white px-8 py-3 text-xs font-bold uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Listings</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-charcoal hover:text-champagne-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Listings</span>
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 border border-outline-variant/40 px-3 py-1.5 text-xs uppercase font-semibold text-charcoal hover:bg-ivory-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied' : 'Share Listing'}</span>
          </button>
        </div>

        {/* Video Player Hero */}
        <div className="relative w-full bg-black shadow-2xl overflow-hidden mb-8" style={{ height: 'clamp(260px, 56vw, 680px)' }}>
          {property.video_url ? (
            <video
              src={property.video_url}
              controls
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={property.thumbnail_url}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Property Specs Header */}
        <div className="bg-ivory-white p-6 md:p-10 border border-outline-variant/30 shadow-sm mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-8 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-charcoal text-ivory-white px-3 py-1 text-[10px] uppercase font-bold tracking-widest">
                  {property.status}
                </span>
                {property.featured && (
                  <span className="bg-champagne-gold text-charcoal px-3 py-1 text-[10px] uppercase font-bold tracking-widest">
                    Featured Residence
                  </span>
                )}
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-charcoal">
                {property.title}
              </h1>
            </div>

            <div className="lg:text-right">
              <div className="text-xs uppercase font-semibold tracking-widest text-gray-500 mb-1">
                Listing Price
              </div>
              <div className="font-display text-4xl font-bold text-champagne-gold">
                {property.price}
              </div>
            </div>
          </div>

          {/* Quick Specs Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b border-gray-100 text-charcoal">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-champagne-gold">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Bedrooms</div>
                <div className="font-display text-lg font-bold">{property.bedrooms} Beds</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-champagne-gold">
                <Bath className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Bathrooms</div>
                <div className="font-display text-lg font-bold">{property.bathrooms} Baths</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-champagne-gold">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Listing Agent</div>
                <a href="tel:+13323199071" className="font-display text-sm font-bold hover:underline">
                  +1 (332) 319-9071
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-champagne-gold">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Inquiry Email</div>
                <a href="mailto:Nycapexrental@gmail.com" className="font-display text-xs font-bold hover:underline truncate block">
                  Nycapexrental@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="pt-8">
            <h3 className="font-display text-2xl font-bold text-charcoal mb-4">
              Residence Description
            </h3>
            <p className="font-body text-base text-on-surface-variant leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>
        </div>

        {/* Agent Inquiry Form for this Property */}
        <ContactSection propertyId={property.id} propertyTitle={property.title} />

        {/* Similar Listings */}
        {similarProperties.length > 0 && (
          <section className="py-16">
            <div className="mb-8">
              <span className="font-body text-xs uppercase tracking-[0.2em] text-champagne-gold font-bold block mb-1">
                Recommendations
              </span>
              <h3 className="font-display text-3xl font-bold text-charcoal">
                Similar Luxury Properties
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map((simProp) => (
                <PropertyCard
                  key={simProp.id}
                  property={simProp}
                  onPlayVideo={(p) => setActiveVideoModal(p)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      <VideoModal
        property={activeVideoModal}
        onClose={() => setActiveVideoModal(null)}
      />
    </div>
  );
}
