"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { TRUSTBOND_PROJECTS } from '@/config/projects';

gsap.registerPlugin(ScrollTrigger);

export interface FooterCivicProps {
  cta: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    buttonPrimary: string;
    buttonSecondary: string;
    trustText: string;
  };
  footer: {
    brand: {
      initials: string;
      name: string;
      slogan: string;
      description: string;
    };
    links: { label: string; href: string }[];
    contact: string[];
    copyright: string;
    poweredByPrefix: string;
    poweredBy: string;
  };
  className?: string;
}

export default function FooterCivic({ 
  cta,
  footer,
  className = '' 
}: FooterCivicProps) {
  const t = useTranslations('FooterCivic');
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: sectionRef.current, start: 'top 80%', onEnter: () => {
        gsap.fromTo(ctaRef.current?.querySelectorAll('.anim') || [], { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' });
      }, once: true });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      {/* CTA Section */}
      <div ref={ctaRef} className="relative py-24 lg:py-32" style={{ background: 'linear-gradient(135deg, #C41E3A 0%, #8B0000 100%)' }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center text-white">
          <h2 className="anim text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {cta.title} <span className="text-[#FFD700]">{cta.titleHighlight}</span>
          </h2>
          <p className="anim text-xl text-gray-100 mb-10 max-w-2xl mx-auto">
            {cta.subtitle}
          </p>
          <div className="anim flex flex-col sm:flex-row gap-4 justify-center">
            <a href={TRUSTBOND_PROJECTS.HOME} target="_blank" rel="noopener noreferrer"
              className="bg-[#FFD700] hover:bg-yellow-300 text-[#1a1a1a] font-bold rounded-xl px-10 py-5 text-lg transition-all duration-300 shadow-xl inline-flex items-center gap-2 group">
              {cta.buttonPrimary} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="border-2 border-white text-white hover:bg-white hover:text-[#C41E3A] font-bold rounded-xl px-10 py-5 text-lg transition-all duration-300">
              {cta.buttonSecondary}
            </button>
          </div>
          <p className="anim mt-8 text-sm text-gray-300">{cta.trustText}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#1a1a1a] text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#C41E3A] flex items-center justify-center text-white font-bold text-sm">
                  {footer.brand.initials}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{footer.brand.name}</h3>
                  <p className="text-xs text-gray-400">{footer.brand.slogan}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {footer.brand.description}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">{t('quickLinks')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {footer.links.map((link, i) => (
                  <li key={i}><a href={link.href} className="hover:text-white transition">{link.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">{t('contact')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {footer.contact.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs">{footer.copyright}</p>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs">{footer.poweredByPrefix}</span>
              <span className="text-[#FFD700] font-semibold text-sm">{footer.poweredBy}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
