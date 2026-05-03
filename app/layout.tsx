import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION } from "@/lib/site-description";
import { profile } from "@/lib/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  variable: "--font-instrument-serif",
  subsets: ["latin"],
});

const siteTitle = `${profile.name} · Product`;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  ),
  title: {
    default: siteTitle,
    template: `%s · ${profile.name}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: siteTitle,
  openGraph: {
    title: siteTitle,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_IN",
    url:
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Senior Product Manager",
  description: SITE_DESCRIPTION,
  email: profile.email,
  knowsAbout: profile.skills,
  sameAs: [profile.linkedIn, profile.github],
  worksFor: {
    "@type": "Organization",
    name: "Google",
    url: "https://about.google/",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "Karnataka",
    addressLocality: "Bengaluru",
    addressCountry: "India",
  },
} as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteOrigin =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full scroll-smooth antialiased`}
    >
      <body className="relative min-h-full text-pretty">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ ...jsonLd, url: siteOrigin }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
