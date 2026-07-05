import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { InteractiveHoverText } from "@/components/interactive-hover-text";

import doctorImg from "@/assets/doctor.jpg";
import { Clock, MapPin, Phone, Mail, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Dr. Hiren Kalathiya — Shreeji Panchakarma Ayurvedic Center" },
      { name: "description", content: "Meet Dr. Hiren Kalathiya, B.A.M.S. M.D. (A.M.), and learn about Shreeji Panchakarma Ayurvedic Center in Amroli, Surat — our story, values, and clinic timings." },
      { property: "og:title", content: "About — Shreeji Panchakarma Ayurvedic Center" },
      { property: "og:description", content: "Our story, mission, and the doctor behind authentic Ayurvedic care in Surat." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-cream">
        <div className="container-page py-16 md:py-20 flex flex-col items-center text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">About the clinic</p>
          <h1 className="mt-3 max-w-3xl text-4xl md:text-5xl">
            <InteractiveHoverText text="A quiet place for deep healing, in the heart of Amroli." />
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Shreeji Panchakarma Ayurvedic Center was founded with a simple belief — that
            authentic Ayurveda, practised patiently and personally, can resolve the
            conditions modern medicine often only manages.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:items-start">
          <div>
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-primary/10 blur-xl" aria-hidden />
              <img
                src={doctorImg}
                alt="Dr. Hiren Kalathiya"
                width={800}
                height={800}
                loading="lazy"
                className="relative aspect-square w-full rounded-3xl object-cover shadow-soft"
              />
            </div>
            <div className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-start gap-3">
                <Award className="mt-0.5 h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-lg">Dr. Hiren Kalathiya</h3>
                  <p className="text-sm text-muted-foreground">B.A.M.S., M.D. (Ayurvedic Medicine)</p>
                  <p className="mt-1 text-xs text-muted-foreground">Reg. No. G.B.I.-16877</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl">Our story</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                What began as a single-doctor practice has grown into a trusted address
                for families across Surat seeking honest, root-cause care. Dr. Kalthiya
                treats each patient personally — listening first, prescribing carefully,
                and following up until real change is felt.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl">Mission & values</h2>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {[
                  ["Patient first", "Time, attention and dignity for every visitor."],
                  ["Authentic Ayurveda", "Classical formulations, no shortcuts."],
                  ["Transparent care", "Clear diagnosis, honest expectations."],
                  ["Long-term wellness", "Treat the root, not just the symptom."],
                ].map(([t, d]) => (
                  <li key={t} className="rounded-xl border border-border bg-card p-4">
                    <p className="font-medium text-foreground">{t}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl">Visit us</h2>
              <div className="mt-3 grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-card sm:grid-cols-2">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <p className="font-medium">Clinic</p>
                    <p className="text-muted-foreground">1, Madhav Complex-B, Opp. 99 Shopping Center, Sayan Road, Amroli, Surat</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <p className="font-medium">Timings</p>
                    <p className="text-muted-foreground">Morning 9:00 – 13:00<br />Evening 17:00 – 21:30<br />Sunday evening closed</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <p className="font-medium">Call</p>
                    <a href="tel:+919033576234" className="text-muted-foreground hover:text-primary">+91 90335 76234</a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <p className="font-medium">Email</p>
                    <a href="mailto:hirenkalathiya98@gmail.com" className="text-muted-foreground hover:text-primary">hirenkalathiya98@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
