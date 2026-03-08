"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { question: 'Como funciona o processo de doação?', answer: 'Sua doação é feita de forma 100% segura através da plataforma TrustBond. O valor fica em uma conta segregada e só é liberado para o projeto após a comprovação de cada etapa executada. Você recebe atualizações em tempo real sobre o andamento e o impacto da sua contribuição.' },
  { question: 'Como acompanho o impacto da minha contribuição?', answer: 'Você terá acesso a um dashboard exclusivo com métricas em tempo real: número de cidadãos engajados, consultas realizadas, propostas apresentadas e fotos das atividades. Além disso, enviamos relatórios mensais detalhados por e-mail.' },
  { question: 'O que acontece se a meta não for atingida?', answer: 'Se o projeto não atingir a meta mínima, você poderá optar por receber o reembolso integral da sua doação ou redirecionar o valor para outro projeto de engajamento cidadão da Civic Voices. Nossa política de transparência garante que seu dinheiro só seja usado conforme o previsto.' },
  { question: 'Posso participar das consultas presenciais?', answer: 'Sim! Doadores acima de R$ 500 têm direito a participar das consultas públicas presenciais em Kakamega. Você poderá ver de perto como a plataforma conecta cidadãos e tomadores de decisão e conhecer a equipe por trás do projeto.' },
  { question: 'Como é garantida a transparência do projeto?', answer: 'Utilizamos a tecnologia TrustBond que documenta cada etapa: relatórios de participação, métricas de engajamento, atas das consultas públicas e auditorias independentes. Tudo isso é disponibilizado em tempo real no nosso dashboard público.' },
];

export default function FAQCivic({ className = '' }: { className?: string }) {
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
    <section ref={sectionRef} className={`relative py-24 lg:py-32 bg-white ${className}`}>
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">Perguntas <span className="text-[#C41E3A]">Frequentes</span></h2>
          <p className="text-xl text-[#6B7280]">Tire suas dúvidas sobre o projeto e como funciona a doação</p>
        </div>
        <div ref={faqsRef} className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${openIndex === i ? 'border-[#C41E3A]/30 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                <span className="font-semibold text-[#1a1a1a] text-lg pr-4">{faq.question}</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openIndex === i ? 'bg-[#C41E3A] rotate-45' : 'bg-gray-100'}`}>
                  {openIndex === i ? <X className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-[#6B7280]" />}
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 pb-6"><p className="text-[#6B7280] leading-relaxed">{faq.answer}</p></div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-[#6B7280] mb-2">Ainda tem dúvidas?</p>
          <a href="#" className="text-[#C41E3A] font-semibold hover:underline">Entre em contato conosco →</a>
        </div>
      </div>
    </section>
  );
}
