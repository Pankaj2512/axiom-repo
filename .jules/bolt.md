## 2024-10-10 - Optimizing Context Array Lookups
**Learning:** When exposing item-specific getters from a global context array (like `getProgressForItem` using `progress.find()`), list rendering triggers O(N) lookups for each of the M items in the list, creating an O(N*M) bottleneck.
**Action:** Always memoize the array into a `Map` keyed by item ID inside the context provider. This reduces lookup time in getters to O(1), making the total list rendering complexity O(M + N).
