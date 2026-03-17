"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Partner data                                                       */
/* ------------------------------------------------------------------ */

const partners = [
  { name: "Uber", logo: "/svg/static_svg_logo-uber.svg" },
  { name: "Square", logo: "/svg/static_svg_logo-square.svg" },
  { name: "Instacart", logo: "/svg/static_svg_logo-instacart.svg" },
  { name: "DoorDash", logo: "/svg/static_svg_logo-doordash.svg" },
];

const stats = [
  { number: "$383B+", label: "volume processed in 2025" },
  { number: "99.99%", label: "platform uptime in 2025" },
  { number: "40+", label: "countries certified to operate" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PartnerGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const whiteOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const showcase = showcaseRef.current;
    const grid = gridRef.current;
    const whiteOverlay = whiteOverlayRef.current;
    if (!section || !sticky || !showcase || !grid || !whiteOverlay) return;

    const cards = showcase.querySelectorAll<HTMLElement>(".partner-card");
    const statsEls = showcase.querySelectorAll<HTMLElement>(".stat-item");
    const titleEl = showcase.querySelector<HTMLElement>(".results-title");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      /* ---- Phase A (0 → 0.25): Showcase on top of grid ---- */
      /* Grid is already visible (opacity 1) behind the showcase */

      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { x: -300, opacity: 0, rotateZ: -15 + i * 3 },
          {
            x: 0,
            opacity: 1,
            rotateZ: -8 + i * 4,
            duration: 0.06,
            ease: "power2.out",
          },
          i * 0.02
        );
      });

      if (titleEl) {
        tl.fromTo(
          titleEl,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.05, ease: "power2.out" },
          0.01
        );
      }

      statsEls.forEach((stat, i) => {
        tl.fromTo(
          stat,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.04, ease: "power2.out" },
          0.03 + i * 0.02
        );
      });

      /* Showcase fades out revealing grid behind (0.20 → 0.30) */
      tl.to(showcase, { opacity: 0, duration: 0.10 }, 0.20);

      /* ---- Phase B (0.30 → 0.85): Zoom into grid ---- */

      tl.to(
        grid,
        {
          scale: 20,
          duration: 0.55,
          ease: "power2.in",
        },
        0.30
      );

      /* ---- Phase C (0.82 → 0.90): White overlay ---- */

      tl.to(
        whiteOverlay,
        { opacity: 1, duration: 0.08, ease: "power2.in" },
        0.82
      );

      /* ---- Phase D (0.90 → 1.0): Clean exit ---- */

      tl.to(grid, { opacity: 0, duration: 0.02 }, 0.90);
      tl.set({}, {}, 1.0); // pad timeline

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "400vh", zIndex: 52, position: "relative" }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: "#1e1b4b" }}
      >
        {/* Masonry grid — always visible behind showcase */}
        <div
          ref={gridRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            gap: 6,
            background: "#1e1b4b",
            padding: 6,
            transformOrigin: "55% 70%",
            willChange: "transform",
          }}
        >
          {/* Column 1 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ background: "white", flex: "0 0 25%" }} />
            <div style={{ background: "white", flex: "0 0 35%" }} />
            <div style={{ background: "white", flex: "0 0 20%" }} />
            <div style={{ background: "white", flex: 1 }} />
          </div>
          {/* Column 2 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ background: "white", flex: "0 0 15%" }} />
            <div style={{ background: "white", flex: "0 0 40%" }} />
            <div style={{ background: "white", flex: 1 }} />
          </div>
          {/* Column 3 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ background: "white", flex: "0 0 30%" }} />
            <div style={{ background: "white", flex: "0 0 25%" }} />
            <div style={{ background: "white", flex: "0 0 30%" }} />
            <div style={{ background: "white", flex: 1 }} />
          </div>
          {/* Column 4 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ background: "white", flex: "0 0 20%" }} />
            <div style={{ background: "white", flex: "0 0 45%" }} />
            <div style={{ background: "white", flex: 1 }} />
          </div>
          {/* Column 5 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ background: "white", flex: "0 0 35%" }} />
            <div style={{ background: "white", flex: "0 0 20%" }} />
            <div style={{ background: "white", flex: "0 0 25%" }} />
            <div style={{ background: "white", flex: 1 }} />
          </div>
        </div>

        {/* Showcase — on top of grid with solid bg */}
        <div
          ref={showcaseRef}
          className="absolute inset-0 flex items-center"
          style={{ zIndex: 5, background: "#1e1b4b" }}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative" style={{ height: 400 }}>
                {partners.map((partner, i) => (
                  <div
                    key={partner.name}
                    className="partner-card absolute"
                    style={{
                      width: 280,
                      height: 175,
                      background: "white",
                      borderRadius: 16,
                      boxShadow:
                        "0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 24,
                      top: 40 + i * 35,
                      left: 20 + i * 30,
                      zIndex: partners.length - i,
                      opacity: 0,
                    }}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      style={{
                        maxWidth: "70%",
                        maxHeight: "60%",
                        objectFit: "contain",
                        filter: "brightness(0)",
                      }}
                    />
                  </div>
                ))}
              </div>

              <div>
                <h2
                  className="results-title text-4xl md:text-5xl font-bold text-white mb-12"
                  style={{ opacity: 0 }}
                >
                  The results speak for themselves
                </h2>

                {/* Main stat */}
                <div className="stat-item mb-10" style={{ opacity: 0 }}>
                  <div
                    className="text-5xl md:text-6xl font-bold mb-2"
                    style={{ color: "#20A472" }}
                  >
                    {stats[0].number}
                  </div>
                  <div className="text-base text-white/60">
                    {stats[0].label}
                  </div>
                </div>

                {/* Secondary stats row */}
                <div className="flex gap-12 mb-10">
                  {stats.slice(1).map((stat, i) => (
                    <div key={i} className="stat-item" style={{ opacity: 0 }}>
                      <div
                        className="text-3xl md:text-4xl font-bold mb-1"
                        style={{ color: "#20A472" }}
                      >
                        {stat.number}
                      </div>
                      <div className="text-sm text-white/60">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
    </section>
  );
}
