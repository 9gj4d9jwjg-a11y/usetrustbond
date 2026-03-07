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
          </div>

          {/* Right Column: Scrolling Text */}
          <div style={{ minWidth: 0 }} className="flex flex-col gap-16 py-4">
            
            {/* Introdução */}
            <div className="fade-up">
              <span className="eyebrow block mb-4">Horta com Árvores Nativas no Templo Enkoji</span>
              <div className="hairline mb-8" />
              <p className="text-[#6E6E6E] leading-relaxed text-lg mb-6">
                Na tradição Soto Zen do Enkoji, zazen desperta nossa natureza verdadeira. Essa consciência se expressa em ações reais: compaixão, simplicidade e cuidado com a terra.
              </p>
              <p className="text-[#6E6E6E] leading-relaxed text-lg mb-6">
                Nosso projeto de horta com árvores nativas vive isso. Cuidamos do solo, dos alimentos e da biodiversidade. Beneficiamos o templo e toda a comunidade.
              </p>
              <p className="text-xl font-serif text-[#4A5D23] font-medium">
                Junte-se a nós!
              </p>
            </div>

            {/* Escopo das Atividades */}
            <div className="fade-up card-enkoji p-8 lg:p-10 bg-white">
              <h4 className="text-2xl font-serif text-[#1F1F1F] mb-6">Escopo das atividades</h4>
              <ul className="space-y-4 text-[#6E6E6E]">
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4A5D23] mt-2.5 shrink-0" />
                  <p>Planejamento dos canteiros da horta e das áreas de plantio de árvores nativas.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4A5D23] mt-2.5 shrink-0" />
                  <p>Preparo do solo (limpeza, capina seletiva, adubação orgânica, compostagem).</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4A5D23] mt-2.5 shrink-0" />
                  <p>Plantio de mudas de hortaliças, ervas e árvores nativas adequadas ao local.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4A5D23] mt-2.5 shrink-0" />
                  <p>Manejo contínuo: irrigação, podas, controle ecológico de pragas, replantio quando necessário.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4A5D23] mt-2.5 shrink-0" />
                  <p>Limpeza e destinação adequada dos resíduos vegetais, priorizando compostagem.</p>
                </li>
              </ul>
            </div>

            {/* Orçamento */}
            <div className="fade-up">
              <h4 className="text-2xl font-serif text-[#1F1F1F] mb-6">Orçamento estimado (ajustável)</h4>
              <div className="space-y-4">
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
                <div className="pt-4 flex justify-between items-center text-[#1F1F1F] font-serif text-lg">
                  <span>Faixa Total Sugerida</span>
                  <span>R$ 8.000 — R$ 15.000</span>
                </div>
                <p className="text-xs text-[#6E6E6E] text-right mt-1">* Dependendo do tamanho da área e voluntariado.</p>
              </div>
            </div>

            {/* Provas & Resultados */}
            <div className="fade-up grid sm:grid-cols-2 gap-8">
              <div>
                <h5 className="text-lg font-serif text-[#1F1F1F] mb-4">Provas de execução</h5>
                <ul className="space-y-3 text-sm text-[#6E6E6E] leading-relaxed">
                  <li>• Notas fiscais e recibos das compras.</li>
                  <li>• Fotos da área antes, durante e depois.</li>
                  <li>• Lista de participantes com datas.</li>
                  <li>• Relatório simples descrevendo ações.</li>
                  <li>• Links de posts/boletins com registros.</li>
                </ul>
              </div>
              <div>
                <h5 className="text-lg font-serif text-[#1F1F1F] mb-4">Resultados esperados</h5>
                <ul className="space-y-3 text-sm text-[#6E6E6E] leading-relaxed">
                  <li>• Horta de 80–150 m² e 30-60 árvores implantadas.</li>
                  <li>• Produção de 360-720 kg de hortaliças/ano.</li>
                  <li>• Envolvimento de 40-80 pessoas (12 mutirões/ano).</li>
                  <li>• Redução de 30-50% de resíduos orgânicos ao lixo.</li>
                  <li>• 4 grupos anuais em visitas guiadas.</li>
                </ul>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
