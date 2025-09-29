import Navigation from '@/components/Navigation';
import { ArrowUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center text-center">
          <ArrowUp className="w-16 h-16 text-blue-600 animate-bounce mb-4" />

          <h2 className="text-3xl font-bold text-gray-800 mb-2">Witamy!</h2>

          <p className="text-xl text-gray-600">
            Kliknij w menu powyżej, aby sprawdzić{' '}
            <span className="font-semibold text-blue-600">Promocje</span> lub{' '}
            <span className="font-semibold text-blue-600">Wycieczki</span>
          </p>
        </div>
      </main>
    </div>
  );
}
