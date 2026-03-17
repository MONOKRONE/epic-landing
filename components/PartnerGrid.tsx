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

/*
 * Asymmetric grid rows — each row has cells with fr-based widths.
 * Using CSS Grid (not absolute positioning) so cells share borders
 * and create natural grid lines that curve under 3D perspective.
 */
const gridRows = [
  { cells: [{ fr: 2 }, { fr: 4 }, { fr: 4 }], height: "22%" },
  { cells: [{ fr: 3 }, { fr: 3 }, { fr: 4 }], height: "28%" },
  { cells: [{ fr: 1 }, { fr: 1 }, { fr: 1 }, { fr: 1 }], height: "26%" },
  { cells: [{ fr: 6 }, { fr: 4 }], height: "24%" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PartnerGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const perspectiveRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const whiteOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const showcase = showcaseRef.current;
    const perspective = perspectiveRef.current;
    const grid = gridRef.current;
    const whiteOverlay = whiteOverlayRef.current;
    if (!section || !sticky || !showcase || !perspective || !grid || !whiteOverlay)
      return;

    const cards = showcase.querySelectorAll<HTMLElement>(".partner-card");
    const statsEls = showcase.querySelectorAll<HTMLElement>(".stat-item");
    const titleEl = showcase.querySelector<HTMLElement>(".results-title");
    const cells = grid.querySelectorAll<HTMLElement>(".grid-cell");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /*
       * Timeline positions = "seconds". GSAP normalizes 0→totalDuration
       * to 0%→100% scroll. We pad to 1.0 so positions ≈ scroll %.
       * Sticky unpins at ~67%, so visible animation must end by ~0.60.
       */

      /* ---- Phase A (0 → 0.15): Showcase ---- */

      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { x: -300, opacity: 0, rotateZ: -15 + i * 3 },
          {
            x: 0,
            opacity: 1,
            rotateZ: -8 + i * 4,
            duration: 0.08,
            ease: "power2.out",
          },
          i * 0.025
        );
      });

      if (titleEl) {
        tl.fromTo(
          titleEl,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.06, ease: "power2.out" },
          0.02
        );
      }

      statsEls.forEach((stat, i) => {
        tl.fromTo(
          stat,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.05, ease: "power2.out" },
          0.04 + i * 0.025
        );
      });

      /* ---- Phase B (0.15 → 0.22): Grid appears flat ---- */

      tl.to(showcase, { opacity: 0, duration: 0.04 }, 0.15);
      tl.fromTo(
        perspective,
        { opacity: 0 },
        { opacity: 1, duration: 0.04 },
        0.17
      );

      /* ---- Phase C (0.22 → 0.40): 3D perspective curve ---- */
      /*
       * Animate rotateX on the grid container. With perspective on
       * the parent, straight grid borders APPEAR curved — this is
       * the exact technique Marqeta uses.
       */

      tl.to(
        grid,
        {
          rotateX: 50,
          translateY: -80,
          translateZ: -200,
          duration: 0.18,
          ease: "power1.inOut",
        },
        0.22
      );

      /* ---- Phase D (0.38 → 0.52): Borders grow thick ---- */

      // Stage 1: 4px → 20px
      cells.forEach((cell) => {
        tl.to(
          cell,
          { borderWidth: 20, duration: 0.06, ease: "power2.in" },
          0.38
        );
      });

      // Stage 2: 20px → 60px
      cells.forEach((cell) => {
        tl.to(
          cell,
          { borderWidth: 60, duration: 0.05, ease: "power2.in" },
          0.44
        );
      });

      // Stage 3: 60px → 120px — cells become mostly solid purple
      cells.forEach((cell) => {
        tl.to(
          cell,
          { borderWidth: 120, duration: 0.04, ease: "power3.in" },
          0.49
        );
      });

      /* ---- Phase E (0.52 → 0.58): White takeover ---- */

      // Flatten the grid back while transitioning to white
      tl.to(
        grid,
        {
          rotateX: 0,
          translateY: 0,
          translateZ: 0,
          duration: 0.06,
          ease: "power2.out",
        },
        0.52
      );

      // All borders → white
      cells.forEach((cell) => {
        tl.to(
          cell,
          { borderColor: "#ffffff", duration: 0.04, ease: "none" },
          0.52
        );
      });

      // Sticky bg → white
      tl.to(
        sticky,
        { backgroundColor: "#ffffff", duration: 0.04, ease: "none" },
        0.52
      );

      // White overlay for guaranteed coverage
      tl.to(
        whiteOverlay,
        { opacity: 1, duration: 0.03, ease: "power2.in" },
        0.55
      );

      /* ---- Phase F (0.58 → 1.0): Clean exit ---- */
      tl.to(perspective, { opacity: 0, duration: 0.02 }, 0.58);
      tl.set({}, {}, 1.0); // pad timeline
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "300vh", zIndex: 52, position: "relative" }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: "#1e1b4b" }}
      >
        {/* Phase A: Showcase — partner cards + stats */}
        <div
          ref={showcaseRef}
          className="absolute inset-0 flex items-center"
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Cascading partner cards */}
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

              {/* Right: Title + stats */}
              <div>
                <h2
                  className="results-title text-4xl md:text-5xl font-bold text-white mb-12"
                  style={{ opacity: 0 }}
                >
                  The results speak for themselves
                </h2>

                <div className="space-y-8">
                  {stats.map((stat, i) => (
                    <div
                      key={i}
                      className="stat-item"
                      style={{ opacity: 0 }}
                    >
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

        {/* Perspective wrapper — creates the 3D space */}
        <div
          ref={perspectiveRef}
          className="absolute inset-0"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "center 30%",
            opacity: 0,
          }}
        >
          {/* Grid container — gets rotateX animated for curved effect */}
          <div
            ref={gridRef}
            style={{
              transformStyle: "preserve-3d",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {gridRows.map((row, ri) => (
              <div
                key={ri}
                style={{
                  display: "grid",
                  gridTemplateColumns: row.cells
                    .map((c) => `${c.fr}fr`)
                    .join(" "),
                  height: row.height,
                  flex: "none",
                }}
              >
                {row.cells.map((_, ci) => (
                  <div
                    key={ci}
                    className="grid-cell"
                    style={{
                      background: "white",
                      border: "4px solid #3730a3",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* White overlay — clean fill at end */}
        <div
          ref={whiteOverlayRef}
          className="absolute inset-0"
          style={{
            background: "white",
            opacity: 0,
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
      </div>
    </section>
  );
}
