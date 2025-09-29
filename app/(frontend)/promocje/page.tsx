import { payload } from '@/config';
import Image from 'next/image';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{
    locale?: string;
  }>;
}

const PromocjePage = async ({ searchParams }: PageProps) => {
  const { locale = 'pl' } = await searchParams;

  const promocje = await payload.find({
    collection: 'promocje',
    locale,
  });

  return (
    <div className="justify-center lg:justify-start p-10 flex-wrap flex gap-10">
      {promocje.docs.map(promocja => (
        <Link
          href={`/promocje/${promocja.id}?locale=${locale}`}
          key={promocja.id}
          className="w-[470px] border p-4 rounded-lg hover:shadow-lg transition-shadow border-black/20"
        >
          <div>
            <Image
              src={promocja.image.url}
              width={470}
              height={300}
              alt={promocja.alt || promocja.title || 'Promocja'}
              unoptimized
            />
            <p className="pt-2 font-bold">{promocja.title}</p>
            <p className="pt-2">{promocja.shortDescription}</p>
            <p className="pt-2 font-bold">{promocja.price} zł</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PromocjePage;
