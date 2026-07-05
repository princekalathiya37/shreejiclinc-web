import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { InteractiveHoverText } from "@/components/interactive-hover-text";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowRight, Sparkles, Droplets, Brain, Wind, HeartPulse, Sprout, Baby, Flame, Activity } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "What We Offer — Ayurvedic Treatments & Panchakarma" },
      { name: "description", content: "Consultations, follow-up care, and specialist Ayurvedic treatment for skin, joints, hair, digestion, infertility, and Panchakarma therapies at Shreeji Ayurvedic Center, Surat." },
      { property: "og:title", content: "Treatments & Panchakarma — Shreeji Ayurvedic Center" },
      { property: "og:description", content: "Explore all Ayurvedic treatments and Panchakarma therapies offered at our clinic in Amroli, Surat." },
    ],
  }),
  component: ServicesPage,
});

const categories = [
  { icon: Sparkles, title: "Skin", conditions: ["Eczema", "Psoriasis", "Pimples", "Black & white spots", "Urticaria (Hives)", "Cracked hands and feet"] },
  { icon: Droplets, title: "Hair & Head", conditions: ["Migraine", "Hair fall & breakage", "Premature greying", "Alopecia", "Dandruff"] },
  { icon: Brain, title: "Mental Wellness", conditions: ["Insomnia", "Restlessness", "Depression", "Seizures & convulsions", "Dizziness", "Anxiety"] },
  { icon: Sprout, title: "Stomach & Digestion", conditions: ["Gas & acidity", "I.B.S.", "Chronic dysentery", "Piles & fissure", "Constipation"] },
  { icon: HeartPulse, title: "Vata — Joints & Nerves", conditions: ["Joint pain", "Rheumatoid arthritis", "Sciatica", "Paralysis", "Slipped disc", "Nerve compression"] },
  { icon: Wind, title: "Kapha — Respiratory", conditions: ["Chronic cold & cough", "Sinusitis", "Breathlessness", "Asthma"] },
  { icon: Baby, title: "Infertility & Pumsavana", conditions: ["Pumsavana Sanskar", "Childlessness support", "Gynecology", "Pediatrics"] },
  { icon: Activity, title: "Other", conditions: ["Weight gain / loss", "Kidney stones (non-surgical)", "Addiction de-addiction"] },
];

const panchakarmaGallery = [
  {
    name: "Abhyanga",
    desc: "Full-body synchronised herbal oil massage that loosens toxins, nourishes tissues, and relieves fatigue.",
    img: new URL("../assets/panchakarma/Abhyanga.jpg", import.meta.url).href,
  },
  {
    name: "Agni Karma",
    desc: "Thermal microcautery treatment providing swift and effective relief from severe joint and muscular pain.",
    img: new URL("../assets/panchakarma/Agni Karmana.jpg", import.meta.url).href,
  },
  {
    name: "Akshi Tarpana",
    desc: "A rejuvenating eye treatment using medicated ghee to relieve eye strain, dry eyes, and improve vision.",
    img: new URL("../assets/panchakarma/Akshi Tarpana.jpg", import.meta.url).href,
  },
  {
    name: "Greeva Basti",
    desc: "Warm medicated oil retained in a dough well over the neck region — effective for cervical spondylosis and neck pain.",
    img: new URL("../assets/panchakarma/GREEVA-BASTI.jpg", import.meta.url).href,
  },
  {
    name: "Janu Basti",
    desc: "Retaining warm medicated oil over the knee joints to relieve osteoarthritis, stiffness, and knee pain.",
    img: new URL("../assets/panchakarma/Janu basti.jpeg", import.meta.url).href,
  },
  {
    name: "Karna Purana",
    desc: "Instillation of warm medicated oil into the ears to treat earaches, tinnitus, and balance disorders.",
    img: new URL("../assets/panchakarma/Karna Purana.jpg", import.meta.url).href,
  },
  {
    name: "Nasya",
    desc: "Medicated oil or herbal preparations administered through the nostrils to cleanse the head region.",
    img: new URL("../assets/panchakarma/Nasya.png", import.meta.url).href,
  },
  {
    name: "Rakta Mokshana",
    desc: "Therapeutic bloodletting to eliminate blood-borne toxins, highly effective for chronic skin diseases.",
    img: new URL("../assets/panchakarma/Rakta Mokshana.webp", import.meta.url).href,
  },
  {
    name: "Shirodhara",
    desc: "Warm herbal oil poured in a continuous stream on the forehead — deeply calming for mind and nervous system.",
    img: new URL("../assets/panchakarma/Shirodhara.jpeg", import.meta.url).href,
  },
  {
    name: "Swedana",
    desc: "Medicated steam fomentation that opens channels, induces sweating, and flushes deep-seated impurities.",
    img: new URL("../assets/panchakarma/Swedana.png", import.meta.url).href,
  },
  {
    name: "Udvartana",
    desc: "A vigorous herbal powder massage used for weight management and to improve skin complexion and tone.",
    img: new URL("../assets/panchakarma/Udvartana.webp", import.meta.url).href,
  },
  {
    name: "Vamana",
    desc: "Therapeutic emesis (vomiting) therapy to eliminate excess Kapha dosha, treating respiratory and skin conditions.",
    img: new URL("../assets/panchakarma/Vamana.png", import.meta.url).href,
  },
  {
    name: "Virechana",
    desc: "Therapeutic purgation therapy to eliminate excess Pitta dosha, treating digestive disorders and liver conditions.",
    img: new URL("../assets/panchakarma/Virechana.jpg", import.meta.url).href,
  },
  {
    name: "Kati Basti",
    desc: "Warm medicated oil retained in a dough well over the lower back — highly effective for lumbar pain.",
    img: new URL("../assets/panchakarma/kati-basti.jpg", import.meta.url).href,
  }
];

