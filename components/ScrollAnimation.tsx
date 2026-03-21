"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimation() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Phase 6 — master container
  const phase6Ref = useRef<HTMLDivElement>(null);

  // Phase 6 — LEFT side content blocks (stacked, fade in/out)
  const leftIntroRef = useRef<HTMLDivElement>(null);
  const leftWURef = useRef<HTMLDivElement>(null);
  const leftAffirmRef = useRef<HTMLDivElement>(null);

  // Phase 6 — RIGHT side cards (absolute stacked, crossfade)
  const cardEpicRef = useRef<HTMLDivElement>(null);
  const cardWURef = useRef<HTMLDivElement>(null);
  const cardAffirmRef = useRef<HTMLDivElement>(null);
  const cardVideoRef = useRef<HTMLDivElement>(null);

  // Phase 7 refs (now Phase 2: 55 → 100%)
  const phase7Ref = useRef<HTMLDivElement>(null);
  const phase7TextRef = useRef<HTMLDivElement>(null);
  const phase7PhoneRef = useRef<HTMLDivElement>(null);
  const forSaleRef = useRef<HTMLDivElement>(null);
  const soldRef = useRef<HTMLDivElement>(null);
  const miniDocRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

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
      // PHASE 6: Testimonials (0 → 55%)
      // ═══════════════════════════════════════════════════

      // Master container fade in/out
      gsap.set(phase6Ref.current, { opacity: 0 });
      gsap.fromTo(
        phase6Ref.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(0, 3) }
      );
      gsap.fromTo(
        phase6Ref.current,
        { opacity: 1 },
        { opacity: 0, immediateRender: false, scrollTrigger: pct(53, 55) }
      );

      // --- STEP 0: Epic card + intro text appear (0% → 15%) ---

      // Left intro appears
      gsap.set(leftIntroRef.current, { opacity: 0, y: 30 });
      gsap.fromTo(
        leftIntroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, scrollTrigger: pct(0, 6) }
      );

      // Epic card appears with scale
      gsap.set(cardEpicRef.current, { opacity: 0, scale: 0.85 });
      gsap.fromTo(
        cardEpicRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, scrollTrigger: pct(2, 8) }
      );

      // --- STEP 1: Transition to Western Union (15% → 35%) ---

      // Left intro fades out
      gsap.fromTo(
        leftIntroRef.current,
        { opacity: 1 },
        { opacity: 0, immediateRender: false, scrollTrigger: pct(13, 17) }
      );

      // Left WU testimonial fades in
      gsap.set(leftWURef.current, { opacity: 0, y: 20 });
      gsap.fromTo(
        leftWURef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, scrollTrigger: pct(16, 22) }
      );

      // Epic card fades out
      gsap.fromTo(
        cardEpicRef.current,
        { opacity: 1 },
        { opacity: 0, immediateRender: false, scrollTrigger: pct(14, 19) }
      );

      // WU card fades in
      gsap.set(cardWURef.current, { opacity: 0, scale: 0.95 });
      gsap.fromTo(
        cardWURef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, scrollTrigger: pct(16, 22) }
      );

      // Video thumbnail fades in with WU card
      gsap.set(cardVideoRef.current, { opacity: 0, scale: 0.9 });
      gsap.fromTo(
        cardVideoRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, scrollTrigger: pct(16, 22) }
      );

      // --- STEP 2: Transition to Affirm (35% → 55%) ---

      // Left WU fades out
      gsap.fromTo(
        leftWURef.current,
        { opacity: 1 },
        { opacity: 0, immediateRender: false, scrollTrigger: pct(33, 37) }
      );

      // Left Affirm fades in
      gsap.set(leftAffirmRef.current, { opacity: 0, y: 20 });
      gsap.fromTo(
        leftAffirmRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, scrollTrigger: pct(35, 40) }
      );

      // WU card fades out
      gsap.fromTo(
        cardWURef.current,
        { opacity: 1 },
        { opacity: 0, immediateRender: false, scrollTrigger: pct(33, 38) }
      );

      // Video fades out with WU card
      gsap.fromTo(
        cardVideoRef.current,
        { opacity: 1 },
        { opacity: 0, immediateRender: false, scrollTrigger: pct(33, 38) }
      );

      // Affirm card fades in
      gsap.set(cardAffirmRef.current, { opacity: 0, scale: 0.95 });
      gsap.fromTo(
        cardAffirmRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, scrollTrigger: pct(35, 40) }
      );

      // ═══════════════════════════════════════════════════
      // PHASE 7: Final CTA (55 → 100%)
      // ═══════════════════════════════════════════════════
      gsap.set(phase7Ref.current, { opacity: 0 });
      gsap.fromTo(
        phase7Ref.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(55, 58) }
      );
      gsap.fromTo(
        phase7Ref.current,
        { opacity: 1 },
        { opacity: 0, immediateRender: false, scrollTrigger: pct(94, 100) }
      );

      // Text slide up
      gsap.fromTo(
        phase7TextRef.current,
        { y: 80 },
        { y: 0, scrollTrigger: pct(55, 62) }
      );

      // Vehicle + For Sale badge slide in
      gsap.set(phase7PhoneRef.current, { x: 80, opacity: 0 });
      gsap.fromTo(
        phase7PhoneRef.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, scrollTrigger: pct(58, 66) }
      );

      // === DOCUMENT FLIGHT SEQUENCE ===

      // Step 1: Document appears from left — FULLY OPAQUE
      gsap.set(miniDocRef.current, {
        x: -120,
        y: 40,
        opacity: 1,
        scale: 1,
        rotation: -8,
      });
      gsap.fromTo(
        miniDocRef.current,
        { x: -120, y: 40, opacity: 0, scale: 1, rotation: -8 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: -5,
          scrollTrigger: pct(64, 70),
        }
      );

      // Step 2: Document FLIES to FOR SALE badge — NO opacity change
      gsap.fromTo(
        miniDocRef.current,
        { x: 0, y: 0, scale: 1, rotation: -5 },
        {
          x: 280,
          y: -160,
          scale: 0.3,
          rotation: 10,
          ease: "power2.in",
          immediateRender: false,
          scrollTrigger: pct(72, 79),
        }
      );

      // Step 3: Document disappears INSTANTLY on impact
      gsap.fromTo(
        miniDocRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          immediateRender: false,
          scrollTrigger: pct(79, 79.5),
        }
      );

      // Step 4: FOR SALE squeezes and vanishes
      gsap.fromTo(
        forSaleRef.current,
        { scale: 1, opacity: 1 },
        {
          scale: 0.7,
          opacity: 0,
          ease: "power2.in",
          immediateRender: false,
          scrollTrigger: pct(77, 79.5),
        }
      );

      // Step 5: WHITE FLASH on impact
      gsap.fromTo(
        flashRef.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1.5,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: pct(79, 81),
        }
      );
      gsap.fromTo(
        flashRef.current,
        { opacity: 1, scale: 1.5 },
        {
          opacity: 0,
          scale: 2,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: pct(81, 83),
        }
      );

      // Step 6: SOLD badge appears FROM the flash — elastic pop
      gsap.fromTo(
        soldRef.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          ease: "back.out(2.5)",
          scrollTrigger: pct(80, 85),
        }
      );

      // Step 7: Green glow pulse on SOLD
      gsap.fromTo(
        soldRef.current,
        { boxShadow: "0 0 0px rgba(32, 164, 114, 0)" },
        {
          boxShadow: "0 0 40px rgba(32, 164, 114, 0.7)",
          immediateRender: false,
          scrollTrigger: pct(84, 88),
        }
      );
      gsap.fromTo(
        soldRef.current,
        { boxShadow: "0 0 40px rgba(32, 164, 114, 0.7)" },
        {
          boxShadow: "0 0 0px rgba(32, 164, 114, 0)",
          immediateRender: false,
          scrollTrigger: pct(88, 92),
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-[300vh] lg:h-[500vh] relative" style={{ zIndex: 60, background: 'white' }}>
      {/* Sticky Viewport */}
      <div
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{
          background: "#ffffff",
          willChange: "transform",
        }}
      >
        {/* ══════ PHASE 6: TESTIMONIALS ══════ */}
        <div
          ref={phase6Ref}
          className="fixed inset-0 z-[200] flex items-start justify-center pointer-events-none overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-start pt-[14vh] lg:pt-[12vh]">

              {/* ===== LEFT SIDE: Stacked content blocks ===== */}
              <div className="relative min-h-[250px] lg:min-h-[400px]">

                {/* Block 0: Intro — title + desc + checklist */}
                <div ref={leftIntroRef} className="absolute inset-0">
                  <h2
                    className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 lg:mb-6"
                    style={{ color: "var(--navy)" }}
                  >
                    We are your
                    <br />
                    payoff partner
                  </h2>
                  <p
                    className="text-lg mb-8"
                    style={{ color: "var(--color-text-light)" }}
                  >
                    Our team handles onboarding, lender connections, and ongoing
                    support. Getting you funded faster is our priority.
                  </p>
                  <div className="space-y-4">
                    {[
                      "10+ years streamlining dealer loan payoffs",
                      "2,500+ lender connections nationwide",
                      "$290B+ in payoff volume processed",
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
                </div>

                {/* Block 1: Western Union testimonial */}
                <div ref={leftWURef} className="absolute inset-0" style={{ opacity: 0 }}>
                  <div
                    className="border-l-4 pl-6"
                    style={{ borderColor: "var(--teal)" }}
                  >
                    <img
                      src="/svg/static_img_partners_WesternUnion.svg"
                      alt="Western Union"
                      className="h-6 mb-6"
                    />
                    <p
                      className="text-lg leading-relaxed mb-6 italic"
                      style={{ color: "var(--color-text-light)" }}
                    >
                      &ldquo;Epic eliminated our payoff backlog overnight. What used to
                      take three days of phone calls now happens in seconds.&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <img
                        src="/jpg/static_img_partners_Tom%20Mazzaferro.jpeg.jpg"
                        alt="Tom Mazzaferro"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p
                          className="text-base font-bold"
                          style={{ color: "var(--navy)" }}
                        >
                          Tom Mazzaferro
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: "var(--color-text-light)" }}
                        >
                          VP of Operations, AutoNation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Block 2: Affirm testimonial */}
                <div ref={leftAffirmRef} className="absolute inset-0" style={{ opacity: 0 }}>
                  <div
                    className="border-l-4 pl-6"
                    style={{ borderColor: "var(--teal)" }}
                  >
                    <img
                      src="/svg/static_img_partners_affirm.svg"
                      alt="Affirm"
                      className="h-6 mb-6"
                    />
                    <p
                      className="text-lg leading-relaxed mb-6 italic"
                      style={{ color: "var(--color-text-light)" }}
                    >
                      &ldquo;Epic&rsquo;s platform lets us close deals faster and get titles
                      cleared in record time — our F&amp;I team loves it.&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ background: "var(--color-primary-50)" }}
                      >
                        <span
                          className="text-lg font-bold"
                          style={{ color: "var(--teal)" }}
                        >
                          SC
                        </span>
                      </div>
                      <div>
                        <p
                          className="text-base font-bold"
                          style={{ color: "var(--navy)" }}
                        >
                          Sarah Chen
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: "var(--color-text-light)" }}
                        >
                          F&amp;I Director, Hendrick Automotive
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== RIGHT SIDE: Card stack + video ===== */}
              <div className="flex flex-col items-center justify-center mt-8 lg:mt-0">
                {/* Card container — fixed height, cards stacked absolutely */}
                <div className="relative w-[280px] lg:w-[360px] h-[340px] lg:h-[440px] mx-auto">

                  {/* Card 0: Epic branded document */}
                  <div
                    ref={cardEpicRef}
                    className="absolute inset-0 rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
                    style={{ background: "white", opacity: 0 }}
                  >
                    {/* Navy header with Epic branding */}
                    <div
                      className="p-6 flex flex-col items-center"
                      style={{ background: "var(--navy)", minHeight: 180 }}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-3">
                        <span className="text-white font-bold text-2xl">E</span>
                      </div>
                      <span className="text-white font-bold text-xl mb-1">Epic</span>
                      <span className="text-white/50 text-xs tracking-widest uppercase">
                        National Loan Payoff Clearinghouse
                      </span>
                    </div>
                    {/* Body */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {[
                          { label: "Platform", value: "Loan Payoff Network" },
                          { label: "Lenders", value: "2,500+ Connected" },
                          { label: "Uptime", value: "99.99% SLA" },
                        ].map((row) => (
                          <div
                            key={row.label}
                            className="flex justify-between items-center border-b border-slate-100 pb-3"
                          >
                            <span className="text-xs font-bold text-slate-400 uppercase">
                              {row.label}
                            </span>
                            <span
                              className="text-sm font-bold"
                              style={{ color: "var(--navy)" }}
                            >
                              {row.value}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div
                        className="mt-6 p-3 rounded-lg text-center"
                        style={{ background: "var(--color-primary-50)" }}
                      >
                        <span
                          className="text-xs font-bold"
                          style={{ color: "var(--teal)" }}
                        >
                          TRUSTED BY 500+ DEALERSHIPS
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 1: Western Union VISA card */}
                  <div
                    ref={cardWURef}
                    className="absolute inset-0 rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
                    style={{ background: "white", opacity: 0 }}
                  >
                    <div
                      className="p-6"
                      style={{ background: "var(--navy)", minHeight: 200 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">E</span>
                        </div>
                        <span className="text-white font-bold text-lg">Epic</span>
                      </div>
                      <img
                        src="/svg/static_img_partners_WU_Card.svg"
                        alt="Western Union Card"
                        className="w-full opacity-90"
                      />
                    </div>
                    <div className="p-6">
                      <img
                        src="/svg/static_img_partners_WesternUnion.svg"
                        alt="Western Union"
                        className="h-5 mb-3"
                      />
                      <p
                        className="text-xs"
                        style={{ color: "var(--color-text-light)" }}
                      >
                        Western Union × Epic Partnership
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Affirm card */}
                  <div
                    ref={cardAffirmRef}
                    className="absolute inset-0 rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
                    style={{ background: "white", opacity: 0 }}
                  >
                    <div
                      className="p-6 flex items-center justify-center"
                      style={{ background: "#FFD700", minHeight: 200 }}
                    >
                      <img
                        src="/svg/static_img_partners_affirm.svg"
                        alt="Affirm"
                        className="h-10"
                        style={{ filter: "brightness(0)" }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: "var(--color-primary-50)" }}
                        >
                          <span style={{ color: "var(--teal)" }} className="font-bold">E</span>
                        </div>
                        <span className="text-sm font-bold" style={{ color: "var(--navy)" }}>
                          Powered by Epic
                        </span>
                      </div>
                      <p
                        className="text-xs"
                        style={{ color: "var(--color-text-light)" }}
                      >
                        Affirm × Epic Dealer Solutions
                      </p>
                    </div>
                  </div>

                  {/* Video thumbnail — overlaps cards from bottom-left */}
                  <div
                    ref={cardVideoRef}
                    className="absolute hidden lg:block"
                    style={{
                      bottom: -20,
                      left: -60,
                      width: 200,
                      zIndex: 20,
                      opacity: 0,
                      cursor: "pointer",
                      pointerEvents: "auto",
                    }}
                    onClick={() => setVideoModalOpen(true)}
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
                      <img
                        src="/png/static_img_partners_partners-video-3.png"
                        alt="Customer spotlight video"
                        className="w-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                          <svg
                            className="w-5 h-5 ml-0.5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            style={{ color: "var(--teal)" }}
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 text-white">
                        <p className="text-[10px] font-medium">Watch video</p>
                      </div>
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
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center p-6 lg:p-20">
                {/* Left: Text */}
                <div ref={phase7TextRef}>
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 lg:mb-6">
                    Start closing deals
                    <br />
                    faster with Epic
                  </h2>
                  <p className="text-lg text-white/60 mb-8">
                    See how Epic can streamline your loan payoff process and get your deals to the finish line.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center px-8 py-4 text-base font-medium rounded-full transition-all hover:opacity-90 hover:shadow-xl"
                    style={{ background: "var(--teal)", color: "white" }}
                  >
                    Schedule a demo
                  </a>
                </div>

                {/* Right: Vehicle + Badges */}
                <div
                  ref={phase7PhoneRef}
                  className="flex justify-center items-center relative"
                >
                  {/* Vehicle image */}
                  <img
                    src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80"
                    alt="Vehicle"
                    className="relative z-10 rounded-2xl shadow-2xl w-[280px] lg:w-[400px] h-[180px] lg:h-[260px] object-cover"
                  />

                  {/* "For Sale" badge — visible initially, fades out */}
                  <div
                    ref={forSaleRef}
                    className="absolute top-4 right-4 z-20 px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                    style={{
                      background: "#e8f5e9",
                      color: "#2D6135",
                    }}
                  >
                    For Sale
                  </div>

                  {/* "SOLD" badge — hidden initially, fades in */}
                  <div
                    ref={soldRef}
                    className="absolute top-4 right-4 z-20 px-6 py-3 rounded-full text-base font-black shadow-lg tracking-wider"
                    style={{
                      background: "#2B5E33",
                      color: "white",
                      opacity: 0,
                    }}
                  >
                    SOLD ✓
                  </div>

                  {/* Impact flash — white burst when document hits badge */}
                  <div
                    ref={flashRef}
                    className="absolute top-4 right-4 z-30 w-20 h-20 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 40%, rgba(32,164,114,0.2) 70%, transparent 100%)",
                      opacity: 0,
                      filter: "blur(8px)",
                      transform: "translate(20%, -20%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Mini lien release document — slides in from left */}
                  <div
                    ref={miniDocRef}
                    className="absolute -left-14 bottom-2 z-20"
                    style={{ opacity: 0 }}
                  >
                    <div className="w-20 h-28 bg-white rounded-lg shadow-xl border border-slate-200 flex flex-col items-center justify-center p-2">
                      <div
                        className="w-3 h-3 rounded-full mb-1"
                        style={{ background: "#2B5E33" }}
                      />
                      <div className="w-10 h-0.5 bg-slate-200 mb-1" />
                      <div className="w-8 h-0.5 bg-slate-200 mb-1" />
                      <div className="w-10 h-0.5 bg-slate-200" />
                      <p
                        className="text-[6px] font-bold mt-1"
                        style={{ color: "var(--navy)" }}
                      >
                        LIEN RELEASE
                      </p>
                    </div>
                  </div>
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

      {/* Video Modal */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={() => setVideoModalOpen(false)}
          style={{ pointerEvents: "auto" }}
        >
          <div
            className="relative w-[90vw] max-w-[1000px] aspect-video rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src="https://www.youtube.com/embed/HUMRGEmqXLI?autoplay=1&rel=0"
              title="Epic Customer Spotlight"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              onClick={() => setVideoModalOpen(false)}
              style={{ pointerEvents: "auto" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
