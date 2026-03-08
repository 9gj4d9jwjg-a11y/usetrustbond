"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, ClipboardCheck, ArrowRightCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: Shield, num: '01', title: 'Capturamos sua confiança', description: 'Recursos ficam em conta segregada até comprovação de cada etapa executada.' },
  { icon: ClipboardCheck, num: '02', title: 'Verificamos com agilidade', description: 'Fotos georreferenciadas, notas fiscais e relatórios analisados no mesmo dia.' },
  { icon: ArrowRightCircle, num: '03', title: 'Liberamos para impacto', description: 'Recursos liberados por etapa. Tudo documentado e público no dashboard ao vivo.' },
];

export default function TransparencyEco({ className = '' }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: sectionRef.current, start: 'top 70%', onEnter: () => {
        gsap.fromTo(contentRef.current?.querySelectorAll('.anim') || [], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out' });
      }, once: true });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`relative py-24 lg:py-32 bg-[#14331A] overflow-hidden ${className}`}>
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center" ref={contentRef}>
        <div className="anim inline-flex items-center gap-3 bg-[#4ADE80]/20 text-[#4ADE80] px-6 py-3 rounded-full text-sm mb-6">
          <Shield className="w-4 h-4" /> TRANSPARÊNCIA TOTAL VIA TRUSTBOND
        </div>
        <h2 className="anim text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-16">
          Seu dinheiro só se move com <span className="text-[#4ADE80]">resultados reais</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {steps.map((s, i) => (
            <div key={i} className="anim p-6 rounded-2xl bg-[#0A1F0A]/30 border border-white/10 hover:border-[#4ADE80]/30 transition-colors group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#4ADE80]/20 flex items-center justify-center group-hover:bg-[#4ADE80]/30 transition-colors">
                  <s.icon className="w-5 h-5 text-[#4ADE80]" />
                </div>
                <span className="text-[#4ADE80] font-bold">{s.num}</span>
              </div>
              <h3 className="font-semibold text-white text-xl mb-3">{s.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
        <a href="#" className="anim mt-12 inline-flex items-center gap-3 bg-white text-[#0A1F0A] px-10 py-5 rounded-full font-medium text-lg transition-all hover:shadow-xl">
          Ver dashboard ao vivo →
        </a>
      </div>
    </section>
  );
}
