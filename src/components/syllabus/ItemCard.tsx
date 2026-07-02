'use client';

import { Item } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ExternalLink } from 'lucide-react';

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
  const typeEmoji = itemTypeIcons[item.type] || '📌';
  const difficultyVariant = item.difficulty?.toLowerCase() as any;

  return (
    <Card
      hover
      className="p-4 flex flex-col gap-3 h-full"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <span className="text-lg flex-shrink-0">{typeEmoji}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[var(--text-primary)] line-clamp-2">
            {item.title}
          </p>
        </div>
        {item.externalUrl && (
          <a
            href={item.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-1.5 rounded hover:bg-[var(--surface-hover)] transition-colors"
            title="Open external link"
          >
            <ExternalLink className="w-4 h-4 text-[var(--accent-secondary)]" />
          </a>
        )}
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
  );
}
