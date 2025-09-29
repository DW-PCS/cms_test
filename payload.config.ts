import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';
// import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { slateEditor } from '@payloadcms/richtext-slate';
import { en } from '@payloadcms/translations/languages/en';
import { pl } from '@payloadcms/translations/languages/pl';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { Media, Promocje, Users, Wycieczki } from './collections/index';

export default buildConfig({
  // editor: lexicalEditor(),
  editor: slateEditor({}),

  collections: [Users, Media, Promocje, Wycieczki],
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
      connectionString: process.env.DATABASE_URL,
    },
  }),

  sharp,

  cors: {
    origins: ['http://localhost:3000'],
    headers: ['x-custom-header'],
  },

  admin: {
    user: Users.slug,
  },
});
