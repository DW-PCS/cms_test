import Navigation from '@/components/Navigation';

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full">
      <Navigation />
      {children}
    </section>
  );
}
