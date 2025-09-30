import { JsonObject } from 'payload';

interface MainPageProps {
  data: JsonObject;
}

const MainPage = ({ data }: MainPageProps) => {
  return (
    <div>
      <h1>{data?.title}</h1>
    </div>
  );
};

export default MainPage;
