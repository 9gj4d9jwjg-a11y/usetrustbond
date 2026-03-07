import OriginalOngTemplate from '@/components/OriginalOngTemplate';

export default async function OngPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const {slug} = await params;

  // Static projects (like Enkoji) now have their own routes.
  // This dynamic route handles project templates or DB-driven content.
  // For demonstration, we'll implement two different layout templates based on the slug.

  if (slug === 'ong-moderna') {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <header className="py-20 text-center">
          <h1 className="text-6xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            ONG Moderna
          </h1>
          <p className="mt-6 text-xl text-zinc-400 max-w-2xl mx-auto">
            A highly animated, modern and dark-themed template for NGOs wanting to make a bold impact.
          </p>
        </header>
        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1,2,3].map(i => (
            <div key={i} className="aspect-square bg-zinc-900 rounded-3xl border border-zinc-800 p-8 hover:border-pink-500 transition-colors">
              <div className="h-full w-full bg-zinc-800 rounded-xl animate-pulse" />
            </div>
          ))}
        </section>
      </div>
    );
  }

  // Default / Classic Template
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-serif">
      <header className="bg-amber-50 py-24 px-8 border-b border-amber-100">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-normal text-amber-900 mb-6">
            ONG Clássica ({slug})
          </h1>
          <p className="text-xl text-amber-800/70 leading-relaxed">
            A classic, typography-driven template focused on storytelling and long-form content reading. Ideal for traditional institutions.
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-16 px-8 text-lg text-zinc-700 leading-loose">
        <p className="mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <div className="my-12 flex justify-center">
          <button className="bg-amber-900 text-white px-8 py-3 rounded text-sm uppercase tracking-widest hover:bg-amber-800 transition-colors">
            Support our cause
          </button>
        </div>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </main>
    </div>
  );
}
