import { revalidatePage } from '@/app/hooks/revalidatePage';
import type { CollectionConfig } from 'payload';

export const Promocje: CollectionConfig = {
  slug: 'promocje',
  fields: [
    {
      name: 'kierunek',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'krótki opis',
      type: 'text',
    },
    {
      name: 'cena',
      type: 'number',
    },
    {
      name: 'opis',
      type: 'richText',
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
  },
  versions: {
    drafts: true,
  },
};
