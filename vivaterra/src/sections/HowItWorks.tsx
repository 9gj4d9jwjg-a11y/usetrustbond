import { useEffect, useRef } from 'react';
import { Truck, Factory, Zap, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Truck,
    title: 'Coleta',
    subtitle: 'O que entra no projeto',
    description:
      'Óleo de cozinha usado coletado de mais de 3.200 pontos em 50+ municípios de São Paulo. Um resíduo que antes era descartado incorretamente.',
    details: ['Restaurantes e cozinhas industriais', 'Pontos de coleta públicos', 'Frota própria de caminhões'],
    color: 'from-blue-500/20 to-blue-600/10',
  },
  {
    icon: Factory,
    title: 'Processamento',
    subtitle: 'A transformação',
    description:
      '90% do óleo coletado é convertido em biodiesel de alta qualidade. Os 10% restantes viram produtos de limpeza eco-friendly.',
    details: ['Filtração e purificação', 'Processo de transesterificação', 'Certificação ISCC'],
    color: 'from-mint/20 to-forest/10',
  },
  {
    icon: Zap,
    title: 'Impacto',
    subtitle: 'O que ganhamos',
    description:
      'Energia limpa que alimenta veículos e indústrias, créditos de carbono gerados e redução significativa de poluição.',
    details: ['Biodiesel para frota', 'Créditos de carbono', 'Redução de emissões'],
    color: 'from-yellow-500/20 to-orange-500/10',
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      // Line draw animation
      const lineTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => {
          gsap.fromTo(
            lineRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.5, ease: 'power2.out' }
          );
        },
        once: true,
      });
      triggers.push(lineTrigger);

      // Steps animation
      const stepsTrigger = ScrollTrigger.create({
        trigger: stepsRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(
            stepsRef.current?.querySelectorAll('.step-card') || [],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' }
          );
        },
        once: true,
      });
      triggers.push(stepsTrigger);
    }, sectionRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark-green overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest/30 border border-mint/20 mb-6">
            <span className="text-sm text-mint font-medium">O Processo</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Como <span className="text-mint">Funciona</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            De resíduo a recurso: uma cadeia de valor sustentável que beneficia o planeta e a economia
          </p>
        </div>

        {/* Progress line (desktop) */}
        <div className="hidden lg:block relative h-1 mb-12">
          <div className="absolute inset-0 bg-white/10 rounded-full" />
          <div
            ref={lineRef}
            className="absolute inset-0 bg-gradient-to-r from-mint via-mint to-forest rounded-full origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Steps grid */}
        <div ref={stepsRef} className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-card group relative"
            >
              {/* Card */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-mint/30 transition-all duration-500 h-full">
                {/* Step number */}
                <div className="absolute -top-4 -left-2 w-10 h-10 rounded-full bg-mint flex items-center justify-center font-display font-bold text-dark-green text-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                >
                  <step.icon className="w-8 h-8 text-mint" />
                </div>

                {/* Content */}
                <div className="text-mint/70 text-sm font-medium uppercase tracking-wider mb-2">
                  {step.subtitle}
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Details list */}
                <ul className="space-y-2">
                  {step.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-white/50"
                    >
                      <ArrowRight className="w-4 h-4 text-mint" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Arrow connector (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-8 rounded-full bg-forest border border-mint/30 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-mint" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom image */}
        <div className="mt-16 relative rounded-3xl overflow-hidden">
          <img
            src="/collection-truck.jpg"
            alt="Frota de coleta"
            className="w-full h-64 sm:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-green via-dark-green/50 to-transparent" />
          <div className="absolute inset-0 flex items-center p-8 sm:p-12">
            <div className="max-w-lg">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                Frota própria de coleta
              </h3>
              <p className="text-white/70">
                Caminhões equipados e equipe treinada garantem a logística eficiente 
                da coleta em toda a região metropolitana.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
