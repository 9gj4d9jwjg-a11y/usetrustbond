import HeroVT from '@/sections/vivaterra/HeroVT';
import WhyEssentialVT from '@/sections/vivaterra/WhyEssentialVT';
import ImpactMetricsVT from '@/sections/vivaterra/ImpactMetricsVT';
import HowItWorksVT from '@/sections/vivaterra/HowItWorksVT';
import TestimonialVT from '@/sections/vivaterra/TestimonialVT';
import DonationValuesVT from '@/sections/vivaterra/DonationValuesVT';
import TransparencyVT from '@/sections/vivaterra/TransparencyVT';
import FAQVT from '@/sections/vivaterra/FAQVT';
import FooterVT from '@/sections/vivaterra/FooterVT';

export const metadata = {
  title: 'VivaTerra — Bio-Energy: Transforme Resíduos em Energia Limpa',
  description: 'Projeto de transformação de óleo de cozinha usado em biocombustível e energia limpa. Contribuição transparente e segura via TrustBond.',
};

export default function VivaterraBioEnergyPage() {
  return (
    <div className="min-h-screen bg-[#0A1F0A]">
      <main>
        <HeroVT />
        <WhyEssentialVT />
        <ImpactMetricsVT />
        <HowItWorksVT />
        <TestimonialVT />
        <DonationValuesVT />
        <TransparencyVT />
        <FAQVT />
      </main>
      <FooterVT />
    </div>
  );
}
