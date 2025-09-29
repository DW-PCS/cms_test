import RichText from '@/components/features/RichText';
import { payload } from '@/config';
import Image from 'next/image';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    locale?: string;
  }>;
}

const PromocjaPage = async ({ params, searchParams }: PageProps) => {
  const { id } = await params;
  const { locale = 'pl' } = await searchParams;

  const promocja = await payload.findByID({
    collection: 'promocje',
    id,
    locale,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="relative h-64">
            <Image
              src={promocja.image.url}
              alt={promocja.alt || promocja.title || 'Promocja'}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 896px, 896px"
              unoptimized
            />
          </div>
          <div className="px-6 py-8 sm:px-8 sm:py-10 border-b border-gray-100">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{promocja.title}</h1>

            <p className="text-lg text-gray-600 leading-relaxed">{promocja.shortDescription}</p>
          </div>

          <div className="px-6 py-6 sm:px-8 bg-gray-50">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Cena
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                {promocja.price} zł
              </span>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <RichText content={promocja.description} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default PromocjaPage;
