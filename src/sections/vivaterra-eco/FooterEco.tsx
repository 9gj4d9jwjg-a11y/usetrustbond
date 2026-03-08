"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { TRUSTBOND_PROJECTS } from '@/config/projects';

gsap.registerPlugin(ScrollTrigger);

export default function FooterEco({ className = '' }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: sectionRef.current, start: 'top 80%', onEnter: () => {
        gsap.fromTo(ctaRef.current?.querySelectorAll('.anim') || [], { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' });
      }, once: true });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className={`relative bg-[#14331A] overflow-hidden ${className}`}>
      <div ref={ctaRef} className="relative z-10 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="anim text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Limpeza que <span className="text-[#4ADE80]">transforma</span>
          </h2>
          <p className="anim text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Cada doação cria produtos ecológicos, protege a água e gera empregos locais na Grande São Paulo.
          </p>
          <a href={TRUSTBOND_PROJECTS.HOME} target="_blank" rel="noopener noreferrer"
            className="anim bg-[#4ADE80] hover:bg-white text-[#0A1F0A] font-semibold rounded-full px-10 py-5 text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] inline-flex items-center gap-2 group">
            🌱 Apoiar Agora <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="anim mt-6 text-white/50 text-sm">Contribuição transparente e segura — garantia TrustBond.app</p>
        </div>
      </div>
      <div className="relative z-10 border-t border-white/10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4ADE80]/20 flex items-center justify-center text-lg">🌱</div>
            <span className="font-bold text-white text-xl">trustbond</span>
          </div>
          <span className="text-xs text-white/40">© 2026 Trustbond • Projeto Eco-Limpeza • VivaTerra</span>
        </div>
      </div>
    </footer>
  );
}
