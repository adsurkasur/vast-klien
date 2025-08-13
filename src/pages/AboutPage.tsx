import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';

const AboutPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-32">
      <PageHeader title="About" subtitle="Tentang VAST" />
      <div className="px-6">
        <h2 className="text-2xl font-bold text-foreground mb-2 tracking-tight">VAST: Serene Cycle Companion</h2>
        <p className="text-base text-muted-foreground mb-6">
          Mendukung perjalanan kesehatan perempuan dengan inovasi berbasis sains dan teknologi pangan.
        </p>

        <div className="rounded-xl bg-card p-6 shadow-sm mb-8 border border-border">
          <h3 className="text-lg font-semibold mb-3 text-primary">VAST Innovation</h3>
          <hr className="mb-4 border-muted-foreground/20" />
          <p className="text-base text-muted-foreground leading-relaxed">
            Dismenore merupakan gangguan menstruasi yang umum dialami perempuan dan sering diatasi dengan analgenik, namun penggunaannya dalam jangka panjang berisiko menimbulkan efek samping gastrointestinal.<br/><br/>
            Rempah-rempah seperti jahe, kunyit, dan asam jawa terbukti memiliki sifat antiinflamasi dan mampu meredakan nyeri pada haid, namun rendahnya penerimaan terhadap bentuk jamu tradisional masih menjadi tantangan.<br/><br/>
            Inovasi VAST hadir sebagai alternatif minuman serbuk fungsional berbasis rempah yang terfermentasi water kefir dan diproses dengan metode foam mat drying untuk meningkatkan stabilitas, efektivitas, serta kemudahan konsumsi.<br/><br/>
            VAST tidak hanya mampu meredakan nyeri haid tetapi juga sebagai minuman fungsional dalam meningkatkan kesehatan tubuh.
          </p>
        </div>

        <div className="rounded-xl bg-card p-4 shadow-sm mb-6">
          <h3 className="text-lg font-semibold mb-2 text-primary">Our Mission</h3>
          <hr className="mb-3 border-muted-foreground/20" />
          <p className="text-base text-muted-foreground">
            Empowering individuals to understand and embrace their cycle with serenity and confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
