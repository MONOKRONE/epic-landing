"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimation() {
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

      // --- STEP 0: Epic card + intro text appear (0% → 12%) ---

      // Left intro appears
      gsap.set(leftIntroRef.current, { opacity: 0, y: 30 });
      gsap.fromTo(
        leftIntroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, scrollTrigger: pct(0, 5) }
      );

      // Epic card appears with scale
      gsap.set(cardEpicRef.current, { opacity: 0, scale: 0.85 });
      gsap.fromTo(
        cardEpicRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, scrollTrigger: pct(2, 7) }
      );

      // --- STEP 1: Transition to Western Union (12% → 28%) ---

      // Left intro fades out
      gsap.fromTo(
        leftIntroRef.current,
        { opacity: 1 },
        { opacity: 0, immediateRender: false, scrollTrigger: pct(12, 16) }
      );

      // Left WU testimonial fades in
      gsap.set(leftWURef.current, { opacity: 0, y: 20 });
      gsap.fromTo(
        leftWURef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, scrollTrigger: pct(15, 20) }
      );

      // Epic card fades out
      gsap.fromTo(
        cardEpicRef.current,
        { opacity: 1 },
        { opacity: 0, immediateRender: false, scrollTrigger: pct(13, 18) }
      );

      // WU card fades in
      gsap.set(cardWURef.current, { opacity: 0, scale: 0.95 });
      gsap.fromTo(
        cardWURef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, scrollTrigger: pct(15, 20) }
      );

      // --- STEP 2: Transition to Affirm (28% → 42%) ---

      // Left WU fades out
      gsap.fromTo(
        leftWURef.current,
        { opacity: 1 },
        { opacity: 0, immediateRender: false, scrollTrigger: pct(28, 32) }
      );

      // Left Affirm fades in
      gsap.set(leftAffirmRef.current, { opacity: 0, y: 20 });
      gsap.fromTo(
        leftAffirmRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, scrollTrigger: pct(30, 35) }
      );

      // WU card fades out
      gsap.fromTo(
        cardWURef.current,
        { opacity: 1 },
        { opacity: 0, immediateRender: false, scrollTrigger: pct(28, 33) }
      );

      // Affirm card fades in
      gsap.set(cardAffirmRef.current, { opacity: 0, scale: 0.95 });
      gsap.fromTo(
        cardAffirmRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, scrollTrigger: pct(30, 35) }
      );

      // --- STEP 3: Video appears (42% → 55%) ---

      // Affirm card slides up slightly to make room
      gsap.fromTo(
        cardAffirmRef.current,
        { y: 0 },
        { y: -60, immediateRender: false, scrollTrigger: pct(42, 47) }
      );

      // Video fades in below
      gsap.set(cardVideoRef.current, { opacity: 0, y: 40 });
      gsap.fromTo(
        cardVideoRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, scrollTrigger: pct(44, 50) }
      );

      // ═══════════════════════════════════════════════════
      // PHASE 7: Final CTA (55 → 100%)
      // ═══════════════════════════════════════════════════
      gsap.set(phase7Ref.current, { opacity: 0 });
      gsap.fromTo(
        phase7Ref.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(55, 60) }
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
        { y: 0, scrollTrigger: pct(55, 65) }
      );

      // Phone slide in
      gsap.set(phase7PhoneRef.current, { x: 100, opacity: 0 });
      gsap.fromTo(
        phase7PhoneRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, scrollTrigger: pct(62, 75) }
      );

      // Mini document slides in from left
      gsap.fromTo(
        miniDocRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: pct(65, 80),
        }
      );

      // "For Sale" badge fades out
      gsap.fromTo(
        forSaleRef.current,
        { opacity: 1, scale: 1 },
        {
          opacity: 0,
          scale: 0.8,
          scrollTrigger: pct(70, 80),
        }
      );

      // "SOLD" badge pops in
      gsap.fromTo(
        soldRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          ease: "back.out(1.7)",
          scrollTrigger: pct(78, 88),
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-[500vh] relative">
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
          className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* ===== LEFT SIDE: Stacked content blocks ===== */}
              <div className="relative" style={{ minHeight: 400 }}>

                {/* Block 0: Intro — title + desc + checklist */}
                <div ref={leftIntroRef} className="absolute inset-0">
                  <h2
                    className="text-4xl md:text-5xl font-bold mb-6"
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
              <div className="flex flex-col items-center justify-center">
                {/* Card container — fixed height, cards stacked absolutely */}
                <div className="relative" style={{ width: 360, height: 440 }}>

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
                </div>

                {/* Video spotlight — appears below card in Step 3 */}
                <div
                  ref={cardVideoRef}
                  className="mt-6"
                  style={{ width: 360, opacity: 0 }}
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
                    className="relative z-10 rounded-2xl shadow-2xl"
                    style={{
                      width: "400px",
                      height: "260px",
                      objectFit: "cover",
                    }}
                  />

                  {/* "For Sale" badge — visible initially, fades out */}
                  <div
                    ref={forSaleRef}
                    className="absolute top-4 right-4 z-20 px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                    style={{
                      background: "#fbbf24",
                      color: "#1e1b4b",
                    }}
                  >
                    For Sale
                  </div>

                  {/* "SOLD" badge — hidden initially, fades in */}
                  <div
                    ref={soldRef}
                    className="absolute top-4 right-4 z-20 px-6 py-3 rounded-full text-base font-black shadow-lg tracking-wider"
                    style={{
                      background: "#20A472",
                      color: "white",
                      opacity: 0,
                    }}
                  >
                    SOLD ✓
                  </div>

                  {/* Mini lien release document — slides in from left */}
                  <div
                    ref={miniDocRef}
                    className="absolute -left-8 bottom-4 z-20"
                    style={{ opacity: 0 }}
                  >
                    <div className="w-20 h-28 bg-white rounded-lg shadow-xl border border-slate-200 flex flex-col items-center justify-center p-2">
                      <div
                        className="w-3 h-3 rounded-full mb-1"
                        style={{ background: "#20A472" }}
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
    </div>
  );
}
