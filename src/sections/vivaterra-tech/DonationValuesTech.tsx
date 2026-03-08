"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles } from 'lucide-react';
import { TRUSTBOND_PROJECTS } from '@/config/projects';

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  { label: 'BÁSICO', value: '$50', features: ['Desenvolvimento de funcionalidades básicas do app', 'Acesso a atualizações de progresso', 'Reconhecimento como apoiador inicial'], highlight: false, badge: null },
  { label: 'IMPACTO MÉDIO', value: '$200', features: ['Suporte à integração blockchain e gamificação', 'Acesso ao dashboard de impacto', 'Recompensas tokenizadas exclusivas'], highlight: true, badge: 'Mais Popular' },
  { label: 'TRANSFORMADOR', value: '$500', features: ['Financia expansão do marketplace e wallet', 'Relatórios personalizados de ESG', 'Parceria em eventos de impacto'], highlight: false, badge: null },
];

export default function DonationValuesTech({ className = '' }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: sectionRef.current, start: 'top 75%', onEnter: () => {
        gsap.fromTo(cardsRef.current?.children || [], { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' });
      }, once: true });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="doar" ref={sectionRef} className={`relative py-24 lg:py-32 bg-[#14331A] overflow-hidden ${className}`}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A1F0A]/50 border border-[#4ADE80]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#4ADE80]" /><span className="text-sm text-[#4ADE80] font-medium">Faça Parte</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Faça parte dessa <span className="text-[#4ADE80]">transformação</span></h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">Sua contribuição é multiplicada 5× por investidores institucionais via Smart Vaults da Trustbond</p>
        </div>
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((t, i) => (
            <div key={i} className={`relative group ${t.highlight ? 'md:-mt-4 md:mb-4' : ''}`}
              onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top }); setHoveredCard(i); }}
              onMouseLeave={() => setHoveredCard(null)}>
              {t.badge && <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"><span className="px-4 py-1 rounded-full bg-[#059669] text-white text-xs font-semibold">{t.badge}</span></div>}
              <div className={`relative h-full p-8 rounded-3xl border transition-all duration-500 overflow-hidden ${t.highlight ? 'bg-gradient-to-br from-[#4ADE80]/20 to-[#4ADE80]/5 border-[#4ADE80]/40' : 'bg-white/5 border-white/10 hover:border-[#4ADE80]/30'}`}>
                {hoveredCard === i && <div className="absolute w-64 h-64 rounded-full bg-[#4ADE80]/10 blur-3xl pointer-events-none" style={{ left: mousePos.x - 128, top: mousePos.y - 128 }} />}
                <div className="uppercase text-xs font-semibold tracking-widest text-[#4ADE80] mb-1">{t.label}</div>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-6">{t.value}</div>
                <ul className="space-y-3 mb-8">
                  {t.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-3"><div className="w-5 h-5 rounded-full bg-[#4ADE80]/20 flex items-center justify-center flex-shrink-0 mt-0.5"><Check className="w-3 h-3 text-[#4ADE80]" /></div><span className="text-white/60 text-sm">{f}</span></li>
                  ))}
                </ul>
                <a href={TRUSTBOND_PROJECTS.HOME} target="_blank" rel="noopener noreferrer"
                  className={`block w-full text-center rounded-full py-4 font-semibold transition-all duration-300 ${t.highlight ? 'bg-[#059669] hover:bg-[#4ADE80] text-white' : 'border-2 border-[#059669] text-[#4ADE80] hover:bg-[#059669] hover:text-white'}`}>
                  Doar {t.value}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
