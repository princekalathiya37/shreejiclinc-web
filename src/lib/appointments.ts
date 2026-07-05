import { z } from "zod";

export const appointmentSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().regex(/^[0-9+\-\s()]{7,20}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  age: z.coerce.number().int().min(0).max(120).optional().or(z.literal("")),
  gender: z.enum(["male", "female", "other", ""]).optional(),
  service: z.string().trim().min(1, "Please select a service").max(120),
  preferred_date: z.string().refine((v) => {
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d.getTime() >= today.getTime();
  }, "Date cannot be in the past"),
  preferred_time: z.string().trim().min(1, "Please choose a time"),
  reason: z.string().trim().min(5, "Please describe the reason (min 5 chars)").max(1000),
  patient_type: z.enum(["new", "existing"]),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

export const SERVICES = [
  "General Consultation",
  "Skin Care (Eczema, Psoriasis, Pimples)",
  "Hair Care (Hair fall, Dandruff, Alopecia)",
  "Joint & Nerve Care (Arthritis, Sciatica)",
  "Digestive Care (Gas, IBS, Piles)",
  "Respiratory Care (Asthma, Sinus)",
  "Infertility & Pumsavana Sanskar",
  "Mental Wellness (Insomnia, Stress)",
  "Panchakarma Therapy",
  "Viddhagni Karma / Agnikarma",
  "Weight Management",
  "Other",
];
