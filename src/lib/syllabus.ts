import { tracks } from '@/data/tracks';
import { Item, Topic, Module, Track } from '@/types';

export interface ItemDetails {
  item: Item;
  topic: Topic;
  module: Module;
  track: Track;
}

/**
 * Searches across all syllabus tracks to find an item and its parent hierarchy.
 */
export function findItemDetails(itemId: string): ItemDetails | null {
  for (const track of tracks) {
    for (const module of track.modules) {
      for (const topic of module.topics) {
        const item = topic.items.find(i => i.id === itemId);
        if (item) {
          return { item, topic, module, track };
        }
      }
    }
  }
  return null;
}

/**
 * Finds an item directly by its ID.
 */
export function findItemById(itemId: string): Item | null {
  const details = findItemDetails(itemId);
  return details ? details.item : null;
}
