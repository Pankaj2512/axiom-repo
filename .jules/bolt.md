## 2025-05-24 - Optimize array find to O(1) Map lookup in ProgressContext
**Learning:** When exposing item-specific getters from a global context array (like `getProgressForItem`), using `Array.find` causes O(N*M) performance bottlenecks when rendering lists of items.
**Action:** Memoize the array into a `Map` keyed by item ID inside the context provider to reduce lookup time to O(1).
