import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'O projeto', href: '#projeto' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Impacto', href: '#impacto' },
  { label: 'FAQ', href: '#faq' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled
            ? 'w-[90%] max-w-4xl'
            : 'w-[95%] max-w-6xl'
        }`}
      >
        <div
          className={`flex items-center justify-between px-4 md:px-6 py-3 rounded-full transition-all duration-500 ${
            isScrolled
              ? 'bg-dark-green/90 backdrop-blur-xl shadow-lg border border-forest/30'
              : 'bg-transparent'
          }`}
        >
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 text-white font-display font-semibold text-lg hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-forest flex items-center justify-center">
              <Leaf className="w-4 h-4 text-mint" />
            </div>
            <span className="hidden sm:inline">Bio-Energy</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="relative px-4 py-2 text-sm text-white/80 hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-px bg-mint scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-2">
            <Button
              className="hidden sm:flex bg-forest hover:bg-mint text-white hover:text-dark-green rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 hover:shadow-glow"
            >
              <span className="mr-1.5">🌱</span>
              Doar agora
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-dark-green/98 backdrop-blur-xl transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-2xl font-display text-white/80 hover:text-white transition-colors"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {link.label}
            </button>
          ))}
          <Button
            className="mt-4 bg-forest hover:bg-mint text-white hover:text-dark-green rounded-full px-8 py-3 text-lg font-medium transition-all duration-300"
          >
            <span className="mr-2">🌱</span>
            Doar agora
          </Button>
        </div>
      </div>
    </>
  );
}
