import HeroEco from '@/sections/vivaterra-eco/HeroEco';
import WhyEssentialEco from '@/sections/vivaterra-eco/WhyEssentialEco';
import ImpactMetricsEco from '@/sections/vivaterra-eco/ImpactMetricsEco';
import HowItWorksEco from '@/sections/vivaterra-eco/HowItWorksEco';
import DonationValuesEco from '@/sections/vivaterra-eco/DonationValuesEco';
import TransparencyEco from '@/sections/vivaterra-eco/TransparencyEco';
import FAQEco from '@/sections/vivaterra-eco/FAQEco';
import FooterEco from '@/sections/vivaterra-eco/FooterEco';

export const metadata = {
  title: 'VivaTerra — Escala Eco-Limpeza | Trustbond',
  description: 'Escalando marcas de limpeza sustentável para 20 milhões de pessoas na Grande São Paulo. Transforme resíduos em produtos ecológicos.',
};

export default function VivaterraEcoLimpezaPage() {
  return (
    <div className="min-h-screen bg-[#0A1F0A]">
      <main>
        <HeroEco />
        <WhyEssentialEco />
        <ImpactMetricsEco />
        <HowItWorksEco />
        <DonationValuesEco />
        <TransparencyEco />
        <FAQEco />
      </main>
      <FooterEco />
    </div>
  );
}
