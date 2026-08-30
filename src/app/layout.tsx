import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_Thai } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/config/site";
import { getDictionary } from "@/content";
import { defaultLocale, localeHtmlLang } from "@/lib/i18n";

import "./globals.css";

const plexThai = IBM_Plex_Sans_Thai({
  variable: "--font-plex-thai",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const dict = getDictionary(defaultLocale);

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: dict.meta.title,
    template: `%s | ${site.name} Systems`,
  },
  description: dict.meta.description,
  applicationName: `${site.name} Systems`,
  keywords: [
    "ระบบธุรกิจ",
    "Workflow Automation",
    "ระบบภายในองค์กร",
    "พัฒนาเว็บแอปพลิเคชัน",
    "CRM",
    "Dashboard",
    "API Integration",
    "AI Automation",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: {
    canonical: "/",
    languages: {
      th: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: site.url,
    siteName: `${site.name} Systems`,
    title: dict.meta.title,
    description: dict.meta.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: dict.meta.ogAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: dict.meta.title,
    description: dict.meta.description,
  },
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
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#f5f3ee",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={localeHtmlLang[defaultLocale]}
      suppressHydrationWarning
      className={`${plexThai.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        {/* Flags that JavaScript is available so scroll reveals can start from
            a hidden state. Without JS every section stays visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.dataset.js="on"`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
        >
          {dict.nav.skipToContent}
        </a>

        <Header dict={dict} locale={defaultLocale} />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer dict={dict} locale={defaultLocale} />
      </body>
    </html>
  );
}
