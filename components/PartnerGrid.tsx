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
/*  Grid line definitions (normalized 0–1)                             */
/* ------------------------------------------------------------------ */

const hLines = [
  { y: 0 },
  { y: 0.22 },
  { y: 0.45 },
  { y: 0.70 },
  { y: 1.0 },
];

const vLines = [
  { x: 0 },
  { x: 0.20 },
  { x: 0.42 },
  { x: 0.65 },
  { x: 0.85 },
  { x: 1.0 },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PartnerGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const whiteOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const showcase = showcaseRef.current;
    const canvasWrap = canvasWrapRef.current;
    const canvas = canvasRef.current;
    const whiteOverlay = whiteOverlayRef.current;
    if (!section || !sticky || !showcase || !canvasWrap || !canvas || !whiteOverlay)
      return;

    const c2d = canvas.getContext("2d");
    if (!c2d) return;

    const cards = showcase.querySelectorAll<HTMLElement>(".partner-card");
    const statsEls = showcase.querySelectorAll<HTMLElement>(".stat-item");
    const titleEl = showcase.querySelector<HTMLElement>(".results-title");

    /* ---- Canvas sizing ---- */
    let w = 0;
    let h = 0;
    const dpr = window.devicePixelRatio || 1;

    function sizeCanvas() {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      c2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    sizeCanvas();

    /* ---- Animated proxy ---- */
    const anim = { progress: 0 };

    /* ---- Draw function ---- */
    // p goes from 0 (straight grid) → 1 (maximum curve + thick)
    function drawGrid(p: number) {
      c2d.clearRect(0, 0, w, h);

      // White background
      c2d.fillStyle = "#ffffff";
      c2d.fillRect(0, 0, w, h);

      // Curve amount (0→1): ramps over first 60% of progress
      const curveP = Math.min(1, p / 0.6);
      // Thicken amount (0→1): ramps over last 40% of progress
      const thickP = Math.max(0, Math.min(1, (p - 0.5) / 0.5));

      // Smoothstep easing
      const easedCurve = curveP * curveP * (3 - 2 * curveP);
      const easedThick = thickP * thickP * (3 - 2 * thickP);

      // Line width: 4px straight → 20px curved → 150px thick
      const lineWidth = 4 + easedCurve * 16 + easedThick * 130;

      c2d.strokeStyle = "#1e1b4b";
      c2d.lineWidth = lineWidth;
      c2d.lineCap = "round";
      c2d.lineJoin = "round";

      // Draw horizontal lines
      hLines.forEach((line, i) => {
        const baseY = line.y * h;
        // Middle lines (index 2) sag most, edges sag least
        const distFromCenter = Math.abs(i - 2) / 2;
        const maxSag = 180 - distFromCenter * 100;
        const sag = easedCurve * maxSag;

        c2d.beginPath();
        c2d.moveTo(-lineWidth, baseY);
        c2d.quadraticCurveTo(w * 0.5, baseY + sag, w + lineWidth, baseY);
        c2d.stroke();
      });

      // Draw vertical lines
      vLines.forEach((line) => {
        const baseX = line.x * w;
        // Outer lines lean more, direction depends on side
        const normalizedDist = (baseX - w / 2) / (w / 2 || 1);
        const lean = easedCurve * normalizedDist * 80;

        c2d.beginPath();
        c2d.moveTo(baseX, -lineWidth);
        c2d.quadraticCurveTo(baseX + lean, h * 0.5, baseX, h + lineWidth);
        c2d.stroke();
      });
    }

    // Initial draw (straight lines, but canvas is hidden)
    drawGrid(0);

    /* ---- Resize handler ---- */
    function handleResize() {
      sizeCanvas();
      drawGrid(anim.progress);
    }
    window.addEventListener("resize", handleResize);

    /* ---- GSAP animation ---- */
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

      /* ---- Phase B (0.12 → 0.25): Transition to grid ---- */

      // Fade out showcase
      tl.to(showcase, { opacity: 0, duration: 0.03 }, 0.12);

      // Sticky bg → white for the canvas phase
      tl.to(
        sticky,
        { backgroundColor: "#ffffff", duration: 0.06, ease: "none" },
        0.12
      );

      // Fade in canvas
      tl.fromTo(
        canvasWrap,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.18
      );

      /* ---- Phase C–E (0.25 → 0.75): Canvas animation via progress ---- */

      tl.to(
        anim,
        {
          progress: 1,
          duration: 0.50, // 0.25 → 0.75
          ease: "none",
          onUpdate: () => drawGrid(anim.progress),
        },
        0.25
      );

      /* ---- White takeover (0.68 → 0.75) ---- */

      tl.to(
        whiteOverlay,
        { opacity: 1, duration: 0.07, ease: "power2.in" },
        0.68
      );

      /* ---- Clean exit ---- */
      tl.to(canvasWrap, { opacity: 0, duration: 0.02 }, 0.75);
      tl.set({}, {}, 1.0); // pad timeline

    }, section);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
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

        {/* Canvas Grid */}
        <div
          ref={canvasWrapRef}
          className="absolute inset-0"
          style={{ opacity: 0 }}
        >
          <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "100%", display: "block" }}
          />
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
