import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { site, type Locale } from "@/lib/site";
import { getDictionary, isLocale, localeMeta, localizedHref } from "@/lib/i18n";
import { NavBar } from "@/components/navigation/NavBar";
import { Footer } from "@/components/navigation/Footer";
import { StickyCTAs } from "@/components/navigation/StickyCTAs";
import { PageTransition } from "@/components/motion/PageTransition";

export async function generateStaticParams() {
  return site.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const languages = Object.fromEntries(
    site.locales.map((l) => [localeMeta[l].htmlLang, `${site.url}${localizedHref("/", l)}`]),
  );
  return {
    alternates: {
      canonical: `${site.url}${localizedHref("/", locale)}`,
      languages: { ...languages, "x-default": `${site.url}/${site.defaultLocale}` },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: localeMeta[locale].htmlLang.replace("-", "_"),
      alternateLocale: site.locales
        .filter((l) => l !== locale)
        .map((l) => localeMeta[l].htmlLang.replace("-", "_")),
      title: dict.home.heroTitleA,
      description: dict.home.heroLead,
      images: [
        {
          url: "/og/cover.jpg",
          width: 1200,
          height: 630,
          alt: `${site.name} — ${dict.home.heroTitleA}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.home.heroTitleA,
      description: dict.home.heroLead,
      images: ["/og/cover.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/logo.svg`,
    image: `${site.url}/og/cover.jpg`,
    telephone: site.phone,
    email: site.email,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.geo.lat,
      longitude: site.address.geo.lng,
    },
    areaServed: ["MD", "RO", "UA"],
    foundingDate: `${site.yearFounded}`,
    sameAs: [site.social.instagram, site.social.facebook, site.social.tiktok],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
  };

  return (
    <>
      <Script
        id={`ld-organization-${locale}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
      >
        {dict.common.skipNav}
      </a>
      <NavBar locale={locale as Locale} dict={dict} />
      <PageTransition>
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
      </PageTransition>
      <Footer locale={locale as Locale} dict={dict} />
      <StickyCTAs locale={locale as Locale} dict={dict} />
    </>
  );
}
