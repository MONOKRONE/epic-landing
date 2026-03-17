"use client";

import { useRef, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  The single credit card that travels through the entire page        */
/*  position: fixed, z-index: 50                                      */
/*  5 Waypoints controlled by GSAP ScrollTrigger (scrub: 2)           */
/*                                                                     */
/*  WP1: Hero — right side, behind photo, large                        */
/*  WP2: Enterprises — right side, tilted rotateY:-15 rotateZ:8        */
/*  WP3: Features header — diagonal, rotateZ:-30 rotateX:15            */
/*  WP4: Features mid — straightened, sliding to center                */
/*  WP5: Features end — expands to fill screen → Tailored bg           */
/* ------------------------------------------------------------------ */

export default function FloatingCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const purpleBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Delay slightly for DOM sections to mount
    const initTimer = setTimeout(() => {
      const ctx = gsap.context(() => {
        /* --- Find sections --- */
        const heroEl = document.getElementById("hero");
        const enterprisesEl = document.getElementById("enterprises");
        const featuresEl = document.getElementById("features");
        const tailoredEl = document.getElementById("tailored");

        if (!heroEl || !featuresEl) {
          console.warn("FloatingCard: could not find required sections");
          return;
        }

        const endTriggerEl = tailoredEl || featuresEl;

        /* --- Entry animation --- */
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.85, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: "expo.out", delay: 0.5 }
        );

        /* --- Main scroll timeline --- */
        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroEl,
            endTrigger: endTriggerEl,
            start: "top top",
            end: "top top",
            scrub: 2,
          },
        });

        /* WP1 → WP2: Hero → Enterprises
           Card moves to RIGHT side, bigger, tilted — must not overlap left text */
        cardTl.to(card, {
          top: "15%",
          right: "4%",
          width: 480,
          height: 311,
          rotateY: -15,
          rotateZ: 8,
          rotateX: 5,
          zIndex: 50,
          duration: 1,
          ease: "power2.inOut",
        });

        /* WP2 → WP3: Enterprises → Features header
           Card stays RIGHT, diagonal tilt, chip upper-left */
        cardTl.to(card, {
          top: "12%",
          right: "5%",
          width: 420,
          height: 272,
          rotateZ: -25,
          rotateX: 12,
          rotateY: 0,
          duration: 1,
          ease: "power2.inOut",
        });

        /* WP3 → WP4: Features isometric — card shrinks, hugs FAR RIGHT
           Smaller so it doesn't dominate the isometric devices */
        cardTl.to(card, {
          top: "10%",
          right: "2%",
          width: 250,
          height: 162,
          rotateZ: 5,
          rotateX: 0,
          rotateY: -8,
          duration: 1,
          ease: "power2.inOut",
        });

        /* WP4 → WP5: Card grows slightly before explosion to fullscreen */
        cardTl.to(card, {
          top: "15%",
          right: "5%",
          width: 340,
          height: 220,
          rotateZ: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });

        /* WP5: Expansion — card becomes full-screen purple bg */
        cardTl.to(card, {
          top: "50%",
          left: "50%",
          right: "auto",
          xPercent: -50,
          yPercent: -50,
          width: "110vw",
          height: "110vh",
          borderRadius: 0,
          duration: 1.5,
          ease: "power3.inOut",
          onStart: () => {
            // Switch to left-based positioning
            gsap.set(card, { right: "auto" });
          },
          onUpdate: function () {
            const p = this.progress();
            // Crossfade: image → purple bg
            const fadeP = Math.max(0, Math.min(1, (p - 0.2) / 0.5));
            if (imgRef.current) imgRef.current.style.opacity = `${1 - fadeP}`;
            if (purpleBgRef.current) purpleBgRef.current.style.opacity = `${fadeP}`;
          },
        });

        /* --- Keep card as Tailored background --- */
        if (tailoredEl) {
          ScrollTrigger.create({
            trigger: tailoredEl,
            start: "top 10%",
            end: "bottom bottom",
            onEnter: () => {
              gsap.set(card, {
                top: 0,
                left: 0,
                right: "auto",
                xPercent: 0,
                yPercent: 0,
                width: "100vw",
                height: "100vh",
                borderRadius: 0,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                zIndex: 40,
              });
              if (imgRef.current) imgRef.current.style.opacity = "0";
              if (purpleBgRef.current) purpleBgRef.current.style.opacity = "1";
            },
            onLeaveBack: () => {
              gsap.set(card, { zIndex: 50 }); // stays in front when scrolling back from tailored
            },
            onLeave: () => {
              // Hide card after Tailored ends
              gsap.to(card, { opacity: 0, duration: 0.3 });
            },
            onEnterBack: () => {
              gsap.to(card, { opacity: 1, duration: 0.3 });
            },
          });
        }
      });

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(initTimer);
  }, []);

  return (
    <div
      ref={cardRef}
      className="pointer-events-none"
      style={{
        position: "fixed",
        top: "8%",
        right: "4%",
        width: 480,
        height: 370,
        zIndex: 1,
        willChange: "transform, width, height, top, right, left, border-radius",
        transformStyle: "preserve-3d",
        borderRadius: 16,
        overflow: "hidden",
        opacity: 0,
      }}
    >
      {/* Money stack image */}
      <img
        ref={imgRef}
        src="/png/money-stack.png"
        alt="Stack of hundred dollar bills"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          zIndex: 2,
        }}
      />

      {/* Purple background — revealed during expansion */}
      <div
        ref={purpleBgRef}
        className="absolute inset-0"
        style={{
          background: "#1e1b4b",
          opacity: 0,
          zIndex: 1,
        }}
      />
    </div>
  );
}
