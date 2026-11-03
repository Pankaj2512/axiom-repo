'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Module } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ChevronDown } from 'lucide-react';

interface ModuleAccordionProps {
  module: Module;
  trackId: string;
}

export function ModuleAccordion({ module, trackId }: ModuleAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const topicCount = module.topics.length;

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between hover:bg-[var(--surface-hover)] transition-colors"
      >
        <div className="flex flex-col gap-1 text-left flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-semibold text-[var(--text-primary)]">
              {module.name}
            </h3>
            <Badge variant="default" className="text-xs">
              {topicCount} topics
            </Badge>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            {module.description}
          </p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-[var(--text-secondary)] transition-transform duration-300 flex-shrink-0 ml-4 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Content */}
      {isOpen && (
        <div className="border-t border-[var(--border)] p-6 bg-[var(--surface)]/50">
          {topicCount === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">No topics available yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-[var(--text-secondary)]">
                Ready to start? Click the button below to explore the topics and begin your learning journey.
              </p>
              <Link href={`/syllabus/${trackId}/${module.id}`}>
                <Button className="w-full" variant="default">
                  Start Module: {module.name}
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
