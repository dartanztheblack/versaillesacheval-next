"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { Calendar as CalendarIcon, ChevronLeft, Loader2, Check } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
    const price = getAddOnPrice(addOnId, count);
    return `${price}€ ${english ? "/ booking" : "/ résa."}`;
  }
  if (addOnId === "chateau_visit") {
    const price = getAddOnPrice(addOnId, count);
    return `${price}€ total${count > 1 ? (english ? " (capped)" : " (plafonné)") : ""}`;
  }
  const a = addOnOptions.find((x) => x.id === addOnId);
  return `${a?.price || 0}€ ${english ? "/ person" : "/ pers."}`;
}

export function ReservationClient({ searchParams }: Props) {
  const lang = searchParams.lang || "fr";
  const isEnglish = lang === "en";
  const success = searchParams.success === "true";
  const canceled = searchParams.canceled === "true";

  const tour = cardStackConfig.cards.find((c) => c.id === Number(searchParams.tour)) ?? cardStackConfig.cards[0];

  const [step, setStep] = useState(success ? 3 : 1);
  const [date, setDate] = useState<Date>();
  const [participants, setParticipants] = useState(2);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dateLocale = isEnglish ? enUS : fr;
  const baseAmount = (tour?.basePrice || 490) * participants;
  const addOnsAmount = selectedAddOns.reduce((sum, id) => sum + getAddOnPrice(id, participants), 0);
  const totalAmount = baseAmount + addOnsAmount;

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
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
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Checkout failed");
      }
      const { url } = await res.json();
      window.location.href = url;
    } catch (err: unknown) {
      setError(isEnglish ? "Unable to redirect to payment. Please try again." : "Impossible de rediriger vers le paiement. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  const t = {
    back: isEnglish ? "Back" : "Retour",
    selectDate: isEnglish ? "Choose your date" : "Choisissez votre date",
    selectDatePlaceholder: isEnglish ? "Select a date" : "Sélectionnez une date",
    participants: isEnglish ? "Number of travelers" : "Nombre de voyageurs",
    pricePerPerson: isEnglish ? "Price per person" : "Prix par personne",
    total: isEnglish ? "Total" : "Total",
    options: isEnglish ? "Options" : "Options",
    proceedPayment: isEnglish ? "Proceed to payment" : "Procéder au paiement",
    continueToOptions: isEnglish ? "Continue" : "Continuer",
    optionsTitle: isEnglish ? "Customize your experience" : "Personnalisez votre expérience",
    optionsSubtitle: isEnglish ? "Optional add-ons to enhance your day" : "Options facultatives pour enrichir votre journée",
    loading: isEnglish ? "Loading..." : "Chargement...",
    step3Title: isEnglish ? "Booking Confirmed!" : "Réservation confirmée !",
    thankYou: isEnglish
      ? "Thank you for your booking! A confirmation email will be sent to you shortly."
      : "Merci pour votre réservation ! Un email de confirmation vous sera envoyé prochainement.",
    backHome: isEnglish ? "Back to home" : "Retour à l'accueil",
    paymentCanceled: isEnglish ? "Payment was canceled. You can try again." : "Le paiement a été annulé. Vous pouvez réessayer.",
    notFound: isEnglish ? "Tour not found" : "Tour non trouvé",
  };

  if (!tour) {
    return (
      <div className="min-h-screen bg-[#F3F0EB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-[#1C1C1C] mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            {t.notFound}
          </h1>
          <Button onClick={() => window.history.back()}>
            <ChevronLeft className="mr-2 h-4 w-4" /> {t.back}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F0EB]">
      {/* Header */}
      <header className="bg-white border-b border-[#EAE4D9]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={`/?lang=${lang}`} className="text-xl text-[#1C1C1C]" style={{ fontFamily: "var(--font-serif)" }}>
            {isEnglish ? "Versailles Horse Riding" : "Versailles à Cheval"}
          </Link>
          <div className="flex items-center gap-4">
            <Link href={`/reservation?tour=${tour.id}&lang=${isEnglish ? "fr" : "en"}`} className="text-sm text-[#8C7B6B] hover:text-[#1C1C1C]">
              {isEnglish ? "FR" : "EN"}
            </Link>
            <Button variant="ghost" onClick={() => window.history.back()}>
              <ChevronLeft className="mr-2 h-4 w-4" /> {t.back}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Progress */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium", step >= s ? "bg-[#8C7B6B] text-white" : "bg-[#EAE4D9] text-[#8C7B6B]")}>
                  {s}
                </div>
                {s < 3 && <div className={cn("w-16 h-0.5 ml-4", step > s ? "bg-[#8C7B6B]" : "bg-[#EAE4D9]")} />}
              </div>
            ))}
          </div>
        </div>

        {/* Canceled notice */}
        {canceled && step === 1 && (
          <div className="mb-6 p-4 bg-amber-50 text-amber-600 rounded-lg text-sm">{t.paymentCanceled}</div>
        )}

        {/* Step 1: Date + Participants */}
        {step === 1 && (
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h1 className="text-2xl text-[#1C1C1C] mb-2" style={{ fontFamily: "var(--font-serif)" }}>
              {isEnglish ? tour.titleEn : tour.title}
            </h1>
            <p className="text-[#8C7B6B] mb-6">{isEnglish ? tour.descriptionEn : tour.description}</p>

            <div className="space-y-6">
              <div>
                <Label className="text-[#1C1C1C] mb-2 block">{t.selectDate}</Label>
                <Popover>
                  <PopoverTrigger
                    className={cn(
                      "inline-flex w-full items-center justify-start gap-2 rounded-md border border-input bg-background px-3 py-2 text-left text-sm font-normal shadow-xs hover:bg-accent hover:text-accent-foreground",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="h-4 w-4" />
                    {date ? format(date, "PPP", { locale: dateLocale }) : <span>{t.selectDatePlaceholder}</span>}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => d < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-[#1C1C1C] mb-2 block">{t.participants}</Label>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" onClick={() => setParticipants(Math.max(1, participants - 1))} disabled={participants <= 1}>-</Button>
                  <span className="text-xl font-medium w-8 text-center">{participants}</span>
                  <Button variant="outline" onClick={() => setParticipants(Math.min(10, participants + 1))} disabled={participants >= 10}>+</Button>
                </div>
              </div>

              <div className="border-t border-[#EAE4D9] pt-4">
                <div className="flex justify-between items-center text-[#8C7B6B]">
                  <span>{t.pricePerPerson} × {participants}</span>
                  <span className="font-medium text-[#1C1C1C]">{baseAmount}€</span>
                </div>
              </div>

              <Button onClick={() => setStep(2)} disabled={!date} className="w-full bg-[#8C7B6B] hover:bg-[#6B5D4F] text-white">
                {t.continueToOptions}
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Options */}
        {step === 2 && (
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl text-[#1C1C1C] mb-1" style={{ fontFamily: "var(--font-serif)" }}>{t.optionsTitle}</h2>
            <p className="text-sm text-[#8C7B6B] mb-6">{t.optionsSubtitle}</p>

            <div className="space-y-3 mb-6">
              {addOnOptions.map((addOn) => (
                <div
                  key={addOn.id}
                  onClick={() => toggleAddOn(addOn.id)}
                  className={cn("flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors", selectedAddOns.includes(addOn.id) ? "border-[#8C7B6B] bg-[#F3F0EB]" : "border-[#EAE4D9] hover:border-[#8C7B6B]")}
                >
                  <Checkbox
                    checked={selectedAddOns.includes(addOn.id)}
                    onClick={(e) => e.stopPropagation()}
                    onCheckedChange={() => toggleAddOn(addOn.id)}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-2">
                      <p className="font-medium text-[#1C1C1C]">{isEnglish ? addOn.nameEn : addOn.name}</p>
                      <p className="text-[#8C7B6B] font-medium whitespace-nowrap">+{getAddOnPriceLabel(addOn.id, participants, isEnglish)}</p>
                    </div>
                    <p className="text-sm text-[#8C7B6B] mt-1">{isEnglish ? addOn.descriptionEn : addOn.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#EAE4D9] pt-4 space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-[#8C7B6B]">{t.pricePerPerson} × {participants}</span>
                <span>{baseAmount}€</span>
              </div>
              {selectedAddOns.length > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#8C7B6B]">{t.options}</span>
                  <span className="text-[#8C7B6B]">+{addOnsAmount}€</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-medium pt-2 border-t border-[#EAE4D9]">
                <span>{t.total}</span>
                <span className="text-[#8C7B6B]">{totalAmount}€</span>
              </div>
            </div>

            {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm mb-4">{error}</div>}

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-none">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button onClick={handleProceedToPayment} disabled={isLoading} className="flex-1 bg-[#8C7B6B] hover:bg-[#6B5D4F] text-white">
                {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t.loading}</>) : t.proceedPayment}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="bg-white rounded-lg p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl text-[#1C1C1C] mb-4" style={{ fontFamily: "var(--font-serif)" }}>{t.step3Title}</h1>
            <p className="text-[#8C7B6B] mb-8">{t.thankYou}</p>
            <Button onClick={() => (window.location.href = `/?lang=${lang}`)}>
              {t.backHome}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
