import React from 'react';
import { MessageCircle, Users, Heart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const communityPosts = [
  {
    id: 1,
    author: 'Sarah M.',
    time: '2h ago',
    content: 'Has anyone tried yoga for period cramps? Looking for recommendations!',
    likes: 24,
    replies: 8,
    category: 'Health'
  },
  {
    id: 2,
    author: 'Emma L.',
    time: '4h ago',
    content: 'Sharing my experience with the menstrual cup - happy to answer questions!',
    likes: 45,
    replies: 12,
    category: 'Products'
  },
  {
    id: 3,
    author: 'Maya K.',
    time: '6h ago',
    content: 'Mood swings are hitting hard this cycle. Anyone else feeling this way?',
    likes: 18,
    replies: 15,
    category: 'Support'
  }
];

const communityStats = [
  { label: 'Active Members', value: '12.5K', icon: Users },
  { label: 'Posts Today', value: '89', icon: MessageCircle },
  { label: 'Trending Topics', value: '15', icon: TrendingUp }
];

export const CommunityPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-32">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg z-10 py-6 px-6 border-b border-card-border">
        <h1 className="text-2xl font-bold text-foreground text-center">My Community</h1>
        <p className="text-muted-foreground text-center mt-1">Connect, share, and support</p>
      </div>

      {/* Community Stats */}
      <div className="px-6">
        <div className="grid grid-cols-3 gap-4">
          {communityStats.map((stat) => (
            <div key={stat.label} className="card-soft p-4 text-center">
              <stat.icon size={20} className="mx-auto mb-2 text-primary" />
              <div className="text-lg font-semibold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Community Section */}
      <div className="px-6">
        <div className="card-elevated p-6 accent-community">
          <h2 className="text-lg font-semibold text-foreground mb-4">💬 Join the Conversation</h2>
          <p className="text-foreground mb-4">
            Connect with women worldwide sharing similar experiences. Share tips, ask questions, 
            and find support in our safe community space.
          </p>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl spring-tap">
            Create New Post
          </Button>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="px-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Discussions</h3>
        <div className="space-y-4">
          {communityPosts.map((post) => (
            <div key={post.id} className="card-soft p-5 space-y-3">
              {/* Post Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-muted rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-foreground">
                      {post.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">{post.author}</div>
                    <div className="text-xs text-muted-foreground">{post.time}</div>
                  </div>
                </div>
                <span className="text-xs bg-primary-muted text-foreground px-2 py-1 rounded-lg">
                  {post.category}
                </span>
              </div>

              {/* Post Content */}
              <p className="text-foreground text-sm">{post.content}</p>

              {/* Post Actions */}
              <div className="flex items-center space-x-4 pt-2">
                <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors spring-tap">
                  <Heart size={16} />
                  <span className="text-xs">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors spring-tap">
                  <MessageCircle size={16} />
                  <span className="text-xs">{post.replies}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="px-6">
        <div className="card-soft p-4 bg-accent-community/30">
          <h4 className="font-medium text-foreground mb-2">Community Guidelines</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Be respectful and supportive</li>
            <li>• Share experiences, not medical advice</li>
            <li>• Keep discussions relevant and helpful</li>
          </ul>
        </div>
      </div>
    </div>
  );
};