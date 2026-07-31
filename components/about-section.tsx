'use client';

import React from 'react';
import { Award, ShieldCheck, Video, Users } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 md:px-12 bg-ivory-white border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div>
            <span className="font-body text-xs uppercase tracking-[0.2em] text-champagne-gold font-bold block mb-2">
              About Nycapexrental
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal mb-6 leading-tight">
              Redefining NYC Real Estate <br />
              <span className="italic font-normal text-champagne-gold">Through Cinema & Clarity</span>
            </h2>
            <p className="font-body text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
              At Nycapexrental, we curate New York City’s most exceptional high-end penthouses, lofts, and classic townhouses. Combining high-definition cinematic video walkthroughs with white-glove advisory, we bring architectural masterpieces directly to discerning buyers and tenants worldwide.
            </p>
            <p className="font-body text-sm md:text-base text-gray-600 mb-8 leading-relaxed">
              Our mission is to eliminate ambiguity in luxury real estate leasing and sales. Every listing features immersive video walkthroughs, transparent details, and dedicated personal representation.
            </p>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold text-charcoal">100+</div>
                <div className="text-xs uppercase tracking-wider text-gray-500 font-medium mt-1">
                  Properties Managed
                </div>
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold text-champagne-gold">5+</div>
                <div className="text-xs uppercase tracking-wider text-gray-500 font-medium mt-1">
                  Years Experience
                </div>
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold text-charcoal">$50M+</div>
                <div className="text-xs uppercase tracking-wider text-gray-500 font-medium mt-1">
                  Volume Transacted
                </div>
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold text-champagne-gold">99%</div>
                <div className="text-xs uppercase tracking-wider text-gray-500 font-medium mt-1">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Grid */}
          <div className="relative">
            <div className="aspect-[4/3] w-full overflow-hidden shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury Real Estate Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-charcoal/10" />
            </div>

            {/* Floating Overlay Badge */}
            <div className="absolute -bottom-6 -left-6 bg-charcoal text-ivory-white p-6 shadow-xl hidden sm:block max-w-xs border-l-4 border-champagne-gold">
              <div className="flex items-center gap-3 mb-2">
                <Video className="w-6 h-6 text-champagne-gold" />
                <span className="font-display text-lg font-bold">100% Video Verified</span>
              </div>
              <p className="text-xs text-gray-300">
                Every apartment & property is filmed on-site to guarantee total transparency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
