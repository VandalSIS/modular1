"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import type { Locale } from "@/lib/site";
import { site } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";
import { localizedHref } from "@/lib/i18n";

type Status = "idle" | "submitting" | "success" | "error";

interface QuickLeadFormProps {
  locale: Locale;
  dict: Dictionary;
  /** Optional context (project / product slug or title) saved in the message. */
  projectContext?: string;
  /** Pre-select interest when opened from a specific category page. */
  defaultInterest?: string;
  /** When true, hides the wrapper and renders just the form (no card chrome). */
  bare?: boolean;
  /** Optional close handler for modal usage. */
  onSuccess?: () => void;
}

/**
 * Compact 4-field lead form (name, contact, interest, optional message).
 * Posts to /api/quote — the existing endpoint handles full and quick leads.
 * Fields not relevant to quick capture are sent empty so server-side
 * validation (fullName / phone / email) still passes — we map "contact" to
 * either phone or email automatically.
 */
export function QuickLeadForm({
  locale,
  dict,
  projectContext,
  defaultInterest,
  bare = false,
  onSuccess,
}: QuickLeadFormProps) {
  const t = dict.quickLead;
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get("name") ?? "").trim();
    const contact = String(fd.get("contact") ?? "").trim();
    const interest = String(fd.get("interest") ?? "");
    const message = String(fd.get("message") ?? "").trim();
    const company = String(fd.get("company") ?? "");

    if (!name || !contact) {
      setStatus("error");
      return;
    }

    const isEmail = /\S+@\S+\.\S+/.test(contact);
    const payload = new FormData();
    payload.set("fullName", name);
    payload.set("email", isEmail ? contact : `lead-${Date.now()}@modus.md`);
    payload.set("phone", isEmail ? "—" : contact);
    payload.set("projectType", interest || "altul");
    payload.set("area", "—");
    payload.set("raion", "—");
    payload.set("city", "—");
    payload.set("deadline", "—");
    payload.set("budget", "—");
    payload.set(
      "message",
      [projectContext ? `${t.forProject}: ${projectContext}` : null, message]
        .filter(Boolean)
        .join("\n\n"),
    );
    payload.set("consent", "on");
    payload.set("locale", locale);
    payload.set("company", company);

    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", { method: "POST", body: payload });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
      onSuccess?.();
    } catch (err) {
      console.error("[quick-lead]", err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={bare ? "" : "card border border-line bg-canvas p-6 md:p-8"}>
        <div className="flex flex-col items-start gap-3">
          <span className="eyebrow text-ochre">{t.successTitle}</span>
          <p className="text-base leading-relaxed text-ink/80">{t.successLead}</p>
        </div>
      </div>
    );
  }

  const fields = (
    <>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.name} htmlFor={`${formId}-name`} required>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            className="input-field"
          />
        </Field>
        <Field
          label={t.contact}
          htmlFor={`${formId}-contact`}
          required
          hint={t.contactHint}
        >
          <input
            id={`${formId}-contact`}
            name="contact"
            type="text"
            required
            autoComplete="email"
            placeholder="email@exemplu.md / +373 …"
            className="input-field"
          />
        </Field>
      </div>

      <Field label={t.interest} htmlFor={`${formId}-interest`}>
        <select
          id={`${formId}-interest`}
          name="interest"
          defaultValue={defaultInterest ?? ""}
          className="input-field"
        >
          <option value="" disabled>
            {t.interest}
          </option>
          {t.interestOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t.message} htmlFor={`${formId}-message`}>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={3}
          placeholder={t.messagePlaceholder}
          className="input-field resize-none"
        />
      </Field>

      {projectContext && (
        <p className="text-xs uppercase tracking-[0.18em] text-mist">
          {t.forProject}: <span className="text-ink/80 normal-case tracking-normal">{projectContext}</span>
        </p>
      )}

      {status === "error" && (
        <p className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {t.errorLead}
        </p>
      )}

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary w-full sm:w-auto"
        >
          {status === "submitting" ? t.submitting : t.submit}
        </button>
        <Link
          href={localizedHref("/oferta", locale)}
          className="text-xs uppercase tracking-[0.18em] text-mist underline-offset-4 hover:text-ink hover:underline"
        >
          {t.fullFormCta} →
        </Link>
      </div>
    </>
  );

  if (bare) {
    return (
      <form onSubmit={handleSubmit} className="relative flex flex-col gap-5">
        {fields}
      </form>
    );
  }

  return (
    <div className="card border border-line bg-canvas p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-2">
        <span className="eyebrow">{t.eyebrow}</span>
        <h3 className="heading-display text-2xl md:text-3xl">{t.title}</h3>
        <p className="text-sm leading-relaxed text-ink/70">{t.lead}</p>
      </div>
      <form onSubmit={handleSubmit} className="relative flex flex-col gap-5">
        {fields}
      </form>
    </div>
  );
}

/* ---------- Modal trigger wrapper ---------- */

interface QuickLeadModalProps extends Omit<QuickLeadFormProps, "bare" | "onSuccess"> {
  triggerLabel?: string;
  triggerClassName?: string;
}

export function QuickLeadModal({
  locale,
  dict,
  projectContext,
  defaultInterest,
  triggerLabel,
  triggerClassName,
}: QuickLeadModalProps) {
  const [open, setOpen] = useState(false);
  const t = dict.quickLead;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClassName ?? "btn-primary"}
      >
        {triggerLabel ?? (projectContext ? t.triggerLabelProject : t.triggerLabel)}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/70 backdrop-blur-sm md:items-center"
          >
            <button
              type="button"
              className="absolute inset-0"
              aria-label={t.close}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-xl bg-canvas p-6 md:p-10"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.close}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-line bg-canvas hover:bg-bone"
              >
                <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
              <div className="mb-6 flex flex-col gap-2 pr-10">
                <span className="eyebrow">{t.eyebrow}</span>
                <h3 className="heading-display text-2xl md:text-3xl">
                  {projectContext ? t.inlineTitle : t.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink/70">
                  {projectContext ? t.inlineLead : t.lead}
                </p>
              </div>
              <QuickLeadForm
                locale={locale}
                dict={dict}
                projectContext={projectContext}
                defaultInterest={defaultInterest}
                bare
                onSuccess={() => {
                  setTimeout(() => setOpen(false), 2400);
                }}
              />
              <p className="mt-6 text-xs text-mist">
                {site.phone} · {site.email}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Helpers ---------- */

function Field({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="text-[10px] uppercase tracking-[0.18em] text-mist">
        {label}
        {required && <span className="ml-1 text-ochre">*</span>}
      </span>
      {children}
      {hint && <span className="text-xs text-mist">{hint}</span>}
    </label>
  );
}
