import { useEffect, useRef } from 'react';
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            ctaRef.current?.querySelectorAll('.animate-item') || [],
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
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
    <footer ref={sectionRef} className="relative bg-forest overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest via-dark-green to-forest animate-gradient opacity-50" />

      {/* CTA Section */}
      <div ref={ctaRef} className="relative z-10 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="animate-item font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Faça parte dessa{' '}
            <span className="text-mint">transformação</span>
          </h2>

          <p className="animate-item text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Não importa o valor. Sua contribuição é o combustível que move 
            essa corrente do bem. Ajude-nos a construir um futuro mais sustentável.
          </p>

          <div className="animate-item flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-mint hover:bg-white text-dark-green font-semibold rounded-full px-10 py-7 text-lg transition-all duration-300 hover:shadow-glow-lg group animate-pulse-glow"
            >
              <span className="mr-2">🌱</span>
              Doar Agora
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <p className="animate-item mt-6 text-white/50 text-sm">
            Contribuição transparente e segura - garantia TrustBond.app
          </p>
        </div>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-mint/20 flex items-center justify-center">
                  <span className="text-mint font-display font-bold">B</span>
                </div>
                <span className="font-display font-bold text-white text-xl">
                  Bio-Energy
                </span>
              </div>
              <p className="text-white/60 mb-6 max-w-sm">
                Transformando resíduos em energia limpa. 
                Um projeto VivaTerra em parceria com TrustBond.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-mint/20 hover:text-mint transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-mint/20 hover:text-mint transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-mint/20 hover:text-mint transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display font-semibold text-white mb-4">
                Links Rápidos
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#projeto" className="text-white/60 hover:text-mint transition-colors">
                    O Projeto
                  </a>
                </li>
                <li>
                  <a href="#como-funciona" className="text-white/60 hover:text-mint transition-colors">
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a href="#impacto" className="text-white/60 hover:text-mint transition-colors">
                    Impacto
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-white/60 hover:text-mint transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-semibold text-white mb-4">
                Contato
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-white/60">
                  <Mail className="w-4 h-4 text-mint" />
                  contato@bioenergy.org
                </li>
                <li className="flex items-center gap-3 text-white/60">
                  <Phone className="w-4 h-4 text-mint" />
                  (11) 3456-7890
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <MapPin className="w-4 h-4 text-mint flex-shrink-0 mt-1" />
                  São Paulo, SP - Brasil
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © 2026 Bio-Energy. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/40 hover:text-mint transition-colors">
                Transparência
              </a>
              <a href="#" className="text-white/40 hover:text-mint transition-colors">
                Privacidade
              </a>
              <a href="#" className="text-white/40 hover:text-mint transition-colors">
                Termos
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-mint/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-dark-green/30 rounded-full blur-3xl" />
    </footer>
  );
}
