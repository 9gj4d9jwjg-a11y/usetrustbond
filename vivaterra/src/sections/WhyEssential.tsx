import { useEffect, useRef } from 'react';
import { Droplets, AlertTriangle, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function WhyEssential() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      // Text reveal animation
      const trigger = ScrollTrigger.create({
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
      triggers.push(trigger);
    }, sectionRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="projeto"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark-green"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div ref={contentRef} className="text-center">
          {/* Section Title */}
          <h2 className="reveal-text font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
            Por que este projeto é{' '}
            <span className="text-mint">essencial?</span>
          </h2>

          {/* Main paragraph */}
          <p className="reveal-text text-lg sm:text-xl text-white/70 leading-relaxed mb-12 max-w-3xl mx-auto">
            Imagine um mundo onde o óleo de cozinha usado não contamina rios, 
            mas se transforma em <span className="text-mint font-medium">energia limpa</span>. 
            No Brasil, milhões de litros são descartados incorretamente todos os anos, 
            causando danos irreversíveis ao meio ambiente.
          </p>

          {/* Highlight box */}
          <div className="reveal-text relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-forest/40 to-forest/20 border border-mint/20 mb-16">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-mint rounded-full flex items-center justify-center">
              <Droplets className="w-4 h-4 text-dark-green" />
            </div>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white">
              Cada litro reciclado evita a contaminação de{' '}
              <span className="text-mint">25.000 litros</span> de água
            </p>
          </div>

          {/* Challenge cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="reveal-text p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-mint/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="font-display font-semibold text-white text-lg mb-2">
                O Desafio
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Óleo descartado incorretamente polui rios, solo e afeta a vida aquática
              </p>
            </div>

            <div className="reveal-text p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-mint/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-forest flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-mint" />
              </div>
              <h3 className="font-display font-semibold text-white text-lg mb-2">
                A Solução
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Coleta e processamento transformam resíduos em biocombustível
              </p>
            </div>

            <div className="reveal-text p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-mint/30 transition-colors group sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 rounded-xl bg-mint/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Droplets className="w-6 h-6 text-mint" />
              </div>
              <h3 className="font-display font-semibold text-white text-lg mb-2">
                O Impacto
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Redução de emissões e geração de energia limpa para comunidades
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mint/20 to-transparent" />
    </section>
  );
}
