"use client";

import { zigZagGridConfig, zigZagGridConfigEn } from "@/config";

interface ZigZagGridProps {
  lang?: string;
}

export function ZigZagGrid({ lang = "fr" }: ZigZagGridProps) {
  const isEnglish = lang === "en";
  const config = isEnglish ? zigZagGridConfigEn : zigZagGridConfig;

  return (
    <section className="py-24 bg-[#F3F0EB]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#8C7B6B] tracking-[0.2em] text-xs uppercase mb-4">{config.sectionLabel}</p>
          <h2
            className="text-4xl md:text-5xl text-[#1C1C1C]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {config.sectionTitle}
          </h2>
        </div>

        <div className="space-y-20">
          {config.items.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col ${item.reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-12 items-center`}
            >
              <div className="w-full md:w-1/2">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-[#8C7B6B] tracking-[0.15em] text-xs uppercase mb-3">{item.subtitle}</p>
                <h3
                  className="text-3xl md:text-4xl text-[#1C1C1C] mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {item.title}
                </h3>
                <p className="text-[#8C7B6B] leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
