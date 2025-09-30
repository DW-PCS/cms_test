import MainPage from '@/components/pages/main-page';
import { payload } from '@/config';

export default async function Home() {
  const data = await payload.findGlobal({ slug: 'MainPage' });

  return <MainPage data={data} />;
}
