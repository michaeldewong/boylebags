"use client";

import { useState, useMemo, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { event } from "@/lib/ga";
import { getLocaleFromPath } from "@/lib/locale";
import { addBusinessDays, toDateInputValue } from "@/lib/businessDays";

const MOQ_MIN = 500;
const MOQ_SOFT_GATE_MESSAGE =
  "For orders under 500 units, please use our Sample Request form.";
const SPECIFIC_REQUIREMENTS_MAX = 500;

const PRODUCT_INTEREST_OPTIONS = [
  "Tote Bags",
  "Drawstring Bags",
  "Zippered Pouches",
  "Other - Specify Below",
] as const;

const APPLICATION_USE_OPTIONS = [
  "Trade Show/Event",
  "Employee Onboarding",
  "Retail Stock",
  "Internal Use",
  "Other - Specify",
] as const;

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "hotmail.com",
  "hotmail.co.uk",
  "outlook.com",
  "live.com",
  "msn.com",
  "aol.com",
  "icloud.com",
  "mail.com",
  "protonmail.com",
  "proton.me",
  "yandex.com",
  "zoho.com",
  "gmx.com",
  "gmx.net",
  "mail.ru",
  "inbox.com",
  "me.com",
  "mac.com",
]);

function getMinDeliveryDate(): string {
  return toDateInputValue(addBusinessDays(new Date(), 15));
}

function isFreeEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? FREE_EMAIL_DOMAINS.has(domain) : false;
}

function usPhoneRegex(): RegExp {
  return /^\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;
}

