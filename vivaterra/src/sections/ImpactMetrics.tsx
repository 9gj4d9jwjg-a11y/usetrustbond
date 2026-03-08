import { useEffect, useRef, useState } from 'react';
import { Factory, MapPin, Building2, Leaf } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  {
    icon: Factory,
    value: 720,
    suffix: ' toneladas/ano',
    label: 'Óleo processado',
    description: 'Capacidade atual de processamento',
  },
  {
    icon: MapPin,
    value: 3200,
    suffix: '+',
    label: 'Pontos de coleta',
    description: 'Em toda a região de São Paulo',
  },
  {
    icon: Building2,
    value: 50,
    suffix: '+',
    label: 'Municípios atendidos',
    description: 'Cobertura em expansão constante',
  },
  {
    icon: Leaf,
    value: 1200,
    suffix: '',
    label: 'Ton CO₂ evitado',
    description: 'Impacto positivo no clima',
  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: numberRef.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(
          { val: 0 },
          {
            val: value,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              setDisplayValue(Math.floor(this.targets()[0].val));
            },
          }
        );
      },
      once: true,
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <span ref={numberRef}>
      {displayValue.toLocaleString('pt-BR')}
      {suffix}
    </span>
  );
}

export function ImpactMetrics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            cardsRef.current?.children || [],
            { y: 60, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'back.out(1.2)',
            }
          );
        },
        once: true,
      });
      triggers.push(trigger);
    }, sectionRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-forest overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Impacto em <span className="text-mint">números</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            O que medimos além do dinheiro - resultados concretos de transformação ambiental
          </p>
        </div>

        {/* Metrics grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl bg-dark-green/50 border border-white/10 hover:border-mint/40 transition-all duration-500 hover:shadow-glow hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-mint/20 flex items-center justify-center mb-6 group-hover:bg-mint/30 transition-colors">
                <metric.icon className="w-7 h-7 text-mint" />
              </div>

              {/* Value */}
              <div className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
                <AnimatedNumber value={metric.value} suffix={metric.suffix} />
              </div>

              {/* Label */}
              <div className="font-display font-semibold text-white/90 text-lg mb-2">
                {metric.label}
              </div>

              {/* Description */}
              <p className="text-white/50 text-sm">{metric.description}</p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl bg-mint/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-mint/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-dark-green/50 rounded-full blur-3xl" />
    </section>
  );
}
