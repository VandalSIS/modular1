import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { isLocale, getDictionary, localizedHref } from "@/lib/i18n";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { CtaBanner } from "@/components/sections/CtaBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.proces.title,
    description: dict.proces.lead,
  };
}

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.nav.home, item: `${site.url}${localizedHref("/", locale)}` },
      { "@type": "ListItem", position: 2, name: dict.proces.title, item: `${site.url}${localizedHref("/proces", locale)}` },
    ],
  };

  return (
    <>
      <Script id="proces-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <PageHero
        eyebrow={dict.proces.eyebrow}
        title={dict.proces.title}
        lead={dict.proces.lead}
        image="/projects/carcase-frame-02.jpg"
        alt="Procesul de producție Modus Construct"
      />
      <ProcessTimeline dict={dict} />
      <CtaBanner
        locale={locale}
        dict={dict}
        title={dict.proces.ctaTitle}
        lead={dict.proces.ctaLead}
      />
    </>
  );
}
