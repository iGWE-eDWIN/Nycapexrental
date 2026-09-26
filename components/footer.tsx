'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, Building2, Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory-white border-t border-white/10 pt-16 pb-8 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-champagne-gold" />
            <span className="font-display text-2xl font-bold tracking-tight uppercase">
              Nycapex<span className="text-champagne-gold">rental</span>
            </span>
          </Link>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            New York City’s premier video listing real estate platform. Showcasing exceptional luxury residences, penthouses, and townhouses with cinematic precision.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:text-champagne-gold hover:bg-white/10 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:text-champagne-gold hover:bg-white/10 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:text-champagne-gold hover:bg-white/10 transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:text-champagne-gold hover:bg-white/10 transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-4">
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-champagne-gold">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-xs text-gray-300 font-body uppercase tracking-wider">
            <li>
              <Link href="/" className="hover:text-champagne-gold transition-colors">
                Home Showcase
              </Link>
            </li>
            <li>
              <a href="#properties" className="hover:text-champagne-gold transition-colors">
                Available Listings
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-champagne-gold transition-colors">
                About Nycapexrental
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-champagne-gold transition-colors">
                Contact Advisory
              </a>
            </li>
            <li>
              <Link href="/admin/login" className="hover:text-champagne-gold transition-colors">
                Admin Management
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Key Locations */}
        <div className="space-y-4">
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-champagne-gold">
            NYC Neighborhoods
          </h4>
          <ul className="space-y-2.5 text-xs text-gray-400 font-body">
            <li>Tribeca & SoHo Lofts</li>
            <li>Central Park West & Fifth Ave</li>
            <li>Hudson Yards Sky Suites</li>
            <li>Upper East Side Classics</li>
            <li>West Village & Chelsea</li>
          </ul>
        </div>

        {/* Col 4: Direct Contact */}
        <div className="space-y-4">
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-champagne-gold">
            Direct Contact
          </h4>
          <div className="space-y-3 text-xs text-gray-300">
            <a
              href="tel:+15189474370"
              className="flex items-center gap-2.5 hover:text-champagne-gold transition-colors"
            >
              <Phone className="w-4 h-4 text-champagne-gold" />
              <span>+1 (518) 947-4370</span>
            </a>
            <a
              href="mailto:Nycapexrental@gmail.com"
              className="flex items-center gap-2.5 hover:text-champagne-gold transition-colors break-all"
            >
              <Mail className="w-4 h-4 text-champagne-gold" />
              <span>Nycapexrental@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
        <div>© 2026 Nycapexrental. All rights reserved.</div>
        <div className="flex gap-6">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Equal Housing Opportunity</span>
        </div>
      </div>
    </footer>
  );
}
