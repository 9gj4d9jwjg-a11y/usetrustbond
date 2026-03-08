import HeroCivic from '@/sections/civic-voices/HeroCivic';
import WhyEssentialCivic from '@/sections/civic-voices/WhyEssentialCivic';
import ImpactMetricsCivic from '@/sections/civic-voices/ImpactMetricsCivic';
import HowItWorksCivic from '@/sections/civic-voices/HowItWorksCivic';
import DonationValuesCivic from '@/sections/civic-voices/DonationValuesCivic';
import TransparencyCivic from '@/sections/civic-voices/TransparencyCivic';
import FAQCivic from '@/sections/civic-voices/FAQCivic';
import FooterCivic from '@/sections/civic-voices/FooterCivic';

export const metadata = {
  title: 'Civic Voices — Participação Cidadã Digital | Trustbond',
  description: 'Plataforma digital de participação cidadã para influenciar o County Fiscal Strategy Paper 2026 de Kakamega.',
};

export default function CivicVoicesParticipacaoPage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroCivic />
        <WhyEssentialCivic />
        <ImpactMetricsCivic />
        <HowItWorksCivic />
        <DonationValuesCivic />
        <TransparencyCivic />
        <FAQCivic />
      </main>
      <FooterCivic />
    </div>
  );
}
