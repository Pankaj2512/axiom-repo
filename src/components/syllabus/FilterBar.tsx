'use client';

import * as React from 'react';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  topics: { id: string; name: string }[];
  selectedTopic: string;
  onTopicChange: (topicId: string) => void;
  patterns: string[];
  selectedPattern: string;
  onPatternChange: (pattern: string) => void;
  difficulties: string[];
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
}

export function FilterBar({
  topics,
  selectedTopic,
  onTopicChange,
  patterns,
  selectedPattern,
  onPatternChange,
  difficulties,
  selectedDifficulty,
  onDifficultyChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] mb-6 items-start sm:items-center">
      <div className="flex items-center gap-2 text-[var(--text-secondary)] font-medium">
        <Filter className="w-4 h-4" />
        <span className="text-sm">Filter</span>
      </div>

      <div className="flex flex-wrap gap-4 w-full">
        {/* Topic Filter */}
        <select
          value={selectedTopic}
          onChange={(e) => onTopicChange(e.target.value)}
          className="bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] text-sm rounded-lg focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] block p-2 outline-none flex-1 min-w-[150px]"
        >
          <option value="ALL">All Topics</option>
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        {/* Pattern Filter */}
        <select
          value={selectedPattern}
          onChange={(e) => onPatternChange(e.target.value)}
          className="bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] text-sm rounded-lg focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] block p-2 outline-none flex-1 min-w-[150px]"
        >
          <option value="ALL">All Patterns</option>
          {patterns.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        {/* Difficulty Filter */}
        <select
          value={selectedDifficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] text-sm rounded-lg focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] block p-2 outline-none flex-1 min-w-[150px]"
        >
          <option value="ALL">All Difficulties</option>
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d.charAt(0).toUpperCase() + d.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
