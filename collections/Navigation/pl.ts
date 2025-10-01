import type { CollectionConfig } from 'payload';
import { isAdminOrHasAccess } from '../access/isAdminOrHasAccess';

export const NavigationPL: CollectionConfig = {
  slug: 'navigation_pl',

  labels: {
    singular: {
      pl: 'Nawigacja PL',
    },
    plural: {
      pl: 'Nawigacja PL',
    },
  },

  access: {
    read: () => true,
    create: isAdminOrHasAccess(),
    update: isAdminOrHasAccess(),
    delete: isAdminOrHasAccess(),
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'href',
      type: 'text',
      required: true,
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};
