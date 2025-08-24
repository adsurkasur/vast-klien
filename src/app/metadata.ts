export const metadata = {
  title: "Vast ID",
  description: "Serene Cycle Companion – Vast ID: Empowering women’s health with science-based, innovative, and functional products for menstrual comfort and wellbeing.",
  keywords: [
    "Vast ID",
    "Serene Cycle Companion",
    "women's health",
    "menstrual comfort",
    "water kefir",
    "rempah",
    "herbal supplement",
    "PKM_K",
    "Indonesia"
  ],
  // themeColor and viewport moved to viewport export below
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  openGraph: {
    title: "Vast ID",
    description: "Empowering women’s health with science-based, innovative, and functional products for menstrual comfort and wellbeing.",
    url: "https://vast-id.vercel.app",
    siteName: "Vast ID",
    images: [
      {
        url: "/png/vast-beta.png",
        width: 512,
        height: 512,
        alt: "Vast ID Logo"
      }
    ],
    locale: "id_ID",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Vast ID – Serene Cycle Companion",
    description: "Empowering women’s health with science-based, innovative, and functional products for menstrual comfort and wellbeing.",
    site: "@vast_id",
    images: ["/png/vast-beta.png"]
  }
};

export const viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1
};
