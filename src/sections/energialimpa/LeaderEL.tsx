"use client";

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LeaderEL = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current, { x: -50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
      });
      gsap.fromTo(imageRef.current, { x: 50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#D9DECD] min-h-[80vh] flex flex-col lg:flex-row overflow-hidden">
      <div ref={textRef} className="w-full lg:w-[45%] p-12 lg:p-24 flex flex-col justify-center">
        <div className="mb-12">
          <blockquote className="text-2xl lg:text-3xl font-serif text-[#1F1F1F] leading-relaxed mb-8 italic">
            &ldquo;Cuidar do telhado é cuidar do Dharma. Cada gota que não entra é uma mente que pode permanecer em paz.&rdquo;
          </blockquote>

          <div className="space-y-6 text-[#4A4A4A] leading-relaxed text-lg">
            <p>
              <span className="font-bold text-[#1F1F1F]">Monge Kōhō (Marcos Lopes)</span> – educador, musicoterapeuta e facilitador em meditação e práticas integrativas, conduz o Enkoji com uma <span className="font-bold">visão contemporânea e acessível do Zen</span>; como caminho de equilíbrio, arte e conexão com a natureza.
            </p>
            <p>
              Sob sua direção, o templo ampliou suas ações, tornando-se referência em turismo sustentável, bem-estar e projetos comunitários alinhados aos Objetivos de Desenvolvimento Sustentável da ONU.
            </p>
          </div>
        </div>
      </div>

      <div ref={imageRef} className="w-full lg:w-[55%] relative min-h-[50vh] lg:min-h-0">
        <img
          src="/images/enkoji/monk_handpan.jpg"
          alt="Monge Kōhō tocando handpan no Templo Enkoji"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default LeaderEL;
