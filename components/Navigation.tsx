'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem } from '@/components/ui/navigation-menu';
import { Globe } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Logo from './icons/logo';

const LOCALES = [
  { code: 'pl', label: 'Polski' },
  { code: 'en', label: 'English' },
] as const;

type LocaleCode = (typeof LOCALES)[number]['code'];

const Navigation = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentLocale = (searchParams.get('locale') || 'pl') as LocaleCode;

  const handleLocaleChange = (locale: LocaleCode) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('locale', locale);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between mb-4 bg-white shadow-sm border-b">
      <div className="flex items-center">
        <Link href="/" className="p-4">
          <Logo className="w-50 h-10 text-blue-600" />
        </Link>

        <NavigationMenu className="list-none p-4">
          <div className="flex gap-2">
            <NavigationMenuItem className="px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
              <Link href="/promocje" className="text-gray-700 font-medium hover:text-blue-600">
                Promocje
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
              <Link href="/wycieczki" className="text-gray-700 font-medium hover:text-blue-600">
                Wycieczki
              </Link>
            </NavigationMenuItem>
          </div>
        </NavigationMenu>
      </div>

      <div className="p-4 bg-white">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors text-gray-700 font-medium outline-none">
            <Globe className="w-4 h-4" />
            <span className="uppercase">{currentLocale}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            {LOCALES.map(locale => (
              <DropdownMenuItem
                key={locale.code}
                onClick={() => handleLocaleChange(locale.code)}
                className={currentLocale === locale.code ? 'bg-blue-50' : ''}
              >
                {locale.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navigation;
