import "./globals.css";
import Script from 'next/script';

/* ------------------------------
   Viewport (REQUIRED SEPARATE EXPORT)
-------------------------------- */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

/* ------------------------------
   Metadata
-------------------------------- */
export const metadata = {
  metadataBase: new URL("https://thisisnotnormal.social"),

  title: {
    default: "This Is Not Normal — Live Polling & Real-Time Voting Platform",
    template: "%s | This Is Not Normal",
  },

  description:
    "This Is Not Normal is a Outrage, crowdsourced and voting platform for live polls, instant results, interactive charts, and data-driven public engagement across web and mobile.",

  keywords: [
    "live polling platform",
    "real-time polls",
    "online voting system",
    "interactive polls",
    "instant poll results",
    "public Outrage, crowdsourced",
    "live voting",
    "poll analytics",
    "poll dashboard",
    "real-time data visualization",
  ],

  authors: [{ name: "**" }],
  creator: "**This Is Not Normal**",
  publisher: "This Is Not Normal",

  applicationName: "This Is Not Normal",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thisisnotnormal.social",
    siteName: "This Is Not Normal",
    title: "This Is Not Normal — Outrage, crowdsourced & Live Voting Platform",
    description:
      "Create, share, and track live polls with instant results, charts, and real-time audience engagement.",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "This Is Not Normal — Outrage, crowdsourced & Live Voting Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "This Is Not Normal — Live Polling & Real-Time Results",
    description:
      "Run live polls, watch results update instantly, and engage audiences in real time.",
    creator: "@This Is Not Normal",
    images: ["/favicon.ico"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#0a0a0a",
      },
    ],
  },

  manifest: "/manifest.json",

  category: "technology",
};

/* ------------------------------
   Root Layout
-------------------------------- */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Windows Tiles */}
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* PWA */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="This Is Not Normal" />

        {/* Explicit manifest link for better compatibility */}
        <link rel="manifest" href="/manifest.json" />

        {/* SEO */}
        <link rel="canonical" href="https://thisisnotnormal.social" />
      </head>
      <body className="antialiased">
        {children}
        
        {/* Load libraries after page is interactive */}
        <Script 
          src="https://cdn.jsdelivr.net/npm/dom-to-image-more@2.14.0/dist/dom-to-image-more.min.js"
          strategy="afterInteractive"
        />
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}