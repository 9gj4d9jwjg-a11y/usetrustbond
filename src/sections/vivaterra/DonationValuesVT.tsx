"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles } from 'lucide-react';
import { TRUSTBOND_PROJECTS } from '@/config/projects';

gsap.registerPlugin(ScrollTrigger);

const donationCards = [
  {
    value: 'R$ 100', description: 'Contribui para a logística de coleta',
    impact: 'Coleta de 50 litros de óleo usado',
    features: ['Acesso ao dashboard de transparência', 'Relatório mensal de impacto', 'Certificado de contribuição'],
    highlight: false, badge: null,
  },
  {
    value: 'R$ 500', description: 'Apoia o processamento de 100kg de óleo',
    impact: 'Gera 80 litros de biodiesel',
    features: ['Todos os benefícios do plano anterior', 'Nome no mural de agradecimentos', 'Convite para visita à planta', 'Atualizações exclusivas do projeto'],
    highlight: true, badge: 'Mais Popular',
  },
  {
    value: 'R$ 1.000', description: 'Garante infraestrutura para expansão',
    impact: 'Equipamento para novo ponto de coleta',
    features: ['Todos os benefícios dos planos anteriores', 'Reunião anual com a diretoria', 'Prioridade em novos projetos', 'Reconhecimento público especial'],
    highlight: false, badge: null,
  },
];

export default function DonationValuesVT({ className = '' }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current, start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(cardsRef.current?.children || [], { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' });
        },
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setHoveredCard(index);
  };

  return (
    <section id="impacto" ref={sectionRef} className={`relative py-24 lg:py-32 bg-[#0A1F0A] overflow-hidden ${className}`}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14331A]/30 border border-[#4ADE80]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#4ADE80]" />
            <span className="text-sm text-[#4ADE80] font-medium">Faça Parte</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            O impacto da sua <span className="text-[#4ADE80]">doação</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Queremos que você veja, com clareza, como seu apoio se transforma em resultado tangível
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {donationCards.map((card, index) => (
            <div
              key={index}
              className={`relative group ${card.highlight ? 'md:-mt-4 md:mb-4' : ''}`}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {card.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <span className="px-4 py-1 rounded-full bg-[#4ADE80] text-[#0A1F0A] text-sm font-semibold">{card.badge}</span>
                </div>
              )}

              <div className={`relative h-full p-8 rounded-3xl border transition-all duration-500 overflow-hidden ${
                card.highlight
                  ? 'bg-gradient-to-br from-[#4ADE80]/20 to-[#4ADE80]/5 border-[#4ADE80]/40'
                  : 'bg-white/5 border-white/10 hover:border-[#4ADE80]/30'
              }`}>
                {hoveredCard === index && (
                  <div className="absolute w-64 h-64 rounded-full bg-[#4ADE80]/10 blur-3xl pointer-events-none transition-opacity duration-300" style={{ left: mousePosition.x - 128, top: mousePosition.y - 128 }} />
                )}

                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{card.value}</div>
                <p className="text-white/70 mb-4">{card.description}</p>

                <div className="p-4 rounded-xl bg-[#14331A]/30 border border-[#4ADE80]/20 mb-6">
                  <div className="text-[#4ADE80] text-sm font-medium mb-1">Impacto direto:</div>
                  <div className="text-white font-semibold">{card.impact}</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {card.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#4ADE80]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#4ADE80]" />
                      </div>
                      <span className="text-white/60 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={TRUSTBOND_PROJECTS.HOME}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center rounded-full py-4 font-semibold transition-all duration-300 ${
                    card.highlight
                      ? 'bg-[#4ADE80] hover:bg-white text-[#0A1F0A] hover:shadow-[0_0_30px_rgba(74,222,128,0.3)]'
                      : 'bg-[#14331A] hover:bg-[#4ADE80] text-white hover:text-[#0A1F0A]'
                  }`}
                >
                  Doar {card.value}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#14331A]/30 border border-[#4ADE80]/20">
            <div className="w-12 h-12 rounded-full bg-[#4ADE80]/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-[#4ADE80]">5×</span>
            </div>
            <div className="text-left">
              <div className="text-white font-medium">Sua contribuição é multiplicada</div>
              <div className="text-white/50 text-sm">Investidores institucionais dobram seu impacto</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[#4ADE80]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#14331A]/20 rounded-full blur-3xl" />
    </section>
  );
}
