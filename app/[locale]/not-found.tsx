import Link from "next/link";
import { site } from "@/lib/site";

export default function LocaleNotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="eyebrow">404</span>
      <h1 className="heading-display text-display-xl max-w-[16ch] text-balance">
        Pagina nu există
      </h1>
      <p className="max-w-md text-base text-ink/70">
        Linkul pe care l-ai urmat e probabil unul vechi. Mergi înapoi la pagina principală.
      </p>
      <Link href={`/${site.defaultLocale}`} className="btn-primary mt-2">
        Înapoi la pagina principală
      </Link>
    </main>
  );
}
