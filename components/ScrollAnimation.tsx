import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import {
  CheckCircle2,
  CreditCard,
  BarChart3,
  Car,
  ShoppingBag,
  Landmark,
  Building2,
  ShieldCheck,
  Network,
  Zap,
} from "lucide-react";

const EASE_EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_STANDARD: [number, number, number, number] = [0.4, 0, 0.2, 1];

export default function ScrollAnimation() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  // ═══════════════════════════════════════════════════
  // PHASE 1 & 2: 3D Scene (0 → 0.2)
  // ═══════════════════════════════════════════════════
  const sceneOpacity = useTransform(smoothProgress, [0.2, 0.21], [1, 0]);
  const sceneRotateX = useTransform(
    smoothProgress,
    [0, 0.08, 0.14],
    [20, 5, 0]
  );
  const sceneRotateY = useTransform(
    smoothProgress,
    [0, 0.08, 0.14],
    [-15, 0, 0]
  );

  const phase1Opacity = useTransform(smoothProgress, [0, 0.03], [1, 0]);
  const phase1Y = useTransform(smoothProgress, [0, 0.03], [0, -50]);
  const bandOpacity = useTransform(smoothProgress, [0.03, 0.06], [1, 0]);

  // Center Bill
  const b0X = useTransform(
    smoothProgress,
    [0.06, 0.14, 0.2],
    [0, 0, 0]
  );
  const b0Y = useTransform(
    smoothProgress,
    [0.06, 0.14, 0.2],
    [0, 220, 600]
  );
  const b0Z = useTransform(
    smoothProgress,
    [0.06, 0.14, 0.2],
    [0, 150, 800]
  );
  const b0Scale = useTransform(smoothProgress, [0.14, 0.2], [1, 50]);
  const bill0ContentOpacity = useTransform(
    smoothProgress,
    [0.14, 0.16],
    [1, 0]
  );

  // Other Bills
  const otherBillsOpacity = useTransform(
    smoothProgress,
    [0.11, 0.14],
    [1, 0]
  );
  const b1X = useTransform(
    smoothProgress,
    [0.06, 0.11, 0.14, 0.17],
    [0, -240, -240, -300]
  );
  const b1Y = useTransform(
    smoothProgress,
    [0.06, 0.11, 0.14, 0.17],
    [0, 180, 180, 0]
  );
  const b1Z = useTransform(
    smoothProgress,
    [0.06, 0.11, 0.14, 0.17],
    [-10, 100, 100, 0]
  );
  const b1R = useTransform(
    smoothProgress,
    [0.06, 0.11, 0.14, 0.17],
    [0, -12, -12, -20]
  );

  const b2X = useTransform(
    smoothProgress,
    [0.06, 0.11, 0.14, 0.17],
    [0, 240, 240, 300]
  );
  const b2Y = useTransform(
    smoothProgress,
    [0.06, 0.11, 0.14, 0.17],
    [0, 190, 190, 0]
  );
  const b2Z = useTransform(
    smoothProgress,
    [0.06, 0.11, 0.14, 0.17],
    [-20, 120, 120, 0]
  );
  const b2R = useTransform(
    smoothProgress,
    [0.06, 0.11, 0.14, 0.17],
    [0, 12, 12, 20]
  );

  const b3X = useTransform(
    smoothProgress,
    [0.06, 0.11, 0.14, 0.17],
    [0, -460, -460, -600]
  );
  const b3Y = useTransform(
    smoothProgress,
    [0.06, 0.11, 0.14, 0.17],
    [0, 120, 120, -100]
  );
  const b3Z = useTransform(
    smoothProgress,
    [0.06, 0.11, 0.14, 0.17],
    [-30, 50, 50, -50]
  );
  const b3R = useTransform(
    smoothProgress,
    [0.06, 0.11, 0.14, 0.17],
    [0, -24, -24, -40]
  );

  const b4X = useTransform(
    smoothProgress,
    [0.06, 0.11, 0.14, 0.17],
    [0, 460, 460, 600]
  );
  const b4Y = useTransform(
    smoothProgress,
    [0.06, 0.11, 0.14, 0.17],
    [0, 140, 140, -100]
  );
  const b4Z = useTransform(
    smoothProgress,
    [0.06, 0.11, 0.14, 0.17],
    [-40, 70, 70, -50]
  );
  const b4R = useTransform(
    smoothProgress,
    [0.06, 0.11, 0.14, 0.17],
    [0, 24, 24, 40]
  );

  // Banks
  const banksOpacity = useTransform(
    smoothProgress,
    [0.09, 0.11, 0.14, 0.17],
    [0, 1, 1, 0]
  );
  const banksY = useTransform(
    smoothProgress,
    [0.09, 0.11, 0.14, 0.17],
    [50, 0, 0, 100]
  );

  // Scroll Indicator
  const indicatorOpacity = useTransform(smoothProgress, [0, 0.03], [1, 0]);

  // ═══════════════════════════════════════════════════
  // PHASE 3: Transition (0.19 → 0.26)
  // ═══════════════════════════════════════════════════
  const screenFillOpacity = useTransform(
    smoothProgress,
    [0.19, 0.21, 0.24, 0.26],
    [0, 1, 1, 0]
  );

  // ═══════════════════════════════════════════════════
  // PHASE 4: Document Transformation (0.24 → 0.46)
  // ═══════════════════════════════════════════════════
  const phase4Opacity = useTransform(
    smoothProgress,
    [0.24, 0.26, 0.48, 0.5],
    [0, 1, 1, 0]
  );

  const docX = useTransform(smoothProgress, [0.24, 0.26], [-800, 0]);
  const docWidth = useTransform(
    smoothProgress,
    [0.26, 0.32],
    ["280px", "480px"]
  );
  const docHeight = useTransform(
    smoothProgress,
    [0.26, 0.32],
    ["360px", "680px"]
  );
  const docBg = useTransform(
    smoothProgress,
    [0.26, 0.32],
    ["#2a206a", "#ffffff"]
  );
  const docRadius = useTransform(
    smoothProgress,
    [0.26, 0.32],
    ["16px", "4px"]
  );
  const docShadow = useTransform(smoothProgress, [0.26, 0.32], [
    "0px 20px 40px rgba(42, 32, 106, 0.4)",
    "0px 25px 50px -12px rgba(0, 0, 0, 0.15)",
  ]);

  const docLinesOpacity = useTransform(
    smoothProgress,
    [0.26, 0.29],
    [1, 0]
  );
  const docHeaderOpacity = useTransform(
    smoothProgress,
    [0.32, 0.35],
    [0, 1]
  );
  const docBodyOpacity = useTransform(
    smoothProgress,
    [0.38, 0.41],
    [0, 1]
  );
  const docFooterOpacity = useTransform(
    smoothProgress,
    [0.43, 0.46],
    [0, 1]
  );

  const callout1Opacity = useTransform(
    smoothProgress,
    [0.32, 0.35],
    [0, 1]
  );
  const callout1Y = useTransform(smoothProgress, [0.32, 0.35], [40, 0]);
  const callout1X = useTransform(smoothProgress, [0.32, 0.35], [40, 0]);

  const callout2Opacity = useTransform(
    smoothProgress,
    [0.38, 0.41],
    [0, 1]
  );
  const callout2Y = useTransform(smoothProgress, [0.38, 0.41], [40, 0]);
  const callout2X = useTransform(smoothProgress, [0.38, 0.41], [40, 0]);

  const callout3Opacity = useTransform(
    smoothProgress,
    [0.43, 0.46],
    [0, 1]
  );
  const callout3Y = useTransform(smoothProgress, [0.43, 0.46], [40, 0]);
  const callout3X = useTransform(smoothProgress, [0.43, 0.46], [40, 0]);

  // ═══════════════════════════════════════════════════
  // PHASE 5: Stats Section (0.5 → 0.65)
  // ═══════════════════════════════════════════════════
  const phase5Opacity = useTransform(
    smoothProgress,
    [0.5, 0.52, 0.63, 0.65],
    [0, 1, 1, 0]
  );
  const phase5StatsY = useTransform(smoothProgress, [0.52, 0.56], [60, 0]);
  const phase5StatsOpacity = useTransform(
    smoothProgress,
    [0.52, 0.56],
    [0, 1]
  );
  // Cards stagger
  const card0Opacity = useTransform(smoothProgress, [0.50, 0.53], [0, 1]);
  const card0Y = useTransform(smoothProgress, [0.50, 0.53], [40, 0]);
  const card1Opacity = useTransform(smoothProgress, [0.52, 0.55], [0, 1]);
  const card1Y = useTransform(smoothProgress, [0.52, 0.55], [40, 0]);
  const card2Opacity = useTransform(smoothProgress, [0.54, 0.57], [0, 1]);
  const card2Y = useTransform(smoothProgress, [0.54, 0.57], [40, 0]);
  const card3Opacity = useTransform(smoothProgress, [0.56, 0.59], [0, 1]);
  const card3Y = useTransform(smoothProgress, [0.56, 0.59], [40, 0]);

  // ═══════════════════════════════════════════════════
  // PHASE 6: Testimonials (0.65 → 0.82)
  // ═══════════════════════════════════════════════════
  const phase6Opacity = useTransform(
    smoothProgress,
    [0.65, 0.67, 0.8, 0.82],
    [0, 1, 1, 0]
  );
  const phase6DocScale = useTransform(
    smoothProgress,
    [0.65, 0.7],
    [0.8, 1]
  );
  const phase6ContentOpacity = useTransform(
    smoothProgress,
    [0.7, 0.73],
    [0, 1]
  );
  const phase6QuoteOpacity = useTransform(
    smoothProgress,
    [0.73, 0.76],
    [0, 1]
  );
  const phase6VideoOpacity = useTransform(
    smoothProgress,
    [0.76, 0.79],
    [0, 1]
  );

  // ═══════════════════════════════════════════════════
  // PHASE 7: Final CTA (0.82 → 1.0)
  // ═══════════════════════════════════════════════════
  const phase7Opacity = useTransform(
    smoothProgress,
    [0.82, 0.85, 0.96, 1.0],
    [0, 1, 1, 0]
  );
  const phase7Y = useTransform(smoothProgress, [0.82, 0.88], [80, 0]);
  const phase7PhoneX = useTransform(smoothProgress, [0.85, 0.92], [100, 0]);
  const phase7PhoneOpacity = useTransform(
    smoothProgress,
    [0.85, 0.92],
    [0, 1]
  );

  return (
    <div ref={containerRef} className="h-[1400vh] relative">
      {/* Sticky Viewport */}
      <div
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{
          perspective: "2000px",
          background: "var(--color-bg)",
          willChange: "transform",
        }}
      >
        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50"
        >
          <span
            className="text-sm font-medium tracking-widest uppercase"
            style={{ color: "var(--color-text-light)" }}
          >
            Scroll down
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-slate-400 to-transparent" />
        </motion.div>

        {/* ══════ PHASE 1 & 2: 3D SCENE ══════ */}
        <motion.div
          style={{
            rotateX: sceneRotateX,
            rotateY: sceneRotateY,
            opacity: sceneOpacity,
            transformStyle: "preserve-3d",
            willChange: "transform, opacity",
          }}
          className="relative w-[1000px] h-[800px]"
        >
          {/* Phase 1 UI Elements */}
          <motion.div
            style={{ opacity: phase1Opacity, y: phase1Y, z: 50 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Dealer Image */}
            <div className="absolute top-1/2 left-1/2 w-[320px] h-[420px] bg-slate-200 rounded-2xl shadow-2xl overflow-hidden border-4 border-white -translate-x-1/2 -translate-y-1/2 ml-[80px] mt-[-60px]">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Professional"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <p className="text-slate-800 font-bold text-sm bg-white/90 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
                  Customer Image
                </p>
              </div>
            </div>

            {/* Notification Card */}
            <div className="absolute top-[25%] left-[10%] bg-white/95 backdrop-blur-md p-4 pr-8 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-100">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "var(--color-primary-50)",
                  color: "var(--teal)",
                }}
              >
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                  Notification
                </p>
                <p
                  className="text-sm font-bold"
                  style={{ color: "var(--navy)" }}
                >
                  Card Activated
                </p>
              </div>
            </div>

            {/* Ledger */}
            <div className="absolute bottom-[25%] left-[5%] bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-2xl w-72 border border-slate-100">
              <h3
                className="text-xs font-bold mb-4 flex items-center gap-2"
                style={{ color: "var(--navy)" }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "var(--teal)" }}
                />
                Recent Transactions
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                  <div>
                    <p
                      className="text-xs font-bold"
                      style={{ color: "var(--navy)" }}
                    >
                      DoorDash Order
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Card ending ...4920
                    </p>
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-md"
                    style={{
                      color: "var(--teal)",
                      background: "var(--color-primary-50)",
                    }}
                  >
                    +$142.50
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-xs font-bold"
                      style={{ color: "var(--navy)" }}
                    >
                      Square Payment
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Card ending ...1184
                    </p>
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-md"
                    style={{
                      color: "var(--teal)",
                      background: "var(--color-primary-50)",
                    }}
                  >
                    +$98.00
                  </span>
                </div>
              </div>
            </div>

            {/* Graph */}
            <div className="absolute top-[35%] right-[5%] bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-2xl w-64 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-xs font-bold"
                  style={{ color: "var(--navy)" }}
                >
                  Monthly Volume
                </h3>
                <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center">
                  <BarChart3 className="w-3 h-3 text-slate-500" />
                </div>
              </div>
              <div className="mb-6">
                <span
                  className="text-3xl font-black tracking-tight"
                  style={{ color: "var(--navy)" }}
                >
                  $1.2M
                </span>
              </div>
              <div className="flex items-end gap-1.5 h-20">
                {[40, 60, 30, 80, 50, 100].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-slate-50 rounded-t-md relative h-full flex items-end"
                  >
                    <div
                      className="w-full rounded-t-md"
                      style={{
                        height: `${height}%`,
                        background:
                          i === 5 ? "var(--teal)" : "var(--color-primary-200)",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bills */}
          <div className="absolute top-1/2 left-1/2">
            <motion.div
              style={{
                x: b4X,
                y: b4Y,
                z: b4Z,
                rotateZ: b4R,
                opacity: otherBillsOpacity,
                willChange: "transform, opacity",
              }}
              className="absolute -left-[140px] -top-[180px] w-[280px] h-[360px] rounded-2xl shadow-xl border border-indigo-500/50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-indigo-800"
            >
              <CreditCard className="w-12 h-12 text-white/20 mb-3" />
              <div className="w-24 h-1.5 bg-white/20 rounded-full mb-2" />
              <div className="w-16 h-1.5 bg-white/20 rounded-full" />
            </motion.div>
          </div>

          <div className="absolute top-1/2 left-1/2">
            <motion.div
              style={{
                x: b3X,
                y: b3Y,
                z: b3Z,
                rotateZ: b3R,
                opacity: otherBillsOpacity,
                willChange: "transform, opacity",
              }}
              className="absolute -left-[140px] -top-[180px] w-[280px] h-[360px] rounded-2xl shadow-xl border border-indigo-400/50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-700"
            >
              <CreditCard className="w-12 h-12 text-white/20 mb-3" />
              <div className="w-24 h-1.5 bg-white/20 rounded-full mb-2" />
              <div className="w-16 h-1.5 bg-white/20 rounded-full" />
            </motion.div>
          </div>

          <div className="absolute top-1/2 left-1/2">
            <motion.div
              style={{
                x: b2X,
                y: b2Y,
                z: b2Z,
                rotateZ: b2R,
                opacity: otherBillsOpacity,
                willChange: "transform, opacity",
              }}
              className="absolute -left-[140px] -top-[180px] w-[280px] h-[360px] rounded-2xl shadow-xl border border-violet-400/50 flex flex-col items-center justify-center bg-gradient-to-br from-violet-500 to-violet-700"
            >
              <CreditCard className="w-12 h-12 text-white/20 mb-3" />
              <div className="w-24 h-1.5 bg-white/20 rounded-full mb-2" />
              <div className="w-16 h-1.5 bg-white/20 rounded-full" />
            </motion.div>
          </div>

          <div className="absolute top-1/2 left-1/2">
            <motion.div
              style={{
                x: b1X,
                y: b1Y,
                z: b1Z,
                rotateZ: b1R,
                opacity: otherBillsOpacity,
                willChange: "transform, opacity",
              }}
              className="absolute -left-[140px] -top-[180px] w-[280px] h-[360px] rounded-2xl shadow-xl border border-purple-300/50 flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 to-purple-600"
            >
              <CreditCard className="w-12 h-12 text-white/20 mb-3" />
              <div className="w-24 h-1.5 bg-white/20 rounded-full mb-2" />
              <div className="w-16 h-1.5 bg-white/20 rounded-full" />
            </motion.div>
          </div>

          {/* Center Bill */}
          <div className="absolute top-1/2 left-1/2">
            <motion.div
              style={{
                x: b0X,
                y: b0Y,
                z: b0Z,
                scale: b0Scale,
                willChange: "transform, opacity",
              }}
              className="absolute -left-[140px] -top-[180px] w-[280px] h-[360px] bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl shadow-2xl border border-purple-300 flex flex-col items-center justify-center"
            >
              <motion.div
                style={{ opacity: bill0ContentOpacity }}
                className="flex flex-col items-center justify-center w-full h-full"
              >
                <CreditCard className="w-12 h-12 text-white/30 mb-3" />
                <div className="w-24 h-1.5 bg-white/20 rounded-full mb-2" />
                <div className="w-16 h-1.5 bg-white/20 rounded-full" />
                <motion.div
                  style={{ opacity: bandOpacity }}
                  className="absolute top-1/2 -translate-y-1/2 w-full h-16 bg-white/10 backdrop-blur-md border-y-2 border-white/30 flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-mono font-bold tracking-widest text-xl">
                    $10,000
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Banks */}
          <motion.div
            style={{ opacity: banksOpacity, y: banksY, z: 200 }}
            className="absolute bottom-[-20px] left-0 w-full flex justify-between px-4 items-end"
          >
            {[
              { icon: Building2, label: "Bank A" },
              { icon: Car, label: "Uber" },
              { icon: ShoppingBag, label: "Square", featured: true },
              { icon: ShoppingBag, label: "Instacart" },
              { icon: Landmark, label: "J.P.Morgan" },
            ].map((bank, i) => (
              <div
                key={i}
                className={`flex flex-col items-center gap-4 ${bank.featured ? "mb-8" : ""}`}
              >
                <div
                  className={`${bank.featured ? "w-24 h-24" : "w-20 h-20"} bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100`}
                >
                  <bank.icon
                    className={`${bank.featured ? "w-10 h-10" : "w-8 h-8"}`}
                    style={{ color: "var(--navy)" }}
                  />
                </div>
                <span
                  className={`${bank.featured ? "text-base font-bold" : "text-sm font-bold"}`}
                  style={{
                    color: bank.featured
                      ? "var(--navy)"
                      : "var(--color-text-light)",
                  }}
                >
                  {bank.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ══════ PHASE 3: SCREEN TRANSITION ══════ */}
        <motion.div
          style={{ opacity: screenFillOpacity, willChange: "opacity" }}
          className="fixed inset-0 z-[100] pointer-events-none"
          data-phase="3"
        >
          <div
            className="w-full h-full"
            style={{ background: "var(--navy)" }}
          />
        </motion.div>

        {/* ══════ PHASE 4: DOCUMENT TRANSFORMATION ══════ */}
        <motion.div
          style={{ opacity: phase4Opacity }}
          className="fixed inset-0 z-[200] flex items-center justify-center px-12 lg:px-24 max-w-7xl mx-auto w-full pointer-events-none"
        >
          <div className="flex items-center justify-center w-full h-full">
            {/* Left: Document */}
            <div className="w-1/2 flex justify-center items-center relative h-full">
              <motion.div
                style={{
                  x: docX,
                  width: docWidth,
                  height: docHeight,
                  backgroundColor: docBg,
                  borderRadius: docRadius,
                  boxShadow: docShadow,
                }}
                className="relative flex flex-col items-center justify-center overflow-hidden p-8"
              >
                {/* Bill Lines */}
                <motion.div
                  style={{ opacity: docLinesOpacity }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <CreditCard className="w-12 h-12 text-white/30 mb-3" />
                  <div className="w-24 h-1.5 bg-white/20 rounded-full mb-2" />
                  <div className="w-16 h-1.5 bg-white/20 rounded-full" />
                </motion.div>

                {/* Document Header */}
                <motion.div
                  style={{ opacity: docHeaderOpacity }}
                  className="absolute top-8 left-8 right-8 flex flex-col items-center border-b-2 border-slate-200 pb-6"
                >
                  <ShieldCheck
                    className="w-12 h-12 mb-2"
                    style={{ color: "var(--teal)" }}
                  />
                  <h2
                    className="text-2xl font-black tracking-widest uppercase text-center"
                    style={{ color: "var(--navy)" }}
                  >
                    Official Document
                  </h2>
                  <p className="text-xs text-slate-500 font-mono mt-1">
                    DOC ID: MQ-99482-2026
                  </p>
                </motion.div>

                {/* Document Body */}
                <motion.div
                  style={{ opacity: docBodyOpacity }}
                  className="absolute top-48 left-8 right-8 flex flex-col gap-4"
                >
                  {[
                    { label: "Account Holder", value: "John Doe" },
                    { label: "Card Number", value: "****-****-****-4920", mono: true },
                    { label: "Issuer", value: "J.P. Morgan Chase Bank" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between items-end border-b border-slate-100 pb-2"
                    >
                      <span className="text-xs font-bold text-slate-400 uppercase">
                        {row.label}
                      </span>
                      <span
                        className={`text-sm font-bold ${row.mono ? "font-mono" : ""}`}
                        style={{ color: "var(--navy)" }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                  <div
                    className="mt-4 p-4 rounded-lg"
                    style={{
                      background: "var(--color-primary-50)",
                      border: "1px solid var(--color-primary-100)",
                    }}
                  >
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--navy)" }}
                    >
                      This document certifies the successful issuance and
                      activation of the virtual card under the specified program
                      parameters.
                    </p>
                  </div>
                </motion.div>

                {/* Document Footer */}
                <motion.div
                  style={{ opacity: docFooterOpacity }}
                  className="absolute bottom-8 left-8 right-8 pt-6 border-t-2 border-slate-200 flex justify-between items-end"
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase mb-2">
                      Authorized Signature
                    </span>
                    <div
                      className="font-serif text-2xl italic pr-8 border-b border-slate-300"
                      style={{ color: "var(--navy)" }}
                    >
                      James A. Smith
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex gap-0.5">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-8 ${i % 3 === 0 ? "w-1" : i % 2 === 0 ? "w-0.5" : "w-1.5"}`}
                          style={{ background: "var(--navy)" }}
                        />
                      ))}
                    </div>
                    <span className="text-[8px] font-mono text-slate-500 tracking-widest">
                      04928471002
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right: Callouts */}
            <div className="w-1/2 flex flex-col justify-center gap-8 pl-8 relative z-10">
              <motion.div
                style={{
                  opacity: callout1Opacity,
                  y: callout1Y,
                  x: callout1X,
                  willChange: "transform, opacity",
                }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: EASE_STANDARD,
                  }}
                  className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-slate-100 w-80 relative -left-16"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{
                        background: "var(--color-primary-50)",
                        color: "var(--teal)",
                      }}
                    >
                      <Network className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                        Network Size
                      </p>
                      <p
                        className="text-xl font-black"
                        style={{ color: "var(--navy)" }}
                      >
                        15,000+ Partners
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-2 flex-1 rounded-full overflow-hidden"
                        style={{ background: "var(--color-primary-100)" }}
                      >
                        <div
                          className="h-full w-full rounded-full"
                          style={{ background: "var(--teal)" }}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                style={{
                  opacity: callout2Opacity,
                  y: callout2Y,
                  x: callout2X,
                  willChange: "transform, opacity",
                }}
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: EASE_STANDARD,
                    delay: 0.5,
                  }}
                  className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-slate-100 w-72 ml-16"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                        Processing Speed
                      </p>
                      <p
                        className="text-2xl font-black"
                        style={{ color: "var(--navy)" }}
                      >
                        &lt; 2 Seconds
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
                      <Zap className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden relative">
                    <motion.div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{ background: "var(--teal)" }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: EASE_EXPO_OUT,
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                style={{
                  opacity: callout3Opacity,
                  y: callout3Y,
                  x: callout3X,
                  willChange: "transform, opacity",
                }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: EASE_STANDARD,
                    delay: 1,
                  }}
                  className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-slate-100 w-80 relative -left-8"
                >
                  <div className="flex items-center gap-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{
                        background: "var(--color-primary-50)",
                        color: "var(--teal)",
                      }}
                    >
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                        Trust & Scalability
                      </p>
                      <p
                        className="text-base font-bold"
                        style={{ color: "var(--navy)" }}
                      >
                        Bank-Grade Security
                      </p>
                      <p className="text-xs text-slate-500 mt-1 font-medium">
                        99.99% Uptime SLA
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ══════ PHASE 5: STATS ══════ */}
        <motion.div
          style={{ opacity: phase5Opacity }}
          className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Logo cards stack */}
              <div className="flex flex-col gap-4 items-center">
                {[
                  { src: "/svg/static_svg_logo-uber.svg", alt: "Uber", opacity: card0Opacity, y: card0Y },
                  { src: "/svg/static_svg_logo-square.svg", alt: "Square", opacity: card1Opacity, y: card1Y },
                  { src: "/svg/static_svg_logo-instacart.svg", alt: "Instacart", opacity: card2Opacity, y: card2Y },
                  { src: "/svg/static_img_partners_WesternUnion.svg", alt: "Western Union", opacity: card3Opacity, y: card3Y },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    style={{ opacity: card.opacity, y: card.y }}
                    className="w-[320px] flex items-center justify-center"
                  >
                    <div
                      style={{
                        background: "white",
                        borderRadius: "12px",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                        padding: "24px 32px",
                        width: "100%",
                      }}
                    >
                      <img
                        src={card.src}
                        alt={card.alt}
                        className="h-8 object-contain"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right: Stats */}
              <motion.div
                style={{ y: phase5StatsY, opacity: phase5StatsOpacity }}
              >
                <h2
                  className="text-4xl md:text-5xl font-bold mb-12"
                  style={{ color: "var(--navy)" }}
                >
                  The results speak
                  <br />
                  for themselves
                </h2>

                <div className="space-y-8">
                  <div>
                    <p
                      className="text-5xl md:text-6xl font-black"
                      style={{ color: "var(--teal)" }}
                    >
                      $290B+
                    </p>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "var(--color-text-light)" }}
                    >
                      volume processed in 2024
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-5xl md:text-6xl font-black"
                      style={{ color: "var(--teal)" }}
                    >
                      99.99%
                    </p>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "var(--color-text-light)" }}
                    >
                      platform uptime in 2024
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-5xl md:text-6xl font-black"
                      style={{ color: "var(--teal)" }}
                    >
                      40+
                    </p>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "var(--color-text-light)" }}
                    >
                      countries certified to operate
                    </p>
                  </div>
                </div>

                {/* Award badges */}
                <div className="flex items-center gap-6 mt-10">
                  <img
                    src="/svg/static_img_Awards_Updated-logo.svg"
                    alt="Awards"
                    className="h-16 opacity-70"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ══════ PHASE 6: TESTIMONIALS ══════ */}
        <motion.div
          style={{ opacity: phase6Opacity }}
          className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Content */}
              <div>
                <h2
                  className="text-4xl md:text-5xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  We are your
                  <br />
                  trusted partner
                </h2>
                <p
                  className="text-lg mb-8"
                  style={{ color: "var(--color-text-light)" }}
                >
                  Our team of experts provide guidance from setup to launch &
                  scale. Making you successful is our priority.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    "10+ years of modern card issuing experience",
                    "Compliance & risk experts",
                    "80x volume growth since 2017",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "var(--color-primary-50)" }}
                      >
                        <CheckCircle2
                          className="w-4 h-4"
                          style={{ color: "var(--teal)" }}
                        />
                      </div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--navy)" }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <motion.div
                  style={{ opacity: phase6QuoteOpacity }}
                  className="mb-8"
                >
                  <div
                    className="border-l-4 pl-6"
                    style={{ borderColor: "var(--teal)" }}
                  >
                    <img
                      src="/svg/static_img_partners_WesternUnion.svg"
                      alt="Western Union"
                      className="h-6 mb-4"
                    />
                    <p
                      className="text-sm leading-relaxed mb-4 italic"
                      style={{ color: "var(--color-text-light)" }}
                    >
                      "We have seen Epic be the trusted advisor for us on not
                      just issuing the card, but doing the card processing and
                      the card management."
                    </p>
                    <div className="flex items-center gap-3">
                      <img
                        src="/jpg/static_img_partners_Tom%20Mazzaferro.jpeg.jpg"
                        alt="Tom Mazzaferro"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p
                          className="text-sm font-bold"
                          style={{ color: "var(--navy)" }}
                        >
                          Tom Mazzaferro
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--color-text-light)" }}
                        >
                          Chief Data and Innovation Officer, Western Union
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right: Card + Video */}
              <div className="flex flex-col items-center gap-8">
                <motion.div style={{ scale: phase6DocScale }}>
                  <div className="relative">
                    <div className="w-[360px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
                      <div
                        className="p-6"
                        style={{ background: "var(--navy)" }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              E
                            </span>
                          </div>
                          <span className="text-white font-bold text-lg">
                            Epic
                          </span>
                        </div>
                        <img
                          src="/svg/static_img_partners_WU_Card.svg"
                          alt=""
                          className="w-full opacity-80"
                        />
                      </div>

                      <motion.div
                        style={{ opacity: phase6ContentOpacity }}
                        className="p-6"
                      >
                        <img
                          src="/svg/static_img_partners_affirm.svg"
                          alt="Affirm"
                          className="h-6 mb-4"
                        />
                        <p
                          className="text-sm leading-relaxed mb-4"
                          style={{ color: "var(--color-text-light)" }}
                        >
                          "Epic's unique technology provides us the platform
                          and services to help build innovative products that
                          people love."
                        </p>
                        <p
                          className="text-sm font-bold"
                          style={{ color: "var(--navy)" }}
                        >
                          Max Levchin
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--color-text-light)" }}
                        >
                          CEO of Affirm
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Video placeholder */}
                <motion.div
                  style={{ opacity: phase6VideoOpacity }}
                  className="w-[360px]"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src="/png/static_img_partners_partners-video-3.png"
                      alt="Customer spotlight video"
                      className="w-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                        <svg
                          className="w-6 h-6 ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          style={{ color: "var(--teal)" }}
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs font-medium">Watch video</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ══════ PHASE 7: FINAL CTA ══════ */}
        <motion.div
          style={{ opacity: phase7Opacity }}
          className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ background: "var(--navy)" }}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center p-12 lg:p-20">
                {/* Left: Text */}
                <motion.div style={{ y: phase7Y }}>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Start innovating
                    <br />
                    with Epic today
                  </h2>
                  <p className="text-lg text-white/60 mb-8">
                    Let's talk about your use case and how we can help.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center px-8 py-4 text-base font-medium rounded-full transition-all hover:opacity-90 hover:shadow-xl"
                    style={{ background: "var(--teal)", color: "white" }}
                  >
                    Contact us
                  </a>
                </motion.div>

                {/* Right: Phone + Card */}
                <motion.div
                  style={{ x: phase7PhoneX, opacity: phase7PhoneOpacity }}
                  className="flex justify-center items-center relative"
                >
                  <img
                    src="/png/static_img_innovating_footer-phone.png"
                    alt="Phone"
                    className="relative z-10 h-[400px] object-contain"
                  />
                  <img
                    src="/png/static_img_innovating_card-shadow.png"
                    alt="Card"
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 h-[250px] object-contain opacity-80"
                  />
                </motion.div>
              </div>

              {/* Decorative gradient orbs */}
              <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-[120px]"
                style={{ background: "var(--teal)" }}
              />
              <div
                className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 blur-[80px]"
                style={{ background: "var(--navy-light)" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
