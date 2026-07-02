'use client';

import * as React from 'react';
import { UserNote } from '@/types';
import { Button } from '@/components/ui/Button';
import { SummaryGenerator } from '@/components/ai/SummaryGenerator';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface NoteEditorProps {
  note: UserNote | null;
  onSave: (title: string, content: string) => Promise<void>;
  onBack: () => void;
}

export function NoteEditor({ note, onSave, onBack }: NoteEditorProps) {
  const [title, setTitle] = React.useState(note?.title || '');
  const [content, setContent] = React.useState(note?.content || '');
  const [isSaving, setIsSaving] = React.useState(false);
  const [isPreview, setIsPreview] = React.useState(false);

  React.useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
    setIsPreview(false);
  }, [note]);

  const handleSave = async () => {
    if (!title.trim()) return;
    setIsSaving(true);
    try {
      await onSave(title, content);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/20 rounded-xl border border-white/5 overflow-hidden">
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
        <div className="flex items-center gap-3 w-1/2">
          <Button variant="ghost" size="sm" onClick={onBack} className="md:hidden">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title..."
            className="w-full bg-transparent text-xl font-bold text-white focus:outline-none placeholder:text-gray-600"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsPreview(!isPreview)}
          >
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isSaving || !title.trim()}>
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            Save
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isPreview ? (
          <div className="prose prose-invert max-w-none p-6">
            <ReactMarkdown>{content}</ReactMarkdown>
            {!content && <p className="text-gray-500 italic">Nothing to preview...</p>}
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-white/5">
              <SummaryGenerator topicName={title || "this topic"} />
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing markdown..."
              className="flex-1 w-full bg-transparent p-6 text-gray-300 focus:outline-none resize-none font-mono text-sm leading-relaxed"
            />
          </div>
        )}
      </div>
    </div>
  );
}
