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
            start: "65% top",
            end: "80% top",
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
      <div style={{ background: "#1e1b4b" }} className="py-16 lg:py-[120px] pb-8 lg:pb-[60px]">
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
                    borderRadius: 20,
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

      {/* PART 2: Grid + Zoom — sticky with scroll animation */}
      <div ref={gridWrapperRef} className="hidden lg:block h-[300vh]">
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
              gap: 8,
              padding: 8,
              background: "#1e1b4b",
              transformOrigin: "45% 65%",
              willChange: "transform",
            }}
          >
            {/* Column 1 */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                paddingTop: 0,
              }}
            >
              <div style={{ background: "white", flex: "0 0 28%", borderRadius: 20 }} />
              <div style={{ background: "white", flex: "0 0 38%", borderRadius: 20 }} />
              <div style={{ background: "white", flex: "0 0 24%", borderRadius: 20 }} />
              {/* Phantom rows */}
              <div style={{ background: "white", flex: "0 0 30%", borderRadius: 20 }} />
              <div style={{ background: "white", flex: "0 0 25%", borderRadius: 20 }} />
            </div>
            {/* Column 2 */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                paddingTop: 60,
              }}
            >
              <div style={{ background: "white", flex: "0 0 18%", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#c4c4c4", fontSize: 14, fontWeight: 700, letterSpacing: 2 }}>CHASE</span>
              </div>
              <div style={{ background: "white", flex: "0 0 42%", borderRadius: 20 }} />
              <div style={{ background: "white", flex: "0 0 20%", borderRadius: 20 }} />
              {/* Phantom rows */}
              <div style={{ background: "white", flex: "0 0 35%", borderRadius: 20 }} />
              <div style={{ background: "white", flex: "0 0 28%", borderRadius: 20 }} />
            </div>
            {/* Column 3 */}
            <div
              className="hidden lg:flex"
              style={{
                flex: 1,
                flexDirection: "column",
                gap: 8,
                paddingTop: 120,
              }}
            >
              <div style={{ background: "white", flex: "0 0 32%", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#c4c4c4", fontSize: 14, fontWeight: 700, letterSpacing: 2 }}>ALLY FINANCIAL</span>
              </div>
              <div style={{ background: "white", flex: "0 0 28%", borderRadius: 20 }} />
              <div style={{ background: "white", flex: "0 0 22%", borderRadius: 20 }} />
              {/* Phantom rows */}
              <div style={{ background: "white", flex: "0 0 32%", borderRadius: 20 }} />
              <div style={{ background: "white", flex: "0 0 26%", borderRadius: 20 }} />
            </div>
            {/* Column 4 */}
            <div
              className="hidden lg:flex"
              style={{
                flex: 1,
                flexDirection: "column",
                gap: 8,
                paddingTop: 180,
              }}
            >
              <div style={{ background: "white", flex: "0 0 22%", borderRadius: 20 }} />
              <div style={{ background: "white", flex: "0 0 45%", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#c4c4c4", fontSize: 14, fontWeight: 700, letterSpacing: 2 }}>CAPITAL ONE</span>
              </div>
              <div style={{ background: "white", flex: "0 0 18%", borderRadius: 20 }} />
              {/* Phantom rows */}
              <div style={{ background: "white", flex: "0 0 28%", borderRadius: 20 }} />
              <div style={{ background: "white", flex: "0 0 34%", borderRadius: 20 }} />
            </div>
            {/* Column 5 */}
            <div
              className="hidden lg:flex"
              style={{
                flex: 1,
                flexDirection: "column",
                gap: 8,
                paddingTop: 240,
              }}
            >
              <div style={{ background: "white", flex: "0 0 35%", borderRadius: 20 }} />
              <div style={{ background: "white", flex: "0 0 22%", borderRadius: 20 }} />
              <div style={{ background: "white", flex: "0 0 18%", borderRadius: 20 }} />
              {/* Phantom rows */}
              <div style={{ background: "white", flex: "0 0 30%", borderRadius: 20 }} />
              <div style={{ background: "white", flex: "0 0 24%", borderRadius: 20 }} />
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

      {/* Mobile: simple navy to white curve */}
      <div className="lg:hidden" style={{ background: "white" }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full block" style={{ height: 80 }} xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C480,120 960,120 1440,0 L1440,0 L0,0 Z" fill="#1e1b4b" />
        </svg>
      </div>
    </section>
  );
}
