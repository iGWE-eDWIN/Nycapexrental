-- =======================================================
-- Nycapexrental Supabase Database & Storage Setup Schema
-- =======================================================

-- 1. Create Properties Table
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    bedrooms INTEGER NOT NULL DEFAULT 1,
    bathrooms INTEGER NOT NULL DEFAULT 1,
    description TEXT NOT NULL,
    video_url TEXT,
    thumbnail_url TEXT,
    status TEXT NOT NULL DEFAULT 'Available', -- 'Available', 'Sold', 'Pending'
    featured BOOLEAN NOT NULL DEFAULT false
);

-- 2. Create Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
    read BOOLEAN NOT NULL DEFAULT false
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for Properties Table
-- Allow anyone to view properties
CREATE POLICY "Public Read Properties"
    ON public.properties FOR SELECT
    USING (true);

-- Allow authenticated admin users to insert/update/delete properties
CREATE POLICY "Admin Insert Properties"
    ON public.properties FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin Update Properties"
    ON public.properties FOR UPDATE
    USING (auth.role() = 'authenticated');

CREATE POLICY "Admin Delete Properties"
    ON public.properties FOR DELETE
    USING (auth.role() = 'authenticated');

-- 5. RLS Policies for Inquiries Table
-- Allow public visitors to submit inquiries
CREATE POLICY "Public Insert Inquiries"
    ON public.inquiries FOR INSERT
    WITH CHECK (true);

-- Allow authenticated admin to view/manage inquiries
CREATE POLICY "Admin Select Inquiries"
    ON public.inquiries FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Admin Update Inquiries"
    ON public.inquiries FOR UPDATE
    USING (auth.role() = 'authenticated');

CREATE POLICY "Admin Delete Inquiries"
    ON public.inquiries FOR DELETE
    USING (auth.role() = 'authenticated');

-- 6. Supabase Storage Bucket Setup for 'property-videos'
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-videos', 'property-videos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies
CREATE POLICY "Public Storage Read"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'property-videos');

CREATE POLICY "Admin Storage Insert"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'property-videos' AND auth.role() = 'authenticated');

CREATE POLICY "Admin Storage Update"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'property-videos' AND auth.role() = 'authenticated');

CREATE POLICY "Admin Storage Delete"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'property-videos' AND auth.role() = 'authenticated');

-- 7. Seed Initial Luxury NYC Properties
INSERT INTO public.properties (id, title, price, bedrooms, bathrooms, description, video_url, thumbnail_url, status, featured)
VALUES
(
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'The Obsidian Penthouse - 432 Park Ave',
    '$14,500,000',
    4,
    5,
    'Perched high above Manhattan, The Obsidian Penthouse offers panoramic 360-degree views of Central Park and the New York skyline. Features custom Italian marble finishes, private elevator entrance, floor-to-ceiling glass, full smart home automation, and access to 24/7 white-glove concierge service.',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'Available',
    true
),
(
    'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
    'The Tribeca Glass House - Franklin St',
    '$8,750,000',
    3,
    3,
    'Architectural mastery in the heart of historic Tribeca. Industrial elegance meets ultra-luxury with original timber beams, double-height ceilings, a private rooftop plunge pool, and custom Boffi kitchen.',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    'Available',
    true
),
(
    'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
    'Central Park West Heritage Townhouse',
    '$19,200,000',
    6,
    7,
    'A rare 25-foot wide limestone mansion directly facing Central Park. Meticulously restored with six fireplaces, private wine cellar, garden patio, and custom elevator.',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'Available',
    true
),
(
    'd4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a',
    'Hudson Yards Sky Suite',
    '$6,200,000',
    2,
    3,
    'Modern luxury lifestyle in Hudson Yards. Dramatic sunset river views, Gaggenau appliances, white oak floors, and resort-level building amenities including indoor pool and wellness spa.',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    'Available',
    false
),
(
    'e5f6a7b8-c90d-1e2f-3a4b-5c6d7e8f9a0b',
    'SoHo Cast-Iron Loft',
    '$5,100,000',
    2,
    2,
    'Quintessential SoHo loft living with soaring 14-foot ceilings, oversized Corinthian columns, gallery walls, and private key-locked elevator access.',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    'Pending',
    false
),
(
    'f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c',
    'Upper East Side Classic Nine',
    '$9,950,000',
    4,
    4,
    'Timeless pre-war elegance on Park Avenue. Features formal dining room, library, wood-burning fireplace, and master suite with dual dressing rooms.',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80',
    'Sold',
    false
)
ON CONFLICT (id) DO NOTHING;
