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
  { number: "$383B+", label: "volume processed" },
  { number: "99.99%", label: "platform uptime" },
  { number: "40+", label: "countries certified" },
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

      /* ---- Phase A (0 → 0.12): Showcase ---- */

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

      /* ---- Phase B (0.12 → 0.35): Grid appears with settle ---- */

      // Fade out showcase
      tl.to(showcase, { opacity: 0, duration: 0.05 }, 0.12);

      // Grid fades in with slight scale settle (0.95 → 1.0)
      tl.fromTo(
        grid,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.15, ease: "power2.out" },
        0.18
      );

      /* ---- Phase C (0.35 → 0.85): The Zoom ---- */

      tl.to(
        grid,
        {
          scale: 20,
          duration: 0.50,
          ease: "power2.in",
        },
        0.35
      );

      // Sticky bg → white during zoom
      tl.to(
        sticky,
        { backgroundColor: "#ffffff", duration: 0.15, ease: "none" },
        0.65
      );

      /* ---- Phase D (0.80 → 0.88): White overlay ---- */

      tl.to(
        whiteOverlay,
        { opacity: 1, duration: 0.08, ease: "power2.in" },
        0.80
      );

      /* ---- Phase E (0.88 → 1.0): Clean exit ---- */

      tl.to(grid, { opacity: 0, duration: 0.02 }, 0.88);
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
        {/* Phase A: Showcase */}
        <div
          ref={showcaseRef}
          className="absolute inset-0 flex items-center"
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
                <div className="space-y-8">
                  {stats.map((stat, i) => (
                    <div key={i} className="stat-item" style={{ opacity: 0 }}>
                      <div
                        className="text-4xl md:text-5xl font-bold mb-1"
                        style={{ color: "#20A472" }}
                      >
                        {stat.number}
                      </div>
                      <div className="text-base text-white/60">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phase B-C: Zoomable Grid — organic layout */}
        <div
          ref={gridRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "0.7fr 1.6fr 1.2fr 0.8fr 1.1fr",
            gridTemplateRows: "0.6fr 1.3fr 0.9fr 1.2fr",
            gap: "6px",
            background: "#1e1b4b",
            transformOrigin: "38% 45%",
            opacity: 0,
            willChange: "transform",
          }}
        >
          {/* Row 1: 5 cells, cell 2 spans 2 cols */}
          <div style={{ background: "white" }} />
          <div style={{ background: "white", gridColumn: "span 2" }} />
          <div style={{ background: "white" }} />
          <div style={{ background: "white" }} />
          {/* Row 2: 4 cells, cell 1 spans 2 rows */}
          <div style={{ background: "white", gridRow: "span 2" }} />
          <div style={{ background: "white" }} />
          <div style={{ background: "white" }} />
          <div style={{ background: "white", gridColumn: "span 2" }} />
          {/* Row 3: 4 cells (col 1 occupied by row-span) */}
          <div style={{ background: "white" }} />
          <div style={{ background: "white", gridColumn: "span 2" }} />
          <div style={{ background: "white" }} />
          {/* Row 4: 5 cells */}
          <div style={{ background: "white" }} />
          <div style={{ background: "white" }} />
          <div style={{ background: "white" }} />
          <div style={{ background: "white" }} />
          <div style={{ background: "white" }} />
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
