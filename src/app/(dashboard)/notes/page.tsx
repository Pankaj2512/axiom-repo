'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { NoteEditor } from '@/components/notes/NoteEditor';
import { useAuth } from '@/contexts/AuthContext';
import { getUserNotes, createNote, updateNote, deleteNote } from '@/lib/firestore';
import { UserNote } from '@/types';
import { FileText, Plus, Trash2, Clock } from 'lucide-react';

export default function NotesPage() {
  const { user, loading } = useAuth();
  const [notes, setNotes] = React.useState<UserNote[]>([]);
  const [activeNoteId, setActiveNoteId] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchNotes = React.useCallback(async () => {
    if (loading) return;
    if (!user) {
      setIsLoading(false);
      return;
    }
    try {
      const data = await getUserNotes(user.uid);
      setNotes(data.sort((a, b) => b.updatedAt - a.updatedAt));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [user, loading]);

  React.useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const activeNote = React.useMemo(() =>
    notes.find(n => n.id === activeNoteId) || null
  , [notes, activeNoteId]);

  const handleCreateNew = () => {
    setActiveNoteId('new');
  };

  const handleSaveNote = async (title: string, content: string) => {
    if (!user) return;

    if (activeNoteId === 'new') {
      const newId = await createNote(user.uid, title, content);
      setActiveNoteId(newId);
    } else if (activeNoteId) {
      await updateNote(user.uid, activeNoteId, title, content);
    }
    await fetchNotes();
  };

  const handleDelete = async (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    if (!user || !confirm('Are you sure you want to delete this note?')) return;

    await deleteNote(user.uid, noteId);
    if (activeNoteId === noteId) {
      setActiveNoteId(null);
    }
    await fetchNotes();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 max-w-7xl mx-auto w-full">
      {/* Sidebar List */}
      <div className={`w-full md:w-80 flex flex-col gap-4 ${activeNoteId ? 'hidden md:flex' : 'flex'}`}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 text-[var(--accent-primary)]" />
            Notes
          </h1>
          <Button size="sm" onClick={handleCreateNew}>
            <Plus className="w-4 h-4 mr-1" /> New
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-white/10">
          {notes.length === 0 && activeNoteId !== 'new' ? (
            <div className="text-center py-10 text-gray-500">
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notes yet</p>
            </div>
          ) : (
            <>
              {activeNoteId === 'new' && (
                <Card className="p-4 border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 cursor-pointer">
                  <h3 className="font-medium text-white truncate">Untitled Note</h3>
                  <p className="text-xs text-[var(--accent-primary)] mt-1">Drafting...</p>
                </Card>
              )}
              {notes.map(note => (
                <Card
                  key={note.id}
                  className={`p-4 cursor-pointer transition-colors group ${
                    activeNoteId === note.id
                      ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10'
                      : 'hover:border-white/20'
                  }`}
                  onClick={() => setActiveNoteId(note.id)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-white truncate pr-4">{note.title}</h3>
                    <button
                      onClick={(e) => handleDelete(e, note.id)}
                      className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                    <Clock className="w-3 h-3" />
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </div>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Editor Area */}
      <div className={`flex-1 ${!activeNoteId ? 'hidden md:flex' : 'flex'}`}>
        {!activeNoteId ? (
          <div className="w-full h-full rounded-xl border border-white/5 bg-black/20 flex flex-col items-center justify-center text-gray-500">
            <FileText className="w-16 h-16 mb-4 opacity-20" />
            <p>Select a note to read or edit</p>
          </div>
        ) : (
          <NoteEditor
            note={activeNote}
            onSave={handleSaveNote}
            onBack={() => setActiveNoteId(null)}
          />
        )}
      </div>
    </div>
  );
}
