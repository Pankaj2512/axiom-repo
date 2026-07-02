import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TopicList } from '@/components/syllabus/TopicList';
import { Button } from '@/components/ui/Button';
import { tracks } from '@/data/tracks';
import { ArrowLeft } from 'lucide-react';

interface ModuleDetailPageProps {
  params: {
    trackId: string;
    moduleId: string;
  };
}

export function generateMetadata({ params }: ModuleDetailPageProps): Metadata {
  const track = tracks.find((t) => t.id === params.trackId);
  const module = track?.modules.find((m) => m.id === params.moduleId);
  return {
    title: `${module?.name || 'Module'} | Axiom`,
    description: module?.description,
  };
}

export function generateStaticParams() {
  const params: Array<{ trackId: string; moduleId: string }> = [];
  tracks.forEach((track) => {
    track.modules.forEach((module) => {
      params.push({
        trackId: track.id,
        moduleId: module.id,
      });
    });
  });
  return params;
}

export default function ModuleDetailPage({ params }: ModuleDetailPageProps) {
  const track = tracks.find((t) => t.id === params.trackId);

  if (!track) {
    notFound();
  }

  const module = track.modules.find((m) => m.id === params.moduleId);

  if (!module) {
    notFound();
  }

  // Sort topics by order
  const sortedTopics = [...module.topics].sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumb */}
      <Link href={`/syllabus/${track.id}`}>
        <Button variant="ghost" size="sm" className="w-fit gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to {track.name}
        </Button>
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="text-sm text-[var(--text-secondary)]">
          {track.name}
        </div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          {module.name}
        </h1>
        <p className="text-base text-[var(--text-secondary)]">
          {module.description}
        </p>
      </div>

      {/* Content */}
      {sortedTopics.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[var(--text-muted)]">
            No topics available for this module yet.
          </p>
        </div>
      ) : (
        <>
          <div className="text-sm text-[var(--text-secondary)]">
            {sortedTopics.length} topic{sortedTopics.length !== 1 ? 's' : ''} •{' '}
            {sortedTopics.reduce((sum, topic) => sum + topic.items.length, 0)} total item
            {sortedTopics.reduce((sum, topic) => sum + topic.items.length, 0) !== 1 ? 's' : ''}
          </div>
          <TopicList topics={sortedTopics} />
        </>
      )}
    </div>
  );
}
