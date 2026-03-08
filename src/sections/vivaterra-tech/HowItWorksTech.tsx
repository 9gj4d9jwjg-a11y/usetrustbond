"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, Gamepad2, ShoppingBag, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: Smartphone, num: '01', title: 'Coleta via App',
    description: 'Óleo de cozinha usado e participação dos usuários coletados via app de residências, restaurantes e parceiros em São Paulo.',
    details: ['Registro via app com geolocalização', 'Infraestrutura blockchain imutável', 'Rede de coletores parceiros'] },
  { icon: Gamepad2, num: '02', title: 'Gamificação & Tokenização',
    description: 'App gamificado com wallet para recompensas tokenizadas, marketplace para eco-produtos e integração logística de coletas.',
    details: ['Ganhe pontos e badges por coletas', 'Carteira com incentivos tokenizados', 'Marketplace de eco-produtos'] },
  { icon: ShoppingBag, num: '03', title: 'Impacto & Escala',
    description: 'App gamificado motiva mais coletas. ESG auditável via blockchain. Vendas no marketplace geram receitas escaláveis.',
    details: ['Dados ESG em tempo real', 'Receitas escaláveis via marketplace', 'Conecta todas as verticais VivaTerra'] },
];

export default function HowItWorksTech({ className = '' }: { className?: string }) {
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
          <p className="text-white/60 text-lg max-w-lg mx-auto">Do registro em blockchain ao impacto verificável — tecnologia a serviço da economia circular</p>
        </div>
        <div ref={stepsRef} className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="step-card group relative">
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#4ADE80]/30 transition-all duration-500 h-full">
                <div className="absolute -top-4 -left-2 w-12 h-12 rounded-2xl bg-[#4ADE80]/20 flex items-center justify-center font-bold text-[#4ADE80] text-lg">{step.num}</div>
                <div className="w-16 h-16 rounded-2xl bg-[#4ADE80]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <step.icon className="w-8 h-8 text-[#4ADE80]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-white/60 leading-relaxed mb-6">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((d, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-white/50">
                      <CheckCircle className="w-4 h-4 text-[#4ADE80] flex-shrink-0" />{d}
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
