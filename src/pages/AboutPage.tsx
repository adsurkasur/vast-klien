import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';

const AboutPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-32">
      <PageHeader title="About" subtitle="About Vast" />
      <div className="px-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Vast: Your Serene Cycle Companion</h2>
        <p className="text-base text-muted-foreground mb-4">
          Vast is dedicated to supporting your wellness journey. This is a placeholder for brand information, mission, and values. More details about Vast will be added soon.
        </p>
        <div className="rounded-xl bg-card p-4 shadow-sm">
          <h3 className="text-lg font-bold mb-2 text-primary">Our Mission</h3>
          <p className="text-sm text-muted-foreground">
            Empowering individuals to understand and embrace their cycle with serenity and confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
