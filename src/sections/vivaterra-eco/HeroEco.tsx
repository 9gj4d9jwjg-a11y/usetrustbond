"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { TRUSTBOND_PROJECTS } from '@/config/projects';

export default function HeroEco({ className = '' }: { className?: string }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.3 });
      gsap.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.6 });
      gsap.fromTo(buttonsRef.current?.children || [], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.8 });
      gsap.fromTo(statsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 1 });
      gsap.fromTo(progressRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 1.2 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className={`relative min-h-screen w-full overflow-hidden bg-[#0A1F0A] flex items-center ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F0A] via-[#14331A]/30 to-[#0A1F0A]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full grid lg:grid-cols-5 gap-12 items-center">
        <div className="lg:col-span-3">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8">
            <span className="w-2 h-2 bg-[#4ADE80] rounded-full animate-pulse" />
            <span className="text-sm text-white font-medium">VivaTerra • Parceiro Verificado</span>
          </div>

          <h1 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">
            Transforme Resíduos em{' '}
            <span className="bg-gradient-to-r from-[#4ADE80] to-[#22C55E] bg-clip-text text-transparent">Limpeza Sustentável</span>
          </h1>

          <p ref={subtitleRef} className="text-xl sm:text-2xl text-white/80 max-w-lg mb-12">
            Escalando marcas de limpeza sustentável para <span className="text-[#4ADE80] font-semibold">20 milhões</span> de pessoas na Grande São Paulo.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
            <a href={TRUSTBOND_PROJECTS.HOME} target="_blank" rel="noopener noreferrer"
              className="bg-white hover:bg-[#ECFDF5] text-[#0A1F0A] font-semibold rounded-full px-10 py-5 text-lg transition-all duration-300 shadow-xl inline-flex items-center justify-center gap-3 group">
              Apoiar Projeto <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white/60 hover:border-white text-white font-medium rounded-full px-8 py-5 text-lg transition-all duration-300">
              Conheça o projeto
            </button>
          </div>

          <div ref={statsRef} className="mt-16 flex flex-wrap gap-8 items-center">
            <div className="bg-white/95 text-[#0A1F0A] px-7 py-5 rounded-3xl shadow-2xl flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#059669]">94</div>
                <div className="text-[10px] font-medium tracking-widest -mt-1">/100</div>
              </div>
              <div>
                <div className="font-semibold text-sm">Integrity Score</div>
                <div className="text-zinc-500 text-xs">Transparência Trustbond</div>
              </div>
            </div>
            <div>
              <div className="uppercase text-xs tracking-widest font-medium text-white/70">Meta de arrecadação</div>
              <div className="text-4xl font-semibold text-white">R$ 383.000</div>
            </div>
          </div>
        </div>

        {/* Floating Progress Card */}
        <div ref={progressRef} className="hidden lg:block lg:col-span-2">
          <div className="bg-white text-[#0A1F0A] rounded-3xl shadow-2xl p-7">
            <div className="flex justify-between items-baseline mb-4">
              <span className="font-semibold">0% Financiado</span>
              <span className="text-sm text-zinc-500">R$ 0 / R$ 383.000</span>
            </div>
            <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full w-0 bg-gradient-to-r from-[#10B981] to-[#4ADE80] rounded-full" />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-7 text-center text-xs">
              <div><div className="font-mono text-3xl font-bold text-[#059669]">0</div><div className="text-zinc-500">Apoiadores</div></div>
              <div><div className="font-mono text-3xl font-bold text-[#059669]">5×</div><div className="text-zinc-500">Multiplicador</div></div>
              <div><div className="font-mono text-3xl font-bold text-[#059669]">20M</div><div className="text-zinc-500">Pessoas</div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
        <span className="text-xs uppercase tracking-widest">Role para explorar</span>
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
}
