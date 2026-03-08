"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UserPlus, MessagesSquare, TrendingUp, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stepStyles = [
  { icon: UserPlus, color: 'bg-[#C41E3A]', textColor: 'text-white' },
  { icon: MessagesSquare, color: 'bg-[#FFD700]', textColor: 'text-[#1a1a1a]' },
  { icon: TrendingUp, color: 'bg-green-600', textColor: 'text-white' },
];

export interface HowItWorksCivicProps {
  title: string;
  titleHighlight: string;
  subtitle: string;
  steps: {
    title: string;
    description: string;
    details: string[];
  }[];
  className?: string;
}

export default function HowItWorksCivic({ 
  title,
  titleHighlight,
  subtitle,
  steps,
  className = '' 
}: HowItWorksCivicProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: stepsRef.current, start: 'top 75%', onEnter: () => {
        gsap.fromTo(stepsRef.current?.querySelectorAll('.step-card') || [], { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' });
      }, once: true });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`relative py-24 lg:py-32 bg-[#F3F4F6] ${className}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">{title} <span className="text-[#C41E3A]">{titleHighlight}</span></h2>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">{subtitle}</p>
        </div>
        <div ref={stepsRef} className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const style = stepStyles[i % stepStyles.length];
            const Icon = style.icon;
            return (
              <div key={i} className="step-card group">
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-all duration-500 h-full border border-gray-100">
                  <div className={`w-16 h-16 ${style.color} rounded-full flex items-center justify-center ${style.textColor} text-2xl font-bold mb-6 group-hover:scale-110 transition-transform`}>
                    {i + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">{step.title}</h3>
                  <p className="text-[#6B7280] leading-relaxed mb-6">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((d, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-[#6B7280]">
                        <CheckCircle className="w-4 h-4 text-[#FFD700] flex-shrink-0" />{d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
