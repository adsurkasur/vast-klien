"use client";
import * as React from "react";
import { Heart, Calendar as CalendarIcon, Users } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { useRouter } from 'next/navigation';
// import { url } from 'inspector';

const newsItems = [
  {
    id: 1,
    title: 'Tips Menjaga Pola Makan agar Sirkulasi Haid Lancar',
    category: 'Panduan Kesehatan',
    image: '🥗',
    url: 'https://vastdotid.wordpress.com/2025/08/27/tips-menjaga-pola-makan-yang-baik-agar-sirkulasi-haid-lancar/'
  },
  {
    id: 2,
    title: 'Tips Merawat Kesehatan Reproduksi saat Menstruasi',
    category: 'Panduan Kesehatan',
    image: '🌸',
    url: 'https://vastdotid.wordpress.com/2025/08/27/tips-merawat-kesehatan-reproduksi-saat-menstruasi/'
  },
  {
    id: 3,
    title: 'Artikel lain menyusul',
    category: 'Tunggu update dari Vast ya!',
    image: '😊',
    url: 'https://www.example.com'
  }
];



const ClientActionCards = () => {
  const router = useRouter();
  return (
    <div className="px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
      <div
        className="cursor-pointer rounded-2xl shadow-lg bg-gradient-to-br from-pink-500 via-rose-400 to-pink-100 border-2 border-pink-400 hover:scale-[1.03] hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-pink-300"
        tabIndex={0}
        role="button"
        aria-label="Tips Sehat"
        onClick={() => router.push('/healthytips')}
      >
        <div className="flex flex-col items-center justify-center py-8 px-6">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4 shadow-md">
            <Heart className="text-pink-600" size={32} />
          </div>
          <h3 className="font-bold text-lg text-pink-800 mb-2">Tips Sehat</h3>
          <p className="text-sm text-pink-900/80 text-center">Panduan kesehatan untuk siklus Anda</p>
        </div>
      </div>
      <div
        className="cursor-pointer rounded-2xl shadow-lg bg-gradient-to-br from-indigo-500 via-purple-400 to-indigo-100 border-2 border-indigo-400 hover:scale-[1.03] hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        tabIndex={0}
        role="button"
        aria-label="Kalender Saya"
        onClick={() => router.push('/calendar')}
      >
        <div className="flex flex-col items-center justify-center py-8 px-6">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 shadow-md">
            <CalendarIcon className="text-indigo-600" size={32} />
          </div>
          <h3 className="font-bold text-lg text-indigo-800 mb-2">Kalender Saya</h3>
          <p className="text-sm text-indigo-900/80 text-center">Lacak siklus dan gejala Anda</p>
        </div>
      </div>
      <div
        className="cursor-pointer rounded-2xl shadow-lg bg-gradient-to-br from-cyan-500 via-blue-400 to-cyan-100 border-2 border-cyan-400 hover:scale-[1.03] hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-cyan-300"
        tabIndex={0}
        role="button"
        aria-label="Komunitas Saya"
        onClick={() => router.push('/community')}
      >
        <div className="flex flex-col items-center justify-center py-8 px-6">
          <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4 shadow-md">
            <Users className="text-cyan-600" size={32} />
          </div>
          <h3 className="font-bold text-lg text-cyan-800 mb-2">Komunitas Saya</h3>
          <p className="text-sm text-cyan-900/80 text-center">Terhubung dengan wanita lain</p>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="space-y-8 pb-32">
      <PageHeader title="Beranda" subtitle="Selamat datang kembali" />
      <div className="px-6">
        <div className="grid grid-cols-3 gap-4">
          <h1 className="col-span-3 text-lg font-semibold text-foreground">
            Artikel
          </h1>
          {newsItems.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-soft p-4 spring-tap cursor-pointer hover:shadow-card transition-all duration-200 text-center"
              aria-label={item.title}
            >
              <div className="text-2xl mb-2">{item.image}</div>
              <h3 className="font-medium text-foreground text-xs mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.category}</p>
            </a>
          ))}
        </div>
      </div>
      <ClientActionCards />
    </div>
  );
};

export default HomePage;
