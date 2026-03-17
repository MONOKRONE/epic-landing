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
      // Tween 1: Zoom
      gsap.fromTo(
        grid,
        { scale: 1 },
        {
          scale: 20,
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
            start: "70% top",
            end: "85% top",
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
      <div style={{ background: "#1e1b4b", padding: "120px 0 60px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
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
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.1,
                  marginBottom: 48,
                }}
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
                  <p style={{ fontSize: 56, fontWeight: 900, color: "#20A472" }}>
                    $290B+
                  </p>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
                    volume processed in 2024
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: 56, fontWeight: 900, color: "#20A472" }}>
                    99.99%
                  </p>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
                    platform uptime in 2024
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: 56, fontWeight: 900, color: "#20A472" }}>
                    40+
                  </p>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
                    countries certified to operate
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

      {/* PART 2: Grid + Zoom — sticky with scroll animation */}
      <div ref={gridWrapperRef} style={{ height: "300vh" }}>
        <div
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ background: "#1e1b4b" }}
        >
          {/* Masonry grid */}
          <div
            ref={gridRef}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              gap: 6,
              padding: 6,
              background: "#1e1b4b",
              transformOrigin: "55% 75%",
              willChange: "transform",
            }}
          >
            {/* Column 1 */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                paddingTop: 0,
              }}
            >
              <div style={{ background: "white", flex: "0 0 28%" }} />
              <div style={{ background: "white", flex: "0 0 38%" }} />
              <div style={{ background: "white", flex: 1 }} />
            </div>
            {/* Column 2 */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                paddingTop: 60,
              }}
            >
              <div style={{ background: "white", flex: "0 0 18%" }} />
              <div style={{ background: "white", flex: "0 0 42%" }} />
              <div style={{ background: "white", flex: 1 }} />
            </div>
            {/* Column 3 */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                paddingTop: 120,
              }}
            >
              <div style={{ background: "white", flex: "0 0 32%" }} />
              <div style={{ background: "white", flex: "0 0 28%" }} />
              <div style={{ background: "white", flex: 1 }} />
            </div>
            {/* Column 4 */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                paddingTop: 180,
              }}
            >
              <div style={{ background: "white", flex: "0 0 22%" }} />
              <div style={{ background: "white", flex: "0 0 45%" }} />
              <div style={{ background: "white", flex: 1 }} />
            </div>
            {/* Column 5 */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                paddingTop: 240,
              }}
            >
              <div style={{ background: "white", flex: "0 0 35%" }} />
              <div style={{ background: "white", flex: "0 0 22%" }} />
              <div style={{ background: "white", flex: 1 }} />
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
