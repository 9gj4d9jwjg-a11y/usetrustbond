"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ChevronDown, Shield } from 'lucide-react';
import { TRUSTBOND_PROJECTS } from '@/config/projects';

export default function HeroTech({ className = '' }: { className?: string }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.3 });
      gsap.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.6 });
      gsap.fromTo(buttonsRef.current?.children || [], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.8 });
      gsap.fromTo(statsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 1 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className={`relative min-h-screen w-full overflow-hidden bg-[#0A1F0A] flex items-center ${className}`}>
      {/* Tech grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#4ADE80 1px, transparent 1px), linear-gradient(90deg, #4ADE80 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F0A] via-[#0A1F0A]/90 to-[#14331A]/40" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 w-full">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8">
          <span className="w-2 h-2 bg-[#4ADE80] rounded-full animate-pulse" />
          <span className="text-sm text-white font-medium">TrustBond Labs • Parceiro Verificado</span>
        </div>

        <h1 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">
          <span className="text-[#4ADE80]">#</span> Tech-Rastreabilidade
        </h1>

        <p ref={subtitleRef} className="text-xl sm:text-2xl text-white/80 max-w-2xl mb-12">
          Substituindo promessas por <span className="text-[#4ADE80] font-semibold">evidências em blockchain</span>. App gamificado, marketplace local, wallet tokenizada e rastreabilidade total.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 mb-16">
          <a href={TRUSTBOND_PROJECTS.HOME} target="_blank" rel="noopener noreferrer"
            className="bg-[#4ADE80] hover:bg-white text-[#0A1F0A] font-semibold rounded-full px-10 py-5 text-lg transition-all duration-300 shadow-xl inline-flex items-center justify-center gap-3 group">
            Apoiar Projeto <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <button onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-white/60 hover:border-white text-white font-medium rounded-full px-8 py-5 text-lg transition-all duration-300">
            Conheça o projeto
          </button>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="bg-white/95 text-[#0A1F0A] px-5 py-4 rounded-2xl shadow-xl flex items-center gap-3 col-span-2 sm:col-span-1">
            <Shield className="w-5 h-5 text-[#059669]" />
            <div><div className="text-xl font-bold text-[#059669]">96<span className="text-xs">/100</span></div><div className="text-[10px] text-zinc-500">Integrity</div></div>
          </div>
          <div className="bg-white/10 backdrop-blur px-5 py-4 rounded-2xl border border-white/10 col-span-2">
            <div className="text-xs text-white/50 mb-1">$0 / $184.000 · 0% Financiado</div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full w-0 bg-[#4ADE80] rounded-full" /></div>
          </div>
          <div className="bg-white/10 backdrop-blur px-5 py-4 rounded-2xl border border-white/10 text-center">
            <div className="text-2xl font-bold text-[#4ADE80]">5×</div><div className="text-[10px] text-white/50">Multiplicador</div>
          </div>
          <div className="bg-white/10 backdrop-blur px-5 py-4 rounded-2xl border border-white/10 text-center">
            <div className="text-2xl font-bold text-white">M+</div><div className="text-[10px] text-white/50">Usuários</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
        <span className="text-xs uppercase tracking-widest">Role para explorar</span><ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
}
