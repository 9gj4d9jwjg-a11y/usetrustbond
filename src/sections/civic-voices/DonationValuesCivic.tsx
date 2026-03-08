"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { TRUSTBOND_PROJECTS } from '@/config/projects';

gsap.registerPlugin(ScrollTrigger);

export interface DonationValuesCivicProps {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  tiers: {
    label: string;
    value: string;
    impact: string;
    features: string[];
    highlight: boolean;
    badge: string | null;
  }[];
  multiplierText: string;
  className?: string;
}

export default function DonationValuesCivic({ 
  badge,
  title,
  titleHighlight,
  subtitle,
  tiers,
  multiplierText,
  className = '' 
}: DonationValuesCivicProps) {
  const t = useTranslations('DonationValuesCivic');
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: sectionRef.current, start: 'top 75%', onEnter: () => {
        gsap.fromTo(cardsRef.current?.children || [], { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' });
      }, once: true });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`relative py-24 lg:py-32 bg-white ${className}`}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C41E3A]/10 border border-[#C41E3A]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#C41E3A]" /><span className="text-sm text-[#C41E3A] font-medium">{badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">{title} <span className="text-[#C41E3A]">{titleHighlight}</span></h2>
          <p className="text-[#6B7280] text-lg max-w-3xl mx-auto">{subtitle}</p>
        </div>
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => (
            <div key={i} className={`relative group ${tier.highlight ? 'md:-mt-4 md:mb-4' : ''}`}
              onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top }); setHoveredCard(i); }}
              onMouseLeave={() => setHoveredCard(null)}>
              {tier.badge && <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"><span className="px-4 py-1 rounded-full bg-[#FFD700] text-[#1a1a1a] text-xs font-bold">{tier.badge}</span></div>}
              <div className={`relative h-full rounded-3xl border-2 overflow-hidden transition-all duration-500 ${tier.highlight ? 'bg-gradient-to-b from-[#C41E3A] to-[#8B0000] text-white border-[#C41E3A] shadow-2xl' : 'bg-white border-gray-200 hover:border-[#C41E3A] text-[#1a1a1a]'}`}>
                {hoveredCard === i && !tier.highlight && <div className="absolute w-64 h-64 rounded-full bg-[#C41E3A]/5 blur-3xl pointer-events-none" style={{ left: mousePos.x - 128, top: mousePos.y - 128 }} />}
                <div className="relative p-8 flex flex-col h-full">
                  <div className="text-center mb-6">
                    <div className={`text-4xl sm:text-5xl font-bold mb-2 ${tier.highlight ? 'text-white' : ''}`}>{tier.value}</div>
                    <p className={`${tier.highlight ? 'text-gray-200' : 'text-[#6B7280]'}`}>{tier.impact}</p>
                  </div>
                  <div className={`border-t ${tier.highlight ? 'border-white/30' : 'border-gray-200'} pt-6 mb-8 flex-1`}>
                    <p className={`font-semibold mb-4 ${tier.highlight ? '' : 'text-[#1a1a1a]'}`}>{t('directImpact')}:</p>
                    <ul className="space-y-3">
                      {tier.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${tier.highlight ? 'bg-[#FFD700]/30' : 'bg-[#FFD700]/20'}`}>
                            <Check className={`w-3 h-3 ${tier.highlight ? 'text-[#FFD700]' : 'text-[#DAA520]'}`} />
                          </div>
                          <span className={`text-sm ${tier.highlight ? 'text-gray-100' : 'text-[#6B7280]'}`}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a href={TRUSTBOND_PROJECTS.HOME} target="_blank" rel="noopener noreferrer"
                    className={`block w-full text-center rounded-xl py-4 font-semibold transition-all duration-300 mt-auto ${tier.highlight ? 'bg-[#FFD700] text-[#1a1a1a] hover:bg-yellow-300' : 'bg-gray-100 text-[#1a1a1a] hover:bg-gray-200'}`}>
                    {t('donate')} {tier.value}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-6 py-3">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-semibold text-sm">{multiplierText}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
