'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Property } from '@/lib/supabase';

interface VideoModalProps {
  property: Property | null;
  onClose: () => void;
}

export default function VideoModal({ property, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!property) return null;

  return (
    /* Full-screen black backdrop — clicking outside closes the modal */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Close button — top-right corner */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        aria-label="Close video"
      >
        <X className="w-7 h-7" />
      </button>

      {/* Video element — stops click propagation so clicking the video itself doesn't close the modal */}
      <video
        ref={videoRef}
        src={property.video_url}
        autoPlay
        playsInline
        controls
        className="w-full h-full object-contain"
        style={{ maxHeight: '100vh', maxWidth: '100vw', background: 'black' }}
        onClick={(e) => e.stopPropagation()}
        onPlay={() => {}}
        onPause={() => {}}
      />
    </div>
  );
}
