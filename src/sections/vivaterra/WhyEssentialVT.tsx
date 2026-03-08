"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Droplets, AlertTriangle, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function WhyEssentialVT({ className = '' }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            contentRef.current?.querySelectorAll('.reveal-text') || [],
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
          );
        },
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projeto" ref={sectionRef} className={`relative py-24 lg:py-32 bg-[#0A1F0A] ${className}`}>
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div ref={contentRef} className="text-center">
          <h2 className="reveal-text text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
            Por que este projeto é{' '}
            <span className="text-[#4ADE80]">essencial?</span>
          </h2>

          <p className="reveal-text text-lg sm:text-xl text-white/70 leading-relaxed mb-12 max-w-3xl mx-auto">
            Imagine um mundo onde o óleo de cozinha usado não contamina rios, 
            mas se transforma em <span className="text-[#4ADE80] font-medium">energia limpa</span>. 
            No Brasil, milhões de litros são descartados incorretamente todos os anos, 
            causando danos irreversíveis ao meio ambiente.
          </p>

          {/* Highlight box */}
          <div className="reveal-text relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#14331A]/40 to-[#14331A]/20 border border-[#4ADE80]/20 mb-16">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#4ADE80] rounded-full flex items-center justify-center">
              <Droplets className="w-4 h-4 text-[#0A1F0A]" />
            </div>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Cada litro reciclado evita a contaminação de{' '}
              <span className="text-[#4ADE80]">25.000 litros</span> de água
            </p>
          </div>

          {/* Challenge cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="reveal-text p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#4ADE80]/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">O Desafio</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Óleo descartado incorretamente polui rios, solo e afeta a vida aquática
              </p>
            </div>

            <div className="reveal-text p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#4ADE80]/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-[#14331A] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-[#4ADE80]" />
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">A Solução</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Coleta e processamento transformam resíduos em biocombustível
              </p>
            </div>

            <div className="reveal-text p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#4ADE80]/30 transition-colors group sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 rounded-xl bg-[#4ADE80]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Droplets className="w-6 h-6 text-[#4ADE80]" />
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">O Impacto</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Redução de emissões e geração de energia limpa para comunidades
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4ADE80]/20 to-transparent" />
    </section>
  );
}
