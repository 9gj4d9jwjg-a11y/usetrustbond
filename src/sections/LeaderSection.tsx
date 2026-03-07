"use client";

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LeaderSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="bg-[#D9DECD] min-h-[80vh] flex flex-col lg:flex-row overflow-hidden"
    >
      {/* Text Side */}
      <div 
        ref={textRef}
        className="w-full lg:w-[45%] p-12 lg:p-24 flex flex-col justify-center"
      >
        <div className="mb-12">
          <img 
            src="/images/enkoji/logo_enkoji_brush.png" 
            alt="Logo Enkoji" 
            className="h-16 w-auto mb-8 opacity-80"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <h2 className="text-3xl lg:text-4xl font-serif text-[#1F1F1F] leading-tight mb-8">
            direção pautada em <br />
            <span className="italic">clareza e simplicidade.</span>
          </h2>
          
          <div className="space-y-6 text-[#4A4A4A] leading-relaxed text-lg">
            <p>
              <span className="font-bold text-[#1F1F1F]">Monge Koho (Marcos Lopes)</span> - educador, musicoterapeuta e facilitador em meditação e práticas integrativas, conduz o Enkoji com uma <span className="font-bold">visão contemporânea e acessível do zen</span>; como caminho de equilíbrio, arte e conexão com a natureza.
            </p>
            <p>
              Sob sua direção, o templo ampliou suas ações, tornando-se referência em turismo sustentável e bem-estar.
            </p>
          </div>
        </div>
      </div>

      {/* Image Side */}
      <div 
        ref={imageRef}
        className="w-full lg:w-[55%] relative min-h-[50vh] lg:min-h-0"
      >
        <img 
          src="/images/enkoji/monk_koho_slide.png" 
          alt="Monge Koho no Templo Enkoji"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default LeaderSection;
