'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LANGUAGES } from '@/lib/utils/locales';
import { Check, ChevronDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function LanguageDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAdminBoard = pathname.startsWith('/admin');

  const currentLang = searchParams.get('locale') || 'en';
  const currentLanguage = LANGUAGES.find(lang => lang.code === currentLang) ?? LANGUAGES[0];

  const handleLanguageChange = (langCode: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('locale', langCode);
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isAdminBoard) {
    return;
  }
  return (
    <div className="w-full flex items-end justify-end p-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="  cursor-pointer inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          <span className="text-lg">{currentLanguage.flag}</span>
          <span>{currentLanguage.label}</span>
          <ChevronDown className="w-4 h-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          {LANGUAGES.map(language => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`flex items-center gap-2 cursor-pointer ${
                currentLang === language.code ? 'bg-blue-50 text-blue-700' : ''
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span>{language.label}</span>
              {currentLang === language.code && <Check className="w-4 h-4 ml-auto text-blue-600" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
