"use client";

import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TreePine, Carrot, Users, Recycle, Trash2, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ImpactSectionProps {
  className?: string;
}

const ImpactSection = ({ className = '' }: ImpactSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const metrics = [
    {
      icon: TreePine,
      value: '30–60',
      label: 'árvores nativas plantadas',
      ods: 'ODS 15 - Vida Terrestre',
    },
    {
      icon: Carrot,
      value: '360–720',
      label: 'kg de alimentos/ano',
      ods: 'ODS 2 - Fome Zero',
    },
    {
      icon: Users,
      value: '200–400',
      label: 'participações em mutirões',
      ods: 'ODS 17 - Parcerias',
    },
    {
      icon: Recycle,
      value: '150–300',
      label: 'kg de resíduos compostados',
      ods: 'ODS 12 - Consumo Responsável',
    },
    {
      icon: Trash2,
      value: '30–50%',
      label: 'redução do lixo do templo',
      ods: 'ODS 11 - Cidades Sustentáveis',
    },
    {
      icon: Globe,
      value: '6',
      label: 'ODS da ONU atendidos',
      ods: 'Agenda 2030',
    },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: i * 0.06,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="impact"
      className={`relative bg-[#F6F5F0] py-20 lg:py-28 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16">
          <span className="eyebrow block mb-3">Impacto</span>
          <h2 className="text-3xl lg:text-4xl font-serif text-[#1F1F1F] uppercase tracking-[0.02em]">
            O que medimos além do dinheiro
          </h2>
        </div>

        {/* Metrics Grid */}
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
                {/* Icon */}
                <div className="mb-4">
                  <Icon
                    size={28}
                    className="text-[#4A5D23] transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Value */}
                <div className="text-4xl lg:text-5xl font-serif text-[#4A5D23] mb-2">
                  {metric.value}
                </div>

                {/* Label */}
                <p className="text-sm lg:text-base text-[#6E6E6E] leading-relaxed">
                  {metric.label}
                </p>

                {/* ODS Hover Overlay */}
                <div
                  className={`absolute inset-0 bg-[#4A5D23] flex items-center justify-center transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
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

export default ImpactSection;
