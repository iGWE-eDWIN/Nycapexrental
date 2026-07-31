import { createClient } from '@supabase/supabase-js';

export interface Property {
  id: string;
  created_at?: string;
  title: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  description: string;
  video_url: string;
  thumbnail_url: string;
  status: 'Available' | 'Sold' | 'Pending';
  featured: boolean;
}

export interface Inquiry {
  id: string;
  created_at?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  property_id?: string | null;
  read?: boolean;
  property_title?: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

// export const isSupabaseConfigured = () => {
//   return (
//     Boolean(supabaseUrl) &&
//     Boolean(supabaseAnonKey) &&
//     !supabaseUrl.includes('your-supabase-project-id') &&
//     !supabaseAnonKey.includes('your_supabase_anon_key')
//   );
// };

export const isSupabaseConfigured = () => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabasePublishableKey)
  );
};

// export const supabase = isSupabaseConfigured()
//   ? createClient(supabaseUrl, supabaseAnonKey)
//   : null;

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null;