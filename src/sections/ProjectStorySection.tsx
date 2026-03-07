"use client";

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectStorySectionProps {
  className?: string;
}

const ProjectStorySection = ({ className = '' }: ProjectStorySectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
        }
      );

      // Cards Animation
      [card1Ref, card2Ref, card3Ref].forEach((ref, i) => {
        gsap.fromTo(
          ref.current,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const cards = [
    {
      ref: card1Ref,
      label: 'ANTES',
      metric: '0',
      unit: 'm² produtivos',
      desc: 'Área em descanso. Solo esperando.',
      image: '/story_before.jpg',
    },
    {
      ref: card2Ref,
      label: 'DURANTE',
      metric: '12',
      unit: 'mutirões/ano',
      desc: 'Mãos no solo, prática em pé.',
      image: '/story_during.jpg',
    },
    {
      ref: card3Ref,
      label: 'DEPOIS',
      metric: '80–150',
      unit: 'm² cultivados',
      desc: 'Alimentos, sombra e continuidade.',
      image: '/story_after.jpg',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`bg-[#F6F5F0] py-24 lg:py-32 ${className}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-[6vw]">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-24">
          <span className="eyebrow block mb-3">O Projeto</span>
          <h2 className="text-3xl lg:text-5xl font-serif text-[#1F1F1F] uppercase tracking-[0.02em]">
            Do terreno à mesa
          </h2>
        </div>

        {/* Cards Row */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[2.2vw] w-full">
          {cards.map((card, index) => (
            <div
              key={index}
              ref={card.ref}
              className="card-enkoji overflow-hidden relative w-full h-[50vh] lg:h-[70vh] group"
            >
              <div className="absolute inset-0">
                <img
                  src={card.image}
                  alt={card.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/30" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-between text-white">
                {/* Top: Label */}
                <div>
                  <span className="font-mono text-xs tracking-[0.2em] opacity-80">
                    {card.label}
                  </span>
                </div>

                {/* Middle: Metric */}
                <div className="text-center">
                  <span className="text-7xl lg:text-9xl font-serif text-white drop-shadow-2xl">
                    {card.metric}
                  </span>
                  <p className="text-sm mt-2 opacity-90">{card.unit}</p>
                </div>

                {/* Bottom: Description */}
                <div>
                  <p className="text-sm opacity-80 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectStorySection;
