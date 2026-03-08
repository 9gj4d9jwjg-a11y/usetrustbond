import { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - words slide up
      gsap.fromTo(
        titleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.3 }
      );

      // Subtitle fade up
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.6 }
      );

      // Buttons stagger
      gsap.fromTo(
        buttonsRef.current?.children || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.8 }
      );

      // Image reveal with clip-path
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power4.out', delay: 0.2 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProject = () => {
    const element = document.querySelector('#projeto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-dark-green"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-green via-forest/20 to-dark-green" />

      {/* Content Grid */}
      <div className="relative z-10 grid lg:grid-cols-2 min-h-screen">
        {/* Left - Text Content */}
        <div className="flex flex-col justify-center px-6 sm:px-8 lg:px-16 xl:px-24 pt-24 lg:pt-0">
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest/30 border border-mint/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              <span className="text-sm text-mint font-medium">Projeto Ativo</span>
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6"
            >
              Transforme{' '}
              <span className="text-gradient">Resíduos</span>{' '}
              em Energia Limpa
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl text-white/70 leading-relaxed mb-8"
            >
              Convertendo <span className="text-mint font-semibold">720 toneladas/ano</span> de óleo de 
              cozinha usado em produtos verdes e combustível sustentável. 
              Contribuição transparente e segura.
            </p>

            {/* Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-mint hover:bg-white text-dark-green font-semibold rounded-full px-8 py-6 text-base transition-all duration-300 hover:shadow-glow-lg group"
              >
                Apoiar Projeto
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToProject}
                className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base transition-all duration-300"
              >
                Conheça o projeto
              </Button>
            </div>

            {/* Stats mini */}
            <div className="flex items-center gap-8 mt-10 pt-8 border-t border-white/10">
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white">98<span className="text-mint">/100</span></div>
                <div className="text-sm text-white/50">Integrity Score</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white">$537K</div>
                <div className="text-sm text-white/50">Meta de arrecadação</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Image */}
        <div className="relative hidden lg:block">
          <div
            ref={imageRef}
            className="absolute inset-0"
          >
            <img
              src="/hero-bioenergy.jpg"
              alt="Instalação de processamento de biocombustível"
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-dark-green via-dark-green/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-green via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Mobile Image */}
      <div className="lg:hidden relative h-64 mt-8">
        <img
          src="/hero-bioenergy.jpg"
          alt="Instalação de processamento de biocombustível"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-green via-dark-green/50 to-transparent" />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
        <span className="text-xs uppercase tracking-widest">Role para explorar</span>
        <ChevronDown className="w-5 h-5" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-mint/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-forest/10 rounded-full blur-3xl" />
    </section>
  );
}
