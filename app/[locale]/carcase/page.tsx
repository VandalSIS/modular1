import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
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
    title: dict.carcase.title,
    description: dict.carcase.lead,
    keywords:
      locale === "ru"
        ? "модульный каркас, металлический каркас, оцинкованная сталь, каркас контейнера, конструкция модульного дома"
        : "carcasă modulară, schelet metalic, oțel galvanizat, carcasă container, structură casă modulară",
  };
}

export default async function CarcasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const carcase = productsByCategory("carcase");

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.nav.home, item: `${site.url}${localizedHref("/", locale)}` },
      { "@type": "ListItem", position: 2, name: dict.carcase.title, item: `${site.url}${localizedHref("/carcase", locale)}` },
    ],
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: carcase.map((p, idx) => ({
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
      <Script id="carcase-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Script id="carcase-itemlist" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <PageHero
        eyebrow={dict.carcase.eyebrow}
        title={dict.carcase.title}
        lead={dict.carcase.lead}
        image="/projects/carcase-frame-02.jpg"
        alt="Carcasă modulară Modus Construct în atelier"
      />

      {/* Catalog */}
      <section className="bg-canvas py-24 md:py-32">
        <div className="container-tight">
          <Reveal>
            <div className="mb-12 flex flex-col gap-3 md:mb-16">
              <span className="eyebrow">{dict.carcase.catalogTitle}</span>
              <h2 className="heading-display text-display-xl max-w-[18ch] text-balance">
                {dict.carcase.catalogLead}
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {carcase.map((p, idx) => (
              <Reveal key={p.slug} delay={idx * 0.06}>
                <ProductCard product={p} locale={locale} dict={dict} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications table */}
      <section className="bg-bone/30 py-24">
        <div className="container-tight">
          <Reveal>
            <h2 className="heading-display text-display-lg mb-10">{dict.carcase.specsTitle}</h2>
          </Reveal>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-y border-ink/20">
                  <th className="py-4 text-left text-xs uppercase tracking-[0.18em] text-mist">{locale === "ru" ? "Модель" : "Model"}</th>
                  <th className="py-4 text-left text-xs uppercase tracking-[0.18em] text-mist">{locale === "ru" ? "Размеры (мм)" : "Dimensiuni (mm)"}</th>
                  <th className="py-4 text-left text-xs uppercase tracking-[0.18em] text-mist">{locale === "ru" ? "Площадь" : "Suprafață"}</th>
                  <th className="py-4 text-left text-xs uppercase tracking-[0.18em] text-mist">{locale === "ru" ? "Цвета" : "Culori"}</th>
                  <th className="py-4 text-right text-xs uppercase tracking-[0.18em] text-mist">{dict.common.fromPrice}</th>
                </tr>
              </thead>
              <tbody>
                {carcase
                  .filter((p) => p.dimensions)
                  .map((p) => {
                    const d = p.dimensions!;
                    const area = ((d.length / 1000) * (d.width / 1000)).toFixed(1);
                    return (
                      <tr key={p.slug} className="border-b border-line">
                        <td className="py-5 text-base">{p.name[locale]}</td>
                        <td className="py-5 text-ink/70">
                          {d.length} × {d.width} × {d.height}
                        </td>
                        <td className="py-5 text-ink/70">{area} m²</td>
                        <td className="py-5 text-ink/70">{p.colors?.join(" · ")}</td>
                        <td className="py-5 text-right text-base font-medium">
                          {p.priceFrom ? `${p.priceFrom.toLocaleString("ro-RO")} €` : dict.common.onRequest}
                        </td>
                      </tr>
                    );
                  })}
                <tr>
                  <td className="py-5 text-base">{carcase.find((p) => !p.dimensions)?.name[locale]}</td>
                  <td colSpan={3} className="py-5 text-ochre">
                    {locale === "ru" ? "Любые размеры по запросу" : "Orice dimensiuni la cerere"}
                  </td>
                  <td className="py-5 text-right text-ochre">{dict.common.onRequest}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-canvas py-24 md:py-32">
        <div className="container-tight">
          <Reveal>
            <h2 className="heading-display text-display-lg mb-12 max-w-[18ch] text-balance">
              {dict.carcase.advantagesTitle}
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {dict.carcase.advantages.map((adv, idx) => (
              <Reveal key={adv.title} delay={idx * 0.05}>
                <div className="flex h-full flex-col gap-4 border border-line bg-canvas p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(15,15,16,0.16)]">
                  <span className="heading-display text-3xl text-ochre">0{idx + 1}</span>
                  <h3 className="heading-display text-xl">{adv.title}</h3>
                  <p className="text-sm leading-relaxed text-ink/70">{adv.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="bg-bone/30 py-24">
        <div className="container-tight grid gap-12 lg:grid-cols-[1fr,1.5fr]">
          <Reveal>
            <div className="flex flex-col gap-3">
              <span className="eyebrow">{dict.carcase.materialsTitle}</span>
              <h2 className="heading-display text-display-lg max-w-[14ch] text-balance">
                {dict.carcase.materialsLead}
              </h2>
            </div>
          </Reveal>
          <ul className="divide-y divide-line border-y border-line">
            {dict.carcase.materials.map((m, idx) => (
              <Reveal as="li" key={m.name} delay={idx * 0.05}>
                <div className="grid gap-2 py-6 md:grid-cols-[1fr,2fr] md:gap-8">
                  <p className="heading-display text-xl">{m.name}</p>
                  <p className="text-sm leading-relaxed text-ink/70">{m.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-bone py-20 md:py-28">
        <div className="container-tight grid gap-10 lg:grid-cols-[1.1fr,1fr] lg:items-start">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">{dict.quickLead.eyebrow}</span>
            <h2 className="heading-display text-display-xl text-balance">
              {dict.carcase.ctaTitle}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-ink/70">
              {dict.carcase.ctaLead}
            </p>
          </div>
          <Reveal>
            <QuickLeadForm locale={locale} dict={dict} defaultInterest="carcasa" />
          </Reveal>
        </div>
      </section>

      <CtaBanner
        locale={locale}
        dict={dict}
        title={dict.carcase.ctaTitle}
        lead={dict.carcase.ctaLead}
      />

      <div className="container-tight pb-16 pt-10 text-center">
        <Link href={localizedHref("/oferta", locale)} className="btn-primary">
          {dict.common.quote}
        </Link>
      </div>
    </>
  );
}
