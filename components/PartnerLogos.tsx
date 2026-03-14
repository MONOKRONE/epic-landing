const partners = [
  { name: "LendingClub", logo: "https://cdn.prod.website-files.com/6553cf011e8a0486706be737/656f8fc7083d55d701f00e18_lendingclub.svg.png" },
  { name: "Darwin", logo: "https://cdn.prod.website-files.com/6553cf011e8a0486706be737/656f8fc7083d55d701f00e2c_darwin.png" },
  { name: "Group 1", logo: "https://cdn.prod.website-files.com/6553cf011e8a0486706be737/67ffd533bcc7085812a79eb2_group1-logo.avif" },
  { name: "Pohanka", logo: "https://cdn.prod.website-files.com/6553cf011e8a0486706be737/67ffd5355648502ae71cc17a_pohanka-logo.avif" },
  { name: "Lithia Motors", logo: "https://cdn.prod.website-files.com/6553cf011e8a0486706be737/68700e0d0ae116b7b6beafde_Lithia-Motors-logo.png" },
  { name: "Upstart", logo: "https://cdn.prod.website-files.com/6553cf011e8a0486706be737/656f8fc7083d55d701f00e27_upstart.png" },
  { name: "Elk Grove Buick GMC", logo: "https://cdn.prod.website-files.com/6553cf011e8a0486706be737/67ffd533d0a8dd67912e67f5_elf-grove-buik-gmc-logo.avif" },
  { name: "Countryside", logo: "https://cdn.prod.website-files.com/6553cf011e8a0486706be737/67ffd533c62fff2741def146_countryside-logo.avif" },
  { name: "American Motorcycle Trading", logo: "https://cdn.prod.website-files.com/6553cf011e8a0486706be737/67ffd53382dd90a657dc2762_american-motorcycle-trading-logo.png" },
  { name: "Elk Grove Toyota", logo: "https://cdn.prod.website-files.com/6553cf011e8a0486706be737/67ffd748260047c87246f2d9_elk-grove-toyota-logo.avif" },
];

export default function PartnerLogos() {
  const doubled = [...partners, ...partners];

  return (
    <section
      className="py-16 border-y overflow-hidden"
      style={{
        background: "var(--color-bg)",
        borderColor: "var(--gray-200)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-10">
        <p
          className="text-center text-sm font-medium uppercase tracking-widest"
          style={{ color: "var(--color-text-light)" }}
        >
          Trusted by leading dealerships and lenders
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--color-bg), transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, var(--color-bg), transparent)",
          }}
        />

        <div
          className="flex animate-marquee items-center"
          style={{ width: "max-content" }}
        >
          {doubled.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="partner-logo flex-none flex items-center justify-center cursor-pointer"
              style={{ paddingLeft: "48px", paddingRight: "48px" }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-10 w-auto object-contain max-w-[160px]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
