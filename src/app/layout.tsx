import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import ThemeProvider, { themeScript } from "@/components/ThemeProvider";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  personJsonLd,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display font for headings/hero — a heavier, more geometric-techy face than
// Geist Sans, used via --font-display wherever the site currently goes
// font-black/uppercase (hero rotator, SectionHeading titles, etc.).
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// Mono for eyebrow labels, tags, and code-ish bits — sharper and more
// "engineer" than Geist Mono. Kept as a separate token so Geist Mono stays
// available if anything still wants it.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-display-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Ankit Kaushik",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Ankit Kaushik",
    "Ankit Kaushik portfolio",
    "Ankit Kaushik developer",
    "Ankit Kaushik AI engineer",
    "Ankit Kaushik software engineer",
    "AI Engineer",
    "Gen AI Engineer",
    "Full-Stack Engineer",
    "LLM",
    "RAG",
    "AI Agents",
    "Next.js",
    "Python",
  ],
  authors: [{ name: "Ankit Kaushik", url: SITE_URL }],
  creator: "Ankit Kaushik",
  publisher: "Ankit Kaushik",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
    firstName: "Ankit",
    lastName: "Kaushik",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  // Paste the token from Google Search Console → Verification → HTML tag.
  // verification: { google: "<token>" },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Must be a raw inline script, not next/script. `beforeInteractive` in
          the App Router defers into Next's __next_s queue and runs after first
          paint, which flashes the wrong theme before correcting itself.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/*
          Person + WebSite + ProfilePage graph. `sameAs` is what ties this
          domain to the GitHub/LinkedIn/LeetCode profiles as one entity, which
          is what makes a name query resolve here.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
