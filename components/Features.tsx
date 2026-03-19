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
          {banks.map((bank, i) => (
            <div
              key={bank.name}
              style={{
                position: 'absolute',
                width: '22%',
                top: `${[5, 12, 5, 12, 5][i]}%`,
                left: `${[2, 21, 40, 59, 78][i]}%`,
              }}
            >
              <div
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  background: '#F0EDF5',
                  aspectRatio: '3/2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20,
                }}
              >
                <img
                  src={bank.image}
                  alt={bank.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <p style={{ marginTop: 10, fontSize: 14, fontWeight: 500, color: '#1e1b4b' }}>
                {bank.name}
              </p>
            </div>
          ))}

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
