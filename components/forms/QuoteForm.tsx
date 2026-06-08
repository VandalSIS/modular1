"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/lib/site";
import { site } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";
import { localizedHref } from "@/lib/i18n";

interface QuoteFormProps {
  locale: Locale;
  dict: Dictionary;
}

interface FormState {
  projectType: string;
  area: number;
  raion: string;
  city: string;
  deadline: string;
  budget: string;
  fullName: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
  /** honeypot — must remain empty */
  company: string;
}

interface FieldErrors {
  [key: string]: string | undefined;
}

const TOTAL_STEPS = 4;

export function QuoteForm({ locale, dict }: QuoteFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<FormState>({
    projectType: "",
    area: 24,
    raion: "",
    city: "",
    deadline: "",
    budget: "",
    fullName: "",
    phone: "",
    email: "",
    message: "",
    consent: false,
    company: "",
  });

  // Pre-fill from configurator (sessionStorage key)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const config = window.sessionStorage.getItem("modus-config");
    if (config) {
      try {
        const parsed = JSON.parse(config) as {
          area: number;
          message: string;
        };
        setState((s) => ({
          ...s,
          area: parsed.area ?? s.area,
          message: parsed.message ?? s.message,
        }));
      } catch {
        /* noop */
      }
    }
  }, []);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((s) => ({ ...s, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateStep = (current: number): FieldErrors => {
    const next: FieldErrors = {};
    if (current === 1 && !state.projectType) next.projectType = dict.oferta.validationRequired;
    if (current === 2) {
      if (!state.raion) next.raion = dict.oferta.validationRequired;
      if (!state.city) next.city = dict.oferta.validationRequired;
      if (!state.deadline) next.deadline = dict.oferta.validationRequired;
    }
    if (current === 4) {
      if (!state.fullName) next.fullName = dict.oferta.validationRequired;
      if (!state.phone) next.phone = dict.oferta.validationRequired;
      else if (!/^[+\d\s\-().]{7,}$/.test(state.phone)) next.phone = dict.oferta.validationPhone;
      if (!state.email) next.email = dict.oferta.validationRequired;
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email))
        next.email = dict.oferta.validationEmail;
      if (!state.consent) next.consent = dict.oferta.validationRequired;
    }
    return next;
  };

  const next = () => {
    const next = validateStep(step);
    if (Object.keys(next).length === 0) {
      setStep((s) => Math.min(TOTAL_STEPS, s + 1));
      setErrors({});
    } else {
      setErrors(next);
    }
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const calculatorRange = useMemo(() => {
    const low = Math.round(state.area * 220);
    const high = Math.round(state.area * 420);
    return { low, high };
  }, [state.area]);

  const onFilesAdded = (incoming: FileList | null) => {
    if (!incoming) return;
    const list = Array.from(incoming).slice(0, 5 - files.length);
    const filtered = list.filter((f) => f.size <= 10 * 1024 * 1024);
    setFiles((current) => [...current, ...filtered].slice(0, 5));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.company) {
      setStatus("success");
      return;
    }
    const finalErrors = validateStep(4);
    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      return;
    }
    setSubmitting(true);
    setStatus("idle");
    try {
      const data = new FormData();
      Object.entries(state).forEach(([k, v]) => data.append(k, String(v)));
      data.append("locale", locale);
      files.forEach((file) => data.append("attachments", file));

      const res = await fetch("/api/quote", { method: "POST", body: data });
      if (!res.ok) throw new Error("Submit failed");
      setStatus("success");
      window.sessionStorage.removeItem("modus-config");
      setTimeout(() => {
        router.push(localizedHref("/", locale));
      }, 5000);
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6 border border-line bg-canvas px-6 py-16 text-center"
      >
        <span className="flex h-16 w-16 items-center justify-center bg-ochre/10 text-ochre">
          <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" aria-hidden>
            <path d="M6 17L13 24L26 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="heading-display text-3xl text-balance">{dict.oferta.successTitle}</h3>
        <p className="max-w-md text-base text-ink/70">{dict.oferta.successLead}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-8">
      {/* Honeypot */}
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Company
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={state.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </label>
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-mist">
          <span>
            {dict.oferta.step} {step} {dict.oferta.of} {TOTAL_STEPS}
          </span>
          <span>{Math.round((step / TOTAL_STEPS) * 100)}% {dict.oferta.progress}</span>
        </div>
        <div className="h-px w-full bg-line">
          <motion.div
            className="h-px bg-ochre"
            initial={false}
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8"
        >
          {step === 1 && (
            <Step title={dict.oferta.step1Title} lead={dict.oferta.step1Lead}>
              <div className="grid gap-3 sm:grid-cols-2">
                {dict.oferta.projectTypeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => update("projectType", opt.value)}
                    className={`flex items-center justify-between border p-4 text-left text-sm transition-all duration-300 ${
                      state.projectType === opt.value
                        ? "border-ink bg-ink text-canvas"
                        : "border-line hover:border-ink"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {state.projectType === opt.value && (
                      <svg className="h-4 w-4 flex-none" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M3 8L7 12L13 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              {errors.projectType && <p className="text-xs text-red-600">{errors.projectType}</p>}
            </Step>
          )}

          {step === 2 && (
            <Step title={dict.oferta.step2Title} lead={dict.oferta.step2Lead}>
              <div>
                <label className="label-floating" htmlFor="area">
                  {dict.oferta.area} · <span className="text-ink">{state.area} m²</span>
                </label>
                <input
                  id="area"
                  type="range"
                  min={6}
                  max={120}
                  step={1}
                  value={state.area}
                  onChange={(e) => update("area", Number(e.target.value))}
                  className="w-full accent-ochre"
                />
                <p className="mt-1 text-xs text-mist">{dict.oferta.areaHint}</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label={dict.oferta.locationRaion} error={errors.raion}>
                  <input
                    className="input-field"
                    value={state.raion}
                    onChange={(e) => update("raion", e.target.value)}
                    placeholder="Chișinău, Bălți, Orhei..."
                  />
                </Field>
                <Field label={dict.oferta.locationCity} error={errors.city}>
                  <input
                    className="input-field"
                    value={state.city}
                    onChange={(e) => update("city", e.target.value)}
                    placeholder={locale === "ru" ? "Например: Чореску" : "Ex: Ciorescu"}
                  />
                </Field>
              </div>
              <Field label={dict.oferta.deadline} error={errors.deadline}>
                <div className="grid gap-2 sm:grid-cols-3">
                  {dict.oferta.deadlineOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => update("deadline", opt.value)}
                      className={`border p-3 text-sm transition-all ${
                        state.deadline === opt.value
                          ? "border-ink bg-ink text-canvas"
                          : "border-line hover:border-ink"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </Field>
            </Step>
          )}

          {step === 3 && (
            <Step title={dict.oferta.step3Title} lead={dict.oferta.step3Lead}>
              <Field label={dict.oferta.budget}>
                <div className="grid gap-2 sm:grid-cols-2">
                  {dict.oferta.budgetOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => update("budget", opt.value)}
                      className={`border p-3 text-left text-sm transition-all ${
                        state.budget === opt.value
                          ? "border-ink bg-ink text-canvas"
                          : "border-line hover:border-ink"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-xs text-mist">{dict.oferta.budgetHint}</p>
              </Field>

              <div className="border border-line bg-bone/40 p-6">
                <span className="eyebrow">{dict.oferta.calculatorTitle}</span>
                <p className="mt-2 text-sm text-ink/70">{dict.oferta.calculatorLead}</p>
                <p className="mt-4 heading-display text-2xl text-balance">
                  {dict.oferta.calculatorEstimate}{" "}
                  <span className="text-ochre">
                    {calculatorRange.low.toLocaleString("ro-RO")} €
                  </span>{" "}
                  – {" "}
                  <span className="text-ochre">
                    {calculatorRange.high.toLocaleString("ro-RO")} €
                  </span>
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-mist">
                  {state.area} m² · {dict.common.fromPrice} 220 €/m²
                </p>
              </div>
            </Step>
          )}

          {step === 4 && (
            <Step title={dict.oferta.step4Title} lead={dict.oferta.step4Lead}>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label={dict.oferta.fullName} error={errors.fullName}>
                  <input
                    className="input-field"
                    value={state.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    autoComplete="name"
                  />
                </Field>
                <Field label={dict.oferta.phone} error={errors.phone}>
                  <input
                    className="input-field"
                    value={state.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+373 ..."
                  />
                </Field>
              </div>
              <Field label={dict.oferta.email} error={errors.email}>
                <input
                  className="input-field"
                  value={state.email}
                  onChange={(e) => update("email", e.target.value)}
                  autoComplete="email"
                  inputMode="email"
                  type="email"
                />
              </Field>
              <Field label={dict.oferta.message}>
                <textarea
                  className="input-field min-h-[120px] resize-none border-b border-line"
                  value={state.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={4}
                />
              </Field>

              <Field label={dict.oferta.attachments}>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    onFilesAdded(e.dataTransfer.files);
                  }}
                  className={`flex flex-col items-center justify-center gap-2 border border-dashed p-8 text-center transition-colors ${
                    dragOver ? "border-ochre bg-ochre/5" : "border-line"
                  }`}
                >
                  <p className="text-sm text-ink/70">
                    {locale === "ru"
                      ? "Перетащите файлы сюда или"
                      : "Trage fișierele aici sau"}{" "}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="underline underline-offset-4 text-ochre"
                    >
                      {locale === "ru" ? "выберите с устройства" : "selectează din dispozitiv"}
                    </button>
                  </p>
                  <p className="text-xs text-mist">{dict.oferta.attachmentsHint}</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => onFilesAdded(e.target.files)}
                  />
                </div>
                {files.length > 0 && (
                  <ul className="mt-3 flex flex-col gap-2">
                    {files.map((f, idx) => (
                      <li
                        key={`${f.name}-${idx}`}
                        className="flex items-center justify-between border border-line px-3 py-2 text-sm"
                      >
                        <span className="truncate">{f.name}</span>
                        <button
                          type="button"
                          onClick={() => setFiles((c) => c.filter((_, i) => i !== idx))}
                          className="text-xs uppercase tracking-[0.18em] text-mist hover:text-ink"
                        >
                          {locale === "ru" ? "Удалить" : "Șterge"}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </Field>

              <label className="flex items-start gap-3 text-sm text-ink/70">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-ink"
                  checked={state.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                />
                <span>{dict.oferta.consent}</span>
              </label>
              {errors.consent && <p className="text-xs text-red-600">{errors.consent}</p>}

              {status === "error" && (
                <div className="border border-red-600/30 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <p className="font-medium">{dict.oferta.errorTitle}</p>
                  <p>
                    {dict.oferta.errorLead}{" "}
                    <a href={`tel:${site.phoneRaw}`} className="underline">
                      {site.phone}
                    </a>
                  </p>
                </div>
              )}
            </Step>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <button
          type="button"
          onClick={prev}
          disabled={step === 1}
          className="btn-ghost disabled:opacity-30"
        >
          ← {dict.common.previous}
        </button>
        {step < TOTAL_STEPS ? (
          <button type="button" onClick={next} className="btn-primary">
            {dict.common.next} →
          </button>
        ) : (
          <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
            {submitting ? dict.oferta.submitting : dict.oferta.submit}
          </button>
        )}
      </div>
    </form>
  );
}

function Step({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="heading-display text-display-lg text-balance">{title}</h3>
        <p className="max-w-xl text-base text-ink/70">{lead}</p>
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="label-floating">{label}</span>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
