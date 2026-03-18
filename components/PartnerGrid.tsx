"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function PartnerGrid() {
  const gridWrapperRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const whiteOverlayRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridWrapper = gridWrapperRef.current;
    const grid = gridRef.current;
    const whiteOverlay = whiteOverlayRef.current;
    const stats = statsRef.current;
    if (!gridWrapper || !grid || !whiteOverlay || !stats) return;

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

      // Tween 2: Stats fade out in first 25% of scroll
      gsap.to(stats, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: gridWrapper,
          start: "top top",
          end: "25% top",
          scrub: 1,
        },
      });

      // Tween 3: White overlay
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

      {/* Mobile: stats + curve */}
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

      {/* Desktop: unified stats + grid zoom */}
      <div ref={gridWrapperRef} className="hidden lg:block" style={{ height: "400vh" }}>
        <div
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{
            background: "#2A206A",
            perspective: "800px",
            perspectiveOrigin: "50% 20%",
          }}
        >
          {/* Column-based staircase grid */}
          <div
            ref={gridRef}
            style={{
              position: "absolute",
              top: 0,
              left: "-10%",
              width: "65%",
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
              { offset: 80, labels: ["", "ALLY FINANCIAL", "", "", "", "", "", "", ""] },
              { offset: 160, labels: ["WELLS FARGO", "", "CAPITAL ONE", "", "", "", "", "", ""] },
              { offset: 240, labels: ["", "", "", "TRUIST", "", "", "", "", ""] },
              { offset: 320, labels: ["", "US BANK", "", "", "TD BANK", "", "", "", ""] },
            ].map((col, ci) => (
              <div key={ci} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, paddingTop: col.offset }}>
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

          {/* Stats overlay — right side, fades out on scroll */}
          <div
            ref={statsRef}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "45%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 60px",
              zIndex: 5,
              background: "#2A206A",
            }}
          >
            <h2 style={{ fontSize: 48, fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: 48 }}>
              The results speak for themselves
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div>
                <p style={{ fontSize: 56, fontWeight: 900, color: "#20A472" }}>$290B+</p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>volume processed in 2024</p>
              </div>
              <div>
                <p style={{ fontSize: 56, fontWeight: 900, color: "#20A472" }}>99.99%</p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>platform uptime in 2024</p>
              </div>
              <div>
                <p style={{ fontSize: 56, fontWeight: 900, color: "#20A472" }}>2,500+</p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>lender connections nationwide</p>
              </div>
            </div>

            <div style={{ marginTop: 40 }}>
              <img src="/svg/static_img_Awards_Updated-logo.svg" alt="Awards" style={{ height: 64, opacity: 1.0 }} />
            </div>
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
    </section>
  );
}
