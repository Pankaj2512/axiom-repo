'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Track } from '@/types';
import * as LucideIcons from 'lucide-react';

interface TrackCardProps {
  track: Track;
}

export function TrackCard({ track }: TrackCardProps) {
  // Dynamically get the icon component
  const IconComponent = (LucideIcons as Record<string, any>)[track.icon] || LucideIcons.Code2;
  const moduleCount = track.modules.length;

  return (
    <Link href={`/syllabus/${track.id}`}>
      <Card
        hover
        className="p-6 flex flex-col gap-4 h-full cursor-pointer transition-all duration-300"
      >
        {/* Header with Icon and Badge */}
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-lg bg-[var(--accent-primary)]/20 flex items-center justify-center">
            <IconComponent className="w-6 h-6 text-[var(--accent-primary)]" />
          </div>
          <Badge variant="info" className="text-xs">
            {moduleCount} modules
          </Badge>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            {track.name}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
            {track.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 pt-4 border-t border-[var(--border)]">
          <span className="text-xs text-[var(--text-muted)] flex-1">
            {track.category.replace('_', ' ')}
          </span>
          <span className="text-xs font-medium text-[var(--accent-secondary)]">
            Explore →
          </span>
        </div>
      </Card>
    </Link>
  );
}
