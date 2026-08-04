import { supabase, isSupabaseConfigured, Property } from '@/lib/supabase';

// Fallback Seed Data when Supabase credentials are not connected yet
const INITIAL_DEMO_PROPERTIES: Property[] = [
  {
    id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    title: 'The Obsidian Penthouse - 432 Park Ave',
    price: '$14,500,000',
    bedrooms: 4,
    bathrooms: 5,
    description:
      'Perched high above Manhattan, The Obsidian Penthouse offers panoramic 360-degree views of Central Park and the New York skyline. Features custom Italian marble finishes, private elevator entrance, floor-to-ceiling glass, full smart home automation, and access to 24/7 white-glove concierge service.',
    video_url:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail_url:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    status: 'Available',
    featured: true,
  },
  {
    id: 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    title: 'The Tribeca Glass House - Franklin St',
    price: '$8,750,000',
    bedrooms: 3,
    bathrooms: 3,
    description:
      'Architectural mastery in the heart of historic Tribeca. Industrial elegance meets ultra-luxury with original timber beams, double-height ceilings, a private rooftop plunge pool, and custom Boffi kitchen.',
    video_url:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail_url:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    status: 'Available',
    featured: true,
  },
  {
    id: 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
    created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
    title: 'Central Park West Heritage Townhouse',
    price: '$19,200,000',
    bedrooms: 6,
    bathrooms: 7,
    description:
      'A rare 25-foot wide limestone mansion directly facing Central Park. Meticulously restored with six fireplaces, private wine cellar, garden patio, and custom elevator.',
    video_url:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail_url:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    status: 'Available',
    featured: true,
  },
  {
    id: 'd4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a',
    created_at: new Date(Date.now() - 86400000 * 12).toISOString(),
    title: 'Hudson Yards Sky Suite',
    price: '$6,200,000',
    bedrooms: 2,
    bathrooms: 3,
    description:
      'Modern luxury lifestyle in Hudson Yards. Dramatic sunset river views, Gaggenau appliances, white oak floors, and resort-level building amenities including indoor pool and wellness spa.',
    video_url:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail_url:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    status: 'Available',
    featured: false,
  },
  {
    id: 'e5f6a7b8-c90d-1e2f-3a4b-5c6d7e8f9a0b',
    created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
    title: 'SoHo Cast-Iron Loft',
    price: '$5,100,000',
    bedrooms: 2,
    bathrooms: 2,
    description:
      'Quintessential SoHo loft living with soaring 14-foot ceilings, oversized Corinthian columns, gallery walls, and private key-locked elevator access.',
    video_url:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail_url:
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    status: 'Pending',
    featured: false,
  },
  {
    id: 'f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c',
    created_at: new Date(Date.now() - 86400000 * 20).toISOString(),
    title: 'Upper East Side Classic Nine',
    price: '$9,950,000',
    bedrooms: 4,
    bathrooms: 4,
    description:
      'Timeless pre-war elegance on Park Avenue. Features formal dining room, library, wood-burning fireplace, and master suite with dual dressing rooms.',
    video_url:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnail_url:
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80',
    status: 'Sold',
    featured: false,
  },
];

const LOCAL_STORAGE_KEY = 'nycapexrental_properties_cache';

function getLocalProperties(): Property[] {
  if (typeof window === 'undefined') return INITIAL_DEMO_PROPERTIES;
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_PROPERTIES));
    return INITIAL_DEMO_PROPERTIES;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_DEMO_PROPERTIES;
  }
}

function setLocalProperties(properties: Property[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(properties));
  }
}

export interface PropertyFilterParams {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  status?: string;
  featuredOnly?: boolean;
}

