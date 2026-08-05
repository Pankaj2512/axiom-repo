'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ListEditor } from '@/components/lists/ListEditor';
import { useAuth } from '@/contexts/AuthContext';
import { getUserCustomLists } from '@/lib/firestore';
import { CustomList } from '@/types';
import { Folder, Plus, List as ListIcon } from 'lucide-react';

export default function ListsPage() {
  const { user, loading } = useAuth();
  const [lists, setLists] = React.useState<CustomList[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isEditorOpen, setIsEditorOpen] = React.useState(false);

  const fetchLists = React.useCallback(async () => {
    if (loading) return;
    if (!user) {
      setIsLoading(false);
      return;
    }
    try {
      const data = await getUserCustomLists(user.uid);
      setLists(data.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    } catch (err) {
      console.error("Error fetching lists", err);
    } finally {
      setIsLoading(false);
    }
  }, [user, loading]);

  React.useEffect(() => {
    fetchLists();
  }, [fetchLists]);

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
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ListIcon className="w-8 h-8 text-[var(--accent-primary)]" />
            My Playlists
          </h1>
          <p className="text-gray-400 mt-2">
            Organize problems into custom collections for targeted practice.
          </p>
        </div>
        <Button onClick={() => setIsEditorOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> New List
        </Button>
      </div>

      {lists.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center bg-black/20 border-dashed border-2">
          <Folder className="w-12 h-12 text-gray-500 mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No lists yet</h3>
          <p className="text-gray-400 mb-6 max-w-md">
            Create custom lists like "Dynamic Programming Weaknesses" or "Google Interview Prep" to group specific problems together.
          </p>
          <Button onClick={() => setIsEditorOpen(true)} variant="outline">
            Create your first list
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lists.map(list => (
            <Card key={list.id} className="p-5 hover:border-[var(--accent-primary)]/50 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-primary)]/20 flex items-center justify-center">
                  <Folder className="w-5 h-5 text-[var(--accent-primary)] group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300">
                  {list.itemIds.length} items
                </span>
              </div>
              <h3 className="font-semibold text-white mb-1 truncate">{list.name}</h3>
              <p className="text-sm text-gray-400 line-clamp-2 min-h-[40px]">
                {list.description || "No description provided."}
              </p>
            </Card>
          ))}
        </div>
      )}

      <ListEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onListCreated={fetchLists}
      />
    </div>
  );
}
