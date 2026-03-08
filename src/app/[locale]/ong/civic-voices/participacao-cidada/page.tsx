import { getProjectSections } from '@/lib/services/projectService';
import HeroCivic from '@/sections/civic-voices/HeroCivic';
import WhyEssentialCivic from '@/sections/civic-voices/WhyEssentialCivic';
import ImpactMetricsCivic from '@/sections/civic-voices/ImpactMetricsCivic';
import HowItWorksCivic from '@/sections/civic-voices/HowItWorksCivic';
import DonationValuesCivic from '@/sections/civic-voices/DonationValuesCivic';
import TransparencyCivic from '@/sections/civic-voices/TransparencyCivic';
import FAQCivic from '@/sections/civic-voices/FAQCivic';
import FooterCivic from '@/sections/civic-voices/FooterCivic';
import Navigation from '@/components/Navigation';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Civic Voices — Participação Cidadã Digital | Trustbond',
  description: 'Plataforma digital de participação cidadã para influenciar o County Fiscal Strategy Paper 2026 de Kakamega.',
};

export default async function CivicVoicesParticipacaoPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  
  // UUID do projeto Civic Voices no Supabase
  const projectId = 'fb79d1bd-efe1-4086-81a0-d1686cdb3b5f';
  const sections = await getProjectSections(projectId, locale);

  // Mapeamento de templates para componentes
  const renderSection = (section: any) => {
    switch (section.template_name) {
      case 'HeroCivic':
        return <HeroCivic key={section.id} {...section.content} />;
      case 'WhyEssentialCivic':
        return <WhyEssentialCivic key={section.id} {...section.content} />;
      case 'ImpactMetricsCivic':
        return <ImpactMetricsCivic key={section.id} {...section.content} />;
      case 'HowItWorksCivic':
        return <HowItWorksCivic key={section.id} {...section.content} />;
      case 'DonationValuesCivic':
        return <DonationValuesCivic key={section.id} {...section.content} />;
      case 'TransparencyCivic':
        return <TransparencyCivic key={section.id} {...section.content} />;
      case 'FAQCivic':
        return <FAQCivic key={section.id} {...section.content} />;
      case 'FooterCivic':
        return <FooterCivic key={section.id} {...section.content} />;
      default:
        return null; // Fallback se o template não existir
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main>
        {sections.length > 0 ? (
          sections.map(renderSection)
        ) : (
          <div className="min-h-screen flex items-center justify-center text-gray-400">
            <p>Carregando conteúdo dinâmico do projeto...</p>
          </div>
        )}
      </main>
    </div>
  );
}
