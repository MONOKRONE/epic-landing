"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// ── Grid cell definitions ──────────────────────────────────────────
// 5 columns × variable rows, masonry style. Heights in abstract units.
// Grid is offset so a gap crossing sits at canvas center.
interface Cell {
  col: number;
  row: number;
  h: number; // height in units
  label?: string;
}

const CELLS: Cell[] = [
  // Column 0
  { col: 0, row: 0, h: 1.4 },
  { col: 0, row: 1, h: 1.9 },
  { col: 0, row: 2, h: 1.2 },
  { col: 0, row: 3, h: 1.5 }, // phantom
  { col: 0, row: 4, h: 1.3 }, // phantom
  // Column 1
  { col: 1, row: 0, h: 0.9, label: "CHASE" },
  { col: 1, row: 1, h: 2.1 },
  { col: 1, row: 2, h: 1.0 },
  { col: 1, row: 3, h: 1.7 }, // phantom
  { col: 1, row: 4, h: 1.4 }, // phantom
  // Column 2
  { col: 2, row: 0, h: 1.6, label: "ALLY FINANCIAL" },
  { col: 2, row: 1, h: 1.4 },
  { col: 2, row: 2, h: 1.1 },
  { col: 2, row: 3, h: 1.6 }, // phantom
  { col: 2, row: 4, h: 1.3 }, // phantom
  // Column 3
  { col: 3, row: 0, h: 1.1 },
  { col: 3, row: 1, h: 2.2, label: "CAPITAL ONE" },
  { col: 3, row: 2, h: 0.9 },
  { col: 3, row: 3, h: 1.4 }, // phantom
  { col: 3, row: 4, h: 1.7 }, // phantom
  // Column 4
  { col: 4, row: 0, h: 1.7 },
  { col: 4, row: 1, h: 1.1 },
  { col: 4, row: 2, h: 0.9 },
  { col: 4, row: 3, h: 1.5 }, // phantom
  { col: 4, row: 4, h: 1.2 }, // phantom
];

const NUM_COLS = 5;
const GAP = 8; // px gap between cells
const BORDER_RADIUS = 20;
const FOCAL_LENGTH = 800;
const MAX_CAMERA_Z = 750;

// Column top offsets for masonry stagger (px)
const COL_OFFSETS = [0, 60, 120, 180, 240];

// ── Perspective projection ─────────────────────────────────────────
function project(
  x: number,
  y: number,
  cameraZ: number,
  cx: number,
  cy: number
) {
  const scale = FOCAL_LENGTH / (FOCAL_LENGTH - cameraZ);
  return {
    x: cx + (x - cx) * scale,
    y: cy + (y - cy) * scale,
    scale,
  };
}

// ── Rounded rect helper ────────────────────────────────────────────
function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export default function PartnerGrid() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cameraZRef = useRef(0);
  const rafRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  const logos = [
    { src: "/svg/static_svg_logo-uber.svg", alt: "Uber" },
    { src: "/svg/static_svg_logo-square.svg", alt: "Square" },
    { src: "/svg/static_svg_logo-instacart.svg", alt: "Instacart" },
    { src: "/svg/static_img_partners_WesternUnion.svg", alt: "Western Union" },
  ];

  // ── Draw one frame ───────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = sizeRef.current.w;
    const H = sizeRef.current.h;
    const dpr = window.devicePixelRatio || 1;
    const cameraZ = cameraZRef.current;
    console.log("DRAW called, cameraZ:", cameraZ, "canvas:", canvas.width, "x", canvas.height, "logical:", W, "x", H);

    // Center of canvas — offset slightly so a gap intersection is at center
    const cx = W * 0.48;
    const cy = H * 0.55;

    // Clear
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#1e1b4b";
    ctx.fillRect(0, 0, W, H);

    // Cell layout constants (in screen px at cameraZ=0)
    const totalGap = GAP * (NUM_COLS + 1);
    const colW = (W - totalGap) / NUM_COLS;
    const unitH = (H - GAP) / 5.5; // rough height unit

    // Sort cells by projected scale (back-to-front isn't needed since all at z=0,
    // but we draw in order)
    for (const cell of CELLS) {
      // Cell position in unprojected screen coords
      const cellX = GAP + cell.col * (colW + GAP);
      // Accumulate Y from previous cells in same column
      let cellY = GAP + COL_OFFSETS[cell.col];
      for (const prev of CELLS) {
        if (prev.col === cell.col && prev.row < cell.row) {
          cellY += prev.h * unitH + GAP;
        }
      }
      const cellW = colW;
      const cellH = cell.h * unitH;

      // Project all 4 corners
      const tl = project(cellX, cellY, cameraZ, cx, cy);
      const br = project(cellX + cellW, cellY + cellH, cameraZ, cx, cy);

      const px = tl.x;
      const py = tl.y;
      const pw = br.x - tl.x;
      const ph = br.y - tl.y;

      // Skip if entirely off-screen
      if (px + pw < -200 || px > W + 200 || py + ph < -200 || py > H + 200)
        continue;
      if (pw < 0.5 || ph < 0.5) continue;

      // Draw rounded rect
      const r = Math.max(1, BORDER_RADIUS * tl.scale);
      ctx.fillStyle = "#ffffff";
      roundedRect(ctx, px, py, pw, ph, r);
      ctx.fill();

      // Draw label if present and still readable
      if (cell.label && tl.scale > 0.3 && tl.scale < 4) {
        const fontSize = Math.max(8, 14 * tl.scale);
        const labelOpacity = tl.scale > 3 ? Math.max(0, 1 - (tl.scale - 3)) : 1;
        ctx.fillStyle = `rgba(156, 163, 175, ${labelOpacity})`;
        ctx.font = `700 ${fontSize}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.letterSpacing = `${2 * tl.scale}px`;
        ctx.fillText(cell.label, px + pw / 2, py + ph / 2);
      }
    }
  }, []);

  // ── Resize handler ───────────────────────────────────────────────
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = window.devicePixelRatio || 1;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    sizeRef.current = { w, h };
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    draw();
  }, [draw]);

  // ── Setup GSAP + canvas ──────────────────────────────────────────
  useEffect(() => {
    console.log("CANVAS INIT");
    const wrapper = wrapperRef.current;
    const overlay = overlayRef.current;
    if (!wrapper || !overlay) return;

    handleResize();
    const canvas = canvasRef.current;
    console.log("CANVAS SIZE:", canvas?.width, canvas?.height, canvas?.clientWidth, canvas?.clientHeight);
    window.addEventListener("resize", handleResize);

    const progressObj = { value: 0 };

    const ctx = gsap.context(() => {
      // Drive camera position via scroll
      gsap.to(progressObj, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          onUpdate: (self) => {
            progressObj.value = self.progress;
            cameraZRef.current = self.progress * MAX_CAMERA_Z;
            console.log("SCROLL progress:", self.progress.toFixed(3), "cameraZ:", cameraZRef.current.toFixed(1));
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(draw);
          },
        },
      });

      // White overlay fade
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: wrapper,
            start: "65% top",
            end: "80% top",
            scrub: 1,
          },
        }
      );
    }, wrapper);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafRef.current);
      ctx.revert();
    };
  }, [draw, handleResize]);

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

      {/* PART 2: Canvas perspective grid zoom — desktop only */}
      <div ref={wrapperRef} className="hidden lg:block h-[300vh]">
        <div
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ background: "#1e1b4b" }}
        >
          <canvas
            ref={canvasRef}
            style={{ display: "block", width: "100%", height: "100%" }}
          />

          {/* White overlay */}
          <div
            ref={overlayRef}
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
