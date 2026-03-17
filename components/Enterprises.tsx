"use client";

import { useRef, useEffect } from "react";

export default function Enterprises() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="enterprises"
      className="relative py-24 lg:py-32"
      style={{ background: "var(--color-bg, #fff)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <div
            ref={sectionRef}
            className="max-w-xl"
            style={{
              opacity: 0,
              transform: "translateY(40px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <p
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--teal)" }}
            >
              Trusted by leaders
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-[44px] font-bold leading-tight mb-6"
              style={{ color: "var(--navy)", letterSpacing: "-0.02em" }}
            >
              From franchise groups to single-point dealers, top performers count on
              Epic
            </h2>
            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: "var(--color-text-light)" }}
            >
              Dealerships of every size use Epic to eliminate manual payoff
              calls, accelerate lien releases, and get funded faster — turning
              a days-long back-office headache into a single click.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-base font-semibold"
              style={{ color: "var(--navy)" }}
            >
              See how top dealers use Epic
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="ml-2"
              >
                <path
                  d="M7 4l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Right: Empty — the floating card occupies this space */}
          <div className="hidden lg:block" style={{ minHeight: 400 }} />
        </div>
      </div>
    </section>
  );
}
