import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TopicList } from '@/components/syllabus/TopicList';
import { Button } from '@/components/ui/Button';
import { MentorChat } from '@/components/ai/MentorChat';
import { tracks } from '@/data/tracks';
import { ArrowLeft, MessageCircle } from 'lucide-react';

interface ModuleDetailPageProps {
  params: Promise<{
    trackId: string;
    moduleId: string;
  }>;
}

export async function generateMetadata({ params }: ModuleDetailPageProps): Promise<Metadata> {
  const { trackId, moduleId } = await params;
  const track = tracks.find((t) => t.id === trackId);
  const module = track?.modules.find((m) => m.id === moduleId);
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

export default async function ModuleDetailPage({ params }: ModuleDetailPageProps) {
  const { trackId, moduleId } = await params;
  const track = tracks.find((t) => t.id === trackId);

  if (!track) {
    notFound();
  }

  const module = track.modules.find((m) => m.id === moduleId);

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

      {/* Floating AI Mentor */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        <details className="group relative">
          <summary className="list-none cursor-pointer">
            <div className="w-14 h-14 bg-[var(--accent-primary)] rounded-full shadow-lg shadow-[var(--accent-primary)]/20 flex items-center justify-center hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
          </summary>
          <div className="absolute bottom-20 right-0 w-[400px] origin-bottom-right animate-in zoom-in-95 duration-200">
            <MentorChat 
              contextTopic={module.name} 
              onClose={() => {
                // Find the details element and remove the 'open' attribute
                const details = document.querySelector('details.group') as HTMLDetailsElement;
                if (details) details.open = false;
              }}
            />
          </div>
        </details>
      </div>
    </div>
  );
}
