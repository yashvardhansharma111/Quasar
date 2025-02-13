import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Universal SkillBridge',
  description: 'Bridging Academia and Industry through Progress',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
    <body className={`${inter.className} bg-black text-white`}>{children}</body>
    </html>
    </ClerkProvider>
  )
}

