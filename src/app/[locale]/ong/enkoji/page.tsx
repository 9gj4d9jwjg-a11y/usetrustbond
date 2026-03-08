"use client";

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const projects = [
  {
    title: 'Horta e Árvores',
    subtitle: 'De Semente a Esperança',
    description: 'Ajude a transformar vulnerabilidade em aprendizado e alimento. Plante o futuro com as crianças da Enkoji.',
    image: '/images/enkoji/hero_temple_v3.jpg',
    href: 'horta-e-arvores',
    tag: 'EDUCAÇÃO & NATUREZA',
    budget: 'R$ 15.000',
  },
  {
    title: 'Energia Limpa e Telhado',
    subtitle: 'Proteja o Sagrado. Ilumine o Futuro.',
    description: 'Telhado novo + infraestrutura para energia solar. Transforme sua doação em legado sustentável.',
    image: '/images/enkoji/aerial_temple.jpg',
    href: 'energialimpa-e-telhado',
    tag: 'SUSTENTABILIDADE',
    budget: 'R$ 38.000 – 45.000',
  },
];

export default function EnkojiProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const params = useParams();
  const locale = params.locale || 'pt';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
      );

      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: 0.3 + i * 0.2, ease: 'power2.out' }
          );
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#1F1F1F] flex flex-col">
      {/* Header */}
      <div ref={headerRef} className="text-center pt-20 pb-12 px-6 lg:pt-28 lg:pb-16">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center">
            <span className="text-white font-serif text-sm">円</span>
          </div>
          <span className="font-serif text-xs tracking-[0.3em] text-white/60 uppercase">Enkoji</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white uppercase tracking-[0.02em] mb-4">
          Escolha um projeto
        </h1>
        <p className="text-lg text-white/60 font-light max-w-xl mx-auto">
          Cada contribuição transforma o Templo Enkoji. Conheça nossos projetos e escolha como fazer parte dessa corrente do bem.
        </p>
        <p className="text-xs text-white/30 mt-4">📍 Templo Enkoji – Itapecerica da Serra, SP</p>
      </div>

      {/* Project Cards */}
      <div className="flex-1 flex items-start justify-center px-6 pb-20 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-[1200px] w-full">
          {projects.map((project, i) => (
            <Link
              key={i}
              href={`/${locale}/ong/enkoji/${project.href}`}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative rounded-[2rem] overflow-hidden bg-[#2a2a2a] border border-white/5 hover:border-white/15 transition-all duration-500 hover:shadow-2xl hover:shadow-[#4A5D23]/10 flex flex-col"
            >
              {/* Image */}
              <div className="h-[45vh] lg:h-[50vh] relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F] via-transparent to-transparent" />

                {/* Tag */}
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-[#4A5D23] rounded-full">
                  <span className="text-white text-[10px] tracking-[0.2em] font-medium">{project.tag}</span>
                </div>

                {/* Budget Badge */}
                <div className="absolute top-6 right-6 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <span className="text-white text-xs font-mono">{project.budget}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-10 flex flex-col flex-grow">
                <h2 className="text-2xl lg:text-3xl font-serif text-white mb-2">
                  {project.subtitle}
                </h2>
                <h3 className="text-sm text-[#4A5D23] font-medium tracking-wide uppercase mb-4">
                  {project.title}
                </h3>
                <p className="text-white/50 leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="mt-auto flex items-center gap-2 text-white/70 group-hover:text-[#4A5D23] transition-colors">
                  <span className="text-sm font-medium">Conhecer projeto</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-white/5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-[1200px] mx-auto">
          <span className="text-xs text-white/30">Contribuição transparente e segura – garantia TrustBond.app</span>
          <div className="flex items-center gap-6">
            <a href="https://temploenkoji.org.br" target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 hover:text-white/70 transition-colors">temploenkoji.org.br</a>
            <span className="text-xs text-white/20">Templo Budista Zen Enkoji</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
