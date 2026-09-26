'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { createInquiry } from '@/lib/services/inquiries';

interface ContactSectionProps {
  propertyId?: string;
  propertyTitle?: string;
}

export default function ContactSection({ propertyId, propertyTitle }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(
    propertyTitle ? `I am interested in scheduling a viewing for "${propertyTitle}".` : ''
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMsg('Please complete all required fields (Name, Email, Message).');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');
      await createInquiry({
        name,
        email,
        phone,
        message,
        property_id: propertyId || null,
      });
      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while submitting your message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-12 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-champagne-gold font-bold block mb-2">
            Get In Touch
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal mb-4">
            Contact Our Advisory Team
          </h2>
          <p className="font-body text-sm text-on-surface-variant">
            Have questions about a video listing or looking for an off-market rental in NYC? Send us a message and our advisors will respond within 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Cards & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-ivory-white p-8 border border-outline-variant/30 shadow-sm space-y-6">
              <h3 className="font-display text-xl font-bold text-charcoal border-b border-gray-100 pb-4">
                Company Details
              </h3>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-champagne-gold shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                    Direct Line
                  </div>
                  <a
                    href="tel:+15189474370"
                    className="font-display text-lg text-charcoal font-bold hover:text-champagne-gold transition-colors"
                  >
                    +1 (518) 947-4370
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-champagne-gold shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                    Official Email
                  </div>
                  <a
                    href="mailto:Nycapexrental@gmail.com"
                    className="font-display text-lg text-charcoal font-bold hover:text-champagne-gold transition-colors break-all"
                  >
                    Nycapexrental@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-champagne-gold shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                    Headquarters
                  </div>
                  <div className="font-display text-lg text-charcoal font-bold">
                    Fifth Avenue, Manhattan, NY 10022
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Container */}
            <div className="w-full h-64 overflow-hidden border border-outline-variant/30 shadow-sm relative bg-gray-200">
              <iframe
                title="Nycapexrental NYC Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2543635164!2d-74.11976373946229!3d40.69766840632237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.3) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-ivory-white p-8 md:p-10 border border-outline-variant/30 shadow-sm">
            <h3 className="font-display text-2xl font-bold text-charcoal mb-2">
              Send an Inquiry
            </h3>
            {propertyTitle && (
              <p className="text-xs text-champagne-gold uppercase tracking-widest font-semibold mb-6">
                Regarding: {propertyTitle}
              </p>
            )}

            {success ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 text-center text-emerald-800 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-display text-xl font-bold">Inquiry Sent Successfully!</h4>
                <p className="text-sm text-emerald-700">
                  Thank you for reaching out to Nycapexrental. Our team will review your inquiry and contact you shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-2 text-xs uppercase tracking-widest font-bold text-emerald-900 underline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 p-4 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase font-semibold tracking-wider text-gray-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-surface border border-outline-variant/50 focus:outline-none focus:border-charcoal transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-semibold tracking-wider text-gray-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-surface border border-outline-variant/50 focus:outline-none focus:border-charcoal transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold tracking-wider text-gray-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-surface border border-outline-variant/50 focus:outline-none focus:border-charcoal transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold tracking-wider text-gray-700 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us about your property requirements, budget, or preferred move-in date..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-surface border border-outline-variant/50 focus:outline-none focus:border-charcoal transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-charcoal text-ivory-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-champagne-gold hover:text-charcoal transition-all duration-300 flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
