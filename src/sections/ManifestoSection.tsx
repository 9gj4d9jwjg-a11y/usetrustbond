"use client";

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShareButtons from '@/components/ShareButtons';

gsap.registerPlugin(ScrollTrigger);

interface ManifestoSectionProps {
  className?: string;
}

const ManifestoSection = ({ className = '' }: ManifestoSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showBudget, setShowBudget] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.fade-up').forEach((el: any) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className={`bg-[#F6F5F0] py-24 lg:py-32 relative ${className}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-[6vw]">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isDesktop ? '42% 1fr' : '1fr',
            gap: isDesktop ? '5rem' : '3rem',
          }}
        >
          {/* Left Column: Sticky Image + Share */}
          <div
            style={isDesktop ? { position: 'sticky', top: '15vh', alignSelf: 'start' } : {}}
            className="flex flex-col gap-6"
          >
            <div className="card-enkoji overflow-hidden h-[50vh] lg:h-[70vh] relative">
              <img
                src="/hero_garden.jpg"
                alt="Horta e árvores nativas no entorno do templo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-8 left-8 text-white max-w-xs">
                <span className="font-mono text-xs tracking-widest opacity-80 uppercase block mb-2">Projeto</span>
                <h3 className="text-2xl font-serif leading-snug">Horta e Árvores Nativas (Manejo)</h3>
              </div>
            </div>

            <ShareButtons title="Gostaria de compartilhar este projeto interessante:" />
          </div>          {/* Right Column: Scrolling Text */}
          <div style={{ minWidth: 0 }} className="flex flex-col gap-16 py-4">
            
            {/* Introdução Storytelling */}
            <div className="fade-up">
              <span className="eyebrow block mb-4">Por que esta horta é tão importante?</span>
              <div className="hairline mb-8" />
              <div className="space-y-6 text-[#6E6E6E] leading-relaxed text-lg">
                <p>
                  Imagine um lugar onde crianças que vivem em vulnerabilidade social podem colocar a mão na terra, ver um tomate nascer e entender de onde vem o alimento que chega à mesa. A Horta da Enkoji não é apenas um espaço agrícola; é uma sala de aula a céu aberto.
                </p>
                <p>
                  Aqui, ensinamos não apenas a cultivar alimentos, mas a cultivar valores. Cuidar de uma horta exige paciência, responsabilidade e respeito ao meio ambiente. São lições que essas crianças levarão para a vida toda.
                </p>
              </div>
            </div>

            {/* O Desafio */}
            <div className="fade-up card-enkoji p-8 lg:p-10 bg-white border-l-4 border-[#4A5D23]">
              <h4 className="text-2xl font-serif text-[#1F1F1F] mb-4">O desafio que enfrentamos hoje</h4>
              <p className="text-[#6E6E6E] leading-relaxed">
                Manter uma horta viva e produtiva exige custos constantes. Ferramentas desgastam, sementes acabam, o sistema de irrigação precisa de reparos e a adubação é essencial para a saúde das plantas. Sem recursos, essa sala de aula corre o risco de fechar as portas.
              </p>
            </div>

            {/* Impacto da Doação */}
            <div className="fade-up">
              <h4 className="text-2xl font-serif text-[#1F1F1F] mb-6">O impacto da sua doação na prática</h4>
              <p className="text-[#6E6E6E] mb-8 leading-relaxed">
                Queremos que você saiba exatamente como seu dinheiro será transformado em impacto real. Cada valor contribui para uma etapa do projeto:
              </p>
              
              <div className="grid gap-4">
                {[
                  { val: 'R$ 50,00', icon: '💚', text: 'Garante a compra de sementes e mudas variadas para iniciar um novo ciclo de plantio.' },
                  { val: 'R$ 150,00', icon: '🌱', text: 'Ajuda a adquirir ferramentas manuais adequadas para que as crianças possam trabalhar a terra com segurança.' },
                  { val: 'R$ 500,00', icon: '🌳', text: 'Contribui para a manutenção do sistema de irrigação e compra de adubo orgânico, garantindo que a horta sobreviva à estação seca.' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-center gap-4 p-6 bg-white rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-shadow text-center sm:text-left">
                    <div className="text-3xl shrink-0">{item.icon}</div>
                    <div>
                      <span className="font-bold text-[#4A5D23] text-lg block mb-1">{item.val}</span>
                      <p className="text-sm text-[#6E6E6E]">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Por que doar para a Enkoji? */}
            <div className="fade-up">
              <h4 className="text-2xl font-serif text-[#1F1F1F] mb-6">Por que doar para a Enkoji?</h4>
              <p className="text-[#6E6E6E] mb-8 leading-relaxed">
                A Enkoji é uma instituição séria e transparente. Ao apoiar este projeto, você não está apenas financiando uma horta; você está:
              </p>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { title: 'Combatendo a insegurança alimentar', desc: 'Parte da produção vai para a mesa das crianças.' },
                  { title: 'Educando para o futuro', desc: 'Formando cidadãos conscientes sobre sustentabilidade.' },
                  { title: 'Preservando a natureza', desc: 'Plantando árvores e cuidando do meio ambiente.' }
                ].map((reason, i) => (
                  <div key={i} className="space-y-2">
                    <h5 className="font-bold text-[#1F1F1F] text-sm leading-tight">{reason.title}</h5>
                    <p className="text-xs text-[#6E6E6E] leading-relaxed">{reason.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Orçamento Collapsible */}
            <div className="fade-up py-4 border-t border-black/10">
              <button 
                onClick={() => setShowBudget(!showBudget)}
                className="w-full flex justify-between items-center group cursor-pointer"
              >
                <div className="text-left">
                  <h4 className="text-2xl font-serif text-[#1F1F1F]">Orçamento Necessário</h4>
                  <p className="text-sm text-[#6E6E6E] mt-1">{showBudget ? 'Clique para ver menos' : 'Clique para ver detalhamento'}</p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-2xl text-[#1F1F1F]">R$ 15.000</span>
                  <div className={`transition-transform duration-300 ${showBudget ? 'rotate-180' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4A5D23] mx-auto mt-2">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showBudget ? 'max-h-[1000px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-4 bg-white/50 p-6 rounded-2xl">
                  {[
                    { item: 'Mudas de árvores nativas e frutíferas', value: 'R$ 1.500' },
                    { item: 'Mudas de hortaliças e ervas', value: 'R$ 800' },
                    { item: 'Insumos (adubo, composto, terra vegetal)', value: 'R$ 2.000' },
                    { item: 'Sistema simples de irrigação', value: 'R$ 2.000' },
                    { item: 'Ferramentas (enxadas, pás, ancinhos, etc)', value: 'R$ 1.500' },
                    { item: 'Mão de obra técnica / oficinas iniciais', value: 'R$ 1.500 a R$ 3.000' },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-end border-b border-[#00000010] pb-2">
                      <span className="text-[#6E6E6E] text-sm lg:text-base pr-4">{row.item}</span>
                      <span className="font-mono text-[#1F1F1F] text-sm shrink-0">{row.value}</span>
                    </div>
                  ))}
                  <p className="text-[10px] text-[#6E6E6E] italic mt-4">
                    Este orçamento é uma estimativa técnica para implantação total. O projeto é executado em fases conforme a arrecadação.
                  </p>
                </div>
              </div>
            </div>

            {/* Provas & Resultados (Mini) */}
            <div className="fade-up pt-8 border-t border-black/10 text-xs text-[#6E6E6E] flex flex-col sm:flex-row gap-8 opacity-70">
              <p>📍 Itapecerica da Serra, SP</p>
              <p>🛡️ Certificado TrustBond: Transparência Total</p>
              <p>📅 Atualizado em: Março 2026</p>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
