'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '@/sections/HeroSection';
import ManifestoSection from '@/sections/ManifestoSection';
import ProjectStorySection from '@/sections/ProjectStorySection';
import TransparencySection from '@/sections/TransparencySection';
import PhasePlanSection from '@/sections/PhasePlanSection';
import ImpactSection from '@/sections/ImpactSection';
import GallerySection from '@/sections/GallerySection';
import FAQSection from '@/sections/FAQSection';
import ClosingCTASection from '@/sections/ClosingCTASection';
import Navigation from '@/components/Navigation';

// Make sure to import GSAP plugins in a client component
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OriginalOngTemplate() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // No-op - pinning and snapping removed for Safari stability
  }, []);

  return (
    <div ref={mainRef} className="relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Sections */}
      <main className="relative">
        <HeroSection className="z-10" />
        <ManifestoSection className="z-20" />
        <ProjectStorySection className="z-30" />
        <TransparencySection className="z-40" />
        <PhasePlanSection className="z-50" />
        <ImpactSection className="z-50" />
        <GallerySection className="z-50" />
        <FAQSection className="z-50" />
        <ClosingCTASection className="z-[60]" />
      </main>
    </div>
  );
}
