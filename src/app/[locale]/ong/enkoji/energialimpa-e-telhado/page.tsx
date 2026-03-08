import HeroEL from '@/sections/energialimpa/HeroEL';
import ManifestoEL from '@/sections/energialimpa/ManifestoEL';
import TransparencyEL from '@/sections/energialimpa/TransparencyEL';
import LeaderEL from '@/sections/energialimpa/LeaderEL';
import ExperienceEL from '@/sections/energialimpa/ExperienceEL';
import ImpactEL from '@/sections/energialimpa/ImpactEL';
import IntermediateCTAEL from '@/sections/energialimpa/IntermediateCTAEL';
import FAQEL from '@/sections/energialimpa/FAQEL';
import ClosingCTAEL from '@/sections/energialimpa/ClosingCTAEL';
import Navigation from '@/components/Navigation';

export default function EnergiaLimpaETelhadoPage() {
  return (
    <main className="min-h-screen bg-[#F6F5F0]">
      <Navigation />
      <HeroEL />
      <ManifestoEL />
      <LeaderEL />
      <ExperienceEL />
      <ImpactEL />
      <IntermediateCTAEL />
      <FAQEL />
      <TransparencyEL />
      <ClosingCTAEL />
    </main>
  );
}
