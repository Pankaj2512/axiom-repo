## 2025-02-18 - Prevent O(N*M) list rendering bottleneck via Memoized Context Maps
**Learning:** Returning array-loop methods like `Array.find` from Context providers (e.g., `getProgressForItem`) creates severe O(N*M) bottlenecks when consumed inside large lists of items (where N is the number of items in the list and M is the size of the array).
**Action:** Always memoize global context arrays into a `Map` (keyed by item ID) using `React.useMemo` inside the provider. This allows the getter function to use an O(1) `Map.get(id)` lookup, eliminating the performance bottleneck.
