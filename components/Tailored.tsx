"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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

  /* Scroll-driven index switching via GSAP ScrollTrigger */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const idx = Math.min(
          Math.floor(self.progress * items.length),
          items.length - 1
        );
        if (idx >= 0) setActiveIndex(idx);
      },
    });

    return () => trigger.kill();
  }, []);

  /* Ensure all videos autoplay */
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) {
        v.muted = true;
        v.play().catch(() => {});
      }
    });
  }, []);

  /* Re-trigger play on active index change */
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
      id="tailored"
      ref={sectionRef}
      className="relative"
      style={{ height: `${items.length * 100 + 100}vh`, zIndex: 51, position: "relative" }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: "var(--navy)", zIndex: 51 }}
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

              {/* Green SVG overlay — network/constellation effect from Marqeta source */}
              <svg
                viewBox="0 0 595.28 841.89"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 10,
                  pointerEvents: "none",
                  opacity: 0.7,
                }}
              >
                <g fill="none">
                  {/* Dashed orbit paths */}
                  <path d="m489.25 544.57c2.94-8.91 21.87-69.72-14.19-130.07-34.54-57.81-93.23-71.14-102.86-73.16" stroke="#3cb982" strokeDasharray="3 2" strokeWidth="1.5" />
                  <path d="m406.23 413.5c-1.19-8.84-5.62-49.21 21.61-86.46 21.86-29.9 51.36-40.31 61.52-43.39" stroke="#3cb982" strokeDasharray="3 2" strokeWidth="1.5" />
                  <path d="m491.86 523.07c-8.7 17.47-43.09 81.29-120.55 113.57-95.63 39.84-181.53.2-195.09-6.34" stroke="#3cb982" strokeDasharray="3 2" strokeWidth="1.5" />
                  <path d="m181.1 652.77c9.19-11.6 34.34-46.43 36.35-97.72a168.65 168.65 0 0 0-22.89-91.17" stroke="#3cb982" strokeDasharray="3 2" strokeWidth="1.5" />
                  <path d="m490.7 285.89c-6.85 3.82-27.17 16.3-37.59 41.93a83.5 83.5 0 0 0-5.76 37.91" stroke="#3cb982" strokeDasharray="3 2" strokeWidth="1.5" />
                  <path d="m174.78 255.38a269.85 269.85 0 0 0 135.34 15.91 269.17 269.17 0 0 0 112.88-43.58" stroke="#3cb982" strokeDasharray="3 2" strokeWidth="1.5" />

                  {/* Dot pairs: inner filled circle + outer ring */}
                  <g strokeMiterlimit="10">
                    {[
                      [201.65,232.71],[461.03,262.3],[174.61,255.31],[211.08,222.71],
                      [99.96,466.22],[98.82,302.61],[169.61,426.03],[378.12,387.16],
                      [401.21,321.72],[447.29,365.73],[464.9,418.44],[483.52,422.31],
                      [406.21,413.44],[421.89,403.44],[512.59,474.93],[496.75,461.22],
                      [554.87,434.61],[543.5,408.44],[491.75,522.85],[519.56,560.74],
                      [508.95,576.53],[489.25,547.07],[505.09,328.48],[530.93,373.23],
                      [518.2,452.15],[480.79,597.62],[426.89,308.97],[417.03,254.17],
                      [407.35,240.69],[431.89,250.31],[424.39,227.71],[482.16,325.98],
                      [371.76,341.34],[543.5,509.76],[522.1,388.52],[399.85,281.36],
                      [123.81,278.86],[114.37,508.4],[116.87,447.15],[81.49,392.16],
                      [489.25,283.86],[194.56,463.72],[126.31,428.53],[111.87,418.44],
                      [126.31,478.56],[163.23,584.03],[148.13,581.53],[167.11,558.24],
                      [151.99,525.35],[176.22,628.94],[181.22,652.6],
                    ].map(([cx, cy], i) => (
                      <g key={i}>
                        <circle cx={cx} cy={cy} r={0.5} stroke="#3cb982" strokeWidth="2.73" />
                        <circle cx={cx} cy={cy} r={1.5} stroke="#8ed0be" strokeWidth="0.83" />
                      </g>
                    ))}
                  </g>
                </g>
              </svg>
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
