'use client';

import * as React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { createCustomList } from '@/lib/firestore';
import { useAuth } from '@/contexts/AuthContext';

interface ListEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onListCreated: () => void;
}

export function ListEditor({ isOpen, onClose, onListCreated }: ListEditorProps) {
  const { user } = useAuth();
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !name.trim()) return;

    setIsSubmitting(true);
    try {
      // Just use timestamp for simple ID generation
      const listId = `list_${Date.now()}`;
      await createCustomList(user.uid, listId, {
        name: name.trim(),
        description: description.trim()
      });
      onListCreated();
      onClose();
      setName('');
      setDescription('');
    } catch (err) {
      console.error("Error creating list", err);
      alert("Failed to create list");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New List">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="list-name" className="text-sm font-medium text-gray-300">List Name</label>
          <input
            id="list-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Google Interview Prep"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--accent-primary)]"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="list-description" className="text-sm font-medium text-gray-300">Description (Optional)</label>
          <textarea
            id="list-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Problems I want to review before my onsite..."
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--accent-primary)] resize-none h-24"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting || !name.trim()}>
            {isSubmitting ? 'Creating...' : 'Create List'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
