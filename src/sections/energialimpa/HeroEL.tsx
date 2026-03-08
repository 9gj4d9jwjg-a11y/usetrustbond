"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroEL = ({ className = '' }: { className?: string }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(bgRef.current, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1.2 });

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(words, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.04 }, '-=0.6');
      }

      tl.fromTo(subheadRef.current, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4');
      tl.fromTo(badgeRef.current, { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 }, '-=0.3');
      tl.fromTo(ctaRef.current?.children || [], { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, '-=0.2');
      tl.fromTo(scrollCueRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.1');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`section-pinned ${className}`}>
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/enkoji/aerial_temple.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: '50% 40%',
        }}
      />

      <div className="vignette" />

      <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-serif uppercase tracking-[0.02em] mb-6"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
          >
            <span className="word inline-block">Proteja</span>{' '}
            <span className="word inline-block">o</span>{' '}
            <span className="word inline-block">Sagrado.</span>{' '}
            <span className="word inline-block">Ilumine</span>{' '}
            <span className="word inline-block">o</span>{' '}
            <span className="word inline-block">Futuro.</span>
          </h1>

          <p
            ref={subheadRef}
            className="text-lg md:text-xl text-white font-light tracking-wide max-w-2xl mx-auto mb-8"
            style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
          >
            Transforme sua doação em legado sustentável. Telhado novo + infraestrutura para energia solar no Templo Enkoji.
          </p>

          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 rounded-full border border-black/10 mb-10 shadow-lg"
          >
            <Lock size={14} className="text-[#4A5D23]" />
            <span className="text-sm text-[#1F1F1F] font-medium">
              Contribuição transparente e segura - garantia TrustBond.app
            </span>
          </div>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">Apoiar Projeto</button>
            <button className="btn-secondary">Conheça o projeto</button>
          </div>
        </div>

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

export default HeroEL;
