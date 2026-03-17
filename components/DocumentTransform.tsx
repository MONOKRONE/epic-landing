"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Network, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function DocumentTransform() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<HTMLDivElement>(null);
  const docLinesRef = useRef<HTMLDivElement>(null);
  const docHeaderRef = useRef<HTMLDivElement>(null);
  const docBodyRef = useRef<HTMLDivElement>(null);
  const docFooterRef = useRef<HTMLDivElement>(null);
  const callout1Ref = useRef<HTMLDivElement>(null);
  const callout2Ref = useRef<HTMLDivElement>(null);
  const callout3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = sectionRef.current;
      if (!trigger) return;

      const stBase = { trigger, scrub: 1 };
      const pct = (s: number, e: number) => ({
        ...stBase,
        start: `${s}% top`,
        end: `${e}% top`,
      });

      // Document morph: purple bill shape → white official document
      gsap.fromTo(
        docRef.current,
        {
          width: "250px",
          height: "320px",
          backgroundColor: "#1e1b4b",
          borderRadius: "16px",
          boxShadow: "0px 20px 40px rgba(30, 27, 75, 0.4)",
        },
        {
          width: "420px",
          height: "580px",
          backgroundColor: "#ffffff",
          borderRadius: "4px",
          boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.15)",
          scrollTrigger: pct(5, 30),
        }
      );

      // Bill decorative lines fade out as it morphs
      gsap.fromTo(
        docLinesRef.current,
        { opacity: 1 },
        { opacity: 0, scrollTrigger: pct(5, 15) }
      );

      // Document header appears
      gsap.fromTo(
        docHeaderRef.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(25, 35) }
      );

      // Document body appears
      gsap.fromTo(
        docBodyRef.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(35, 45) }
      );

      // Document footer appears
      gsap.fromTo(
        docFooterRef.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(50, 60) }
      );

      // Callout cards appear staggered from right
      gsap.fromTo(
        callout1Ref.current,
        { opacity: 0, y: 40, x: 40 },
        { opacity: 1, y: 0, x: 0, scrollTrigger: pct(25, 35) }
      );

      gsap.fromTo(
        callout2Ref.current,
        { opacity: 0, y: 40, x: 40 },
        { opacity: 1, y: 0, x: 0, scrollTrigger: pct(40, 50) }
      );

      gsap.fromTo(
        callout3Ref.current,
        { opacity: 0, y: 40, x: 40 },
        { opacity: 1, y: 0, x: 0, scrollTrigger: pct(55, 65) }
      );

      // Floating animations for callout cards (infinite, decorative)
      gsap.to(callout1Ref.current, {
        y: -10,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(callout2Ref.current, {
        y: -12,
        duration: 3.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });

      gsap.to(callout3Ref.current, {
        y: -8,
        duration: 4.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "500vh", zIndex: 51 }}
    >
      <div
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ background: "var(--color-bg)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="flex items-center justify-center w-full gap-8">
            {/* ========== LEFT SIDE: DOCUMENT ========== */}
            <div className="w-1/2 flex justify-center items-center">
              <div
                ref={docRef}
                className="relative flex flex-col items-center justify-center overflow-hidden p-8"
              >
                {/* Bill decorative lines (visible initially, fades out) */}
                <div
                  ref={docLinesRef}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <div
                    className="w-16 h-16 rounded-full mb-3 flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                  >
                    <span className="text-white/30 text-2xl font-bold font-serif">
                      $
                    </span>
                  </div>
                  <div className="w-24 h-1.5 bg-white/20 rounded-full mb-2" />
                  <div className="w-16 h-1.5 bg-white/20 rounded-full" />
                </div>

                {/* Document Header — appears after morph */}
                <div
                  ref={docHeaderRef}
                  className="absolute top-8 left-8 right-8 flex flex-col items-center border-b-2 border-slate-200 pb-6"
                  style={{ opacity: 0 }}
                >
                  <ShieldCheck
                    className="w-12 h-12 mb-2"
                    style={{ color: "#20A472" }}
                  />
                  <h2
                    className="text-2xl font-black tracking-widest uppercase text-center"
                    style={{ color: "var(--navy)" }}
                  >
                    Lien Release
                  </h2>
                  <p className="text-xs text-slate-500 font-mono mt-1">
                    DOC ID: EP-48291-2026
                  </p>
                </div>

                {/* Document Body — appears after header */}
                <div
                  ref={docBodyRef}
                  className="absolute top-48 left-8 right-8 flex flex-col gap-4"
                  style={{ opacity: 0 }}
                >
                  {[
                    { label: "Dealership", value: "Elk Grove Toyota" },
                    { label: "Lender", value: "Chase Auto Finance" },
                    { label: "Vehicle", value: "2024 Honda Accord" },
                    {
                      label: "Payoff Amount",
                      value: "$24,850.00",
                      mono: true,
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between items-end border-b border-slate-100 pb-2"
                    >
                      <span className="text-xs font-bold text-slate-400 uppercase">
                        {row.label}
                      </span>
                      <span
                        className={`text-sm font-bold ${row.mono ? "font-mono" : ""}`}
                        style={{ color: "var(--navy)" }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                  <div
                    className="mt-4 p-4 rounded-lg"
                    style={{
                      background: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--navy)" }}
                    >
                      This document certifies the successful payoff and lien
                      release for the specified vehicle loan.
                    </p>
                  </div>
                </div>

                {/* Document Footer — appears last */}
                <div
                  ref={docFooterRef}
                  className="absolute bottom-8 left-8 right-8 pt-6 border-t-2 border-slate-200 flex justify-between items-end"
                  style={{ opacity: 0 }}
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase mb-2">
                      Authorized Signature
                    </span>
                    <div
                      className="font-serif text-2xl italic pr-8 border-b border-slate-300"
                      style={{ color: "var(--navy)" }}
                    >
                      James A. Smith
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex gap-0.5">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-8 ${i % 3 === 0 ? "w-1" : i % 2 === 0 ? "w-0.5" : "w-1.5"}`}
                          style={{ background: "var(--navy)" }}
                        />
                      ))}
                    </div>
                    <span className="text-[8px] font-mono text-slate-500 tracking-widest">
                      04928471002
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ========== RIGHT SIDE: CALLOUT CARDS ========== */}
            <div className="w-1/2 flex flex-col justify-center gap-8 pl-8">
              {/* Callout 1: Lender Network */}
              <div ref={callout1Ref} style={{ opacity: 0 }}>
                <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-slate-100 w-80">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: "#f0fdf4", color: "#20A472" }}
                    >
                      <Network className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                        Lender Network
                      </p>
                      <p
                        className="text-xl font-black"
                        style={{ color: "var(--navy)" }}
                      >
                        2,500+ Lenders
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-2 flex-1 rounded-full overflow-hidden"
                        style={{ background: "#dcfce7" }}
                      >
                        <div
                          className="h-full w-full rounded-full"
                          style={{ background: "#20A472" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Callout 2: Processing Speed */}
              <div ref={callout2Ref} style={{ opacity: 0 }}>
                <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-slate-100 w-72 ml-16">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                        Processing Speed
                      </p>
                      <p
                        className="text-2xl font-black"
                        style={{ color: "var(--navy)" }}
                      >
                        &lt; 2 Seconds
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
                      <Zap className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full animate-pulse"
                      style={{ background: "#20A472", width: "85%" }}
                    />
                  </div>
                </div>
              </div>

              {/* Callout 3: Trust & Accuracy */}
              <div ref={callout3Ref} style={{ opacity: 0 }}>
                <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-slate-100 w-80 -ml-4">
                  <div className="flex items-center gap-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: "#f0fdf4", color: "#20A472" }}
                    >
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                        Trust & Accuracy
                      </p>
                      <p
                        className="text-base font-bold"
                        style={{ color: "var(--navy)" }}
                      >
                        99.99% Accuracy Rate
                      </p>
                      <p className="text-xs text-slate-500 mt-1 font-medium">
                        Zero payoff errors guaranteed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
