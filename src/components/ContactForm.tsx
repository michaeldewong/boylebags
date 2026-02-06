"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { event } from "@/lib/ga";
import { getLocaleFromPath } from "@/lib/locale";

export function ContactForm() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Basic validation
    const requiredFields = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    const missingField = Object.entries(requiredFields).find(
      ([_, value]) => !value || (typeof value === "string" && value.trim() === "")
    );

    if (missingField) {
      event("form_error", {
        form_type: "contact",
        error_field: missingField[0],
        locale,
      });
      setError("Please fill in all required fields.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          payload: formData,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        event("form_submit", {
          form_type: "contact",
          locale,
        });
        
        // Fire webhook status event if available
        if (data.webhookStatus === "ok") {
          event("leadwebhookok", { locale });
        } else if (data.webhookStatus === "error") {
          event("leadwebhookerror", { locale });
        }
        
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
      } else {
        event("form_error", {
          form_type: "contact",
          locale,
        });
        setError(data.error || "Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      event("form_error", {
        form_type: "contact",
        locale,
      });
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-lg border-2 border-green-500 bg-green-50 p-8 text-center">
          <h3 className="mb-2 text-2xl font-bold text-green-900">
            Message Sent
          </h3>
          <p className="text-green-700">
            Received. We&apos;ll respond within 4 business hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={6}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Tell us how we can help..."
              />
            </div>
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
            disabled={submitting}
            className="w-full rounded-md bg-black px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
          >
            {submitting ? "Sending..." : "Contact Sales"}
          </button>
          <p className="text-center text-sm text-zinc-600">
            We usually reply within 1 business day.
          </p>
        </div>
      </form>
    </div>
  );
}
