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

  const baseAmount = (tour?.basePrice || 490) * participants;
  const addOnsAmount = selectedAddOns.reduce((sum, id) => sum + getAddOnPrice(id, participants), 0);
  const totalAmount = baseAmount + addOnsAmount;

  const toggleAddOn = (id: string) =>
    setSelectedAddOns((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

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
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <header className="border-b border-[#2C3E2D]/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            href={`/?lang=${lang}`}
            className="text-xl text-[#1A1A1A] hover:text-[#2C3E2D] transition-colors"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
          >
            Versailles à Cheval
          </Link>
          <Link
            href={`/reservation?tour=${tour?.id}&lang=${isEnglish ? "fr" : "en"}`}
            className="text-sm text-[#6B6B5F] hover:text-[#1A1A1A] transition-colors tracking-wide"
          >
            {isEnglish ? "FR" : "EN"}
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="max-w-xl mx-auto text-center py-24">
            <div className="w-14 h-14 border border-[#2C3E2D] rounded-full flex items-center justify-center mx-auto mb-10">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#2C3E2D" strokeWidth="1.5" strokeLinecap="round">
                <polyline points="4 10 8 14 16 6" />
              </svg>
            </div>
            <h1
              className="text-4xl text-[#1A1A1A] mb-4"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
            >
              {isEnglish ? "Booking confirmed." : "Réservation confirmée."}
            </h1>
            <p className="text-[#6B6B5F] mb-10 leading-relaxed">
              {isEnglish
                ? "A confirmation email will be sent to you shortly. We look forward to welcoming you."
                : "Un email de confirmation vous sera envoyé prochainement. Nous avons hâte de vous accueillir."}
            </p>
            <Link
              href={`/?lang=${lang}`}
              className="inline-flex items-center gap-2 text-sm text-[#2C3E2D] tracking-wide underline underline-offset-4 hover:text-[#1A1A1A] transition-colors"
            >
              {isEnglish ? "← Back to home" : "← Retour à l'accueil"}
            </Link>
          </div>
        )}

        {/* Steps 1 & 2 */}
        {step !== 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Left: form */}
            <div className="lg:col-span-3">
              {/* Step indicator */}
              <div className="flex items-center gap-3 mb-12">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full border flex items-center justify-center text-xs transition-colors",
                        step >= s
                          ? "bg-[#2C3E2D] border-[#2C3E2D] text-[#FAFAF8]"
                          : "border-[#2C3E2D]/30 text-[#6B6B5F]"
                      )}
                    >
                      {step > s ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <polyline points="2 6 5 9 10 3" />
                        </svg>
                      ) : (
                        s
                      )}
                    </div>
                    {s === 1 && <div className="h-px w-10 bg-[#2C3E2D]/20" />}
                  </div>
                ))}
                <span className="text-xs text-[#6B6B5F] ml-1">
                  {step === 1
                    ? (isEnglish ? "Date & travelers" : "Date & participants")
                    : (isEnglish ? "Options" : "Options")}
                </span>
              </div>

              {canceled && (
                <div className="mb-8 px-5 py-4 border border-[#8B7355]/30 bg-[#8B7355]/5 text-sm text-[#8B7355]">
                  {isEnglish
                    ? "Payment was canceled. You can try again below."
                    : "Le paiement a été annulé. Vous pouvez réessayer ci-dessous."}
                </div>
              )}

              {/* STEP 1 */}
              {step === 1 && (
                <div>
                  <h1
                    className="text-3xl md:text-4xl text-[#1A1A1A] mb-2"
                    style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
                  >
                    {isEnglish ? "Choose your date" : "Choisissez votre date"}
                  </h1>
                  <p className="text-[#6B6B5F] text-sm mb-10">
                    {isEnglish ? tour?.descriptionEn : tour?.description}
                  </p>

                  <div className="space-y-8">
                    {/* Date picker */}
                    <div>
                      <label className="block text-xs tracking-[0.15em] uppercase text-[#6B6B5F] mb-3">
                        {isEnglish ? "Date" : "Date"}
                      </label>
                      <Popover>
                        <PopoverTrigger
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-3 border text-sm transition-colors text-left",
                            date
                              ? "border-[#2C3E2D] text-[#1A1A1A]"
                              : "border-[#2C3E2D]/25 text-[#6B6B5F] hover:border-[#2C3E2D]/50"
                          )}
                        >
                          {date
                            ? format(date, "EEEE d MMMM yyyy", { locale: dateLocale })
                            : (isEnglish ? "Select a date" : "Sélectionnez une date")}
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5">
                            <rect x="1" y="2" width="14" height="13" rx="1" />
                            <line x1="1" y1="6" x2="15" y2="6" />
                            <line x1="5" y1="1" x2="5" y2="4" />
                            <line x1="11" y1="1" x2="11" y2="4" />
                          </svg>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 border border-[#2C3E2D]/20" align="start">
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
                      <label className="block text-xs tracking-[0.15em] uppercase text-[#6B6B5F] mb-3">
                        {isEnglish ? "Travelers" : "Participants"}
                      </label>
                      <div className="flex items-center gap-5">
                        <button
                          onClick={() => setParticipants(Math.max(1, participants - 1))}
                          disabled={participants <= 1}
                          className="w-10 h-10 border border-[#2C3E2D]/25 hover:border-[#2C3E2D] text-[#1A1A1A] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          −
                        </button>
                        <span className="text-2xl text-[#1A1A1A] w-8 text-center" style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}>
                          {participants}
                        </span>
                        <button
                          onClick={() => setParticipants(Math.min(10, participants + 1))}
                          disabled={participants >= 10}
                          className="w-10 h-10 border border-[#2C3E2D]/25 hover:border-[#2C3E2D] text-[#1A1A1A] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          +
                        </button>
                        <span className="text-sm text-[#6B6B5F]">
                          × {tour?.basePrice || 490}€ = {baseAmount}€
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      disabled={!date}
                      className="w-full bg-[#2C3E2D] hover:bg-[#3D5C3E] text-[#FAFAF8] py-4 text-sm tracking-[0.15em] uppercase transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isEnglish ? "Continue" : "Continuer"} →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div>
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 text-xs text-[#6B6B5F] hover:text-[#1A1A1A] transition-colors tracking-wide mb-10"
                  >
                    ← {isEnglish ? "Back" : "Retour"}
                  </button>

                  <h2
                    className="text-3xl md:text-4xl text-[#1A1A1A] mb-2"
                    style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
                  >
                    {isEnglish ? "Complete your experience" : "Complétez votre expérience"}
                  </h2>
                  <p className="text-[#6B6B5F] text-sm mb-10">
                    {isEnglish
                      ? "Each option can be added or removed — nothing is mandatory."
                      : "Chaque option peut être ajoutée ou retirée — rien n'est obligatoire."}
                  </p>

                  <div className="space-y-3 mb-8">
                    {addOnOptions.map((addOn) => {
                      const active = selectedAddOns.includes(addOn.id);
                      return (
                        <button
                          key={addOn.id}
                          type="button"
                          onClick={() => toggleAddOn(addOn.id)}
                          className={cn(
                            "w-full text-left px-5 py-5 border transition-colors",
                            active
                              ? "border-[#2C3E2D] bg-[#2C3E2D]/4"
                              : "border-[#2C3E2D]/20 hover:border-[#2C3E2D]/50"
                          )}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              <div
                                className={cn(
                                  "mt-0.5 w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors",
                                  active ? "bg-[#2C3E2D] border-[#2C3E2D]" : "border-[#2C3E2D]/30"
                                )}
                              >
                                {active && (
                                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#FAFAF8" strokeWidth="1.5" strokeLinecap="round">
                                    <polyline points="2 5 4 7 8 3" />
                                  </svg>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-[#1A1A1A] mb-1">
                                  {isEnglish ? addOn.nameEn : addOn.name}
                                </p>
                                <p className="text-xs text-[#6B6B5F] leading-relaxed">
                                  {isEnglish ? addOn.descriptionEn : addOn.description}
                                </p>
                              </div>
                            </div>
                            <span className="text-sm text-[#2C3E2D] font-medium whitespace-nowrap flex-shrink-0">
                              {getAddOnPriceLabel(addOn.id, participants, isEnglish)}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {error && (
                    <div className="mb-6 px-5 py-4 border border-red-200 bg-red-50 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleProceedToPayment}
                    disabled={isLoading}
                    className="w-full bg-[#2C3E2D] hover:bg-[#3D5C3E] text-[#FAFAF8] py-4 text-sm tracking-[0.15em] uppercase transition-colors disabled:opacity-50"
                  >
                    {isLoading
                      ? (isEnglish ? "Loading…" : "Chargement…")
                      : `${isEnglish ? "Pay" : "Payer"} ${totalAmount}€ →`}
                  </button>
                </div>
              )}
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-2 lg:sticky lg:top-8">
              <div className="border border-[#2C3E2D]/12 p-7">
                <p className="text-xs tracking-[0.2em] uppercase text-[#6B6B5F] mb-5">
                  {isEnglish ? "Your experience" : "Votre expérience"}
                </p>

                {/* Tour image */}
                <div className="aspect-[16/10] overflow-hidden mb-6">
                  <img
                    src={tour?.image}
                    alt={isEnglish ? tour?.titleEn : tour?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3
                  className="text-xl text-[#1A1A1A] mb-1"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
                >
                  {isEnglish ? tour?.titleEn : tour?.title}
                </h3>
                {date && (
                  <p className="text-sm text-[#6B6B5F] mb-6">
                    {format(date, "d MMMM yyyy", { locale: dateLocale })} · {participants}{" "}
                    {participants === 1 ? (isEnglish ? "person" : "personne") : (isEnglish ? "people" : "personnes")}
                  </p>
                )}

                <div className="space-y-2 border-t border-[#2C3E2D]/10 pt-5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B6B5F]">{(tour?.basePrice || 490)}€ × {participants}</span>
                    <span className="text-[#1A1A1A]">{baseAmount}€</span>
                  </div>
                  {selectedAddOns.map((id) => {
                    const a = addOnOptions.find((x) => x.id === id);
                    if (!a) return null;
                    return (
                      <div key={id} className="flex justify-between">
                        <span className="text-[#6B6B5F]">{isEnglish ? a.nameEn : a.name}</span>
                        <span className="text-[#1A1A1A]">+{getAddOnPrice(id, participants)}€</span>
                      </div>
                    );
                  })}
                  <div className="flex justify-between pt-4 border-t border-[#2C3E2D]/10">
                    <span className="font-medium text-[#1A1A1A]">Total</span>
                    <span
                      className="text-xl text-[#1A1A1A]"
                      style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
                    >
                      {totalAmount}€
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#6B6B5F] mt-5 leading-relaxed">
                  {isEnglish
                    ? "Secure payment via Stripe. Free cancellation up to 48h before the experience."
                    : "Paiement sécurisé via Stripe. Annulation gratuite jusqu'à 48h avant l'expérience."}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
