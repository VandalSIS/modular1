export const site = {
  name: "Modus Construct",
  legalName: "Modus Construct SRL",
  domain: "modus.md",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://modus.md",
  email: "berniccristian07@gmail.com",
  phone: "+373 69 216 780",
  phoneRaw: "+37369216780",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "37369216780",
  address: {
    street: "str. Petru Rareș 62",
    city: "Chișinău",
    region: "Zona Centru",
    country: "Republica Moldova",
    countryCode: "MD",
    geo: { lat: 47.0316, lng: 28.8350 },
  },
  social: {
    instagram: "https://instagram.com/modus_construct",
    facebook: "https://www.facebook.com/share/18gxv68mBn/?mibextid=wwXIfr",
    tiktok: "https://www.tiktok.com/@modusconstruct",
  },
  hours: "L–V 09:00–18:00 · S 10:00–14:00",
  yearFounded: 2024,
  defaultLocale: "ro" as const,
  locales: ["ro", "ru"] as const,
} as const;

export type Locale = (typeof site.locales)[number];
