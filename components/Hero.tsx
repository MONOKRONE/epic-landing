import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const EASE_EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const rotatingWords = [
  "credit",
  "payroll",
  "lending",
  "expense",
  "embedded finance",
];

const cardLayers = [
  { src: "/webp/static_img_3d_IndexHeroCard_Card_Shade.webp", depth: 0.01, z: 1 },
  { src: "/webp/static_img_3d_IndexHeroCard_Card_Color.webp", depth: 0.02, z: 2 },
  { src: "/webp/static_img_3d_IndexHeroCard_Glass_Left_Color.webp", depth: 0.04, z: 3 },
  { src: "/webp/static_img_3d_IndexHeroCard_Glass_Right_Color.webp", depth: 0.035, z: 4 },
  { src: "/webp/static_img_3d_IndexHeroCard_Chip_Color.webp", depth: 0.05, z: 5 },
  { src: "/webp/static_img_3d_IndexHeroCard_Code_Left.webp", depth: 0.07, z: 6 },
  { src: "/webp/static_img_3d_IndexHeroCard_Code_Right.webp", depth: 0.08, z: 7 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const isHovering = useRef(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax offsets
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const cardScrollY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Scroll-based card entry animation
  const cardEntryOpacity = useTransform(scrollYProgress, [0, 0.08], [0.85, 1]);

  // Rotating word interval
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Lerped mouse tracking
  const lerp = useCallback(
    (start: number, end: number, factor: number) =>
      start + (end - start) * factor,
    []
  );

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const container = cardContainerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      targetMouse.current = {
        x: (e.clientX - centerX) / (rect.width / 2),
        y: (e.clientY - centerY) / (rect.height / 2),
      };
      isHovering.current = true;
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      targetMouse.current = { x: 0, y: 0 };
    };

    const animate = () => {
      const factor = isHovering.current ? 0.08 : 0.04;
      currentMouse.current = {
        x: lerp(currentMouse.current.x, targetMouse.current.x, factor),
        y: lerp(currentMouse.current.y, targetMouse.current.y, factor),
      };
      setSmoothMouse({ ...currentMouse.current });
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouse);
    const container = cardContainerRef.current;
    container?.addEventListener("mouseleave", handleMouseLeave);
    rafId.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      container?.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [lerp]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden pt-[72px]"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Background gradient orbs */}
      <motion.div
        style={{ y: bgY }}
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
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-[calc(100vh-72px)]">
          {/* Left: Content */}
          <motion.div style={{ y: contentY }} className="pt-12 lg:pt-0">
            <h1 className="text-5xl md:text-6xl lg:text-[72px] font-bold leading-[1.05] tracking-tight">
              <span style={{ color: "var(--navy)" }}>The next era of</span>
              <br />
              <span
                className="relative inline-block overflow-hidden align-bottom"
                style={{ height: "1.2em", minWidth: "500px" }}
              >
                {rotatingWords.map((word, i) => (
                  <motion.span
                    key={word}
                    className="absolute left-0 top-0 whitespace-nowrap"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{
                      y:
                        i === wordIndex
                          ? "0%"
                          : i < wordIndex
                            ? "-100%"
                            : "100%",
                      opacity: i === wordIndex ? 1 : 0,
                    }}
                    transition={{ duration: 0.5, ease: EASE_EXPO_OUT }}
                    style={{ color: "var(--teal)" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p
              className="mt-6 text-lg md:text-xl leading-relaxed max-w-lg"
              style={{ color: "var(--color-text-light)" }}
            >
              Integrate end to end credit and payment solutions into your
              business processes using our modern card issuing platform.
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
                Contact sales
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
          </motion.div>

          {/* Right: 3D Layered Card */}
          <motion.div
            style={{
              y: cardScrollY,
              opacity: cardEntryOpacity,
            }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <div
              ref={cardContainerRef}
              className="relative"
              style={{
                width: "600px",
                height: "600px",
                maxWidth: "100%",
              }}
            >
              {cardLayers.map((layer, i) => {
                const tx = smoothMouse.x * layer.depth * 300;
                const ty = smoothMouse.y * layer.depth * 300;
                return (
                  <motion.img
                    key={i}
                    src={layer.src}
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain"
                    style={{
                      zIndex: layer.z,
                      transform: `translate(${tx}px, ${ty}px)`,
                      transition: isHovering.current
                        ? "transform 0.1s ease-out"
                        : "transform 0.6s ease-out",
                      willChange: "transform",
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.2 + i * 0.1,
                      duration: 0.8,
                      ease: EASE_EXPO_OUT,
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
