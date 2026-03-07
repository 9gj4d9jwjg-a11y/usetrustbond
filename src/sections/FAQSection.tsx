"use client";

import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, HelpCircle, Lock, BarChart3, RotateCcw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FAQSectionProps {
  className?: string;
}

const FAQSection = ({ className = '' }: FAQSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Não sou budista. Posso apoiar?',
      answer: 'Sim. Este projeto é porta aberta — beneficiamos toda a comunidade. Não há necessidade de afiliação religiosa para participar ou apoiar.',
      icon: HelpCircle,
    },
    {
      question: 'Meu dinheiro fica seguro?',
      answer: 'Sim. Fica em conta segregada até comprovação de cada etapa. O recurso só é liberado quando há evidências claras de execução.',
      icon: Lock,
    },
    {
      question: 'Como acompanho as evidências?',
      answer: 'Área logada exclusiva com fotos, notas fiscais e relatórios em tempo real. Você recebe acesso assim que a doação é confirmada.',
      icon: BarChart3,
    },
    {
      question: 'E se o projeto parar?',
      answer: 'Se uma fase não for comprovada, o recurso não é liberado. Você decide: reembolso ou redirecionamento para outra iniciativa do templo.',
      icon: RotateCcw,
    },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // FAQ items animation
      itemsRef.current.forEach((item, i) => {
        if (item) {
          gsap.fromTo(
            item,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              delay: i * 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className={`relative bg-[#F6F5F0] py-20 lg:py-28 ${className}`}
    >
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="eyebrow block mb-3">FAQ</span>
          <h2 className="text-3xl lg:text-4xl font-serif text-[#1F1F1F] uppercase tracking-[0.02em]">
            Perguntas frequentes
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                ref={(el) => { itemsRef.current[index] = el; }}
                className="border-t border-[rgba(31,31,31,0.12)]"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full py-5 flex items-start gap-4 text-left hover:opacity-70 transition-opacity"
                >
                  <Icon
                    size={20}
                    className="text-[#4A5D23] flex-shrink-0 mt-0.5"
                    strokeWidth={1.5}
                  />
                  <span className="flex-1 text-lg font-serif text-[#1F1F1F]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-[#6E6E6E] flex-shrink-0 mt-1 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-48 pb-5' : 'max-h-0'
                  }`}
                >
                  <div className="pl-9 pr-8">
                    <p className="text-[#6E6E6E] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom border */}
        <div className="border-t border-[rgba(31,31,31,0.12)]" />
      </div>
    </section>
  );
};

export default FAQSection;
