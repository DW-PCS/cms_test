import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';
import { slateEditor } from '@payloadcms/richtext-slate';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { en } from '@payloadcms/translations/languages/en';
import { pl } from '@payloadcms/translations/languages/pl';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { Media } from './collections/Media';
import { Navigation } from './collections/Navigation';
import { Users } from './collections/Users';
import { MainPage } from './globals/MainPage';

export default buildConfig({
  editor: slateEditor({}),
  globals: [MainPage],
  collections: [Users, Media, Navigation],
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
        'media-with-prefix': {
          prefix: 'my-prefix',
        },
      },

      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
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
