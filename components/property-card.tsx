'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Play, Bed, Bath, ArrowUpRight } from 'lucide-react';
import { Property } from '@/lib/supabase';

interface PropertyCardProps {
  property: Property;
  onPlayVideo?: (property: Property) => void;
}

export default function PropertyCard({ property, onPlayVideo }: PropertyCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-charcoal text-ivory-white';
      case 'pending':
        return 'bg-champagne-gold text-charcoal';
      case 'sold':
        return 'bg-gray-400 text-white';
      default:
        return 'bg-charcoal text-white';
    }
  };

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="group bg-ivory-white border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between">
      {/* Top Media Container */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {property.video_url ? (
          /* Show actual video content — no poster, starts from first frame */
          <video
            ref={videoRef}
            src={property.video_url}
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        ) : (
          /* Fallback to thumbnail only if there's no video */
          <img
            src={property.thumbnail_url}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}

        {/* Backdrop Overlay */}
        <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          {/* Play Button */}
          {onPlayVideo && (
            <button
              onClick={() => onPlayVideo(property)}
              className="w-14 h-14 rounded-full bg-ivory-white/90 backdrop-blur-md flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-110 transition-all duration-300 hover:bg-champagne-gold group/play"
              aria-label={`Play video for ${property.title}`}
            >
              <Play className="w-6 h-6 text-charcoal group-hover/play:text-ivory-white ml-1 fill-current" />
            </button>
          )}
        </div>

        {/* Top Left Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
          <span
            className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest ${getStatusBadgeColor(
              property.status
            )}`}
          >
            {property.status}
          </span>
          {property.featured && (
            <span className="bg-champagne-gold text-charcoal px-3 py-1 text-[10px] uppercase font-bold tracking-widest">
              Featured Listing
            </span>
          )}
        </div>

        {/* Bottom Right Price Tag */}
        <div className="absolute bottom-3 right-3 bg-charcoal/90 backdrop-blur-md px-3 py-1.5 text-champagne-gold font-display font-bold text-sm tracking-wide">
          {property.price}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display text-xl font-bold text-charcoal mb-2 line-clamp-1 group-hover:text-champagne-gold transition-colors">
            {property.title}
          </h3>
          <p className="font-body text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Specs & Actions */}
        <div>
          <div className="flex items-center gap-4 py-3 border-t border-b border-gray-100 text-xs font-medium text-gray-600 mb-4">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-champagne-gold" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-champagne-gold" />
              <span>{property.bathrooms} Baths</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/property/${property.id}`}
              className="flex-1 bg-charcoal text-ivory-white text-center py-2.5 text-xs font-semibold uppercase tracking-widest hover:bg-black transition-colors flex items-center justify-center gap-1"
            >
              <span>View Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            {onPlayVideo && (
              <button
                onClick={() => onPlayVideo(property)}
                className="border border-charcoal/30 px-3 py-2.5 text-xs font-semibold text-charcoal hover:bg-champagne-gold hover:border-champagne-gold hover:text-charcoal transition-colors flex items-center gap-1"
                title="Watch Video"
              >
                <Play className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Video</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
