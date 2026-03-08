"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialVT({ className = '' }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current, start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(contentRef.current?.querySelectorAll('.animate-item') || [], { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' });
        },
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`relative py-24 lg:py-32 bg-[#14331A] overflow-hidden ${className}`}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '50px 50px' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
        <div ref={contentRef} className="relative">
          <div className="animate-item absolute -top-6 -left-4 sm:-left-8 w-16 h-16 rounded-2xl bg-[#4ADE80]/20 flex items-center justify-center">
            <Quote className="w-8 h-8 text-[#4ADE80]" />
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="animate-item flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-[#4ADE80]/30">
                  <img src="/images/vivaterra/testimonial-director.jpg" alt="Diretor da VivaTerra" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-[#4ADE80]/20 scale-110" />
                <div className="absolute inset-0 rounded-full border border-[#4ADE80]/10 scale-125" />
              </div>
            </div>

            <div className="lg:col-span-2 text-center lg:text-left">
              <blockquote className="animate-item">
                <p className="text-xl sm:text-2xl lg:text-3xl text-white leading-relaxed mb-8">
                  &ldquo;Transformar óleo usado em energia limpa não é apenas negócio, 
                  é nossa <span className="text-[#4ADE80]">responsabilidade</span> com o planeta. 
                  Cada litro reciclado é uma gota de esperança para as futuras gerações.&rdquo;
                </p>
              </blockquote>

              <div className="animate-item">
                <div className="font-bold text-white text-lg">Carlos Mendes</div>
                <div className="text-[#4ADE80] font-medium">Diretor de Operações — VivaTerra</div>
                <div className="text-white/50 text-sm mt-1">Parceiro Verificado</div>
              </div>

              <div className="animate-item mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#0A1F0A]/50 border border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#4ADE80]/20 flex items-center justify-center font-bold text-[#4ADE80]">VT</div>
                <div className="text-left">
                  <div className="text-white font-medium text-sm">VivaTerra</div>
                  <div className="text-white/50 text-xs">Verified Partner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#4ADE80]/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0A1F0A]/30 rounded-full blur-3xl" />
    </section>
  );
}
