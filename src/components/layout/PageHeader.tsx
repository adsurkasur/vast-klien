import { VastLogo } from '../icons/SocialIcons';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="sticky top-0 bg-background/80 backdrop-blur-lg z-10 py-6 px-6 border-b border-card-border">
      <div className="flex items-center justify-between">
        {/* Vast Logo */}
        <div className="text-left flex items-center gap-3">
          <VastLogo size={40} className="text-accent-600" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Vast</h1>
            <p className="text-xs text-muted-foreground">Your wellness companion</p>
          </div>
        </div>
        
        {/* Page Title */}
        <div className="text-right">
          <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};
