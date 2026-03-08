import { getProjectSections } from '@/lib/services/projectService';
import HeroSection from '@/sections/HeroSection';
import IntermediateCTA from '@/sections/IntermediateCTA';
import ClosingCTASection from '@/sections/ClosingCTASection';

export const dynamic = 'force-dynamic';

export default async function ProjectsHubPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  
  // UUID do projeto Enkoji no Supabase
  const projectId = 'ce326f59-e932-11ef-93a8-0242ac110002'; // Enkoji Project UUID
  const sections = await getProjectSections(projectId, locale);

  const renderSection = (section: any) => {
    switch (section.template_name) {
      case 'HeroSection':
        return <HeroSection key={section.id} {...section.content} />;
      case 'IntermediateCTA':
        return <IntermediateCTA key={section.id} {...section.content} />;
      case 'ClosingCTASection':
        return <ClosingCTASection key={section.id} {...section.content} />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#1F1F1F] flex flex-col pt-32">
      <div className="flex-1 px-6 pb-20 lg:pb-28 max-w-[1400px] mx-auto w-full space-y-16">
        {sections.length > 0 ? (
          sections.map(renderSection)
        ) : (
          <div className="min-h-screen flex items-center justify-center text-gray-400">
            <p>Carregando conteúdo dinâmico do projeto...</p>
          </div>
        )}
      </div>
    </main>
  );
}
