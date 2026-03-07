"use client";

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface GallerySectionProps {
  className?: string;
}

const GallerySection = ({ className = '' }: GallerySectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const galleryItems = [
    {
      image: '/gallery_1.jpg',
      caption: 'Zazen no zendo',
      quote: 'Sentar-se em silêncio é a própria iluminação.',
    },
    {
      image: '/gallery_2.jpg',
      caption: 'Mãos no solo',
      quote: 'A terra não mente. O solo revela o cuidado.',
    },
    {
      image: '/gallery_3.jpg',
      caption: 'Mudas de árvores nativas',
      quote: 'Cada raiz que desce é uma promessa para o futuro.',
    },
    {
      image: '/gallery_4.jpg',
      caption: 'Compostagem',
      quote: 'O que cai retorna. Nada se perde, tudo se transforma.',
    },
    {
      image: '/gallery_5.jpg',
      caption: 'Refeição comunitária',
      quote: 'Comer em silêncio é agradecer com o corpo.',
    },
    {
      image: '/gallery_6.jpg',
      caption: 'Crianças no mutirão',
      quote: 'Ensinar uma criança a plantar é ensinar a esperar.',
    },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Carousel cards animation
      const cards = carouselRef.current?.querySelectorAll('.gallery-card');
      cards?.forEach((card) => {
        gsap.fromTo(
          card,
          { x: '8vw', opacity: 0, scale: 0.98 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-[#F6F5F0] py-20 lg:py-28 ${className}`}
    >
      {/* Header */}
      <div ref={headerRef} className="text-center mb-12 lg:mb-16 px-6">
        <span className="eyebrow block mb-3">Galeria</span>
        <h2 className="text-3xl lg:text-4xl font-serif text-[#1F1F1F] uppercase tracking-[0.02em]">
          O espírito da prática
        </h2>
      </div>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex gap-4 lg:gap-[2.2vw] overflow-x-auto scrollbar-hide px-6 lg:px-[6vw] pb-4 snap-x snap-mandatory"
      >
        {galleryItems.map((item, index) => (
          <div
            key={index}
            className="gallery-card flex-shrink-0 w-[72vw] lg:w-[60vw] max-w-[800px] h-[40vh] lg:h-[46vh] rounded-[28px] overflow-hidden relative snap-center group"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="image-overlay" />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <div className="flex items-start gap-3">
                <Quote
                  size={20}
                  className="text-[#4A5D23] flex-shrink-0 mt-1"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-white text-lg lg:text-xl font-serif mb-1">
                    {item.caption}
                  </p>
                  <p className="text-white/70 text-sm italic">
                    "{item.quote}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Hint */}
      <div className="text-center mt-6">
        <p className="text-xs text-[#6E6E6E]">Deslize para ver mais</p>
      </div>
    </section>
  );
};

export default GallerySection;
