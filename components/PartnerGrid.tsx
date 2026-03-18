"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function PartnerGrid() {
  const gridWrapperRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const whiteOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridWrapper = gridWrapperRef.current;
    const grid = gridRef.current;
    const whiteOverlay = whiteOverlayRef.current;
    if (!gridWrapper || !grid || !whiteOverlay) return;

    const ctx = gsap.context(() => {
      // Tween 1: Tilt + scroll + push toward camera
      gsap.fromTo(
        grid,
        { rotateX: 0, y: "10%", z: 0 },
        {
          rotateX: 35,
          y: "-80%",
          z: 400,
          ease: "none",
          scrollTrigger: {
            trigger: gridWrapper,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // Tween 2: White overlay
      gsap.fromTo(
        whiteOverlay,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: gridWrapper,
            start: "78% top",
            end: "95% top",
            scrub: 1,
          },
        }
      );
    }, gridWrapper);

    return () => ctx.revert();
  }, []);

  const logos = [
    { src: "/svg/static_svg_logo-uber.svg", alt: "Uber" },
    { src: "/svg/static_svg_logo-square.svg", alt: "Square" },
    { src: "/svg/static_svg_logo-instacart.svg", alt: "Instacart" },
    { src: "/svg/static_img_partners_WesternUnion.svg", alt: "Western Union" },
  ];

  return (
    <section style={{ zIndex: 52, position: "relative" }}>
      {/* PART 1: Stats — normal scrolling content */}
      <div style={{ background: "#1e1b4b" }} className="py-16 lg:py-[120px] pb-8 lg:pb-0">
        <div style={{ maxWidth: 1400, margin: "0 auto" }} className="px-4 lg:px-10">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            {/* Left: Partner logo cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {logos.map((logo, i) => (
                <div
                  key={i}
                  style={{
                    background: "white",
                    borderRadius: 12,
                    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                    padding: "24px 32px",
                  }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    style={{ height: 32, objectFit: "contain" }}
                  />
                </div>
              ))}
            </div>

            {/* Right: Title + Stats + Awards */}
            <div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8 lg:mb-12"
              >
                The results speak for themselves
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 32,
                }}
              >
                <div>
                  <p className="text-3xl sm:text-4xl lg:text-[56px] font-black" style={{ color: "#20A472" }}>
                    $290B+
                  </p>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
                    volume processed in 2024
                  </p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl lg:text-[56px] font-black" style={{ color: "#20A472" }}>
                    99.99%
                  </p>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
                    platform uptime in 2024
                  </p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl lg:text-[56px] font-black" style={{ color: "#20A472" }}>
                    2,500+
                  </p>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
                    lender connections nationwide
                  </p>
                </div>
              </div>

              <div style={{ marginTop: 40 }}>
                <img
                  src="/svg/static_img_Awards_Updated-logo.svg"
                  alt="Awards"
                  style={{ height: 64, opacity: 1.0 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PART 2: Single grid with 3D tilt zoom */}
      <div ref={gridWrapperRef} className="hidden lg:block h-[300vh]">
        <div
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{
            background: "#1e1b4b",
            perspective: "1200px",
            perspectiveOrigin: "50% 30%",
          }}
        >
          {/* Single CSS Grid — continuous gap lines */}
          <div
            ref={gridRef}
            style={{
              position: "absolute",
              top: 0,
              left: "-15%",
              width: "130%",
              transformStyle: "preserve-3d" as React.CSSProperties["transformStyle"],
              transformOrigin: "50% 50%",
              willChange: "transform",
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gridAutoRows: 460,
              gap: 10,
              padding: 10,
              background: "#1e1b4b",
            }}
          >
            {/* Row 1 */}
            <GC />
            <GC span label="CHASE" />
            <GC />
            <GC />
            <GC label="ALLY FINANCIAL" />
            {/* Row 2 */}
            <GC span label="WELLS FARGO" />
            <GC />
            <GC label="BANK OF AMERICA" />
            <GC span />
            <GC />
            {/* Row 3 */}
            <GC />
            <GC />
            <GC span label="CAPITAL ONE" />
            <GC />
            <GC label="TRUIST" />
            {/* Row 4 */}
            <GC label="US BANK" />
            <GC span />
            <GC />
            <GC label="TD BANK" />
            <GC span />
            {/* Row 5 */}
            <GC span label="CITIZENS" />
            <GC />
            <GC label="PNC" />
            <GC />
            <GC label="NAVY FEDERAL" />
            {/* Row 6 */}
            <GC />
            <GC label="FIFTH THIRD" />
            <GC span />
            <GC />
            <GC />
            {/* Row 7 — phantom */}
            <GC />
            <GC />
            <GC />
            <GC span />
            <GC />
            {/* Row 8 — phantom */}
            <GC span />
            <GC />
            <GC />
            <GC />
            <GC />
            {/* Row 9 — phantom */}
            <GC />
            <GC />
            <GC />
            <GC />
            <GC />
          </div>

          {/* White overlay */}
          <div
            ref={whiteOverlayRef}
            className="absolute inset-0"
            style={{
              background: "#ffffff",
              opacity: 0,
              zIndex: 10,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* Mobile: simple navy to white curve */}
      <div className="lg:hidden" style={{ background: "white" }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full block" style={{ height: 80 }} xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C480,120 960,120 1440,0 L1440,0 L0,0 Z" fill="#1e1b4b" />
        </svg>
      </div>
    </section>
  );
}

// ── Grid cell ──────────────────────────────────────────────────────
function GC({ label, span }: { label?: string; span?: boolean } = {}) {
  return (
    <div
      style={{
        background: "#FAFAFA",
        borderRadius: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...(span ? { gridRow: "span 2" } : {}),
      }}
    >
      {label && (
        <span
          style={{
            color: "#C4C0D4",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: 1.5,
            textAlign: "center",
            textTransform: "uppercase" as const,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
