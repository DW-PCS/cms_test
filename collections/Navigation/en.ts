import type { CollectionConfig } from 'payload';
import { isAdminOrHasAccess } from '../access/isAdminOrHasAccess';


export const NavigationEN: CollectionConfig = {
  slug: 'navigation_en',

  labels: {
    singular: {
      en: 'Navigation EN',
    },
    plural: {
      en: 'Navigation EN',
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
