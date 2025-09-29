import { NavigationMenu, NavigationMenuItem } from '@/components/ui/navigation-menu';
import Link from 'next/link';
import Logo from './icons/logo';

const Navigation = () => {
  return (
    <div className="flex items-center mb-4 bg-white shadow-sm border-b">
      <Link href="/" className="p-4">
        <Logo className="w-50 h-10 text-blue-600" />
      </Link>

      <NavigationMenu className="list-none p-4 w-full max-w-full">
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
  );
};

export default Navigation;
