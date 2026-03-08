"use client";

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { TRUSTBOND_PROJECTS } from '@/config/projects';

gsap.registerPlugin(ScrollTrigger);

const IntermediateCTA = () => {
  const t = useTranslations('IntermediateCTA');
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-[#4A5D23] py-16 lg:py-20 relative overflow-hidden"
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <Heart size={32} className="text-white/60 mx-auto mb-6" strokeWidth={1.5} />
        
        <p className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white leading-relaxed mb-8">
          {t('title')}
        </p>
        
        <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
          {t('subtitle')}
        </p>

        <a 
          href={TRUSTBOND_PROJECTS.HORTA.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-[#4A5D23] px-10 py-4 rounded-full text-lg font-medium hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center gap-3"
        >
          {t('donateButton')}
        </a>
      </div>
    </div>
  );
};

export default IntermediateCTA;
