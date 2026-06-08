import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

export const runtime = "nodejs";

interface QuotePayload {
  projectType: string;
  area: string;
  raion: string;
  city: string;
  deadline: string;
  budget: string;
  fullName: string;
  phone: string;
  email: string;
  message: string;
  consent: string;
  locale: string;
  company: string;
}

async function buildAttachments(formData: FormData) {
  const files = formData.getAll("attachments");
  const attachments: { filename: string; content: Buffer; contentType: string }[] = [];
  for (const entry of files) {
    if (!(entry instanceof File)) continue;
    if (entry.size === 0 || entry.size > 10 * 1024 * 1024) continue;
    const buffer = Buffer.from(await entry.arrayBuffer());
    attachments.push({
      filename: entry.name,
      content: buffer,
      contentType: entry.type || "application/octet-stream",
    });
  }
  return attachments;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const payload = Object.fromEntries(
      Array.from(formData.entries()).filter(([k]) => k !== "attachments"),
    ) as unknown as QuotePayload;

    if (payload.company) {
      return NextResponse.json({ ok: true });
    }

    if (!payload.email || !payload.phone || !payload.fullName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const attachments = await buildAttachments(formData);

    const subject = `[${site.name}] Cerere ofertă · ${payload.projectType} · ${payload.area} m²`;
    const html = renderEmail(payload);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: process.env.SMTP_SECURE !== "false",
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
        : undefined,
    });

    // If SMTP isn't configured we still return success in dev so the UI flow
    // can be tested. The submission is logged so the team can replay it.
    if (!process.env.SMTP_HOST) {
      console.warn("[quote] SMTP not configured. Payload:", payload, "attachments:", attachments.length);
      return NextResponse.json({ ok: true, dev: true });
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? `${site.name} <${site.email}>`,
      to: process.env.CONTACT_EMAIL ?? site.email,
      replyTo: payload.email,
      subject,
      html,
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[quote] error", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}

function renderEmail(payload: QuotePayload) {
  const rows: [string, string][] = [
    ["Tip proiect", payload.projectType],
    ["Suprafață", `${payload.area} m²`],
    ["Raion", payload.raion],
    ["Localitate", payload.city],
    ["Termen dorit", payload.deadline],
    ["Buget", payload.budget || "—"],
    ["Nume", payload.fullName],
    ["Telefon", payload.phone],
    ["Email", payload.email],
    ["Mesaj", payload.message || "—"],
    ["Locale", payload.locale],
  ];
  return `
  <div style="font-family: 'Inter', system-ui, sans-serif; max-width: 640px; margin: 0 auto; padding: 32px; color: #0f0f10; background: #fafaf7;">
    <h1 style="font-family: Georgia, serif; font-size: 28px; margin: 0 0 8px;">Cerere nouă · ${site.name}</h1>
    <p style="margin: 0 0 24px; color: #888880;">Lead generat via ${site.url}/oferta</p>
    <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
      ${rows
        .map(
          ([label, value]) => `
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e3e1d8; color: #888880; text-transform: uppercase; letter-spacing: .18em; font-size: 10px; width: 30%;">${label}</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e3e1d8;">${escapeHtml(value)}</td>
        </tr>
      `,
        )
        .join("")}
    </table>
    <p style="margin-top: 24px; color: #888880; font-size: 12px;">Răspunde direct la acest email pentru a contacta clientul.</p>
  </div>
  `;
}

function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
