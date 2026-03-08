"use client";

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const ongs = [
  {
    name: 'Enkoji',
    icon: '円',
    subtitle: 'Templo Budista Zen',
    location: 'Itapecerica da Serra, SP',
    accentColor: '#4A5D23',
    projects: [
      {
        title: 'Horta e Árvores',
        subtitle: 'De Semente a Esperança',
        description: 'Ajude a transformar vulnerabilidade em aprendizado e alimento.',
        image: '/images/enkoji/hero_temple_v3.jpg',
        href: 'ong/enkoji/horta-e-arvores',
        tag: 'EDUCAÇÃO & NATUREZA',
        budget: 'R$ 15.000',
      },
      {
        title: 'Energia Limpa e Telhado',
        subtitle: 'Proteja o Sagrado. Ilumine o Futuro.',
        description: 'Telhado novo + infraestrutura para energia solar.',
        image: '/images/enkoji/aerial_temple.jpg',
        href: 'ong/enkoji/energialimpa-e-telhado',
        tag: 'SUSTENTABILIDADE',
        budget: 'R$ 38.000 – 45.000',
      },
    ],
  },
  {
    name: 'VivaTerra',
    icon: '🌱',
    subtitle: 'Sustentabilidade Ambiental',
    location: 'São Paulo, SP',
    accentColor: '#4ADE80',
    projects: [
      {
        title: 'Bio-Energy',
        subtitle: 'Transforme Resíduos em Energia Limpa',
        description: 'Convertendo 720 ton/ano de óleo usado em biocombustível sustentável.',
        image: '/images/vivaterra/hero-bioenergy.jpg',
        href: 'ong/vivaterra/bio-energy',
        tag: 'ENERGIA LIMPA',
        budget: '$537K',
      },
      {
        title: 'Escala Eco-Limpeza',
        subtitle: 'Transforme Resíduos em Limpeza Sustentável',
        description: 'Escalando marcas de limpeza ecológica para 20M de pessoas na Grande SP.',
        image: '/images/vivaterra/hero-bioenergy.jpg',
        href: 'ong/vivaterra/eco-limpeza',
        tag: 'LIMPEZA ECOLÓGICA',
        budget: 'R$ 383K',
      },
      {
        title: 'Tech-Rastreabilidade',
        subtitle: 'Evidências em Blockchain',
        description: 'App gamificado, marketplace, wallet tokenizada e rastreabilidade total.',
        image: '/images/vivaterra/hero-bioenergy.jpg',
        href: 'ong/vivaterra/tech-rastreabilidade',
        tag: 'BLOCKCHAIN & ESG',
        budget: '$184K',
      },
    ],
  },
  {
    name: 'Civic Voices',
    slug: 'civic-voices',
    tagline: 'Ideas that transform societies',
    logo: '🗣️',
    color: '#C41E3A',
    projects: [
      {
        title: 'Participação Cidadã Digital',
        subtitle: 'Amplifique Vozes na Estratégia Fiscal',
        description: 'Plataforma digital para influenciar o County Fiscal Strategy Paper 2026 de Kakamega.',
        image: '/images/vivaterra/hero-bioenergy.jpg',
        href: 'ong/civic-voices/participacao-cidada',
        tag: 'DEMOCRACIA DIGITAL',
        budget: '$125K',
      },
    ],
  },
];

export default function ProjectsHubPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const params = useParams();
  const locale = params.locale || 'pt';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' });

      sectionsRef.current.forEach((section, i) => {
        if (section) {
          gsap.fromTo(
            section.querySelectorAll('.project-card'),
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: 0.3 + i * 0.15, stagger: 0.15, ease: 'power2.out' }
          );
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#1F1F1F] flex flex-col">
      {/* Header */}
      <div ref={headerRef} className="text-center pt-20 pb-8 px-6 lg:pt-28 lg:pb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center">
            <span className="text-white font-serif text-sm">TB</span>
          </div>
          <span className="font-serif text-xs tracking-[0.3em] text-white/60 uppercase">TrustBond</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white uppercase tracking-[0.02em] mb-4">
          Projetos
        </h1>
        <p className="text-lg text-white/60 font-light max-w-2xl mx-auto">
          Escolha um projeto para apoiar. Sua contribuição é transparente, segura e verificada pela TrustBond.
        </p>
      </div>

      {/* ONG Sections */}
      <div className="flex-1 px-6 pb-20 lg:pb-28 max-w-[1400px] mx-auto w-full space-y-16">
        {ongs.map((ong, ongIndex) => (
          <div key={ongIndex} ref={(el) => { sectionsRef.current[ongIndex] = el; }}>
            {/* ONG Header */}
            <div className="flex items-center gap-4 mb-8">
              <div
                className="w-12 h-12 rounded-full border flex items-center justify-center text-lg"
                style={{ borderColor: `${ong.accentColor}50`, color: ong.accentColor }}
              >
                {ong.icon}
              </div>
              <div>
                <h2 className="text-2xl font-serif text-white">{ong.name}</h2>
                <p className="text-sm text-white/40">{ong.subtitle} · {ong.location}</p>
              </div>
              <div className="ml-auto hidden sm:block">
                <span
                  className="text-xs px-3 py-1 rounded-full border"
                  style={{ borderColor: `${ong.accentColor}40`, color: ong.accentColor }}
                >
                  {ong.projects.length} {ong.projects.length === 1 ? 'projeto' : 'projetos'}
                </span>
              </div>
            </div>

            {/* Project Cards */}
            <div className={`grid gap-6 lg:gap-8 ${ong.projects.length === 1 ? 'lg:grid-cols-1 max-w-[700px]' : 'lg:grid-cols-2'}`}>
              {ong.projects.map((project, i) => (
                <Link
                  key={i}
                  href={`/${locale}/${project.href}`}
                  className="project-card group relative rounded-[2rem] overflow-hidden bg-[#2a2a2a] border border-white/5 hover:border-white/15 transition-all duration-500 hover:shadow-2xl flex flex-col"
                  style={{ ['--accent' as string]: ong.accentColor }}
                >
                  {/* Image */}
                  <div className="h-[35vh] lg:h-[40vh] relative overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F] via-transparent to-transparent" />
                    <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full" style={{ backgroundColor: ong.accentColor }}>
                      <span className="text-white text-[10px] tracking-[0.2em] font-medium">{project.tag}</span>
                    </div>
                    <div className="absolute top-6 right-6 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                      <span className="text-white text-xs font-mono">{project.budget}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-10 flex flex-col flex-grow">
                    <h3 className="text-2xl lg:text-3xl font-serif text-white mb-2">{project.subtitle}</h3>
                    <h4 className="text-sm font-medium tracking-wide uppercase mb-4" style={{ color: ong.accentColor }}>
                      {project.title}
                    </h4>
                    <p className="text-white/50 leading-relaxed mb-8">{project.description}</p>
                    <div className="mt-auto flex items-center gap-2 text-white/70 transition-colors" style={{ ['--hover-color' as string]: ong.accentColor }}>
                      <span className="text-sm font-medium group-hover:text-[var(--accent)]">Conhecer projeto</span>
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent)]" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-white/5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-[1400px] mx-auto">
          <span className="text-xs text-white/30">Contribuição transparente e segura – garantia TrustBond.app</span>
          <span className="text-xs text-white/20">© 2026 TrustBond</span>
        </div>
      </footer>
    </main>
  );
}
