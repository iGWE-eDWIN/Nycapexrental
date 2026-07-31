'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  MessageSquare,
  LogOut,
  ChevronRight,
  Globe,
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nycapex_admin_session');
    }
    router.push('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Properties', href: '/admin/properties', icon: Building2 },
    { label: 'Add Property', href: '/admin/properties/add', icon: PlusCircle },
    { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  ];

  return (
    <aside className="w-64 bg-charcoal text-ivory-white flex flex-col justify-between min-h-screen border-r border-white/10 shrink-0">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 group">
            <Building2 className="w-6 h-6 text-champagne-gold" />
            <span className="font-display text-xl font-bold uppercase tracking-tight">
              Nycapex<span className="text-champagne-gold">Admin</span>
            </span>
          </Link>
          <div className="text-[10px] uppercase font-semibold text-gray-400 mt-1">
            Nycapexrental@gmail.com
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5 font-body">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 text-xs uppercase font-semibold tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-champagne-gold text-charcoal font-bold shadow-md'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-4 py-2.5 text-xs text-gray-400 hover:text-champagne-gold transition-colors font-medium"
        >
          <Globe className="w-4 h-4" />
          <span>View Live Frontend</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 w-full text-left transition-colors font-semibold uppercase tracking-wider"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
