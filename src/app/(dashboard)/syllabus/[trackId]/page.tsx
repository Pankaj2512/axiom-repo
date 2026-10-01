import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ModuleAccordion } from '@/components/syllabus/ModuleAccordion';
import { Button } from '@/components/ui/Button';
import { tracks } from '@/data/tracks';
import * as LucideIcons from 'lucide-react';
import { ArrowLeft } from 'lucide-react';

interface TrackDetailPageProps {
  params: Promise<{
    trackId: string;
  }>;
}

export async function generateMetadata({ params }: TrackDetailPageProps): Promise<Metadata> {
  const { trackId } = await params;
  const track = tracks.find((t) => t.id === trackId);
  return {
    title: `${track?.name || 'Track'} | Axiom`,
    description: track?.description,
  };
}

export function generateStaticParams() {
  return tracks.map((track) => ({
    trackId: track.id,
  }));
}

export default async function TrackDetailPage({ params }: TrackDetailPageProps) {
  const { trackId } = await params;
  const track = tracks.find((t) => t.id === trackId);

  if (!track) {
    notFound();
  }

  // Dynamically get the icon component
  const IconComponent = (LucideIcons as Record<string, any>)[track.icon] || LucideIcons.Code2;

  // Sort modules by order
  const sortedModules = [...track.modules].sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumb */}
      <Link href="/syllabus">
        <Button variant="ghost" size="sm" className="w-fit gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Tracks
        </Button>
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg bg-[var(--accent-primary)]/20 flex items-center justify-center">
            <IconComponent className="w-8 h-8 text-[var(--accent-primary)]" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">
              {track.name}
            </h1>
            <p className="text-base text-[var(--text-secondary)] mt-2">
              {track.description}
            </p>
          </div>
        </div>
      </div>

      {/* Modules Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          Modules ({track.modules.length})
        </h2>
        <div className="flex flex-col gap-3">
          {sortedModules.map((module) => (
            <ModuleAccordion
              key={module.id}
              module={module}
              trackId={track.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
