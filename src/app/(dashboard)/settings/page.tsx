'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Bell, Moon, Sun, Save, Laptop } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  
  const [theme, setTheme] = React.useState('dark');
  const [notifications, setNotifications] = React.useState(true);
  const [dailyGoal, setDailyGoal] = React.useState('60');
  const [revisionDay, setRevisionDay] = React.useState('0'); // 0 = Sunday

  const handleSave = () => {
    // Save to Firestore
    alert('Settings saved!');
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="space-y-6">
        <Card className="p-6 bg-[var(--bg-secondary)]/50 backdrop-blur border border-white/5">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Moon className="w-5 h-5 mr-2 text-[var(--accent-primary)]" /> Appearance
          </h2>
          <div className="flex gap-4">
            {['light', 'dark', 'system'].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`flex-1 py-4 px-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                  theme === t 
                    ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-white' 
                    : 'border-white/5 hover:border-white/20 text-gray-400'
                }`}
              >
                {t === 'light' && <Sun className="w-6 h-6" />}
                {t === 'dark' && <Moon className="w-6 h-6" />}
                {t === 'system' && <Laptop className="w-6 h-6" />}
                <span className="capitalize font-medium">{t}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-[var(--bg-secondary)]/50 backdrop-blur border border-white/5">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-[var(--accent-primary)]" /> Study Preferences
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Daily Goal (Minutes)</p>
                <p className="text-sm text-gray-400">Your target study time per day</p>
              </div>
              <input 
                type="number" 
                value={dailyGoal}
                onChange={(e) => setDailyGoal(e.target.value)}
                className="w-20 px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[var(--accent-primary)]"
              />
            </div>

            <div className="h-px w-full bg-white/5" />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Major Revision Day</p>
                <p className="text-sm text-gray-400">Day to focus entirely on reviewing older concepts</p>
              </div>
              <select 
                value={revisionDay}
                onChange={(e) => setRevisionDay(e.target.value)}
                className="px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[var(--accent-primary)]"
              >
                <option value="0">Sunday</option>
                <option value="1">Monday</option>
                <option value="5">Friday</option>
                <option value="6">Saturday</option>
              </select>
            </div>

            <div className="h-px w-full bg-white/5" />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Email Notifications</p>
                <p className="text-sm text-gray-400">Reminders for daily goals and revisions</p>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-[var(--accent-primary)]' : 'bg-white/10'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${notifications ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </Card>

        <div className="flex justify-end pt-4">
          <Button onClick={handleSave} size="lg" className="w-full sm:w-auto">
            <Save className="w-4 h-4 mr-2" /> Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
