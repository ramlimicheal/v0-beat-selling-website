import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AudioProvider } from '@/contexts/audio-context'
import GlobalAudioPlayer from '@/components/global-audio-player'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const interFont = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BeatStars - Buy & Sell Premium Beats',
  description: 'Discover, buy, and sell high-quality beats on the premier marketplace for music producers and artists',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interFont.className} font-sans antialiased`}>
        <AudioProvider>
          {children}
          <GlobalAudioPlayer />
          <Analytics />
        </AudioProvider>
      </body>
    </html>
  )
}
