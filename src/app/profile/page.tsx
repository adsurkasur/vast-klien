
"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Edit, User as UserIcon, Shield, Bell, Heart, Calendar, Settings } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useToast } from '../../hooks/use-toast';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';
import { useRef } from 'react';
import { loadGapiInsideDOM } from 'gapi-script';
import { Cloud } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { PageHeader } from '../../components/layout/PageHeader';
import { GoogleAuthButton } from '../../components/ui/GoogleAuthButton';
import type { User as FirebaseUser } from 'firebase/auth';

interface CycleData {
  periodDays: Array<{
    date: string;
    isPeriod: boolean;
    symptoms: string[];
    flow?: 'light' | 'medium' | 'heavy';
    mood?: string[];
    notes?: string;
  }>;
  cycleHistory: Array<{
    startDate: string;
    endDate: string;
    cycleLength: number;
    periodLength?: number;
  }>;
  averageCycleLength: number | null;
  averagePeriodLength: number | null;
  lastPeriodStart?: string;
  nextPeriodPrediction?: string;
}

const getGoogleProfile = (user: FirebaseUser | null, cycleData?: CycleData | null) => ({
  name: user?.displayName || 'Nama',
  email: user?.email || 'Email',
  photoURL: user?.photoURL || '',
  age: '-',
  cycleLength: cycleData?.averageCycleLength ? String(cycleData.averageCycleLength) : '-',
  periodLength: cycleData?.averagePeriodLength ? String(cycleData.averagePeriodLength) : '-',
  googleUserId: user?.uid || '-',
  cloudSync: false
});

