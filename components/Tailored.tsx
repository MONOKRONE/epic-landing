import { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

const items = [
  {
    title: "Craft new card products",
    description:
      "Use open APIs to create new payment products or streamline supplier and workforce payments.",
    video: "/mp4/static_marqeta-videos_img_tailored_tailor_0.mp4",
  },
  {
    title: "Accelerate time to market",
    description:
      "Leverage existing relationships with issuing banks, networks, and card fulfillment providers to go live in days not months.",
    video: "/mp4/static_marqeta-videos_img_tailored_tailor_1.mp4",
  },
  {
    title: "Trust",
    description:
      "Detect fraud, control your spend, and ensure the highest levels of compliance and uptime.",
    video: "/mp4/static_marqeta-videos_img_tailored_tailor_2.mp4",
  },
  {
    title: "Scale globally",
    description:
      "Easily expand across the United States, Europe, and Asia with our global-ready platform.",
    video: "/mp4/static_marqeta-videos_img_tailored_tailor_3.mp4",
  },
];

export default function Tailored() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Scroll-driven index switching
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(Math.floor(p * items.length), items.length - 1);
    if (idx >= 0 && idx !== activeIndex) {
      setActiveIndex(idx);
    }
  });

  // Ensure all videos autoplay
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) {
        v.muted = true;
        v.play().catch(() => {});
      }
    });
  }, []);

  // Re-trigger play on active index change
  useEffect(() => {
    const v = videoRefs.current[activeIndex];
    if (v) {
      v.muted = true;
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  }, [activeIndex]);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${items.length * 100 + 100}vh` }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: "var(--navy)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-full flex items-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
            {/* Left: Video */}
            <div
              className="relative overflow-hidden bg-slate-900"
              style={{ borderRadius: "12px", aspectRatio: "4/3" }}
            >
              {items.map((item, i) => (
                <video
                  key={i}
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={item.video}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  style={{
                    opacity: i === activeIndex ? 1 : 0,
                    transition: "opacity 0.5s ease",
                    willChange: "opacity",
                    transform: "translateZ(0)",
                  }}
                />
              ))}
            </div>

            {/* Right: Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Create a tailored payment experience
              </h2>

              <div className="mt-12 space-y-0">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="py-6 border-t border-white/10 relative cursor-pointer"
                    onClick={() => handleItemClick(i)}
                    style={{
                      opacity: i === activeIndex ? 1 : 0.4,
                      transition: "opacity 0.4s ease",
                    }}
                  >
                    <div
                      className="absolute left-0 top-0 h-[2px] w-full"
                      style={{
                        opacity: i === activeIndex ? 1 : 0.2,
                        background: "var(--teal)",
                        transition: "opacity 0.4s ease",
                      }}
                    />
                    <h3 className="text-lg font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
