import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, getDictionary, localizedHref } from "@/lib/i18n";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
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
    title: dict.despre.title,
    description: dict.despre.lead,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const workshopImages = [
    "/projects/carcase-frame-02.jpg",
    "/projects/container-detail-01.jpg",
    "/projects/container-site-01.jpg",
    "/projects/carcase-frame-03.jpg",
  ];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.nav.home, item: `${site.url}${localizedHref("/", locale)}` },
      { "@type": "ListItem", position: 2, name: dict.despre.title, item: `${site.url}${localizedHref("/despre", locale)}` },
    ],
  };

  return (
    <>
      <Script id="despre-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <PageHero
        eyebrow={dict.despre.eyebrow}
        title={dict.despre.title}
        lead={dict.despre.lead}
        image="/projects/container-interior-02.jpg"
        alt="Echipa Modus Construct în atelierul din Chișinău"
      />

      <section className="bg-canvas py-24 md:py-32">
        <div className="container-tight grid gap-12 lg:grid-cols-[1fr,1.6fr]">
          <Reveal>
            <div className="flex flex-col gap-4">
              <span className="eyebrow">{dict.despre.storyTitle}</span>
              <h2 className="heading-display text-display-lg max-w-[12ch] text-balance">
                {dict.despre.storyTitle}
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lg leading-relaxed text-ink/80 text-pretty">{dict.despre.storyBody}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bone/30 py-24">
        <div className="container-tight">
          <Reveal>
            <div className="mb-12 flex flex-col gap-3">
              <span className="eyebrow">{dict.despre.valuesTitle}</span>
              <h2 className="heading-display text-display-lg max-w-[18ch] text-balance">
                {dict.despre.valuesTitle}
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {dict.despre.values.map((v, idx) => (
              <Reveal key={v.title} delay={idx * 0.05}>
                <div className="flex h-full flex-col gap-4 bg-canvas p-8">
                  <span className="heading-display text-2xl text-ochre">0{idx + 1}</span>
                  <h3 className="heading-display text-xl">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-ink/70">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-canvas py-24 md:py-32">
        <div className="container-tight">
          <Reveal>
            <div className="mb-12 flex flex-col gap-3">
              <span className="eyebrow">{dict.despre.foundersTitle}</span>
              <h2 className="heading-display text-display-xl max-w-[18ch] text-balance">
                {dict.despre.foundersTitle}
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-2">
            {dict.despre.founders.map((founder, idx) => (
              <Reveal key={founder.name} delay={idx * 0.05}>
                <article className="flex flex-col gap-5">
                  {/* TODO: replace placeholder image with real founder photo */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-bone">
                    <Image
                      src={idx === 0 ? "/projects/carcase-frame-03.jpg" : "/projects/container-interior-01.jpg"}
                      alt={`${founder.name} — ${founder.role}`}
                      fill
                      sizes="(min-width:768px) 50vw, 100vw"
                      className="ken-burns object-cover grayscale"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="heading-display text-2xl">{founder.name}</h3>
                    <p className="text-xs uppercase tracking-[0.18em] text-mist">{founder.role}</p>
                    <p className="text-sm leading-relaxed text-ink/70">{founder.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone/30 py-24">
        <div className="container-tight">
          <Reveal>
            <div className="mb-12 flex flex-col gap-3">
              <span className="eyebrow">{dict.despre.workshopTitle}</span>
              <h2 className="heading-display text-display-lg max-w-[18ch] text-balance">
                {dict.despre.workshopLead}
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {workshopImages.map((src, idx) => (
              <Reveal key={src} delay={idx * 0.05}>
                <div className="relative aspect-square overflow-hidden bg-bone">
                  <Image
                    src={src}
                    alt={`Atelier Modus Construct — ${idx + 1}`}
                    fill
                    sizes="25vw"
                    className="ken-burns object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-canvas py-24">
        <div className="container-tight grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="flex flex-col gap-4">
              <span className="eyebrow">{dict.despre.certificationsTitle}</span>
              <ul className="flex flex-col gap-3 border-y border-line py-6">
                {dict.despre.certifications.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-ink/80">
                    <span className="mt-2 h-px w-3 flex-none bg-ochre" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="flex flex-col gap-4">
              <span className="eyebrow">{dict.despre.partnersTitle}</span>
              <ul className="flex flex-col gap-3 border-y border-line py-6">
                {dict.despre.partners.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-ink/80">
                    <span className="mt-2 h-px w-3 flex-none bg-ochre" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        locale={locale}
        dict={dict}
        title={dict.home.ctaTitle}
        lead={dict.home.ctaLead}
      />
    </>
  );
}
