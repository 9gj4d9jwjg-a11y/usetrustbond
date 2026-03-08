"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, Cpu, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function WhyEssentialTech({ className = '' }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: sectionRef.current, start: 'top 80%', onEnter: () => {
        gsap.fromTo(contentRef.current?.querySelectorAll('.reveal') || [], { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' });
      }, once: true });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre" ref={sectionRef} className={`relative py-24 lg:py-32 bg-[#0A1F0A] ${className}`}>
      <div className="max-w-5xl mx-auto px-6 sm:px-8" ref={contentRef}>
        <div className="text-center mb-16">
          <span className="reveal inline-block px-5 py-2 bg-[#4ADE80]/20 text-[#4ADE80] rounded-full text-xs font-semibold tracking-wider">VIVATERRA • TECH-RASTREAMENTO</span>
          <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-6">Por que este projeto é <span className="text-[#4ADE80]">essencial?</span></h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 mb-20">
          <div className="reveal p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-red-400/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><AlertTriangle className="w-6 h-6 text-red-400" /></div>
            <h3 className="font-semibold text-white text-xl mb-3">O Desafio</h3>
            <p className="text-white/60 leading-relaxed text-sm">Projetos ambientais dependem de promessas sem evidências verificáveis, gerando falta de confiança em dados ESG e rastreabilidade limitada.</p>
          </div>
          <div className="reveal p-8 rounded-3xl bg-white/5 border-2 border-[#4ADE80]/40 relative group">
            <div className="absolute -top-3 right-6 bg-[#059669] text-white text-xs px-4 py-1 rounded-full font-semibold">SOLUÇÃO</div>
            <div className="w-12 h-12 rounded-xl bg-[#4ADE80]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Cpu className="w-6 h-6 text-[#4ADE80]" /></div>
            <h3 className="font-semibold text-white text-xl mb-3">A Solução</h3>
            <p className="text-white/60 leading-relaxed text-sm">Blockchain para dados ESG auditáveis e rastreabilidade total. O &ldquo;Uber da economia circular&rdquo;, escalando sem custo marginal alto. Integração com TrustBond.</p>
          </div>
          <div className="reveal p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-sky-400/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Zap className="w-6 h-6 text-sky-400" /></div>
            <h3 className="font-semibold text-white text-xl mb-3">O Impacto</h3>
            <p className="text-white/60 leading-relaxed text-sm">Acelera reciclagem em escala, previne poluição da água. Transforma ações simples em recompensas, empregos e acesso a produtos sustentáveis.</p>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4ADE80]/20 to-transparent" />
    </section>
  );
}
