'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { useProgress } from '@/hooks/useProgress';
import { tracks } from '@/data/tracks';
import { History, Search, Calendar } from 'lucide-react';

export default function PracticeLogPage() {
  const { progress, isLoading } = useProgress();
  const [searchTerm, setSearchTerm] = React.useState('');

  const completedItems = React.useMemo(() => {
    return progress
      .filter(p => p.status === 'COMPLETED' && p.completedAt)
      .sort((a, b) => {
        // Handle dates carefully since they might be strings or Timestamp objects from Firestore
        const dateA = a.completedAt instanceof Date ? a.completedAt.getTime() : (a.completedAt as any)?.seconds ? (a.completedAt as any).seconds * 1000 : new Date(a.completedAt as any).getTime();
        const dateB = b.completedAt instanceof Date ? b.completedAt.getTime() : (b.completedAt as any)?.seconds ? (b.completedAt as any).seconds * 1000 : new Date(b.completedAt as any).getTime();
        return dateB - dateA;
      });
  }, [progress]);

  const filteredItems = React.useMemo(() => {
    if (!searchTerm) return completedItems;
    return completedItems.filter(p => p.itemId.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [completedItems, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 text-white">
            <History className="w-8 h-8 text-[var(--accent-primary)]" />
            Practice Log
          </h1>
          <p className="text-gray-400 mt-2">
            History of all problems and topics you have completed.
          </p>
        </div>
      </div>

      <Card className="p-6 bg-black/20 border border-white/5">
        <div className="flex items-center gap-2 mb-6 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search completed items..."
            className="bg-transparent border-none text-white focus:outline-none flex-1 text-sm"
          />
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <History className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No completed items found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
                  <th className="pb-3 font-medium">Item ID</th>
                  <th className="pb-3 font-medium text-center">Track</th>
                  <th className="pb-3 font-medium text-right">Completed On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredItems.map(item => {
                  let dateStr = 'Unknown';
                  if (item.completedAt) {
                    const dateObj = item.completedAt instanceof Date
                      ? item.completedAt
                      : (item.completedAt as any)?.seconds
                        ? new Date((item.completedAt as any).seconds * 1000)
                        : new Date(item.completedAt as any);
                    dateStr = dateObj.toLocaleDateString();
                  }

                  const track = tracks.find(t => t.id === item.trackId);

                  return (
                    <tr key={item.itemId} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 text-sm font-medium text-white">{item.itemId}</td>
                      <td className="py-4 text-sm text-gray-400 text-center">
                        <span className="bg-white/10 px-2 py-1 rounded-full text-xs">
                          {track?.name || item.trackId}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-gray-400 text-right flex items-center justify-end gap-2">
                        <Calendar className="w-4 h-4" />
                        {dateStr}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
