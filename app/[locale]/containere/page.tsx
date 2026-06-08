import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { isLocale, getDictionary, localizedHref } from "@/lib/i18n";
import { site } from "@/lib/site";
import { productsByCategory } from "@/lib/products";
import { PageHero } from "@/components/sections/PageHero";
import { ProductCard } from "@/components/sections/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { QuickLeadForm } from "@/components/forms/QuickLeadForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.containere.title,
    description: dict.containere.lead,
    keywords:
      locale === "ru"
        ? "контейнерный дом, модульный офис, контейнер под ключ, мобильный магазин, охранная будка, модульная кабина"
        : "container de locuit, container birou, container la cheie, magazin modular, cabină pază, casă mobilă",
  };
}

export default async function ContainerePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const containere = productsByCategory("containere");
  const speciale = productsByCategory("speciale");

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.nav.home, item: `${site.url}${localizedHref("/", locale)}` },
      { "@type": "ListItem", position: 2, name: dict.containere.title, item: `${site.url}${localizedHref("/containere", locale)}` },
    ],
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [...containere, ...speciale].map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Product",
        name: p.name[locale],
        description: p.description[locale],
        image: `${site.url}${p.cover}`,
        ...(p.priceFrom
          ? {
              offers: {
                "@type": "Offer",
                priceCurrency: "EUR",
                price: p.priceFrom,
                availability: "https://schema.org/InStock",
              },
            }
          : {}),
      },
    })),
  };

  return (
    <>
      <Script id="containere-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Script id="containere-itemlist" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <PageHero
        eyebrow={dict.containere.eyebrow}
        title={dict.containere.title}
        lead={dict.containere.lead}
        image="/projects/container-exterior-01.jpg"
        alt="Container la cheie Modus Construct livrat în Chișinău"
      />

      {/* Categories grid */}
      <section className="bg-canvas py-24 md:py-32">
        <div className="container-tight">
          <Reveal>
            <h2 className="heading-display text-display-xl mb-12 max-w-[18ch] text-balance md:mb-16">
              {locale === "ru" ? "Что мы строим" : "Ce construim"}
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dict.containere.categories.map((cat, idx) => (
              <Reveal key={cat.title} delay={idx * 0.05}>
                <div className="group flex h-full flex-col gap-4 border border-line p-8 transition-all duration-500 hover:border-ink">
                  <span className="heading-display text-3xl text-mist transition-colors group-hover:text-ochre">
                    0{idx + 1}
                  </span>
                  <h3 className="heading-display text-2xl">{cat.title}</h3>
                  <p className="text-sm leading-relaxed text-ink/70">{cat.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="bg-bone/30 py-24 md:py-32">
        <div className="container-tight">
          <Reveal>
            <h2 className="heading-display text-display-xl mb-12 max-w-[18ch] text-balance md:mb-16">
              {locale === "ru" ? "Доступные модели" : "Modele disponibile"}
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {containere.map((p, idx) => (
              <Reveal key={p.slug} delay={idx * 0.05}>
                <ProductCard product={p} locale={locale} dict={dict} />
              </Reveal>
            ))}
          </div>

          <div className="mt-16">
            <Reveal>
              <h3 className="heading-display text-2xl mb-6">
                {locale === "ru" ? "Специальные конфигурации" : "Configurații speciale"}
              </h3>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {speciale.map((p, idx) => (
                <Reveal key={p.slug} delay={idx * 0.05}>
                  <ProductCard product={p} locale={locale} dict={dict} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Included checklist */}
      <section className="bg-canvas py-24 md:py-32">
        <div className="container-tight grid gap-12 lg:grid-cols-[1fr,1.6fr]">
          <Reveal>
            <div className="flex flex-col gap-4">
              <span className="eyebrow">{dict.containere.includedTitle}</span>
              <h2 className="heading-display text-display-lg max-w-[16ch] text-balance">
                {dict.containere.includedLead}
              </h2>
            </div>
          </Reveal>
          <ul className="grid gap-3 sm:grid-cols-2">
            {dict.containere.included.map((item, idx) => (
              <Reveal key={item} as="li" delay={idx * 0.03}>
                <div className="flex items-start gap-3 border border-line bg-canvas p-4">
                  <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center bg-ochre text-canvas">
                    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm text-ink/80">{item}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Comparator */}
      <section className="bg-ink py-24 text-canvas md:py-32">
        <div className="container-tight">
          <Reveal>
            <div className="mb-12 flex flex-col gap-3 md:mb-16">
              <span className="text-xs uppercase tracking-[0.22em] text-ochre">
                {dict.containere.comparatorTitle}
              </span>
              <h2 className="heading-display text-display-xl max-w-[18ch] text-balance">
                {dict.containere.comparatorLead}
              </h2>
            </div>
          </Reveal>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-canvas/20">
                  <th className="py-4 text-left text-xs uppercase tracking-[0.18em] text-canvas/60" />
                  <th className="py-4 text-left text-base font-medium">{dict.containere.comparatorCarcasaTitle}</th>
                  <th className="py-4 text-left text-base font-medium">{dict.containere.comparatorContainerTitle}</th>
                </tr>
              </thead>
              <tbody>
                {dict.containere.comparatorRows.map((row) => (
                  <tr key={row.label} className="border-b border-canvas/15">
                    <td className="py-5 text-xs uppercase tracking-[0.18em] text-canvas/60">{row.label}</td>
                    <td className="py-5 text-canvas/85">{row.carcasa}</td>
                    <td className="py-5 text-canvas/85">{row.container}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-bone py-20 md:py-28">
        <div className="container-tight grid gap-10 lg:grid-cols-[1.1fr,1fr] lg:items-start">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">{dict.quickLead.eyebrow}</span>
            <h2 className="heading-display text-display-xl text-balance">
              {dict.containere.ctaTitle}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-ink/70">
              {dict.containere.ctaLead}
            </p>
          </div>
          <Reveal>
            <QuickLeadForm locale={locale} dict={dict} defaultInterest="container" />
          </Reveal>
        </div>
      </section>

      <CtaBanner
        locale={locale}
        dict={dict}
        title={dict.containere.ctaTitle}
        lead={dict.containere.ctaLead}
      />
    </>
  );
}
