import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { isLocale, getDictionary, localizedHref } from "@/lib/i18n";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { portfolio } from "@/lib/portfolio";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { QuickLeadForm } from "@/components/forms/QuickLeadForm";
import { Reveal } from "@/components/motion/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.portofoliu.title,
    description: dict.portofoliu.lead,
  };
}

export default async function PortfolioPage({
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
      { "@type": "ListItem", position: 2, name: dict.portofoliu.title, item: `${site.url}${localizedHref("/portofoliu", locale)}` },
    ],
  };
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: portfolio.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${site.url}${localizedHref("/portofoliu", locale)}#${p.slug}`,
      name: p.title[locale],
    })),
  };

  return (
    <>
      <Script id="portfolio-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Script id="portfolio-itemlist" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <PageHero
        eyebrow={dict.portofoliu.eyebrow}
        title={dict.portofoliu.title}
        lead={dict.portofoliu.lead}
        image="/projects/container-site-01.jpg"
        alt="Proiecte modulare livrate Modus Construct"
      />
      <PortfolioGrid locale={locale} dict={dict} withFilters />

      <section className="bg-bone py-20 md:py-28">
        <div className="container-tight grid gap-10 lg:grid-cols-[1.1fr,1fr] lg:items-start">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">{dict.quickLead.eyebrow}</span>
            <h2 className="heading-display text-display-xl text-balance">
              {dict.quickLead.title}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-ink/70">
              {dict.quickLead.lead}
            </p>
          </div>
          <Reveal>
            <QuickLeadForm locale={locale} dict={dict} />
          </Reveal>
        </div>
      </section>

      <CtaBanner
        locale={locale}
        dict={dict}
        title={dict.home.ctaTitle}
        lead={dict.home.ctaLead}
        variant="light"
      />
    </>
  );
}
