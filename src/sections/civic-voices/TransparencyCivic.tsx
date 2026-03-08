"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, ClipboardCheck, ArrowRightCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stepStyles = [
  { icon: Shield, color: 'bg-[#C41E3A]', iconColor: 'text-white' },
  { icon: ClipboardCheck, color: 'bg-[#FFD700]', iconColor: 'text-[#1a1a1a]' },
  { icon: ArrowRightCircle, color: 'bg-green-600', iconColor: 'text-white' },
];

export interface TransparencyCivicProps {
  title: string;
  titleHighlight: string;
  subtitle: string;
  steps: {
    title: string;
    description: string;
  }[];
  systemStatus: {
    title: string;
    subtitle: string;
    score: string;
    scoreLabel: string;
    buttonText: string;
    buttonLink?: string;
  };
  className?: string;
}

export default function TransparencyCivic({ 
  title,
  titleHighlight,
  subtitle,
  steps,
  systemStatus,
  className = '' 
}: TransparencyCivicProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: sectionRef.current, start: 'top 70%', onEnter: () => {
        gsap.fromTo(contentRef.current?.querySelectorAll('.anim') || [], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out' });
      }, once: true });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="transparencia" ref={sectionRef} className={`relative py-24 lg:py-32 overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(to bottom right, #1a1a1a, #111827)' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8" ref={contentRef}>
        <div className="text-center mb-16">
          <h2 className="anim text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{title} <span className="text-[#FFD700]">{titleHighlight}</span></h2>
          <p className="anim text-xl text-gray-400">{subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((s, i) => {
            const style = stepStyles[i % stepStyles.length];
            const Icon = style.icon;
            return (
              <div key={i} className="anim text-center group">
                <div className={`w-20 h-20 ${style.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-10 h-10 ${style.iconColor || 'text-white'}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-gray-400">{s.description}</p>
              </div>
            );
          })}
        </div>
        <div className="anim bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{systemStatus.title}</h3>
              <p className="text-gray-400">{systemStatus.subtitle}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-3xl font-bold text-[#FFD700]">{systemStatus.score}</div>
                <div className="text-sm text-gray-400">{systemStatus.scoreLabel}</div>
              </div>
              <a href={systemStatus.buttonLink || '#'} className="bg-[#C41E3A] hover:bg-[#8B0000] text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                {systemStatus.buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