export function CustomRFQForm() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = getLocaleFromPath(pathname);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const minDeliveryDate = useMemo(() => getMinDeliveryDate(), []);

  // Pre-fill from URL params (from product detail page)
  const urlQuantity = searchParams?.get("quantity");
  const urlProductInterest = searchParams?.get("productInterest");

  const [formData, setFormData] = useState({
    quantity: urlQuantity || "",
    targetDeliveryDate: "",
    productInterest: urlProductInterest || "",
    applicationUse: "",
    companyName: "",
    workEmail: "",
    contactPhone: "",
    specificRequirements: "",
  });

  // Update form if URL params change
  useEffect(() => {
    if (urlQuantity) {
      setFormData((prev) => ({ ...prev, quantity: urlQuantity }));
    }
    if (urlProductInterest) {
      setFormData((prev) => ({ ...prev, productInterest: urlProductInterest }));
    }
  }, [urlQuantity, urlProductInterest]);

  const quantityNum = formData.quantity === "" ? 0 : parseInt(formData.quantity, 10);
  const meetsMOQ = !isNaN(quantityNum) && quantityNum >= MOQ_MIN;

  const deliveryDateValid =
    formData.targetDeliveryDate >= minDeliveryDate;

  const deliveryMinError =
    formData.targetDeliveryDate &&
    !deliveryDateValid
      ? `Our guaranteed lead time requires delivery no sooner than ${minDeliveryDate}.`
      : null;

  const companyValid =
    formData.companyName.trim().length >= 2;
  const emailValid =
    formData.workEmail.length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail) &&
    !isFreeEmail(formData.workEmail);
  const phoneValid =
    !formData.contactPhone.trim() ||
    usPhoneRegex().test(formData.contactPhone.replace(/\s/g, ""));
  const requirementsValid =
    formData.specificRequirements.length <= SPECIFIC_REQUIREMENTS_MAX;

  const canSubmit =
    meetsMOQ &&
    deliveryDateValid &&
    formData.productInterest &&
    formData.applicationUse &&
    companyValid &&
    emailValid &&
    phoneValid &&
    requirementsValid;

  const runValidation = (): boolean => {
    const errs: Record<string, string> = {};
    if (!meetsMOQ && formData.quantity !== "") {
      errs.quantity = MOQ_SOFT_GATE_MESSAGE;
    }
    if (deliveryMinError) errs.targetDeliveryDate = deliveryMinError;
    if (formData.companyName.trim().length > 0 && formData.companyName.trim().length < 2) {
      errs.companyName = "Company name must be at least 2 characters.";
    }
    if (formData.workEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      errs.workEmail = "Please enter a valid email address.";
    }
    if (formData.workEmail && isFreeEmail(formData.workEmail)) {
      errs.workEmail =
        "Please use a work or corporate email address.";
    }
    if (formData.contactPhone.trim() && !usPhoneRegex().test(formData.contactPhone.replace(/\s/g, ""))) {
      errs.contactPhone = "Please enter a valid US phone number.";
    }
    if (formData.specificRequirements.length > SPECIFIC_REQUIREMENTS_MAX) {
      errs.specificRequirements = `Maximum ${SPECIFIC_REQUIREMENTS_MAX} characters.`;
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0 && Boolean(canSubmit);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    if (!canSubmit) {
      if (!meetsMOQ && formData.quantity !== "") {
        setFieldErrors((prev) => ({ ...prev, quantity: MOQ_SOFT_GATE_MESSAGE }));
      }
      if (deliveryMinError) {
        setFieldErrors((prev) => ({
          ...prev,
          targetDeliveryDate: deliveryMinError,
        }));
      }
      setError("Please correct the fields above and ensure quantity is at least 500.");
      return;
    }

    if (!runValidation()) {
      setError("Please correct the errors above.");
      return;
    }

    setSubmitting(true);

    const payload = {
      quantity: formData.quantity,
      targetDeliveryDate: formData.targetDeliveryDate,
      productInterest: formData.productInterest,
      applicationUse: formData.applicationUse,
      companyName: formData.companyName.trim(),
      workEmail: formData.workEmail.trim(),
      contactPhone: formData.contactPhone.trim() || undefined,
      specificRequirements: formData.specificRequirements.trim().slice(0, SPECIFIC_REQUIREMENTS_MAX) || undefined,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "custom",
          payload: {
            ...payload,
            email: payload.workEmail,
            company: payload.companyName,
            phone: payload.contactPhone,
            notes: payload.specificRequirements,
            needByDate: payload.targetDeliveryDate,
            dueDate: payload.targetDeliveryDate,
            bagType: payload.productInterest,
          },
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        event("form_submit", { form_type: "custom", locale });
        if (data.webhookStatus === "ok") event("leadwebhookok", { locale });
        else if (data.webhookStatus === "error") event("leadwebhookerror", { locale });
        setSubmittedEmail(formData.workEmail.trim());
        setSubmitted(true);
        setFormData({
          quantity: "",
          targetDeliveryDate: "",
          productInterest: "",
          applicationUse: "",
          companyName: "",
          workEmail: "",
          contactPhone: "",
          specificRequirements: "",
        });
      } else {
        event("form_error", { form_type: "custom", locale });
        setError(data.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      event("form_error", { form_type: "custom", locale });
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-lg border-2 border-green-600 bg-green-50 p-8 text-center">
          <h3 className="mb-4 text-2xl font-bold text-green-900">
            Request Received.
          </h3>
          <p className="text-green-800">
            Your quote breakdown, including lead time confirmation, will be
            emailed to <strong>{submittedEmail}</strong> within 24 business
            hours. Do not send a duplicate request.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Product Specs */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="mb-6 text-xl font-semibold text-zinc-900">
            Product & volume
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min={MOQ_MIN}
                value={formData.quantity}
                onChange={(e) => {
                  setFormData({ ...formData, quantity: e.target.value });
                  if (fieldErrors.quantity) setFieldErrors((p) => ({ ...p, quantity: "" }));
                }}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                aria-invalid={!!fieldErrors.quantity}
              />
              {fieldErrors.quantity && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {fieldErrors.quantity}
                </p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Product Interest <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.productInterest}
                onChange={(e) =>
                  setFormData({ ...formData, productInterest: e.target.value })
                }
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="">Select…</option>
                {PRODUCT_INTEREST_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
                {/* Show custom product name from URL if not in standard options */}
                {formData.productInterest &&
                  !PRODUCT_INTEREST_OPTIONS.includes(
                    formData.productInterest as typeof PRODUCT_INTEREST_OPTIONS[number]
                  ) && (
                    <option value={formData.productInterest}>
                      {formData.productInterest}
                    </option>
                  )}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Application/Use <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.applicationUse}
                onChange={(e) =>
                  setFormData({ ...formData, applicationUse: e.target.value })
                }
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="">Select…</option>
                {APPLICATION_USE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 2. Timeline / Logistics */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="mb-6 text-xl font-semibold text-zinc-900">
            Timeline
          </h2>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Target Delivery Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              min={minDeliveryDate}
              value={formData.targetDeliveryDate}
              onChange={(e) => {
                setFormData({ ...formData, targetDeliveryDate: e.target.value });
                if (fieldErrors.targetDeliveryDate)
                  setFieldErrors((p) => ({ ...p, targetDeliveryDate: "" }));
              }}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              aria-invalid={!!fieldErrors.targetDeliveryDate}
            />
            {fieldErrors.targetDeliveryDate && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {fieldErrors.targetDeliveryDate}
              </p>
            )}
          </div>
        </div>

        {/* 3. Contact / Identification + Trust Block */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="mb-6 text-xl font-semibold text-zinc-900">
            Contact
          </h2>
          <div className="mb-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                minLength={2}
                value={formData.companyName}
                onChange={(e) => {
                  setFormData({ ...formData, companyName: e.target.value });
                  if (fieldErrors.companyName) setFieldErrors((p) => ({ ...p, companyName: "" }));
                }}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                aria-invalid={!!fieldErrors.companyName}
              />
              {fieldErrors.companyName && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {fieldErrors.companyName}
                </p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Work Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.workEmail}
                onChange={(e) => {
                  setFormData({ ...formData, workEmail: e.target.value });
                  if (fieldErrors.workEmail) setFieldErrors((p) => ({ ...p, workEmail: "" }));
                }}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                aria-invalid={!!fieldErrors.workEmail}
              />
              {fieldErrors.workEmail && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {fieldErrors.workEmail}
                </p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Contact Phone
              </label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => {
                  setFormData({ ...formData, contactPhone: e.target.value });
                  if (fieldErrors.contactPhone) setFieldErrors((p) => ({ ...p, contactPhone: "" }));
                }}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="(555) 555-5555"
                aria-invalid={!!fieldErrors.contactPhone}
              />
              {fieldErrors.contactPhone && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {fieldErrors.contactPhone}
                </p>
              )}
            </div>
          </div>
          <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
            We manage B2B fulfillment for leading US distributors and large-scale
            corporate programs. [Insert Client Logo/Case Study Placeholder Here]
          </div>
        </div>

        {/* 4. Specific Requirements */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="mb-6 text-xl font-semibold text-zinc-900">
            Specific requirements
          </h2>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Specific Requirements
            </label>
            <textarea
              value={formData.specificRequirements}
              onChange={(e) => {
                setFormData({ ...formData, specificRequirements: e.target.value });
                if (fieldErrors.specificRequirements)
                  setFieldErrors((p) => ({ ...p, specificRequirements: "" }));
              }}
              maxLength={SPECIFIC_REQUIREMENTS_MAX}
              rows={4}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="e.g., specific labeling, material compliance"
              aria-invalid={!!fieldErrors.specificRequirements}
            />
            <p className="mt-1 text-xs text-zinc-500">
              {formData.specificRequirements.length} / {SPECIFIC_REQUIREMENTS_MAX} characters
            </p>
            {fieldErrors.specificRequirements && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {fieldErrors.specificRequirements}
              </p>
            )}
          </div>
        </div>

        {error && (
          <div className="rounded-lg border-2 border-red-500 bg-red-50 p-4 text-center">
            <p className="text-sm font-medium text-red-900">{error}</p>
          </div>
        )}

        <div className="space-y-3">
          <button
            type="submit"
            disabled={submitting || !canSubmit}
            className="w-full rounded-md bg-black px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Qualified Quote Request"}
          </button>
        </div>
      </form>
    </div>
  );
}
