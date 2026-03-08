"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UserPlus, MessagesSquare, TrendingUp, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: UserPlus, num: 1, color: 'bg-[#C41E3A]', textColor: 'text-white', title: 'Participe',
    description: 'Acesse a plataforma Civic Voices e participe das consultas públicas sobre o County Fiscal Strategy Paper. Compartilhe suas prioridades e visões.',
    details: ['Cadastro simples e gratuito', 'Acesso a documentos fiscais', 'Fóruns de discussão'] },
  { icon: MessagesSquare, num: 2, color: 'bg-[#FFD700]', textColor: 'text-[#1a1a1a]', title: 'Delibere',
    description: 'Engaje em discussões construtivas com outros cidadãos. Aprenda com perspectivas diversas e refine suas propostas para políticas públicas.',
    details: ['Diálogo seguro e respeitoso', 'Aprendizagem coletiva', 'Construção de consenso'] },
  { icon: TrendingUp, num: 3, color: 'bg-green-600', textColor: 'text-white', title: 'Transforme',
    description: 'Suas contribuições são compiladas e apresentadas aos tomadores de decisão. Acompanhe o impacto real de sua participação nas políticas finais.',
    details: ['Relatórios de impacto', 'Prestação de contas governamental', 'Mudança tangível'] },
];

export default function HowItWorksCivic({ className = '' }: { className?: string }) {
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
    <section ref={sectionRef} className={`relative py-24 lg:py-32 bg-[#F3F4F6] ${className}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">Como <span className="text-[#C41E3A]">Funciona</span></h2>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">De cidadão a agente de mudança: uma jornada de participação democrática digital</p>
        </div>
        <div ref={stepsRef} className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="step-card group">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-all duration-500 h-full border border-gray-100">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center ${step.textColor} text-2xl font-bold mb-6 group-hover:scale-110 transition-transform`}>
                  {step.num}
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">{step.title}</h3>
                <p className="text-[#6B7280] leading-relaxed mb-6">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((d, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <CheckCircle className="w-4 h-4 text-[#FFD700] flex-shrink-0" />{d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
