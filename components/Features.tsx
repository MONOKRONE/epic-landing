import { useState, useRef, useEffect } from "react";

const EASE_QUINT_OUT = "cubic-bezier(0.5, 1, 0.89, 1)";

interface FeatureTab {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  video: {
    show: string;
    hover: string;
    unhover: string;
  };
  overlay: string;
}

const tabs: FeatureTab[] = [
  {
    id: "cards",
    title: "Issue virtual cards",
    subtitle: "Card Issuing",
    description:
      "Create and manage virtual and physical cards instantly through our APIs. Design custom card programs that fit your specific use case.",
    video: {
      show: "/mp4/marqeta-videos_img_features_cards_show.mp4",
      hover: "/mp4/marqeta-videos_img_features_cards_hover.mp4",
      unhover: "/mp4/marqeta-videos_img_features_cards_unhover.mp4",
    },
    overlay: "/png/marqeta-videos_img_features_cards_overlay.png",
  },
  {
    id: "controls",
    title: "Dynamic spend controls",
    subtitle: "Spend Controls",
    description:
      "Set and modify spending rules in real time. Control where, when, and how cards can be used with granular precision.",
    video: {
      show: "/mp4/marqeta-videos_img_features_controls_show.mp4",
      hover: "/mp4/marqeta-videos_img_features_controls_hover.mp4",
      unhover: "/mp4/marqeta-videos_img_features_controls_unhover.mp4",
    },
    overlay: "/png/marqeta-videos_img_features_controls_overlay.png",
  },
  {
    id: "widgets",
    title: "PCI widgets",
    subtitle: "Compliance",
    description:
      "Embed PCI-compliant UI components directly into your application. Display card details securely without handling sensitive data.",
    video: {
      show: "/mp4/marqeta-videos_img_features_widgets_show.mp4",
      hover: "/mp4/marqeta-videos_img_features_widgets_hover.mp4",
      unhover: "/mp4/marqeta-videos_img_features_widgets_unhover.mp4",
    },
    overlay: "/png/marqeta-videos_img_features_widgets_overlay.png",
  },
  {
    id: "funding",
    title: "JIT Funding",
    subtitle: "Funding",
    description:
      "Just-in-Time Funding gives you real-time control over every transaction. Approve or decline funding at the moment of purchase.",
    video: {
      show: "/mp4/marqeta-videos_img_features_funding_show.mp4",
      hover: "/mp4/marqeta-videos_img_features_funding_hover.mp4",
      unhover: "/mp4/marqeta-videos_img_features_funding_unhover.mp4",
    },
    overlay: "/png/marqeta-videos_img_features_funding_overlay.png",
  },
];

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const videoCache = useRef<Map<string, HTMLVideoElement>>(new Map());
  const showVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const hoverVideoRef = useRef<HTMLVideoElement>(null);

  // Preload all videos on mount
  useEffect(() => {
    tabs.forEach((tab) => {
      [tab.video.show, tab.video.hover, tab.video.unhover].forEach((src) => {
        const v = document.createElement("video");
        v.preload = "auto";
        v.muted = true;
        v.playsInline = true;
        v.src = src;
        v.load();
        videoCache.current.set(src, v);
      });
    });
  }, []);

  // Play active show video on tab change
  useEffect(() => {
    showVideoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === activeTab) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [activeTab]);

  const handleTabClick = (index: number) => {
    if (index === activeTab) return;
    setActiveTab(index);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    const video = hoverVideoRef.current;
    if (video) {
      video.src = tabs[activeTab].video.hover;
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const video = hoverVideoRef.current;
    if (video) {
      video.src = tabs[activeTab].video.unhover;
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  return (
    <section
      className="py-24 lg:py-32"
      style={{ background: "var(--color-bg-alt)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
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
            the financial solutions to your customers at the point of need.
          </p>
        </div>

        {/* Tabs + Content */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
          {/* Tab List */}
          <div className="flex flex-col gap-2">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(i)}
                className={`text-left p-6 rounded-2xl border ${
                  i === activeTab
                    ? "bg-white shadow-lg"
                    : "bg-transparent border-transparent hover:bg-white/50"
                }`}
                style={{
                  transition: `all 0.5s ${EASE_QUINT_OUT}`,
                  borderColor:
                    i === activeTab ? "var(--gray-200)" : "transparent",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      transition: `background 0.35s ${EASE_QUINT_OUT}`,
                      background:
                        i === activeTab ? "var(--teal)" : "var(--gray-400)",
                    }}
                  />
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{
                      color:
                        i === activeTab
                          ? "var(--teal)"
                          : "var(--color-text-light)",
                    }}
                  >
                    {tab.subtitle}
                  </span>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "var(--navy)" }}
                >
                  {tab.title}
                </h3>
                {i === activeTab && (
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-light)" }}
                  >
                    {tab.description}
                  </p>
                )}
                {i === activeTab && (
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 mt-3 text-sm font-medium transition-colors"
                    style={{ color: "var(--teal)" }}
                  >
                    Learn more
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                )}
              </button>
            ))}
          </div>

          {/* Video Display */}
          <div
            className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-[4/3] cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* All show videos stacked */}
            {tabs.map((tab, i) => (
              <video
                key={tab.id}
                ref={(el) => {
                  showVideoRefs.current[i] = el;
                }}
                src={tab.video.show}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
                autoPlay
                preload="auto"
                style={{
                  opacity: i === activeTab && !isHovered ? 1 : 0,
                  transition: `opacity 0.5s ${EASE_QUINT_OUT}`,
                  willChange: "transform, opacity",
                  transform: "translateZ(0)",
                }}
              />
            ))}

            {/* Hover/Unhover overlay video */}
            <video
              ref={hoverVideoRef}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              playsInline
              preload="auto"
              style={{
                opacity: isHovered ? 1 : 0,
                transition: `opacity 0.5s ${EASE_QUINT_OUT}`,
                willChange: "transform, opacity",
                transform: "translateZ(0)",
              }}
            />

            {/* Static overlay image */}
            <img
              src={tabs[activeTab].overlay}
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{
                opacity: isHovered ? 0 : 1,
                transition: `opacity 0.5s ${EASE_QUINT_OUT}`,
                willChange: "opacity",
              }}
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent pointer-events-none" />

            {/* "+" indicator */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-lg font-bold"
                style={{ background: "var(--teal)" }}
              >
                +
              </div>
              <span className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                {tabs[activeTab].title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
