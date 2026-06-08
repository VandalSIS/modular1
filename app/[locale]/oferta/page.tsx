import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { isLocale, getDictionary, localizedHref } from "@/lib/i18n";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ConfiguratorLoader } from "@/components/configurator/ConfiguratorLoader";
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
    title: dict.oferta.title,
    description: dict.oferta.lead,
    robots: { index: true, follow: true },
  };
}

export default async function QuotePage({
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
      { "@type": "ListItem", position: 2, name: dict.oferta.title, item: `${site.url}${localizedHref("/oferta", locale)}` },
    ],
  };

  return (
    <>
      <Script id="oferta-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <PageHero
        eyebrow={dict.oferta.eyebrow}
        title={dict.oferta.title}
        lead={dict.oferta.lead}
        image="/projects/container-interior-02.jpg"
        alt="Cere o ofertă Modus Construct"
      />

      {/* Configurator */}
      <section className="bg-canvas py-20 md:py-28">
        <div className="container-tight">
          <Reveal>
            <div className="mb-10 flex flex-col gap-3">
              <span className="eyebrow">{dict.oferta.configuratorTitle}</span>
              <h2 className="heading-display text-display-lg max-w-[18ch] text-balance">
                {dict.oferta.configuratorLead}
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <ConfiguratorLoader locale={locale} dict={dict} />
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section id="quote-form" className="bg-bone/30 py-20 md:py-28">
        <div className="container-tight grid gap-12 lg:grid-cols-[1.4fr,1fr]">
          <div className="border border-line bg-canvas p-6 md:p-10">
            <Reveal>
              <QuoteForm locale={locale} dict={dict} />
            </Reveal>
          </div>
          <aside className="flex flex-col gap-8">
            <Reveal>
              <div className="border border-line bg-canvas p-6 md:p-8">
                <span className="eyebrow">{dict.oferta.instructionsTitle}</span>
                <p className="mt-4 text-base leading-relaxed text-ink/70 text-pretty">
                  {dict.oferta.instructionsLead}
                </p>
                <p className="mt-6 inline-flex items-center gap-2 border border-ochre/40 bg-ochre/10 px-3 py-2 text-xs uppercase tracking-[0.18em] text-ochre">
                  <span className="block h-1.5 w-1.5 rounded-full bg-ochre" />
                  {dict.oferta.estimatedReply}
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="border border-line bg-canvas p-6 md:p-8">
                <span className="eyebrow">{dict.oferta.contactBlockTitle}</span>
                <p className="mt-3 text-sm text-ink/70">{dict.oferta.contactBlockLead}</p>
                <dl className="mt-6 grid gap-4 text-sm">
                  <ContactRow label={dict.footer.addressLabel} value={`${site.address.street}, ${site.address.city}`} />
                  <ContactRow
                    label={dict.footer.phoneLabel}
                    value={<a href={`tel:${site.phoneRaw}`} className="hover:text-ink">{site.phone}</a>}
                  />
                  <ContactRow
                    label={dict.footer.emailLabel}
                    value={<a href={`mailto:${site.email}`} className="hover:text-ink">{site.email}</a>}
                  />
                  <ContactRow label={dict.footer.hoursLabel} value={site.hours} />
                </dl>
              </div>
            </Reveal>
            <Reveal>
              <iframe
                title="Modus Construct — atelier Chișinău"
                src={`https://www.google.com/maps?q=${site.address.geo.lat},${site.address.geo.lng}&hl=${locale}&z=15&output=embed`}
                className="h-[280px] w-full border border-line"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}

function ContactRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[110px,1fr] gap-3">
      <dt className="text-[10px] uppercase tracking-[0.18em] text-mist">{label}</dt>
      <dd className="text-sm text-ink/80">{value}</dd>
    </div>
  );
}
