"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cardStackConfig, addOnOptions } from "@/config";
import { cn } from "@/lib/utils";

interface Props {
  searchParams: { lang?: string; tour?: string; success?: string; canceled?: string };
}

function getAddOnPrice(addOnId: string, count: number): number {
  if (addOnId === "transport") return count <= 3 ? 200 : 300;
  if (addOnId === "chateau_visit") return count <= 1 ? 120 : 240;
  const a = addOnOptions.find((x) => x.id === addOnId);
  return (a?.price || 0) * count;
}

function getAddOnPriceLabel(addOnId: string, count: number, english: boolean): string {
  if (addOnId === "transport") {
    return `+${getAddOnPrice(addOnId, count)}€ ${english ? "/ booking" : "/ résa."}`;
  }
  if (addOnId === "chateau_visit") {
    const price = getAddOnPrice(addOnId, count);
    return `+${price}€ total`;
  }
  const a = addOnOptions.find((x) => x.id === addOnId);
  return `+${a?.price || 0}€ ${english ? "/ person" : "/ pers."}`;
}

export function ReservationClient({ searchParams }: Props) {
  const lang = searchParams.lang || "fr";
  const isEnglish = lang === "en";
  const success = searchParams.success === "true";
  const canceled = searchParams.canceled === "true";
  const tour = cardStackConfig.cards.find((c) => c.id === Number(searchParams.tour)) ?? cardStackConfig.cards[0];
  const dateLocale = isEnglish ? enUS : fr;

  const [step, setStep] = useState(success ? 3 : 1);
  const [date, setDate] = useState<Date>();
  const [participants, setParticipants] = useState(2);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [participantDetails, setParticipantDetails] = useState<Array<{ name: string; weight: string; height: string; level: string }>>([]);

  const riderLevels = isEnglish
    ? ["Beginner", "Intermediate", "Experienced"]
    : ["Débutant", "Intermédiaire", "Expérimenté"];

  const baseAmount = (tour?.basePrice || 490) * participants;
  const addOnsAmount = selectedAddOns.reduce((sum, id) => sum + getAddOnPrice(id, participants), 0);
  const totalAmount = baseAmount + addOnsAmount;

  const toggleAddOn = (id: string) =>
    setSelectedAddOns((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const canContinueStep1 = !!date && phone.trim().length >= 8;

  const initParticipantDetails = () => {
    const current = participantDetails;
    const updated = Array.from({ length: participants }, (_, i) => current[i] || { name: "", weight: "", height: "", level: "" });
    setParticipantDetails(updated);
  };

  const handleGoToStep2 = () => {
    initParticipantDetails();
    setStep(2);
  };

  const handleProceedToPayment = async () => {
    if (!date || !tour) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: "royal_complete",
          participants,
          addOns: selectedAddOns,
          date: format(date, "PPP", { locale: dateLocale }),
          lang,
          customerEmail: email,
          customerName: firstName,
          customerPhone: phone,
          participantDetails,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Checkout failed");
      }
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setError(
        isEnglish
          ? "Unable to redirect to payment. Please try again."
          : "Impossible de rediriger vers le paiement. Veuillez réessayer."
      );
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8" }}>

      {/* Navbar */}
      <nav style={{ borderBottom: "1px solid rgba(44,62,45,0.1)", background: "#FAFAF8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link
            href={`/?lang=${lang}`}
            style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "1.1rem", color: "#1A1A1A", letterSpacing: "0.03em" }}
          >
            Versailles à Cheval
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Link
              href={`/blog?lang=${lang}`}
              style={{ color: "#6B6B5F", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              Journal
            </Link>
            <Link
              href={`/reservation?tour=${tour?.id}&lang=${isEnglish ? "fr" : "en"}`}
              style={{ color: "#6B6B5F", fontSize: "11px", letterSpacing: "0.15em" }}
            >
              {isEnglish ? "FR" : "EN"}
            </Link>
          </div>
        </div>
      </nav>

      {/* Page intro band */}
      <div style={{ background: "#F4F2EE", borderBottom: "1px solid rgba(44,62,45,0.15)", textAlign: "center", padding: "64px 32px 56px" }}>
        <p style={{ color: "#2C3E2D", letterSpacing: "0.3em", fontSize: "10px", fontWeight: 500, textTransform: "uppercase", marginBottom: "16px" }}>
          {isEnglish ? "Royal experience" : "Expérience royale"}
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#1A1A1A", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "12px" }}>
          {isEnglish ? "Book your experience" : "Réservez votre expérience"}
        </h1>
        <p style={{ color: "#6B6B5F", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto" }}>
          {isEnglish
            ? "Two hours through the royal gardens. Secure booking, free cancellation up to 48 hours before."
            : "Deux heures dans les jardins royaux. Réservation sécurisée, annulation gratuite jusqu'à 48h avant."}
        </p>
      </div>

      {/* Confirmation */}
      {step === 3 && (
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center", padding: "96px 32px" }}>
          <div style={{ width: "56px", height: "56px", border: "1px solid #2C3E2D", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 40px" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#2C3E2D" strokeWidth="1.5" strokeLinecap="round">
              <polyline points="4 10 8 14 16 6" />
            </svg>
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#1A1A1A", marginBottom: "16px" }}>
            {isEnglish ? "Booking confirmed." : "Réservation confirmée."}
          </h2>
          <p style={{ color: "#6B6B5F", lineHeight: 1.8, marginBottom: "40px", fontSize: "1rem" }}>
            {isEnglish
              ? "Your booking is confirmed. To complete it, please send us each rider's details via WhatsApp — we'll assign the perfect horse for everyone."
              : "Votre réservation est confirmée. Pour la finaliser, envoyez-nous les informations de chaque cavalier via WhatsApp — nous attribuerons le cheval idéal pour chacun."}
          </p>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/33625757995?text=${encodeURIComponent(
              isEnglish
                ? `Hello! I just booked a ride for ${participants} person${participants > 1 ? "s" : ""}. Here are the rider details:\n\nRider 1: weight _kg, height _cm, level (beginner/intermediate/experienced)\n${participants > 1 ? `Rider 2: weight _kg, height _cm, level _\n` : ""}Thank you!`
                : `Bonjour ! Je viens de réserver une balade pour ${participants} cavalier${participants > 1 ? "s" : ""}. Voici les informations :\n\nCavalier 1 : poids _kg, taille _cm, niveau (débutant/intermédiaire/expérimenté)\n${participants > 1 ? `Cavalier 2 : poids _kg, taille _cm, niveau _\n` : ""}Merci !`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "#25D366", color: "#fff", padding: "18px 40px", fontSize: "13px", letterSpacing: "0.08em", fontWeight: 500, textDecoration: "none", marginBottom: "40px" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {isEnglish ? "Send rider details on WhatsApp" : "Envoyer les infos cavaliers sur WhatsApp"}
          </a>

          <br />
          <Link
            href={`/?lang=${lang}`}
            style={{ color: "#6B6B5F", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            ← {isEnglish ? "Back to home" : "Retour à l'accueil"}
          </Link>
        </div>
      )}

      {/* Steps 1 & 2 */}
      {step !== 3 && (
        <div style={{ maxWidth: "1060px", margin: "0 auto", padding: "96px 32px 120px" }}>

            {/* Main form area — 2 columns */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "56px", alignItems: "start" }}>

              {/* Left: form — centré dans sa colonne */}
              <div style={{ maxWidth: "480px", margin: "0 auto", width: "100%" }}>
                {/* Step indicator */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "48px" }}>
                  {[1, 2].map((s) => (
                    <div key={s} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          border: step >= s ? "1px solid #2C3E2D" : "1px solid rgba(44,62,45,0.25)",
                          background: step >= s ? "#2C3E2D" : "transparent",
                          color: step >= s ? "#FAFAF8" : "#6B6B5F",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 500,
                          flexShrink: 0,
                        }}
                      >
                        {step > s ? (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                            <polyline points="2 6 5 9 10 3" />
                          </svg>
                        ) : s}
                      </div>
                      {s === 1 && <div style={{ height: "1px", width: "40px", background: "rgba(44,62,45,0.2)" }} />}
                    </div>
                  ))}
                  <span style={{ fontSize: "11px", color: "#6B6B5F", letterSpacing: "0.1em", textTransform: "uppercase", marginLeft: "4px" }}>
                    {step === 1
                      ? (isEnglish ? "Date & contact" : "Date & contact")
                      : (isEnglish ? "Options & riders" : "Options & cavaliers")}
                  </span>
                </div>

                {canceled && (
                  <div style={{ marginBottom: "32px", padding: "16px 20px", border: "1px solid rgba(139,115,85,0.3)", background: "rgba(139,115,85,0.05)", fontSize: "14px", color: "#8B7355" }}>
                    {isEnglish
                      ? "Payment was canceled. You can try again below."
                      : "Le paiement a été annulé. Vous pouvez réessayer ci-dessous."}
                  </div>
                )}

                {/* STEP 1 */}
                {step === 1 && (
                  <div>
                    <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#1A1A1A", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                      {isEnglish ? "Choose your date" : "Choisissez votre date"}
                    </h2>
                    <p style={{ color: "#6B6B5F", fontSize: "0.9rem", marginBottom: "48px", lineHeight: 1.7 }}>
                      {isEnglish ? tour?.descriptionEn : tour?.description}
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
                      {/* Date picker */}
                      <div>
                        <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6B5F", marginBottom: "12px" }}>
                          {isEnglish ? "Date" : "Date"}
                        </label>
                        <Popover>
                          <PopoverTrigger
                            className={cn(
                              "w-full flex items-center justify-between px-4 py-4 border text-sm transition-colors text-left",
                              date
                                ? "border-[#2C3E2D] text-[#1A1A1A]"
                                : "border-[#2C3E2D]/25 text-[#6B6B5F] hover:border-[#2C3E2D]/50"
                            )}
                          >
                            {date
                              ? format(date, "EEEE d MMMM yyyy", { locale: dateLocale })
                              : (isEnglish ? "Select a date" : "Sélectionnez une date")}
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.4">
                              <rect x="1" y="2" width="14" height="13" rx="1" />
                              <line x1="1" y1="6" x2="15" y2="6" />
                              <line x1="5" y1="1" x2="5" y2="4" />
                              <line x1="11" y1="1" x2="11" y2="4" />
                            </svg>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 border border-[#2C3E2D]/20" align="start" style={{ zIndex: 9999 }}>
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={(d) => d < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Participants */}
                      <div>
                        <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6B5F", marginBottom: "12px" }}>
                          {isEnglish ? "Travelers" : "Participants"}
                        </label>
                        <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
                          <button
                            onClick={() => setParticipants(Math.max(1, participants - 1))}
                            disabled={participants <= 1}
                            style={{ width: "48px", height: "48px", border: "1px solid rgba(44,62,45,0.25)", background: "transparent", color: "#1A1A1A", fontSize: "1.2rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: participants <= 1 ? 0.3 : 1 }}
                          >
                            −
                          </button>
                          <div style={{ width: "64px", height: "48px", border: "1px solid rgba(44,62,45,0.25)", borderLeft: "none", borderRight: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "1.4rem", color: "#1A1A1A" }}>
                              {participants}
                            </span>
                          </div>
                          <button
                            onClick={() => setParticipants(Math.min(10, participants + 1))}
                            disabled={participants >= 10}
                            style={{ width: "48px", height: "48px", border: "1px solid rgba(44,62,45,0.25)", background: "transparent", color: "#1A1A1A", fontSize: "1.2rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: participants >= 10 ? 0.3 : 1 }}
                          >
                            +
                          </button>
                          <span style={{ marginLeft: "20px", fontSize: "14px", color: "#6B6B5F" }}>
                            × {tour?.basePrice || 490}€ = <strong style={{ color: "#1A1A1A", fontWeight: 500 }}>{baseAmount}€</strong>
                          </span>
                        </div>
                      </div>

                      {/* Contact info */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6B5F", marginBottom: "8px" }}>
                            {isEnglish ? "WhatsApp / Phone" : "WhatsApp / Téléphone"} *
                          </label>
                          <p style={{ fontSize: "11px", color: "rgba(107,107,95,0.7)", marginBottom: "10px", lineHeight: 1.5 }}>
                            {isEnglish
                              ? "We will send you booking details and coordinate via WhatsApp."
                              : "Nous vous enverrons les détails et coordinerons via WhatsApp."}
                          </p>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+33 6 00 00 00 00"
                            autoComplete="tel"
                            style={{ width: "100%", padding: "14px 16px", border: `1px solid ${phone.trim().length >= 8 ? "#2C3E2D" : "rgba(44,62,45,0.25)"}`, background: "transparent", fontSize: "14px", color: "#1A1A1A", outline: "none", boxSizing: "border-box" }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6B5F", marginBottom: "12px" }}>
                            {isEnglish ? "First name" : "Prénom"}
                          </label>
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder={isEnglish ? "Your first name" : "Votre prénom"}
                            autoComplete="given-name"
                            style={{ width: "100%", padding: "14px 16px", border: "1px solid rgba(44,62,45,0.25)", background: "transparent", fontSize: "14px", color: "#1A1A1A", outline: "none", boxSizing: "border-box" }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6B5F", marginBottom: "12px" }}>
                            {isEnglish ? "Email (optional)" : "Email (optionnel)"}
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={isEnglish ? "your@email.com" : "votre@email.com"}
                            autoComplete="email"
                            style={{ width: "100%", padding: "14px 16px", border: "1px solid rgba(44,62,45,0.25)", background: "transparent", fontSize: "14px", color: "#1A1A1A", outline: "none", boxSizing: "border-box" }}
                          />
                        </div>
                      </div>

                      <div style={{ textAlign: "center", marginTop: "8px" }}>
                        <button
                          onClick={handleGoToStep2}
                          disabled={!canContinueStep1}
                          style={{ display: "inline-block", background: canContinueStep1 ? "#2C3E2D" : "rgba(44,62,45,0.3)", color: "#FAFAF8", padding: "22px 64px", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, border: "none", cursor: canContinueStep1 ? "pointer" : "not-allowed" }}
                        >
                          {isEnglish ? "Continue" : "Continuer"} →
                        </button>
                        {phone.trim().length < 8 && date && (
                          <p style={{ marginTop: "10px", fontSize: "12px", color: "#8B7355" }}>
                            {isEnglish ? "Please enter your phone number to continue." : "Merci de renseigner votre numéro de téléphone pour continuer."}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div>
                    <button
                      onClick={() => setStep(1)}
                      style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#6B6B5F", letterSpacing: "0.12em", textTransform: "uppercase", background: "none", border: "none", cursor: "pointer", marginBottom: "40px" }}
                    >
                      ← {isEnglish ? "Back" : "Retour"}
                    </button>

                    <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#1A1A1A", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                      {isEnglish ? "Complete your experience" : "Complétez votre expérience"}
                    </h2>
                    <p style={{ color: "#6B6B5F", fontSize: "0.9rem", marginBottom: "40px", lineHeight: 1.7 }}>
                      {isEnglish
                        ? "Each option can be added or removed — nothing is mandatory."
                        : "Chaque option peut être ajoutée ou retirée — rien n'est obligatoire."}
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                      {addOnOptions.map((addOn) => {
                        const active = selectedAddOns.includes(addOn.id);
                        return (
                          <button
                            key={addOn.id}
                            type="button"
                            onClick={() => toggleAddOn(addOn.id)}
                            style={{
                              width: "100%",
                              textAlign: "left",
                              padding: "20px 24px",
                              border: active ? "1px solid #2C3E2D" : "1px solid rgba(44,62,45,0.2)",
                              background: active ? "rgba(44,62,45,0.03)" : "transparent",
                              cursor: "pointer",
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
                              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", flex: 1 }}>
                                <div
                                  style={{
                                    marginTop: "2px",
                                    width: "16px",
                                    height: "16px",
                                    border: active ? "1px solid #2C3E2D" : "1px solid rgba(44,62,45,0.3)",
                                    background: active ? "#2C3E2D" : "transparent",
                                    flexShrink: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  {active && (
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#FAFAF8" strokeWidth="1.5" strokeLinecap="round">
                                      <polyline points="2 5 4 7 8 3" />
                                    </svg>
                                  )}
                                </div>
                                <div>
                                  <p style={{ fontSize: "14px", fontWeight: 500, color: "#1A1A1A", marginBottom: "4px" }}>
                                    {isEnglish ? addOn.nameEn : addOn.name}
                                  </p>
                                  <p style={{ fontSize: "13px", color: "#6B6B5F", lineHeight: 1.7 }}>
                                    {isEnglish ? addOn.descriptionEn : addOn.description}
                                  </p>
                                </div>
                              </div>
                              <span style={{ fontSize: "13px", color: "#2C3E2D", fontWeight: 500, whiteSpace: "nowrap", flexShrink: 0 }}>
                                {getAddOnPriceLabel(addOn.id, participants, isEnglish)}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* WhatsApp note */}
                    <div style={{ marginBottom: "32px", padding: "16px 20px", background: "rgba(44,62,45,0.04)", border: "1px solid rgba(44,62,45,0.12)", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#2C3E2D" style={{ flexShrink: 0, marginTop: "2px", opacity: 0.7 }}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <div>
                        <p style={{ fontSize: "13px", fontWeight: 500, color: "#1A1A1A", marginBottom: "4px" }}>
                          {isEnglish ? "After payment, we coordinate via WhatsApp" : "Après le paiement, on coordonne via WhatsApp"}
                        </p>
                        <p style={{ fontSize: "12px", color: "#6B6B5F", lineHeight: 1.6 }}>
                          {isEnglish
                            ? "We will contact you to collect each rider's details (weight, height, level) and assign the perfect horse."
                            : "Nous vous contacterons pour recueillir les infos de chaque cavalier (poids, taille, niveau) et attribuer le cheval idéal."}
                        </p>
                      </div>
                    </div>

                    {error && (
                      <div style={{ marginBottom: "24px", padding: "16px 20px", border: "1px solid #fecaca", background: "#fef2f2", fontSize: "14px", color: "#dc2626" }}>
                        {error}
                      </div>
                    )}

                    <div style={{ textAlign: "center", marginTop: "8px" }}>
                      <button
                        onClick={handleProceedToPayment}
                        disabled={isLoading}
                        style={{ display: "inline-block", background: "#2C3E2D", color: "#FAFAF8", padding: "22px 64px", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.6 : 1 }}
                      >
                        {isLoading
                          ? (isEnglish ? "Loading…" : "Chargement…")
                          : `${isEnglish ? "Pay" : "Payer"} ${totalAmount}€ →`}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Summary */}
              <div style={{ position: "sticky", top: "24px" }}>
                <div style={{ border: "1px solid rgba(44,62,45,0.12)", background: "#fff", padding: "32px" }}>
                  <p style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#6B6B5F", marginBottom: "24px" }}>
                    {isEnglish ? "Your experience" : "Votre expérience"}
                  </p>

                  {/* Tour image */}
                  <div style={{ aspectRatio: "16/9", overflow: "hidden", marginBottom: "24px" }}>
                    <img
                      src={tour?.image}
                      alt={isEnglish ? tour?.titleEn : tour?.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "1.25rem", color: "#1A1A1A", marginBottom: "4px", lineHeight: 1.3 }}>
                    {isEnglish ? tour?.titleEn : tour?.title}
                  </h3>
                  {date && (
                    <p style={{ fontSize: "13px", color: "#6B6B5F", marginBottom: "24px", lineHeight: 1.6 }}>
                      {format(date, "d MMMM yyyy", { locale: dateLocale })} · {participants}{" "}
                      {participants === 1 ? (isEnglish ? "person" : "personne") : (isEnglish ? "people" : "personnes")}
                    </p>
                  )}

                  <div style={{ borderTop: "1px solid rgba(44,62,45,0.1)", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                      <span style={{ color: "#6B6B5F" }}>{(tour?.basePrice || 490)}€ × {participants}</span>
                      <span style={{ color: "#1A1A1A" }}>{baseAmount}€</span>
                    </div>
                    {selectedAddOns.map((id) => {
                      const a = addOnOptions.find((x) => x.id === id);
                      if (!a) return null;
                      return (
                        <div key={id} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                          <span style={{ color: "#6B6B5F" }}>{isEnglish ? a.nameEn : a.name}</span>
                          <span style={{ color: "#1A1A1A" }}>+{getAddOnPrice(id, participants)}€</span>
                        </div>
                      );
                    })}
                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "16px", borderTop: "1px solid rgba(44,62,45,0.1)", marginTop: "4px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 500, color: "#1A1A1A" }}>Total</span>
                      <span style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "1.4rem", color: "#1A1A1A" }}>
                        {totalAmount}€
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: "12px", color: "#6B6B5F", marginTop: "20px", lineHeight: 1.8, borderTop: "1px solid rgba(44,62,45,0.08)", paddingTop: "16px" }}>
                    {isEnglish
                      ? "Secure payment via Stripe. Free cancellation up to 48h before the experience."
                      : "Paiement sécurisé via Stripe. Annulation gratuite jusqu'à 48h avant l'expérience."}
                  </p>
                </div>

                {/* Trust badges */}
                <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
                  {[
                    isEnglish ? "🔒 Secure" : "🔒 Sécurisé",
                    isEnglish ? "✓ Free cancellation" : "✓ Annulation gratuite",
                  ].map((badge) => (
                    <span key={badge} style={{ flex: 1, textAlign: "center", fontSize: "11px", color: "#6B6B5F", background: "rgba(44,62,45,0.04)", border: "1px solid rgba(44,62,45,0.1)", padding: "8px 4px", letterSpacing: "0.04em" }}>
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

            </div>
        </div>
      )}
    </div>
  );
}
