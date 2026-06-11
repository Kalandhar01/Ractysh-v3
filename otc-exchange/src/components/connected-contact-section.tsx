"use client";

import { type FormEvent, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import DeferredDither from "@/components/deferred-dither";

const contactFields = [
  {
    label: "Name",
    name: "name",
    type: "text",
    autoComplete: "name",
    placeholder: "Decision maker name",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    autoComplete: "email",
    placeholder: "desk@email.com",
  },
  {
    label: "Company",
    name: "company",
    type: "text",
    autoComplete: "organization",
    placeholder: "Verified entity",
  },
  {
    label: "Mandate size",
    name: "mandate",
    type: "text",
    autoComplete: "off",
    placeholder: "$5M+ block",
  },
];

export default function ConnectedContactSection() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [formMessage, setFormMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setFormStatus("submitting");
    setFormMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") || ""),
          email: String(formData.get("email") || ""),
          company: String(formData.get("company") || ""),
          mandate: String(formData.get("mandate") || ""),
          message: String(formData.get("message") || ""),
          sourcePage:
            typeof window === "undefined" ? "/" : window.location.pathname,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to submit right now.");
      }

      form.reset();
      setFormStatus("success");
      setFormMessage(
        payload.message ||
          "Mandate note received. The OTC team will review it shortly.",
      );
    } catch (error) {
      setFormStatus("error");
      setFormMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit right now. Please try again.",
      );
    }
  }

  return (
    <section
      id="contact"
      className="relative z-20 scroll-mt-28 overflow-hidden bg-transparent px-5 py-20 text-white sm:scroll-mt-32 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(22,184,147,0.025),rgba(4,7,6,0)_42%,rgba(189,121,29,0.03))]" />

      <div className="relative mx-auto grid max-w-7xl overflow-hidden border border-white/10 bg-black/24 shadow-[0_34px_120px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl lg:min-h-[720px] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[420px] overflow-hidden border-b border-white/10 bg-[#050806] lg:min-h-0 lg:border-b-0 lg:border-r">
          <div className="absolute inset-0">
            <DeferredDither
              waveColor={[0.24, 0.92, 0.76]}
              disableAnimation={false}
              enableMouseInteraction
              mouseRadius={0.88}
              colorNum={6}
              pixelSize={1.5}
              waveAmplitude={0.58}
              waveFrequency={2.65}
              waveSpeed={0.1}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.18),transparent_23%),radial-gradient(circle_at_74%_30%,rgba(22,184,147,0.22),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.48))]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:28px_28px] opacity-30" />

          <div className="relative flex h-full min-h-[420px] flex-col justify-between p-6 sm:p-8 lg:min-h-[720px] lg:p-10">
            <div className="inline-flex w-fit items-center gap-3 border border-white/12 bg-black/28 px-4 py-3 text-sm font-semibold text-white/76 backdrop-blur-md">
              <span className="grid size-8 place-items-center rounded-full bg-emerald-300/14 text-emerald-100">
                R
              </span>
              Ractysh OTC Exchange
            </div>

            <div>
              <p className="max-w-xl text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
                “Private mandates need quiet routing, clean authority, and a
                settlement record operators can trust.”
              </p>
              <div className="mt-7 flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full border border-emerald-200/25 bg-emerald-300/14 text-sm font-bold text-emerald-100">
                  OTC
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">
                    Mandate Desk
                  </span>
                  <span className="mt-1 block text-sm text-white/52">
                    Private exchange coordination
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f3f1ea] px-5 py-10 text-[#151512] sm:px-8 lg:px-12 lg:py-14">
          <div className="mx-auto max-w-xl">
            <div className="grid size-14 place-items-center rounded-md bg-white shadow-[0_18px_48px_rgba(0,0,0,0.12)]">
              <div className="grid size-10 place-items-center rounded-sm bg-[#07100d] text-emerald-200">
                <Mail className="size-5" aria-hidden="true" />
              </div>
            </div>

            <h2 className="mt-9 text-4xl font-semibold tracking-tight text-[#11140f] sm:text-5xl">
              Route your OTC mandate
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#58564f]">
              Share the asset, size, route expectation, settlement preference,
              and authority context. Ractysh OTC reviews fit before any quote,
              counterparty, or settlement route is opened. Email us at{" "}
              <a
                href="mailto:desk@ractysh.com"
                className="font-medium text-[#11140f] underline decoration-[#16b893]/40 underline-offset-4 transition hover:decoration-[#16b893]"
              >
                desk@ractysh.com
              </a>
              .
            </p>

            <form className="mt-9 space-y-6" onSubmit={handleSubmit}>
              {contactFields.map((field) => (
                <label key={field.name} className="block">
                  <span className="mb-2 block text-sm font-medium text-[#3d3b35]">
                    {field.label}
                  </span>
                  <input
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                    required={field.name !== "company"}
                    className="h-12 w-full rounded-md border border-[#d7d2c5] bg-white px-4 text-base text-[#11140f] shadow-sm outline-none transition placeholder:text-[#8f8a7d] focus:border-[#16b893] focus:ring-2 focus:ring-[#16b893]/20"
                  />
                </label>
              ))}

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#3d3b35]">
                  Mandate context
                </span>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Asset, size, source, target currency, settlement route, timeline, and who can approve."
                  className="min-h-[132px] w-full resize-none rounded-md border border-[#d7d2c5] bg-white px-4 py-4 text-base leading-7 text-[#11140f] shadow-sm outline-none transition placeholder:text-[#8f8a7d] focus:border-[#16b893] focus:ring-2 focus:ring-[#16b893]/20"
                />
              </label>

              {formMessage ? (
                <p
                  className={`rounded-md border px-4 py-3 text-sm leading-6 ${
                    formStatus === "success"
                      ? "border-[#16b893]/35 bg-[#16b893]/10 text-[#0c4a3e]"
                      : "border-red-300 bg-red-50 text-red-700"
                  }`}
                >
                  {formMessage}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#11140f] px-5 text-sm font-semibold text-white transition hover:bg-[#25322c] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {formStatus === "submitting" ? "Sending..." : "Send OTC mandate"}
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
