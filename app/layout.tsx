import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import Navigation from '@/components/Navigation';
import { payload } from '@/config';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PolFerries',
  description: 'Promy do Szwecji i Danii, turystyka w Skandynawii i Cargo',
};
export const revalidate = 30;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigation = await payload.find({ collection: 'navigation' });
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navigation navigation={navigation} />
        {children}
      </body>
    </html>
  );
}
