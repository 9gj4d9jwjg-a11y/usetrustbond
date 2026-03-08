import { useEffect, useRef } from 'react';
import { Shield, FileCheck, Clock, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const transparencySteps = [
  {
    icon: Shield,
    title: 'Doação 100% segura',
    description: 'Seu dinheiro fica em conta segregada até a comprovação de cada etapa.',
  },
  {
    icon: FileCheck,
    title: 'Verificação ágil',
    description: 'Fotos, notas fiscais e relatórios analisados no mesmo dia.',
  },
  {
    icon: Clock,
    title: 'Liberação comprovada',
    description: 'Recursos liberados para próxima fase apenas após evidências.',
  },
];

export function Transparency() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      // Content animation
      const contentTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(
            contentRef.current?.querySelectorAll('.animate-item') || [],
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
          );
        },
        once: true,
      });
      triggers.push(contentTrigger);

      // Image 3D flip animation
      const imageTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => {
          gsap.fromTo(
            imageRef.current,
            { rotateY: 45, opacity: 0, transformPerspective: 1000 },
            { rotateY: 0, opacity: 1, duration: 1.2, ease: 'power2.out' }
          );
        },
        once: true,
      });
      triggers.push(imageTrigger);
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
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div ref={contentRef}>
            <div className="animate-item inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-green/50 border border-mint/20 mb-6">
              <Shield className="w-4 h-4 text-mint" />
              <span className="text-sm text-mint font-medium">Transparência Total</span>
            </div>

            <h2 className="animate-item font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Seu dinheiro só se move com{' '}
              <span className="text-mint">resultados reais</span>
            </h2>

            <p className="animate-item text-lg text-white/70 leading-relaxed mb-10">
              Cada etapa do processo é documentada. Fotos georreferenciadas, 
              notas fiscais dos materiais, recibos de mão de obra e relatórios 
              técnicos são atualizados em tempo real no nosso dashboard.
            </p>

            {/* Steps */}
            <div className="space-y-6">
              {transparencySteps.map((step, index) => (
                <div
                  key={index}
                  className="animate-item flex items-start gap-4 p-4 rounded-2xl bg-dark-green/30 border border-white/10 hover:border-mint/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-mint/20 flex items-center justify-center flex-shrink-0 group-hover:bg-mint/30 transition-colors">
                    <step.icon className="w-6 h-6 text-mint" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-lg mb-1">
                      {step.title}
                    </h3>
                    <p className="text-white/60 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="animate-item mt-8">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-mint hover:text-white transition-colors group"
              >
                <span className="font-medium">Ver dashboard ao vivo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right - Dashboard Mockup */}
          <div
            ref={imageRef}
            className="relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="/dashboard-mockup.jpg"
                alt="Dashboard de Transparência"
                className="w-full"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-dark-green/30 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 sm:bottom-8 sm:-left-8 p-4 rounded-2xl bg-dark-green border border-mint/30 shadow-xl">
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

            {/* Stats badge */}
            <div className="absolute -top-4 -right-4 sm:top-8 sm:-right-8 p-4 rounded-2xl bg-dark-green border border-mint/30 shadow-xl">
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-mint">98%</div>
                <div className="text-white/50 text-xs">Transparência</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-mint/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-dark-green/30 rounded-full blur-3xl" />
    </section>
  );
}
