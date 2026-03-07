import {useTranslations} from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-zinc-50 dark:bg-zinc-950">
      <main className="flex flex-col gap-6 items-center max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
          {t('title')}
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-300">
          {t('description')}
        </p>
        <div className="flex gap-4 mt-8">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-zinc-900 text-zinc-50 gap-2 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 font-medium"
            href="/pt/ong/ong-exemplo"
          >
            Ver Exemplo ONG
          </a>
        </div>
        
        {/* Language Switcher Example */}
        <div className="mt-16 flex gap-4 text-sm text-zinc-500">
          <a href="/pt" className="hover:underline">PT</a>
          <a href="/en" className="hover:underline">EN</a>
          <a href="/es" className="hover:underline">ES</a>
          <a href="/fr" className="hover:underline">FR</a>
        </div>
      </main>
    </div>
  );
}
