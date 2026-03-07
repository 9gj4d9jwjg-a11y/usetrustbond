import HeroSection from '@/sections/HeroSection';
import ManifestoSection from '@/sections/ManifestoSection';
import TransparencySection from '@/sections/TransparencySection';
import LeaderSection from '@/sections/LeaderSection';
import ExperienceSection from '@/sections/ExperienceSection';
import ImpactSection from '@/sections/ImpactSection';
import IntermediateCTA from '@/sections/IntermediateCTA';
import FAQSection from '@/sections/FAQSection';
import ClosingCTASection from '@/sections/ClosingCTASection';
import Navigation from '@/components/Navigation';

export default function HortaEArvoresPage() {
  return (
    <main className="min-h-screen bg-[#F6F5F0]">
      <Navigation />
      <HeroSection />
      <ManifestoSection />
      <LeaderSection />
      <ExperienceSection />
      <ImpactSection />
      <IntermediateCTA />
      <FAQSection />
      <TransparencySection />
      <ClosingCTASection />
    </main>
  );
}
