import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://shrotihost.in"),
  title: {
    default: "Shroti Host — High-Speed NVMe Web Hosting & Software Development",
    template: "%s | Shroti Host",
  },
  description:
    "India's transparent cloud hosting provider. Pure NVMe storage, LiteSpeed web servers, cPanel, managed WordPress, reseller hosting, and bespoke software development with same-price renewals.",
  keywords: [
    "Shroti Host",
    "web hosting India",
    "LiteSpeed hosting",
    "NVMe shared hosting",
    "managed WordPress hosting",
    "reseller hosting WHM",
    "master reseller",
    "KVM VPS India",
    "domain registration India",
    "same price renewal hosting"
  ],
  authors: [{ name: "Shroti Host", url: "https://shrotihost.in" }],
  creator: "Shroti Enterprises",
  publisher: "Shroti Enterprises",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shrotihost.in",
    title: "Shroti Host — High-Speed NVMe Web Hosting & Software Development",
    description:
      "LiteSpeed NVMe hosting from ₹49/mo with guaranteed same-price renewal. Managed WordPress, WHM Reseller, VPS, and full-stack software development.",
    siteName: "Shroti Host",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shroti Host — High-Speed NVMe Web Hosting",
    description:
      "Enterprise LiteSpeed web hosting and software engineering with zero hidden renewal hikes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100 selection:bg-purple-500 selection:text-white">
        <ThemeProvider>
          {/* Accessible Skip Link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg focus:shadow-lg"
          >
            Skip to main content
          </a>

          {/* Desktop Custom Cursor */}
          <CustomCursor />

          {/* Global Sticky Navigation */}
          <Navbar />

          {/* Main Landmark */}
          <main id="main-content" className="flex-1">
            {children}
          </main>

          {/* Global Comprehensive Footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
