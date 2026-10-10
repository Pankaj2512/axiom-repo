## 2024-05-24 - Context Provider Array Lookup Bottlenecks
**Learning:** When exposing item-specific getters from a global context array (like `getProgressForItem`), using `Array.find` inside the getter causes O(N*M) performance bottlenecks when rendering lists of items.
**Action:** Memoize the array into a `Map` keyed by item ID inside the context provider. This reduces lookup time to O(1) for each item, preventing re-render blocking in large lists.
