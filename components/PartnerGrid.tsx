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
/*  SVG Grid geometry                                                  */
/* ------------------------------------------------------------------ */

// Asymmetric grid intersection points
const COLS = [0, 300, 600, 1000, 1400];
const ROWS = [0, 220, 430, 630, 800];
const N_COLS = COLS.length - 1; // 4
const N_ROWS = ROWS.length - 1; // 4
const TOTAL = N_COLS * N_ROWS; // 16

// Build SVG path for one cell from animated curve state
function cellPath(
  r: number,
  c: number,
  hc: number[], // horizontal curve offsets per row line (5 values)
  vc: number[], // vertical curve offsets per col line (5 values)
  g: number // gap (half the purple line width)
): string {
  const x1 = COLS[c] + g;
  const x2 = COLS[c + 1] - g;
  const y1 = ROWS[r] + g;
  const y2 = ROWS[r + 1] - g;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  // Each edge is a quadratic bezier (Q). Control point shifts create curves.
  // Top edge (left→right): control Y shifts down by hc[r]
  // Right edge (top→bottom): control X shifts by vc[c+1]
  // Bottom edge (right→left): control Y shifts down by hc[r+1]
  // Left edge (bottom→top): control X shifts by vc[c]
  return [
    `M${x1},${y1}`,
    `Q${mx},${y1 + hc[r]},${x2},${y1}`,
    `Q${x2 + vc[c + 1]},${my},${x2},${y2}`,
    `Q${mx},${y2 + hc[r + 1]},${x1},${y2}`,
    `Q${x1 + vc[c]},${my},${x1},${y1}`,
    "Z",
  ].join(" ");
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PartnerGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const svgWrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const whiteOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const showcase = showcaseRef.current;
    const svgWrap = svgWrapRef.current;
    const svg = svgRef.current;
    const whiteOverlay = whiteOverlayRef.current;
    if (!section || !sticky || !showcase || !svgWrap || !svg || !whiteOverlay)
      return;

    const cards = showcase.querySelectorAll<HTMLElement>(".partner-card");
    const statsEls = showcase.querySelectorAll<HTMLElement>(".stat-item");
    const titleEl = showcase.querySelector<HTMLElement>(".results-title");
    const paths = svg.querySelectorAll<SVGPathElement>(".cell-path");

    // Animated state — GSAP tweens these values, onUpdate rebuilds paths
    const st = {
      h0: 0, h1: 0, h2: 0, h3: 0, h4: 0, // horiz curve per row-line
      v0: 0, v1: 0, v2: 0, v3: 0, v4: 0, // vert curve per col-line
      gap: 3,
    };

    function rebuild() {
      const hc = [st.h0, st.h1, st.h2, st.h3, st.h4];
      const vc = [st.v0, st.v1, st.v2, st.v3, st.v4];
      let i = 0;
      for (let r = 0; r < N_ROWS; r++) {
        for (let c = 0; c < N_COLS; c++) {
          paths[i].setAttribute("d", cellPath(r, c, hc, vc, st.gap));
          i++;
        }
      }
    }

    // Initial straight render
    rebuild();

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
       * 400vh section → sticky unpins at 75% scroll.
       * All visible animation must finish by ~0.70.
       * Timeline padded to 1.0 via spacer.
       */

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

      /* ---- Phase B (0.12 → 0.18): Grid appears (straight lines) ---- */

      tl.to(showcase, { opacity: 0, duration: 0.03 }, 0.12);
      tl.fromTo(
        svgWrap,
        { opacity: 0 },
        { opacity: 1, duration: 0.04 },
        0.14
      );

      /* ---- Phase C (0.18 → 0.40): Curves develop ---- */
      /*
       * Horizontal lines bow downward (hN > 0).
       * Middle lines curve most, edges curve least — gravity feel.
       * Vertical lines lean slightly (vN shifts X).
       */

      tl.to(
        st,
        {
          h0: 15,
          h1: 70,
          h2: 140,
          h3: 100,
          h4: 40,
          v0: -10,
          v1: -25,
          v2: 15,
          v3: 20,
          v4: 10,
          duration: 0.22,
          ease: "power1.inOut",
          onUpdate: rebuild,
        },
        0.18
      );

      /* ---- Phase D (0.40 → 0.55): Lines thicken ---- */
      /*
       * Gap grows from 3 → 60, making purple "rivers" between cells
       * much thicker. Curves intensify slightly more.
       */

      tl.to(
        st,
        {
          gap: 60,
          h0: 25,
          h1: 100,
          h2: 190,
          h3: 140,
          h4: 60,
          v0: -15,
          v1: -40,
          v2: 20,
          v3: 35,
          v4: 15,
          duration: 0.15,
          ease: "power2.in",
          onUpdate: rebuild,
        },
        0.40
      );

      /* ---- Phase E (0.55 → 0.64): White takeover ---- */

      // Sticky bg → white
      tl.to(
        sticky,
        { backgroundColor: "#ffffff", duration: 0.05, ease: "none" },
        0.55
      );

      // Cell fills → white (they're already white, but change stroke-like appearance)
      // Shrink cells to nothing by maxing gap
      tl.to(
        st,
        {
          gap: 400,
          duration: 0.06,
          ease: "power2.in",
          onUpdate: rebuild,
        },
        0.56
      );

      // White overlay guarantee
      tl.to(
        whiteOverlay,
        { opacity: 1, duration: 0.03, ease: "power2.in" },
        0.60
      );

      /* ---- Phase F (0.64 → 1.0): Clean exit ---- */
      tl.to(svgWrap, { opacity: 0, duration: 0.02 }, 0.64);
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

        {/* SVG Grid — cells are white paths, purple bg shows as "lines" */}
        <div
          ref={svgWrapRef}
          className="absolute inset-0"
          style={{ opacity: 0 }}
        >
          <svg
            ref={svgRef}
            viewBox="0 0 1400 800"
            preserveAspectRatio="none"
            width="100%"
            height="100%"
            style={{ display: "block" }}
          >
            {Array.from({ length: TOTAL }, (_, i) => (
              <path key={i} className="cell-path" fill="white" />
            ))}
          </svg>
        </div>

        {/* White overlay */}
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
