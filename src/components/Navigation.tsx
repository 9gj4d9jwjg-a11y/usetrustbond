"use client";

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { TRUSTBOND_PROJECTS } from '@/config/projects';

const Navigation = () => {
  const t = useTranslations('Navigation');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('project'), href: '#manifesto' },
    { label: t('howItWorks'), href: '#transparency' },
    { label: t('impact'), href: '#impact' },
    { label: t('faq'), href: '#faq' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F6F5F0]/95 backdrop-blur-sm py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3"
          >
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center backdrop-blur-sm transition-colors ${
              isScrolled ? 'border-[#1F1F1F]/20 bg-[#1F1F1F]/5' : 'border-white/40 bg-white/10'
            }`}>
              <span className={isScrolled ? 'text-[#1F1F1F] text-sm' : 'text-white text-sm'}>T</span>
            </div>
            <span className={`font-serif text-lg tracking-widest transition-colors ${
              isScrolled ? 'text-[#1F1F1F]' : 'text-white'
            }`}>
              TRUSTBOND
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm tracking-wide transition-colors hover:opacity-70 ${
                  isScrolled ? 'text-[#1F1F1F]' : 'text-white'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Sticky CTA */}
            <a
              href={TRUSTBOND_PROJECTS.HOME}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-500 flex items-center justify-center ${
                isScrolled
                  ? 'bg-[#4A5D23] text-white shadow-lg hover:bg-[#3d4e1c] scale-100 opacity-100'
                  : 'bg-white/20 text-white backdrop-blur-sm border border-white/30 hover:bg-white/30 scale-95 opacity-90'
              }`}
            >
              {t('donateNow')}
            </a>
            
            <div className={`pl-4 border-l transition-colors ${isScrolled ? 'border-black/20 text-[#1F1F1F]' : 'border-white/20 text-white'}`}>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? 'text-[#1F1F1F]' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[99] bg-[#F6F5F0] transition-transform duration-500 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-2xl font-serif text-[#1F1F1F] tracking-wide"
            >
              {link.label}
            </button>
          ))}
          
          <div className="mt-8 pt-8 border-t border-black/10 w-32 flex justify-center">
             <div className="[&>div]:text-[#1F1F1F]">
                <LanguageSwitcher />
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
