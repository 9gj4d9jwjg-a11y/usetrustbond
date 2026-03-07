"use client";

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const activities = [
    {
      title: "Cultura",
      subtitle: "Pintar ao ar livre para transformar paisagem em expressão.",
      desc: 'Pintura ao vivo no templo "plein air", transformando paisagem em expressão. Interação direta entre artista e ambiente.',
      image: "/images/enkoji/painting_slide.png",
      tag: "CULTURA"
    },
    {
      title: "Prática",
      subtitle: "Meditação e conexão em meio à natureza.",
      desc: "Retiros e vivências em grupo que buscam o equilíbrio através do silêncio e da presença consciente.",
      image: "/images/enkoji/meditation_group.png",
      tag: "MEDITAÇÃO"
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.exp-card').forEach((card: any, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="bg-[#F6F5F0] py-24 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-[6vw]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {activities.map((act, i) => (
            <div key={i} className="exp-card flex flex-col bg-[#D9DECD]/30 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500">
              {/* Image */}
              <div className="h-[40vh] lg:h-[50vh] relative overflow-hidden group">
                <img 
                  src={act.image} 
                  alt={act.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-[#1F1F1F] rounded-full">
                  <span className="text-white text-[10px] tracking-[0.2em] font-medium">{act.tag}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col flex-grow">
                <h3 className="text-2xl lg:text-3xl font-serif text-[#1F1F1F] mb-4">
                  {act.subtitle}
                </h3>
                <p className="text-[#6E6E6E] leading-relaxed text-lg mb-8">
                  {act.desc}
                </p>
                <div className="mt-auto">
                  <div className="hairline mb-4 opacity-30" />
                  <span className="font-serif italic text-[#4A5D23]">Experiência Enkoji</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