export async function fetchProperties(filters?: PropertyFilterParams): Promise<Property[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      let query = supabase.from('properties').select('*').order('created_at', { ascending: false });

      if (filters?.featuredOnly) {
        query = query.eq('featured', true);
      }
      if (filters?.status && filters.status !== 'All') {
        query = query.eq('status', filters.status);
      }
      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }
      if (filters?.bedrooms) {
        query = query.gte('bedrooms', filters.bedrooms);
      }
      if (filters?.bathrooms) {
        query = query.gte('bathrooms', filters.bathrooms);
      }

      const { data, error } = await query;
      if (error) {
        console.warn('Supabase fetch query warning, using local cache fallback:', error.message);
      } else if (data) {
        if (!filters || Object.keys(filters).length === 0) {
          setLocalProperties(data as Property[]);
        }
        return data as Property[];
      }
    } catch (err) {
      console.warn('Supabase fetch error, using local fallback:', err);
    }
  }

  // Fallback filtering over local cache / initial demo data
  let list = getLocalProperties();
  if (filters?.featuredOnly) {
    list = list.filter((p) => p.featured);
  }
  if (filters?.status && filters.status !== 'All') {
    list = list.filter((p) => p.status.toLowerCase() === filters.status?.toLowerCase());
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  if (filters?.bedrooms) {
    list = list.filter((p) => p.bedrooms >= (filters.bedrooms || 0));
  }
  if (filters?.bathrooms) {
    list = list.filter((p) => p.bathrooms >= (filters.bathrooms || 0));
  }
  return list;
}

export async function fetchPropertyById(id: string): Promise<Property | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('properties').select('*').eq('id', id).single();
      if (!error && data) {
        return data as Property;
      }
    } catch (e) {
      console.warn('Error fetching property from Supabase, falling back:', e);
    }
  }

  const list = getLocalProperties();
  return list.find((p) => p.id === id) || null;
}

export async function createProperty(property: Omit<Property, 'id' | 'created_at'>): Promise<Property> {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase.from('properties').insert([property]).select().single();
    if (error) {
      throw new Error(`Failed to create property in Supabase: ${error.message}`);
    }
    const created = data as Property;
    const current = getLocalProperties();
    setLocalProperties([created, ...current.filter((p) => p.id !== created.id)]);
    return created;
  }

  // Safe ID generator helper
  const generateId = () =>
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : 'prop_' + Math.random().toString(36).substring(2, 11);

  // Local storage fallback
  const newProperty: Property = {
    ...property,
    id: generateId(),
    created_at: new Date().toISOString(),
  };
  const list = getLocalProperties();
  const updated = [newProperty, ...list];
  setLocalProperties(updated);
  return newProperty;
}

export async function updateProperty(id: string, property: Partial<Property>): Promise<Property> {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase.from('properties').update(property).eq('id', id).select().single();
    if (error) {
      throw new Error(`Failed to update property in Supabase: ${error.message}`);
    }
    const updatedItem = data as Property;
    const current = getLocalProperties();
    const idx = current.findIndex((p) => p.id === id);
    if (idx !== -1) {
      current[idx] = updatedItem;
      setLocalProperties(current);
    }
    return updatedItem;
  }

  const list = getLocalProperties();
  const index = list.findIndex((p) => p.id === id);
  if (index === -1) throw new Error('Property not found');
  const updatedItem = { ...list[index], ...property };
  list[index] = updatedItem;
  setLocalProperties(list);
  return updatedItem;
}

export async function deleteProperty(id: string): Promise<void> {
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase.from('properties').delete().eq('id', id);
    if (error) {
      throw new Error(`Failed to delete property in Supabase: ${error.message}`);
    }
    const current = getLocalProperties();
    setLocalProperties(current.filter((p) => p.id !== id));
    return;
  }

  const list = getLocalProperties();
  const filtered = list.filter((p) => p.id !== id);
  setLocalProperties(filtered);
}

export async function uploadMediaFile(file: File, folder: 'videos' | 'thumbnails'): Promise<string> {
  if (isSupabaseConfigured() && supabase) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { data, error } = await supabase.storage.from('property-videos').upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      throw new Error(`Supabase Storage upload failed: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage.from('property-videos').getPublicUrl(data.path);
    return publicUrlData.publicUrl;
  }

  // Fallback for development preview without live storage bucket
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}
