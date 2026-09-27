## 2024-09-27 - O(N) lookup bottleneck in list rendering
**Learning:** `Array.find` inside global context arrays like `useProgress` creates an O(N*M) bottleneck when rendering lists of items because `getProgressForItem` iterates over the progress array for every item.
**Action:** Memoize the array into a `Map` keyed by `itemId` for O(1) lookups to avoid this bottleneck.
