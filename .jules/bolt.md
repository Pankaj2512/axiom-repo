## 2024-05-24 - Context Lookup Bottlenecks in Lists
**Learning:** Exposing item-specific getters (like `getProgressForItem`) from a global context array creates O(N*M) performance bottlenecks when rendering lists (e.g., using `Array.find` inside a component mapped over M items, where N is the size of the progress array).
**Action:** Always memoize context arrays into a `Map` keyed by item ID inside the context provider. This reduces the item getter lookup time to O(1), preventing scaling issues during renders of long lists.
