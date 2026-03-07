"use client";

import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background fade in
      tl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );

      // Headline words animation
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.04 },
          '-=0.6'
        );
      }

      // Subheadline
      tl.fromTo(
        subheadRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // Badge
      tl.fromTo(
        badgeRef.current,
        { scale: 0.96, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        '-=0.3'
      );

      // CTAs
      tl.fromTo(
        ctaRef.current?.children || [],
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        '-=0.2'
      );

      // Scroll cue
      tl.fromTo(
        scrollCueRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.1'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Simple entrance animations already handled in useEffect above
  // Removing scroll-driven pinning and exit animations for stability
  useLayoutEffect(() => {
    // No-op for scrub/pin
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section-pinned ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/enkoji/hero_temple_v3.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: '50% 60%',
        }}
      />

      {/* Vignette Overlay */}
      <div className="vignette" />

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
      >

        {/* Center Content */}
        <div className="text-center max-w-3xl">
          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-serif uppercase tracking-[0.02em] mb-6"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
          >
            <span className="word inline-block">Horta</span>{' '}
            <span className="word inline-block">e</span>{' '}
            <span className="word inline-block">Árvores:</span>{' '}
            <span className="word inline-block text-2xl sm:text-3xl lg:text-4xl block mt-2 lowercase italic opacity-90">Cultivando Alimentos e Futuro para Crianças</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadRef}
            className="text-lg md:text-xl text-white font-light tracking-wide max-w-2xl mx-auto mb-8"
            style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
          >
            Transforme sementes em esperança. Ajude a Enkoji a educar e alimentar através do contato com a natureza.
          </p>

          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 rounded-full border border-black/10 mb-10 shadow-lg"
          >
            <Lock size={14} className="text-[#4A5D23]" />
            <span className="text-sm text-[#1F1F1F] font-medium">
              Contribuição transparente e segura - garantia TrustBond.app
            </span>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">Apoiar Projeto</button>
            <button className="btn-secondary">Conheça o projeto</button>
          </div>
        </div>

        {/* Scroll Cue */}
        <div
          ref={scrollCueRef}
          className="absolute bottom-[4vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
        >
          <span className="text-xs text-white tracking-wide">Role para explorar</span>
          <ChevronDown size={20} className="text-white animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
