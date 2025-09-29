import { revalidatePage } from '@/app/hooks/revalidatePage';
import type { CollectionConfig } from 'payload';

export const Promocje_Page: CollectionConfig = {
  access: {
    create: ({ req: { user } }) => {
      console.log(user, 'user');
      return Boolean(user);
    },
  },

  slug: 'promocje_page',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
  ],

  labels: {
    singular: {
      en: 'Promotion Page',
      pl: 'Strona Promocji',
    },
    plural: {
      en: 'Promotion Pages',
      pl: 'Strony Promocji',
    },
  },
  hooks: {
    afterChange: [revalidatePage],
  },
  versions: {
    drafts: true,
  },
};
