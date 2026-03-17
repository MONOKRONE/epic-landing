"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Phase 6 refs (now Phase 1: 0 → 55%)
  const phase6Ref = useRef<HTMLDivElement>(null);
  const phase6CardRef = useRef<HTMLDivElement>(null);
  const phase6ContentRef = useRef<HTMLDivElement>(null);
  const phase6QuoteRef = useRef<HTMLDivElement>(null);
  const phase6VideoRef = useRef<HTMLDivElement>(null);

  // Phase 7 refs (now Phase 2: 55 → 100%)
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
      // PHASE 6: Testimonials (0 → 55%)
      // ═══════════════════════════════════════════════════
      gsap.set(phase6Ref.current, { opacity: 0 });
      gsap.fromTo(
        phase6Ref.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(0, 3) }
      );
      gsap.fromTo(
        phase6Ref.current,
        { opacity: 1 },
        { opacity: 0, immediateRender: false, scrollTrigger: pct(50, 55) }
      );

      // Card scale
      gsap.fromTo(
        phase6CardRef.current,
        { scale: 0.8 },
        { scale: 1, scrollTrigger: pct(0, 8) }
      );

      // Content, quote, video
      gsap.set(phase6ContentRef.current, { opacity: 0 });
      gsap.fromTo(
        phase6ContentRef.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(8, 14) }
      );

      gsap.set(phase6QuoteRef.current, { opacity: 0 });
      gsap.fromTo(
        phase6QuoteRef.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(14, 20) }
      );

      gsap.set(phase6VideoRef.current, { opacity: 0 });
      gsap.fromTo(
        phase6VideoRef.current,
        { opacity: 0 },
        { opacity: 1, scrollTrigger: pct(20, 26) }
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
