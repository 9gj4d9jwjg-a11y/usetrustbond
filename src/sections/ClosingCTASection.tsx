"use client";

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ClosingCTASectionProps {
  className?: string;
}

const ClosingCTASection = ({ className = '' }: ClosingCTASectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Content Entrance
      gsap.fromTo(
        [quoteRef.current, ctaRef.current, linkRef.current],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen bg-[#1F1F1F] flex items-center justify-center py-24 ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full opacity-60"
        style={{
          backgroundImage: 'url(/closing_sunset.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Vignette Overlay */}
      <div className="vignette" />

      {/* Rice Paper Texture Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
      >
        <div className="text-center max-w-2xl">
          {/* Quote */}
          <blockquote
            ref={quoteRef}
            className="text-xl sm:text-2xl lg:text-3xl text-white font-serif leading-relaxed mb-10"
          >
            Cada semente contém a árvore inteira.
            <br />
            Cada doação contém o projeto inteiro.
            <br />
            <span className="text-white/80">
              Mas só germina com cuidado, paciência e evidência.
            </span>
          </blockquote>

          {/* CTA Button */}
          <button
            ref={ctaRef}
            className="btn-accent text-lg px-10 py-5 mb-6 inline-flex items-center gap-3 group"
          >
            Fazer parte da prática
            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          {/* Secondary Link */}
          <div>
            <a
              ref={linkRef}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('Em breve: página de visitação ao templo');
              }}
              className="text-white/70 text-sm hover:text-white transition-colors underline underline-offset-4"
            >
              Ou visite o templo primeiro
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 py-6 px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 40 40" className="w-8 h-8">
              <circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="white"
                strokeWidth="1"
                opacity="0.6"
              />
              <text
                x="20"
                y="24"
                textAnchor="middle"
                className="text-[8px] fill-white"
                style={{ fontFamily: 'serif' }}
              >
                曹洞
              </text>
            </svg>
            <span className="font-serif text-xs tracking-widest text-white/60">
              ENKOJI
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://temploenkoji.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/60 hover:text-white transition-colors"
            >
              temploenkoji.org.br
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('Em breve: página de transparência');
              }}
              className="text-xs text-white/60 hover:text-white transition-colors"
            >
              Transparência
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('Em breve: página de contato');
              }}
              className="text-xs text-white/60 hover:text-white transition-colors"
            >
              Contato
            </a>
          </div>

          {/* Seal */}
          <div className="text-center">
            <p className="text-[10px] text-white/40 max-w-[200px] leading-tight">
              Templo Budista Zen Enkoji · Itapecerica da Serra, SP
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ClosingCTASection;
