"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, ClipboardCheck, ArrowRightCircle, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: Shield, title: 'Capturamos sua confiança', description: 'Doação 100% segura em conta segregada até vermos o progresso.' },
  { icon: ClipboardCheck, title: 'Verificamos com agilidade', description: 'Fotos, notas fiscais e relatórios analisados no mesmo dia.' },
  { icon: ArrowRightCircle, title: 'Liberamos se tudo OK', description: 'Recursos liberados para próxima fase. Ciclo transparente continua!' },
];

export default function TransparencyVT({ className = '' }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current, start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(contentRef.current?.querySelectorAll('.animate-item') || [], { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' });
        },
        once: true,
      });
      ScrollTrigger.create({
        trigger: sectionRef.current, start: 'top 60%',
        onEnter: () => {
          gsap.fromTo(imageRef.current, { rotateY: 45, opacity: 0, transformPerspective: 1000 }, { rotateY: 0, opacity: 1, duration: 1.2, ease: 'power2.out' });
        },
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`relative py-24 lg:py-32 bg-[#14331A] overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div ref={contentRef}>
            <div className="animate-item inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A1F0A]/50 border border-[#4ADE80]/20 mb-6">
              <Shield className="w-4 h-4 text-[#4ADE80]" />
              <span className="text-sm text-[#4ADE80] font-medium">Transparência Total</span>
            </div>
            <h2 className="animate-item text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Seu dinheiro só se move com <span className="text-[#4ADE80]">resultados reais</span>
            </h2>
            <p className="animate-item text-lg text-white/70 leading-relaxed mb-10">
              Cada etapa do processo é documentada com fotos georreferenciadas, notas fiscais e relatórios técnicos atualizados em tempo real.
            </p>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="animate-item flex items-start gap-4 p-4 rounded-2xl bg-[#0A1F0A]/30 border border-white/10 hover:border-[#4ADE80]/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-[#4ADE80]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#4ADE80]/30 transition-colors">
                    <step.icon className="w-6 h-6 text-[#4ADE80]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg mb-1">{step.title}</h3>
                    <p className="text-white/60 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="animate-item mt-8">
              <a href="#" className="inline-flex items-center gap-2 text-[#4ADE80] hover:text-white transition-colors group">
                <span className="font-medium">Ver dashboard ao vivo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          <div ref={imageRef} className="relative" style={{ transformStyle: 'preserve-3d' }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img src="/images/vivaterra/dashboard-mockup.jpg" alt="Dashboard de Transparência" className="w-full" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1F0A]/30 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 sm:bottom-8 sm:-left-8 p-4 rounded-2xl bg-[#0A1F0A] border border-[#4ADE80]/30 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Sistema Ativo</div>
                  <div className="text-white/50 text-xs">Atualizado em tempo real</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 sm:top-8 sm:-right-8 p-4 rounded-2xl bg-[#0A1F0A] border border-[#4ADE80]/30 shadow-xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#4ADE80]">98%</div>
                <div className="text-white/50 text-xs">Transparência</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
