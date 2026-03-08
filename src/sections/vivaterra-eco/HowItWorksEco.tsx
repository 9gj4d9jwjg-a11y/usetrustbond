"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Truck, Factory, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: Truck, num: '01', title: 'Coleta', description: 'Óleo de cozinha usado coletado de milhares de pontos na Grande São Paulo por frota própria e rede de parceiros VivaTerra.' },
  { icon: Factory, num: '02', title: 'Produção Semi-industrial', description: 'Capital financia equipamentos, envase e branding profissional. Transformamos o óleo em 12 novos produtos ecológicos.' },
  { icon: Users, num: '03', title: 'Impacto & Distribuição', description: 'Produtos chegam ao mercado, geram receita estável para a ONG e recompensas diretas para famílias geradoras de óleo.' },
];

export default function HowItWorksEco({ className = '' }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: stepsRef.current, start: 'top 75%', onEnter: () => {
        gsap.fromTo(stepsRef.current?.querySelectorAll('.step-card') || [], { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' });
      }, once: true });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`relative py-24 lg:py-32 bg-[#0A1F0A] overflow-hidden ${className}`}>
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Como <span className="text-[#4ADE80]">Funciona</span></h2>
          <p className="text-white/60 text-lg max-w-md mx-auto">De resíduo a produto de limpeza sustentável — uma cadeia de valor que beneficia o planeta e as comunidades</p>
        </div>
        <div ref={stepsRef} className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="step-card group relative">
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-500 h-full">
                <div className="absolute -top-4 -left-2 w-12 h-12 rounded-2xl bg-[#4ADE80]/20 flex items-center justify-center font-bold text-[#4ADE80] text-lg shadow">{step.num}</div>
                <div className="w-16 h-16 rounded-2xl bg-[#4ADE80]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <step.icon className="w-8 h-8 text-[#4ADE80]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-white/60 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
