import { Metadata } from 'next';
import { TrackCard } from '@/components/syllabus/TrackCard';
import { tracks } from '@/data/tracks';

export const metadata: Metadata = {
  title: 'Syllabus | Axiom',
  description: 'Choose your learning track and start your journey',
};

export default function SyllabusPage() {
  // Sort tracks by a logical order
  const sortedTracks = tracks.sort((a, b) => {
    const order: Record<string, number> = {
      sde2: 1,
      fresher: 2,
      aiml: 3,
    };
    return (order[a.id] || 999) - (order[b.id] || 999);
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          Syllabus Explorer
        </h1>
        <p className="text-base text-[var(--text-secondary)]">
          Choose your learning path and start mastering the fundamentals
        </p>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}
