'use client';

import React, { useState } from 'react';
import { Search, MapPin, DollarSign, BedDouble } from 'lucide-react';

interface HeroProps {
  onSearch?: (search: string, price: string, bedrooms: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [bedrooms, setBedrooms] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm, priceRange, bedrooms);
    }
    const propertiesElem = document.getElementById('properties');
    if (propertiesElem) {
      propertiesElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[640px] md:min-h-[750px] w-full flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Background Image / Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury NYC Penthouse Architecture"
          className="w-full h-full object-cover opacity-50 scale-105 animate-pulse duration-[10000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-16">
        <span className="font-body text-xs uppercase tracking-[0.25em] text-champagne-gold font-bold mb-4 block">
          Nycapexrental • Luxury Video Portfolio
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-ivory-white mb-6 leading-tight">
          Discover Your Dream <br className="hidden sm:inline" />
          <span className="italic font-normal text-champagne-gold">Home in NYC</span>
        </h1>
        <p className="font-body text-base md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light tracking-wide">
          Premium rentals and luxury architectural properties across New York City.
        </p>

        {/* Search Bar Container */}
        <form
          onSubmit={handleSearchSubmit}
          className="bg-ivory-white/95 backdrop-blur-md p-3 md:p-2 flex flex-col md:flex-row items-center w-full max-w-3xl mx-auto shadow-2xl rounded-none border border-white/20 gap-2 md:gap-0"
        >
          {/* Location / Search */}
          <div className="flex-1 flex items-center px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200 w-full">
            <MapPin className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
            <input
              type="text"
              placeholder="Search location or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none focus:outline-none focus:ring-0 w-full text-sm text-charcoal placeholder-gray-400 font-body"
            />
          </div>

          {/* Price Range */}
          <div className="flex-1 flex items-center px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200 w-full">
            <DollarSign className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="bg-transparent border-none focus:outline-none focus:ring-0 w-full text-sm text-charcoal font-body"
            >
              <option value="">Any Price Range</option>
              <option value="under5m">Under $5,000,000</option>
              <option value="5m-10m">$5,000,000 - $10,000,000</option>
              <option value="above10m">Above $10,000,000</option>
            </select>
          </div>

          {/* Bedrooms */}
          <div className="flex-1 flex items-center px-4 py-3 w-full">
            <BedDouble className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="bg-transparent border-none focus:outline-none focus:ring-0 w-full text-sm text-charcoal font-body"
            >
              <option value="">Bedrooms</option>
              <option value="1">1+ Bedrooms</option>
              <option value="2">2+ Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
            </select>
          </div>

          {/* CTA Search Button */}
          <button
            type="submit"
            className="w-full md:w-auto bg-charcoal text-ivory-white px-8 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-champagne-gold hover:text-charcoal transition-colors shrink-0 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Explore Properties</span>
          </button>
        </form>
      </div>
    </section>
  );
}
