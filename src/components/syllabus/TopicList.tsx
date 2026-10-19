'use client';

import * as React from 'react';
import { Topic } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ItemCard } from './ItemCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TopicListProps {
  topics: Topic[];
}

export function TopicList({ topics }: TopicListProps) {
  // Automatically expand the first topic, collapse the rest by default
  const [expandedTopics, setExpandedTopics] = React.useState<Record<string, boolean>>(
    topics.length > 0 ? { [topics[0].id]: true } : {}
  );

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      {topics.map((topic) => {
        const isExpanded = !!expandedTopics[topic.id];

        return (
          <div key={topic.id} className="flex flex-col gap-4 border border-[var(--border)] rounded-xl bg-[var(--bg-secondary)] overflow-hidden animate-fade-in">
            {/* Topic Header - Clickable for Accordion */}
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-[var(--surface-hover)] transition-colors select-none"
              onClick={() => toggleTopic(topic.id)}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
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
              </div>

              <div className="text-[var(--text-muted)] p-2 rounded-full bg-[var(--surface)]">
                {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>

            {/* Accordion Content (Items Grid) */}
            {isExpanded && (
              <div className="p-4 pt-0 border-t border-[var(--border)] mt-2">
                {topic.items.length === 0 ? (
                  <Card className="p-6 text-center mt-4">
                    <p className="text-sm text-[var(--text-muted)]">
                      No items available for this topic yet.
                    </p>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {topic.items
                      .sort((a, b) => a.order - b.order)
                      .map((item) => (
                        <ItemCard key={item.id} item={item} />
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
