"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const rotatingWords = [
  "loan payoffs",
  "lien releases",
  "dealer funding",
  "title processing",
  "payoff automation",
];

/* ------------------------------------------------------------------ */
/*  Tiny SVG helpers                                                   */
/* ------------------------------------------------------------------ */

function CheckCircle() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="14" cy="14" r="14" fill="#22c55e" />
      <path
        d="M9 14.5l3.5 3.5L19 11"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronUp({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className={className}
    >
      <path
        d="M3 7.5L6 4.5L9 7.5"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Bar chart data for Monthly Payoffs card                            */
/* ------------------------------------------------------------------ */

const barHeights = [40, 55, 35, 60, 48, 72]; // percentage heights
const barColors = [
  "#c7d2fe",
  "#c7d2fe",
  "#c7d2fe",
  "#c7d2fe",
  "#c7d2fe",
  "#4f46e5",
];

/* ------------------------------------------------------------------ */
/*  Hero Component                                                     */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const bgOrbsRef = useRef<HTMLDivElement>(null);

  // Floating element refs
  const photoRef = useRef<HTMLDivElement>(null);
  const svgRibbonRef = useRef<SVGSVGElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);


  // Rotating words
  const [wordIndex, setWordIndex] = useState(0);
  const wordContainerRef = useRef<HTMLSpanElement>(null);

  /* ---- Rotating words interval ---- */
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  /* ---- Mouse parallax ---- */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = hero.getBoundingClientRect();
      const x = (clientX - rect.left - rect.width / 2) / rect.width;
      const y = (clientY - rect.top - rect.height / 2) / rect.height;

      // Photo bg — very subtle
      gsap.to(photoRef.current, {
        x: x * 6,
        y: y * 6,
        duration: 0.6,
        ease: "power2.out",
      });
      // Notification — medium
      gsap.to(notifRef.current, {
        x: x * 20,
        y: y * 20,
        duration: 0.6,
        ease: "power2.out",
      });
      // Ledger — medium
      gsap.to(ledgerRef.current, {
        x: x * 15,
        y: y * 15,
        duration: 0.6,
        ease: "power2.out",
      });
      // Chart — most responsive
      gsap.to(graphRef.current, {
        x: x * 25,
        y: y * 25,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return () => hero.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* ---- Scroll parallax + entry animations + scroll card ---- */
  useEffect(() => {
    // Entry animations via CSS transitions (avoids GSAP scroll conflicts)
    const entryEls = [
      { el: leftContentRef.current, delay: 100 },
      { el: photoRef.current, delay: 150 },
      { el: notifRef.current, delay: 350 },
      { el: ledgerRef.current, delay: 450 },
      { el: graphRef.current, delay: 550 },
    ];

    const entryTimers: ReturnType<typeof setTimeout>[] = [];
    entryEls.forEach(({ el, delay }) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
      const timer = setTimeout(() => {
        el.style.transition =
          "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0px)";
      }, delay);
      entryTimers.push(timer);
    });

    // Scroll-based animations
    const scrollAnims: gsap.core.Tween[] = [];

    // Background orbs scroll parallax
    scrollAnims.push(
      gsap.to(bgOrbsRef.current, {
        y: 200,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    );

    // Left content scroll parallax
    scrollAnims.push(
      gsap.to(leftContentRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    );

    // Photo: moves toward top-right and shrinks on scroll
    scrollAnims.push(
      gsap.fromTo(photoRef.current,
        { x: 0, y: 0, scale: 1, opacity: 1 },
        {
          x: 150,
          y: -100,
          scale: 0.7,
          opacity: 0,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        }
      )
    );

    // SVG ribbon: fade out as hero scrolls away
    if (svgRibbonRef.current) {
      scrollAnims.push(
        gsap.fromTo(svgRibbonRef.current,
          { opacity: 1 },
          {
            opacity: 0,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "60% top",
              scrub: 2,
            },
          }
        )
      );
    }

    // Floating UI cards: fade out with the photo
    [notifRef, ledgerRef, graphRef].forEach((ref) => {
      scrollAnims.push(
        gsap.fromTo(ref.current,
          { y: 0, opacity: 1 },
          {
            y: -80,
            opacity: 0,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "60% top",
              scrub: 2,
            },
          }
        )
      );
    });

    return () => {
      entryTimers.forEach((t) => clearTimeout(t));
      scrollAnims.forEach((a) => a.kill());
      // Only kill our own ScrollTriggers, not global ones (FloatingCard etc.)
      scrollAnims.forEach((a) => {
        if (a.scrollTrigger) a.scrollTrigger.kill();
      });
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen overflow-visible pt-[72px]"
      style={{ background: "var(--color-bg)" }}
    >
      {/* ---- Background gradient orbs ---- */}
      <div
        ref={bgOrbsRef}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-[0.07] blur-[120px]"
          style={{ background: "var(--navy)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[100px]"
          style={{ background: "var(--teal)" }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-[calc(100vh-72px)]">
          {/* ============ Left: Content ============ */}
          <div ref={leftContentRef} className="pt-12 lg:pt-0">
            <h1 className="text-5xl md:text-6xl lg:text-[72px] font-bold leading-[1.05] tracking-tight">
              <span style={{ color: "var(--navy)" }}>The next era of</span>
              <br />
              <span
                ref={wordContainerRef}
                className="relative inline-block overflow-hidden align-bottom"
                style={{ height: "1.2em", minWidth: "500px" }}
              >
                {rotatingWords.map((word, i) => {
                  const isCurrent = i === wordIndex;
                  const isPast =
                    i < wordIndex ||
                    (wordIndex === 0 && i === rotatingWords.length - 1 && i !== 0);

                  let translateY = "100%"; // future: enter from below
                  if (isCurrent) translateY = "0%";
                  else if (isPast) translateY = "-100%";

                  return (
                    <span
                      key={word}
                      className="absolute left-0 top-0 whitespace-nowrap"
                      style={{
                        color: "var(--teal)",
                        transform: `translateY(${translateY})`,
                        opacity: isCurrent ? 1 : 0,
                        transition:
                          "transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.5s cubic-bezier(0.16,1,0.3,1)",
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </span>
            </h1>

            <p
              className="mt-6 text-lg md:text-xl leading-relaxed max-w-lg"
              style={{ color: "var(--color-text-light)" }}
            >
              Streamline every loan payoff from quote to funding with
              the nation's largest dealer-to-lender payoff network.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center px-7 py-3.5 text-base font-medium text-white rounded-full transition-all hover:opacity-90 hover:shadow-xl"
                style={{
                  background: "var(--navy)",
                  boxShadow: "0 4px 14px rgba(42,32,106,0.25)",
                }}
              >
                Request a demo
              </a>
              <a
                href="#"
                className="inline-flex items-center px-7 py-3.5 text-base font-medium rounded-full border-2 transition-all hover:bg-slate-50"
                style={{
                  color: "var(--navy)",
                  borderColor: "var(--gray-300)",
                }}
              >
                Learn more
              </a>
            </div>
          </div>

          {/* ============ Right: Photo + Floating UI Elements ============ */}
          <div
            ref={heroRightRef}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <div
              className="relative"
              style={{
                width: "580px",
                height: "520px",
                maxWidth: "100%",
              }}
            >
              {/* --- Decorative flowing ribbon SVG --- */}
              <svg
                ref={svgRibbonRef}
                className="absolute pointer-events-none"
                style={{
                  top: "-70%",
                  left: "-90%",
                  width: "300%",
                  height: "240%",
                  zIndex: 0,
                }}
                viewBox="0 0 1600 1000"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="heroMainGradient" x1="0.45" y1="0" x2="0.55" y2="1">
                    <stop offset="0%" stopColor="#2A206A" />
                    <stop offset="45%" stopColor="#4338a0" />
                    <stop offset="100%" stopColor="#20A472" />
                  </linearGradient>
                </defs>

                {/* ======== Thin ribbon lines (lavender/purple, 14 lines fanning out) ======== */}
                {/* Lines converge tightly at top, fan wider apart through the middle, reconverge at bottom */}
                {/* Each line has unique organic offset — wider spacing in the belly of the S-curve */}

                <path d="M700 -30 C610 110, 500 250, 560 380 C620 510, 800 510, 880 620 C960 730, 960 830, 1100 920" stroke="rgba(120,90,180,0.08)" strokeWidth="0.6" fill="none" />
                <path d="M704 -24 C612 118, 508 256, 568 388 C628 518, 806 514, 884 626 C962 736, 958 834, 1104 924" stroke="rgba(120,90,180,0.10)" strokeWidth="0.6" fill="none" />
                <path d="M697 -18 C606 126, 494 264, 556 398 C618 530, 798 520, 878 634 C958 746, 954 840, 1096 930" stroke="rgba(120,90,180,0.12)" strokeWidth="0.6" fill="none" />
                <path d="M708 -12 C618 134, 516 274, 578 410 C640 544, 816 528, 894 644 C972 758, 968 848, 1114 938" stroke="rgba(120,90,180,0.14)" strokeWidth="0.6" fill="none" />
                <path d="M694 -6 C600 142, 488 286, 550 424 C612 558, 792 538, 872 656 C952 772, 950 858, 1090 948" stroke="rgba(120,90,180,0.16)" strokeWidth="0.6" fill="none" />
                <path d="M712 0 C624 150, 524 298, 586 438 C648 572, 824 548, 902 668 C980 784, 976 866, 1122 956" stroke="rgba(120,90,180,0.18)" strokeWidth="0.6" fill="none" />
                <path d="M690 6 C594 158, 480 312, 544 454 C608 588, 786 560, 866 682 C946 800, 944 878, 1084 968" stroke="rgba(120,90,180,0.19)" strokeWidth="0.6" fill="none" />
                <path d="M716 12 C630 166, 532 326, 596 468 C660 604, 834 572, 912 694 C990 812, 986 888, 1130 976" stroke="rgba(120,90,180,0.18)" strokeWidth="0.6" fill="none" />
                <path d="M686 18 C588 174, 472 340, 538 484 C604 620, 778 586, 858 708 C938 826, 938 900, 1078 988" stroke="rgba(120,90,180,0.16)" strokeWidth="0.6" fill="none" />
                <path d="M720 24 C636 182, 540 354, 608 498 C676 636, 842 598, 920 720 C998 838, 996 910, 1138 996" stroke="rgba(120,90,180,0.14)" strokeWidth="0.6" fill="none" />
                <path d="M682 30 C582 190, 464 368, 530 514 C596 654, 770 612, 850 734 C930 854, 930 922, 1070 1000" stroke="rgba(120,90,180,0.12)" strokeWidth="0.6" fill="none" />
                <path d="M724 36 C642 198, 548 382, 618 528 C688 668, 850 624, 928 746 C1006 866, 1004 932, 1146 1000" stroke="rgba(120,90,180,0.10)" strokeWidth="0.6" fill="none" />
                <path d="M678 42 C576 206, 456 396, 524 544 C592 686, 764 638, 844 760 C924 880, 924 944, 1064 1000" stroke="rgba(120,90,180,0.08)" strokeWidth="0.6" fill="none" />
                <path d="M728 48 C648 214, 556 410, 628 558 C700 700, 858 650, 936 772 C1014 892, 1012 954, 1152 1000" stroke="rgba(120,90,180,0.06)" strokeWidth="0.6" fill="none" />

                {/* ======== Main bold gradient curve (sits at the leading edge of the ribbon) ======== */}
                <path
                  d="M700 -30 C610 110, 500 250, 560 380 C620 510, 800 510, 880 620 C960 730, 960 830, 1100 920"
                  stroke="url(#heroMainGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>

              {/* --- Main Background Photo --- */}
              <div
                ref={photoRef}
                className="absolute inset-0 overflow-hidden"
                style={{
                  borderRadius: 16,
                  boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
                  zIndex: 2,
                }}
              >
                <Image
                  src="/png/top-photo.png"
                  alt="Customer using mobile payment"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* --- 1. Lien Released Notification (top-left) --- */}
              <div
                ref={notifRef}
                className="absolute"
                style={{
                  top: -10,
                  left: -30,
                  zIndex: 3,
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.96)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    borderRadius: 14,
                    boxShadow:
                      "0 8px 32px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)",
                    padding: "16px 22px",
                    minWidth: 220,
                  }}
                >
                  <div
                    className="flex items-center gap-1.5 mb-2"
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: "#94a3b8",
                      textTransform: "uppercase",
                    }}
                  >
                    Notification
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle />
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#1e293b",
                      }}
                    >
                      Lien Released
                    </span>
                  </div>
                </div>
              </div>

              {/* --- 2. Recent Payoffs Ledger (bottom-left) --- */}
              <div
                ref={ledgerRef}
                className="absolute"
                style={{
                  bottom: -20,
                  left: -40,
                  zIndex: 3,
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.96)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    borderRadius: 14,
                    boxShadow:
                      "0 8px 32px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)",
                    padding: "16px 22px",
                    minWidth: 250,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      marginBottom: 12,
                    }}
                  >
                    Recent Payoffs
                  </div>

                  {/* Row 1 */}
                  <div className="flex items-center justify-between">
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#1e293b",
                      }}
                    >
                      Toyota Camry
                    </div>
                    <div className="flex items-center gap-1">
                      <ChevronUp />
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#22c55e",
                        }}
                      >
                        +$14,250
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      height: 1,
                      background: "#f1f5f9",
                      margin: "10px 0",
                    }}
                  />

                  {/* Row 2 */}
                  <div className="flex items-center justify-between">
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#1e293b",
                      }}
                    >
                      Honda Civic
                    </div>
                    <div className="flex items-center gap-1">
                      <ChevronUp />
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#22c55e",
                        }}
                      >
                        +$9,800
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- 3. Monthly Payoffs Chart (right) --- */}
              <div
                ref={graphRef}
                className="absolute"
                style={{
                  top: 120,
                  right: -40,
                  zIndex: 3,
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.96)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    borderRadius: 14,
                    boxShadow:
                      "0 8px 32px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)",
                    padding: "16px 22px",
                    minWidth: 210,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      marginBottom: 4,
                    }}
                  >
                    Monthly Payoffs
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#1e293b",
                      marginBottom: 12,
                    }}
                  >
                    $1.2M
                  </div>

                  {/* Bar chart */}
                  <div
                    className="flex items-end gap-2"
                    style={{ height: 56 }}
                  >
                    {barHeights.map((h, i) => (
                      <div
                        key={i}
                        style={{
                          width: 18,
                          height: `${h}%`,
                          borderRadius: 4,
                          background: barColors[i],
                          transition: "height 0.6s ease",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
