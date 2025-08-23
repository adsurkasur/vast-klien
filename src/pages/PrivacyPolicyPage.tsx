import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';

const PrivacyPolicyContent: React.FC = () => {
  return (
    <div className="space-y-6 pb-32">
      <PageHeader title="Kebijakan Privasi" subtitle="Perlindungan data Anda adalah prioritas kami" />
      <div className="card-elevated p-6 accent-profile space-y-6">
        <h2 className="text-xl font-bold mb-4">Kebijakan Privasi Serene Cycle Companion</h2>
        <p className="text-sm text-muted-foreground">Terakhir diperbarui: Agustus 2025</p>
        <p>
          Selamat datang di Serene Cycle Companion. Kami berkomitmen untuk melindungi privasi dan keamanan data Anda. Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda.
        </p>
        <h3 className="font-semibold mt-6 mb-2">1. Informasi yang Kami Kumpulkan</h3>
        <ul className="list-disc ml-6 space-y-1">
          <li>Data siklus menstruasi, gejala, dan catatan kesehatan yang Anda masukkan.</li>
          <li>Informasi akun seperti nama, email, dan preferensi aplikasi.</li>
          <li>Data penggunaan aplikasi untuk meningkatkan layanan.</li>
        </ul>
        <h3 className="font-semibold mt-6 mb-2">2. Tujuan Pengumpulan Data</h3>
        <ul className="list-disc ml-6 space-y-1">
          <li>Membantu Anda melacak siklus menstruasi dan gejala.</li>
          <li>Memberikan rekomendasi kesehatan dan tips yang relevan.</li>
          <li>Meningkatkan fitur dan pengalaman pengguna aplikasi.</li>
        </ul>
        <h3 className="font-semibold mt-6 mb-2">3. Penyimpanan dan Keamanan Data</h3>
        <ul className="list-disc ml-6 space-y-1">
          <li>Data Anda disimpan dengan enkripsi end-to-end.</li>
          <li>Kami menerapkan langkah-langkah keamanan untuk mencegah akses tidak sah.</li>
          <li>Hanya Anda yang dapat mengakses dan mengelola data pribadi Anda.</li>
        </ul>
        <h3 className="font-semibold mt-6 mb-2">4. Hak Pengguna</h3>
        <ul className="list-disc ml-6 space-y-1">
          <li>Anda dapat mengekspor atau menghapus data kapan saja melalui pengaturan aplikasi.</li>
          <li>Anda dapat mengubah informasi akun dan preferensi privasi.</li>
          <li>Anda berhak meminta informasi tentang data yang kami simpan.</li>
        </ul>
        <h3 className="font-semibold mt-6 mb-2">5. Berbagi Data dengan Pihak Ketiga</h3>
        <ul className="list-disc ml-6 space-y-1">
          <li>Kami tidak membagikan data Anda kepada pihak ketiga tanpa persetujuan Anda.</li>
          <li>Data anonim dapat digunakan untuk analisis dan pengembangan aplikasi.</li>
        </ul>
        <h3 className="font-semibold mt-6 mb-2">6. Perubahan Kebijakan</h3>
        <ul className="list-disc ml-6 space-y-1">
          <li>Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu.</li>
          <li>Perubahan akan diinformasikan melalui aplikasi.</li>
        </ul>
        <h3 className="font-semibold mt-6 mb-2">7. Kontak</h3>
        <p>
          Jika Anda memiliki pertanyaan atau permintaan terkait privasi, silakan hubungi kami di <a href="mailto:support@serenecycle.com" className="text-primary underline">support@serenecycle.com</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyContent;
