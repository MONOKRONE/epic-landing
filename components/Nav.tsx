import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { label: "Solutions", href: "#" },
  { label: "Product", href: "#" },
  { label: "Developers", href: "#" },
  { label: "Company", href: "#" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[9999] transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        boxShadow: scrolled ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
        borderBottom: scrolled ? "1px solid var(--gray-200)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="#" className="flex items-center shrink-0">
            <img
              src="https://cdn.prod.website-files.com/6553cf011e8a0486706be737/695ed5e1b9a1ef5aee799c2f_EPIC_Logo_BLK_Tag-smaller.avif"
              alt="Epic"
              className="h-8 w-auto"
            />
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{ color: "var(--navy)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--gray-50)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {link.label}
                <svg
                  className="inline-block ml-1 w-3.5 h-3.5 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#"
              className="text-sm font-medium px-4 py-2 transition-colors"
              style={{ color: "var(--navy)" }}
            >
              Log in
            </a>
            <a
              href="#"
              className="text-sm font-medium text-white px-6 py-2.5 rounded-full transition-all hover:opacity-90 hover:shadow-lg"
              style={{ background: "var(--navy)" }}
            >
              Contact sales
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={
                mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
              }
              className="block w-6 h-0.5 origin-center"
              style={{ background: "var(--navy)" }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5"
              style={{ background: "var(--navy)" }}
            />
            <motion.span
              animate={
                mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
              }
              className="block w-6 h-0.5 origin-center"
              style={{ background: "var(--navy)" }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t overflow-hidden"
            style={{ borderColor: "var(--gray-200)" }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3 text-base font-medium rounded-lg hover:bg-slate-50"
                  style={{ color: "var(--navy)" }}
                >
                  {link.label}
                </a>
              ))}
              <hr className="my-3" style={{ borderColor: "var(--gray-200)" }} />
              <a
                href="#"
                className="px-4 py-3 text-base font-medium"
                style={{ color: "var(--navy)" }}
              >
                Log in
              </a>
              <a
                href="#"
                className="mx-4 mt-2 mb-4 text-center text-base font-medium text-white px-5 py-3 rounded-full"
                style={{ background: "var(--navy)" }}
              >
                Contact sales
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
