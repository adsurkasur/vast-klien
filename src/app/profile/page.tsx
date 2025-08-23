
"use client";
import { useState } from 'react';
import { Edit, User, Shield, Bell, Heart, Calendar, Settings } from 'lucide-react';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { PageHeader } from '../../components/layout/PageHeader';

const getGoogleProfile = () => ({
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  age: '28',
  cycleLength: '28',
  periodLength: '5',
  googleUserId: 'google-uid-placeholder',
  cloudSync: false
});

const ProfilePage = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(getGoogleProfile());

  const handleGoogleLogin = () => {
    setIsRegistered(true);
    setProfile(getGoogleProfile());
  };

  const handleLogout = () => {
    setIsRegistered(false);
    setProfile(getGoogleProfile());
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saving profile:', profile);
  };

  return (
    <div className="space-y-6 pb-32">
      <PageHeader title="Profil Saya" subtitle="Personalisasi pengalaman Anda" />
      <div className="px-6">
        <div className="card-elevated p-6 accent-profile">
          {!isRegistered ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-2">
                <User size={28} className="text-primary-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Belum terdaftar</h2>
              <p className="text-muted-foreground text-center">Masuk untuk personalisasi pengalaman Anda dan sinkronkan data siklus Anda dengan aman.</p>
              <Button
                onClick={handleGoogleLogin}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl spring-tap"
              >
                <span className="mr-2">G</span>
                Masuk dengan Google
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
                      <Label htmlFor="name" className="text-sm font-medium text-foreground">Nama</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-1 bg-white/50 border-card-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="age" className="text-sm font-medium text-foreground">Usia</Label>
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
                      <Label htmlFor="cycleLength" className="text-sm font-medium text-foreground">Panjang Siklus (hari)</Label>
                      <Input
                        id="cycleLength"
                        value={profile.cycleLength}
                        onChange={(e) => setProfile(prev => ({ ...prev, cycleLength: e.target.value }))}
                        className="mt-1 bg-white/50 border-card-border"
                      />
                    </div>
                    <div>
                      <Label htmlFor="periodLength" className="text-sm font-medium text-foreground">Panjang Menstruasi (hari)</Label>
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
                    Simpan Perubahan
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Usia:</span>
                    <span className="ml-2 font-medium text-foreground">{profile.age} tahun</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Siklus:</span>
                    <span className="ml-2 font-medium text-foreground">{profile.cycleLength} hari</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Menstruasi:</span>
                    <span className="ml-2 font-medium text-foreground">{profile.periodLength} hari</span>
                  </div>
                </div>
              )}
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
                    Keluar
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
      {/* Settings Options */}
      <div className="px-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Pengaturan</h3>
        <div className="space-y-3">
          {[
            { icon: Bell, label: 'Notifikasi', sublabel: 'Pengingat menstruasi dan tips' },
            // { icon: Shield, label: 'Privasi', sublabel: 'Keamanan data dan akun' },
            // { icon: Heart, label: 'Data Kesehatan', sublabel: 'Ekspor data siklus Anda' },
            // { icon: Calendar, label: 'Sinkronisasi Kalender', sublabel: 'Hubungkan dengan aplikasi kalender Anda' },
            // { icon: Settings, label: 'Preferensi Aplikasi', sublabel: 'Sesuaikan pengalaman Anda' }
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
      {/* Privacy Notice */}
      <div className="px-6">
        <div className="card-elevated p-6 accent-profile">
          <h3 className="text-lg font-semibold text-foreground mb-4">Pemberitahuan Privasi</h3>
          <div className="text-sm text-foreground space-y-3">
            <p>
              Data kesehatan Anda bersifat pribadi dan aman. Vast menggunakan enkripsi end-to-end untuk melindungi
              informasi pribadi dan data siklus menstruasi Anda.
            </p>
            <p>
              Kami tidak pernah membagikan data Anda kepada pihak ketiga tanpa persetujuan Anda.
              Anda memiliki kendali penuh atas data Anda dan dapat mengekspor atau menghapusnya kapan saja.
            </p>
            <div className="pt-3 border-t border-card-border">
              <p className="text-xs text-muted-foreground">
                Terakhir diperbarui: Agustus 2025 • <Link href="/privacypolicy" className="text-primary underline cursor-pointer">Baca kebijakan privasi lengkap</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
