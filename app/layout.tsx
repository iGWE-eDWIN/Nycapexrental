import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nycapexrental | Luxury Video Real Estate Listings NYC',
  description:
    'Explore high-end luxury penthouses, lofts, townhouses, and rentals across New York City with cinematic video tours. Direct advisory by Nycapexrental.',
  keywords: [
    'NYC Real Estate',
    'Luxury Apartments NYC',
    'Penthouse Rentals',
    'Video Property Tours',
    'Nycapexrental',
    'Manhattan Luxury Rentals',
  ],
  authors: [{ name: 'Nycapexrental', url: 'mailto:Nycapexrental@gmail.com' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-surface text-on-surface font-body antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
