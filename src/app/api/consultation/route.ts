import { NextResponse } from "next/server";

import {
  MIN_PROCESS_LENGTH,
  type ConsultationValues,
} from "@/lib/consultation";
import th from "@/content/th";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalise(body: Record<string, unknown>): ConsultationValues {
  return {
    company: asString(body.company),
    name: asString(body.name),
    phone: asString(body.phone),
    lineId: asString(body.lineId),
    email: asString(body.email),
    industry: asString(body.industry),
    size: asString(body.size),
    process: asString(body.process),
    tools: asString(body.tools),
    consent: body.consent === true,
  };
}

/** Server-side mirror of the client rules — never trust the browser alone. */
function findInvalidFields(values: ConsultationValues): string[] {
  const invalid: string[] = [];
  const phoneDigits = values.phone.replace(/\D/g, "");

  if (values.company.length < 2) invalid.push("company");
  if (values.name.length < 2) invalid.push("name");
  if (phoneDigits.length < 9 || phoneDigits.length > 15) invalid.push("phone");
  if (!EMAIL_PATTERN.test(values.email)) invalid.push("email");
  if (values.industry.length < 2) invalid.push("industry");
  if (!(th.form.sizeOptions as readonly string[]).includes(values.size)) {
    invalid.push("size");
  }
  if (values.process.length < MIN_PROCESS_LENGTH) invalid.push("process");
  if (!values.consent) invalid.push("consent");

  return invalid;
}

/**
 * Delivery adapter. Set CONSULTATION_WEBHOOK_URL to forward submissions to a
 * CRM, an inbox automation or a serverless function. Without it the request is
 * accepted and logged only — nothing leaves the server.
 */
async function deliver(values: ConsultationValues): Promise<boolean> {
  const endpoint = process.env.CONSULTATION_WEBHOOK_URL;
  if (!endpoint) {
    console.info("[consultation] received (no delivery backend configured)", {
      company: values.company,
      industry: values.industry,
      size: values.size,
    });
    return false;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.CONSULTATION_WEBHOOK_TOKEN
        ? { Authorization: `Bearer ${process.env.CONSULTATION_WEBHOOK_TOKEN}` }
        : {}),
    },
    body: JSON.stringify({
      source: "website:consultation",
      receivedAt: new Date().toISOString(),
      ...values,
    }),
  });

  if (!response.ok) {
    throw new Error(`Delivery failed with ${response.status}`);
  }

  return true;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const values = normalise(body);
  const invalid = findInvalidFields(values);

  if (invalid.length > 0) {
    return NextResponse.json(
      { ok: false, error: "validation_failed", fields: invalid },
      { status: 422 },
    );
  }

  try {
    const delivered = await deliver(values);
    return NextResponse.json({ ok: true, delivered });
  } catch (error) {
    console.error("[consultation] delivery error", error);
    return NextResponse.json(
      { ok: false, error: "delivery_failed" },
      { status: 502 },
    );
  }
}
