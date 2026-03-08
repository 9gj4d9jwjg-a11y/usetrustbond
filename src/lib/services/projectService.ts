export interface SectionData {
  id: string;
  template_name: string;
  order_index: number;
  config: Record<string, any>;
  content: Record<string, any>;
}

export async function getProjectSections(projectId: string, locale: string): Promise<SectionData[]> {
  const { createClient } = await import('@supabase/supabase-js');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Variáveis do Supabase faltando no servidor.');
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Fetch templates and their content for the specific locale
  const { data, error } = await supabase
    .from('project_section_templates')
    .select(`
      id,
      template_name,
      order_index,
      config,
      project_section_content!inner(content)
    `)
    .eq('project_id', projectId)
    .eq('project_section_content.locale', locale)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Erro ao buscar seções do Supabase:', error);
    return [];
  }

  // Transform nested response into a flat structure
  return (data || []).map((row: any) => ({
    id: row.id,
    template_name: row.template_name,
    order_index: row.order_index,
    config: row.config || {},
    content: row.project_section_content[0]?.content || {},
  }));
}
