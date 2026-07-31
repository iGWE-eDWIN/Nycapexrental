---
name: Estate Refined
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#091d2e'
  on-tertiary-container: '#73869a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#d1e4fb'
  tertiary-fixed-dim: '#b5c8df'
  on-tertiary-fixed: '#091d2e'
  on-tertiary-fixed-variant: '#36485b'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  charcoal: '#1A1A1A'
  champagne-gold: '#C5A059'
  slate-navy: '#2C3E50'
  ivory-white: '#FFFFFF'
  soft-gray: '#E5E5E5'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  button:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-desktop: 64px
  margin-tablet: 32px
  margin-mobile: 20px
  stack-sm: 16px
  stack-md: 32px
  stack-lg: 80px
---

## Brand & Style

This design system is built for the high-end real estate market, prioritizing high-value property imagery and a sense of architectural stillness. The brand personality is prestigious, expert, and understated, catering to an affluent audience that values discretion and clarity over flashy ornamentation.

The design style follows a **High-End Minimalism** approach. It utilizes expansive whitespace to create a "gallery" feel, allowing property photography to serve as the primary visual driver. The aesthetic is defined by razor-sharp alignment, generous margins, and a sophisticated interplay between a functional sans-serif and a decorative serif. Every interaction should feel intentional and smooth, evoking the experience of walking through a curated luxury estate.

## Colors

The palette is rooted in a "Monochromatic Plus" philosophy. The foundation is **Ivory White (#FFFFFF)**, used to create vast open spaces. **Charcoal (#1A1A1A)** provides the structural weight, used for primary typography and borders to ensure a grounded, authoritative feel.

**Champagne Gold (#C5A059)** acts as a rare accent for high-priority CTAs or exclusive status indicators, conveying luxury without being ostentatious. **Slate Navy (#2C3E50)** is utilized for secondary interactive elements or subtle backgrounds to add depth. The overall color ratio should be roughly 80% white, 15% charcoal, and 5% accent colors.

## Typography

The typographic strategy relies on a classic "Serif for Display, Sans for Utility" pairing. **Playfair Display** provides the editorial elegance required for property titles and section headers. **Inter** is used for all functional text, listing details, and interface labels to maintain high legibility and a modern, systematic feel.

For an extra touch of luxury, use `label-caps` for eyebrows and small metadata. Line heights are purposefully generous to prevent the UI from feeling "crowded." Headlines should generally use tighter letter spacing, while small labels should be tracked out slightly to improve readability and prestige.

## Layout & Spacing

The layout utilizes a **Fixed Grid** model on desktop (12 columns, 1440px max width) to maintain an editorial, controlled composition. On smaller devices, it transitions to a fluid model with increased side margins to ensure content doesn't feel cramped against the glass.

Whitespace is used as a structural element, not just as a gap. We use a base-8 rhythm. Section spacing is aggressive (e.g., `stack-lg`), creating distinct chapters as the user scrolls through a property page. Grids for listing results should favor larger card widths (maximum 2-3 per row) to prioritize image size over information density.

## Elevation & Depth

To maintain a minimalist aesthetic, the design system avoids heavy shadows and traditional skeuomorphism. Instead, it employs **Tonal Layers** and **Low-Contrast Outlines**.

Depth is created through:
- **Surface Transitions:** Shifting from Ivory White to Soft Gray (#F9F9F9) to define different content zones.
- **Micro-Shadows:** Only used on floating elements like search bars or "Save" buttons, using a very large blur (24px+) and very low opacity (4-6%) to simulate ambient light rather than a physical drop.
- **Glassmorphism:** Applied sparingly to image overlays (e.g., price tags or video controls) using a backdrop blur and 80% opacity white background to ensure legibility over varying image textures.

## Shapes

The shape language is **Soft (0.25rem)**. We intentionally avoid fully sharp corners to prevent the UI from feeling aggressive or "cold," but we also avoid heavy rounding (pills) which can feel too casual or "bubbly" for a luxury brand.

Corners should be consistent across all elements:
- **Primary Buttons & Inputs:** 4px radius (Soft).
- **Property Cards:** 4px radius on the container; the images within should inherit this rounding.
- **Search Bars:** May occasionally use a slightly larger radius (8px) to distinguish them as a primary entry point, but should never be fully circular.

## Components

### Buttons
- **Primary:** Solid Charcoal background with Ivory White text. No border.
- **Secondary:** Transparent background with a 1px Charcoal border.
- **Accent:** Champagne Gold background for high-conversion CTAs like "Book Private Tour."

### Large Image-Driven Cards
Listing cards should feature a 4:3 aspect ratio image. Typography within the card (Price, Address) should be neatly stacked below the image with generous padding. Use a subtle hover effect that scales the image slightly (1.05x) without expanding the container.

### Elegant Search Inputs
The primary search should be a single-line, minimalist field with a refined serif placeholder. Use thin (1px) separators between "Location," "Price," and "Beds" instead of boxed inputs to maintain a lightweight feel.

### Video Play Indicators
Use a centered, semi-transparent white circle with a blurred backdrop. The "Play" icon should be a thin, Charcoal stroke. This ensures the indicator is visible regardless of the video thumbnail’s brightness.

### Refined Navigation
The header should be fixed, featuring a high-contrast logo and `label-caps` links. Use a thin 1px horizontal rule (#E5E5E5) to separate the header from the content, rather than a shadow.