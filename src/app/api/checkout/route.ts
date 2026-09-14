import { NextRequest, NextResponse } from "next/server";
import { SITE_URL, ADDON_PRICES } from "@/config";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const BASE_PRICE_PER_PERSON = 49000; // 490€ en centimes

const PRODUCT_NAMES: Record<string, { fr: string; en: string }> = {
  royal_complete: {
    fr: "L'Expérience Royale Complète",
    en: "The Complete Royal Experience",
  },
};

const ADDON_NAMES: Record<string, { fr: string; en: string }> = {
  transport: { fr: "Transport depuis votre hôtel", en: "Transport from your hotel" },
  chateau_visit: { fr: "Visite guidée du Château", en: "Guided Château Tour" },
  lunch_ducasse: { fr: "Déjeuner gastronomique Ducasse", en: "Gastronomic Lunch Ducasse" },
  lunch_bistro: { fr: "Déjeuner Bistro", en: "Bistro Lunch" },
};

export async function POST(request: NextRequest) {
  if (!STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const body = await request.json();
  const { productId = "royal_complete", participants = 1, addOns = [], date, lang = "fr" } = body;

  const validParticipants = Math.max(1, Math.min(10, parseInt(participants) || 1));
  const isEnglish = lang === "en";

  const product = PRODUCT_NAMES[productId];
  if (!product) {
    return NextResponse.json({ error: "Unknown product" }, { status: 400 });
  }

  // Calculate amounts server-side
  let totalCents = BASE_PRICE_PER_PERSON * validParticipants;
  const addOnNameList: string[] = [];

  for (const addOnId of addOns) {
    const priceFn = ADDON_PRICES[addOnId];
    if (priceFn) {
      const euros = priceFn(validParticipants);
      totalCents += euros * 100;
      const names = ADDON_NAMES[addOnId];
      if (names) addOnNameList.push(isEnglish ? names.en : names.fr);
    }
  }

  const tourName = isEnglish ? product.en : product.fr;
  const description = [
    date ? date : null,
    `${validParticipants} ${isEnglish ? "travelers" : "voyageurs"}`,
    ...addOnNameList,
  ]
    .filter(Boolean)
    .join(" · ");

  const origin = request.headers.get("origin") || SITE_URL;

  const params = new URLSearchParams({
    "payment_method_types[0]": "card",
    "line_items[0][price_data][currency]": "eur",
    "line_items[0][price_data][product_data][name]": tourName,
    "line_items[0][price_data][product_data][description]": description,
    "line_items[0][price_data][unit_amount]": totalCents.toString(),
    "line_items[0][quantity]": "1",
    mode: "payment",
    success_url: `${origin}/reservation?success=true&lang=${lang}`,
    cancel_url: `${origin}/reservation?canceled=true&lang=${lang}`,
    "metadata[product_id]": productId,
    "metadata[participants]": validParticipants.toString(),
    "metadata[addons]": addOns.join(","),
  });

  const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  if (!stripeRes.ok) {
    const err = await stripeRes.json();
    return NextResponse.json({ error: err.error?.message || "Stripe error" }, { status: 500 });
  }

  const session = await stripeRes.json();
  return NextResponse.json({ sessionId: session.id, url: session.url });
}
