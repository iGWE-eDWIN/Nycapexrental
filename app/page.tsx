'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import PropertyCard from '@/components/property-card';
import VideoModal from '@/components/video-modal';
import AboutSection from '@/components/about-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';
import { fetchProperties } from '@/lib/services/properties';
import { Property } from '@/lib/supabase';
import { Search, Filter, RefreshCw, Play } from 'lucide-react';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideoProperty, setActiveVideoProperty] = useState<Property | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [bedroomFilter, setBedroomFilter] = useState('0');
  const [priceFilter, setPriceFilter] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const all = await fetchProperties();
      setProperties(all);
      const featured = all.filter((p) => p.featured);
      setFeaturedProperties(featured.length > 0 ? featured : all.slice(0, 3));
    } catch (err) {
      console.error('Failed to load properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleHeroSearch = (search: string, price: string, bedrooms: string) => {
    setSearchQuery(search);
    setPriceFilter(price);
    setBedroomFilter(bedrooms || '0');
  };

  // Filter Logic
  const filteredProperties = properties.filter((property) => {
    // Search query match
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = property.title.toLowerCase().includes(q);
      const matchDesc = property.description.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }

    // Status filter
    if (statusFilter !== 'All') {
      if (property.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
    }

    // Bedroom filter
    if (bedroomFilter !== '0') {
      if (property.bedrooms < parseInt(bedroomFilter)) return false;
    }

    // Price filter
    if (priceFilter) {
      const numericPrice = parseInt(property.price.replace(/[^0-9]/g, '')) || 0;
      if (priceFilter === 'under5m' && numericPrice >= 5000000) return false;
      if (priceFilter === '5m-10m' && (numericPrice < 5000000 || numericPrice > 10000000))
        return false;
      if (priceFilter === 'above10m' && numericPrice <= 10000000) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero onSearch={handleHeroSearch} />

      {/* Featured Properties Section */}
      <section className="py-20 px-4 md:px-12 bg-ivory-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="font-body text-xs uppercase tracking-[0.2em] text-champagne-gold font-bold block mb-2">
                Curated Architecture
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal">
                Featured Video Collection
              </h2>
            </div>
            <a
              href="#properties"
              className="font-body text-xs uppercase tracking-widest font-bold text-charcoal border-b-2 border-champagne-gold pb-1 hover:text-champagne-gold transition-colors"
            >
              Explore All Listings ({properties.length})
            </a>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-96 bg-gray-100 animate-pulse rounded-sm" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onPlayVideo={(p) => setActiveVideoProperty(p)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* All Available Rentals & Properties Section */}
      <section id="properties" className="py-20 px-4 md:px-12 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-body text-xs uppercase tracking-[0.2em] text-champagne-gold font-bold block mb-2">
              Complete Portfolio
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal mb-4">
              Available Rentals & Properties
            </h2>
            <p className="font-body text-sm text-on-surface-variant">
              Browse our live inventory of high-definition video walkthroughs across Manhattan, Brooklyn, and Queens.
            </p>
          </div>

          {/* Interactive Filter Controls Bar */}
          <div className="bg-ivory-white p-4 md:p-6 shadow-sm border border-outline-variant/40 mb-12 flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter by title, street, neighborhood..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-surface border border-outline-variant/40 focus:outline-none focus:border-charcoal font-body"
              />
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-surface text-charcoal border border-outline-variant/40 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
              </select>

              {/* Bedrooms Filter */}
              <select
                value={bedroomFilter}
                onChange={(e) => setBedroomFilter(e.target.value)}
                className="bg-surface text-charcoal border border-outline-variant/40 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider focus:outline-none"
              >
                <option value="0">All Bedrooms</option>
                <option value="1">1+ Beds</option>
                <option value="2">2+ Beds</option>
                <option value="3">3+ Beds</option>
                <option value="4">4+ Beds</option>
              </select>

              {/* Price Range Filter */}
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="bg-surface text-charcoal border border-outline-variant/40 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider focus:outline-none"
              >
                <option value="">All Prices</option>
                <option value="under5m">Under $5M</option>
                <option value="5m-10m">$5M - $10M</option>
                <option value="above10m">Above $10M</option>
              </select>

              {/* Reset Filters */}
              {(searchQuery || statusFilter !== 'All' || bedroomFilter !== '0' || priceFilter) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('All');
                    setBedroomFilter('0');
                    setPriceFilter('');
                  }}
                  className="flex items-center gap-1 text-xs text-red-600 hover:underline px-2 py-1 font-semibold"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-96 bg-gray-200 animate-pulse rounded-sm" />
              ))}
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="bg-ivory-white p-12 text-center border border-dashed border-gray-300 max-w-lg mx-auto space-y-3">
              <Filter className="w-10 h-10 text-champagne-gold mx-auto" />
              <h3 className="font-display text-xl font-bold text-charcoal">No Properties Matched</h3>
              <p className="text-xs text-gray-500">
                Try adjusting your search criteria or resetting filters to view all available listings.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('All');
                  setBedroomFilter('0');
                  setPriceFilter('');
                }}
                className="bg-charcoal text-ivory-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onPlayVideo={(p) => setActiveVideoProperty(p)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Video Modal Player */}
      <VideoModal
        property={activeVideoProperty}
        onClose={() => setActiveVideoProperty(null)}
      />
    </div>
  );
}
