import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { InteractiveHoverText } from "@/components/interactive-hover-text";
import { appointmentSchema, SERVICES, type AppointmentInput } from "@/lib/appointments";
import { CheckCircle2, Loader2, Phone, Clock, MapPin } from "lucide-react";

export const Route = createFileRoute("/appointment")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — Shreeji Panchakarma Ayurvedic Center" },
      { name: "description", content: "Request an appointment with Dr. Hiren Kalathiya at Shreeji Panchakarma Ayurvedic Center, Amroli, Surat. Share your details and preferred time." },
      { property: "og:title", content: "Book Appointment — Shreeji Ayurvedic Center" },
      { property: "og:description", content: "Online appointment booking for Ayurvedic consultation in Surat." },
    ],
  }),
  component: AppointmentPage,
});

type Errors = Partial<Record<keyof AppointmentInput, string>>;

const today = new Date().toISOString().slice(0, 10);

function AppointmentPage() {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const parsed = appointmentSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof AppointmentInput;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setServerError(json.error || "Could not submit appointment. Please try again.");
      } else {
        setSuccess(parsed.data.full_name);
        (e.target as HTMLFormElement).reset();
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <SiteLayout>
        <section className="container-page py-20">
          <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
            <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
            <h1 className="mt-5 text-3xl">Thank you, {success}!</h1>
            <p className="mt-3 text-muted-foreground">
              Your appointment request has been received. Our team will reach out shortly
              to confirm your time slot. For urgent matters please call{" "}
              <a href="tel:+919033576234" className="font-medium text-primary">+91 90335 76234</a>.
            </p>
            <button
              onClick={() => setSuccess(null)}
              className="mt-6 inline-flex rounded-full border border-border bg-background px-5 py-2 text-sm font-medium hover:border-primary hover:text-primary"
            >
              Book another appointment
            </button>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="bg-cream">
        <div className="container-page py-14 md:py-16 flex flex-col items-center text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Book a visit</p>
          <h1 className="mt-3 max-w-2xl text-4xl md:text-5xl">
            <InteractiveHoverText text="Reserve your consultation." />
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Share a few details and your preferred time. We'll confirm shortly. All fields
            marked <span className="text-primary">*</span> are required.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-card md:p-8"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="full_name" required error={errors.full_name} placeholder="Your name" />
              <Field label="Phone number" name="phone" required error={errors.phone} placeholder="+91 90000 00000" type="tel" />
              <Field label="Email" name="email" error={errors.email} placeholder="you@example.com" type="email" />
              <Field label="Age" name="age" error={errors.age as string} placeholder="35" type="number" min={0} max={120} />
              <SelectField label="Gender" name="gender" error={errors.gender as string} options={[["", "Prefer not to say"], ["male", "Male"], ["female", "Female"], ["other", "Other"]]} />
              <SelectField
                label="Service"
                name="service"
                required
                error={errors.service}
                options={[["", "Select a service"], ...SERVICES.map((s) => [s, s] as [string, string])]}
              />
              <Field label="Preferred date" name="preferred_date" required error={errors.preferred_date} type="date" min={today} />
              <SelectField
                label="Preferred time"
                name="preferred_time"
                required
                error={errors.preferred_time}
                options={[
                  ["", "Choose a slot"],
                  ["Morning 9:00 – 10:30", "Morning 9:00 – 10:30"],
                  ["Morning 10:30 – 12:00", "Morning 10:30 – 12:00"],
                  ["Afternoon 12:00 – 13:00", "Afternoon 12:00 – 13:00"],
                  ["Evening 17:00 – 18:30", "Evening 17:00 – 18:30"],
                  ["Evening 18:30 – 20:00", "Evening 18:30 – 20:00"],
                  ["Night 20:00 – 21:30", "Night 20:00 – 21:30"],
                ]}
              />
              <RadioField
                label="Patient type"
                name="patient_type"
                required
                defaultValue="new"
                options={[["new", "New patient"], ["existing", "Existing patient"]]}
              />
            </div>

            <TextareaField label="Reason for visit / symptoms" name="reason" required error={errors.reason} rows={4} placeholder="Briefly describe your concern" />
            <TextareaField label="Additional notes (optional)" name="notes" error={errors.notes as string} rows={3} placeholder="Anything else we should know?" />

            {serverError && (
              <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.01] disabled:opacity-70 sm:w-auto"
            >
              {submitting ? (<><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>) : "Request Appointment"}
            </button>
          </form>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="text-lg">Need to talk to us first?</h3>
              <p className="mt-2 text-sm text-muted-foreground">Call the clinic and we'll help you choose a suitable time and treatment path.</p>
              <a href="tel:+919033576234" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                <Phone className="h-4 w-4" /> +91 90335 76234
              </a>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="text-lg flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> Clinic hours</h3>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>Morning 9:00 – 13:00</li>
                <li>Evening 17:00 – 21:30</li>
                <li>Sunday evening closed</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="text-lg flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Location</h3>
              <p className="mt-2 text-sm text-muted-foreground">1, Madhav Complex-B, Opp. 99 Shopping Center, Sayan Road, Amroli, Surat.</p>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-foreground">
      {children}
      {required && <span className="ml-0.5 text-primary">*</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

function Field({
  label, name, error, required, ...rest
}: { label: string; name: string; error?: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <input name={name} className={inputClass} aria-invalid={!!error} {...rest} />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function SelectField({
  label, name, error, required, options,
}: { label: string; name: string; error?: string; required?: boolean; options: [string, string][] }) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <select name={name} className={inputClass} aria-invalid={!!error} defaultValue="">
        {options.map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function TextareaField({
  label, name, error, required, ...rest
}: { label: string; name: string; error?: string; required?: boolean } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <textarea name={name} className={inputClass + " min-h-[96px]"} aria-invalid={!!error} {...rest} />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function RadioField({
  label, name, required, options, defaultValue,
}: { label: string; name: string; required?: boolean; options: [string, string][]; defaultValue?: string }) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="flex flex-wrap gap-2">
        {options.map(([v, l]) => (
          <label key={v} className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-input bg-background px-4 py-2 text-sm has-checked:border-primary has-checked:bg-primary/10 has-checked:text-primary">
            <input
              type="radio"
              name={name}
              value={v}
              defaultChecked={v === defaultValue}
              className="h-3.5 w-3.5 accent-current"
            />
            {l}
          </label>
        ))}
      </div>
    </div>
  );
}
