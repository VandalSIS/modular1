import Link from "next/link";
import { site, type Locale } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";
import { localizedHref } from "@/lib/i18n";
import { Logo } from "../brand/Logo";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const year = new Date().getFullYear();

  const productLinks = [
    { href: "/carcase", label: dict.nav.carcase },
    { href: "/containere", label: dict.nav.containere },
    { href: "/portofoliu", label: dict.nav.portofoliu },
  ];

  const companyLinks = [
    { href: "/proces", label: dict.nav.proces },
    { href: "/despre", label: dict.nav.despre },
    { href: "/oferta", label: dict.nav.oferta },
  ];

  return (
    <footer className="border-t border-line bg-canvas">
      <div className="container-tight py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr,1fr,1fr,1fr]">
          <div className="flex flex-col gap-6">
            <Link
              href={localizedHref("/", locale)}
              className="flex items-center gap-2 text-ink"
            >
              <Logo className="h-9 w-auto" />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-ink/70">{dict.footer.tagline}</p>
            <div className="flex gap-3 pt-2">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-line transition-colors hover:border-ink"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-line transition-colors hover:border-ink"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M14 8h2V5h-2c-1.66 0-3 1.34-3 3v2H9v3h2v8h3v-8h2.5l.5-3H14V8.5c0-.28.22-.5.5-.5z" />
                </svg>
              </a>
              <a
                href={site.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-line transition-colors hover:border-ink"
                aria-label="TikTok"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.01a8.16 8.16 0 0 0 4.77 1.52V7.08a4.85 4.85 0 0 1-1.84-.39Z" />
                </svg>
              </a>
            </div>
          </div>

          <FooterColumn title={dict.footer.contactTitle}>
            <FooterItem label={dict.footer.addressLabel}>
              {site.address.street}
              <br />
              {site.address.city}, {site.address.country}
            </FooterItem>
            <FooterItem label={dict.footer.phoneLabel}>
              <a href={`tel:${site.phoneRaw}`} className="hover:text-ink">
                {site.phone}
              </a>
            </FooterItem>
            <FooterItem label={dict.footer.emailLabel}>
              <a href={`mailto:${site.email}`} className="hover:text-ink">
                {site.email}
              </a>
            </FooterItem>
            <FooterItem label={dict.footer.hoursLabel}>{site.hours}</FooterItem>
          </FooterColumn>

          <FooterColumn title={dict.footer.productsTitle}>
            {productLinks.map((l) => (
              <li key={l.href}>
                <Link href={localizedHref(l.href, locale)} className="text-sm text-ink/70 hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title={dict.footer.companyTitle}>
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={localizedHref(l.href, locale)} className="text-sm text-ink/70 hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 text-xs uppercase tracking-[0.18em] text-mist md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. {dict.footer.rights}
          </p>
          <p>{dict.footer.builtBy}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow mb-6">{title}</h2>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-[0.18em] text-mist">{label}</span>
      <span className="text-sm text-ink/70">{children}</span>
    </li>
  );
}
