"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { TRUSTBOND_PROJECTS } from '@/config/projects';

export default function HeroVT({ className = '' }: { className?: string }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.3 });
      gsap.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.6 });
      gsap.fromTo(buttonsRef.current?.children || [], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.8 });
      gsap.fromTo(imageRef.current, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power4.out', delay: 0.2 });
      gsap.fromTo(statsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 1 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className={`relative min-h-screen w-full overflow-hidden bg-[#0A1F0A] ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F0A] via-[#14331A]/20 to-[#0A1F0A]" />

      {/* Content Grid */}
      <div className="relative z-10 grid lg:grid-cols-2 min-h-screen">
        {/* Left - Text */}
        <div className="flex flex-col justify-center px-6 sm:px-8 lg:px-16 xl:px-24 pt-24 lg:pt-0">
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14331A]/30 border border-[#4ADE80]/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
              <span className="text-sm text-[#4ADE80] font-medium">Projeto Ativo</span>
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Transforme{' '}
              <span className="bg-gradient-to-r from-[#4ADE80] to-[#22C55E] bg-clip-text text-transparent">Resíduos</span>{' '}
              em Energia Limpa
            </h1>

            {/* Subtitle */}
            <p ref={subtitleRef} className="text-lg sm:text-xl text-white/70 leading-relaxed mb-8">
              Convertendo <span className="text-[#4ADE80] font-semibold">720 toneladas/ano</span> de óleo de 
              cozinha usado em produtos verdes e combustível sustentável. 
              Contribuição transparente e segura.
            </p>

            {/* Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
              <a
                href={TRUSTBOND_PROJECTS.HOME}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#4ADE80] hover:bg-white text-[#0A1F0A] font-semibold rounded-full px-8 py-4 text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] inline-flex items-center justify-center gap-2 group"
              >
                Apoiar Projeto
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => document.getElementById('projeto')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-4 text-base transition-all duration-300"
              >
                Conheça o projeto
              </button>
            </div>

            {/* Stats mini */}
            <div ref={statsRef} className="flex items-center gap-8 mt-10 pt-8 border-t border-white/10">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">98<span className="text-[#4ADE80]">/100</span></div>
                <div className="text-sm text-white/50">Integrity Score</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">$537K</div>
                <div className="text-sm text-white/50">Meta de arrecadação</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Image */}
        <div className="relative hidden lg:block">
          <div ref={imageRef} className="absolute inset-0">
            <img
              src="/images/vivaterra/hero-bioenergy.jpg"
              alt="Instalação de processamento de biocombustível"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F0A] via-[#0A1F0A]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F0A] via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Mobile Image */}
      <div className="lg:hidden relative h-64 mt-8">
        <img src="/images/vivaterra/hero-bioenergy.jpg" alt="Instalação de processamento de biocombustível" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F0A] via-[#0A1F0A]/50 to-transparent" />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
        <span className="text-xs uppercase tracking-widest">Role para explorar</span>
        <ChevronDown className="w-5 h-5" />
      </div>

      {/* Decorative */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#4ADE80]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#14331A]/10 rounded-full blur-3xl" />
    </section>
  );
}
