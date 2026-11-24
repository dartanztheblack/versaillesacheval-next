"use client";

import { useId, useRef } from "react";
import type { PointerEvent } from "react";
import { HorseMark, LineIcon, HORSE_HEAD_PATH } from "@/components/Ornaments";

interface InvitationCardProps {
  name: string;
  dateLabel: string | null;
  participants: number;
  options: string[];
  /** Date, prénom et téléphone renseignés : le cachet se pose. */
  complete?: boolean;
  isEnglish: boolean;
}

/**
 * Le « laissez-passer » qui se remplit pendant la réservation.
 * Carte en relief : elle s'incline sous le curseur (et flotte doucement sur mobile), avec un reflet doré.
 */
export function InvitationCard({ name, dateLabel, participants, options, complete = false, isEnglish }: InvitationCardProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  // identifiant unique : la carte existe en deux exemplaires (ordinateur / téléphone)
  const waxId = `wax-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = sceneRef.current;
    if (!el || e.pointerType === "touch") return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.classList.add("is-tilting");
    el.style.setProperty("--ry", `${(px - 0.5) * 22}deg`);
    el.style.setProperty("--rx", `${(0.5 - py) * 16}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const handleLeave = () => {
    const el = sceneRef.current;
    if (!el) return;
    el.classList.remove("is-tilting");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };

  const trimmedName = name.trim();
  const riders = Array.from({ length: Math.min(participants, 10) });

  return (
    <div ref={sceneRef} className="invite-scene" onPointerMove={handleMove} onPointerLeave={handleLeave}>
      <div className={`invite-card${complete ? " is-complete" : ""}`} role="img" aria-label={isEnglish ? "Preview of your royal pass" : "Aperçu de votre laissez-passer royal"}>
        <img className="invite-photo" src="/cavaliers-parc-automne.webp" alt="" />
        <div className="invite-shade" />
        <div className="invite-sheen" />

        <div className="invite-content" aria-hidden="true">
          <div className="invite-top">
            <span className="invite-brand">
              <HorseMark size={18} color="#E9D8B4" />
              Versailles à Cheval
            </span>
            <span className="invite-kind">{isEnglish ? "Royal pass" : "Laissez-passer royal"}</span>
          </div>

          <div className="invite-name-block">
            <span className="invite-label">{isEnglish ? "In the name of" : "Au nom de"}</span>
            <span className={`invite-name${trimmedName ? "" : " is-empty"}`}>
              {trimmedName
                ? Array.from(trimmedName).map((char, i) => (
                    // clé = position : seules les nouvelles lettres s'animent
                    <span key={i} className="invite-letter">
                      {char === " " ? "\u00a0" : char}
                    </span>
                  ))
                : isEnglish ? "Your first name" : "Votre prénom"}
              <span className="invite-caret" />
            </span>
          </div>

          <div className="invite-fields">
            <div>
              <span className="invite-label">Date</span>
              <span key={dateLabel ?? "none"} className={`invite-value invite-pop${dateLabel ? "" : " is-empty"}`}>
                {dateLabel ?? (isEnglish ? "To be chosen" : "À choisir")}
              </span>
            </div>
            <div>
              <span className="invite-label">{isEnglish ? "Riders" : "Cavaliers"}</span>
              <span key={participants} className="invite-value invite-pop invite-riders">
                {riders.map((_, i) => (
                  <LineIcon key={i} name="horseshoe" size={15} color="#E9D8B4" style={{ animationDelay: `${i * 50}ms` }} />
                ))}
              </span>
            </div>
            <div>
              <span className="invite-label">{isEnglish ? "Ride" : "Balade"}</span>
              <span className="invite-value">2 h</span>
            </div>
          </div>

          {complete && (
            <svg className="invite-seal" viewBox="0 0 64 64" aria-hidden="true">
              <defs>
                <radialGradient id={waxId} cx="38%" cy="32%" r="70%">
                  <stop offset="0" stopColor="#E3C27A" />
                  <stop offset="0.55" stopColor="#B08D57" />
                  <stop offset="1" stopColor="#7A5A26" />
                </radialGradient>
              </defs>
              <path
                fill={`url(#${waxId})`}
                d="M32 2l4.2 3.600 5.400-1.300 2.700 4.800 5.400 1 .6 5.500 4.600 3-1.600 5.300 3.300 4.400-3.300 4.400 1.600 5.300-4.600 3-.6 5.500-5.400 1-2.700 4.800-5.400-1.300L32 62l-4.200-3.600-5.400 1.300-2.700-4.800-5.400-1-.6-5.500-4.600-3 1.600-5.300L7.400 31.700l3.300-4.400-1.600-5.300 4.600-3 .6-5.500 5.400-1 2.700-4.800 5.400 1.300z"
              />
              <circle cx="32" cy="32" r="19" fill="none" stroke="#6B4E1F" strokeOpacity="0.55" strokeWidth="1.2" />
              <g transform="translate(19.5 18.5) scale(0.42)">
                <path d={HORSE_HEAD_PATH} fill="#5E4419" fillOpacity="0.85" />
              </g>
            </svg>
          )}

          {options.length > 0 && (
            <div className="invite-options">
              {options.map((option) => (
                <span key={option} className="invite-chip invite-pop">
                  {option}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
