"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ChevronDown, Shield, Megaphone, Users, MapPin } from 'lucide-react';
import { TRUSTBOND_PROJECTS } from '@/config/projects';

export default function HeroCivic({ className = '' }: { className?: string }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.3 });
      gsap.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.6 });
      gsap.fromTo(buttonsRef.current?.children || [], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.8 });
      gsap.fromTo(cardRef.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.5 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className={`relative min-h-screen w-full overflow-hidden flex items-center ${className}`}
      style={{ background: 'linear-gradient(135deg, #C41E3A 0%, #8B0000 100%)' }}>
      {/* Abstract wave overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="white" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFD700] text-[#1a1a1a] mb-8">
              <span className="w-2 h-2 bg-[#8B0000] rounded-full animate-pulse" />
              <span className="text-sm font-semibold">Projeto Ativo</span>
            </div>

            <h1 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              Amplifique Vozes Cidadãs na <span className="text-[#FFD700]">Estratégia Fiscal</span>
            </h1>

            <p ref={subtitleRef} className="text-xl text-white/80 max-w-xl mb-10">
              Plataforma digital de participação cidadã para influenciar o County Fiscal Strategy Paper 2026 de Kakamega. Sua voz molda prioridades de desenvolvimento.
            </p>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href={TRUSTBOND_PROJECTS.HOME} target="_blank" rel="noopener noreferrer"
                className="bg-[#FFD700] hover:bg-yellow-300 text-[#1a1a1a] font-bold rounded-xl px-10 py-5 text-lg transition-all duration-300 shadow-xl inline-flex items-center justify-center gap-3 group">
                Apoiar Projeto <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button onClick={() => document.getElementById('projeto')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white/60 hover:border-white text-white font-medium rounded-xl px-8 py-5 text-lg transition-all duration-300">
                Conheça o projeto
              </button>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <span className="font-bold text-[#FFD700] text-xl">98</span>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Integrity Score</p>
                  <p className="text-white/50 text-xs">TrustScore</p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/30" />
              <div>
                <p className="text-2xl font-bold text-white">$125K</p>
                <p className="text-white/50 text-xs">Meta de arrecadação</p>
              </div>
            </div>
          </div>

          {/* Right column — engagement card */}
          <div ref={cardRef} className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#FFD700] rounded-xl flex items-center justify-center">
                  <Megaphone className="w-6 h-6 text-[#1a1a1a]" />
                </div>
                <div>
                  <p className="font-semibold text-white">Participação Digital</p>
                  <p className="text-sm text-white/50">Kakamega County</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-sm text-white/50 mb-2">Engajamento Cidadão</p>
                  <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#FFD700] h-2 rounded-full" style={{ width: '65%' }} />
                  </div>
                  <p className="text-xs mt-2 text-white/40">65% da meta de participantes</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <MapPin className="w-5 h-5 text-[#FFD700] mx-auto mb-1" />
                    <p className="text-2xl font-bold text-[#FFD700]">50+</p>
                    <p className="text-xs text-white/50">Municipalidades</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <Users className="w-5 h-5 text-[#FFD700] mx-auto mb-1" />
                    <p className="text-2xl font-bold text-[#FFD700]">10K+</p>
                    <p className="text-xs text-white/50">Cidadãos Engajados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
        <span className="text-xs uppercase tracking-widest">Role para explorar</span><ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
}
