"use client";

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, ClipboardCheck, ArrowRightCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TransparencyEL = ({ className = '' }: { className?: string }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    { 
      icon: Shield, 
      title: 'Capturamos sua confiança', 
      desc: 'Simboliza proteção e segurança da doação em conta segregada e segura.' 
    },
    { 
      icon: ClipboardCheck, 
      title: 'Verificamos com agilidade', 
      desc: 'Checkmark para validação rápida de notas fiscais e relatórios de avanço.' 
    },
    { 
      icon: ArrowRightCircle, 
      title: 'Liberamos e aceleramos', 
      desc: 'Seta para liberação imediata para a próxima fase da obra e repetição do ciclo.' 
    },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      stepsRef.current.forEach((step, i) => {
        if (step) {
          gsap.fromTo(step, { x: 30, opacity: 0 }, {
            x: 0, opacity: 1, duration: 0.6, delay: i * 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: step, start: 'top 90%' },
          });
        }
      });

      iconsRef.current.forEach((icon, i) => {
        if (icon) {
          gsap.fromTo(icon, { scale: 0.5, rotate: -20, opacity: 0 }, {
            scale: 1, rotate: 0, opacity: 1, duration: 0.5, delay: i * 0.12, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: icon, start: 'top 90%' },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="transparency" className={`bg-[#F6F5F0] py-24 lg:py-32 ${className}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-[6vw]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div ref={leftCardRef} className="card-enkoji w-full lg:w-[40%] p-8 lg:p-12 flex flex-col justify-center">
            <span className="eyebrow block mb-4">Transparência</span>
            <div className="hairline mb-8" />
            <h2 className="text-3xl lg:text-4xl font-serif text-[#1F1F1F] leading-tight mb-8">
              Seu dinheiro só se move quando a telha é colocada.
            </h2>
            <p className="text-[#6E6E6E] leading-relaxed text-lg">
              Cada etapa da obra só é liberada após evidências claras: fotos georreferenciadas, notas fiscais dos materiais, recibos de mão de obra e um breve relatório técnico de execução.
            </p>
          </div>

          <div ref={rightCardRef} className="card-enkoji w-full lg:w-[60%] p-8 lg:p-12 relative">
            <div ref={lineRef} className="absolute left-[3rem] lg:left-[4rem] top-12 bottom-12 w-[2px] bg-[rgba(31,31,31,0.1)]" />
            <div className="space-y-12">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} ref={(el) => { stepsRef.current[index] = el; }} className="flex items-start gap-10 lg:gap-16 pl-24 lg:pl-32 relative">
                    <div ref={(el) => { iconsRef.current[index] = el; }} className="absolute left-[3rem] lg:left-[4rem] -translate-x-1/2 w-12 h-12 rounded-full bg-[#F6F5F0] border-2 border-[rgba(31,31,31,0.15)] flex items-center justify-center z-10">
                      <Icon size={20} className="text-[#4A5D23]" strokeWidth={1.5} />
                    </div>
                    <div className="pt-1">
                      <h3 className="text-xl lg:text-2xl font-serif text-[#1F1F1F] mb-3">{step.title}</h3>
                      <p className="text-[#6E6E6E] leading-relaxed text-lg">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparencyEL;
