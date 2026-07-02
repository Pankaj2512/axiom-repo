'use client';

import * as React from 'react';
import { Topic, Item } from '@/types';
import { TopicList } from '@/components/syllabus/TopicList';
import { FilterBar } from '@/components/syllabus/FilterBar';
import { useMemo, useState } from 'react';

interface ModuleClientProps {
  initialTopics: Topic[];
}

export function ModuleClient({ initialTopics }: ModuleClientProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>('ALL');
  const [selectedPattern, setSelectedPattern] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');

  // Extract unique filter options
  const filterOptions = useMemo(() => {
    const topicsList = initialTopics.map((t) => ({ id: t.id, name: t.name }));
    const patternsSet = new Set<string>();
    const difficultiesSet = new Set<string>();

    initialTopics.forEach((topic) => {
      topic.items.forEach((item) => {
        if (item.patternTags) {
          item.patternTags.forEach((p) => patternsSet.add(p));
        }
        if (item.difficulty) {
          difficultiesSet.add(item.difficulty);
        }
      });
    });

    return {
      topics: topicsList,
      patterns: Array.from(patternsSet).sort(),
      difficulties: Array.from(difficultiesSet).sort(),
    };
  }, [initialTopics]);

  // Filter topics and items based on selection
  const filteredTopics = useMemo(() => {
    let result = [...initialTopics];

    if (selectedTopic !== 'ALL') {
      result = result.filter((t) => t.id === selectedTopic);
    }

    return result.map((topic) => {
      const filteredItems = topic.items.filter((item) => {
        let match = true;
        if (selectedPattern !== 'ALL') {
          if (!item.patternTags || !item.patternTags.includes(selectedPattern)) {
            match = false;
          }
        }
        if (selectedDifficulty !== 'ALL') {
          if (item.difficulty !== selectedDifficulty) {
            match = false;
          }
        }
        return match;
      });

      return {
        ...topic,
        items: filteredItems,
      };
    }).filter(topic => topic.items.length > 0); // Hide empty topics
  }, [initialTopics, selectedTopic, selectedPattern, selectedDifficulty]);

  return (
    <div>
      <FilterBar
        topics={filterOptions.topics}
        selectedTopic={selectedTopic}
        onTopicChange={setSelectedTopic}
        patterns={filterOptions.patterns}
        selectedPattern={selectedPattern}
        onPatternChange={setSelectedPattern}
        difficulties={filterOptions.difficulties}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
      />
      
      {filteredTopics.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[var(--text-muted)]">
            No items match the selected filters.
          </p>
        </div>
      ) : (
        <TopicList topics={filteredTopics} />
      )}
    </div>
  );
}
