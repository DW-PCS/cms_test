import { payload } from '@/config';
import Image from 'next/image';
import Link from 'next/link';

const WyciecznikiPage = async () => {
  const wycieczki = await payload.find({ collection: 'wycieczki' });

  return (
    <div className="flex flex-wrap justify-center gap-10 p-10 lg:justify-start">
      {wycieczki.docs.map(wycieczka => (
        <Link
          href={`/wycieczki/${wycieczka.id}`}
          key={wycieczka.id}
          className="w-[470px] rounded-lg border border-black/20 p-4 transition-shadow hover:shadow-lg"
        >
          <Image
            src={wycieczka.image.url}
            width={470}
            height={300}
            alt={wycieczka.image.alt || wycieczka.title || 'Wycieczka'}
            unoptimized
          />
          <h2 className="pt-2 font-bold">{wycieczka.title}</h2>
          <p className="pt-2">{wycieczka.shortDescription}</p>

          <div className="pt-2 flex items-center gap-2">
            <span className="font-bold">od {wycieczka.dates[0]?.basePrice} zł</span>
            {wycieczka.duration && (
              <span className="text-sm text-gray-600">• {wycieczka.duration} dni</span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default WyciecznikiPage;
