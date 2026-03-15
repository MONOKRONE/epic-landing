"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Feature data                                                       */
/* ------------------------------------------------------------------ */

interface FeatureItem {
  id: string;
  title: string;
  video: { show: string; hover: string; unhover: string };
  overlay: string;
  /* layout — percentage of container */
  top: number;
  left: number;
  width: number;
  height: number;
}

const features: FeatureItem[] = [
  {
    id: "cards",
    title: "Issue virtual cards",
    video: {
      show: "/mp4/features_cards_show.mp4",
      hover: "/mp4/features_cards_hover.mp4",
      unhover: "/mp4/features_cards_unhover.mp4",
    },
    overlay: "/png/marqeta-videos_img_features_cards_overlay.png",
    top: 22,
    left: 8,
    width: 42,
    height: 42,
  },
  {
    id: "controls",
    title: "Dynamic spend controls",
    video: {
      show: "/mp4/features_controls_show.mp4",
      hover: "/mp4/features_controls_hover.mp4",
      unhover: "/mp4/features_controls_unhover.mp4",
    },
    overlay: "/png/marqeta-videos_img_features_controls_overlay.png",
    top: 55,
    left: 0,
    width: 38,
    height: 45,
  },
  {
    id: "widgets",
    title: "PCI widgets",
    video: {
      show: "/mp4/features_widgets_show.mp4",
      hover: "/mp4/features_widgets_hover.mp4",
      unhover: "/mp4/features_widgets_unhover.mp4",
    },
    overlay: "/png/marqeta-videos_img_features_widgets_overlay.png",
    top: 47,
    left: 31,
    width: 50,
    height: 40,
  },
  {
    id: "funding",
    title: "JIT Funding",
    video: {
      show: "/mp4/features_funding_show.mp4",
      hover: "/mp4/features_funding_hover.mp4",
      unhover: "/mp4/features_funding_unhover.mp4",
    },
    overlay: "/png/marqeta-videos_img_features_funding_overlay.png",
    top: 0,
    left: 53,
    width: 47,
    height: 58,
  },
];

/* ------------------------------------------------------------------ */
/*  Plus Icon SVG                                                      */
/* ------------------------------------------------------------------ */

