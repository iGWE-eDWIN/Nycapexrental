import { supabase, isSupabaseConfigured, Inquiry } from '@/lib/supabase';

const INITIAL_DEMO_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-101',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    name: 'Alexander Wright',
    email: 'awright@investments.com',
    phone: '+1 (212) 555-0192',
    message: 'Requesting a private video walkthrough and financial brochure for The Obsidian Penthouse.',
    property_id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    property_title: 'The Obsidian Penthouse - 432 Park Ave',
    read: false,
  },
  {
    id: 'inq-102',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    name: 'Sophia Laurent',
    email: 'sophia.laurent@paris.fr',
    phone: '+33 6 12 34 56 78',
    message: 'Interested in relocating to NYC this fall. Would like to schedule an in-person viewing of Tribeca Glass House.',
    property_id: 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
    property_title: 'The Tribeca Glass House - Franklin St',
    read: true,
  },
  {
    id: 'inq-103',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    name: 'Marcus Vance',
    email: 'mvance@vancocapital.com',
    phone: '+1 (415) 890-1234',
    message: 'Is the Central Park West Heritage Townhouse currently open for all-cash offers?',
    property_id: 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
    property_title: 'Central Park West Heritage Townhouse',
    read: false,
  },
];

const LOCAL_STORAGE_INQUIRIES_KEY = 'nycapexrental_inquiries_cache';

function getLocalInquiries(): Inquiry[] {
  if (typeof window === 'undefined') return INITIAL_DEMO_INQUIRIES;
  const stored = localStorage.getItem(LOCAL_STORAGE_INQUIRIES_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_INQUIRIES_KEY, JSON.stringify(INITIAL_DEMO_INQUIRIES));
    return INITIAL_DEMO_INQUIRIES;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_DEMO_INQUIRIES;
  }
}

function setLocalInquiries(inquiries: Inquiry[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_INQUIRIES_KEY, JSON.stringify(inquiries));
  }
}

export async function createInquiry(
  inquiry: Omit<Inquiry, 'id' | 'created_at' | 'read'>
): Promise<Inquiry> {
  if (isSupabaseConfigured() && supabase) {
    const payload = {
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      message: inquiry.message,
      property_id: inquiry.property_id || null,
      read: false,
    };
    const { data, error } = await supabase.from('inquiries').insert([payload]).select().single();
    if (error) {
      throw new Error(`Failed to submit inquiry: ${error.message}`);
    }
    return data as Inquiry;
  }

  const generateId = () =>
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : 'inq_' + Math.random().toString(36).substring(2, 11);

  const newInquiry: Inquiry = {
    ...inquiry,
    id: generateId(),
    created_at: new Date().toISOString(),
    read: false,
  };
  const list = getLocalInquiries();
  const updated = [newInquiry, ...list];
  setLocalInquiries(updated);
  return newInquiry;
}

export async function fetchInquiries(): Promise<Inquiry[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select(`*, properties(title)`)
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data.map((item: any) => ({
          ...item,
          property_title: item.properties?.title || 'General Inquiry',
        }));
      }
    } catch (e) {
      console.warn('Supabase inquiries fetch fallback:', e);
    }
  }

  return getLocalInquiries();
}

export async function toggleInquiryRead(id: string, read: boolean): Promise<void> {
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase.from('inquiries').update({ read }).eq('id', id);
    if (error) {
      throw new Error(`Failed to update inquiry status: ${error.message}`);
    }
    return;
  }

  const list = getLocalInquiries();
  const index = list.findIndex((i) => i.id === id);
  if (index !== -1) {
    list[index].read = read;
    setLocalInquiries(list);
  }
}

export async function deleteInquiry(id: string): Promise<void> {
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (error) {
      throw new Error(`Failed to delete inquiry: ${error.message}`);
    }
    return;
  }

  const list = getLocalInquiries();
  const updated = list.filter((i) => i.id !== id);
  setLocalInquiries(updated);
}
