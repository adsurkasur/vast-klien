import { PageHeader } from '../../components/layout/PageHeader';
import { Suspense } from 'react';

const AboutPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="space-y-8 pb-32">
        <PageHeader title="Tentang" subtitle="Tentang VAST" />
        <div className="px-6">
          <h2 className="text-2xl font-bold text-foreground mb-2 tracking-tight">VAST: Pendamping Siklus yang Tenang</h2>
          <p className="text-base text-muted-foreground mb-6">
            Mendukung perjalanan kesehatan perempuan dengan inovasi berbasis sains dan teknologi pangan.
          </p>
          {/* Our Product Section */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-4 text-primary">Produk Kami</h3>
            <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
              <div className="bg-card rounded-xl shadow-sm p-4 flex flex-col items-center w-full md:w-1/2">
                <img src="/png/kotak.png" alt="Vast Product Box and Sachet" className="w-full max-w-xs object-contain mb-2" />
                <span className="text-sm text-muted-foreground text-center">Vast: Minuman Serbuk Rempah Terfermentasi Water Kefir</span>
              </div>
              <div className="bg-card rounded-xl shadow-sm p-4 flex flex-col items-center w-full md:w-1/2">
                <div className="flex gap-4 justify-center">
                  <img src="/png/saset.png" alt="Vast Sachet Front" className="w-full max-w-xs object-contain mb-2" />
                </div>
                <span className="text-sm text-muted-foreground text-center mt-2">Sachet depan & belakang: Informasi nutrisi dan QR website</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-6 shadow-sm mb-8 border border-border">
            <h3 className="text-lg font-semibold mb-3 text-primary">Inovasi VAST</h3>
            <hr className="mb-4 border-muted-foreground/20" />
            <p className="text-base text-muted-foreground leading-relaxed">
              Dismenore merupakan gangguan menstruasi yang umum dialami perempuan dan sering diatasi dengan analgenik, 
              namun penggunaannya dalam jangka panjang berisiko menimbulkan efek samping gastrointestinal. Rempah-rempah 
              seperti jahe, kunyit, dan asam jawa terbukti memiliki sifat antiinflamasi dan mampu meredakan nyeri pada haid, 
              namun rendahnya penerimaan terhadap bentuk jamu tradisional masih menjadi tantangan. Inovasi VAST hadir sebagai 
              alternatif minuman serbuk fungsional berbasis rempah yang terfermentasi water kefir dan diproses dengan metode 
              foam mat drying untuk meningkatkan stabilitas, efektivitas, serta kemudahan konsumsi. VAST tidak hanya mampu 
              meredakan nyeri haid tetapi juga sebagai minuman fungsional dalam meningkatkan kesehatan tubuh.
            </p>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-2 text-primary">Misi Kami</h3>
            <hr className="mb-3 border-muted-foreground/20" />
            <p className="text-base text-muted-foreground">
              Memberdayakan individu untuk memahami dan menerima siklus mereka dengan ketenangan dan percaya diri.
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default AboutPage;
