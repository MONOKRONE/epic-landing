"use client";

import { useRef, useEffect, forwardRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const NUM_ROWS = 7;

export default function PartnerGrid() {
  const gridWrapperRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const whiteOverlayRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const gridWrapper = gridWrapperRef.current;
    const grid = gridRef.current;
    const whiteOverlay = whiteOverlayRef.current;
    if (!gridWrapper || !grid || !whiteOverlay) return;

    // Set initial row transforms — gentle power curve
    const bendObj = { intensity: 1 };
    const updateRows = () => {
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const rx = Math.pow(i, 1.8) * 2.5 * bendObj.intensity;
        row.style.transform = `rotateX(${rx}deg)`;
      });
    };
    updateRows();

    const ctx = gsap.context(() => {
      // Tween 1: Grid scrolls upward (no translateZ, no scale)
      gsap.fromTo(
        grid,
        { y: "0%" },
        {
          y: "-65%",
          ease: "none",
          scrollTrigger: {
            trigger: gridWrapper,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // Tween 2: Bend intensity increases on scroll
      gsap.to(bendObj, {
        intensity: 2.5,
        ease: "none",
        scrollTrigger: {
          trigger: gridWrapper,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          onUpdate: updateRows,
        },
      });

      // Tween 3: White overlay
      gsap.fromTo(
        whiteOverlay,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: gridWrapper,
            start: "78% top",
            end: "95% top",
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

      {/* PART 2: Carpet grid zoom — per-row 3D bend */}
      <div ref={gridWrapperRef} className="hidden lg:block h-[300vh]">
        <div
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{
            background: "#2A206A",
            perspective: "1200px",
            perspectiveOrigin: "50% 70%",
          }}
        >
          {/* Grid container — translateZ + scale driven by scroll */}
          <div
            ref={gridRef}
            style={{
              position: "absolute",
              inset: 0,
              transformStyle: "preserve-3d" as React.CSSProperties["transformStyle"],
              transformOrigin: "50% 0%",
              willChange: "transform",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              padding: "20px 0",
              background: "#2A206A",
            }}
          >
            {/* Row 0 — short */}
            <GridRow ref={(el) => { rowRefs.current[0] = el; }} idx={0}>
              <GridCell h={130} />
              <GridCell h={150} label="CHASE" />
              <GridCell h={130} />
              <GridCell h={160} label="ALLY FINANCIAL" />
              <GridCell h={130} />
              <GridCell h={145} label="WELLS FARGO" />
              <GridCell h={130} />
            </GridRow>
            {/* Row 1 — tall */}
            <GridRow ref={(el) => { rowRefs.current[1] = el; }} idx={1}>
              <GridCell h={200} label="BANK OF AMERICA" />
              <GridCell h={220} />
              <GridCell h={200} label="CAPITAL ONE" />
              <GridCell h={230} />
              <GridCell h={200} />
              <GridCell h={210} label="TRUIST" />
              <GridCell h={200} />
            </GridRow>
            {/* Row 2 — medium */}
            <GridRow ref={(el) => { rowRefs.current[2] = el; }} idx={2}>
              <GridCell h={160} />
              <GridCell h={175} label="US BANK" />
              <GridCell h={160} />
              <GridCell h={180} label="TD BANK" />
              <GridCell h={160} label="CITIZENS" />
              <GridCell h={170} />
              <GridCell h={160} />
            </GridRow>
            {/* Row 3 — tallest */}
            <GridRow ref={(el) => { rowRefs.current[3] = el; }} idx={3}>
              <GridCell h={220} label="PNC" />
              <GridCell h={240} />
              <GridCell h={220} />
              <GridCell h={250} label="NAVY FEDERAL" />
              <GridCell h={220} />
              <GridCell h={235} label="FIFTH THIRD" />
              <GridCell h={220} />
            </GridRow>
            {/* Row 4 — short */}
            <GridRow ref={(el) => { rowRefs.current[4] = el; }} idx={4}>
              <GridCell h={140} />
              <GridCell h={155} />
              <GridCell h={140} />
              <GridCell h={150} />
              <GridCell h={140} />
              <GridCell h={145} />
              <GridCell h={140} />
            </GridRow>
            {/* Row 5 — phantom */}
            <GridRow ref={(el) => { rowRefs.current[5] = el; }} idx={5}>
              <GridCell h={180} />
              <GridCell h={190} />
              <GridCell h={180} />
              <GridCell h={185} />
              <GridCell h={180} />
              <GridCell h={175} />
              <GridCell h={180} />
            </GridRow>
            {/* Row 6 — phantom */}
            <GridRow ref={(el) => { rowRefs.current[6] = el; }} idx={6}>
              <GridCell h={160} />
              <GridCell h={170} />
              <GridCell h={160} />
              <GridCell h={165} />
              <GridCell h={160} />
              <GridCell h={155} />
              <GridCell h={160} />
            </GridRow>
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

// ── Grid row — each row bends independently ────────────────────────
const GridRow = forwardRef<HTMLDivElement, { idx: number; children: ReactNode }>(
  ({ idx, children }, ref) => (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: 3,
        width: "160%",
        marginLeft: "-30%",
        padding: "0 8px",
        transformStyle: "preserve-3d" as React.CSSProperties["transformStyle"],
        transformOrigin: "50% 0%",
        willChange: "transform",
        // Initial bend set by useEffect
        transform: `rotateX(${Math.pow(idx, 1.8) * 2.5}deg)`,
      }}
    >
      {children}
    </div>
  )
);
GridRow.displayName = "GridRow";

// ── Grid cell ──────────────────────────────────────────────────────
function GridCell({ h, label }: { h: number; label?: string }) {
  return (
    <div
      style={{
        background: "#FAFAFA",
        borderRadius: 24,
        minHeight: h,
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {label && (
        <span
          style={{
            color: "#C4C0D4",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: 1.5,
            textAlign: "center",
            textTransform: "uppercase" as const,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
