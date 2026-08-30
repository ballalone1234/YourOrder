"use client";

import { ChevronDown, Check } from "lucide-react";
import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/content";
import {
  emptyConsultation,
  submitConsultation,
  validateConsultation,
  type ConsultationErrors,
  type ConsultationField,
  type ConsultationValues,
} from "@/lib/consultation";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

type ConsultationFormProps = {
  dict: Dictionary;
};

const FIELD_ORDER: ConsultationField[] = [
  "company",
  "name",
  "phone",
  "lineId",
  "email",
  "industry",
  "size",
  "process",
  "tools",
  "consent",
];

const inputClass =
  "w-full rounded-none border-b border-line bg-transparent py-3 text-[1rem] text-ink " +
  "transition-colors duration-200 placeholder:text-muted/70 focus:border-ink";

export function ConsultationForm({ dict }: ConsultationFormProps) {
  const baseId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ConsultationValues>(emptyConsultation);
  const [errors, setErrors] = useState<ConsultationErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [validated, setValidated] = useState(false);

  const fieldId = (field: ConsultationField) => `${baseId}-${field}`;
  const errorId = (field: ConsultationField) => `${baseId}-${field}-error`;

  const update = (field: ConsultationField, value: string | boolean) => {
    const next = { ...values, [field]: value } as ConsultationValues;
    setValues(next);

    if (validated) {
      setErrors(
        validateConsultation(next, dict.validation, dict.form.sizeOptions),
      );
    }
  };

  const handleChange =
    (field: ConsultationField) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const target = event.target;
      update(
        field,
        target instanceof HTMLInputElement && target.type === "checkbox"
          ? target.checked
          : target.value,
      );
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidated(true);

    const nextErrors = validateConsultation(
      values,
      dict.validation,
      dict.form.sizeOptions,
    );
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setStatus("idle");
      formRef.current
        ?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(firstInvalid))}`)
        ?.focus();
      return;
    }

    setStatus("submitting");
    try {
      await submitConsultation(values);
      setStatus("success");
      setValues(emptyConsultation);
      setValidated(false);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex h-full flex-col justify-center border border-line bg-surface p-8 md:p-12"
      >
        <span
          aria-hidden="true"
          className="flex size-10 items-center justify-center border border-accent text-accent"
        >
          <Check className="size-5" strokeWidth={1.5} />
        </span>
        <h3 className="mt-8 text-h3 font-medium text-ink">
          {dict.form.success.title}
        </h3>
        <p className="mt-4 max-w-[46ch] text-body text-muted">
          {dict.form.success.description}
        </p>
        <div className="mt-9">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setStatus("idle")}
          >
            {dict.form.success.reset}
          </Button>
        </div>
      </div>
    );
  }

  const errorList = FIELD_ORDER.filter((field) => errors[field]);

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="border border-line bg-surface p-6 md:p-10"
    >
      {validated && errorList.length > 0 ? (
        <div
          role="alert"
          className="mb-9 border-l-2 border-danger bg-paper px-5 py-4"
        >
          <p className="text-[0.9375rem] font-medium text-ink">
            {dict.form.errorSummaryTitle}
          </p>
          <ul className="mt-2 space-y-1">
            {errorList.map((field) => (
              <li key={field} className="text-[0.875rem] text-muted">
                {errors[field]}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-x-8 gap-y-7 md:grid-cols-2">
        <Field
          id={fieldId("company")}
          label={dict.form.fields.company.label}
          error={errors.company}
          errorId={errorId("company")}
        >
          <input
            id={fieldId("company")}
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={handleChange("company")}
            placeholder={dict.form.fields.company.placeholder}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? errorId("company") : undefined}
            className={cn(inputClass, errors.company && "border-danger")}
          />
        </Field>

        <Field
          id={fieldId("name")}
          label={dict.form.fields.name.label}
          error={errors.name}
          errorId={errorId("name")}
        >
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange("name")}
            placeholder={dict.form.fields.name.placeholder}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? errorId("name") : undefined}
            className={cn(inputClass, errors.name && "border-danger")}
          />
        </Field>

        <Field
          id={fieldId("phone")}
          label={dict.form.fields.phone.label}
          error={errors.phone}
          errorId={errorId("phone")}
        >
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={handleChange("phone")}
            placeholder={dict.form.fields.phone.placeholder}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? errorId("phone") : undefined}
            className={cn(inputClass, errors.phone && "border-danger")}
          />
        </Field>

        <Field
          id={fieldId("lineId")}
          label={dict.form.fields.lineId.label}
          optional={dict.form.optional}
        >
          <input
            id={fieldId("lineId")}
            name="lineId"
            type="text"
            value={values.lineId}
            onChange={handleChange("lineId")}
            placeholder={dict.form.fields.lineId.placeholder}
            className={inputClass}
          />
        </Field>

        <Field
          id={fieldId("email")}
          label={dict.form.fields.email.label}
          error={errors.email}
          errorId={errorId("email")}
        >
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange("email")}
            placeholder={dict.form.fields.email.placeholder}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? errorId("email") : undefined}
            className={cn(inputClass, errors.email && "border-danger")}
          />
        </Field>

        <Field
          id={fieldId("industry")}
          label={dict.form.fields.industry.label}
          error={errors.industry}
          errorId={errorId("industry")}
        >
          <input
            id={fieldId("industry")}
            name="industry"
            type="text"
            value={values.industry}
            onChange={handleChange("industry")}
            placeholder={dict.form.fields.industry.placeholder}
            aria-invalid={errors.industry ? true : undefined}
            aria-describedby={errors.industry ? errorId("industry") : undefined}
            className={cn(inputClass, errors.industry && "border-danger")}
          />
        </Field>

        <Field
          id={fieldId("size")}
          label={dict.form.fields.size.label}
          error={errors.size}
          errorId={errorId("size")}
        >
          <div className="relative">
            <select
              id={fieldId("size")}
              name="size"
              value={values.size}
              onChange={handleChange("size")}
              aria-invalid={errors.size ? true : undefined}
              aria-describedby={errors.size ? errorId("size") : undefined}
              className={cn(
                inputClass,
                "appearance-none pr-8",
                !values.size && "text-muted",
                errors.size && "border-danger",
              )}
            >
              <option value="">{dict.form.fields.size.placeholder}</option>
              {dict.form.sizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-1 top-1/2 size-4 -translate-y-1/2 text-muted"
              strokeWidth={1.5}
            />
          </div>
        </Field>

        <div className="md:col-span-2">
          <Field
            id={fieldId("process")}
            label={dict.form.fields.process.label}
            error={errors.process}
            errorId={errorId("process")}
          >
            <textarea
              id={fieldId("process")}
              name="process"
              rows={5}
              value={values.process}
              onChange={handleChange("process")}
              placeholder={dict.form.fields.process.placeholder}
              aria-invalid={errors.process ? true : undefined}
              aria-describedby={errors.process ? errorId("process") : undefined}
              className={cn(
                inputClass,
                "resize-y leading-relaxed",
                errors.process && "border-danger",
              )}
            />
          </Field>
        </div>

        <div className="md:col-span-2">
          <Field
            id={fieldId("tools")}
            label={dict.form.fields.tools.label}
            optional={dict.form.optional}
          >
            <input
              id={fieldId("tools")}
              name="tools"
              type="text"
              value={values.tools}
              onChange={handleChange("tools")}
              placeholder={dict.form.fields.tools.placeholder}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div className="mt-10 border-t border-line-soft pt-8">
        <div className="flex items-start gap-3">
          <input
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={handleChange("consent")}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? errorId("consent") : undefined}
            className="mt-1 size-4 shrink-0 accent-accent"
          />
          <div>
            <label
              htmlFor={fieldId("consent")}
              className="text-[0.9375rem] leading-relaxed text-ink"
            >
              {dict.form.fields.consent.label}
            </label>
            <p className="mt-1 text-[0.8125rem] text-muted">
              {dict.form.fields.consent.note}
            </p>
            {errors.consent ? (
              <p id={errorId("consent")} className="mt-2 text-[0.8125rem] text-danger">
                {errors.consent}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button type="submit" arrow disabled={status === "submitting"}>
            {status === "submitting" ? dict.form.submitting : dict.form.submit}
          </Button>
          {status === "error" ? (
            <p role="alert" className="text-[0.875rem] text-danger">
              {dict.form.submitError}
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  optional?: string;
  error?: string;
  errorId?: string;
  children: React.ReactNode;
};

function Field({ id, label, optional, error, errorId, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-baseline gap-2 text-[0.8125rem] text-muted"
      >
        <span>{label}</span>
        {optional ? (
          <span className="text-[0.75rem] text-muted">
            {optional}
          </span>
        ) : null}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && errorId ? (
        <p id={errorId} className="mt-2 text-[0.8125rem] text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
