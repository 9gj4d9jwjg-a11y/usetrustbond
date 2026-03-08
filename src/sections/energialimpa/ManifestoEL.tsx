"use client";

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShareButtons from '@/components/ShareButtons';

gsap.registerPlugin(ScrollTrigger);

const ManifestoEL = ({ className = '' }: { className?: string }) => {
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
      gsap.utils.toArray('.fade-up-el').forEach((el: any) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="manifesto" className={`bg-[#F6F5F0] py-24 lg:py-32 relative ${className}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-[6vw]">
        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '42% 1fr' : '1fr', gap: isDesktop ? '5rem' : '3rem' }}>
          {/* Left Column: Sticky Image + Share */}
          <div style={isDesktop ? { position: 'sticky', top: '15vh', alignSelf: 'start' } : {}} className="flex flex-col gap-6">
            <div className="card-enkoji overflow-hidden h-[50vh] lg:h-[70vh] relative">
              <img
                src="/images/enkoji/hero_temple_v3.jpg"
                alt="Vista do Templo Enkoji e seu telhado"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-8 left-8 text-white max-w-xs">
                <span className="font-mono text-xs tracking-widest opacity-80 uppercase block mb-2">Projeto</span>
                <h3 className="text-2xl font-serif leading-snug">Telhado Seguro + Energia Limpa</h3>
              </div>
            </div>
            <ShareButtons title="Gostaria de compartilhar este projeto interessante:" />
          </div>

          {/* Right Column: Scrolling Text */}
          <div style={{ minWidth: 0 }} className="flex flex-col gap-16 py-4">

            {/* Introdução */}
            <div className="fade-up-el">
              <span className="eyebrow block mb-4">Por que este projeto é essencial?</span>
              <div className="hairline mb-8" />
              <div className="space-y-6 text-[#6E6E6E] leading-relaxed text-lg">
                <p>
                  Imagine um templo onde o silêncio das práticas não é interrompido por goteiras, onde o conforto térmico acolhe comunidades em qualquer estação, e onde a energia que ilumina os ensinamentos e as atividades com crianças vem do sol.
                </p>
                <p>
                  No Soto Zen, cuidar do espaço físico é prática espiritual. Cada telha substituída, cada cabo preparado para energia solar, é um ato de <em>samu</em> — trabalho consciente que beneficia a todos. Este projeto une tradição milenar e inovação sustentável.
                </p>
              </div>
            </div>

            {/* O Desafio */}
            <div className="fade-up-el card-enkoji p-8 lg:p-10 bg-white border-l-4 border-[#4A5D23]">
              <h4 className="text-2xl font-serif text-[#1F1F1F] mb-4">O desafio que enfrentamos hoje</h4>
              <p className="text-[#6E6E6E] leading-relaxed">
                O telhado atual do Templo Enkoji apresenta infiltrações recorrentes, desgaste estrutural e isolamento térmico inadequado. Além de comprometer a segurança, essas questões geram custos constantes com reparos emergenciais. A conta de energia elétrica limita recursos que poderiam ser investidos em atividades comunitárias, retiros e práticas educativas.
              </p>
            </div>

            {/* Impacto da Doação */}
            <div className="fade-up-el">
              <h4 className="text-2xl font-serif text-[#1F1F1F] mb-6">O impacto da sua doação na prática</h4>
              <p className="text-[#6E6E6E] mb-8 leading-relaxed">
                Queremos que você veja, com clareza, como seu apoio se transforma em resultado tangível:
              </p>
              <div className="grid gap-4">
                {[
                  { val: 'R$ 100,00', icon: '🏠', text: 'Cobre cerca de 0,4 m² de telhado com material de alta durabilidade e melhor desempenho térmico.' },
                  { val: 'R$ 300,00', icon: '☀️', text: 'Contribui para a infraestrutura elétrica que permitirá a futura instalação de painéis solares.' },
                  { val: 'R$ 1.000,00', icon: '🌿', text: 'Garante a substituição completa de uma seção crítica do telhado (≈4 m²) + preparação para energia limpa.' },
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

            {/* Por que doar */}
            <div className="fade-up-el">
              <h4 className="text-2xl font-serif text-[#1F1F1F] mb-6">Por que doar para este projeto?</h4>
              <p className="text-[#6E6E6E] mb-8 leading-relaxed">
                Ao apoiar esta iniciativa, você vai além de uma reforma: você está...
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: 'Preservando um espaço de paz e prática', desc: 'Garantindo que o templo permaneça seguro e acolhedor para todas as atividades.' },
                  { title: 'Agindo pela emergência climática', desc: 'Reduzindo a pegada de carbono com preparação para energia solar limpa.' },
                  { title: 'Praticando a economia consciente', desc: 'Diminuindo custos operacionais e liberando recursos para ações sociais.' },
                  { title: 'Honrando tradição com inovação', desc: 'Unindo sabedoria ancestral e tecnologia sustentável.' },
                ].map((reason, i) => (
                  <div key={i} className="space-y-2">
                    <h5 className="font-bold text-[#1F1F1F] text-sm leading-tight">{reason.title}</h5>
                    <p className="text-xs text-[#6E6E6E] leading-relaxed">{reason.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Orçamento Collapsible */}
            <div className="fade-up-el py-4 border-t border-black/10">
              <button onClick={() => setShowBudget(!showBudget)} className="w-full flex justify-between items-center group cursor-pointer">
                <div className="text-left">
                  <h4 className="text-2xl font-serif text-[#1F1F1F]">Orçamento Necessário</h4>
                  <p className="text-sm text-[#6E6E6E] mt-1">{showBudget ? 'Clique para ver menos' : 'Clique para ver detalhamento'}</p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-2xl text-[#1F1F1F]">R$ 38.000 – 45.000</span>
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
                    { item: 'Reforma completa do telhado (≈120–150 m²)', value: 'R$ 30.000' },
                    { item: 'Preparação para energia solar (infraestrutura elétrica, fixações, passagem de cabos)', value: 'R$ 8.000 – R$ 15.000' },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-end border-b border-[#00000010] pb-2">
                      <span className="text-[#6E6E6E] text-sm lg:text-base pr-4">{row.item}</span>
                      <span className="font-mono text-[#1F1F1F] text-sm shrink-0">{row.value}</span>
                    </div>
                  ))}
                  <p className="text-[10px] text-[#6E6E6E] italic mt-4">
                    Este orçamento é uma estimativa técnica para execução completa. O projeto será realizado em fases, conforme a arrecadação, com priorização das áreas mais críticas.
                  </p>
                </div>
              </div>
            </div>

            {/* Rodapé Info */}
            <div className="fade-up-el pt-8 border-t border-black/10 text-xs text-[#6E6E6E] flex flex-col sm:flex-row gap-8 opacity-70">
              <p>📍 Templo Enkoji – Itapecerica da Serra, SP</p>
              <p>🛡️ Certificado TrustBond: Transparência Total</p>
              <p>📅 Atualizado em: Março 2026</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoEL;
