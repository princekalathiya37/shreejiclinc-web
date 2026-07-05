import { createFileRoute } from "@tanstack/react-router";
import { appointmentSchema } from "@/lib/appointments";

/** Send a Telegram message to the doctor. */
async function notifyDoctorTelegram(d: {
  full_name: string;
  phone: string;
  email?: string | "";
  age?: number | "";
  gender?: string | "";
  service: string;
  preferred_date: string;
  preferred_time: string;
  patient_type: string;
  reason: string;
  notes?: string | "";
}) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("Telegram notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set in environment.");
    return;
  }

  const msg = [
    "🔔 *New Appointment — Shreeji Ayurvedic Center*",
    "",
    `👤 *Patient:* ${d.full_name}`,
    `📱 *Phone:* ${d.phone}`,
    d.email ? `📧 *Email:* ${d.email}` : null,
    d.age !== "" && d.age !== undefined ? `🎂 *Age:* ${d.age}` : null,
    d.gender ? `⚧ *Gender:* ${d.gender}` : null,
    `🩺 *Service:* ${d.service}`,
    `📅 *Date:* ${d.preferred_date}`,
    `🕐 *Time:* ${d.preferred_time}`,
    `🏷️ *Type:* ${d.patient_type === "new" ? "New Patient" : "Existing Patient"}`,
    "",
    `📝 *Reason:* ${d.reason}`,
    d.notes ? `💬 *Notes:* ${d.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: msg,
        parse_mode: "Markdown",
      }),
    });

    if (!res.ok) {
      console.warn("Telegram notification failed:", await res.text());
    }
  } catch (err) {
    console.warn("Telegram notification error:", err);
  }
}

/** Send a WhatsApp message to the doctor via Green-API (100% Free Plan). */
async function notifyDoctorWhatsApp(d: {
  full_name: string;
  phone: string;
  email?: string | "";
  age?: number | "";
  gender?: string | "";
  service: string;
  preferred_date: string;
  preferred_time: string;
  patient_type: string;
  reason: string;
  notes?: string | "";
}) {
  const idInstance = process.env.GREEN_API_ID_INSTANCE;
  const apiTokenInstance = process.env.GREEN_API_TOKEN_INSTANCE;
  const toWhatsApp = process.env.WHATSAPP_DOCTOR_PHONE; // Doctor's number with country code, e.g. 919033576234

  if (!idInstance || !apiTokenInstance || !toWhatsApp) {
    console.warn("WhatsApp notification skipped: Green-API credentials or doctor's phone not set in environment.");
    return;
  }

  const msg = [
    "🏥 *New Appointment — Shreeji Ayurvedic Center*",
    "",
    `👤 *Patient:* ${d.full_name}`,
    `📱 *Phone:* ${d.phone}`,
    d.email ? `📧 *Email:* ${d.email}` : null,
    d.age !== "" && d.age !== undefined ? `🎂 *Age:* ${d.age}` : null,
    d.gender ? `⚧ *Gender:* ${d.gender}` : null,
    `🩺 *Service:* ${d.service}`,
    `📅 *Date:* ${d.preferred_date}`,
    `🕐 *Time:* ${d.preferred_time}`,
    `🏷️ *Type:* ${d.patient_type === "new" ? "New Patient" : "Existing Patient"}`,
    "",
    `📝 *Reason:* ${d.reason}`,
    d.notes ? `💬 *Notes:* ${d.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: `${toWhatsApp}@c.us`,
        message: msg,
      }),
    });

    if (!res.ok) {
      console.warn("Green-API WhatsApp notification failed:", await res.text());
    }
  } catch (err) {
    console.warn("Green-API WhatsApp notification error:", err);
  }
}

export const Route = createFileRoute("/api/appointments")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = appointmentSchema.safeParse(body);
          if (!parsed.success) {
            return Response.json(
              { ok: false, error: "Invalid input", details: parsed.error.flatten() },
              { status: 400 },
            );
          }
          const d = parsed.data;
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          const { data, error } = await supabaseAdmin
            .from("appointments")
            .insert({
              full_name: d.full_name,
              phone: d.phone,
              email: d.email || null,
              age: d.age === "" || d.age === undefined ? null : Number(d.age),
              gender: d.gender || null,
              service: d.service,
              preferred_date: d.preferred_date,
              preferred_time: d.preferred_time,
              reason: d.reason,
              patient_type: d.patient_type,
              notes: d.notes || null,
            })
            .select("id")
            .single();

          if (error) {
            console.error("Appointment insert error", error);
            return Response.json({ ok: false, error: "Could not save appointment" }, { status: 500 });
          }

          // Fire WhatsApp and Telegram notifications (non-blocking — patient success unaffected if these fail)
          notifyDoctorWhatsApp(d).catch(() => {});
          notifyDoctorTelegram(d).catch(() => {});

          return Response.json({ ok: true, id: data.id });
        } catch (e) {
          console.error(e);
          return Response.json({ ok: false, error: "Server error" }, { status: 500 });
        }
      },
    },
  },
});
