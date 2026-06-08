import Image from "next/image";
import type { Locale } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";
import type { ProductSpec } from "@/lib/products";

interface ProductCardProps {
  product: ProductSpec;
  locale: Locale;
  dict: Dictionary;
}

export function ProductCard({ product, locale, dict }: ProductCardProps) {
  const dims = product.dimensions
    ? `${product.dimensions.length / 1000} × ${product.dimensions.width / 1000} × ${product.dimensions.height / 1000} m`
    : null;
  return (
    <article className="card group flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-bone">
        <Image
          src={product.cover}
          alt={`${product.name[locale]} — ${product.tagline[locale]}`}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="ken-burns object-cover"
        />
        <div className="absolute right-3 top-3 bg-canvas/95 px-3 py-1 text-[10px] uppercase tracking-[0.2em]">
          {product.priceFrom ? (
            <>
              <span className="text-mist">{dict.common.fromPrice}</span>{" "}
              <span className="font-medium text-ink">
                {product.priceFrom.toLocaleString("ro-RO")} {dict.common.eur}
              </span>
            </>
          ) : (
            <span className="text-ochre">{dict.common.onRequest}</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="heading-display text-2xl">{product.name[locale]}</h3>
          {dims && <p className="mt-1 text-xs uppercase tracking-[0.18em] text-mist">{dims}</p>}
        </div>
        <p className="text-sm leading-relaxed text-ink/70">{product.tagline[locale]}</p>
        <ul className="mt-auto flex flex-col gap-1 border-t border-line pt-4 text-sm text-ink/80">
          {product.features[locale].slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span className="mt-2 h-px w-2 flex-none bg-ochre" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
