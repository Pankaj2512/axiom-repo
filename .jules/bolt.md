## 2024-05-14 - O(N*M) Context Lookup Bottleneck
**Learning:** Exposing item-specific getters from a global context array (like `getProgressForItem` in `ProgressContext`) creates an O(N*M) bottleneck when rendering lists of items, as `Array.find` runs repeatedly for each rendered child.
**Action:** Memoize global state arrays into an O(1) lookup `Map` keyed by item ID inside the provider before exposing getter functions to consumers.
