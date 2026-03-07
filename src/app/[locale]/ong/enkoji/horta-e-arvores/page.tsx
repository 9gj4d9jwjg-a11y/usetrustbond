import HeroSection from '@/sections/HeroSection';
import ManifestoSection from '@/sections/ManifestoSection';
import TransparencySection from '@/sections/TransparencySection';
import LeaderSection from '@/sections/LeaderSection';
import ExperienceSection from '@/sections/ExperienceSection';
import ClosingCTASection from '@/sections/ClosingCTASection';
import Navbar from '@/components/Navbar';

export default function HortaEArvoresPage() {
  return (
    <main className="min-h-screen bg-[#F6F5F0]">
      <Navbar />
      <HeroSection />
      <ManifestoSection />
      <LeaderSection />
      <ExperienceSection />
      <TransparencySection />
      <ClosingCTASection />
    </main>
  );
}
