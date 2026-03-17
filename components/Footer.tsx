const footerColumns = [
  {
    title: "Solutions",
    links: [
      "Solution overview",
      "Loan payoff automation",
      "Lien release tracking",
      "Dealer funding",
      "Title management",
      "Floor plan payoffs",
      "Multi-location management",
      "DMS integrations",
    ],
  },
  {
    title: "Product",
    links: [
      "Platform overview",
      "Payoff quotes",
      "Lender network",
      "Real-time tracking",
      "Reporting & analytics",
      "Bulk payoffs",
      "ACH & wire processing",
      "Open API & webhooks",
    ],
  },
  {
    title: "Developers",
    links: [
      "Developer portal",
      "Guides",
      "DiVA API",
      "Core API",
      "Epic status",
    ],
  },
  {
    title: "Company",
    links: [
      "About us",
      "Why Epic",
      "Careers & culture",
      "Leadership",
      "Newsroom",
      "Blog",
      "Contact us",
      "Investor relations",
    ],
  },
  {
    title: "Legal",
    links: [
      "Terms",
      "API terms",
      "Website Privacy Notice",
      "Services Privacy Notice",
      "Cookie Notice",
      "Responsible disclosure",
      "Accessibility statement",
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--navy)" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-20 pb-10">
        {/* Logo + Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {/* Logo Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 mb-8 lg:mb-0">
            <a href="#" className="flex items-center mb-6">
              <img
                src="https://cdn.prod.website-files.com/6553cf011e8a0486706be737/695ed5e2c0665e0cb8a214aa_EPIC_Logo_WHT_Tag-smaller.avif"
                alt="Epic"
                className="h-8 w-auto"
              />
            </a>

            {/* Social */}
            <div className="flex items-center gap-4 mt-6">
              {["facebook", "twitter", "linkedin"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all"
                >
                  <span className="text-xs font-bold uppercase">
                    {social[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold text-white mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/40 hover:text-white/80 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; 2026 Epic, Inc.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/30">🇺🇸 USA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
