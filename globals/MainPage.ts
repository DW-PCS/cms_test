import { isAdminOrHasAccess } from '@/collections/access/isAdminOrHasAccess';
import type { GlobalConfig } from 'payload';

export const MainPage: GlobalConfig = {
  slug: 'MainPage',

  label: {
    en: 'Main Page',
    pl: 'Strona główna',
  },
  access: {
    read: isAdminOrHasAccess(),
    update: isAdminOrHasAccess(),
  },

  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,

      label: 'Obraz',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tytuł',
      localized: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      label: 'Krótki opis',
      maxLength: 160,
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Opis',
      localized: true,
    },
  ],
};
