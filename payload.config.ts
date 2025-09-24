import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';
// import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { slateEditor } from '@payloadcms/richtext-slate';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { Media, Promocje } from './collections/index';

export default buildConfig({
  // editor: lexicalEditor(),
  editor: slateEditor({}),

  collections: [Promocje, Media],

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
    livePreview: {
      url: 'http://localhost:3000/promocje',
      collections: ['promocje'],
    },
  },
});
