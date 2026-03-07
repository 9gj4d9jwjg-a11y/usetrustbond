"use client";

import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Camera, FileText, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PhasePlanSectionProps {
  className?: string;
}

const PhasePlanSection = ({ className = '' }: PhasePlanSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const phases = [
    {
      code: 'Fase 1',
      title: 'Preparo do solo',
      amount: 'R$ 3.000',
      percent: '25%',
      status: 'Aguardando início',
      statusIcon: Lock,
      evidence: ['Fotos limpeza', 'Notas fiscais'],
      items: 'Ferramentas, insumos, preparo do terreno',
      timeline: 'Mês 1-2',
    },
    {
      code: 'Fase 2',
      title: 'Plantio',
      amount: 'R$ 3.500',
      percent: '28%',
      status: 'Retido',
      statusIcon: Lock,
      evidence: ['Mudas plantadas', 'Espécies'],
      items: '30-60 árvores nativas, hortaliças de estação',
      timeline: 'Mês 2-4',
    },
    {
      code: 'Fase 3',
      title: 'Irrigação',
      amount: 'R$ 2.500',
      percent: '21%',
      status: 'Retido',
      statusIcon: Lock,
      evidence: ['Sistema instalado', 'Testes'],
      items: 'Mangueiras, conexões, timer de irrigação',
      timeline: 'Mês 3-5',
    },
    {
      code: 'Fase 4',
      title: 'Manutenção',
      amount: 'R$ 2.000',
      percent: '17%',
      status: 'Retido',
      statusIcon: Lock,
      evidence: ['Fotos mensais', 'Relatórios'],
      items: 'Adubação, poda, controle de pragas',
      timeline: 'Mês 4-8',
    },
    {
      code: 'Fase 5',
      title: 'Colheita',
      amount: 'R$ 1.000',
      percent: '9%',
      status: 'Retido',
      statusIcon: Lock,
      evidence: ['Fotos da colheita', 'Distribuição'],
      items: 'Embalagens, logística, evento comunitário',
      timeline: 'Mês 8-12',
    },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 24, opacity: 0 },
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
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
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

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className={`relative bg-[#F6F5F0] py-20 lg:py-28 ${className}`}
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="eyebrow block mb-3">Cronograma</span>
          <h2 className="text-3xl lg:text-4xl font-serif text-[#1F1F1F] uppercase tracking-[0.02em]">
            Cinco fases. Evidências em cada uma.
          </h2>
        </div>

        {/* Phase Cards */}
        <div className="space-y-4">
          {phases.map((phase, index) => {
            const StatusIcon = phase.statusIcon;
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="card-enkoji overflow-hidden"
              >
                {/* Card Header */}
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full p-6 flex items-center justify-between hover:bg-black/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4 lg:gap-6">
                    <div>
                      <span className="font-mono text-xs text-[#6E6E6E] block mb-1">
                        {phase.code}
                      </span>
                      <h3 className="text-lg lg:text-xl font-serif text-[#1F1F1F] text-left">
                        {phase.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 lg:gap-8">
                    <div className="text-right hidden sm:block">
                      <span className="text-sm font-medium text-[#1F1F1F]">
                        {phase.amount}
                      </span>
                      <span className="text-xs text-[#6E6E6E] ml-2">
                        · {phase.percent}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F6F5F0] border border-[rgba(31,31,31,0.1)] rounded-full">
                      <StatusIcon size={14} className="text-[#4A5D23]" />
                      <span className="text-xs text-[#6E6E6E]">{phase.status}</span>
                    </div>

                    <ChevronDown
                      size={20}
                      className={`text-[#6E6E6E] transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isExpanded ? 'max-h-64' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-[rgba(31,31,31,0.08)]">
                    <div className="grid sm:grid-cols-3 gap-4 pt-4">
                      {/* Evidence Required */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Camera size={14} className="text-[#4A5D23]" />
                          <span className="text-xs font-mono uppercase tracking-wider text-[#6E6E6E]">
                            Evidências
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {phase.evidence.map((item, i) => (
                            <li key={i} className="text-sm text-[#1F1F1F]">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* What We Buy */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <FileText size={14} className="text-[#4A5D23]" />
                          <span className="text-xs font-mono uppercase tracking-wider text-[#6E6E6E]">
                            O que compramos
                          </span>
                        </div>
                        <p className="text-sm text-[#1F1F1F]">{phase.items}</p>
                      </div>

                      {/* Timeline */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono uppercase tracking-wider text-[#6E6E6E]">
                            Timeline
                          </span>
                        </div>
                        <p className="text-sm text-[#1F1F1F]">{phase.timeline}</p>
                      </div>
                    </div>
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

export default PhasePlanSection;
