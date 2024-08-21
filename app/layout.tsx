import Topbar from "@/components/Topbar";
import "./globals.css";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'vcs',
  description: '...',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Topbar/> */}
        {children}
      </body>
    </html>
  );
}
