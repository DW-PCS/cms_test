import { getPromotionPage } from '@/lib/utils/getters/promotion-page';
import { getPromotions } from '@/lib/utils/getters/promotions';
import { getLocaleFromSearchParams } from '@/lib/utils/locales';
import Link from 'next/link';

const PromocjaCard = ({ promocja }: { promocja: any }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
      <div className="mb-4">
        <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
          {promocja.kierunek}
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{promocja.title}</h3>

      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{promocja['krótki opis']}</p>

      <div className="flex items-center justify-between mt-auto">
        <div className="text-2xl font-bold text-green-600">{formatPrice(promocja.cena)}</div>
        <Link
          href={`promocje/${promocja.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        >
          Zobacz szczegóły
        </Link>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400">Zaktualizowano: {formatDate(promocja.updatedAt)}</p>
      </div>
    </div>
  );
};

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
const Page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const locale = getLocaleFromSearchParams(resolvedSearchParams);

  const promocje = await getPromotions(locale);
  const pageData = await getPromotionPage(locale);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{pageData?.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promocje.map(promocja => (
          <PromocjaCard key={promocja.id} promocja={promocja} />
        ))}
      </div>
    </div>
  );
};

export default Page;
