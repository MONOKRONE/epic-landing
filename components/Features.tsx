"use client";

import React, { useRef, useEffect, useState } from "react";

const banks = [
  {
    name: "Chase Bank",
    image: "/svg/bank-chase.svg",
  },
  {
    name: "Bank of America",
    image: "/svg/bank-boa.svg",
  },
  {
    name: "Wells Fargo",
    image: "/svg/bank-wells.svg",
  },
  {
    name: "US Bank",
    image: "/svg/bank-usbank.svg",
  },
  {
    name: "Capital One",
    image: "/svg/bank-capitalone.svg",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection observer for entry animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-12 lg:py-32"
      style={{ background: "#f7f7f8" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div
          className="max-w-2xl mb-8 lg:mb-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            transition:
              "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p
            className="text-sm font-bold uppercase tracking-widest mb-4"
            style={{ color: "var(--teal)" }}
          >
            Network
          </p>
          <h2
            className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mb-4 lg:mb-6"
            style={{ color: "var(--navy)" }}
          >
            One payoff. Every lender. Instant delivery.
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--color-text-light)" }}
          >
            Epic connects dealerships to thousands of lenders through a single
            platform. Send payoffs to any bank, any lender, in seconds — not
            days.
          </p>
        </div>

        {/* Bank Buildings Grid — Desktop: absolute positioned */}
        <div
          className="relative mx-auto hidden lg:block"
          style={{
            maxWidth: 1200,
            minHeight: 700,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(60px)",
            transition:
              "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}
        >
          {/* Bank 1 - top left, large */}
          <div
            className="absolute"
            style={{ top: "0%", left: "0%", width: "34%" }}
          >
            <div
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src={banks[0].image}
                alt={banks[0].name}
                className="w-full h-full object-cover"
              />
            </div>
            <p
              className="mt-3 text-sm font-bold"
              style={{ color: "var(--navy)" }}
            >
              {banks[0].name}
            </p>
          </div>

          {/* Bank 2 - top right, medium, offset down */}
          <div
            className="absolute"
            style={{ top: "8%", right: "0%", width: "26%" }}
          >
            <div
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={banks[1].image}
                alt={banks[1].name}
                className="w-full h-full object-cover"
              />
            </div>
            <p
              className="mt-3 text-sm font-bold"
              style={{ color: "var(--navy)" }}
            >
              {banks[1].name}
            </p>
          </div>

          {/* Bank 3 - bottom left, medium */}
          <div
            className="absolute"
            style={{ top: "55%", left: "5%", width: "22%" }}
          >
            <div
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src={banks[2].image}
                alt={banks[2].name}
                className="w-full h-full object-cover"
              />
            </div>
            <p
              className="mt-3 text-sm font-bold"
              style={{ color: "var(--navy)" }}
            >
              {banks[2].name}
            </p>
          </div>

          {/* Bank 4 - bottom center */}
          <div
            className="absolute"
            style={{ top: "60%", left: "38%", width: "21%" }}
          >
            <div
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={banks[3].image}
                alt={banks[3].name}
                className="w-full h-full object-cover"
              />
            </div>
            <p
              className="mt-3 text-sm font-bold"
              style={{ color: "var(--navy)" }}
            >
              {banks[3].name}
            </p>
          </div>

          {/* Bank 5 - bottom right, small */}
          <div
            className="absolute"
            style={{ top: "50%", right: "2%", width: "19%" }}
          >
            <div
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{ aspectRatio: "1/1" }}
            >
              <img
                src={banks[4].image}
                alt={banks[4].name}
                className="w-full h-full object-cover"
              />
            </div>
            <p
              className="mt-3 text-sm font-bold"
              style={{ color: "var(--navy)" }}
            >
              {banks[4].name}
            </p>
          </div>

        </div>

        {/* Mobile: simple grid */}
        <div className="lg:hidden grid grid-cols-2 gap-4 mt-8">
          {banks.map((bank, i) => (
            <div
              key={bank.name}
              className="rounded-xl overflow-hidden shadow-lg"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
            >
              <img
                src={bank.image}
                alt={bank.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-3" style={{ background: "white" }}>
                <p className="text-xs font-bold" style={{ color: "var(--navy)" }}>
                  {bank.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
