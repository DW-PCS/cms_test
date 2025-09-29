import { revalidatePage } from '@/app/hooks/revalidatePage';
import type { CollectionConfig } from 'payload';
import { isAdmin } from './access/admins';
import { isAdminOrHasSiteAccess } from './access/isAdminOrHasSiteAccess';

export const Promocje: CollectionConfig = {
  slug: 'promocje',
  labels: {
    singular: { en: 'Promotion', pl: 'Promocja' },
    plural: {
      en: 'Promotions',
      pl: 'Promocje',
    },
  },
  access: {
    create: isAdminOrHasSiteAccess(),
    read: isAdminOrHasSiteAccess(),
    update: isAdminOrHasSiteAccess(),
    delete: isAdmin,
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'updatedAt', 'shortDescription'],
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      //@ts-ignore
      relationTo: 'media',
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
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Cena',
      min: 0,
    },
    {
      name: 'alt',
      type: 'text',
      label: 'Tekst alternatywny',
      localized: true,
      admin: {
        description: 'Tekst alternatywny dla obrazu (SEO)',
      },
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
  },
};
