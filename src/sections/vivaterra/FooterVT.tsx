"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react';
import { TRUSTBOND_PROJECTS } from '@/config/projects';

gsap.registerPlugin(ScrollTrigger);

export default function FooterVT({ className = '' }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current, start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(ctaRef.current?.querySelectorAll('.animate-item') || [], { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' });
        },
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className={`relative bg-[#14331A] overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#14331A] via-[#0A1F0A] to-[#14331A] opacity-50" />

      {/* CTA */}
      <div ref={ctaRef} className="relative z-10 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="animate-item text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Faça parte dessa <span className="text-[#4ADE80]">transformação</span>
          </h2>
          <p className="animate-item text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Não importa o valor. Sua contribuição é o combustível que move essa corrente do bem.
          </p>
          <div className="animate-item flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={TRUSTBOND_PROJECTS.HOME}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#4ADE80] hover:bg-white text-[#0A1F0A] font-semibold rounded-full px-10 py-5 text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] inline-flex items-center justify-center gap-2 group"
            >
              <span>🌱</span> Doar Agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <p className="animate-item mt-6 text-white/50 text-sm">
            Contribuição transparente e segura — garantia TrustBond.app
          </p>
        </div>
      </div>

      {/* Footer links */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#4ADE80]/20 flex items-center justify-center">
                  <span className="text-[#4ADE80] font-bold">B</span>
                </div>
                <span className="font-bold text-white text-xl">Bio-Energy</span>
              </div>
              <p className="text-white/60 mb-6 max-w-sm">Transformando resíduos em energia limpa. Um projeto VivaTerra em parceria com TrustBond.</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#4ADE80]/20 hover:text-[#4ADE80] transition-colors"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#4ADE80]/20 hover:text-[#4ADE80] transition-colors"><Instagram className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Links Rápidos</h4>
              <ul className="space-y-3">
                <li><a href="#projeto" className="text-white/60 hover:text-[#4ADE80] transition-colors">O Projeto</a></li>
                <li><a href="#como-funciona" className="text-white/60 hover:text-[#4ADE80] transition-colors">Como Funciona</a></li>
                <li><a href="#impacto" className="text-white/60 hover:text-[#4ADE80] transition-colors">Impacto</a></li>
                <li><a href="#faq" className="text-white/60 hover:text-[#4ADE80] transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contato</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-white/60"><Mail className="w-4 h-4 text-[#4ADE80]" />contato@bioenergy.org</li>
                <li className="flex items-center gap-3 text-white/60"><Phone className="w-4 h-4 text-[#4ADE80]" />(11) 3456-7890</li>
                <li className="flex items-start gap-3 text-white/60"><MapPin className="w-4 h-4 text-[#4ADE80] flex-shrink-0 mt-1" />São Paulo, SP</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">© 2026 Bio-Energy. Todos os direitos reservados.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/40 hover:text-[#4ADE80] transition-colors">Transparência</a>
              <a href="#" className="text-white/40 hover:text-[#4ADE80] transition-colors">Privacidade</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
