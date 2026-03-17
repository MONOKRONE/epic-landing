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

/* 4-column, 3-row clean grid — positions as % */
const gridCells = [
  { row: 0, col: 0 },
  { row: 0, col: 1 },
  { row: 0, col: 2 },
  { row: 0, col: 3 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
  { row: 1, col: 2 },
  { row: 1, col: 3 },
  { row: 2, col: 0 },
  { row: 2, col: 1 },
  { row: 2, col: 2 },
  { row: 2, col: 3 },
];

const COLS = 4;
const ROWS = 3;
const GAP = 1.2; // % gap between cells
const CELL_W = (100 - GAP * (COLS + 1)) / COLS; // ~23.5%
const CELL_H = (100 - GAP * (ROWS + 1)) / ROWS; // ~31.7%

function cellPos(row: number, col: number) {
  return {
    top: GAP + row * (CELL_H + GAP),
    left: GAP + col * (CELL_W + GAP),
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PartnerGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const whiteOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const showcase = showcaseRef.current;
    const grid = gridRef.current;
    const whiteOverlay = whiteOverlayRef.current;
    if (!section || !showcase || !grid || !whiteOverlay) return;

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
          scrub: 1.5,
        },
      });

      /* ---- Phase A (0 → 0.25): Showcase — cards cascade + stats ---- */

      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { x: -300, opacity: 0, rotateZ: -15 + i * 3 },
          { x: 0, opacity: 1, rotateZ: -8 + i * 4, duration: 0.12, ease: "power2.out" },
          i * 0.03
        );
      });

      if (titleEl) {
        tl.fromTo(
          titleEl,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.1, ease: "power2.out" },
          0.02
        );
      }

      statsEls.forEach((stat, i) => {
        tl.fromTo(
          stat,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.08, ease: "power2.out" },
          0.06 + i * 0.03
        );
      });

      /* ---- Phase B (0.25 → 0.45): Waterfall cascade ---- */

      // Fade out showcase
      tl.to(showcase, { opacity: 0, duration: 0.06 }, 0.25);
      // Show grid container
      tl.fromTo(grid, { opacity: 0 }, { opacity: 1, duration: 0.04 }, 0.27);

      // Cells cascade from top-center in a waterfall arc
      // Order: top-left to bottom-right, row by row for waterfall feel
      const cascadeOrder = [...gridCells].sort((a, b) =>
        a.row !== b.row ? a.row - b.row : a.col - b.col
      );

      cascadeOrder.forEach((cellDef, i) => {
        const cell = cells[cellDef.row * COLS + cellDef.col];
        if (!cell) return;

        const final = cellPos(cellDef.row, cellDef.col);

        // Start position: top center
        const startTop = -15;
        const startLeft = 38 + (Math.random() * 8); // slight horizontal spread

        // Midpoint: arc outward
        const midTop = final.top * 0.4;
        const midLeft = final.left + (final.left < 50 ? -8 : 8);

        const staggerStart = 0.29 + i * 0.012;
        const dur = 0.10;

        // Animate top (with eased curve)
        tl.fromTo(
          cell,
          { top: `${startTop}%`, opacity: 0, scale: 0.7 },
          {
            top: `${midTop}%`,
            opacity: 1,
            scale: 0.85,
            duration: dur * 0.5,
            ease: "power1.in",
          },
          staggerStart
        );
        tl.to(
          cell,
          {
            top: `${final.top}%`,
            scale: 1,
            duration: dur * 0.5,
            ease: "power2.out",
          },
          staggerStart + dur * 0.5
        );

        // Animate left (smooth arc)
        tl.fromTo(
          cell,
          { left: `${startLeft}%` },
          {
            left: `${midLeft}%`,
            duration: dur * 0.5,
            ease: "sine.out",
          },
          staggerStart
        );
        tl.to(
          cell,
          {
            left: `${final.left}%`,
            duration: dur * 0.5,
            ease: "power2.out",
          },
          staggerStart + dur * 0.5
        );
      });

      /* ---- Phase C (0.45 → 0.70): Grid settle + borders grow ---- */

      // Stage 1: borders 4px → 40px
      cells.forEach((cell, i) => {
        tl.to(
          cell,
          {
            borderWidth: 40,
            borderRadius: 2,
            duration: 0.12,
            ease: "power2.in",
          },
          0.48 + i * 0.005
        );
      });

      // Stage 2: borders 40px → 100px — white inner area shrinks
      cells.forEach((cell, i) => {
        tl.to(
          cell,
          {
            borderWidth: 100,
            borderRadius: 0,
            duration: 0.10,
            ease: "power3.in",
          },
          0.60 + i * 0.004
        );
      });

      /* ---- Phase D (0.70 → 0.85): White fill ---- */

      // Pick center cell (row 1, col 1 or 2) to grow and fill viewport
      const centerIdx = 1 * COLS + 1; // row 1, col 1
      const centerCell = cells[centerIdx];

      // Fade out all cells except center
      cells.forEach((cell, i) => {
        if (i === centerIdx) return;
        tl.to(
          cell,
          { opacity: 0, duration: 0.06, ease: "power2.in" },
          0.70 + (i % 4) * 0.005
        );
      });

      // Grow center cell to fill viewport
      if (centerCell) {
        tl.to(
          centerCell,
          {
            top: "-5%",
            left: "-5%",
            width: "110%",
            height: "110%",
            borderWidth: 0,
            borderRadius: 0,
            duration: 0.15,
            ease: "power2.inOut",
          },
          0.72
        );
      }

      // White overlay for clean fill
      tl.to(
        whiteOverlay,
        { opacity: 1, duration: 0.06, ease: "power2.in" },
        0.82
      );

      /* ---- Phase E (0.85 → 1.0): Hold white — clean exit ---- */
      // White screen holds, naturally transitions to next section

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

        {/* Phase B+C+D: Grid waterfall → borders grow → white fill */}
        <div
          ref={gridRef}
          className="absolute inset-0"
          style={{ opacity: 0 }}
        >
          {gridCells.map((cell, i) => {
            const pos = cellPos(cell.row, cell.col);
            return (
              <div
                key={i}
                className="grid-cell"
                style={{
                  position: "absolute",
                  top: `${pos.top}%`,
                  left: `${pos.left}%`,
                  width: `${CELL_W}%`,
                  height: `${CELL_H}%`,
                  background: "white",
                  border: "4px solid #3730a3",
                  borderRadius: 8,
                  opacity: 0,
                }}
              />
            );
          })}
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
