import type { CollectionConfig } from 'payload';
import { isAdminOrHasAccess } from './access/isAdminOrHasAccess';


export const Navigation: CollectionConfig = {
  slug: 'navigation',

  labels: {
    singular: {
      en: 'Navigation Item',
      pl: 'Element Nawigacji',
    },
    plural: {
      en: 'Navigation',
      pl: 'Nawigacja',
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
