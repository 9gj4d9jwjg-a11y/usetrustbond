import HeroTech from '@/sections/vivaterra-tech/HeroTech';
import WhyEssentialTech from '@/sections/vivaterra-tech/WhyEssentialTech';
import ImpactMetricsTech from '@/sections/vivaterra-tech/ImpactMetricsTech';
import HowItWorksTech from '@/sections/vivaterra-tech/HowItWorksTech';
import DonationValuesTech from '@/sections/vivaterra-tech/DonationValuesTech';
import TransparencyTech from '@/sections/vivaterra-tech/TransparencyTech';
import FAQTech from '@/sections/vivaterra-tech/FAQTech';
import FooterTech from '@/sections/vivaterra-tech/FooterTech';

export const metadata = {
  title: 'VivaTerra — Tech-Rastreabilidade | Trustbond',
  description: 'Substituindo promessas por evidências em blockchain. App gamificado, marketplace, wallet tokenizada e rastreabilidade total para a economia circular.',
};

export default function VivaterraTechPage() {
  return (
    <div className="min-h-screen bg-[#0A1F0A]">
      <main>
        <HeroTech />
        <WhyEssentialTech />
        <ImpactMetricsTech />
        <HowItWorksTech />
        <DonationValuesTech />
        <TransparencyTech />
        <FAQTech />
      </main>
      <FooterTech />
    </div>
  );
}
