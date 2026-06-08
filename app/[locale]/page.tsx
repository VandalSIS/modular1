import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { isLocale, getDictionary, localizedHref } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Hero } from "@/components/sections/Hero";
import { DirectionsBlock } from "@/components/sections/DirectionsBlock";
import { StatsBlock } from "@/components/sections/StatsBlock";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
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
  const title =
    locale === "ru"
      ? "Модульное строительство в Молдове · Modus Construct"
      : "Construcții modulare în Moldova · Modus Construct";
  return {
    title,
    description: dict.home.heroLead,
    keywords:
      locale === "ru"
        ? "модульные дома Молдова, контейнерные дома, сборные дома Кишинев, модульная кабина, мобильный дом, дом контейнер, строительство модульных домов"
        : "case modulare Moldova, case modulare Chișinău, containere modulare, case prefabricate Moldova, case container, cabană modulară, construcții modulare, atelier case modulare",
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.home.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: dict.nav.home,
        item: `${site.url}${localizedHref("/", locale)}`,
      },
    ],
  };

  return (
    <>
      <Script
        id="home-faq-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Script
        id="home-breadcrumb-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Hero locale={locale} dict={dict} />
      <DirectionsBlock locale={locale} dict={dict} />
      <StatsBlock dict={dict} />
      <ProcessTimeline dict={dict} />
      <PortfolioGrid locale={locale} dict={dict} limit={6} />
      <Testimonials dict={dict} />

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
      />
      <Faq dict={dict} />
    </>
  );
}
