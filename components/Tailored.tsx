"use client";
import { useRef, useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    title: "Instant lender connections",
    description:
      "Connect to 2,500+ lenders through a single integration. No more phone calls, faxes, or manual lookups.",
  },
  {
    title: "Same-day lien releases",
    description:
      "Automate the entire lien release process. What used to take weeks now happens in hours.",
  },
  {
    title: "Accuracy guaranteed",
    description:
      "Eliminate payoff errors with real-time validation. Every dollar goes to the right place, every time.",
  },
  {
    title: "Scale effortlessly",
    description:
      "Whether you process 10 payoffs or 10,000 per month, Epic scales with your business.",
  },
];

/* ── Document card components ─────────────────────────────────── */

function DocLienRelease() {
  return (
    <>
      <div
        className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: "#20A472" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
        Official Document
      </p>
      <h3 className="text-2xl font-black mt-1" style={{ color: "#1e1b4b" }}>
        Lien Release
      </h3>
      <p className="text-xs font-mono mt-1" style={{ color: "#94a3b8" }}>
        DOC-EP-48291
      </p>
      <div className="h-px my-5" style={{ background: "#f1f5f9" }} />
      {[
        ["Dealership", "Elk Grove Toyota"],
        ["Lender", "Chase Auto Finance"],
        ["Vehicle", "2024 Honda Accord"],
        ["Payoff", "$24,850.00"],
      ].map(([label, value]) => (
        <div key={label} className="flex justify-between items-end py-2 border-b" style={{ borderColor: "#f1f5f9" }}>
          <span className="text-[10px] font-bold uppercase" style={{ color: "#94a3b8" }}>{label}</span>
          <span className="text-sm font-bold" style={{ color: "#1e1b4b" }}>{value}</span>
        </div>
      ))}
      <div className="mt-6 inline-block px-4 py-2 rounded-full text-xs font-bold" style={{ background: "#20A472", color: "white" }}>
        RELEASED — March 15, 2026
      </div>
    </>
  );
}

function DocTitleCertificate() {
  return (
    <>
      <div
        className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center"
        style={{ border: "2px solid #1e1b4b" }}
      >
        <span className="text-[8px] font-black tracking-wider" style={{ color: "#1e1b4b" }}>SEAL</span>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
        State of California
      </p>
      <h3 className="text-2xl font-black mt-1" style={{ color: "#1e1b4b" }}>
        Title Certificate
      </h3>
      <p className="text-xs font-mono mt-1" style={{ color: "#94a3b8" }}>
        TITLE-CA-2026-07841
      </p>
      <div className="h-px my-5" style={{ background: "#f1f5f9" }} />
      {[
        ["Owner", "Elk Grove Toyota"],
        ["VIN", "1HGCV1F34R...8472"],
        ["Make/Model", "2024 Honda Accord"],
        ["Status", "Clear Title"],
      ].map(([label, value]) => (
        <div key={label} className="flex justify-between items-end py-2 border-b" style={{ borderColor: "#f1f5f9" }}>
          <span className="text-[10px] font-bold uppercase" style={{ color: "#94a3b8" }}>{label}</span>
          <span className="text-sm font-bold" style={{ color: "#1e1b4b" }}>{value}</span>
        </div>
      ))}
      <div className="mt-6 inline-block px-4 py-2 rounded-full text-xs font-bold" style={{ background: "#1e1b4b", color: "white" }}>
        TITLE TRANSFERRED
      </div>
    </>
  );
}

function DocPayoffConfirmation() {
  return (
    <>
      <div
        className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: "#3b82f6" }}
      >
        <span className="text-white font-bold text-lg">$</span>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
        Payment Verified
      </p>
      <h3 className="text-2xl font-black mt-1" style={{ color: "#1e1b4b" }}>
        Payoff Confirmation
      </h3>
      <p className="text-xs font-mono mt-1" style={{ color: "#94a3b8" }}>
        PAY-2026-03-15-001
      </p>
      <div className="h-px my-5" style={{ background: "#f1f5f9" }} />
      {[
        ["From", "Elk Grove Toyota"],
        ["To", "Chase Auto Finance"],
        ["Amount", "$24,850.00"],
        ["Method", "ACH Same-Day"],
      ].map(([label, value]) => (
        <div key={label} className="flex justify-between items-end py-2 border-b" style={{ borderColor: "#f1f5f9" }}>
          <span className="text-[10px] font-bold uppercase" style={{ color: "#94a3b8" }}>{label}</span>
          <span className="text-sm font-bold" style={{ color: "#1e1b4b" }}>{value}</span>
        </div>
      ))}
      <div className="mt-6 inline-block px-4 py-2 rounded-full text-xs font-bold" style={{ background: "#20A472", color: "white" }}>
        CONFIRMED — Funds Delivered
      </div>
    </>
  );
}

