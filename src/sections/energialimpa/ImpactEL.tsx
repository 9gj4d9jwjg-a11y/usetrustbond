"use client";

import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, Clock, Zap, Percent, Trash2, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ImpactEL = ({ className = '' }: { className?: string }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const metrics = [
    { icon: Home, value: '100–150', label: 'm² de telhado substituído', ods: 'ODS 11 – Cidades Sustentáveis' },
    { icon: Clock, value: '20+', label: 'anos de vida útil estendida', ods: 'ODS 9 – Infraestrutura Resiliente' },
    { icon: Zap, value: '200–600', label: 'kWh/mês de energia limpa', ods: 'ODS 7 – Energia Acessível e Limpa' },
    { icon: Percent, value: '30–60%', label: 'redução na conta de energia', ods: 'ODS 12 – Consumo Responsável' },
    { icon: Trash2, value: '100%', label: 'resíduos da obra destinados corretamente', ods: 'ODS 13 – Ação Climática' },
    { icon: Globe, value: '6', label: 'ODS da ONU atendidos', ods: 'Agenda 2030' },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      });

      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(card, { y: 30, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.6, delay: i * 0.06, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none reverse' },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="impact" className={`relative bg-[#F6F5F0] py-20 lg:py-28 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headerRef} className="text-center mb-12 lg:mb-16">
          <span className="eyebrow block mb-3">Impacto</span>
          <h2 className="text-3xl lg:text-4xl font-serif text-[#1F1F1F] uppercase tracking-[0.02em]">
            O que medimos além do dinheiro
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="card-enkoji p-6 lg:p-8 relative overflow-hidden group cursor-default"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="mb-4">
                  <Icon size={28} className="text-[#4A5D23] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                </div>
                <div className="text-4xl lg:text-5xl font-serif text-[#4A5D23] mb-2">{metric.value}</div>
                <p className="text-sm lg:text-base text-[#6E6E6E] leading-relaxed">{metric.label}</p>

                <div className={`absolute inset-0 bg-[#4A5D23] flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <div className="text-center px-4">
                    <Globe size={32} className="text-white/80 mx-auto mb-3" />
                    <p className="text-white text-sm font-medium">{metric.ods}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactEL;
