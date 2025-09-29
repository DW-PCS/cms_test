import { payload } from '@/config';

export const getPromotions = async (locale: string) => {
  const promocje = await payload.find({
    collection: 'promocje',
    locale,
    where: {
      _status: { equals: 'published' },
    },
  });

  if (promocje.docs.length <= 0) return [];
  console.log(promocje, 'promocje');
  return promocje.docs;
};

export async function getPromotion(id: string, locale: string): Promise<Promocja | null> {
  try {
    const result = await payload.find({
      collection: 'promocje',
      locale,
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
export interface Promocja {
  id: string;
  cena: number;
  createdAt: string;
  updatedAt: string;
  kierunek: string;
  krotki_opis: string;
  opis: any;
  title: string;
}
