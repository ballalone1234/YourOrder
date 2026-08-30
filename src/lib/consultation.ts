/**
 * Consultation request — shared contract between the form, the API route and
 * whatever delivery mechanism is configured later (CRM, email, webhook).
 */
export type ConsultationValues = {
  company: string;
  name: string;
  phone: string;
  lineId: string;
  email: string;
  industry: string;
  size: string;
  process: string;
  tools: string;
  consent: boolean;
};

export type ConsultationField = keyof ConsultationValues;

export type ConsultationErrors = Partial<Record<ConsultationField, string>>;

/** Messages are passed in so validation stays locale-agnostic. */
export type ValidationMessages = {
  readonly company: string;
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly industry: string;
  readonly size: string;
  readonly process: string;
  readonly consent: string;
};

export const emptyConsultation: ConsultationValues = {
  company: "",
  name: "",
  phone: "",
  lineId: "",
  email: "",
  industry: "",
  size: "",
  process: "",
  tools: "",
  consent: false,
};

export const MIN_PROCESS_LENGTH = 20;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function validateConsultation(
  values: ConsultationValues,
  messages: ValidationMessages,
  sizeOptions: readonly string[],
): ConsultationErrors {
  const errors: ConsultationErrors = {};

  if (values.company.trim().length < 2) errors.company = messages.company;
  if (values.name.trim().length < 2) errors.name = messages.name;

  const phoneDigits = digitsOnly(values.phone);
  if (phoneDigits.length < 9 || phoneDigits.length > 15) {
    errors.phone = messages.phone;
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = messages.email;
  if (values.industry.trim().length < 2) errors.industry = messages.industry;
  if (!sizeOptions.includes(values.size)) errors.size = messages.size;
  if (values.process.trim().length < MIN_PROCESS_LENGTH) {
    errors.process = messages.process;
  }
  if (!values.consent) errors.consent = messages.consent;

  return errors;
}

export type ConsultationResult = {
  ok: boolean;
  /** false when no delivery backend is configured on the server. */
  delivered: boolean;
};

/**
 * Single call site for submitting the form. Swap the endpoint or add headers
 * here when a CRM or marketing backend is connected.
 */
export async function submitConsultation(
  values: ConsultationValues,
  signal?: AbortSignal,
): Promise<ConsultationResult> {
  const response = await fetch("/api/consultation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Consultation request failed with ${response.status}`);
  }

  return (await response.json()) as ConsultationResult;
}
