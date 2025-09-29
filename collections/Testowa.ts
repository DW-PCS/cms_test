import { revalidatePage } from '@/app/hooks/revalidatePage';
import type { CollectionConfig } from 'payload';

export const Test: CollectionConfig = {
  slug: 'test',

  fields: [
    {
      name: 'kierunek',
      type: 'text',
      localized: true,
    },
    {
      name: 'test1',
      type: 'checkbox',
    },
    {
      name: 'test2',
      type: 'code',
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'krótki opis',
      type: 'text',
      localized: true,
    },
    {
      name: 'cena',
      type: 'number',
    },
    {
      name: 'opis',
      type: 'richText',
      localized: true,
    },
    {
      name: 'blocksFieldServerComponent',
      type: 'blocks',
      blocks: [
        {
          slug: 'text',
          fields: [
            {
              name: 'content',
              type: 'textarea',
              label: 'Content',
            },
          ],
          labels: {
            plural: 'Text Blocks',
            singular: 'Text Block',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
  },
  versions: {
    drafts: true,
  },
};
