'use client';

import React, { useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Property } from '@/lib/supabase';

interface VideoModalProps {
  property: Property | null;
  onClose: () => void;
}

export default function VideoModal({ property, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!property) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-charcoal text-ivory-white overflow-hidden shadow-2xl rounded-sm border border-outline-variant/30">
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40">
          <div>
            <span className="font-body text-[10px] uppercase tracking-widest text-champagne-gold font-bold">
              Video Listing Tour
            </span>
            <h3 className="font-display text-lg md:text-xl font-bold text-ivory-white truncate max-w-md md:max-w-xl">
              {property.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src={property.video_url}
            poster={property.thumbnail_url}
            autoPlay
            playsInline
            controls
            className="w-full h-full object-contain"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>

        {/* Bottom Details Footer */}
        <div className="p-4 md:p-6 bg-charcoal/90 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="font-display text-2xl font-bold text-champagne-gold mb-1">
              {property.price}
            </div>
            <div className="text-xs text-gray-300 flex items-center gap-4">
              <span>{property.bedrooms} Beds</span>
              <span>•</span>
              <span>{property.bathrooms} Baths</span>
              <span>•</span>
              <span className="capitalize">{property.status}</span>
            </div>
          </div>
          <a
            href={`/property/${property.id}`}
            className="bg-champagne-gold text-charcoal px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
          >
            View Full Property Details
          </a>
        </div>
      </div>
    </div>
  );
}
