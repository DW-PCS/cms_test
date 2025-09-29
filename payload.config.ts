import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';
import { slateEditor } from '@payloadcms/richtext-slate';
import { en } from '@payloadcms/translations/languages/en';
import { pl } from '@payloadcms/translations/languages/pl';

import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { Media } from './collections/Media';
import { Promocje } from './collections/Promocje';
import { Users } from './collections/Users';
import { Wycieczki } from './collections/Wycieczki';

export default buildConfig({
  editor: slateEditor({}),
  collections: [Users, Media, Promocje, Wycieczki],

  i18n: {
    //@ts-ignore
    supportedLanguages: { en, pl },
    fallbackLanguage: 'pl',
  },

  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Polski', code: 'pl' },
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

  typescript: {
    autoGenerate: true,
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
});
