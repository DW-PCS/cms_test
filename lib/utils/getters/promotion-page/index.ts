import { payload } from '@/config';

interface PromotionPage {
  title: string;
  createdAt: Date;
  id: number;
  updatedAt: Date;
  _status: string;
}

export const getPromotionPage = async (locale: string): Promise<PromotionPage | null> => {
  const promocjePage = await payload.find({
    collection: 'promocje_page',
    locale,
  });

  if (promocjePage.docs.length === 0) {
    return null;
  }

  return promocjePage.docs[0] as PromotionPage;
};
