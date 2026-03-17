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
 * Asymmetric mosaic grid matching Marqeta's layout.
 * Values are % of viewport: { top, left, w, h, row }
 * "row" groups cells for the arc motion phase.
 */
const gridCells = [
  // Row 0 — top
  { top: 0, left: 0, w: 20, h: 28, row: 0 },
  { top: 0, left: 20, w: 30, h: 40, row: 0 },
  { top: 0, left: 50, w: 28, h: 32, row: 0 },
  { top: 0, left: 78, w: 22, h: 24, row: 0 },
  // Row 1 — middle
  { top: 28, left: 0, w: 20, h: 38, row: 1 },
  { top: 40, left: 20, w: 30, h: 32, row: 1 },
  { top: 32, left: 50, w: 28, h: 38, row: 1 },
  { top: 24, left: 78, w: 22, h: 40, row: 1 },
  // Row 2 — bottom
  { top: 66, left: 0, w: 20, h: 34, row: 2 },
  { top: 72, left: 20, w: 30, h: 28, row: 2 },
  { top: 70, left: 50, w: 28, h: 30, row: 2 },
  { top: 64, left: 78, w: 22, h: 36, row: 2 },
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
       * Timeline positions are in "seconds". GSAP normalizes
       * 0 → totalDuration to 0% → 100% scroll progress.
       * We pad to 1.0 so positions map ~1:1 to scroll %.
       * Sticky unpins at ~67% scroll, so all visible animation
       * must complete before position 0.60.
       */

      /* ---- Phase A (0 → 0.15): Showcase — cards cascade + stats ---- */

      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { x: -300, opacity: 0, rotateZ: -15 + i * 3 },
          { x: 0, opacity: 1, rotateZ: -8 + i * 4, duration: 0.08, ease: "power2.out" },
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

      /* ---- Phase B (0.15 → 0.22): Transition to grid ---- */

      // Fade out showcase
      tl.to(showcase, { opacity: 0, duration: 0.04 }, 0.15);

      // Fade in grid — cells start at opacity 0 individually
      tl.fromTo(grid, { opacity: 0 }, { opacity: 1, duration: 0.03 }, 0.17);
      cells.forEach((cell, i) => {
        tl.fromTo(
          cell,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.04, ease: "power2.out" },
          0.18 + i * 0.003
        );
      });

      /* ---- Phase C (0.24 → 0.38): Arc/curve motion ---- */
      /*
       * Each row translates downward at a different rate.
       * Row 0 (top) moves most, row 2 (bottom) moves least.
       * This creates a curved/arc/bending effect like a sheet
       * of paper falling, matching the Marqeta reference.
       */

      const arcOffsets = [120, 60, 20]; // px offset per row

      cells.forEach((cell, i) => {
        const cellRow = gridCells[i].row;
        const yOffset = arcOffsets[cellRow];
        // Also shift horizontally for organic feel
        const xShift = (cellRow === 0 ? -10 : cellRow === 1 ? 5 : 15);

        tl.to(
          cell,
          {
            y: yOffset,
            x: xShift,
            duration: 0.12,
            ease: "power1.inOut",
          },
          0.24
        );
      });

      /* ---- Phase D (0.36 → 0.50): Borders consume cells ---- */

      // Stage 1: borders 4px → 20px
      cells.forEach((cell, i) => {
        tl.to(
          cell,
          { borderWidth: 20, borderRadius: 4, duration: 0.06, ease: "power2.in" },
          0.36 + i * 0.002
        );
      });

      // Stage 2: borders 20px → 60px
      cells.forEach((cell, i) => {
        tl.to(
          cell,
          { borderWidth: 60, borderRadius: 2, duration: 0.05, ease: "power2.in" },
          0.42 + i * 0.002
        );
      });

      // Stage 3: borders 60px → 150px — cells become solid purple
      cells.forEach((cell, i) => {
        tl.to(
          cell,
          { borderWidth: 150, borderRadius: 0, duration: 0.05, ease: "power3.in" },
          0.47 + i * 0.001
        );
      });

      /* ---- Phase E (0.52 → 0.58): White takeover ---- */

      // All borders: purple → white
      cells.forEach((cell) => {
        tl.to(cell, { borderColor: "#ffffff", duration: 0.04, ease: "none" }, 0.52);
      });
      // Sticky bg: navy → white
      tl.to(sticky, { backgroundColor: "#ffffff", duration: 0.04, ease: "none" }, 0.52);
      // White overlay for guaranteed solid coverage
      tl.to(whiteOverlay, { opacity: 1, duration: 0.03, ease: "power2.in" }, 0.54);

      /* ---- Phase F (0.58 → 1.0): Clean exit — solid white hold ---- */
      tl.to(grid, { opacity: 0, duration: 0.02 }, 0.58);
      // Spacer: pad timeline to 1.0 so white hold persists through scroll
      tl.set({}, {}, 1.0);

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
                      boxShadow: "0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)",
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

        {/* Phase B→E: Asymmetric mosaic grid */}
        <div
          ref={gridRef}
          className="absolute inset-0"
          style={{ opacity: 0 }}
        >
          {gridCells.map((cell, i) => (
            <div
              key={i}
              className="grid-cell"
              style={{
                position: "absolute",
                top: `${cell.top}%`,
                left: `${cell.left}%`,
                width: `${cell.w}%`,
                height: `${cell.h}%`,
                background: "white",
                border: "4px solid #3730a3",
                borderRadius: 8,
                opacity: 0,
              }}
            />
          ))}
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