function PlusIcon() {
  return (
    <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
      <line x1="6.5" y1="0" x2="6.5" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="0.5" y1="6" x2="12.5" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Single Feature Card                                                */
/* ------------------------------------------------------------------ */

/* Label positions — each label sits ON TOP of its isometric device */
const labelPositions: Record<string, React.CSSProperties> = {
  cards: { top: "18%", left: "18%", transform: "none" },
  funding: { top: "32%", left: "22%", transform: "none" },
  controls: { top: "20%", left: "22%", transform: "none" },
  widgets: { top: "55%", left: "28%", transform: "none" },
};

type VideoState = "static" | "showing" | "hovering" | "unhovering";

function FeatureCard({ feature }: { feature: FeatureItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stateRef = useRef<VideoState>("static");
  const [hovered, setHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  /* On mount: play the "show" video once to reveal the device,
     then pause on its last frame — that IS the visible static state.
     Also preload hover/unhover videos for instant transitions. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Preload hover + unhover
    [feature.video.hover, feature.video.unhover].forEach((src) => {
      const preload = document.createElement("video");
      preload.src = src;
      preload.preload = "auto";
      preload.muted = true;
      preload.load();
    });

    // Play show video once, pause on last frame
    v.src = feature.video.show;
    v.load();
    const onCanPlay = () => {
      v.removeEventListener("canplay", onCanPlay);
      v.play().catch(() => {});
      setVideoLoaded(true);
    };
    v.addEventListener("canplay", onCanPlay);

    // When show ends, pause on last frame (device fully visible)
    const onEnded = () => {
      v.removeEventListener("ended", onEnded);
      // Stay on last frame — don't hide or reset
      stateRef.current = "static";
    };
    v.addEventListener("ended", onEnded);

    return () => {
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("ended", onEnded);
    };
  }, [feature.video]);

  const playVideo = useCallback(
    (src: string, loop: boolean): Promise<void> => {
      return new Promise((resolve) => {
        const v = videoRef.current;
        if (!v) { resolve(); return; }

        v.src = src;
        v.loop = loop;
        v.load();
        v.currentTime = 0;

        const onCanPlay = () => {
          v.removeEventListener("canplay", onCanPlay);
          v.play().catch(() => {});
        };
        v.addEventListener("canplay", onCanPlay);

        if (!loop) {
          const onEnded = () => {
            v.removeEventListener("ended", onEnded);
            resolve();
          };
          v.addEventListener("ended", onEnded);
        } else {
          const onPlay = () => {
            v.removeEventListener("playing", onPlay);
            resolve();
          };
          v.addEventListener("playing", onPlay);
        }
      });
    },
    []
  );

  const handleMouseEnter = useCallback(async () => {
    setHovered(true);
    stateRef.current = "showing";

    // Play "show" video (one-shot intro), then loop "hover"
    await playVideo(feature.video.show, false);

    if (stateRef.current === "showing") {
      stateRef.current = "hovering";
      playVideo(feature.video.hover, true);
    }
  }, [feature.video.show, feature.video.hover, playVideo]);

  const handleMouseLeave = useCallback(async () => {
    setHovered(false);
    stateRef.current = "unhovering";

    // Play "unhover" video (one-shot outro)
    await playVideo(feature.video.unhover, false);

    if (stateRef.current === "unhovering") {
      stateRef.current = "static";
      // After unhover ends, video stays paused on last frame (device visible)
    }
  }, [feature.video.unhover, playVideo]);

  return (
    <div
      className="absolute"
      style={{
        top: `${feature.top}%`,
        left: `${feature.left}%`,
        width: `${feature.width}%`,
        height: `${feature.height}%`,
        background: "transparent",
        boxShadow: "none",
        border: "none",
      }}
    >
      {/* Video + overlay container */}
      <div
        className="relative w-full h-full cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          background: "transparent",
          boxShadow: "none",
          border: "none",
        }}
      >
        {/* Video — ALWAYS visible. Plays show on mount, pauses on last frame.
            On hover plays show→hover loop. On unhover plays unhover then pauses. */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-contain"
          muted
          playsInline
          preload="auto"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
            background: "transparent",
          }}
        />

        {/* Overlay PNG — always visible on top of video.
            Has #f7f7f8 edges (matching section bg) to hide video background,
            and transparent center to reveal device content. */}
        <img
          src={feature.overlay}
          alt=""
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          style={{ zIndex: 2 }}
        />
      </div>

      {/* Label: title + "+" badge + "Learn more" */}
      <div
        className="absolute flex flex-col items-start"
        style={{
          ...labelPositions[feature.id],
          zIndex: 10,
        }}
      >
        <a
          href="#"
          className="flex flex-col items-start gap-1 no-underline"
          style={{ textDecoration: "none" }}
        >
          {/* Title */}
          <span
            className="block font-bold whitespace-nowrap"
            style={{
              fontSize: 15,
              color: "var(--navy)",
              letterSpacing: "-0.01em",
            }}
          >
            {feature.title}
          </span>

          {/* "+" badge + Learn more row */}
          <span className="flex items-center gap-0 relative">
            {/* Green circle with + */}
            <span
              className="flex items-center justify-center shrink-0"
              style={{
                width: 29,
                height: 29,
                borderRadius: "50%",
                background: "#1cc283",
              }}
            >
              <PlusIcon />
            </span>

            {/* "Learn more" text — slides out on hover */}
            <span
              className="overflow-hidden whitespace-nowrap"
              style={{
                maxWidth: hovered ? 120 : 0,
                opacity: hovered ? 1 : 0,
                transition:
                  "max-width 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
                marginLeft: hovered ? 8 : 0,
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--navy)",
                }}
              >
                Learn more
              </span>
            </span>
          </span>
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Features Section                                                   */
/* ------------------------------------------------------------------ */

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection observer for entry animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: "#f7f7f8" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div
          className="max-w-2xl mb-8 lg:mb-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            transition:
              "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p
            className="text-sm font-bold uppercase tracking-widest mb-4"
            style={{ color: "var(--teal)" }}
          >
            Platform
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight mb-6"
            style={{ color: "var(--navy)" }}
          >
            Flexible and scalable technology to meet your unique payment needs
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--color-text-light)" }}
          >
            Legacy payment solutions are slow, rigid, and lack control. Bring
            the financial solutions to your customers at the point of need and
            delight them in a whole new way.
          </p>
        </div>

        {/* Isometric Features Area */}
        <div
          className="relative mx-auto"
          style={{
            maxWidth: 1200,
            aspectRatio: "1193 / 850",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(60px)",
            transition:
              "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}
        >
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
