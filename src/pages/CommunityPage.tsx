import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Users, MessageCircle, Heart, Share2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CommunityPage = () => {
  const communityLinks = [
    {
      name: 'Join Our Telegram Group',
      description: 'Connect with women sharing similar experiences',
      icon: MessageCircle,
      url: 'https://t.me/vastcommunity',
      color: 'bg-blue-100 text-blue-700',
      members: '2.5k+'
    },
    {
      name: 'Follow on Instagram',
      description: 'Daily tips and wellness content',
      icon: Heart,
      url: 'https://instagram.com/vast.pkm',
      color: 'bg-pink-100 text-pink-700',
      members: '1.2k+'
    },
    {
      name: 'Facebook Community',
      description: 'Share stories and support each other',
      icon: Users,
      url: 'https://facebook.com/groups/vastcommunity',
      color: 'bg-purple-100 text-purple-700',
      members: '890+'
    }
  ];

  return (
    <div className="space-y-6 pb-32">
      {/* Header with Logo and Title */}
      <PageHeader title="Community" subtitle="Connect with others" />

      {/* Hero Section */}
      <div className="px-6">
        <div className="card-soft p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Users className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Join Our Community
          </h1>
          <p className="text-muted-foreground">
            Connect with thousands of women on their wellness journey. Share experiences, get support, and find inspiration.
          </p>
        </div>
      </div>

      {/* Community Links */}
      <div className="px-6 space-y-4">
        {communityLinks.map((link) => (
          <div key={link.name} className="card-elevated p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${link.color}`}>
                  <link.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{link.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{link.description}</p>
                  <div className="flex items-center space-x-1">
                    <Users size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{link.members} members</span>
                  </div>
                </div>
              </div>
              <ExternalLink size={20} className="text-muted-foreground" />
            </div>

            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button 
                className="w-full spring-tap"
                variant="outline"
              >
                <Share2 size={16} className="mr-2" />
                Join Community
              </Button>
            </a>
          </div>
        ))}
      </div>

      {/* Community Guidelines */}
      <div className="px-6">
        <div className="card-soft p-6">
          <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
            <Heart className="text-accent-600" size={20} />
            <span>Community Guidelines</span>
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Be respectful and supportive to all members</p>
            <p>• Share experiences and tips openly</p>
            <p>• Respect privacy and confidentiality</p>
            <p>• Report any inappropriate content</p>
            <p>• Consult healthcare professionals for medical advice</p>
          </div>
        </div>
      </div>
    </div>
  );
};