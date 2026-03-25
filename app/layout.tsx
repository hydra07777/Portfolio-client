import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '../components/theme-provider'
import { Toaster } from 'sonner'
import './globals.css'

/* ---------------- FONTS ---------------- */

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

/* ---------------- METADATA ---------------- */

export const metadata: Metadata = {
  title: 'DevAgency Manager | Powerful Digital Solutions',
  description:
    'We build powerful digital solutions. Web development, applications, UI/UX design and professional software solutions for your business.',
  generator: 'v0.app',
  keywords: [
    'web development',
    'digital agency',
    'software solutions',
    'UI/UX design',
    'React',
    'Next.js',
  ],
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

/* ---------------- VIEWPORT ---------------- */

export const viewport: Viewport = {
  themeColor: '#0F172A',
  width: 'device-width',
  initialScale: 1,
}

/* ---------------- ROOT LAYOUT ---------------- */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased bg-[#0F172A] text-[#E2E8F0] overflow-x-hidden">
        
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>

        <Toaster theme="dark" position="bottom-right" richColors />
        <Analytics />
      </body>
    </html>
  )
}