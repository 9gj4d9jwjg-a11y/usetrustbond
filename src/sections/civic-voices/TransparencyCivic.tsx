"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, ClipboardCheck, ArrowRightCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: Shield, color: 'bg-[#C41E3A]', title: 'Capturamos sua confiança', description: 'Doação 100% segura em conta segregada até vermos o progresso.' },
  { icon: ClipboardCheck, color: 'bg-[#FFD700]', iconColor: 'text-[#1a1a1a]', title: 'Verificamos com agilidade', description: 'Fotos, relatórios de participação e métricas analisados no mesmo dia.' },
  { icon: ArrowRightCircle, color: 'bg-green-600', title: 'Liberamos se tudo OK', description: 'Recursos liberados para próxima fase. Ciclo transparente continua!' },
];

export default function TransparencyCivic({ className = '' }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: sectionRef.current, start: 'top 70%', onEnter: () => {
        gsap.fromTo(contentRef.current?.querySelectorAll('.anim') || [], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out' });
      }, once: true });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="transparencia" ref={sectionRef} className={`relative py-24 lg:py-32 overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(to bottom right, #1a1a1a, #111827)' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8" ref={contentRef}>
        <div className="text-center mb-16">
          <h2 className="anim text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Transparência <span className="text-[#FFD700]">Total</span></h2>
          <p className="anim text-xl text-gray-400">Seu dinheiro só se move quando a participação acontece</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((s, i) => (
            <div key={i} className="anim text-center group">
              <div className={`w-20 h-20 ${s.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                <s.icon className={`w-10 h-10 ${s.iconColor || 'text-white'}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-gray-400">{s.description}</p>
            </div>
          ))}
        </div>
        <div className="anim bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Sistema Ativo</h3>
              <p className="text-gray-400">Atualizado em tempo real</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-3xl font-bold text-[#FFD700]">98%</div>
                <div className="text-sm text-gray-400">Transparência</div>
              </div>
              <a href="#" className="bg-[#C41E3A] hover:bg-[#8B0000] text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                Ver dashboard ao vivo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
