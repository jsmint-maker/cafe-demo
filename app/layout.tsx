import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kalea Coffee & Roastery | Artisanal Coffee & Bakery in Addis Ababa',
  description: 'Thoughtful single-origin coffee, fresh daily bakes, and warm mornings in Bole, Addis Ababa.',
  metadataBase: new URL('https://kaleacoffee.et'), // Replace with your actual domain when deployed
  openGraph: {
    title: 'Kalea Coffee & Roastery',
    description: 'Thoughtful single-origin coffee, fresh daily bakes, and warm mornings in Bole, Addis Ababa.',
    siteName: 'Kalea Coffee & Roastery',
    images: [
      {
        url: '/og-image.jpg', // Place a 1200x630px preview image in your /public folder
        width: 1200,
        height: 630,
        alt: 'Kalea Coffee & Roastery Interior and Coffee',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalea Coffee & Roastery',
    description: 'Thoughtful single-origin coffee, fresh daily bakes, and warm mornings in Bole, Addis Ababa.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        url: '/logo.svg',
        type: 'image/svg+xml',
      },
    ],
  },
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF9F5' },
    { media: '(prefers-color-scheme: dark)', color: '#1c1917' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-[#FAF9F5] text-stone-900 selection:bg-amber-900/20">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}