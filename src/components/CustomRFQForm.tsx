"use client";
import { useState } from "react";

export function CustomRFQForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    needByDate: "",
    quantity: "",
    bagType: "",
    decorationType: "",
    rush: false,
    retailReady: false,
    splitShipment: false,
    shipToZip: "",
    notes: "",
    contactName: "",
    email: "",
    company: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      ...formData,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "custom",
          payload: {
            ...payload,
            name: payload.contactName,
            dueDate: payload.needByDate,
          },
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setSubmitted(true);
        setFormData({
          needByDate: "",
          quantity: "",
          bagType: "",
          decorationType: "",
          rush: false,
          retailReady: false,
          splitShipment: false,
          shipToZip: "",
          notes: "",
          contactName: "",
          email: "",
          company: "",
          phone: "",
        });
      } else {
        setError(data.error || "Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
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
            Request Submitted
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
          <h2 className="mb-6 text-2xl font-semibold text-zinc-900">
            Project Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Need By Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.needByDate}
                onChange={(e) =>
                  setFormData({ ...formData, needByDate: e.target.value })
                }
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Bag Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.bagType}
                onChange={(e) =>
                  setFormData({ ...formData, bagType: e.target.value })
                }
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="e.g., Tote bag, drawstring bag, etc."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Decoration Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.decorationType}
                onChange={(e) =>
                  setFormData({ ...formData, decorationType: e.target.value })
                }
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="e.g., Screen print, DTF, embroidery, etc."
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="mb-6 text-2xl font-semibold text-zinc-900">Options</h2>

          <div className="space-y-4">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData.rush}
                onChange={(e) =>
                  setFormData({ ...formData, rush: e.target.checked })
                }
                className="mt-1 h-4 w-4 rounded border-zinc-300 text-black focus:ring-2 focus:ring-black"
              />
              <div>
                <div className="font-medium text-zinc-900">Rush Processing</div>
                <div className="text-sm text-zinc-600">
                  +$150 flat fee, reduces lead time by 2-3 days
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData.retailReady}
                onChange={(e) =>
                  setFormData({ ...formData, retailReady: e.target.checked })
                }
                className="mt-1 h-4 w-4 rounded border-zinc-300 text-black focus:ring-2 focus:ring-black"
              />
              <div>
                <div className="font-medium text-zinc-900">Retail Ready Finish</div>
                <div className="text-sm text-zinc-600">
                  +$1.20 per bag for premium finish
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData.splitShipment}
                onChange={(e) =>
                  setFormData({ ...formData, splitShipment: e.target.checked })
                }
                className="mt-1 h-4 w-4 rounded border-zinc-300 text-black focus:ring-2 focus:ring-black"
              />
              <div>
                <div className="font-medium text-zinc-900">Split Shipment</div>
                <div className="text-sm text-zinc-600">
                  +$25 per additional location
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="mb-6 text-2xl font-semibold text-zinc-900">
            Shipping & Contact
          </h2>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Ship To ZIP Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                pattern="[0-9]{5}"
                value={formData.shipToZip}
                onChange={(e) =>
                  setFormData({ ...formData, shipToZip: e.target.value })
                }
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="12345"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Contact Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.contactName}
                onChange={(e) =>
                  setFormData({ ...formData, contactName: e.target.value })
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
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={4}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border-2 border-red-500 bg-red-50 p-4 text-center">
            <p className="text-sm font-medium text-red-900">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-black px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit RFQ Request"}
        </button>
      </form>
    </div>
  );
}
