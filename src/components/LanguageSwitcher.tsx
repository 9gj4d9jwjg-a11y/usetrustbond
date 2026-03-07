"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import {  useTransition } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className="relative flex items-center justify-center gap-1.5 transition-colors opacity-80 hover:opacity-100">
      <Globe size={16} />
      <select
        defaultValue={locale}
        disabled={isPending}
        onChange={onSelectChange}
        className="bg-transparent appearance-none outline-none cursor-pointer text-sm font-medium tracking-wider"
      >
        <option value="pt" className="text-black">PT</option>
        <option value="en" className="text-black">EN</option>
        <option value="es" className="text-black">ES</option>
        <option value="fr" className="text-black">FR</option>
      </select>
      <div className="pointer-events-none absolute right-[-8px] top-1/2 -translate-y-1/2">
        <svg className="w-2.5 h-2.5 opacity-60" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}
