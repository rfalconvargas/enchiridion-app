import type { Metadata, Viewport } from "next";
import { Fredoka, Manrope, Atkinson_Hyperlegible } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE_URL, BRAND_NAME, CHANNEL_URL } from "@/lib/brand";
import { AnalyticsDelegate } from "@/components/analytics/AnalyticsDelegate";

// Display headings — playful, rounded.
const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

// UI + body text.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

// Dense educational reading (opt-in via .reading).
const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
  display: "swap",
});

const TITLE_DEFAULT =
  "Enchiridion — Turn curiosity into structured understanding";
const DESCRIPTION =
  "Enchiridion is a personal knowledge service: an AI learning expedition system that builds the path, teaches it visually, tests your understanding, and grows a living knowledge tree — from prehistoric life to any complex subject.";
const OG_IMAGE = "/spino-skull.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: "%s · Enchiridion",
  },
  description: DESCRIPTION,
  applicationName: BRAND_NAME,
  keywords: [
    "interactive 3D learning",
    "science education",
    "paleontology",
    "evolution",
    "deep time",
    "Spinosaurus",
    "dinosaurs",
    "fossil reconstruction",
    "3D learning app",
    "Enchiridion",
  ],
  authors: [{ name: BRAND_NAME, url: CHANNEL_URL }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    siteName: BRAND_NAME,
    url: SITE_URL,
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Enchiridion — Spinosaurus skull reconstruction in 3D",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  category: "education",
};

// Structured data — ties the site to the YouTube channel (sameAs) and exposes
// the live Spinosaurus lesson as a Course for rich results.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#org`,
      name: BRAND_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/enchiridion-logo.png`,
      sameAs: [CHANNEL_URL],
      description: DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#site`,
      url: SITE_URL,
      name: BRAND_NAME,
      publisher: { "@id": `${SITE_URL}#org` },
    },
    {
      "@type": "Course",
      name: "Spinosaurus: Anatomy of a river predator",
      description:
        "An interactive 3D lesson on Spinosaurus aegyptiacus — orbit the specimen, compare a century of reconstructions, and weigh the evidence behind each claim.",
      url: `${SITE_URL}/demo`,
      provider: { "@id": `${SITE_URL}#org` },
      educationalLevel: "Beginner",
      inLanguage: "en",
      isAccessibleForFree: true,
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#062a27",
  width: "device-width",
  initialScale: 1,
  // No maximumScale/userScalable lock — users must be able to pinch-zoom (WCAG 1.4.4).
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`deep-time ${fredoka.variable} ${manrope.variable} ${atkinson.variable}`}
    >
      <head>
        {/* Speed up the third-party connections we know we'll make. */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Structured data (Organization + WebSite + Course). */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BV75Y67CNH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Privacy-conscious config: anonymize IPs and disable Google
            // Signals / ad-personalization. We only ever send non-PII event
            // params (placement, label, topic…), never anything a user typed.
            gtag('config', 'G-BV75Y67CNH', {
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `}
        </Script>
      </head>
      <body>
        {/* One delegated listener for declarative CTA / outbound clicks. */}
        <AnalyticsDelegate />
        {children}
      </body>
    </html>
  );
}
