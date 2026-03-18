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
        { rotateX: 0, y: "-5%", z: 0 },
        {
          rotateX: 50,
          y: "-85%",
          z: 600,
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

  return (
    <section style={{ zIndex: 52, position: "relative" }}>

      {/* PART A: Stats — normal scroll, Marqeta-style layout */}
      <div style={{ background: "#2A206A" }} className="py-16 lg:py-24">
        <div style={{ maxWidth: 1200, margin: "0 auto" }} className="px-4 lg:px-10">

          {/* Big stat */}
          <div style={{ textAlign: "right", marginBottom: 48 }}>
            <p style={{ fontSize: 80, fontWeight: 900, color: "#20A472", lineHeight: 1 }}>$290B+</p>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>volume processed in 2024</p>
          </div>

          {/* Two stats side by side */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 80, marginBottom: 48 }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 56, fontWeight: 900, color: "#20A472", lineHeight: 1 }}>99.99%</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>platform uptime in 2024</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 56, fontWeight: 900, color: "#20A472", lineHeight: 1 }}>2,500+</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>lender connections nationwide</p>
            </div>
          </div>

          {/* Awards */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 24 }}>
            <img src="/svg/static_img_Awards_Updated-logo.svg" alt="Awards" style={{ height: 80, opacity: 1.0 }} />
          </div>
        </div>
      </div>

      {/* PART B: Staircase grid + 3D zoom — scroll driven */}
      <div ref={gridWrapperRef} className="hidden lg:block" style={{ height: "400vh" }}>
        <div
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{
            background: "#2A206A",
            perspective: "800px",
            perspectiveOrigin: "50% 20%",
          }}
        >
          {/* Grid */}
          <div
            ref={gridRef}
            style={{
              position: "absolute",
              top: 0,
              left: "-20%",
              width: "140%",
              transformStyle: "preserve-3d" as React.CSSProperties["transformStyle"],
              transformOrigin: "50% 50%",
              willChange: "transform",
              display: "flex",
              gap: 10,
              padding: 10,
              alignItems: "flex-start",
              background: "#2A206A",
            }}
          >
            {[
              { offset: 0, labels: ["CHASE", "", "", "", "", "", "", "", ""] },
              { offset: 180, labels: ["", "ALLY FINANCIAL", "", "", "", "", "", "", ""] },
              { offset: 360, labels: ["WELLS FARGO", "", "CAPITAL ONE", "", "", "", "", "", ""] },
              { offset: 540, labels: ["", "", "", "TRUIST", "", "", "", "", ""] },
              { offset: 720, labels: ["", "US BANK", "", "", "TD BANK", "", "", "", ""] },
            ].map((col, ci) => (
              <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: col.offset, flex: 1 }}>
                {col.labels.map((label, ri) => (
                  <div
                    key={ri}
                    style={{
                      background: "#FAFAFA",
                      borderRadius: 20,
                      height: 550,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
                ))}
              </div>
            ))}
          </div>

          {/* White overlay */}
          <div
            ref={whiteOverlayRef}
            className="absolute inset-0"
            style={{ background: "#ffffff", opacity: 0, zIndex: 10, pointerEvents: "none" }}
          />
        </div>
      </div>

      {/* PART C: Mobile fallback */}
      <div className="lg:hidden" style={{ background: "#2A206A" }}>
        <div className="px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">The results speak for themselves</h2>
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-3xl font-black" style={{ color: "#20A472" }}>$290B+</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>volume processed in 2024</p>
            </div>
            <div>
              <p className="text-3xl font-black" style={{ color: "#20A472" }}>99.99%</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>platform uptime in 2024</p>
            </div>
            <div>
              <p className="text-3xl font-black" style={{ color: "#20A472" }}>2,500+</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>lender connections nationwide</p>
            </div>
          </div>
          <div className="mt-8">
            <img src="/svg/static_img_Awards_Updated-logo.svg" alt="Awards" style={{ height: 48, margin: "0 auto" }} />
          </div>
        </div>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full block" style={{ height: 80 }} xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C480,120 960,120 1440,0 L1440,0 L0,0 Z" fill="#2A206A" />
        </svg>
      </div>
    </section>
  );
}
