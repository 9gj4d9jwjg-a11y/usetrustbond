import { useEffect, useRef, useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const donationCards = [
  {
    value: 'R$ 100',
    description: 'Contribui para a logística de coleta',
    impact: 'Coleta de 50 litros de óleo usado',
    features: [
      'Acesso ao dashboard de transparência',
      'Relatório mensal de impacto',
      'Certificado de contribuição',
    ],
    highlight: false,
  },
  {
    value: 'R$ 500',
    description: 'Apoia o processamento de 100kg de óleo',
    impact: 'Gera 80 litros de biodiesel',
    features: [
      'Todos os benefícios do plano anterior',
      'Nome no mural de agradecimentos',
      'Convite para visita à planta',
      'Atualizações exclusivas do projeto',
    ],
    highlight: true,
    badge: 'Mais Popular',
  },
  {
    value: 'R$ 1.000',
    description: 'Garante infraestrutura para expansão',
    impact: 'Equipamento para novo ponto de coleta',
    features: [
      'Todos os benefícios dos planos anteriores',
      'Reunião anual com a diretoria',
      'Prioridade em novos projetos',
      'Reconhecimento público especial',
    ],
    highlight: false,
  },
];

export function DonationValues() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(
            cardsRef.current?.children || [],
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredCard(index);
  };

  return (
    <section
      id="impacto"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark-green overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest/30 border border-mint/20 mb-6">
            <Sparkles className="w-4 h-4 text-mint" />
            <span className="text-sm text-mint font-medium">Faça Parte</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            O impacto da sua <span className="text-mint">doação</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Queremos que você veja, com clareza, como seu apoio se transforma em resultado tangível
          </p>
        </div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {donationCards.map((card, index) => (
            <div
              key={index}
              className={`relative group ${card.highlight ? 'md:-mt-4 md:mb-4' : ''}`}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Highlight badge */}
              {card.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <span className="px-4 py-1 rounded-full bg-mint text-dark-green text-sm font-semibold">
                    {card.badge}
                  </span>
                </div>
              )}

              {/* Card */}
              <div
                className={`relative h-full p-8 rounded-3xl border transition-all duration-500 overflow-hidden ${
                  card.highlight
                    ? 'bg-gradient-to-br from-mint/20 to-mint/5 border-mint/40'
                    : 'bg-white/5 border-white/10 hover:border-mint/30'
                }`}
              >
                {/* Shine effect */}
                {hoveredCard === index && (
                  <div
                    className="absolute w-64 h-64 rounded-full bg-mint/10 blur-3xl pointer-events-none transition-opacity duration-300"
                    style={{
                      left: mousePosition.x - 128,
                      top: mousePosition.y - 128,
                    }}
                  />
                )}

                {/* Value */}
                <div className="text-4xl sm:text-5xl font-display font-bold text-white mb-2">
                  {card.value}
                </div>

                {/* Description */}
                <p className="text-white/70 mb-4">{card.description}</p>

                {/* Impact highlight */}
                <div className="p-4 rounded-xl bg-forest/30 border border-mint/20 mb-6">
                  <div className="text-mint text-sm font-medium mb-1">Impacto direto:</div>
                  <div className="text-white font-semibold">{card.impact}</div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {card.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-mint/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-mint" />
                      </div>
                      <span className="text-white/60 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`w-full rounded-full py-6 font-semibold transition-all duration-300 ${
                    card.highlight
                      ? 'bg-mint hover:bg-white text-dark-green hover:shadow-glow'
                      : 'bg-forest hover:bg-mint text-white hover:text-dark-green'
                  }`}
                >
                  Doar {card.value}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Multiplier note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-forest/30 border border-mint/20">
            <div className="w-12 h-12 rounded-full bg-mint/20 flex items-center justify-center">
              <span className="text-2xl font-display font-bold text-mint">5×</span>
            </div>
            <div className="text-left">
              <div className="text-white font-medium">Sua contribuição é multiplicada</div>
              <div className="text-white/50 text-sm">
                Investidores institucionais dobram seu impacto
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-mint/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-forest/20 rounded-full blur-3xl" />
    </section>
  );
}
