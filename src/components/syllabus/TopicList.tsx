'use client';

import { Topic } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ItemCard } from './ItemCard';

interface TopicListProps {
  topics: Topic[];
}

export function TopicList({ topics }: TopicListProps) {
  return (
    <div className="flex flex-col gap-8">
      {topics.map((topic) => (
        <div key={topic.id} className="flex flex-col gap-4">
          {/* Topic Header */}
          <div className="flex items-center gap-3 sticky top-0 pt-4 pb-2">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              {topic.name}
            </h2>
            <Badge variant="info" className="text-xs">
              {topic.items.length} items
            </Badge>
          </div>

          {topic.description && (
            <p className="text-sm text-[var(--text-secondary)]">
              {topic.description}
            </p>
          )}

          {/* Items Grid */}
          {topic.items.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-sm text-[var(--text-muted)]">
                No items available for this topic yet.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topic.items
                .sort((a, b) => a.order - b.order)
                .map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
