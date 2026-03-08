"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { question: 'Como funciona o processo de doação?', answer: 'Sua doação é feita de forma 100% segura através da plataforma TrustBond. O valor fica em uma conta segregada e só é liberado para o projeto após a comprovação de cada etapa executada. Você recebe atualizações em tempo real sobre o andamento e o impacto da sua contribuição.' },
  { question: 'Como acompanho o impacto da minha contribuição?', answer: 'Você terá acesso a um dashboard exclusivo com métricas em tempo real: quantidade de óleo coletado, litros de biodiesel produzidos, redução de emissões de CO₂ e fotos das etapas do projeto. Além disso, enviamos relatórios mensais detalhados por e-mail.' },
  { question: 'O que acontece se a meta não for atingida?', answer: 'Se o projeto não atingir a meta mínima, você poderá optar por receber o reembolso integral da sua doação ou redirecionar o valor para outro projeto de sustentabilidade da VivaTerra. Nossa política de transparência garante que seu dinheiro só seja usado conforme o previsto.' },
  { question: 'Posso visitar a planta de processamento?', answer: 'Sim! Doadores acima de R$ 500 têm direito a uma visita guiada à nossa planta de processamento em São Paulo. Você poderá ver de perto como o óleo usado é transformado em biodiesel e conhecer a equipe por trás do projeto.' },
  { question: 'Como é garantida a transparência do projeto?', answer: 'Utilizamos a tecnologia TrustBond que documenta cada etapa: fotos georreferenciadas das coletas, notas fiscais de todos os materiais, relatórios técnicos de processamento e auditorias independentes. Tudo isso é disponibilizado em tempo real no nosso dashboard público.' },
  { question: 'O biodiesel produzido é utilizado onde?', answer: 'O biodiesel produzido abastece nossa frota de coleta e é vendido para empresas parceiras comprometidas com a sustentabilidade. Parte também é doada para projetos sociais de comunidades locais.' },
];

export default function FAQVT({ className = '' }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current, start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(faqsRef.current?.children || [], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' });
        },
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className={`relative py-24 lg:py-32 bg-[#0A1F0A] ${className}`}>
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Perguntas <span className="text-[#4ADE80]">Frequentes</span>
          </h2>
          <p className="text-white/60 text-lg">Tire suas dúvidas sobre o projeto e como funciona a doação</p>
        </div>

        <div ref={faqsRef} className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className={`rounded-2xl border transition-all duration-300 ${openIndex === index ? 'bg-[#14331A]/30 border-[#4ADE80]/30' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left">
                <span className="font-semibold text-white text-lg pr-4">{faq.question}</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openIndex === index ? 'bg-[#4ADE80] rotate-45' : 'bg-white/10'}`}>
                  {openIndex === index ? <X className="w-5 h-5 text-[#0A1F0A]" /> : <Plus className="w-5 h-5 text-white" />}
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 pb-6"><p className="text-white/70 leading-relaxed">{faq.answer}</p></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/50 mb-4">Ainda tem dúvidas?</p>
          <a href="#" className="inline-flex items-center gap-2 text-[#4ADE80] hover:text-white transition-colors">
            <span className="font-medium">Entre em contato conosco</span>
          </a>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4ADE80]/20 to-transparent" />
    </section>
  );
}
