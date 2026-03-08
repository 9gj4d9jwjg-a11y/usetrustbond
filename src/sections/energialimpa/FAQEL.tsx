"use client";

import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, HelpCircle, Lock, BarChart3, RotateCcw, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FAQEL = ({ className = '' }: { className?: string }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Não sou budista. Posso apoiar?',
      answer: 'Sim. Este projeto beneficia toda a comunidade local e visitantes. Não há necessidade de afiliação religiosa. A sustentabilidade e a preservação do patrimônio são causas universais.',
      icon: HelpCircle,
    },
    {
      question: 'Meu dinheiro fica seguro?',
      answer: 'Sim. Todo valor doado fica em conta segregada até a comprovação de cada etapa da obra. O recurso só é liberado mediante evidências claras: fotos, notas fiscais e relatórios técnicos.',
      icon: Lock,
    },
    {
      question: 'Como acompanho o andamento da obra?',
      answer: 'Você terá acesso a uma área logada exclusiva com atualizações em tempo real: fotos do antes, durante e depois, documentos fiscais, cronograma executado e depoimentos da equipe.',
      icon: BarChart3,
    },
    {
      question: 'E se o projeto não for concluído?',
      answer: 'Se uma fase não for comprovada dentro dos critérios estabelecidos, o recurso correspondente não é liberado. Você poderá optar por reembolso ou redirecionamento para outra iniciativa do templo.',
      icon: RotateCcw,
    },
    {
      question: 'A obra vai interromper as atividades do templo?',
      answer: 'Não. O cronograma será planejado para minimizar impactos, mantendo as áreas principais disponíveis para atividades comunitárias, dinâmicas com crianças e encontros. A comunidade será avisada com antecedência.',
      icon: Wrench,
    },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      });

      itemsRef.current.forEach((item, i) => {
        if (item) {
          gsap.fromTo(item, { y: 18, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.5, delay: i * 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: item, start: 'top 80%', toggleActions: 'play none none reverse' },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className={`relative bg-[#F6F5F0] py-20 lg:py-28 ${className}`}>
      <div className="max-w-3xl mx-auto px-6">
        <div ref={headerRef} className="text-center mb-12">
          <span className="eyebrow block mb-3">FAQ</span>
          <h2 className="text-3xl lg:text-4xl font-serif text-[#1F1F1F] uppercase tracking-[0.02em]">
            Perguntas frequentes
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;

            return (
              <div key={index} ref={(el) => { itemsRef.current[index] = el; }} className="border-t border-[rgba(31,31,31,0.12)]">
                <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full py-5 flex items-start gap-4 text-left hover:opacity-70 transition-opacity">
                  <Icon size={20} className="text-[#4A5D23] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="flex-1 text-lg font-serif text-[#1F1F1F]">{faq.question}</span>
                  <ChevronDown size={20} className={`text-[#6E6E6E] flex-shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48 pb-5' : 'max-h-0'}`}>
                  <div className="pl-9 pr-8">
                    <p className="text-[#6E6E6E] leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-[rgba(31,31,31,0.12)]" />
      </div>
    </section>
  );
};

export default FAQEL;
