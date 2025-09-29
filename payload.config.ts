import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';
// import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { slateEditor } from '@payloadcms/richtext-slate';
import { en } from '@payloadcms/translations/languages/en';
import { pl } from '@payloadcms/translations/languages/pl';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { Media, Promocje, Promocje_Page } from './collections/index';
import { Test } from './collections/Testowa';

export default buildConfig({
  // editor: lexicalEditor(),
  editor: slateEditor({}),

  collections: [Promocje_Page, Promocje, Media, Test],
  i18n: {
    supportedLanguages: { en, pl } as any,
    fallbackLanguage: 'pl',
  },
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Polski',
        code: 'pl',
      },
    ],
    defaultLocale: 'pl',
    fallback: true,
  },

  secret: process.env.PAYLOAD_SECRET || '',

  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),

  sharp,

  cors: {
    origins: ['http://localhost:3000'],
    headers: ['x-custom-header'],
  },

  admin: {
    // livePreview: {
    //   url: 'http://localhost:3000/promocje',
    //   collections: ['promocje'],
    // },
  },
});
