'use client';

import * as React from 'react';
import Link from 'next/link';
import { Item, CustomList } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ExternalLink, BookmarkPlus, CheckCircle2, Circle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/hooks/useProgress';
import { useStreaks } from '@/hooks/useStreaks';
import { getUserCustomLists, addToList } from '@/lib/firestore';

interface ItemCardProps {
  item: Item;
}

const itemTypeIcons: Record<string, string> = {
  QUESTION: '❓',
  CONCEPT: '💡',
  CASE_STUDY: '📊',
  PROJECT: '🚀',
  VIDEO: '▶️',
  READING: '📖',
};

export function ItemCard({ item }: ItemCardProps) {
  const { user } = useAuth();
  const { getProgressForItem, toggleComplete } = useProgress();
  const { logActivity } = useStreaks();
  const [lists, setLists] = React.useState<CustomList[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const itemProgress = getProgressForItem(item.id);
  const isCompleted = itemProgress?.status === 'COMPLETED';

  React.useEffect(() => {
    if (user && isDropdownOpen) {
      getUserCustomLists(user.uid).then(setLists).catch(console.error);
    }
  }, [user, isDropdownOpen]);

  const handleSaveToList = async (listId: string) => {
    if (!user) return;
    try {
      await addToList(user.uid, listId, item.id);
      setIsDropdownOpen(false);
      alert('Saved to list!');
    } catch (err) {
      console.error(err);
      alert('Failed to save to list');
    }
  };

  const handleToggleComplete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    await toggleComplete(item.id, isCompleted);

    if (!isCompleted) {
      logActivity();
    }
  };

  const typeEmoji = itemTypeIcons[item.type] || '📌';
  const difficultyVariant = item.difficulty?.toLowerCase() as any;

  return (
    <Link href={`/item/${item.id}`} className="block h-full group">
      <Card
        hover
        className={`p-4 flex flex-col gap-3 h-full group-hover:border-[var(--accent-primary)] group-hover:border-opacity-50 transition-colors ${
          isCompleted ? 'opacity-70' : ''
        }`}
      >
        {/* Header */}
        <div className="flex items-start gap-3">
          <button
            onClick={handleToggleComplete}
            aria-label={isCompleted ? "Mark item incomplete" : "Mark item complete"}
            className="mt-0.5 flex-shrink-0 text-gray-400 hover:text-[var(--success)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] rounded-full"
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>
          <span className="text-lg flex-shrink-0">{typeEmoji}</span>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium line-clamp-2 ${isCompleted ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-primary)]'}`}>
              {item.title}
            </p>
          </div>
          {/* Actions */}
          <div className="flex flex-shrink-0 items-center gap-1 relative" onClick={(e) => e.preventDefault()}>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              aria-label="Save to list"
              className="p-1.5 rounded hover:bg-[var(--surface-hover)] transition-colors text-gray-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
              title="Save to list"
            >
              <BookmarkPlus className="w-4 h-4" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-8 w-48 bg-[var(--bg-secondary)] border border-white/10 rounded-lg shadow-xl z-10 overflow-hidden animate-in fade-in slide-in-from-top-2" onClick={(e) => e.stopPropagation()}>
                <div className="p-2 border-b border-white/5 text-xs text-gray-400">Save to list...</div>
                <div className="max-h-48 overflow-y-auto">
                  {lists.length === 0 ? (
                    <div className="p-3 text-xs text-center text-gray-500">No lists found. Create one first!</div>
                  ) : (
                    lists.map(list => (
                      <button
                        key={list.id}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSaveToList(list.id);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors truncate"
                      >
                        {list.name}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

            {item.externalUrl && (
              <a
                href={item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open external link"
                className="p-1.5 rounded hover:bg-[var(--surface-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                title="Open external link"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4 text-[var(--accent-secondary)]" />
              </a>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {item.difficulty && (
            <Badge variant={difficultyVariant || 'default'} className="text-xs">
              {item.difficulty}
            </Badge>
          )}
          {item.companyTags && item.companyTags.length > 0 && (
            <>
              {item.companyTags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="info" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {item.companyTags.length > 2 && (
                <Badge variant="info" className="text-xs">
                  +{item.companyTags.length - 2}
                </Badge>
              )}
            </>
          )}
        </div>

        {/* Pattern Tags */}
        {item.patternTags && item.patternTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.patternTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-[var(--surface-hover)] text-[var(--text-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Card>
    </Link>
  );
}