const ProfilePage = () => {
  const { user } = useGoogleAuth();
  const { toast } = useToast();
  const syncLoadingRef = useRef(false);
  const [syncDebugInfo, setSyncDebugInfo] = useState<string[]>([]);
  const isClient = typeof window !== "undefined";
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState(getGoogleProfile(user));
  const [profileImageError, setProfileImageError] = useState(false);
  const [cycleData, setCycleData] = useState<CycleData | null>(null);

  useEffect(() => {
    // Load cycleData from localStorage
    const savedCycleData = localStorage.getItem('cycleData');
    let parsedCycleData = null;
    if (savedCycleData) {
      try {
        parsedCycleData = JSON.parse(savedCycleData);
        setCycleData(parsedCycleData);
      } catch (error) {
        setCycleData(null);
      }
    } else {
      setCycleData(null);
    }
    setProfile(getGoogleProfile(user, parsedCycleData));
  }, [user]);

  useEffect(() => {
    // Update profile when cycleData or user changes
    setProfile(getGoogleProfile(user, cycleData));
    setProfileImageError(false); // Reset error when user or profile changes
  }, [cycleData, user]);

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saving profile:', profile);
  };

  // Notification toggle state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    const savedNotifications = localStorage.getItem('notificationsEnabled');
    if (savedNotifications !== null) {
      setNotificationsEnabled(JSON.parse(savedNotifications));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
  }, [notificationsEnabled]);

  return (
    <div className="space-y-6 pb-32">
      <PageHeader title="Profil Saya" subtitle="Personalisasi pengalaman Anda" />
      <div className="px-6">
        <div className="card-elevated p-6 accent-profile">
          {!user ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-2">
                <UserIcon size={28} className="text-primary-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Belum terdaftar</h2>
              <p className="text-muted-foreground text-center">Masuk untuk personalisasi pengalaman Anda dan sinkronkan data siklus Anda dengan aman.</p>
              <GoogleAuthButton />
            </div>
          ) : (
            <>
              <div className="flex items-center mb-6 space-x-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                  {profile.photoURL && !profileImageError ? (
                    <Image
                      src={profile.photoURL}
                      alt="Profile"
                      width={64}
                      height={64}
                      className="object-cover rounded-full"
                      onError={() => setProfileImageError(true)}
                    />
                  ) : (
                    <UserIcon size={24} className="text-primary-foreground" />
                  )}
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
                  <GoogleAuthButton />
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
          <div className="card-soft p-4 flex items-center justify-between spring-tap cursor-pointer hover:shadow-card transition-all duration-200">
            <div className="flex items-center space-x-3">
              <Bell size={20} className={notificationsEnabled ? "text-primary" : "text-muted-foreground"} />
              <div>
                <div className="font-medium text-foreground text-sm">Notifikasi</div>
                <div className="text-xs text-muted-foreground">Pengingat menstruasi dan tips</div>
              </div>
            </div>
            {/* Pill Toggle */}
            <button
              className={cn(
                "relative w-14 h-7 flex items-center bg-gray-200 rounded-full p-1 transition-colors duration-200 focus:outline-none",
                notificationsEnabled ? "bg-primary" : "bg-gray-200"
              )}
              aria-pressed={notificationsEnabled}
              aria-label="Aktifkan/Nonaktifkan Notifikasi"
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            >
              <span
                className={cn(
                  "absolute left-1 top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200",
                  notificationsEnabled ? "translate-x-7" : "translate-x-0"
                )}
              />
            </button>
          </div>
          {/* Add other settings items here if needed */}
          <div
            className={cn(
              "card-soft p-4 flex items-center justify-between spring-tap cursor-pointer hover:shadow-card transition-all duration-200",
              syncLoadingRef.current && "opacity-60 pointer-events-none"
            )}
            onClick={async () => {
              const debug = (msg: string) => {
                setSyncDebugInfo(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
                console.log(msg);
              };
              setSyncDebugInfo([]);
              if (typeof window === 'undefined') {
                debug("Sync attempted on server. Aborting.");
                toast({ title: "Sync hanya dapat dilakukan di browser", description: "Fitur ini hanya tersedia di sisi client." });
                return;
              }
              // Dynamically import gapi-script only on client
              const { loadGapiInsideDOM } = await import('gapi-script');
              if (!user) {
                debug("User not logged in.");
                toast({ title: "Harus login dengan Google", description: "Silakan login terlebih dahulu." });
                return;
              }
              syncLoadingRef.current = true;
              try {
                debug("NEXT_PUBLIC_GOOGLE_API_KEY: " + process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
                debug("NEXT_PUBLIC_GOOGLE_CLIENT_ID: " + process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
                debug("Loading gapi...");
                await loadGapiInsideDOM();
                // @ts-expect-error: gapi is injected globally by gapi-script and not typed
                const gapi = window.gapi;
                debug("gapi loaded. Initializing client...");
                await new Promise((resolve, reject) => {
                  gapi.load('client:auth2', async () => {
                    try {
                      await gapi.client.init({
                        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
                        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
                        scope: "https://www.googleapis.com/auth/drive.file"
                      });
                      debug("gapi client initialized. Checking auth instance...");
                      const authInstance = gapi.auth2.getAuthInstance();
                      if (!authInstance) {
                        debug("gapi.auth2.getAuthInstance() returned null. Check clientId and scope.");
                        toast({ title: "Konfigurasi Google Drive salah", description: "clientId atau scope tidak valid." });
                        syncLoadingRef.current = false;
                        return;
                      }
                      debug("Signing in...");
                      await authInstance.signIn();
                      debug("Signed in to Google Drive.");
                      resolve(true);
                    } catch (err) {
                      debug("Error during gapi client init/sign-in: " + String(err));
                      reject(err);
                    }
                  });
                });
                debug("Getting cycle data from localStorage...");
                const cycleData = localStorage.getItem('cycleData');
                if (!cycleData) {
                  debug("No cycle data found in localStorage.");
                  toast({ title: "Tidak ada data siklus", description: "Data siklus tidak ditemukan di perangkat." });
                  syncLoadingRef.current = false;
                  return;
                }
                debug("Cycle data found. Creating file blob...");
                const fileContent = cycleData;
                const file = new Blob([fileContent], { type: 'application/json' });
                const metadata = {
                  name: `vast-cycle-data-${new Date().toISOString()}.json`,
                  mimeType: 'application/json'
                };
                debug("Preparing FormData for upload...");
                const form = new FormData();
                form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
                form.append('file', file);
                const accessToken = gapi.auth.getToken().access_token;
                debug("Uploading file to Google Drive...");
                const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                  method: 'POST',
                  headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
                  body: form
                });
                debug("Upload response status: " + response.status);
                const responseText = await response.text();
                debug("Upload response body: " + responseText);
                if (response.ok) {
                  debug("File uploaded successfully.");
                  toast({ title: "Berhasil disinkronkan", description: "Data siklus berhasil diunggah ke Google Drive." });
                } else {
                  debug("File upload failed.");
                  toast({ title: "Gagal sinkronisasi", description: "Terjadi kesalahan saat mengunggah data." });
                }
              } catch (err) {
                let errorMessage = "";
                if (err && typeof err === "object" && "message" in err) {
                  errorMessage = (err as { message?: string }).message ?? String(err);
                } else {
                  errorMessage = String(err);
                }
                debug("Sync error: " + errorMessage);
                toast({ title: "Gagal sinkronisasi", description: "Terjadi kesalahan: " + errorMessage });
              }
              syncLoadingRef.current = false;
            }}
            role="button"
            tabIndex={0}
            aria-label="Sinkronkan Data"
          >
            <div className="flex items-center space-x-3">
              <Cloud size={20} className="text-primary" />
              <div>
                <div className="font-medium text-foreground text-sm">Sinkronkan Data</div>
                <div className="text-xs text-muted-foreground">Sinkronkan data siklus ke cloud</div>
              </div>
            </div>
          </div>
        {/* Debug Info Panel (below sync card) */}
        {typeof window !== 'undefined' && syncDebugInfo.length > 0 && (
          <div className="mt-2 p-2 bg-muted rounded text-xs text-muted-foreground">
            <div className="font-semibold mb-1">Debug Info:</div>
            <ul className="space-y-1">
              {syncDebugInfo.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          </div>
        )}
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
