import { payload } from '@/config';

const getNavigation = async (locale = 'en') => {
  const collection = locale === 'en' ? 'navigation_en' : 'navigation_pl';

  const navigation = await payload.find({
    collection: collection,
  });
  return { navigation };
};

export default getNavigation;
