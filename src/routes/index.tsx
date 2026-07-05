import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import heroImg from "@/assets/hero.jpg";
import { ArrowRight, Leaf, ShieldCheck, Sparkles, HeartPulse, Sprout, Flame, BadgeCheck, Phone } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shreeji Panchakarma Ayurvedic Center — Dr. Hiren Kalathiya, Surat" },
      { name: "description", content: "Authentic Ayurvedic treatment in Amroli, Surat. Specialist in skin, joint, hair, infertility and stubborn chronic diseases. Book your appointment online." },
      { property: "og:title", content: "Shreeji Panchakarma Ayurvedic Center — Surat" },
      { property: "og:description", content: "Authentic Ayurvedic care led by Dr. Hiren Kalathiya. Panchakarma, skin, joints, hair, infertility, and chronic care." },
    ],
  }),
  component: HomePage,
});

const highlights = [
  { icon: Sparkles, title: "Skin & Hair", text: "Eczema, psoriasis, pimples, hair fall, alopecia and more." },
  { icon: HeartPulse, title: "Joints & Nerves", text: "Arthritis, sciatica, slipped disc, paralysis." },
  { icon: Sprout, title: "Digestive Care", text: "Gas, acidity, IBS, piles, fissure, constipation." },
  { icon: Flame, title: "Panchakarma", text: "Authentic Keralan-method therapies & detox." },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream">
        <div className="container-page grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-3 py-1 text-xs font-medium text-primary">
              <Leaf className="h-3.5 w-3.5" /> Traditional Ayurveda · Since years of practice
            </span>
            <h1 className="mt-5 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              Healing rooted in <span className="text-primary">ancient wisdom</span>, delivered with modern care.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Welcome to Shreeji Panchakarma Ayurvedic Center in Amroli, Surat. Under the
              guidance of Dr. Hiren Kalathiya (B.A.M.S., M.D.), we specialise in stubborn
              conditions where ordinary medicines fall short.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/appointment"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
              >
                Book Appointment <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+919033576234"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Phone className="h-4 w-4" /> +91 90335 76234
              </a>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6 text-sm">
              <div><dt className="text-muted-foreground">Specialist in</dt><dd className="mt-1 font-medium">Panchakarma</dd></div>
              <div><dt className="text-muted-foreground">Reg. No.</dt><dd className="mt-1 font-medium">G.B.I.-16877</dd></div>
              <div><dt className="text-muted-foreground">Location</dt><dd className="mt-1 font-medium">Amroli, Surat</dd></div>
            </dl>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" aria-hidden />
            <img
              src={heroImg}
              alt="Ayurvedic herbs, brass mortar and copper bowl on linen"
              width={1600}
              height={1024}
              className="relative aspect-[4/3] w-full rounded-[1.5rem] object-cover shadow-soft"
            />
            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl bg-background/95 p-4 shadow-card backdrop-blur sm:left-auto sm:right-5 sm:w-72">
              <BadgeCheck className="h-9 w-9 shrink-0 text-primary" />
              <div className="text-sm">
                <p className="font-medium">Trusted, authentic care</p>
                <p className="text-muted-foreground">Pure Ayurvedic methods, personally guided.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro / mission strip */}
      <section className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our promise</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Where ancient remedies meet today's lifestyle.</h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            We combine classical Ayurvedic diagnosis, customised herbal formulations and
            authentic Panchakarma therapies to address the root cause — not just the
            symptoms. Whether it's a long-standing skin condition, a stubborn joint
            problem, or a search for natural fertility support, you are in caring hands.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="container-page pb-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div key={title} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            See all treatments <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Trust band */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-page grid gap-8 py-14 md:grid-cols-3">
          <div className="flex gap-3">
            <ShieldCheck className="h-8 w-8 shrink-0" />
            <div>
              <h3 className="text-lg text-primary-foreground">Qualified Ayurveda physician</h3>
              <p className="mt-1 text-sm opacity-90">B.A.M.S., M.D. (A.M.). Years of clinical practice and patient trust.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Leaf className="h-8 w-8 shrink-0" />
            <div>
              <h3 className="text-lg text-primary-foreground">Authentic Panchakarma</h3>
              <p className="mt-1 text-sm opacity-90">Abhyanga, Virechana, Basti, Shirodhara and more — by the Keraliyan method.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <HeartPulse className="h-8 w-8 shrink-0" />
            <div>
              <h3 className="text-lg text-primary-foreground">Care for stubborn cases</h3>
              <p className="mt-1 text-sm opacity-90">Specialist in chronic conditions that have not responded to other treatments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20 text-center">
        <h2 className="text-3xl md:text-4xl">Begin your healing journey today.</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Share a few details and we'll confirm a convenient time for your consultation.
        </p>
        <Link
          to="/appointment"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
        >
          Book Appointment <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </SiteLayout>
  );
}