function DocLenderDashboard() {
  const bars = [
    { label: "National Banks", pct: 95 },
    { label: "Credit Unions", pct: 87 },
    { label: "Captive Lenders", pct: 92 },
  ];
  return (
    <>
      <div
        className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: "#7c3aed" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="5" r="2" />
          <circle cx="19" cy="12" r="2" />
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
          <line x1="12" y1="7" x2="12" y2="10" />
          <line x1="14" y1="12" x2="17" y2="12" />
          <line x1="7" y1="12" x2="10" y2="12" />
          <line x1="12" y1="14" x2="12" y2="17" />
        </svg>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
        Epic Network
      </p>
      <h3 className="text-2xl font-black mt-1" style={{ color: "#1e1b4b" }}>
        Connected Lenders
      </h3>
      <p className="text-xs font-mono mt-1" style={{ color: "#94a3b8" }}>
        2,500+ Active
      </p>
      <div className="h-px my-5" style={{ background: "#f1f5f9" }} />
      <div className="space-y-5">
        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="flex justify-between mb-1.5">
              <span className="text-xs font-bold" style={{ color: "#1e1b4b" }}>{bar.label}</span>
              <span className="text-xs font-bold" style={{ color: "#20A472" }}>{bar.pct}%</span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#f1f5f9" }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${bar.pct}%`, background: "#20A472" }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 inline-block px-4 py-2 rounded-full text-xs font-bold" style={{ background: "#7c3aed", color: "white" }}>
        ALL LENDERS CONNECTED
      </div>
    </>
  );
}

const docComponents = [DocLienRelease, DocTitleCertificate, DocPayoffConfirmation, DocLenderDashboard];

/* ── Main component ───────────────────────────────────────────── */

export default function Tailored() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const idx = Math.min(
          Math.floor(self.progress * items.length),
          items.length - 1
        );
        if (idx >= 0) setActiveIndex(idx);
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      id="tailored"
      ref={sectionRef}
      className="relative h-[300vh] lg:h-[500vh]"
      style={{ zIndex: 51, position: "relative" }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: "var(--navy)", zIndex: 51 }}
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-10 h-full flex items-center">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center w-full">

            {/* LEFT: Document cards */}
            <div className="flex justify-center items-center mx-auto lg:mx-0 mt-6 lg:mt-0">
              <div className="relative w-full max-w-[280px] lg:max-w-[400px]" style={{ aspectRatio: "3/4" }}>
                {docComponents.map((DocComponent, i) => (
                  <div
                    key={i}
                    className="absolute inset-0"
                    style={{
                      background: "white",
                      borderRadius: 12,
                      padding: 32,
                      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
                      opacity: i === activeIndex ? 1 : 0,
                      transition: "opacity 0.5s ease",
                    }}
                  >
                    <DocComponent />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Title + accumulating items */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4">
                The complete loan payoff platform
              </h2>

              <div className="mt-12 space-y-0">
                {items.map((item, i) => {
                  const hasAppeared = i <= activeIndex;
                  const isActive = i === activeIndex;

                  return (
                    <div
                      key={i}
                      className="border-t border-white/10 overflow-hidden relative"
                      style={{
                        maxHeight: hasAppeared ? 200 : 0,
                        opacity: hasAppeared ? (isActive ? 1 : 0.4) : 0,
                        paddingTop: hasAppeared ? 24 : 0,
                        paddingBottom: hasAppeared ? 24 : 0,
                        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          height: 2,
                          width: "100%",
                          background: "var(--teal)",
                          opacity: isActive ? 1 : 0.2,
                          transition: "opacity 0.4s ease",
                        }}
                      />
                      <h3 className="text-lg font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
