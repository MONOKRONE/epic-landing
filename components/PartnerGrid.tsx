"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function PartnerGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const whiteOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const whiteOverlay = whiteOverlayRef.current;
    if (!section || !grid || !whiteOverlay) return;

    const ctx = gsap.context(() => {
      // Tween 1: Zoom the grid
      gsap.fromTo(
        grid,
        { scale: 1 },
        {
          scale: 20,
          ease: "power2.in",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // Tween 2: White overlay fade-in
      gsap.fromTo(
        whiteOverlay,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "power2.in",
          scrollTrigger: {
            trigger: section,
            start: "70% top",
            end: "85% top",
            scrub: 1.5,
          },
        }
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
        {/* Masonry grid */}
        <div
          ref={gridRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            gap: 6,
            background: "#1e1b4b",
            padding: 6,
            transformOrigin: "55% 75%",
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
