import { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Testimonial() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(
            contentRef.current?.querySelectorAll('.animate-item') || [],
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
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-forest overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
        <div ref={contentRef} className="relative">
          {/* Quote icon */}
          <div className="animate-item absolute -top-6 -left-4 sm:-left-8 w-16 h-16 rounded-2xl bg-mint/20 flex items-center justify-center">
            <Quote className="w-8 h-8 text-mint" />
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-center">
            {/* Image */}
            <div className="animate-item flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-mint/30">
                  <img
                    src="/testimonial-director.jpg"
                    alt="Diretor da VivaTerra"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-full border-2 border-mint/20 scale-110" />
                <div className="absolute inset-0 rounded-full border border-mint/10 scale-125" />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <blockquote className="animate-item">
                <p className="text-xl sm:text-2xl lg:text-3xl font-display text-white leading-relaxed mb-8">
                  "Transformar óleo usado em energia limpa não é apenas negócio, 
                  é nossa <span className="text-mint">responsabilidade</span> com o planeta. 
                  Cada litro reciclado é uma gota de esperança para as futuras gerações."
                </p>
              </blockquote>

              <div className="animate-item">
                <div className="font-display font-bold text-white text-lg">
                  Carlos Mendes
                </div>
                <div className="text-mint font-medium">
                  Diretor de Operações - VivaTerra
                </div>
                <div className="text-white/50 text-sm mt-1">
                  Parceiro Verificado
                </div>
              </div>

              {/* Organization badge */}
              <div className="animate-item mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-dark-green/50 border border-white/10">
                <div className="w-10 h-10 rounded-full bg-mint/20 flex items-center justify-center font-display font-bold text-mint">
                  VT
                </div>
                <div className="text-left">
                  <div className="text-white font-medium text-sm">VivaTerra</div>
                  <div className="text-white/50 text-xs">Verified Partner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-mint/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-dark-green/30 rounded-full blur-3xl" />
    </section>
  );
}
