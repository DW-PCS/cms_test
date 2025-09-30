'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { JsonObject, PaginatedDocs, TypeWithID } from 'payload';
import { NavigationMenu, NavigationMenuItem } from './ui/navigation-menu';

const Navigation = ({ navigation }: { navigation: PaginatedDocs<JsonObject & TypeWithID> }) => {
  const pathname = usePathname();
  const isAdminBoard = pathname.startsWith('/admin');

  if (isAdminBoard) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center">
        <Link href="/" className="px-4 py-2">
          Logo
        </Link>

        {navigation.docs && navigation.docs.length > 0 && (
          <NavigationMenu className="list-none p-4">
            <div className="flex gap-2">
              {navigation.docs.map((doc: any) => (
                <NavigationMenuItem
                  key={doc.id}
                  className="px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <Link
                    target={doc.openInNewTab ? '_blank' : '_self'}
                    href={doc?.href}
                    className="text-gray-700 font-medium hover:text-blue-600"
                  >
                    {doc?.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </div>
          </NavigationMenu>
        )}
      </div>
    </div>
  );
};

export default Navigation;
