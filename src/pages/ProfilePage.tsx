import React, { useState } from 'react';
import { Edit, User, Shield, Bell, Heart, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '../components/layout/PageHeader';

export const ProfilePage: React.FC = () => {
  // Registration state: false = not registered, true = registered
  const [isRegistered, setIsRegistered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // Placeholder for Google profile data and future cloud sync
  // In a real app, this would be replaced with Google OAuth and cloud sync logic
  const getGoogleProfile = () => ({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    age: '28',
    cycleLength: '28',
    periodLength: '5',
    googleUserId: 'google-uid-placeholder', // Placeholder for Google user ID
    cloudSync: false // Placeholder for cloud sync status
  });

  // Use Google profile if registered
  const [profile, setProfile] = useState(getGoogleProfile());

  // Placeholder for Google login
  const handleGoogleLogin = () => {
    // Simulate Google login
    setIsRegistered(true);
    setProfile(getGoogleProfile());
    // TODO: In real app, trigger Google OAuth flow and sync data to cloud
  };

  // Placeholder for logout
  const handleLogout = () => {
    setIsRegistered(false);
    setProfile(getGoogleProfile()); // Optionally reset profile to placeholder
    // TODO: In real app, disconnect Google account and stop cloud sync
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save to your state management system
    console.log('Saving profile:', profile);
  };

  return (
    <div className="space-y-6 pb-32">
      {/* Unified Page Header */}
      <PageHeader title="My Profile" subtitle="Personalize your experience" />

  {/* Profile Card */}
  {/* Google Auth and Cloud Sync Placeholder UI */}
  {/* In a real app, this would show Google account info and cloud sync status */}
      <div className="px-6">
        <div className="card-elevated p-6 accent-profile">
          {!isRegistered ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-2">
                <User size={28} className="text-primary-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Not registered</h2>
              <p className="text-muted-foreground text-center">Sign in to personalize your experience and sync your cycle data securely.</p>
              <Button
                onClick={handleGoogleLogin}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl spring-tap"
              >
                {/* Placeholder for Google icon */}
                <span className="mr-2">G</span>
                Login with Google
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center mb-6 space-x-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <User size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{profile.name}</h2>
                  <p className="text-muted-foreground">{profile.email}</p>
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-foreground">Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-1 bg-white/50 border-card-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="age" className="text-sm font-medium text-foreground">Age</Label>
                      <Input
                        id="age"
                        value={profile.age}
                        onChange={(e) => setProfile(prev => ({ ...prev, age: e.target.value }))}
                        className="mt-1 bg-white/50 border-card-border"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="mt-1 bg-white/50 border-card-border"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cycleLength" className="text-sm font-medium text-foreground">Cycle Length (days)</Label>
                      <Input
                        id="cycleLength"
                        value={profile.cycleLength}
                        onChange={(e) => setProfile(prev => ({ ...prev, cycleLength: e.target.value }))}
                        className="mt-1 bg-white/50 border-card-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="periodLength" className="text-sm font-medium text-foreground">Period Length (days)</Label>
                      <Input
                        id="periodLength"
                        value={profile.periodLength}
                        onChange={(e) => setProfile(prev => ({ ...prev, periodLength: e.target.value }))}
                        className="mt-1 bg-white/50 border-card-border"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleSave}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl spring-tap"
                  >
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Age:</span>
                    <span className="ml-2 font-medium text-foreground">{profile.age} years</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Cycle:</span>
                    <span className="ml-2 font-medium text-foreground">{profile.cycleLength} days</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Period:</span>
                    <span className="ml-2 font-medium text-foreground">{profile.periodLength} days</span>
                  </div>
                </div>
              )}
              {/* Move Edit button to bottom */}
              {!isEditing && (
                <>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline"
                    size="sm"
                    className="bg-white/50 border-card-border hover:bg-white/70 spring-tap w-full mt-4"
                  >
                    <Edit size={16} className="mr-2" />
                    Edit
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 text-destructive border-card-border spring-tap"
                  >
                    Log out
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Settings Options (Notifications always visible) */}
      {/*
        NOTE: Notifications and other local features work for all users (localStorage or mobile equivalent).
        Google Auth is only used for data syncing.
      */}
      <div className="px-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Settings</h3>
        <div className="space-y-3">
          {[
            { icon: Bell, label: 'Notifications', sublabel: 'Period reminders and tips' },
            //  { icon: Shield, label: 'Privacy', sublabel: 'Data and account security' },
            //  { icon: Heart, label: 'Health Data', sublabel: 'Export your cycle data' },
            //  { icon: Calendar, label: 'Sync Calendar', sublabel: 'Connect with your calendar app' },
            //  { icon: Settings, label: 'App Preferences', sublabel: 'Customize your experience' }
          ].map((item) => (
            <div
              key={item.label}
              className="card-soft p-4 flex items-center justify-between spring-tap cursor-pointer hover:shadow-card transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <item.icon size={20} className="text-primary" />
                <div>
                  <div className="font-medium text-foreground text-sm">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.sublabel}</div>
                </div>
              </div>
              <div className="w-5 h-5 border border-card-border rounded bg-white/50" />
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Notice (always show) */}
      <div className="px-6">
        <div className="card-elevated p-6 accent-profile">
          <h3 className="text-lg font-semibold text-foreground mb-4">Privacy Notice</h3>
          <div className="text-sm text-foreground space-y-3">
            <p>
              Your health data is private and secure. Vast uses end-to-end encryption to protect
              your personal information and menstrual cycle data.
            </p>
            <p>
              We never share your data with third parties without your explicit consent.
              You have full control over your data and can export or delete it at any time.
            </p>
            <div className="pt-3 border-t border-card-border">
              <p className="text-xs text-muted-foreground">
                Last updated: January 2024 • <span className="text-primary cursor-pointer">Read full privacy policy</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
