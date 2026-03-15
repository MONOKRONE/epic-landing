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

/* Grid cell positions — asymmetric mosaic layout (% of viewport) */
const gridCells = [
  { top: 0, left: 0, w: 25, h: 40 },
  { top: 0, left: 25, w: 35, h: 55 },
  { top: 0, left: 60, w: 25, h: 35 },
  { top: 0, left: 85, w: 15, h: 35 },
  { top: 40, left: 0, w: 20, h: 60 },
  { top: 55, left: 20, w: 30, h: 45 },
  { top: 35, left: 60, w: 25, h: 35 },
  { top: 35, left: 85, w: 15, h: 30 },
  { top: 70, left: 50, w: 35, h: 30 },
  { top: 65, left: 85, w: 15, h: 35 },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PartnerGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const purpleOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const showcase = showcaseRef.current;
    const grid = gridRef.current;
    const purpleOverlay = purpleOverlayRef.current;
    if (!section || !showcase || !grid || !purpleOverlay) return;

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

      /* ---- Phase A (0 → 0.30): Showcase — cards cascade + stats ---- */

      // Cards cascade in from left with stagger
      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { x: -300, opacity: 0, rotateZ: -15 + i * 3 },
          { x: 0, opacity: 1, rotateZ: -8 + i * 4, duration: 0.12, ease: "power2.out" },
          i * 0.03
        );
      });

      // Title fades in
      if (titleEl) {
        tl.fromTo(
          titleEl,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.1, ease: "power2.out" },
          0.02
        );
      }

      // Stats fade in staggered
      statsEls.forEach((stat, i) => {
        tl.fromTo(
          stat,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.08, ease: "power2.out" },
          0.06 + i * 0.03
        );
      });

      /* ---- Phase B (0.30 → 0.45): Crossfade — showcase out, grid in ---- */

      tl.to(showcase, { opacity: 0, duration: 0.08 }, 0.30);
      tl.fromTo(grid, { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.32);

      // Grid cells explode from center
      cells.forEach((cell, i) => {
        const finalTop = gridCells[i]?.top ?? 0;
        const finalLeft = gridCells[i]?.left ?? 0;

        tl.fromTo(
          cell,
          {
            top: "45%",
            left: "45%",
            width: "10%",
            height: "10%",
            opacity: 0,
            borderWidth: 2,
          },
          {
            top: `${finalTop}%`,
            left: `${finalLeft}%`,
            width: `${gridCells[i]?.w ?? 20}%`,
            height: `${gridCells[i]?.h ?? 20}%`,
            opacity: 1,
            borderWidth: 4,
            duration: 0.25,
            ease: "power3.out",
          },
          0.34 + i * 0.015
        );
      });

      /* ---- Phase C (0.65 → 0.88): Borders grow thick, purple dominates ---- */

      // Stage 1: borders grow from 4px → 60px
      cells.forEach((cell, i) => {
        tl.to(
          cell,
          {
            borderWidth: 60,
            borderRadius: 2,
            duration: 0.12,
            ease: "power2.in",
          },
          0.65 + i * 0.008
        );
      });

      // Stage 2: borders grow from 60px → 120px — white space nearly gone
      cells.forEach((cell, i) => {
        tl.to(
          cell,
          {
            borderWidth: 120,
            borderRadius: 0,
            duration: 0.1,
            ease: "power3.in",
          },
          0.78 + i * 0.005
        );
      });

      /* ---- Phase D (0.88 → 1.0): Cells scale up + purple overlay fills screen ---- */

      // Cells scale up slightly to close remaining gaps
      cells.forEach((cell, i) => {
        tl.to(
          cell,
          {
            scale: 1.3,
            duration: 0.08,
            ease: "power2.in",
          },
          0.88 + i * 0.003
        );
      });

      // Purple overlay fades in to solid purple — clean transition
      tl.to(
        purpleOverlay,
        {
          opacity: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.08,
          ease: "power2.in",
        },
        0.92
      );

      /* ---- Phase E (0.95 → 1.0): Diagonal wipe — purple peels away ---- */

      // Diagonal clip-path wipe: full screen → swept away top-right
      tl.to(
        purpleOverlay,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 0.05,
          ease: "power2.out",
        },
        0.95
      );
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

        {/* Phase B+C: Grid explosion */}
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

        {/* Phase D: Purple overlay — fills screen at end of animation */}
        <div
          ref={purpleOverlayRef}
          className="absolute inset-0"
          style={{
            background: "#3730a3",
            opacity: 0,
            zIndex: 10,
            pointerEvents: "none",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        />
      </div>
    </section>
  );
}
