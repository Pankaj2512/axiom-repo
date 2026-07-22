'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { Settings, Download, Upload, LogOut } from 'lucide-react';
import { getAllUserProgress, getUserCustomLists, getUserNotes, getDueRevisionCards } from '@/lib/firestore';
import { signOut } from '@/lib/auth';

export default function SettingsPage() {
  const { user } = useAuth();
  const [isExporting, setIsExporting] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    if (!user) return;
    setIsExporting(true);
    try {
      // Gather all user data
      const progress = await getAllUserProgress(user.uid);
      const lists = await getUserCustomLists(user.uid);
      const notes = await getUserNotes(user.uid);

      const exportData = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        userId: user.uid,
        data: {
          progress,
          lists,
          notes
        }
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `axiom-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed', error);
      alert('Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        console.log("Importing data...", json);
        alert('Import functionality is currently in Beta. Data read successfully!');
        // Note: Actual import would iterate through json.data and push to firestore.
      } catch (err) {
        console.error("Invalid JSON", err);
        alert('Failed to parse backup file');
      }
    };
    reader.readAsText(file);
  };

  if (!user) return null;

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pb-12">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/20 flex items-center justify-center">
          <Settings className="w-6 h-6 text-[var(--accent-primary)]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">Manage your profile, preferences, and data.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <Card className="p-6 bg-black/20 border border-white/5 space-y-4">
          <h2 className="text-xl font-semibold text-white">Profile</h2>
          <div className="flex items-center gap-4">
            <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}`} alt="Avatar" className="w-16 h-16 rounded-full border border-white/10" />
            <div>
              <p className="font-medium text-white">{user.displayName || 'Anonymous User'}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4 text-red-400 hover:text-red-300 hover:border-red-400/50" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </Card>

        {/* Data Management */}
        <Card className="p-6 bg-black/20 border border-white/5 space-y-4">
          <h2 className="text-xl font-semibold text-white">Data Management</h2>
          <p className="text-sm text-gray-400">Backup your progress, notes, and custom lists to a JSON file.</p>

          <div className="flex flex-col gap-3 pt-2">
            <Button onClick={handleExport} disabled={isExporting}>
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? 'Exporting...' : 'Export Backup JSON'}
            </Button>

            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={handleImport}
              className="hidden"
            />

            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-4 h-4 mr-2" /> Restore from Backup
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