const visitTypes = [
  { title: "Consultation", text: "An unhurried first visit — detailed history, pulse diagnosis and a clear treatment plan." },
  { title: "Routine Check-ups", text: "Periodic Ayurvedic reviews to keep doshas in balance and prevent recurrence." },
  { title: "Specialist Care", text: "Focused treatment for chronic, stubborn or complex conditions." },
  { title: "Follow-up Visits", text: "Continued guidance, prescription tuning, and progress tracking." },
  { title: "Emergency Guidance", text: "Call us first — we'll advise whether an Ayurvedic intervention is appropriate or refer you onward." },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="bg-cream">
        <div className="container-page py-16 md:py-20 flex flex-col items-center text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">What we offer</p>
          <h1 className="mt-3 max-w-3xl text-4xl md:text-5xl">
            <InteractiveHoverText text="Comprehensive Ayurvedic care, from first visit to deep therapy." />
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            From everyday concerns to long-standing chronic conditions, our treatments are
            personalised, classical, and led by Dr. Hiren H. Kalthiya.
          </p>
        </div>
      </section>



      <section className="container-page pb-4 flex flex-col items-center text-center">
        <h2 className="text-2xl md:text-3xl">Conditions we treat</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">Areas of specialist focus — including new and old stubborn diseases.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ icon: Icon, title, conditions }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg">{title}</h3>
              </div>
              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                {conditions.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container-page">
          <div className="flex items-center gap-3">
            <Flame className="h-6 w-6 text-primary" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Signature therapies</p>
          </div>
          <h2 className="mt-3 max-w-2xl text-3xl md:text-4xl">Panchakarma — by the Keraliyan method.</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            Authentic detoxification and rejuvenation therapies prepared and administered with care.
            Swipe to explore our comprehensive range of treatments.
          </p>
        </div>
        
        <div className="mt-12 w-full px-6 md:px-12 pb-8">
          <Carousel opts={{ loop: true, align: "start" }} className="w-full">
            <CarouselContent className="-ml-6">
              {panchakarmaGallery.map((item) => (
                <CarouselItem key={item.name} className="pl-6 basis-[85vw] sm:basis-[320px] md:basis-[380px]">
                  <div className="group relative w-full h-72 sm:h-80 overflow-hidden rounded-3xl border border-border bg-card shadow-lg hover:shadow-xl transition-all duration-300">
                    <img
                      src={item.img}
                      alt={item.name + " Ayurvedic therapy at Shreeji Clinic"}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-semibold text-2xl mb-2 drop-shadow-md">
                        {item.name}
                      </h3>
                      <p className="text-sm text-white/90 leading-relaxed drop-shadow line-clamp-3">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-2xl md:text-3xl text-center">Ways to visit us</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visitTypes.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="text-lg">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-20 text-center">
        <h2 className="text-3xl md:text-4xl">Not sure what's right for you?</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Book a consultation — we'll guide you to the right treatment path.</p>
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
