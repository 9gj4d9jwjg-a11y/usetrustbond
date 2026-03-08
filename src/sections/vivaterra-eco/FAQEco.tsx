"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { question: 'Como acompanho o impacto da minha contribuição?', answer: 'Você terá acesso ao dashboard exclusivo com métricas em tempo real: óleo coletado, produtos fabricados, água protegida e fotos das etapas do projeto.' },
  { question: 'O que acontece se a meta não for atingida?', answer: 'Você pode optar por reembolso integral ou redirecionar para outro projeto de impacto da VivaTerra. Nossa política garante que seu dinheiro só seja usado conforme previsto.' },
  { question: 'Como é garantida a transparência?', answer: 'A tecnologia Trustbond documenta cada etapa com fotos georreferenciadas, notas fiscais de todos os materiais e auditorias independentes. Tudo disponível no dashboard público.' },
];

export default function FAQEco({ className = '' }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: sectionRef.current, start: 'top 75%', onEnter: () => {
        gsap.fromTo(faqsRef.current?.children || [], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' });
      }, once: true });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`relative py-24 lg:py-32 bg-[#0A1F0A] ${className}`}>
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-12">Perguntas <span className="text-[#4ADE80]">frequentes</span></h2>
        <div ref={faqsRef} className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className={`rounded-2xl border transition-all duration-300 ${openIndex === i ? 'bg-[#14331A]/30 border-[#4ADE80]/30' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                <span className="font-semibold text-white text-lg pr-4">{faq.question}</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openIndex === i ? 'bg-[#4ADE80] rotate-45' : 'bg-white/10'}`}>
                  {openIndex === i ? <X className="w-5 h-5 text-[#0A1F0A]" /> : <Plus className="w-5 h-5 text-white" />}
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 pb-6"><p className="text-white/70 leading-relaxed">{faq.answer}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
