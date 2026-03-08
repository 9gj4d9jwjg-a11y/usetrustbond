"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Factory, MapPin, Building2, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { icon: Factory, value: 720, suffix: ' ton/ano', label: 'Óleo processado', description: 'Capacidade atual de processamento' },
  { icon: MapPin, value: 3200, suffix: '+', label: 'Pontos de coleta', description: 'Em toda a região de São Paulo' },
  { icon: Building2, value: 50, suffix: '+', label: 'Municípios atendidos', description: 'Cobertura em expansão constante' },
  { icon: Leaf, value: 1200, suffix: '', label: 'Ton CO₂ evitado', description: 'Impacto positivo no clima' },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: numberRef.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function () { setDisplayValue(Math.floor(this.targets()[0].val)); },
        });
      },
      once: true,
    });
    return () => trigger.kill();
  }, [value]);

  return <span ref={numberRef}>{displayValue.toLocaleString('pt-BR')}{suffix}</span>;
}

export default function ImpactMetricsVT({ className = '' }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(cardsRef.current?.children || [], { y: 60, opacity: 0, scale: 0.95 }, {
            y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)',
          });
        },
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`relative py-24 lg:py-32 bg-[#14331A] overflow-hidden ${className}`}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Impacto em <span className="text-[#4ADE80]">números</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            O que medimos além do dinheiro — resultados concretos de transformação ambiental
          </p>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="group relative p-8 rounded-3xl bg-[#0A1F0A]/50 border border-white/10 hover:border-[#4ADE80]/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(74,222,128,0.1)] hover:-translate-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#4ADE80]/20 flex items-center justify-center mb-6 group-hover:bg-[#4ADE80]/30 transition-colors">
                <metric.icon className="w-7 h-7 text-[#4ADE80]" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                <AnimatedNumber value={metric.value} suffix={metric.suffix} />
              </div>
              <div className="font-semibold text-white/90 text-lg mb-2">{metric.label}</div>
              <p className="text-white/50 text-sm">{metric.description}</p>
              <div className="absolute inset-0 rounded-3xl bg-[#4ADE80]/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#4ADE80]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#0A1F0A]/50 rounded-full blur-3xl" />
    </section>
  );
}
