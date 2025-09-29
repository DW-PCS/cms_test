import RichText from '@/components/features/RichText';
import { payload } from '@/config';
import Image from 'next/image';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const WycieczkaPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const wycieczka = await payload.findByID({
    collection: 'wycieczki',
    id,
  });

  const firstDate = wycieczka.dates[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="relative h-64">
            <Image
              src={wycieczka.image.url}
              alt={wycieczka.image.alt || wycieczka.title || 'Wycieczka'}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 896px, 896px"
              unoptimized
            />
          </div>

          <div className="border-b border-gray-100 px-6 py-8 sm:px-8 sm:py-10">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{wycieczka.title}</h1>
            <p className="text-lg leading-relaxed text-gray-600">{wycieczka.shortDescription}</p>
          </div>

          <div className="bg-gray-50 px-6 py-6 sm:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-500">
                  Cena od
                </span>
                <span className="text-2xl font-bold text-blue-600 sm:text-3xl">
                  {firstDate?.basePrice} zł
                </span>
              </div>

              {wycieczka.duration && (
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium uppercase tracking-wide text-gray-500">
                    Czas trwania
                  </span>
                  <span className="text-xl font-semibold text-gray-900">
                    {wycieczka.duration} dni
                  </span>
                </div>
              )}

              {wycieczka.tripType && (
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium uppercase tracking-wide text-gray-500">
                    Typ wycieczki
                  </span>
                  <span className="text-xl font-semibold text-gray-900">{wycieczka.tripType}</span>
                </div>
              )}
            </div>
          </div>

          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <RichText content={wycieczka.description} />
          </div>

          {wycieczka.schedule?.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-8 sm:px-8 sm:py-10">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Program wycieczki</h2>
              <div className="space-y-6">
                {wycieczka.schedule.map(day => (
                  <div key={day.id} className="rounded-lg border border-gray-200 p-4">
                    <h3 className="mb-3 font-semibold text-gray-900">Dzień {day.day}</h3>
                    <RichText content={day.activities} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {wycieczka.services?.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-8 sm:px-8 sm:py-10">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Usługi w cenie</h2>
              <ul className="space-y-2">
                {wycieczka.services.map(service => (
                  <li key={service.id} className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700">{service.service}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {wycieczka.organizer && (
            <div className="border-t border-gray-100 bg-gray-50 px-6 py-6 sm:px-8">
              <h2 className="mb-3 text-xl font-bold text-gray-900">Organizator</h2>
              <div className="space-y-1 text-gray-700">
                <p className="font-medium">{wycieczka.organizer.name}</p>
                <p>Tel: {wycieczka.organizer.phone}</p>
                <p>Email: {wycieczka.organizer.email}</p>
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default WycieczkaPage;
