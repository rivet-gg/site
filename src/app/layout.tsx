import { GoogleAnalytics } from '@next/third-parties/google';

import { Providers } from '@/components/Providers';
import '@/styles/tailwind.css';
import '@/styles/fonts.css';
import 'focus-visible';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://rivet.gg'),
  twitter: {
    site: '@rivetgg',
    card: 'summary_large_image'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rivet.gg',
    title: 'Rivet - The Only Backend Your Game Needs',
    siteName: 'Rivet',
    description: 'Open-Source game infrastructure. Multiplayer game servers and modular backend.',
    images: [
      {
        url: 'https://rivet.gg/promo/og.png',
        width: 1200,
        height: 630,
        alt: 'Rivet'
      }
    ]
  }
};

export default function Layout({ children }) {
  return (
    <html lang='en'>
      <head>
        <GoogleAnalytics gaId='G-GHX1328ZFD' />

        {/* Generated by realfavicongenerator.net */}
        <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png?v=24-08-04' />
        <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png?v=24-08-04' />
        <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png?v=24-08-04' />
        <link rel='manifest' href='/icons/site.webmanifest?v=24-08-04' />
        <link rel='mask-icon' href='/icons/safari-pinned-tab.svg?v=24-08-04' color='#0f0f0f' />
        <link rel='shortcut icon' href='/icons/favicon.ico?v=24-08-04' />
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta name='msapplication-config' content='/icons/browserconfig.xml?v=24-08-04' />
        <meta name='theme-color' content='#ffffff' />

        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </head>
      <body className='dark bg-charcole-950 antialiased'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
