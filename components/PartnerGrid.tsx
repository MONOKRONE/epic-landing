"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function PartnerGrid() {
  const gridWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridWrapper = gridWrapperRef.current;
    const canvas = canvasRef.current;
    const logoOverlay = logoOverlayRef.current;
    if (!gridWrapper || !canvas || !logoOverlay) return;

    const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
    if (!gl) return;
    gl.getExtension("OES_standard_derivatives");

    // Shaders
    const vertSrc = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragSrc = `
      #extension GL_OES_standard_derivatives : enable
      precision highp float;
      varying vec2 v_uv;
      uniform float u_progress;
      uniform vec2 u_resolution;
      uniform float u_time;

      const float COLS = 5.0;
      const float ROWS = 7.0;

      float sdRoundedBox(vec2 p, vec2 b, float r) {
        vec2 q = abs(p) - b + r;
        return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
      }

      void main() {
        vec2 uv = v_uv;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
        float t = u_progress;

        // Warp: curtain pull
        float warpAmt = t * t * 5.0;
        float yBottom = clamp(0.5 - p.y, 0.0, 1.0);
        float xSpread = 1.0 + warpAmt * yBottom * yBottom;
        vec2 warped;
        warped.x = p.x / xSpread;
        warped.y = -p.y - 1.45;

        // Zoom
        float zoom = 1.0 + t * t * 8.0;
        warped /= zoom;

        // Grid coordinates
        float gridW = aspect * 1.045;
        float gridH = 4.18;
        vec2 gridUV = vec2(
          (warped.x + gridW * 0.5) / gridW * COLS,
          (warped.y + gridH * 0.5) / gridH * ROWS
        );
        // Staircase: each column shifts down by 33% of one cell height
        float colIndex = clamp(floor(gridUV.x), 0.0, COLS - 1.0);
        float stairOffset = colIndex * 0.33;
        gridUV.y -= stairOffset;

        vec2 cellUV = fract(gridUV);
        float gap = mix(0.025, 0.012, t);
        float cornerR = mix(0.045, 0.003, t);

        vec2 cellCenter = cellUV - 0.5;
        vec2 halfBox = vec2(0.5 - gap);
        float d = sdRoundedBox(cellCenter, halfBox, cornerR);
        float aa = fwidth(d);
        float cellMask = 1.0 - smoothstep(-aa, aa, d);

        float inGrid = step(0.0, gridUV.x) * step(0.0, gridUV.y)
                     * step(gridUV.x, COLS) * step(gridUV.y, ROWS);

        // Colors — use Epic purple
        vec3 purple = vec3(0.165, 0.125, 0.416); // #2A206A
        vec3 white = vec3(1.0);

        float bgFade = smoothstep(0.75, 1.0, t);
        vec3 bg = mix(purple, white, bgFade);
        vec3 color = mix(bg, white, cellMask * inGrid);

        float fullWhite = smoothstep(0.9, 1.0, t);
        color = mix(color, white, fullWhite);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Compile shaders
    function createShader(type: number, source: string) {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error("Shader error:", gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vert = createShader(gl.VERTEX_SHADER, vertSrc);
    const frag = createShader(gl.FRAGMENT_SHADER, fragSrc);
    if (!vert || !frag) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Fullscreen quad
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uProgress = gl.getUniformLocation(program, "u_progress");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");

    // Resize
    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas!.width = canvas!.clientWidth * dpr;
      canvas!.height = canvas!.clientHeight * dpr;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform2f(uResolution, canvas!.width, canvas!.height);
    }
    window.addEventListener("resize", resize);
    resize();

    // Animation state
    let scrollProgress = 0;
    const startTime = performance.now();
    let animFrameId: number;

    // GSAP ScrollTrigger
    const ctx = gsap.context(() => {
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: gridWrapper,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
            onUpdate: (self) => {
              scrollProgress = self.progress;
            },
          },
        }
      );

      // Fade out logo overlay
      gsap.to(logoOverlay!, {
        scrollTrigger: {
          trigger: gridWrapper,
          start: "top top",
          end: "30% top",
          scrub: 0.5,
        },
        opacity: 0,
      });
    }, gridWrapper);

    // Render loop
    function render() {
      const elapsed = (performance.now() - startTime) / 1000;
      gl!.uniform1f(uProgress, scrollProgress);
      gl!.uniform1f(uTime, elapsed);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      animFrameId = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
      ctx.revert();
    };
  }, []);

  return (
    <section style={{ zIndex: 52, position: "relative" }}>

      {/* PART A: Stats — normal scroll, Marqeta-style layout */}
      <div style={{ background: "#2A206A" }} className="py-16 lg:py-24">
        <div style={{ maxWidth: 1200, margin: "0 auto" }} className="px-4 lg:px-10">

          {/* Big stat */}
          <div style={{ textAlign: "right", marginBottom: 48 }}>
            <p style={{ fontSize: 80, fontWeight: 900, color: "#20A472", lineHeight: 1 }}>$290B+</p>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>volume processed in 2024</p>
          </div>

          {/* Two stats side by side */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 80, marginBottom: 48 }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 56, fontWeight: 900, color: "#20A472", lineHeight: 1 }}>99.99%</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>platform uptime in 2024</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 56, fontWeight: 900, color: "#20A472", lineHeight: 1 }}>2,500+</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>lender connections nationwide</p>
            </div>
          </div>

          {/* Awards */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 24 }}>
            <img src="/svg/static_img_Awards_Updated-logo.svg" alt="Awards" style={{ height: 80, opacity: 1.0 }} />
          </div>
        </div>
      </div>

      {/* PART B: WebGL Grid zoom — scroll driven */}
      <div ref={gridWrapperRef} className="hidden lg:block" style={{ height: "400vh", position: "relative" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "block",
            }}
          />
          {/* Logo overlay on top of canvas */}
          <div
            ref={logoOverlayRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                width: "70vw",
                height: "75vh",
                gap: 0,
                position: "relative",
              }}
            >
              {[
                "CHASE", "ALLY FINANCIAL", "WELLS FARGO", "CAPITAL ONE", "TRUIST",
                "US BANK", "TD BANK", "CITIZENS", "PNC", "NAVY FEDERAL",
                "FIFTH THIRD", "", "DOORDASH", "", "",
                "", "", "", "", "",
              ].map((name, i) => {
                const col = i % 5;
                const row = Math.floor(i / 5);
                const stairPx = col * 33;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "clamp(0.7rem, 1.1vw, 1.1rem)",
                      fontWeight: 600,
                      color: "#2A206A",
                      opacity: name ? 0.35 : 0,
                      letterSpacing: 1,
                      textTransform: "uppercase" as const,
                      marginTop: row === 0 ? `${stairPx}%` : 0,
                    }}
                  >
                    {name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* PART C: Mobile fallback */}
      <div className="lg:hidden" style={{ background: "#2A206A" }}>
        <div className="px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">The results speak for themselves</h2>
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-3xl font-black" style={{ color: "#20A472" }}>$290B+</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>volume processed in 2024</p>
            </div>
            <div>
              <p className="text-3xl font-black" style={{ color: "#20A472" }}>99.99%</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>platform uptime in 2024</p>
            </div>
            <div>
              <p className="text-3xl font-black" style={{ color: "#20A472" }}>2,500+</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>lender connections nationwide</p>
            </div>
          </div>
          <div className="mt-8">
            <img src="/svg/static_img_Awards_Updated-logo.svg" alt="Awards" style={{ height: 48, margin: "0 auto" }} />
          </div>
        </div>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full block" style={{ height: 80 }} xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C480,120 960,120 1440,0 L1440,0 L0,0 Z" fill="#2A206A" />
        </svg>
      </div>
    </section>
  );
}
