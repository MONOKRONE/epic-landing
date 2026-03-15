"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CheckCircle2,
  CreditCard,
  BarChart3,
  Car,
  ShoppingBag,
  Landmark,
  Building2,
  ShieldCheck,
  Network,
  Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Phase 1 & 2 refs
  const indicatorRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const phase1UIRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const b0Ref = useRef<HTMLDivElement>(null);
  const b0ContentRef = useRef<HTMLDivElement>(null);
  const b1Ref = useRef<HTMLDivElement>(null);
  const b2Ref = useRef<HTMLDivElement>(null);
  const b3Ref = useRef<HTMLDivElement>(null);
  const b4Ref = useRef<HTMLDivElement>(null);
  const banksRef = useRef<HTMLDivElement>(null);

  // Phase 3 ref
  const screenFillRef = useRef<HTMLDivElement>(null);

  // Phase 4 refs
  const phase4Ref = useRef<HTMLDivElement>(null);
  const docRef = useRef<HTMLDivElement>(null);
  const docLinesRef = useRef<HTMLDivElement>(null);
  const docHeaderRef = useRef<HTMLDivElement>(null);
  const docBodyRef = useRef<HTMLDivElement>(null);
  const docFooterRef = useRef<HTMLDivElement>(null);
  const callout1Ref = useRef<HTMLDivElement>(null);
  const callout1InnerRef = useRef<HTMLDivElement>(null);
  const callout2Ref = useRef<HTMLDivElement>(null);
  const callout2InnerRef = useRef<HTMLDivElement>(null);
  const callout3Ref = useRef<HTMLDivElement>(null);
  const callout3InnerRef = useRef<HTMLDivElement>(null);
  const processingBarRef = useRef<HTMLDivElement>(null);

  // Phase 5 refs
  const phase5Ref = useRef<HTMLDivElement>(null);
  const phase5StatsRef = useRef<HTMLDivElement>(null);
  const card0Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  // Phase 6 refs
  const phase6Ref = useRef<HTMLDivElement>(null);
  const phase6CardRef = useRef<HTMLDivElement>(null);
  const phase6ContentRef = useRef<HTMLDivElement>(null);
  const phase6QuoteRef = useRef<HTMLDivElement>(null);
  const phase6VideoRef = useRef<HTMLDivElement>(null);

  // Phase 7 refs
  const phase7Ref = useRef<HTMLDivElement>(null);
  const phase7TextRef = useRef<HTMLDivElement>(null);
  const phase7PhoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = containerRef.current;
      if (!trigger) return;

      const stBase = {
        trigger,
        scrub: 1,
      };

      // Helper: percentage-based start/end
      const pct = (s: number, e: number) => ({
        ...stBase,
        start: `${s}% top`,
        end: `${e}% top`,
      });

      // ═══════════════════════════════════════════════════
      // PHASE 1 & 2: 3D Scene (0 → 20%)
      // ═══════════════════════════════════════════════════

      // Scene 3D rotation
      gsap.fromTo(
        sceneRef.current,
        { rotateX: 20, rotateY: -15 },
        { rotateX: 0, rotateY: 0, scrollTrigger: pct(0, 14) }
      );

      // Scene opacity out
      gsap.fromTo(
        sceneRef.current,
        { opacity: 1 },
        { opacity: 0, immediateRender: false, scrollTrigger: pct(20, 21) }
      );

      // Phase 1 UI fade out + move up
      gsap.fromTo(
        phase1UIRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -50, scrollTrigger: pct(0, 3) }
      );

      // Band overlay fade out
      gsap.fromTo(
        bandRef.current,
        { opacity: 1 },
        { opacity: 0, scrollTrigger: pct(3, 6) }
      );

      // Scroll indicator fade out
      gsap.fromTo(
        indicatorRef.current,
        { opacity: 1 },
        { opacity: 0, scrollTrigger: pct(0, 3) }
      );

      // Center Bill (b0)
      gsap.fromTo(
        b0Ref.current,
        { x: 0, y: 0, z: 0, scale: 1 },
        {
          x: 0,
          y: 600,
          z: 800,
          scale: 50,
          scrollTrigger: pct(6, 20),
        }
      );

      // b0 content opacity
      gsap.fromTo(
        b0ContentRef.current,
        { opacity: 1 },
        { opacity: 0, scrollTrigger: pct(14, 16) }
      );

      // Other bills opacity (fade out)
      const otherBills = [b1Ref.current, b2Ref.current, b3Ref.current, b4Ref.current];
      otherBills.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 1 },
          { opacity: 0, scrollTrigger: pct(11, 14) }
        );
      });

      // Bill 1
      gsap.fromTo(
        b1Ref.current,
        { x: 0, y: 0, z: -10, rotateZ: 0 },
        {
          x: -300,
          y: 0,
          z: 0,
          rotateZ: -20,
          scrollTrigger: pct(6, 17),
        }
      );

      // Bill 2
      gsap.fromTo(
        b2Ref.current,
        { x: 0, y: 0, z: -20, rotateZ: 0 },
        {
          x: 300,
          y: 0,
          z: 0,
          rotateZ: 20,
          scrollTrigger: pct(6, 17),
        }
      );

      // Bill 3
      gsap.fromTo(
        b3Ref.current,
        { x: 0, y: 0, z: -30, rotateZ: 0 },
        {
          x: -600,
          y: -100,
          z: -50,
          rotateZ: -40,
          scrollTrigger: pct(6, 17),
        }
      );

      // Bill 4
      gsap.fromTo(
        b4Ref.current,
        { x: 0, y: 0, z: -40, rotateZ: 0 },
        {
          x: 600,
          y: -100,
          z: -50,
          rotateZ: 40,
          scrollTrigger: pct(6, 17),
        }
      );

      // Banks
      gsap.set(banksRef.current, { opacity: 0, y: 50 });
      gsap.fromTo(
        banksRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, scrollTrigger: pct(9, 11) }
      );
      gsap.fromTo(
        banksRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: 100, immediateRender: false, scrollTrigger: pct(14, 17) }
      );

      // ═══════════════════════════════════════════════════
      // PHASE 3: Screen flash transition (19 → 26%)
      // ═══════════════════════════════════════════════════
      gsap.set(screenFillRef.current, { opacity: 0 });
      gsap.fromTo(
        screenFillRef.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(19, 21) }
      );
      gsap.fromTo(
        screenFillRef.current,
        { opacity: 1 },
        { opacity: 0, immediateRender: false, scrollTrigger: pct(24, 26) }
      );

      // ═══════════════════════════════════════════════════
      // PHASE 4: Document Transformation (24 → 50%)
      // ═══════════════════════════════════════════════════
      gsap.set(phase4Ref.current, { opacity: 0 });
      gsap.fromTo(
        phase4Ref.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(24, 26) }
      );
      gsap.fromTo(
        phase4Ref.current,
        { opacity: 1 },
        { opacity: 0, immediateRender: false, scrollTrigger: pct(48, 50) }
      );

      // Document slide in from left
      gsap.fromTo(
        docRef.current,
        { x: -800 },
        { x: 0, scrollTrigger: pct(24, 26) }
      );

      // Document morph: bill → official document
      gsap.fromTo(
        docRef.current,
        {
          width: "280px",
          height: "360px",
          backgroundColor: "#2a206a",
          borderRadius: "16px",
          boxShadow: "0px 20px 40px rgba(42, 32, 106, 0.4)",
        },
        {
          width: "480px",
          height: "680px",
          backgroundColor: "#ffffff",
          borderRadius: "4px",
          boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.15)",
          scrollTrigger: pct(26, 32),
        }
      );

      // Bill lines fade out
      gsap.fromTo(
        docLinesRef.current,
        { opacity: 1 },
        { opacity: 0, scrollTrigger: pct(26, 29) }
      );

      // Document sections appear sequentially
      gsap.set(docHeaderRef.current, { opacity: 0 });
      gsap.fromTo(
        docHeaderRef.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(32, 35) }
      );

      gsap.set(docBodyRef.current, { opacity: 0 });
      gsap.fromTo(
        docBodyRef.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(38, 41) }
      );

      gsap.set(docFooterRef.current, { opacity: 0 });
      gsap.fromTo(
        docFooterRef.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(43, 46) }
      );

      // Callout cards
      gsap.set(callout1Ref.current, { opacity: 0, y: 40, x: 40 });
      gsap.fromTo(
        callout1Ref.current,
        { opacity: 0, y: 40, x: 40 },
        { opacity: 1, y: 0, x: 0, scrollTrigger: pct(32, 35) }
      );

      gsap.set(callout2Ref.current, { opacity: 0, y: 40, x: 40 });
      gsap.fromTo(
        callout2Ref.current,
        { opacity: 0, y: 40, x: 40 },
        { opacity: 1, y: 0, x: 0, scrollTrigger: pct(38, 41) }
      );

      gsap.set(callout3Ref.current, { opacity: 0, y: 40, x: 40 });
      gsap.fromTo(
        callout3Ref.current,
        { opacity: 0, y: 40, x: 40 },
        { opacity: 1, y: 0, x: 0, scrollTrigger: pct(43, 46) }
      );

      // Floating animations for callout cards (non-scroll, infinite)
      gsap.to(callout1InnerRef.current, {
        y: -10,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(callout2InnerRef.current, {
        y: -12,
        duration: 3.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });

      gsap.to(callout3InnerRef.current, {
        y: -8,
        duration: 4.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });

      // Processing speed bar animation
      gsap.fromTo(
        processingBarRef.current,
        { width: "0%" },
        {
          width: "100%",
          duration: 2,
          ease: "expo.out",
          repeat: -1,
        }
      );

      // ═══════════════════════════════════════════════════
      // PHASE 5: Stats Section (50 → 65%)
      // ═══════════════════════════════════════════════════
      gsap.set(phase5Ref.current, { opacity: 0 });
      gsap.fromTo(
        phase5Ref.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(50, 52) }
      );
      gsap.fromTo(
        phase5Ref.current,
        { opacity: 1 },
        { opacity: 0, immediateRender: false, scrollTrigger: pct(63, 65) }
      );

      // Stats text
      gsap.set(phase5StatsRef.current, { opacity: 0, y: 60 });
      gsap.fromTo(
        phase5StatsRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, scrollTrigger: pct(52, 56) }
      );

      // Logo cards stagger
      const cards = [card0Ref.current, card1Ref.current, card2Ref.current, card3Ref.current];
      cards.forEach((card, i) => {
        const start = 50 + i * 2;
        const end = start + 3;
        gsap.set(card, { opacity: 0, y: 40 });
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, scrollTrigger: pct(start, end) }
        );
      });

      // ═══════════════════════════════════════════════════
      // PHASE 6: Testimonials (65 → 82%)
      // ═══════════════════════════════════════════════════
      gsap.set(phase6Ref.current, { opacity: 0 });
      gsap.fromTo(
        phase6Ref.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(65, 67) }
      );
      gsap.fromTo(
        phase6Ref.current,
        { opacity: 1 },
        { opacity: 0, immediateRender: false, scrollTrigger: pct(80, 82) }
      );

      // Card scale
      gsap.fromTo(
        phase6CardRef.current,
        { scale: 0.8 },
        { scale: 1, scrollTrigger: pct(65, 70) }
      );

      // Content, quote, video
      gsap.set(phase6ContentRef.current, { opacity: 0 });
      gsap.fromTo(
        phase6ContentRef.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(70, 73) }
      );

      gsap.set(phase6QuoteRef.current, { opacity: 0 });
      gsap.fromTo(
        phase6QuoteRef.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(73, 76) }
      );

      gsap.set(phase6VideoRef.current, { opacity: 0 });
      gsap.fromTo(
        phase6VideoRef.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(76, 79) }
      );

      // ═══════════════════════════════════════════════════
      // PHASE 7: Final CTA (82 → 100%)
      // ═══════════════════════════════════════════════════
      gsap.set(phase7Ref.current, { opacity: 0 });
      gsap.fromTo(
        phase7Ref.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(82, 85) }
      );
      gsap.fromTo(
        phase7Ref.current,
        { opacity: 1 },
        { opacity: 0, immediateRender: false, scrollTrigger: pct(96, 100) }
      );

      // Text slide up
      gsap.fromTo(
        phase7TextRef.current,
        { y: 80 },
        { y: 0, scrollTrigger: pct(82, 88) }
      );

      // Phone slide in
      gsap.set(phase7PhoneRef.current, { x: 100, opacity: 0 });
      gsap.fromTo(
        phase7PhoneRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, scrollTrigger: pct(85, 92) }
      );
    }, containerRef);

    return () => {
      ctx.revert();
      // ctx.revert() already kills ScrollTriggers created within this context
      // Do NOT call ScrollTrigger.getAll().kill() — it destroys other components' triggers
    };
  }, []);

  return (
    <div ref={containerRef} className="h-[1400vh] relative">
      {/* Sticky Viewport */}
      <div
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{
          perspective: "2000px",
          background: "var(--color-bg)",
          willChange: "transform",
        }}
      >
        {/* Scroll Indicator */}
        <div
          ref={indicatorRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50"
        >
          <span
            className="text-sm font-medium tracking-widest uppercase"
            style={{ color: "var(--color-text-light)" }}
          >
            Scroll down
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-slate-400 to-transparent" />
        </div>

        {/* ══════ PHASE 1 & 2: 3D SCENE ══════ */}
        <div
          ref={sceneRef}
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform, opacity",
          }}
          className="relative w-[1000px] h-[800px]"
        >
          {/* Phase 1 UI Elements */}
          <div
            ref={phase1UIRef}
            style={{ transform: "translateZ(50px)" }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Dealer Image */}
            <div className="absolute top-1/2 left-1/2 w-[320px] h-[420px] bg-slate-200 rounded-2xl shadow-2xl overflow-hidden border-4 border-white -translate-x-1/2 -translate-y-1/2 ml-[80px] mt-[-60px]">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Professional"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <p className="text-slate-800 font-bold text-sm bg-white/90 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
                  Customer Image
                </p>
              </div>
            </div>

            {/* Notification Card */}
            <div className="absolute top-[25%] left-[10%] bg-white/95 backdrop-blur-md p-4 pr-8 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-100">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "var(--color-primary-50)",
                  color: "var(--teal)",
                }}
              >
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                  Notification
                </p>
                <p
                  className="text-sm font-bold"
                  style={{ color: "var(--navy)" }}
                >
                  Card Activated
                </p>
              </div>
            </div>

            {/* Ledger */}
            <div className="absolute bottom-[25%] left-[5%] bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-2xl w-72 border border-slate-100">
              <h3
                className="text-xs font-bold mb-4 flex items-center gap-2"
                style={{ color: "var(--navy)" }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "var(--teal)" }}
                />
                Recent Transactions
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                  <div>
                    <p
                      className="text-xs font-bold"
                      style={{ color: "var(--navy)" }}
                    >
                      DoorDash Order
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Card ending ...4920
                    </p>
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-md"
                    style={{
                      color: "var(--teal)",
                      background: "var(--color-primary-50)",
                    }}
                  >
                    +$142.50
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-xs font-bold"
                      style={{ color: "var(--navy)" }}
                    >
                      Square Payment
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Card ending ...1184
                    </p>
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-md"
                    style={{
                      color: "var(--teal)",
                      background: "var(--color-primary-50)",
                    }}
                  >
                    +$98.00
                  </span>
                </div>
              </div>
            </div>

            {/* Graph */}
            <div className="absolute top-[35%] right-[5%] bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-2xl w-64 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-xs font-bold"
                  style={{ color: "var(--navy)" }}
                >
                  Monthly Volume
                </h3>
                <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center">
                  <BarChart3 className="w-3 h-3 text-slate-500" />
                </div>
              </div>
              <div className="mb-6">
                <span
                  className="text-3xl font-black tracking-tight"
                  style={{ color: "var(--navy)" }}
                >
                  $1.2M
                </span>
              </div>
              <div className="flex items-end gap-1.5 h-20">
                {[40, 60, 30, 80, 50, 100].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-slate-50 rounded-t-md relative h-full flex items-end"
                  >
                    <div
                      className="w-full rounded-t-md"
                      style={{
                        height: `${height}%`,
                        background:
                          i === 5 ? "var(--teal)" : "var(--color-primary-200)",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bills */}
          <div className="absolute top-1/2 left-1/2">
            <div
              ref={b4Ref}
              style={{ willChange: "transform, opacity" }}
              className="absolute -left-[140px] -top-[180px] w-[280px] h-[360px] rounded-2xl shadow-xl border border-indigo-500/50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-indigo-800"
            >
              <CreditCard className="w-12 h-12 text-white/20 mb-3" />
              <div className="w-24 h-1.5 bg-white/20 rounded-full mb-2" />
              <div className="w-16 h-1.5 bg-white/20 rounded-full" />
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2">
            <div
              ref={b3Ref}
              style={{ willChange: "transform, opacity" }}
              className="absolute -left-[140px] -top-[180px] w-[280px] h-[360px] rounded-2xl shadow-xl border border-indigo-400/50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-700"
            >
              <CreditCard className="w-12 h-12 text-white/20 mb-3" />
              <div className="w-24 h-1.5 bg-white/20 rounded-full mb-2" />
              <div className="w-16 h-1.5 bg-white/20 rounded-full" />
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2">
            <div
              ref={b2Ref}
              style={{ willChange: "transform, opacity" }}
              className="absolute -left-[140px] -top-[180px] w-[280px] h-[360px] rounded-2xl shadow-xl border border-violet-400/50 flex flex-col items-center justify-center bg-gradient-to-br from-violet-500 to-violet-700"
            >
              <CreditCard className="w-12 h-12 text-white/20 mb-3" />
              <div className="w-24 h-1.5 bg-white/20 rounded-full mb-2" />
              <div className="w-16 h-1.5 bg-white/20 rounded-full" />
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2">
            <div
              ref={b1Ref}
              style={{ willChange: "transform, opacity" }}
              className="absolute -left-[140px] -top-[180px] w-[280px] h-[360px] rounded-2xl shadow-xl border border-purple-300/50 flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 to-purple-600"
            >
              <CreditCard className="w-12 h-12 text-white/20 mb-3" />
              <div className="w-24 h-1.5 bg-white/20 rounded-full mb-2" />
              <div className="w-16 h-1.5 bg-white/20 rounded-full" />
            </div>
          </div>

          {/* Center Bill */}
          <div className="absolute top-1/2 left-1/2">
            <div
              ref={b0Ref}
              style={{ willChange: "transform, opacity" }}
              className="absolute -left-[140px] -top-[180px] w-[280px] h-[360px] bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl shadow-2xl border border-purple-300 flex flex-col items-center justify-center"
            >
              <div
                ref={b0ContentRef}
                className="flex flex-col items-center justify-center w-full h-full"
              >
                <CreditCard className="w-12 h-12 text-white/30 mb-3" />
                <div className="w-24 h-1.5 bg-white/20 rounded-full mb-2" />
                <div className="w-16 h-1.5 bg-white/20 rounded-full" />
                <div
                  ref={bandRef}
                  className="absolute top-1/2 -translate-y-1/2 w-full h-16 bg-white/10 backdrop-blur-md border-y-2 border-white/30 flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-mono font-bold tracking-widest text-xl">
                    $10,000
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Banks */}
          <div
            ref={banksRef}
            style={{ transform: "translateZ(200px)" }}
            className="absolute bottom-[-20px] left-0 w-full flex justify-between px-4 items-end"
          >
            {[
              { icon: Building2, label: "Bank A" },
              { icon: Car, label: "Uber" },
              { icon: ShoppingBag, label: "Square", featured: true },
              { icon: ShoppingBag, label: "Instacart" },
              { icon: Landmark, label: "J.P.Morgan" },
            ].map((bank, i) => (
              <div
                key={i}
                className={`flex flex-col items-center gap-4 ${bank.featured ? "mb-8" : ""}`}
              >
                <div
                  className={`${bank.featured ? "w-24 h-24" : "w-20 h-20"} bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100`}
                >
                  <bank.icon
                    className={`${bank.featured ? "w-10 h-10" : "w-8 h-8"}`}
                    style={{ color: "var(--navy)" }}
                  />
                </div>
                <span
                  className={`${bank.featured ? "text-base font-bold" : "text-sm font-bold"}`}
                  style={{
                    color: bank.featured
                      ? "var(--navy)"
                      : "var(--color-text-light)",
                  }}
                >
                  {bank.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════ PHASE 3: SCREEN TRANSITION ══════ */}
        <div
          ref={screenFillRef}
          style={{ willChange: "opacity" }}
          className="fixed inset-0 z-[100] pointer-events-none"
          data-phase="3"
        >
          <div
            className="w-full h-full"
            style={{ background: "var(--navy)" }}
          />
        </div>

        {/* ══════ PHASE 4: DOCUMENT TRANSFORMATION ══════ */}
        <div
          ref={phase4Ref}
          className="fixed inset-0 z-[200] flex items-center justify-center px-12 lg:px-24 max-w-7xl mx-auto w-full pointer-events-none"
        >
          <div className="flex items-center justify-center w-full h-full">
            {/* Left: Document */}
            <div className="w-1/2 flex justify-center items-center relative h-full">
              <div
                ref={docRef}
                className="relative flex flex-col items-center justify-center overflow-hidden p-8"
              >
                {/* Bill Lines */}
                <div
                  ref={docLinesRef}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <CreditCard className="w-12 h-12 text-white/30 mb-3" />
                  <div className="w-24 h-1.5 bg-white/20 rounded-full mb-2" />
                  <div className="w-16 h-1.5 bg-white/20 rounded-full" />
                </div>

                {/* Document Header */}
                <div
                  ref={docHeaderRef}
                  className="absolute top-8 left-8 right-8 flex flex-col items-center border-b-2 border-slate-200 pb-6"
                >
                  <ShieldCheck
                    className="w-12 h-12 mb-2"
                    style={{ color: "var(--teal)" }}
                  />
                  <h2
                    className="text-2xl font-black tracking-widest uppercase text-center"
                    style={{ color: "var(--navy)" }}
                  >
                    Official Document
                  </h2>
                  <p className="text-xs text-slate-500 font-mono mt-1">
                    DOC ID: MQ-99482-2026
                  </p>
                </div>

                {/* Document Body */}
                <div
                  ref={docBodyRef}
                  className="absolute top-48 left-8 right-8 flex flex-col gap-4"
                >
                  {[
                    { label: "Account Holder", value: "John Doe" },
                    { label: "Card Number", value: "****-****-****-4920", mono: true },
                    { label: "Issuer", value: "J.P. Morgan Chase Bank" },
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
                      background: "var(--color-primary-50)",
                      border: "1px solid var(--color-primary-100)",
                    }}
                  >
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--navy)" }}
                    >
                      This document certifies the successful issuance and
                      activation of the virtual card under the specified program
                      parameters.
                    </p>
                  </div>
                </div>

                {/* Document Footer */}
                <div
                  ref={docFooterRef}
                  className="absolute bottom-8 left-8 right-8 pt-6 border-t-2 border-slate-200 flex justify-between items-end"
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

            {/* Right: Callouts */}
            <div className="w-1/2 flex flex-col justify-center gap-8 pl-8 relative z-10">
              <div
                ref={callout1Ref}
                style={{ willChange: "transform, opacity" }}
              >
                <div
                  ref={callout1InnerRef}
                  className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-slate-100 w-80 relative -left-16"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{
                        background: "var(--color-primary-50)",
                        color: "var(--teal)",
                      }}
                    >
                      <Network className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                        Network Size
                      </p>
                      <p
                        className="text-xl font-black"
                        style={{ color: "var(--navy)" }}
                      >
                        15,000+ Partners
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-2 flex-1 rounded-full overflow-hidden"
                        style={{ background: "var(--color-primary-100)" }}
                      >
                        <div
                          className="h-full w-full rounded-full"
                          style={{ background: "var(--teal)" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                ref={callout2Ref}
                style={{ willChange: "transform, opacity" }}
              >
                <div
                  ref={callout2InnerRef}
                  className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-slate-100 w-72 ml-16"
                >
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
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden relative">
                    <div
                      ref={processingBarRef}
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{ background: "var(--teal)", width: "0%" }}
                    />
                  </div>
                </div>
              </div>

              <div
                ref={callout3Ref}
                style={{ willChange: "transform, opacity" }}
              >
                <div
                  ref={callout3InnerRef}
                  className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-slate-100 w-80 relative -left-8"
                >
                  <div className="flex items-center gap-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{
                        background: "var(--color-primary-50)",
                        color: "var(--teal)",
                      }}
                    >
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                        Trust & Scalability
                      </p>
                      <p
                        className="text-base font-bold"
                        style={{ color: "var(--navy)" }}
                      >
                        Bank-Grade Security
                      </p>
                      <p className="text-xs text-slate-500 mt-1 font-medium">
                        99.99% Uptime SLA
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════ PHASE 5: STATS ══════ */}
        <div
          ref={phase5Ref}
          className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Logo cards stack */}
              <div className="flex flex-col gap-4 items-center">
                {[
                  { src: "/svg/static_svg_logo-uber.svg", alt: "Uber", ref: card0Ref },
                  { src: "/svg/static_svg_logo-square.svg", alt: "Square", ref: card1Ref },
                  { src: "/svg/static_svg_logo-instacart.svg", alt: "Instacart", ref: card2Ref },
                  { src: "/svg/static_img_partners_WesternUnion.svg", alt: "Western Union", ref: card3Ref },
                ].map((card, i) => (
                  <div
                    key={i}
                    ref={card.ref}
                    className="w-[320px] flex items-center justify-center"
                  >
                    <div
                      style={{
                        background: "white",
                        borderRadius: "12px",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                        padding: "24px 32px",
                        width: "100%",
                      }}
                    >
                      <img
                        src={card.src}
                        alt={card.alt}
                        className="h-8 object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Stats */}
              <div ref={phase5StatsRef}>
                <h2
                  className="text-4xl md:text-5xl font-bold mb-12"
                  style={{ color: "var(--navy)" }}
                >
                  The results speak
                  <br />
                  for themselves
                </h2>

                <div className="space-y-8">
                  <div>
                    <p
                      className="text-5xl md:text-6xl font-black"
                      style={{ color: "var(--teal)" }}
                    >
                      $290B+
                    </p>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "var(--color-text-light)" }}
                    >
                      volume processed in 2024
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-5xl md:text-6xl font-black"
                      style={{ color: "var(--teal)" }}
                    >
                      99.99%
                    </p>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "var(--color-text-light)" }}
                    >
                      platform uptime in 2024
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-5xl md:text-6xl font-black"
                      style={{ color: "var(--teal)" }}
                    >
                      40+
                    </p>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "var(--color-text-light)" }}
                    >
                      countries certified to operate
                    </p>
                  </div>
                </div>

                {/* Award badges */}
                <div className="flex items-center gap-6 mt-10">
                  <img
                    src="/svg/static_img_Awards_Updated-logo.svg"
                    alt="Awards"
                    className="h-16 opacity-70"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════ PHASE 6: TESTIMONIALS ══════ */}
        <div
          ref={phase6Ref}
          className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Content */}
              <div>
                <h2
                  className="text-4xl md:text-5xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  We are your
                  <br />
                  trusted partner
                </h2>
                <p
                  className="text-lg mb-8"
                  style={{ color: "var(--color-text-light)" }}
                >
                  Our team of experts provide guidance from setup to launch &
                  scale. Making you successful is our priority.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    "10+ years of modern card issuing experience",
                    "Compliance & risk experts",
                    "80x volume growth since 2017",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "var(--color-primary-50)" }}
                      >
                        <CheckCircle2
                          className="w-4 h-4"
                          style={{ color: "var(--teal)" }}
                        />
                      </div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--navy)" }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <div
                  ref={phase6QuoteRef}
                  className="mb-8"
                >
                  <div
                    className="border-l-4 pl-6"
                    style={{ borderColor: "var(--teal)" }}
                  >
                    <img
                      src="/svg/static_img_partners_WesternUnion.svg"
                      alt="Western Union"
                      className="h-6 mb-4"
                    />
                    <p
                      className="text-sm leading-relaxed mb-4 italic"
                      style={{ color: "var(--color-text-light)" }}
                    >
                      "We have seen Epic be the trusted advisor for us on not
                      just issuing the card, but doing the card processing and
                      the card management."
                    </p>
                    <div className="flex items-center gap-3">
                      <img
                        src="/jpg/static_img_partners_Tom%20Mazzaferro.jpeg.jpg"
                        alt="Tom Mazzaferro"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p
                          className="text-sm font-bold"
                          style={{ color: "var(--navy)" }}
                        >
                          Tom Mazzaferro
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--color-text-light)" }}
                        >
                          Chief Data and Innovation Officer, Western Union
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Card + Video */}
              <div className="flex flex-col items-center gap-8">
                <div ref={phase6CardRef}>
                  <div className="relative">
                    <div className="w-[360px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
                      <div
                        className="p-6"
                        style={{ background: "var(--navy)" }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              E
                            </span>
                          </div>
                          <span className="text-white font-bold text-lg">
                            Epic
                          </span>
                        </div>
                        <img
                          src="/svg/static_img_partners_WU_Card.svg"
                          alt=""
                          className="w-full opacity-80"
                        />
                      </div>

                      <div
                        ref={phase6ContentRef}
                        className="p-6"
                      >
                        <img
                          src="/svg/static_img_partners_affirm.svg"
                          alt="Affirm"
                          className="h-6 mb-4"
                        />
                        <p
                          className="text-sm leading-relaxed mb-4"
                          style={{ color: "var(--color-text-light)" }}
                        >
                          "Epic's unique technology provides us the platform
                          and services to help build innovative products that
                          people love."
                        </p>
                        <p
                          className="text-sm font-bold"
                          style={{ color: "var(--navy)" }}
                        >
                          Max Levchin
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--color-text-light)" }}
                        >
                          CEO of Affirm
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video placeholder */}
                <div
                  ref={phase6VideoRef}
                  className="w-[360px]"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src="/png/static_img_partners_partners-video-3.png"
                      alt="Customer spotlight video"
                      className="w-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                        <svg
                          className="w-6 h-6 ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          style={{ color: "var(--teal)" }}
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs font-medium">Watch video</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════ PHASE 7: FINAL CTA ══════ */}
        <div
          ref={phase7Ref}
          className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ background: "var(--navy)" }}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center p-12 lg:p-20">
                {/* Left: Text */}
                <div ref={phase7TextRef}>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Start innovating
                    <br />
                    with Epic today
                  </h2>
                  <p className="text-lg text-white/60 mb-8">
                    Let's talk about your use case and how we can help.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center px-8 py-4 text-base font-medium rounded-full transition-all hover:opacity-90 hover:shadow-xl"
                    style={{ background: "var(--teal)", color: "white" }}
                  >
                    Contact us
                  </a>
                </div>

                {/* Right: Phone + Card */}
                <div
                  ref={phase7PhoneRef}
                  className="flex justify-center items-center relative"
                >
                  <img
                    src="/png/static_img_innovating_footer-phone.png"
                    alt="Phone"
                    className="relative z-10 h-[400px] object-contain"
                  />
                  <img
                    src="/png/static_img_innovating_card-shadow.png"
                    alt="Card"
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 h-[250px] object-contain opacity-80"
                  />
                </div>
              </div>

              {/* Decorative gradient orbs */}
              <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-[120px]"
                style={{ background: "var(--teal)" }}
              />
              <div
                className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 blur-[80px]"
                style={{ background: "var(--navy-light)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
