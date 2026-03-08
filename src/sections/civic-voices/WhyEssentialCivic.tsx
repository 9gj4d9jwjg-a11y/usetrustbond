"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, Zap, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface WhyEssentialCivicProps {
  title: string;
  titleHighlight: string;
  description: string;
  cards: {
    challenge: { title: string; description: string; };
    solution: { title: string; badge: string; description: string; };
    impact: { title: string; description: string; };
  };
  className?: string;
}

export default function WhyEssentialCivic({ 
  title,
  titleHighlight,
  description,
  cards,
  className = '' 
}: WhyEssentialCivicProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: sectionRef.current, start: 'top 80%', onEnter: () => {
        gsap.fromTo(contentRef.current?.querySelectorAll('.reveal') || [], { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' });
      }, once: true });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projeto" ref={sectionRef} className={`relative py-24 lg:py-32 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8" ref={contentRef}>
        <div className="text-center mb-16">
          <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
            {title} <span className="text-[#C41E3A]">{titleHighlight}</span>
          </h2>
          <p className="reveal text-xl text-[#6B7280] max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="reveal p-8 rounded-3xl bg-gradient-to-br from-red-50 to-white border-2 border-[#C41E3A]/20 hover:-translate-y-2 transition-all duration-500 group">
            <div className="w-14 h-14 rounded-xl bg-[#C41E3A] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{cards.challenge.title}</h3>
            <p className="text-[#6B7280] leading-relaxed">{cards.challenge.description}</p>
          </div>

          <div className="reveal p-8 rounded-3xl bg-gradient-to-br from-yellow-50 to-white border-2 border-[#FFD700]/40 hover:-translate-y-2 transition-all duration-500 relative group">
            <div className="absolute -top-3 right-6 bg-[#C41E3A] text-white text-xs px-4 py-1 rounded-full font-semibold">{cards.solution.badge}</div>
            <div className="w-14 h-14 rounded-xl bg-[#FFD700] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7 text-[#1a1a1a]" />
            </div>
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{cards.solution.title}</h3>
            <p className="text-[#6B7280] leading-relaxed">{cards.solution.description}</p>
          </div>

          <div className="reveal p-8 rounded-3xl bg-gradient-to-br from-green-50 to-white border-2 border-green-500/30 hover:-translate-y-2 transition-all duration-500 group">
            <div className="w-14 h-14 rounded-xl bg-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{cards.impact.title}</h3>
            <p className="text-[#6B7280] leading-relaxed">{cards.impact.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
