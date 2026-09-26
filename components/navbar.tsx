'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, User, Menu, X, Building2 } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/90 backdrop-blur-md border-b border-outline-variant/40 shadow-sm transition-all duration-300">
      {/* Top Info Bar */}
      <div className="bg-charcoal text-ivory-white text-xs px-4 md:px-12 py-2 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-6">
          <a
            href="tel:+15189474370"
            className="flex items-center gap-2 hover:text-champagne-gold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-champagne-gold" />
            <span>+1 (518) 947-4370</span>
          </a>
          <a
            href="mailto:Nycapexrental@gmail.com"
            className="flex items-center gap-2 hover:text-champagne-gold transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-champagne-gold" />
            <span>Nycapexrental@gmail.com</span>
          </a>
        </div>
        <div className="hidden sm:flex items-center gap-3 font-medium tracking-wide uppercase text-[10px] text-gray-300">
          <span>New York Luxury Real Estate Showcase</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Building2 className="w-7 h-7 text-charcoal group-hover:text-champagne-gold transition-colors" />
          <span className="font-display text-2xl md:text-3xl font-bold tracking-tight text-charcoal uppercase">
            Nycapex<span className="text-champagne-gold">rental</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-body text-xs uppercase tracking-widest text-on-surface font-semibold">
          <Link href="/" className="hover:text-champagne-gold transition-colors">
            Home
          </Link>
          <a href="#properties" className="hover:text-champagne-gold transition-colors">
            Properties
          </a>
          <a href="#about" className="hover:text-champagne-gold transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-champagne-gold transition-colors">
            Contact
          </a>
        </nav>

        {/* Right CTA / Admin Login */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin/login"
            className="hidden sm:flex items-center gap-2 border border-charcoal/80 text-charcoal px-4 py-2 text-xs uppercase tracking-widest font-semibold hover:bg-charcoal hover:text-ivory-white transition-all duration-200 rounded-none shadow-sm"
          >
            <User className="w-3.5 h-3.5" />
            <span>Admin Login</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-charcoal hover:text-champagne-gold transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ivory-white border-t border-outline-variant px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-4 font-body text-sm uppercase tracking-widest font-semibold text-charcoal">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-champagne-gold py-1 border-b border-gray-100"
            >
              Home
            </Link>
            <a
              href="#properties"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-champagne-gold py-1 border-b border-gray-100"
            >
              Properties
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-champagne-gold py-1 border-b border-gray-100"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-champagne-gold py-1 border-b border-gray-100"
            >
              Contact
            </a>
          </nav>
          <div className="pt-2">
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-charcoal text-ivory-white w-full py-3 text-xs uppercase tracking-widest font-bold"
            >
              <User className="w-4 h-4" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
