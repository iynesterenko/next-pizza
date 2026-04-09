import { Header } from '@/components/shared/header';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Nunito } from 'next/font/google';


export const metadata: Metadata = {
  title: 'Next Pizza | Home',
};



export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
        <Header />
      {children}
      {modal}
    </main>
  );
}
