"use client";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PartnerLogos from "@/components/PartnerLogos";
import Enterprises from "@/components/Enterprises";
import Features from "@/components/Features";
import Tailored from "@/components/Tailored";
import DocumentTransform from "@/components/DocumentTransform";
import ScrollAnimation from "@/components/ScrollAnimation";
import PartnerGrid from "@/components/PartnerGrid";
import Footer from "@/components/Footer";
import FloatingCard from "@/components/FloatingCard";

export default function Home() {
  return (
    <div className="relative">
      <FloatingCard />
      <Nav />
      <Hero />
      <PartnerLogos />
      <Enterprises />
      <Features />
      <Tailored />
      <DocumentTransform />
      <PartnerGrid />
      <ScrollAnimation />
      <Footer />
    </div>
  );
}
