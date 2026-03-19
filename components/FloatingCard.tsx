"use client";

import { useRef, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  The single money stack that travels through the entire page        */
/*  position: fixed, z-index: 50                                      */
/*  5 Waypoints controlled by GSAP ScrollTrigger (scrub: 2)           */
/*                                                                     */
/*  WP1: Hero — right side, behind photo, large                        */
/*  WP2: Enterprises — right side, tilted rotateY:-15 rotateZ:8        */
/*  WP3: Features header — diagonal, rotateZ:-30 rotateX:15            */
/*  WP4: Features mid — straightened, sliding to center                */
/*  WP5: Features end — expands to fill screen → Tailored bg           */
/*                                                                     */
/*  Band break: scrolling past Enterprises tears the rubber band       */
/*  Scattered bills: 6 bills fan out then fly to bank buildings        */
/* ------------------------------------------------------------------ */

const BILL_COUNT = 5;

export default function FloatingCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const purpleBgRef = useRef<HTMLDivElement>(null);
  const bandLeftRef = useRef<HTMLDivElement>(null);
  const bandRightRef = useRef<HTMLDivElement>(null);
  const bandTextRef = useRef<HTMLDivElement>(null);
  const scatteredRefs = useRef<(HTMLDivElement | null)[]>([]);

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

        /* --- Position scattered bills at stack location --- */
        scatteredRefs.current.forEach((el) => {
          if (!el) return;
          gsap.set(el, {
            top: "8%",
            right: "4%",
            left: "auto",
            opacity: 0,
          });
        });

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
          top: "20%",
          right: "4%",
          width: 400,
          height: 260,
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

        /* --- Band break animation --- */
        if (enterprisesEl) {
          // Band text fades out first
          gsap.fromTo(bandTextRef.current,
            { opacity: 1 },
            {
              opacity: 0,
              scrollTrigger: {
                trigger: enterprisesEl,
                start: "top 60%",
                end: "top 40%",
                scrub: 1,
              }
            }
          );

          // Left band half tears away to the left and behind
          gsap.fromTo(bandLeftRef.current,
            { x: 0, scaleX: 1, opacity: 1 },
            {
              x: -80,
              scaleX: 0.3,
              opacity: 0,
              scrollTrigger: {
                trigger: enterprisesEl,
                start: "top 50%",
                end: "top 20%",
                scrub: 1,
              }
            }
          );

          // Right band half tears away to the right and behind
          gsap.fromTo(bandRightRef.current,
            { x: 0, scaleX: 1, opacity: 1 },
            {
              x: 80,
              scaleX: 0.3,
              opacity: 0,
              scrollTrigger: {
                trigger: enterprisesEl,
                start: "top 50%",
                end: "top 20%",
                scrub: 1,
              }
            }
          );
        }

        /* --- Scattered bills: dynamic positioning --- */
        if (enterprisesEl && featuresEl) {
          const fanOffsets = [
            { x: -80, y: -60, rot: -15 },
            { x: -160, y: 30, rot: -30 },
            { x: -40, y: 70, rot: 8 },
            { x: -130, y: -30, rot: -22 },
            { x: -200, y: 50, rot: -12 },
          ];

          const bankDestinations = [
            { x: -950, y: -20, rot: -10 },    // Chase: top-left
            { x: -650, y: -20, rot: 8 },       // BoA: top-right
            { x: -950, y: 220, rot: -18 },     // Wells Fargo: bottom-left
            { x: -650, y: 220, rot: 12 },      // Capital One: bottom-right
            { x: -800, y: 100, rot: -5 },      // Extra: center
          ];

          scatteredRefs.current.forEach((el, i) => {
            if (!el) return;
            const dest = bankDestinations[i];

            gsap.set(el, {
              top: "28%",
              right: "5%",
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 0,
              scale: 1,
            });

            // Single timeline
            const billTl = gsap.timeline({
              scrollTrigger: {
                trigger: enterprisesEl,
                start: "top 40%",
                endTrigger: featuresEl,
                end: "top -20%",
                scrub: 1.5,
              },
            });

            // 0-25%: Appear and fan out from stack
            billTl.fromTo(el,
              { opacity: 0, x: 0, y: 0, rotation: 0, scale: 0.8 },
              { opacity: 1, x: fanOffsets[i].x, y: fanOffsets[i].y, rotation: fanOffsets[i].rot, scale: 1, duration: 0.25 },
              0
            );

            // 25-80%: Fly toward bank card
            billTl.to(el, {
              x: dest.x,
              y: dest.y,
              rotation: dest.rot,
              duration: 0.55,
              ease: "power1.inOut",
            }, 0.25);

            // 80-100%: Fade out at bank
            billTl.to(el, {
              opacity: 0,
              scale: 0.5,
              duration: 0.2,
              ease: "power2.in",
            }, 0.8);
          });
        }

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
    <div className="hidden lg:block">
      {/* Scattered bills — fly out from stack toward banks */}
      {Array.from({ length: BILL_COUNT }).map((_, i) => (
        <div
          key={`bill-${i}`}
          ref={(el) => {
            scatteredRefs.current[i] = el;
          }}
          className="pointer-events-none"
          style={{
            position: "fixed",
            width: 150,
            height: 64,
            zIndex: 40,
            opacity: 0,
            willChange: "transform, opacity",
          }}
        >
          <img
            src="/svg/bill-100.svg"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      ))}

      <div
        ref={cardRef}
        className="pointer-events-none"
        style={{
          position: "fixed",
          top: "55%",
          right: "2%",
          width: 320,
          height: 210,
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
          src="/svg/bill-stack-banded.svg"
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

        {/* Band - two halves that split on scroll */}
        <div
          ref={bandLeftRef}
          style={{
            position: "absolute",
            top: "42%",
            left: 0,
            width: "50%",
            height: "14%",
            background:
              "linear-gradient(to bottom, rgba(210,180,100,0.9), rgba(180,150,70,0.95), rgba(210,180,100,0.9))",
            borderLeft: "2px solid rgba(160,130,50,0.4)",
            zIndex: 5,
            transformOrigin: "left center",
          }}
        />
        <div
          ref={bandRightRef}
          style={{
            position: "absolute",
            top: "42%",
            right: 0,
            width: "50%",
            height: "14%",
            background:
              "linear-gradient(to bottom, rgba(210,180,100,0.9), rgba(180,150,70,0.95), rgba(210,180,100,0.9))",
            borderRight: "2px solid rgba(160,130,50,0.4)",
            zIndex: 5,
            transformOrigin: "right center",
          }}
        />

        {/* Band center text "$10,000" */}
        <div
          ref={bandTextRef}
          style={{
            position: "absolute",
            top: "42%",
            left: 0,
            right: 0,
            height: "14%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 6,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              color: "rgba(100,80,30,0.7)",
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "2px",
            }}
          >
            $10,000
          </span>
        </div>

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
    </div>
  );
}
