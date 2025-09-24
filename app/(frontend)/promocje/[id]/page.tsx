import RichText from '@/components/features/RichText';
import { payload } from '@/config';
import { notFound } from 'next/navigation';
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Promocja {
  id: string;
  cena: number;
  createdAt: string;
  updatedAt: string;
  kierunek: string;
  krotki_opis: string;
  opis: any;
  title: string;
}

const PromotionPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const promocja = await getPromotion(id);

  if (!promocja) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <PromotionHeader promocja={promocja} />
        <RichText content={promocja?.opis} />
        asd asd
        <PromotionFooter promocja={promocja} />
      </article>
    </div>
  );
};

async function getPromotion(id: string): Promise<Promocja | null> {
  try {
    const result = await payload.find({
      collection: 'promocje',
      where: {
        _status: { equals: 'published' },
        id: {
          equals: id,
        },
      },
      limit: 1,
    });

    return (result.docs[0] as Promocja) || null;
  } catch (error) {
    console.error('Error fetching promotion:', error);
    return null;
  }
}

function PromotionHeader({ promocja }: { promocja: Promocja }) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{promocja.title}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          {promocja.kierunek}
        </span>
        <span className="font-semibold text-lg text-green-600">{promocja.cena} zł</span>
      </div>
    </header>
  );
}

function PromotionFooter({ promocja }: { promocja: Promocja }) {
  return (
    <footer className="mt-8 pt-6 border-t border-gray-200">
      <div className="flex justify-between text-sm text-gray-500">
        <span>Utworzono: {new Date(promocja.createdAt).toLocaleDateString('pl-PL')}</span>
        <span>Zaktualizowano: {new Date(promocja.updatedAt).toLocaleDateString('pl-PL')}</span>
      </div>
    </footer>
  );
}

export default PromotionPage;
