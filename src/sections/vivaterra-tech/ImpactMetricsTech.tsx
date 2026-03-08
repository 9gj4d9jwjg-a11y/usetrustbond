"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, FolderSearch, Database, Wifi } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { icon: Users, value: 0, suffix: ' M', label: 'Usuários alcançados', description: 'Meta de escala global' },
  { icon: FolderSearch, value: 50, suffix: '+', label: 'Projetos rastreados', description: 'Via blockchain' },
  { icon: Database, value: 1, suffix: ' M+', label: 'Pontos de dados', description: 'Registros imutáveis' },
  { icon: Wifi, value: 99.9, suffix: '%', label: 'Uptime', description: 'Disponibilidade do sistema' },
];

function AnimatedNumber({ value, suffix, decimals = false }: { value: number; suffix: string; decimals?: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const numberRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const trigger = ScrollTrigger.create({ trigger: numberRef.current, start: 'top 85%',
      onEnter: () => { gsap.to({ val: 0 }, { val: value, duration: 2, ease: 'power2.out', onUpdate: function () { setDisplayValue(decimals ? parseFloat(this.targets()[0].val.toFixed(1)) : Math.floor(this.targets()[0].val)); } }); },
      once: true });
    return () => trigger.kill();
  }, [value, decimals]);
  return <span ref={numberRef}>{displayValue}{suffix}</span>;
}

export default function ImpactMetricsTech({ className = '' }: { className?: string }) {
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
    <section ref={sectionRef} className={`relative py-24 lg:py-32 bg-[#14331A] overflow-hidden ${className}`}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#4ADE80 1px, transparent 1px), linear-gradient(90deg, #4ADE80 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <div className="uppercase text-[#4ADE80] text-sm font-medium tracking-widest mb-3">RESULTADOS CONCRETOS</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Impacto em <span className="text-[#4ADE80]">números</span></h2>
        </div>
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <div key={i} className="group relative p-8 rounded-3xl bg-[#0A1F0A]/50 border border-white/10 hover:border-[#4ADE80]/40 transition-all duration-500 hover:-translate-y-2 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#4ADE80]/20 flex items-center justify-center mb-6 mx-auto group-hover:bg-[#4ADE80]/30 transition-colors">
                <m.icon className="w-7 h-7 text-[#4ADE80]" />
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-[#4ADE80] mb-2"><AnimatedNumber value={m.value} suffix={m.suffix} decimals={m.suffix === '%'} /></div>
              <div className="font-semibold text-white/90 text-sm mb-1">{m.label}</div>
              <p className="text-white/50 text-xs">{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
