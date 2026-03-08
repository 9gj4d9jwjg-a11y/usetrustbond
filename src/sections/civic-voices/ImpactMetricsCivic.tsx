"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Users, MessageSquare, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { icon: MapPin, value: 50, suffix: '+', label: 'Municipalidades', description: 'Cobertura em expansão constante' },
  { icon: Users, value: 10, suffix: 'K+', label: 'Cidadãos Engajados', description: 'Participantes ativos na plataforma' },
  { icon: MessageSquare, value: 15, suffix: '', label: 'Consultas Públicas', description: 'Realizadas em 2025-2026' },
  { icon: ShieldCheck, value: 98, suffix: '%', label: 'Transparência', description: 'TrustScore verificado' },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const trigger = ScrollTrigger.create({ trigger: ref.current, start: 'top 85%',
      onEnter: () => { gsap.to({ val: 0 }, { val: value, duration: 2, ease: 'power2.out', onUpdate: function () { setDisplay(Math.floor(this.targets()[0].val)); } }); },
      once: true });
    return () => trigger.kill();
  }, [value]);
  return <span ref={ref}>{display}{suffix}</span>;
}

export default function ImpactMetricsCivic({ className = '' }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: sectionRef.current, start: 'top 80%', onEnter: () => {
        gsap.fromTo(cardsRef.current?.children || [], { y: 60, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)' });
      }, once: true });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="impacto" ref={sectionRef} className={`relative py-24 lg:py-32 bg-[#1a1a1a] text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Impacto em <span className="text-[#FFD700]">Números</span></h2>
          <p className="text-xl text-gray-400">O que medimos além do dinheiro — resultados concretos de transformação democrática</p>
        </div>
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-white/5 backdrop-blur border border-white/10 hover:border-[#FFD700]/50 transition-all duration-500 hover:-translate-y-2 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#FFD700]/20 flex items-center justify-center mb-6 mx-auto group-hover:bg-[#FFD700]/30 transition-colors">
                <m.icon className="w-7 h-7 text-[#FFD700]" />
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-[#FFD700] mb-2"><AnimatedNumber value={m.value} suffix={m.suffix} /></div>
              <div className="font-semibold text-white/90 text-lg mb-1">{m.label}</div>
              <p className="text-sm text-gray-400">{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
